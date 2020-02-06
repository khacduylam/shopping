import React, { Component } from 'react';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { signInWithGoogle } from "../../firebase/firebase.utils";

import './sign-in.styles.scss';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state));
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log('submit');
  };

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
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
            <CustomButton type='submit' value='submit form'>Sign In</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;