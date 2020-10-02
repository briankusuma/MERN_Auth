import React, { useState } from 'react';
import authSvg from '../assests/auth.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import {useSpring ,animated} from 'react-spring';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
    textChange: 'Sign Up'
  });

  const { name, email, password1, password2, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        setFormData({ ...formData, textChange: 'Submitting' });
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            name,
            email,
            password: password1
          })
          .then(res => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'Submitted'
            });

            toast.success(res.data.message);
          })
          .catch(err => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'Sign Up'
            });
            console.log(err.response);
            toast.error(err.response.data.errors);
          });
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.error('Please fill all fields');
    }
  };
  //ANIMASI
 

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

  return (
    <div className='min-h-screen bg-orange-300 text-gray-900 flex justify-center'>
      {isAuth() ? <Redirect to='/' /> : null}
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-yellow-300 shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <animated.h1 
              style= {anime}
              className='text-2xl xl:text-3xl font-extrabold'>
              Sign Up for Personal Web
            </animated.h1>

            <form
              className='w-full flex-1 mt-8 text-indigo-500'
              onSubmit={handleSubmit}
            >
              <div className='mx-auto max-w-xs relative '>
                <animated.input
                  style= {input1}
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='text'
                  placeholder='Name'
                  onChange={handleChange('name')}
                  value={name}
                />
                <animated.input
                  style= {input2}
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email}
                />
                <animated.input
                  style= {input3}
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='password'
                  placeholder='Password'
                  onChange={handleChange('password1')}
                  value={password1}
                />
                <animated.input
                  style= {input4}
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='password'
                  placeholder='Confirm Password'
                  onChange={handleChange('password2')}
                  value={password2}
                />
                <animated.button
                  style= {button1}
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                  <span className='ml-3'>{textChange}</span>
                </animated.button>
              </div>
              <animated.div style={button1} className='my-12 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium'>
                  Or sign with email or social login
                </div>
              </animated.div>
              <animated.div style={button1} className='flex flex-col items-center'>
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                            bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/login'
                  target='_self'
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                  <span className='ml-4'>Sign In</span>
                </a>
              </animated.div>
            </form>
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

export default Register;
