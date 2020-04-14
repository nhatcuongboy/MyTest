import React, { Component } from 'react';
import './ListMember.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ListMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
    }
  }

  componentDidMount() {
    this.loadMembers();
  }

  loadMembers() {
    axios.get('http://localhost:4000/api/member/members')
      .then(res => {
        this.setState({
          members: res.data
        })
      });
  }

  renderData() {
    if (this.state.members.length === 0) {
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
      return this.state.members.map((object, i) => {
        return (
          <tr key={object._id}>
            <td>
              {i + 1}
            </td>
            <td>
              {object.name}
            </td>
            <td>
              <Link to={"/edit-member/" + object._id} > Edit</Link>
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 style={{ marginBottom: 30 }}>List Member</h3>
        <Link to={"/create-member"} className="btn btn-primary" style={{ marginBottom: 20 }}>Create member</Link>

        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Member name</th>
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

export default ListMember;