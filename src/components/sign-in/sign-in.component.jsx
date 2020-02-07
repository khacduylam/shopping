import React, { Component } from 'react';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import validator from "validator";

import './sign-in.styles.scss';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  validateInputs = () => {
    const pattern = /[#$%^&*()+=[\]{};'"|,<>?]+/;
    const result = { valid: false, data: null, message: '' };
    const { email, password } = this.state;
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

    result.valid = true;
    result.data = { email, password };
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

      // Sign in with email and password
      await auth.signInWithEmailAndPassword(data.email, data.password);

      // Reset fields in state
      this.setState({ email: '', password: '' });
    } catch(err) {
      console.log(`sign in error: ${err}`);
      alert(err.message);
    }
  };

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form className='sign-in-form' onSubmit={this.handleSubmit}>
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
          <div className='buttons'>
            <CustomButton
              type='submit'
              value='submit form'
            >
              Sign In
            </CustomButton>
            <CustomButton
              onClick={signInWithGoogle}
              isGoogleSignIn
            >
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;