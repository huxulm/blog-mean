/**
 * Created by xulingming on 2017/3/27.
 */
'use strict';
import _ from 'lodash';
import Login from '../../../monitor/statics/request/login.model';
import User from '../../user/user.model';
import Promise from 'bluebird';
import LOGGER from '../../../config/log';
// log
var logger = LOGGER.getLogger('blog-info');
logger.setLevel('INFO');

export function login(req, res) {
  return Login.aggregate()
    .group({_id: '$uid', uid: {$max: '$uid'}, login_count: {$last: '$login_count'}, today_login: {$last: '$today_login'}, uname: {$max: '$uname'}, create_time: {$last: '$create_time'}, last_login: {$last: '$last_login'}})
    .exec()
    .then(function (loginLogs) {
      console.log('login static:' + JSON.stringify(loginLogs));
      var $promises = [];
      if (loginLogs && loginLogs.length > 0) {
        loginLogs.forEach(function (e) {
          if (e.uid) {
            let $$promise = User.findOne({_id: e.uid}).limit(1).exec();
            $$promise.loginLog = e;
            $promises.push($$promise);
          }
        });

        let retLoginLogs = [];
        return Promise.all($promises).then(function (results) {
          logger.info('login result:', results);
          results.forEach(function (e, idx) {
            let ret = {};
            ret.user = {};
            ret.login = {};
            ret.user._id = e._id;
            ret.user.name = e.name;
            ret.login = loginLogs[idx];
            retLoginLogs.push(ret);
          });
          return retLoginLogs;
        }).catch(function (err) {
          if (err) {
            console.log('promise all err:' + err);
          }
          // return loginLogs;
        });

      } else {
        return loginLogs;
      }
    })
    .then(function (loginLogs) {
      if (loginLogs) {
        return res.status(200).json(loginLogs);
      } else {
        return res.status(400).json({status: -101});
      }
    })
    .catch(function (err) {
      if (err) {
        return res.status(200).json({status: -100, msg: 'server error:' + err.message});
      } else {
        return res.status(400).end();
      }
    });

}
