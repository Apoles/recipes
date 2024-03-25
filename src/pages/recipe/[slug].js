// pages/recipe/[slug].js
const axios = require('axios');

import MyFooter from '@/components/footer';
import MyHeader from '@/components/header';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RecipePage({ data, error }) {
  console.log(data);
  const router = useRouter();
  const { slug } = router.query;

  if (error)
    return (
      <div className='w-screen h-screen flex flex-row items-center justify-center '>
        <p>{error}</p>
      </div>
    );

  return (
    <div className=''>
      <Head>
        <title>{data.name} Tarifi - Yemekler</title>
        <meta name='description' content={data.name} />
      </Head>
      <MyHeader></MyHeader>
      <div className='    overflow-y-auto lg:mt-12 flex flex-col items-center justify-center p-4  lg:items-start lg:flex-row lg:space-x-12  max-w-7xl mx-auto '>
        <div className='max-lg:my-12  '>
          <img className='rounded-xl ' src={data.image} alt={data.name} width={600} height={100} />
        </div>
        <div>
          <h1 className='text-3xl font-bold mb-4'>{data.name}</h1>
          <p className='text-gray-600 mb-4'>{data.name}</p>
          <h2 className='text-xl font-semibold mb-2'>Malzemeler:</h2>
          <ul className='list-disc list-inside mb-4'>
            {data.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2 className='text-xl font-semibold mb-2'>Yapılışı:</h2>
          <ol className='list-decimal list-inside'>
            {data.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          <div className='mt-8'>
            <h3 className='text-lg font-semibold mb-2'>Etiketler:</h3>
            <div className='flex flex-wrap gap-2'>
              {data.tags.map((tag, index) => (
                <span key={index} className='px-3 py-1 bg-gray-200 rounded-lg text-sm'>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // API'den verileri çek

  try {
    const result = await axios.get(`https://dummyjson.com/recipes/${context.params.slug}`);

    const data = result.data;

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

/*
 <div className="container mx-auto py-8">
      <Head>
        <title>{recipe.title} Tarifi - Yemekler</title>
        <meta name="description" content={recipe.description} />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Image src={recipe.image} alt={recipe.title} width={800} height={600} />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-gray-600 mb-4">{recipe.description}</p>
          <h2 className="text-xl font-semibold mb-2">Malzemeler:</h2>
          <ul className="list-disc list-inside mb-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2">Yapılışı:</h2>
          <ol className="list-decimal list-inside">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Etiketler:</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-200 rounded-lg text-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
*/
