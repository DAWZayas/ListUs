import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';

import init from './utils/init';

require('./style.css');
require('bootstrap/dist/css/bootstrap.min.css');

/*var a = require('alertifyjs/build/alertify.js');
import aa from 'alertifyjs/build/alertify.js';
require('alertifyjs/build/css/alertify.min.css');
require('alertifyjs/build/css/themes/default.min.css');
console.log(aa);
*/
require('alertifyjs/build/css/alertify.min.css');
require('alertifyjs/build/css/themes/default.min.css');
const store = init();

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
);
