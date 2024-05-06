import MyHeader from '@/components/header';
import '@/styles/globals.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import useSWR from 'swr';

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  return (
    <div>
      <Component {...pageProps} />;
    </div>
  );
}
