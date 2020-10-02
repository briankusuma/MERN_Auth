import React, { useState } from 'react';
import authSvg from '../assests/login.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import {useSpring ,animated} from 'react-spring';

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'Sign In'
  });
  const { email, password1, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const sendGoogleToken = tokenId => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  };
  const informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === 'admin'
        ? history.push('/admin')
        : history.push('/private');
    });
  };

  const sendFacebookToken = (userID, accessToken) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/facebooklogin`, {
        userID,
        accessToken
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  };
  const responseGoogle = response => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };

  const responseFacebook = response => {
    console.log(response);
    sendFacebookToken(response.userID, response.accessToken)
  };

  const handleSubmit = e => {
    console.log(process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password: password1
        })
        .then(res => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: '',
              password1: '',
              textChange: 'Submitted'
            });
            isAuth() && isAuth().role === 'admin'
              ? history.push('/admin')
              : history.push('/private');
            toast.success(`Hey ${res.data.user.name}, Welcome back!`);
          });
        })
        .catch(err => {
          setFormData({
            ...formData,
            email: '',
            password1: '',
            textChange: 'Sign In'
          });
          console.log(err.response);
          toast.error(err.response.data.errors);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };

  //animasi


  const anime = useSpring({
    from: {opacity : -1},
    to: {opacity : 1},
    config: {delay: 200, duration: 1000},
  })
  
  const anime1 = useSpring({
    from: {opacity : -1, marginTop: -200},
    to: {opacity : 1 , marginTop: 0},
    config: {delay: 200, duration: 1000},
  })

  const button1 = useSpring({
    from: {opacity : -1},
    to: {opacity : 1},
    config: {delay: 1700, duration: 1900},
  })

  const input1 = useSpring({
    from: {opacity : -1, marginLeft: -100},
    to: {opacity : 1, marginLeft: 0 },
    config: {delay: 500, duration: 1000},
  })

  const input2 = useSpring({
    from: {opacity : -1, marginLeft: -120},
    to: {opacity : 1, marginLeft: 0 },
    config: {delay: 800, duration: 1300},
  })

  const input3 = useSpring({
    from: {opacity : -1, marginLeft: -140},
    to: {opacity : 1, marginLeft: 0 },
    config: {delay: 1100, duration: 1600},
  })

  const input4 = useSpring({
    from: {opacity : -1, marginLeft: -160},
    to: {opacity : 1, marginLeft: 0 },
    config: {delay: 1400, duration: 1900},
  })

  const input5 = useSpring({
    from: {opacity : -1, marginLeft: -160},
    to: {opacity : 1, marginLeft: 0 },
    config: {delay: 1500, duration: 2000},
  })

  return (
    <div className='min-h-screen bg-orange-300 text-gray-900 flex justify-center'>
      {isAuth() ? <Redirect to='/' /> : null}
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-yellow-300 shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <animated.h1 style={anime} className='text-2xl xl:text-3xl font-extrabold'>
              Sign In for Personal Web
            </animated.h1>
            <div className='w-full flex-1 mt-8 text-indigo-500'>
              <div className='flex flex-col items-center'>
                
                <GoogleLogin                  
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <animated.button
                      style={input1}
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                    >
                      <div className=' p-2 rounded-full '>
                        <i className='fab fa-google ' />
                      </div>
                      <span className='ml-4'>Sign In with Google</span>
                    </animated.button>
                  )}
                ></GoogleLogin>

                <FacebookLogin
                  appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                  autoLoad={false}
                  callback={responseFacebook}
                  render={renderProps => (
                    <animated.button
                      style={input2}
                      onClick={renderProps.onClick}
                      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    >
                      <div className=' p-2 rounded-full '>
                        <i className='fab fa-facebook' />
                      </div>
                      <span className='ml-4'>Sign In with Facebook</span>
                    </animated.button>
                  )}
                />

                <animated.a
                  style={input3}
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/register'
                  target='_self'
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2 text-indigo-500' />
                  <span className='ml-4'>Sign Up</span>
                </animated.a>
              </div>
              <div className='my-12 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium'>
                  Or sign In with e-mail
                </div>
              </div>
              <form
                className='mx-auto max-w-xs relative '
                onSubmit={handleSubmit}
              >
                <animated.input
                  style={input4}
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email}
                />
                <animated.input
                  style={input5}
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='password'
                  placeholder='Password'
                  onChange={handleChange('password1')}
                  value={password1}
                />
                <animated.button
                style={button1}
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Sign In</span>
                </animated.button>
                <Link
                  to='/users/password/forget'
                  className='no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2'
                >
                  Forget password?
                </Link>
              </form>
            </div>
          </div>
        </div>
        <animated.div style={anime1} className='flex-1 bg-yellow-200 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </animated.div>
      </div>
      ;
    </div>
  );
};

export default Login;
