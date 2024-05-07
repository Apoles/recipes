import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MyHeader from '@/components/header';

const Login = () => {
  const [myEmail, setMyEmail] = useState('');
  const [myPassword, setMyPassword] = useState('');

  const router = useRouter();

  const handleEmail = (event) => {
    setMyEmail(event.target.value);
  };
  const handlePass = (event) => {
    setMyPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { myEmail, myPassword });

      if (response.data.success === true) {
        router.push('/user');
      }
    } catch (error) {}
  };

  return (
    <div>
      <MyHeader></MyHeader>

      <div className='md:0mt-24  flex flex-col justify-center max-sm:px-4 py-12 sm:px-6 lg:px-8 '>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
          <p>{myPassword}</p>
          <p>{myEmail}</p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-gray-100 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form onSubmit={handleSubmit} className='space-y-6' action='#' method='POST'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  Email address
                </label>
                <div className='mt-1'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    placeholder={'atuny0@sohu.com'}
                    value={'atuny0@sohu.com'}
                    onChange={handleEmail}
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                  Password
                </label>
                <div className='mt-1'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    placeholder={'9uQFF1Lh'}
                    onChange={handlePass}
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                  />
                  <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                    Remember me
                  </label>
                </div>

                <div className='text-sm'>
                  <a href='#' className='font-medium text-[#F6784C] hover:text-[#ED8B00]'>
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#509E2F] hover:bg-[#84BD00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
