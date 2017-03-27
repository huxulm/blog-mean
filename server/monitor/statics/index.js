/**
 * Created by xulingming on 2017/3/27.
 */
'use strict';
import Request from './request/request.model';
import Login from './request/login.model';
import LOGGER from '../../config/log';
var _logger = LOGGER.getLogger('blog-info');
_logger.setLevel(LOGGER.levels.INFO);

var patt = /\.[0-9a-z]{1,5}$/i;

export function _static (req, res, next) {

  // filter static domain request
  if (req.method === 'GET' && req.originalUrl) {
    if (req.originalUrl.match(patt)) {
      return next();
    }
  }

  // login
  if (req.originalUrl === '/auth/local') {
    // return _static_login(req, res, next);
  }

  return Request.create({
    baseUrl: req.baseUrl || '',
    hostName: req.hostName || '',
    ip: req.ip || '0.0.0.0',
    method: req.method,
    originalUrl: req.originalUrl,
    protocal: req.protocal,
    xhr: req.xhr
  }).then(function (request) {
    _logger.info('client request static success:{}', request || {});
    next();
    return request;
  }).catch(function (err) {
    if (err) {
      _logger.info('client request static failed:{}', err || {});
      next();
    }
  });
};

export function _static_login(req, res, next, user) {
  console.log('Login user:' + JSON.stringify(user));
  Login.findOne({uid: {$eq: user._id}}) // 最近登录
    .exec()
    .then(function (lastLogin) {
      console.log('last login user:' + JSON.stringify(lastLogin));
      if (lastLogin) {
        console.log('type of:' + (typeof lastLogin.create_time) + ', ' + lastLogin.create_time.toString());
        if (lastLogin.create_time.toString().substring(0, 10) !== Date.now().toString().substring(0, 10)) {
          return Login.create({
            uid: user._id,
            uname: user.name,
            login_count: 1,
            today_login: 1,
          }).then(function (lastLogin) {
            return lastLogin;
          });
        } else {
          lastLogin.login_count += 1;
          lastLogin.today_login += 1;
          lastLogin.last_login= Date.now();
          console.log('update login...............');
          return lastLogin.save().then(function (lastLogin) {
            console.log('after .....');
            return lastLogin;
          }).catch(function (err) {
            console.log(err ? err : 'update error');
          });
        }
      } else {
        console.log('before update login:' + JSON.stringify(lastLogin));
        return Login.create({
          uid: user._id,
          uname: user.name,
          login_count: 1,
          today_login: 1,
        }).exec().then(function (lastLogin) {
          return lastLogin;
        }).catch(function (err) {
          console.log(err ? err : 'create error');
        });
      }
    })
    .then(function (lastLogin) {
      console.log('login log:' + JSON.stringify(lastLogin || {}));
    })
    .catch(function (err) {
      console.log(err ? err : 'static error');
  });
}
