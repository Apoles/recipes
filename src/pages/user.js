import MyHeader from '@/components/header';
import MealCard from '@/components/mealCard';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [isLog, setIsLog] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);
  const [pageCount, setPageCount] = useState();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    setSelectedButton(0);
    setCurrentPage(1);

    if (currentPage !== 1) {
      setSkip(0);
    }

    const recipes = (await axios.get(`https://dummyjson.com/recipes/search?q=${query}&limit=3`)).data;

    const buttonCount = Math.floor(recipes.total / 3);
    buttonCount % 3 == 0
      ? buttonCount / 3 < 1
        ? setPageCount(1)
        : setPageCount(buttonCount)
      : setPageCount(buttonCount + 1);
    setData(recipes.recipes);
  };

  const handleNextPage = () => {
    setSelectedButton(selectedButton + 1);

    setSkip(skip + 3);
    setCurrentPage((prevPage) => prevPage + 1);
    if (currentPage == pageCount) {
      setCurrentPage(pageCount);
      setSkip(skip);
      setSelectedButton(selectedButton);
      setPageCount(pageCount);
    }
  };

  const handlePrevPage = () => {
    selectedButton == 0 ? setSelectedButton(0) : setSelectedButton(selectedButton - 1);

    currentPage == 1 ? null : setSkip(skip - 3);

    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const searchData = async (e) => {
    const recipes = (await axios.get(`https://dummyjson.com/recipes/search?q=${e}&limit=3`)).data;
    const buttonCount = Math.floor(recipes.total / 3);
    buttonCount / 3 < 1 ? setPageCount(1) : setPageCount(buttonCount);

    setData(recipes.recipes);
  };

  useEffect(() => {
    const fetcher = async () => {
      const response = await axios.post('/api/loggedIn').catch((e) => {
        setIsLog(false);
        return false;
      });

      if (response.data?.success == true) {
        const recipes = (await axios.get(`https://dummyjson.com/recipes/search?q=${query}&limit=3&skip=${skip}`)).data;
        setData(recipes.recipes);
        const buttonCount = Math.floor(recipes.total / 3);

        buttonCount % 3 == 0
          ? buttonCount / 3 < 1
            ? setPageCount(1)
            : setPageCount(buttonCount)
          : setPageCount(buttonCount + 1);
      } else {
        setIsLog(false);

        return false;
      }
    };

    fetcher();
  }, [currentPage, query, skip]);

  console.log(skip, 'skip');
  console.log(pageCount, 'pagecount');
  console.log(selectedButton, 'selected');
  console.log(currentPage, 'curernt page');
  console.log('===================>');
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

            <div className='max-w-md w-full mx-auto max-sm:p-4 '>
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
                  onChange={handleInputChange}
                  required
                />
                <button
                  onClick={() => {
                    searchData(query);
                  }}
                  className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 '
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className='max-w-5xl mx-auto  flex flex-wrap items-center justify-center  gap-6    max-sm:px-8  max-sm:flex max-sm:flex-col max-sm:items-center  '>
            {data.length != 0 ? (
              data?.map((item, key) => (
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
              ))
            ) : (
              <button
                type='button'
                className='flex max-w-7xl mx-auto w-screen h-52 justify-center items-center'
                disabled
              >
                <svg className='animate-spin h-5 w-3 mr-3 bg-black' viewBox='0 0 24 24'></svg>
                Processing...
              </button>
            )}
          </div>
          <div className='mt-6 w-screen  h-14 flex flex-row items-center justify-evenly max-w-5xl mx-auto'>
            <button className='bg-gray-50 rounded-md p-1 hover:bg-gray-200' onClick={handlePrevPage}>
              Önceki Sayfa
            </button>
            <div className='flex max-lg:hidden  flex-row max-w-5xl space-x-3 '>
              {Array.from({ length: pageCount }).map((_, index) => (
                <div className='' key={index}>
                  <button
                    key={index}
                    className={` flex items-center justify-center  px-4 py-2 w-5 h-5  ${
                      selectedButton === index ? 'bg-blue-600 text-white' : 'bg-blue-400 text-black'
                    } text-white rounded `}
                    onClick={() => {
                      setSkip((index + 1) * 3 - 3);
                      setCurrentPage(index + 1);
                      setSelectedButton(index);
                    }}
                  >
                    {index + 1}
                  </button>
                </div>
              ))}
            </div>
            <p className=' px-4 py-2 w-5 h-5 bg-blue-600 text-white lg:hidden flex items-center justify-center'>
              {selectedButton}
            </p>

            <button className='bg-gray-50 rounded-md p-1 hover:bg-gray-200' onClick={handleNextPage}>
              Sonraki Sayfa
            </button>
          </div>
        </div>
      </div>
    );
  }
}

/*
           {pageCount?.map((e, key) => {
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
*/
