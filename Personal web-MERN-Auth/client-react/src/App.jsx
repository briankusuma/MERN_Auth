import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signout } from './helpers/auth';
import { ToastContainer, toast } from 'react-toastify';

import {useSpring ,animated} from 'react-spring';

function App({ history }) {

  //animasi
  const anime = useSpring({
    from: {opacity : 0},
    to: {opacity : 1},
    config: {delay: 200, duration: 1000},
  })


  const input1 = useSpring({
    from: {opacity : 0, marginLeft: -50},
    to: {opacity : 1, marginLeft: 185 },
    config: {delay: 300, duration: 1700},
  })

  return (
    <div className='min-h-screen bg-yellow-300 text-gray-900 flex justify-center'>
            <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-orange-200 shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-8/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <animated.h1 style={anime} className='text-4xl xl:text-2xl font-extrabold  text-center '>
              Welcome to Your Personal Website{' '}
            </animated.h1>
            <div className='w-full flex-1 mt-8 text-indigo-500'>
              <div className='my-12 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium'>
                  Features
                </div>
              </div>
              <animated.div 
                style={input1}
                className='mx-auto max-w-xs relative '>
                <Link
                  to='/login'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Sign In</span>
                </Link>
                <Link
                  to='/register'
                  className='mt-5 tracking-wide font-semibold bg-gray-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-user-plus  w-6  -ml-2' />
                  <span className='ml-3'>Sign Up</span>
                </Link>
                <Link
                  to='/private'
                  className='mt-5 tracking-wide font-semibold bg-orange-500 text-gray-100 w-full py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Profile Dashbaord</span>
                </Link>
                <Link
                  to='/admin'
                  className='mt-5 tracking-wide font-semibold bg-green-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Admin Dashbaord</span>
                </Link>
                <button
                  onClick={() => {
                    signout(() => {
                      toast.success('Signout Successfully');
                      history.push('/');
                    });
                  }}
                  className='mt-5 tracking-wide font-semibold bg-pink-500 text-gray-100 w-full py-4 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-out-alt  w-6  -ml-2' />
                  <span className='ml-3'>Signout</span>
                </button>
              </animated.div>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default App;
