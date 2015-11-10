import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import IntroduceUser from './containers/IntroduceUser';
import IntroduceListTasks from './containers/IntroduceListTasks';

export default (
  <Route path="/" component={App}>
 	 <Route path="user" component={IntroduceUser} />
 	 <Route path="user/:idList" component={IntroduceListTasks} />
  </Route>
);
