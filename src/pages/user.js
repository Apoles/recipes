import MyHeader from '@/components/header';
import MealCard from '@/components/mealCard';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import useSWR from 'swr';

const PAGE_SIZE = 3;
const INITIAL_PAGE = 1;

export default function Home({ isLoggedIn, user }) {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [recipes, setRecipes] = useState([]);
  const [pageCount, setPageCount] = useState([]);
  const [data, setData] = useState();
  const [isLog, setIsLog] = useState();

  // const { data, error, isLoading } = useSWR(['https://recipes-theta-eight.vercel.app/api/loggedIn'], fetcher, {});
  /*const { data, error, isLoading, isValidating } = useSWR('http://localhost:3000/api/loggedIn', fetcher, {
    shouldRetryOnError: false,
  });


*/
  const paginatedData = useMemo(() => {
    if (!data) return [];
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const items = Array.from({ length: data.recipes?.length / PAGE_SIZE }, (_, index) => index + 1);
    setPageCount(items);

    setRecipes(data.recipes?.slice(start, end));

    return data.recipes?.slice(start, end);
  }, [data, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const router = useRouter();

  useEffect(() => {
    const fetcher = async () => {
      const response = await axios.post('/api/loggedIn').catch((e) => {
        setIsLog(false);
        return false;
      });

      if (response.data?.success == true) {
        const recipes = (await axios.get('https://dummyjson.com/recipes')).data;
        setData(recipes);

        return { recipes: recipes, response: response.data.user };
      } else {
        setIsLog(false);

        return false;
      }
    };

    fetcher();
  }, []);

  if (isLog == false)
    return (
      <div className='grid h-screen place-content-center bg-white px-4'>
        <div className='text-center'>
          <h1 className='text-9xl font-black text-gray-400'>404</h1>

          <p className='mt-4 text-gray-500'>We cant find that page.</p>

          <Link
            href='/'
            className='mt-6 inline-block rounded bg-gray-800 px-5 py-3 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring'
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );

  if (!data) {
    return (
      <button type='button' className='flex max-w-7xl mx-auto h-screen items-center' disabled>
        <svg className='animate-spin h-5 w-3 mr-3 bg-black' viewBox='0 0 24 24'></svg>
        Processing...
      </button>
    );
  }

  /*  if (error) {
    return (
      <div className='grid h-screen place-content-center bg-white px-4'>
        <div className='text-center'>
          <h1 className='text-9xl font-black text-gray-400'>404</h1>

          <p className='mt-4 text-gray-500'>We cant find that page.</p>

          <Link
            href='/'
            className='mt-6 inline-block rounded bg-gray-800 px-5 py-3 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring'
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }
*/
  if (data) {
    return (
      <div>
        <MyHeader></MyHeader>

        <div className='max-w-5xl mx-auto flex flex-col md:items-start items-center '>
          <div className='flex flex-row items-center mb-8 max-sm:flex-col max-sm:space-y-3  justify-evenly mt-16  w-full mx-auto'>
            <div className='text-center  '>
              <h1 className='sm:text-3xl pl-4 text-2xl text-center font-bold text-gray-900 leading-tight  relative'>
                <span className='bg-clip-text text-black'>Your Recipes</span>
              </h1>
            </div>

            <form className='max-w-md w-full mx-auto max-sm:p-4 '>
              <label htmlFor='default-search' className='text-sm font-medium text-gray-900 sr-only dark:text-white'>
                Search
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                    />
                  </svg>
                </div>
                <input
                  type='search'
                  id='default-search'
                  className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 '
                  placeholder='Search Mockups, Logos...'
                  required
                />
                <button
                  type='submit'
                  className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 '
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className='max-w-5xl mx-auto  grid grid-cols-3  gap-6 max-md:grid-cols-1 max-sm:grid-cols-1 max-sm:w-screen max-sm:px-8  max-sm:flex max-sm:flex-col max-sm:items-center  '>
            {recipes?.map((item, key) => (
              <div className='' key={key}>
                <MealCard
                  key={key}
                  diffucult={item.difficulty}
                  star={item.rating}
                  time={item.prepTimeMinutes}
                  title={item.name}
                  image={item.image}
                  url={item.id}
                ></MealCard>
              </div>
            ))}
            <div className='mt-6 w-screen flex flex-row items-center justify-evenly max-w-5xl mx-auto'>
              <button
                className='bg-gray-50 rounded-md p-1 hover:bg-gray-200'
                onClick={handlePrevPage}
                disabled={currentPage === INITIAL_PAGE}
              >
                Önceki Sayfa
              </button>

              {pageCount.map((e, key) => {
                return (
                  <button
                    className={`${
                      currentPage == e ? 'bg-gray-300 text-blue-600 w-6 h-6 rounded-lg ' : 'w-6 h-6'
                    }  max-md:hidden  `}
                    onClick={() => {
                      setCurrentPage(e);
                    }}
                    key={key}
                  >
                    {e}
                  </button>
                );
              })}

              <button
                className='bg-gray-50 rounded-md p-1 hover:bg-gray-200'
                disabled={currentPage === pageCount.pop()}
                onClick={handleNextPage}
              >
                Sonraki Sayfa
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
/*
export async function getServerSideProps(context) {
  const cookies = parseCookies(context);

  const { req } = context;

  const response = await axios
    .post('http://localhost:3000/api/loggedIn', {
      authToken: cookies.authToken,
    })
    .catch((e) => {
      return false;
    });

  if (response == false) {
    return {
      props: { result: false },
    };
  } else {
    return {
      props: { result: true },
    };
  }
}
*/
/*
 <div className='max-w-5xl mx-auto flex flex-col md:items-start items-center '>
          <div className='flex flex-row items-center mb-8 max-sm:flex-col max-sm:space-y-3  justify-evenly mt-16  w-full mx-auto'>
            <div className='text-center  '>
              <h1 className='sm:text-3xl pl-4 text-2xl text-center font-bold text-gray-900 leading-tight  relative'>
                <span className='bg-clip-text text-black'>Your Recipes</span>
              </h1>
            </div>

            <form className='max-w-md w-full mx-auto max-sm:p-4 '>
              <label htmlFor='default-search' className='text-sm font-medium text-gray-900 sr-only dark:text-white'>
                Search
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                    />
                  </svg>
                </div>
                <input
                  type='search'
                  id='default-search'
                  className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 '
                  placeholder='Search Mockups, Logos...'
                  required
                />
                <button
                  type='submit'
                  className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 '
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className='max-w-5xl mx-auto  grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:w-screen max-sm:px-8  max-sm:flex max-sm:flex-col max-sm:items-center  '>
            {data?.recipes.map((item, key) => (
              <div key={key}>
                <MealCard
                  key={key}
                  diffucult={item.difficulty}
                  star={item.rating}
                  time={item.prepTimeMinutes}
                  title={item.name}
                  image={item.image}
                  url={item.id}
                ></MealCard>
              </div>
            ))}
          </div>
        </div>
*/
