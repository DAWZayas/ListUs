import React from 'react';
import { Route,  IndexRoute } from 'react-router';
import App from './containers/App';
import ListDetailsContainer from './containers/ListDetailsContainer';
import SectionContainer from './containers/SectionContainer';
import GroupsContainer from './containers/GroupsContainer';
import AccountContainer from './containers/AccountContainer';
import FriendsContainer from './containers/FriendsContainer';
import CalendarContainer from './containers/CalendarContainer';
import NotificationContainer from './containers/NotificationContainer';


export default (
  <Route path="/" component={App}>
    <Route path="list" component={SectionContainer} />
    <Route path="list/:idList" component={ListDetailsContainer} />
    <Route path="account" component={AccountContainer} />
    <Route path="groups" component={GroupsContainer} />
    <Route path="friends" component={FriendsContainer} />
    <Route path="calendar" component={CalendarContainer} />
    <Route path="notifications" component={NotificationContainer} />
    <Route path="register" component={App} />

    <IndexRoute component={SectionContainer} />
  </Route>
);
