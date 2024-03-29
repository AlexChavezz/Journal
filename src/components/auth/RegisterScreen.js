import React, { useRef, useState } from 'react'
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { registerWithEmailAndPasword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'
import { removeError, setError } from '../../actions/ui';
import { startLodingPage } from '../../actions/loading';
import ReCAPTCHA from "react-google-recaptcha";


export const RegisterScreen = () => {

  const recaptchaRef =  useRef(null);
  const [recaptcha, setRecaptcha] = useState(null);
  const [ state, handleInputChange ] = useForm({
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });
    const { name, email, password, passwordConfirm } = state;

    const dispatch = useDispatch();
    const { error } = useSelector(state => state.ui)
    const onSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(registerWithEmailAndPasword(email, password, name));
            dispatch(startLodingPage());
        }
    }
    const isFormValid = () => {
        if (name.trim().length < 3) {
            dispatch(setError('Name is Required'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email is Required'));
            return false;
        } else if (password !== passwordConfirm || password.length < 6) {
            dispatch(setError('Password is Required'));
            return false;
        }else if(!recaptcha){
          dispatch(setError('Recaptcha is required'));
          return false;
        }
        dispatch(removeError());
        return true
    }


    const onChangeRecaptcha = () => {
        setRecaptcha(recaptchaRef.current.getValue());
    }
    return (
        <div className="auth">
            <div className="container">
                <h3>Register</h3>
                <form
                    onSubmit={onSubmit}
                    autoComplete="off"
                >
                    <input
                        type="text"
                        placeholder="Name"
                        autoComplete="off"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                    {
                        error && error === "Name is Required" &&
                        <div className="alert">
                            <span>Should have a minimum of 3 characters</span>
                        </div>
                    }
                    <input
                        type="text"
                        placeholder="Email"
                        autoComplete="off"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                     {
                        error && error === "Email is Required" &&
                        <div className="alert">
                            <span>Should contains something like '@email.com'</span>
                        </div>
                    }
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="passwordConfirm"
                        value={passwordConfirm}
                        onChange={handleInputChange}
                    />
                   {
                        error && error === "Password is Required" &&
                        <div className="alert">
                          <span>Passwords should be the same and have a minimum of 6 characters</span>
                        </div>

                    }
                    <div className="recaptcha-container">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6Le4VOAcAAAAAJpo89xEhfh1Z3igFCrj0JzUbAvQ"
                        onChange={onChangeRecaptcha}
                    />
                    {
                      error && error === "Recaptcha is required" &&
                      <div className="alert">
                        <span>Are you a robot?</span>
                      </div>
                    }
                    </div>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="REGISTER"
                    />
                </form>
                <h4><Link to="/auth/login">Already register</Link></h4>
            </div>
        </div>
    )
}
