import MyHeader from '@/components/header';
import '@/styles/globals.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import useSWR from 'swr';

export default function App({ Component, pageProps, data }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const fetchLoginStatus = async () => {
    try {
      const response = (await axios.get('http://localhost:3000/api/loggedIn')).data;

      if (response) {
        console.log('var');
        setIsLoggedIn(true);
        setUser(response.user);
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchLoginStatus();
  }, [isLoggedIn]);

  return (
    <div>
      <MyHeader isLoggedIn={isLoggedIn} user={user}></MyHeader>
      <Component {...pageProps} isLoggedIn={isLoggedIn} user={user} />;
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await axios.get('http://localhost:3000/api/loggedIn');
    const data = response.data;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
}
