// App.js

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CreateMember from './Components/CreateMember/CreateMember';
import EditMember from './Components/EditMember/EditMember';
import CreateProject from './Components/CreateProject/CreateProject';
import ListProject from './Components/ListProject/ListProject';
import ListMember from './Components/ListMember/ListMember';
import EditProject from './Components/EditProject/EditProject';
import ViewProject from './Components/ViewProject/ViewProject';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container mb-5">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Home</Link>
            <div className="navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/list-project'} className="nav-link">Project</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/list-member'} className="nav-link">Member</Link>
                </li>
              </ul>
            </div>
          </nav> <br />
          <Switch>
            <Route path="/" exact component={ListProject} />
            <Route path='/create-member' component={CreateMember} />
            <Route path='/create-project' component={CreateProject} />
            <Route path='/edit-member/:id' component={EditMember} />
            <Route path='/edit-project/:id' component={EditProject} />
            <Route path='/view-project/:id' component={ViewProject} />
            <Route path='/list-member' component={ListMember} />
            <Route path='/list-project' component={ListProject} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;