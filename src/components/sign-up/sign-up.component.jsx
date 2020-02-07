import React, { Component } from 'react';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, saveUserProfile } from "../../firebase/firebase.utils";
import validator from 'validator';

import './sign-up.styles.scss';

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      displayName: '',
      password: '',
      confirmPassword: ''
    }
  }

  validateInputs = () => {
    const pattern = /[#$%^&*()+=[\]{};'"|,<>?]+/;
    const result = {valid: false, data: null, message: ''};
    const { email, displayName, password, confirmPassword } = this.state;
    // Check if any field is empty or contains spec char
    for (const [field, val] of Object.entries(this.state)) {
      if (!val.trim()) {
        result.message = `${field} is empty`;
        return result;
      }
      if (pattern.test(val)) {
        result.message = `${field} contains invalid character`;
        return result;
      }
    }
    // Check if email is valid format
    if (!validator.isEmail(email)) {
      result.message = 'email is invalid';
      return result;
    }
    // Check length of displayName. MIN: 5 - MAX: 30
    if(displayName.trim().length < 5 || displayName.trim() > 30) {
      result.message = `displayName's length must be from 5 to 30 characters`;
      return result;
    }
    // Check password and confirmPassword
    if(validator.contains(password, ' ')) {
      result.message = 'passwords must not contain space';
      return result;
    }
    if(password.length < 5) {
      result.message = `passwords's length must contain at least 5 characters`;
      return result;
    }
    if (password !== confirmPassword) {
      result.message = 'passwords not match';
      return result;
    }

    result.valid = true;
    result.data = { displayName: displayName.trim(), email, password, confirmPassword };
    return result;
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    try {
      e.preventDefault();

      // Validate inputs
      const res = this.validateInputs();
      const { valid, data, message } = res;
      if(!valid) {
        alert(message);
        return;
      }

      // Create new user on firebase auth
      const { user } = await auth.createUserWithEmailAndPassword(data.email, data.password);

      // Save user info to firestore
      await saveUserProfile(user, { displayName: data.displayName });

      // Reset fields in state
      this.setState({
        email: '',
        displayName: '',
        password: '',
        confirmPassword: ''
      });
    } catch(err) {
      console.log(`sign up error: ${err}`);
    }
  };

  render() {
    return (
      <div className='sign-up'>
        <h2>I do not have an account</h2>
        <span>Sign up with your email and password</span>

        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            onChange={this.handleChange}
            id='display-name'
            type="text"
            name='displayName'
            label='DISPLAY NAME'
            value={this.state.displayName}
            required
          />
          <FormInput
            onChange={this.handleChange}
            id='email'
            type="email"
            name='email'
            label='EMAIL'
            value={this.state.email}
            required
          />
          <FormInput
            onChange={this.handleChange}
            id='password'
            type="password"
            name='password'
            label='PASSWORD'
            value={this.state.password}
            required
          />
          <FormInput
            onChange={this.handleChange}
            id='conform-password'
            type="password"
            name='confirmPassword'
            label='CONFIRM PASSWORD'
            value={this.state.confirmPassword}
            required
          />
          <div className='buttons'>
            <CustomButton type='submit' value='submit form'>Sign Up</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;