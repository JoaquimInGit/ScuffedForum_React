import React, {Component} from 'react';
//cenas para routes 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//navbar style
//imports
import Home from '../pages/home/Home';
import NavbarComponent from "../components/global/Navbar";
import PrivateRoute from "../components/global/PrivateRoute";

import postListPage from "../pages/post/list.js";
import postDetailsPage from "../pages/post/details.js";

import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";

import listCategory from "../pages/post/listCategoryPost.js";
import myList from "../pages/post/myList.js";

export default class RouterComponent extends Component {
    /*
    <PrivateRoute roles={[1, 2]} exact path="/book/list" component={BookListPage} />
    <PrivateRoute roles={[1]} exact path="/book/details/:id" component={BookDetailsPage} />
*/
    render() {
        return (
            <Router>


<NavbarComponent />
<Switch>
    <Route exact path="/register" component={RegisterPage} />
    <Route exact path="/login" component={LoginPage} />

    <PrivateRoute roles={[1, 2]} exact path="/post/list" component={postListPage} />
    <PrivateRoute roles={[1, 2]} exact path="/post/details/:id" component={postDetailsPage} />
    <PrivateRoute roles={[1, 2]} exact path="/post/category/:name" component={listCategory} />
    <PrivateRoute roles={[1, 2]} exact path="/post/myList/" component={myList} />
    <Route path="*" component={Home} />
</Switch>
            </Router>
        );
    }
}
