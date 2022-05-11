import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import Swal from "sweetalert2";
import emailjs from 'emailjs-com';

const validEmailRegex = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

const serviceID = `${process.env.REACT_APP_EMAIL_SERVICE_ID}`;
const templateID= `${process.env.REACT_APP_EMAIL_TEMPLATE_ID}`;
const userID= `${process.env.REACT_APP_EMAIL_USER_ID}`;

console.log(serviceID, templateID, userID)

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      email: null,
      message: null,
      errors: {
        fullName: "",
        email: "",
        message: "",
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "fullName":
        errors.fullName =
          value.length < 5
            ? "Full Name must be at least 5 characters long!"
            : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "message":
        errors.message =
          value.length < 1
            ? "Required!"
            : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.email && this.state.message && this.state.fullName && validateForm(this.state.errors)) {
      emailjs.sendForm(serviceID, templateID, event.target, userID)
      .then((result) => {
        console.log(result.text);
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully'
        })
      }, (error) => {
        console.log(error.text);
        Swal.fire({
          icon: 'error',
          title: 'Ooops, something went wrong',
          text: error.text,
        })
      });
    event.target.reset()
    } else {
      alert("Invalid Form");
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <h2>Contact Us</h2>
            <Form inline onSubmit={this.handleSubmit} noValidate>
              <FormGroup floating>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  type="text"
                  onChange={this.handleChange}
                  noValidate
                />
                {errors.fullName.length > 0 && (
                  <span className="error" style={{ color: "red" }}>
                    {errors.fullName}
                  </span>
                )}
                <Label for="fullName">Full Name</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  onChange={this.handleChange}
                  noValidate
                  
                />
                {errors.email.length > 0 && (
                  <span className="error" style={{ color: "red" }}>{errors.email}</span>
                )}
                <Label for="email">Email</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="message"
                  name="message"
                  placeholder="Feedback Message"
                  type="textarea"
                  onChange={this.handleChange}
                  noValidate
                />
                {errors.message.length > 0 && (
                  <span className="error" style={{ color: "red" }}>{errors.message}</span>
                )}
                <Label for="message">Feedback Message</Label>
              </FormGroup>{" "}
              <Button>Submit</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
