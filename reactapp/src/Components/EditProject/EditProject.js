import React, { Component } from 'react';
import './EditProject.css';
import axios from 'axios';

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: '',
      name: '',
      description: '',
      members: [],
      checkedMembers: [],
      errors: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/member/members')
      .then(res => {
        this.setState({
          members: res.data
        })
      });
    axios.get('http://localhost:4000/api/project/read/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          id: response.data._id,
          name: response.data.name,
          description: response.data.description,
          checkedMembers: response.data.members
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleValidation() {
    let name = this.state.name;
    let errors = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.handleValidation()) {
      const obj = {
        name: this.state.name,
        description: this.state.description,
        members: this.state.checkedMembers
      };
      axios.put('http://localhost:4000/api/project/update/' + this.state.id, obj)
        .then(res => {
          alert('Update project successfully !!!');
          this.props.history.push('/list-project');
        }).catch(err => {
          if (err.response.status === 500) {
            alert("Duplicate name")
          }
          console.log(err)
        })
    } else {
      alert("Form has errors.")
    }
  }

  handleCheckbox(e, s) {
    const checkedMembers = [...this.state.checkedMembers];
    if (e.target.checked) {
      checkedMembers.push(s)
    } else {
      const index = checkedMembers.findIndex((ch) => ch === s);
      checkedMembers.splice(index, 1);
    }
    this.setState({ checkedMembers });
  }

  renderData() {
    return this.state.members.map((object, i) => {
      return (
        <div key={object._id}>
          <input type="checkbox" id={object._id} style={{ marginRight: 10 }}
            checked={this.state.checkedMembers.find((ch) => ch === object._id)}
            onChange={(e) => this.handleCheckbox(e, object._id)}
          />
          {object.name}
        </div>
      );
    });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 style={{ marginBottom: 30 }}>Edit Project</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: * </label>
            <input type="text" className="form-control" value={this.state.name}
              onChange={this.onChangeName} />
              <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea className="form-control" value={this.state.description}
              onChange={this.onChangeDescription} />
          </div>
          <div className="form-group">
            <label>Member list: </label>
            <div style={{borderStyle: 'dotted', padding: 10}}>{this.renderData()}</div>
          </div>
          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-success" />
          </div>
        </form>
      </div>
    )
  }
}

export default EditProject;