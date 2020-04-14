import React, { Component } from 'react';
import './ListProject.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ListProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
    }
  }

  componentDidMount() {
    this.loadProjects();
  }

  loadProjects() {
    axios.get('http://localhost:4000/api/project/projects')
      .then(res => {
        this.setState({
          projects: res.data
        })
      });
  }
  
  deleteProject = (id) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      return axios.delete('http://localhost:4000/api/project/delete/' + id)
        .then(res => {
          this.props.history.push('/list-project');
        });
    }
  }

  renderData() {
    if (this.state.projects.length === 0) {
      return (
        <tr>
          <td>
            Empty
        </td>
          <td>
            Empty
        </td>
          <td>
            Empty
          </td>
        </tr>
      )
    } else {
      return this.state.projects.map((object, i) => {
        return (
          <tr key={object._id}>
            <td>
              {i + 1}
            </td>
            <td>
              {object.name}
            </td>
            <td>
              <Link to={"/view-project/" + object._id} >View</Link> |
            <Link to={"/edit-project/" + object._id} > Edit</Link>
              {/* <a style={{ color: 'red' }} onClick={() => this.deleteProject(object._id)}> Delete</a> */}
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 style={{ marginBottom: 30 }}>List Project</h3>
        <Link to={"/create-project"} className="btn btn-primary" style={{ marginBottom: 20 }}>Create project</Link>

        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Project name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderData()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ListProject;