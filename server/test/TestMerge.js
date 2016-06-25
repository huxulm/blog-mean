var _ = require('lodash');

console.log(_.merge(
    {id : 1, name : 'Jack', age : '25'},
    {phone : '18616777015'},
    {age : '32'}
));