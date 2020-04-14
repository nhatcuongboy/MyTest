import React, { Component } from 'react';
import './CreateMember.css';
import axios from 'axios';

class CreateMember extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      phone: '',
      birthday: '',
      errors: ''
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeBirthday(e) {
    this.setState({
      birthday: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      const obj = {
        name: this.state.name,
        phone: this.state.phone,
        birthday: this.state.birthday
      };
      axios.post('http://localhost:4000/api/member/create', obj)
        .then(res => {
          alert('Create member successfully !!!');
          this.props.history.push('/list-member');
        });
    } else {
      alert("Form has errors.")
    }
  }

  handleValidation() {
    let name = this.state.name;
    let phone = this.state.phone;
    let birthday = this.state.birthday;
    let errors = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }

    if (!phone) {
      formIsValid = false;
      errors["phone"] = "* Cannot be empty";
    } else {
      const regexp = /^\d{10,11}$/;
      const checkingResult = regexp.exec(phone);
      if (checkingResult == null) {
        formIsValid = false;
        errors["phone"] = "* Must 10-11 numbers";
      }
    }

    if (!birthday) {
      formIsValid = false;
      errors["birthday"] = "* Cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 style={{ marginBottom: 30 }}>Add New Member</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: *</label>
            <input type="text" className="form-control" value={this.state.name}
              onChange={this.onChangeName} />
            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
          </div>
          <div className="form-group">
            <label>Phone: * </label>
            <input type="text" className="form-control" value={this.state.phone}
              onChange={this.onChangePhone} />
            <span style={{ color: "red" }}>{this.state.errors["phone"]}</span>
          </div>
          <div className="form-group">
            <label>Birthday: *</label>
            <input type="date" className="form-control" value={this.state.birthday}
              onChange={this.onChangeBirthday} />
            <span style={{ color: "red" }}>{this.state.errors["birthday"]}</span>
          </div>
          <div className="form-group">
            <input type="submit" value="Create" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

export default CreateMember;