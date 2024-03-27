'use client';

import { parseCookies } from 'nookies';
import MyHeader from '@/components/header';
import MealCard from '@/components/mealCard';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Home({ data }) {
  const router = useRouter();

  useEffect(() => {
    if (data == false) {
      router.push('/login');
    }
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (data == false) {
    return <p>Kullanici GİRİŞİ YAPILMAMIŞ</p>;
  }
  return (
    <div>
      <MyHeader></MyHeader>
      <div className='max-w-5xl mx-auto flex flex-col md:items-start items-center '>
        {' '}
        <h1 className='sm:text-3xl pl-4 text-2xl mt-12 font-bold text-gray-900 leading-tight mb-2 pb-4 relative'>
          <span className='bg-clip-text text-black'>Your Recipes</span>
        </h1>{' '}
        <div className='max-w-5xl mx-auto  grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:w-screen max-sm:px-8  max-sm:flex max-sm:flex-col max-sm:items-center  '>
          {data.recipes.map((item, key) => (
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
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);

  const response = await axios
    .post('https://recipes-theta-eight.vercel.app/api/loggedIn', {
      authToken: cookies.authToken,
    })
    .catch((e) => {
      return false;
    });

  if (response == false) {
    return {
      props: { data: false },
    };
  } else {
    const recipes = await axios.get('https://dummyjson.com/recipes?limit=10');

    const data = await recipes.data;

    // BAŞKA İŞLEMLER

    return {
      props: { data },
    };
  }
}