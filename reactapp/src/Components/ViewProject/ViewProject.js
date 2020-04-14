import React, { Component } from 'react';
import './ViewProject.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      description: '',
      members: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/project/read/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          id: response.data._id,
          name: response.data.name,
          description: response.data.description,
        });
        response.data.members.map((object, i) => {
          return axios.get('http://localhost:4000/api/member/read/' + object)
            .then(response => {
              this.setState(prevState => ({
                members: [...prevState.members, response.data]
              }))
            })
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  renderData() {
    if (this.state.members.length === 0) {
      return (
        <tr>
          <td>Empty</td>
          <td>Empty</td>
        </tr>
      )
    } else {
      return this.state.members.map((object, i) => {
        return (
          <tr key={object._id}>
            <td>
              {i + 1}
            </td>
            <td>
              {object.name}
            </td>
          </tr>
        );

      });
    }
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 style={{ marginBottom: 30 }}>Project detail</h3>
        <Link to={"/edit-project/" + this.state.id} className="btn btn-info" style={{ marginBottom: 20 }}>Edit</Link>

        <div className="form-group">
          <p style={{ color: 'blue' }}>Name: </p>
          <p>{this.state.name}</p>
        </div>
        <div style={{ marginTop: 30 }} className="form-group">
          <p style={{ color: 'blue' }}>Description: </p>
          <p>{this.state.description}</p>
        </div>
        <div style={{ marginTop: 50 }} className="form-group">
          <p style={{ color: 'blue' }}>Member list:</p>
          <table>
            <thead>
              <tr>
                <th>
                  No
            </th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {this.renderData()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default ViewProject;