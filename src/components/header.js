import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function MyHeader() {
  const router = useRouter();

  const [navbar, setNavbar] = useState(false);
  const [log, setLog] = useState(false);

  const fetcher = async (url) => {
    const response = (await axios.get(url)).data;
    if (response) {
      setLog(true);
    }

    return response;
  };

  const { data, error, isLoading, isValidating } = useSWR(['/api/loggedIn'], fetcher, {
    refreshInterval: 36000,
    revalidateOnMount: true,
    revalidateOnFocus: false,
    dedupingInterval: true,
    revalidateIfStale: false,
  });

  useEffect(() => {}, []);

  if (isLoading) {
    return (
      <div>
        <Head>
          <title>a</title>
          <meta name='description' content='Create Next JS Responsive Menu with Tailwind CSS' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <nav className='w-full bg-[#509E2F] shadow'>
          <div className='  justify-between px-4 mx-auto lg:max-w-5xl md:items-center md:flex md:px-8'>
            <div>
              <div className='flex items-center justify-between py-3 md:py-5 md:block'>
                <Link href='/'>
                  <h2 className='text-2xl text-white font-bold'>NEXT JS</h2>
                </Link>
                <div className='md:hidden'>
                  <button
                    className='p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6 text-white'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6 text-white'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                  navbar ? 'block' : 'hidden'
                }`}
              >
                <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
                  <li className='text-white'>
                    <Link href='/'>
                      <p>Home</p>
                    </Link>
                  </li>
                  <li className='text-white'>
                    <Link href='/user'>
                      <p>Explore</p>
                    </Link>
                  </li>
                  <li className='text-white'>
                    <Link href='/'>
                      <p>About US</p>
                    </Link>
                  </li>
                  <li className='text-white'>
                    <p> loading </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  if (log == true) {
    const handleLogout = async () => {
      try {
        await axios.post('/api/logOut'); // logout API endpoint'ini çağır
        window.location.href = '/';
      } catch (error) {}
    };

    return (
      <div>
        <Head>
          <title>a</title>
          <meta name='description' content='Create Next JS Responsive Menu with Tailwind CSS' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <nav className='w-full bg-[#509E2F] shadow'>
          <div className='  justify-between px-4 mx-auto lg:max-w-5xl md:items-center md:flex md:px-8'>
            <div>
              <div className='flex items-center justify-between py-3 md:py-5 md:block'>
                <Link href='/'>
                  <h2 className='text-2xl text-white font-bold'>NEXT JS</h2>
                </Link>
                <div className='md:hidden'>
                  <button
                    className='p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6 text-white'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6 text-white'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                  navbar ? 'block' : 'hidden'
                }`}
              >
                <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
                  <li className='text-white'>
                    <Link href='/'>
                      <p>Home</p>
                    </Link>
                  </li>
                  <li className='text-white'>
                    <Link href='/'>
                      <p>Explore</p>
                    </Link>
                  </li>
                  <li className='text-white'>
                    <Link href='/'>
                      <p>About US</p>
                    </Link>
                  </li>
                  <li className='text-white'>
                    <Link href='/user'>
                      Welcome {data.user.firstName}
                      {'  '}
                      {data.user.lastName}
                    </Link>
                  </li>
                  <button
                    onClick={handleLogout}
                    className=' text-white hover:text-gray-200 font-bold py-1 px-1 rounded inline-flex items-center'
                  >
                    <svg className=' fill-current w-5 h-5 mr-1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 25'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M2 6.5C2 4.01472 4.01472 2 6.5 2H12C14.2091 2 16 3.79086 16 6V7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7V6C14 4.89543 13.1046 4 12 4H6.5C5.11929 4 4 5.11929 4 6.5V17.5C4 18.8807 5.11929 20 6.5 20H12C13.1046 20 14 19.1046 14 18V17C14 16.4477 14.4477 16 15 16C15.5523 16 16 16.4477 16 17V18C16 20.2091 14.2091 22 12 22H6.5C4.01472 22 2 19.9853 2 17.5V6.5ZM18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071L19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071C17.9024 15.3166 17.9024 14.6834 18.2929 14.2929L19.5858 13L11 13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11L19.5858 11L18.2929 9.70711C17.9024 9.31658 17.9024 8.68342 18.2929 8.29289Z'
                        fill='#FFFFFF'
                      />
                    </svg>
                    <span>Log Out</span>
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  if (log == false) {
    return (
      <div>
        <Head>
          <title>a</title>
          <meta name='description' content='Create Next JS Responsive Menu with Tailwind CSS' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <nav className='w-full bg-[#509E2F] shadow'>
          <div className='  justify-between px-4 mx-auto lg:max-w-5xl md:items-center md:flex md:px-8'>
            <div>
              <div className='flex items-center justify-between py-3 md:py-5 md:block'>
                <Link href='/'>
                  <h2 className='text-2xl text-white font-bold'>NEXT JS</h2>
                </Link>
                <div className='md:hidden'>
                  <button
                    className='p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6 text-white'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6 text-white'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                  navbar ? 'block' : 'hidden'
                }`}
              >
                <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
                  <li className='text-white'>
                    <Link href='/'>
                      <p>Home</p>
                    </Link>
                  </li>
                  <li className='text-white'>
                    <Link href='/user'>
                      <p>Explore</p>
                    </Link>
                  </li>
                  <li className='text-white'>
                    <Link href='/'>
                      <p>About US</p>
                    </Link>
                  </li>
                  <li className='text-white'>
                    <Link href='/login'>Login</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
