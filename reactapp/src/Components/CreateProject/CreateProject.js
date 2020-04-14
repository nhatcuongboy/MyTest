import React, { Component } from 'react';
import './CreateProject.css';
import axios from 'axios';

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      members: [],
      checkedMembers: [],
      errors: ''
    }
  }

  componentDidMount() {
    this.loadMembers();
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


  loadMembers() {
    axios.get('http://localhost:4000/api/member/members')
      .then(res => {
        this.setState({
          members: res.data
        })
      });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      const obj = {
        name: this.state.name,
        description: this.state.description,
        members: this.state.checkedMembers
      };
      axios.post('http://localhost:4000/api/project/create', obj)
        .then(res => {
          alert('Create project successfully !!!');
          this.props.history.push('/list-project');
        })
        .catch(err => {

        })
    } else {
      alert("Form has errors.")
    }
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
        <h3 style={{ marginBottom: 30 }}>Add New Project</h3>
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
            <label>Member List: </label>
            <p style={{borderStyle: 'dotted', padding: 10}}>{this.renderData()}</p>
          </div>
          <div className="form-group">
            <input type="submit" value="Create" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

export default CreateProject;