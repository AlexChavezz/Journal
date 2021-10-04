import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { LoginWithEmailAndPassword, loginWithFacebook, loginWithGoogle } from '../../actions/auth';
import { startLodingPage } from '../../actions/loading';
import { startLoading } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const [ state, handleInputChange ] = useForm({
        email: '',
        password: '',
    });
    const { email, password } = state;

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch( startLoading() )
        dispatch(LoginWithEmailAndPassword(email, password));
        dispatch(startLodingPage());

    }
    const handleLoginWithGoogle = () => {
        dispatch(loginWithGoogle());
    }
    const handleLoginWithFacebook = () => {
        dispatch(loginWithFacebook());
    }

    return (
        <div className="auth">
            <div className="container">
                <h3>Login</h3>
                <form
                    onSubmit={onSubmit}
                >
                    <input
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="LOGIN"
                        disabled={ loading }
                    />
                </form>
                <h4>or</h4>
                <div className="google-btn"
                    onClick={handleLoginWithGoogle}
                >
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="googleLogo" />
                    </div>
                    <p className="btn-text"><b>Sign in with Google</b></p>
                </div>
                <div className="facebook-btn"
                    onClick={handleLoginWithFacebook}
                >
                    <div className="facebook-icon-wrapper">
                        <svg height="100%" viewBox="0 0 20 20" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M18.007 19c.55 0 .993-.444.993-.993V1.993A.992.992 0 0018.007 1H1.993A.992.992 0 001 1.993v16.014c0 .55.444.993.993.993h16.014zm-4.587 0v-6.97h2.34l.35-2.717h-2.69V7.578c0-.786.218-1.322 1.346-1.322h1.438v-2.43a18.915 18.915 0 00-2.096-.108c-2.073 0-3.494 1.267-3.494 3.59v2.005H8.268v2.717h2.346V19h2.806z" fill="#3B5998" fillRule="evenodd"></path></svg>
                    </div>
                    <p className="btn-text"><b>Sign in with Facebook</b></p>
                </div>


                <h4><Link to="/auth/register">Create account</Link></h4>
            </div>
        </div>
    )
}
