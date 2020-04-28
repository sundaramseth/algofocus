import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";



class NewStudentForm extends React.Component {
  state = {
    id: "",
    name: "",
    email: "",
    document: "",
    upload:null,
    phone: "",
  };

constructor(props) {
    super(props);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.upload = React.createRef();
}




componentDidMount() {
    if (this.props.student) {
      const { id, name, email, document, upload ,phone} = this.props.student;
      this.setState({ id, name, email, document,upload , phone });
    }
  }


onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
};


createStudent = e => {
  e.preventDefault();
  console.log(this.state);
  let form_data = new FormData();
  form_data.append('id', this.state.id);
  form_data.append('name', this.state.name);
  form_data.append('email', this.state.email);
  form_data.append('document', this.state.document);
  form_data.append('upload', this.state.upload );
  form_data.append('phone', this.state.phone);
  axios.post(API_URL, form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then( res  => {
      console.log(res.data);
    this.props.resetState();
    this.props.toggle();
  });
};




  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  editStudent = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

handleChange = date => {
  this.setState({
    document: date
  });
};



handleImageChange = e => {
  this.setState({
    upload: e.target.files[0]
  })
};


  render() {
    return (

      <Form onSubmit={this.props.student ? this.editStudent : this.createStudent}>
        <FormGroup>

          <Input
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          required />
        </FormGroup>
        <FormGroup>

          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.email)}
          required />
        </FormGroup>
        <FormGroup>
        <Input
          type="date"
          name="document"
          placeholder="dob"
          id="bday"
          required="required"
          min="1980-04-04"
          max="2002-04-28"
          onChange={this.onChange}
          value={this.defaultIfEmpty(this.state.document)}
       required />

      </FormGroup>
      <FormGroup>
      <Input type="file"
      id="upload"
      name="upload"
      accept="image/png, image/jpeg, image/webp"
      selected={this.state.upload}
      onChange={this.handleImageChange}
      required />

      </FormGroup>

        <FormGroup>

          <Input
            type="text"
            name="phone"
            pattern="[6-9]{1}[0-9]{9}"
            title="Phone number with 7-9 and remaing 9 digit with 0-9"
            placeholder="Phone no"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.phone)}
          required />
        </FormGroup>
         <Input type="submit"/>
      </Form>
    );
  }
}

export default NewStudentForm;
