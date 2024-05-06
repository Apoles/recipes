import { Inter } from 'next/font/google';
import MealCard from '../components/mealCard';
import MyHeader from '@/components/header';

import ButtonCard from '@/components/buttonCard';
import MyFooter from '@/components/footer';
import ImageCard from '@/components/imageCard';
import axios from 'axios';
import useSWR from 'swr';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const fetcher = async (url) => {
    const response = (await axios.get(url)).data;
    return response;
  };

  const { data, error, isLoading } = useSWR(['https://dummyjson.com/recipes?limit=15'], fetcher, {
    refreshInterval: 360000,
  });

  if (isLoading)
    return (
      <button type='button' className='flex max-w-7xl mx-auto h-screen items-center' disabled>
        <svg className='animate-spin h-5 w-3 mr-3 bg-black' viewBox='0 0 24 24'></svg>
        Processing...
      </button>
    );

  /*if (error) {
    return <div>HATALI İŞLE</div>;
  }*/

  return (
    <main className=''>
      <MyHeader></MyHeader>

      <div
        className={`flex min-h-screen flex-col items-center justify-between px-24 py-12 bg-gray-50 ${inter.className}`}
      >
        <ImageCard></ImageCard>
        <div className='lg:mt-12 max-sm:w-60 max-sm:content-center flex flex-row items-center  lg:space-x-6 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1 max-lg:gap-4 max-sm:mb-12  max-lg:mt-12  '>
          <ButtonCard title={'Recipes & Menus'} hex={'bg-[#F6784C]'}></ButtonCard>
          <ButtonCard title={'Share your recipe'} hex={'bg-[#C4D600]'}></ButtonCard>
          <ButtonCard title={'Custom meal plan'} hex={'bg-[#EAAA00]'}></ButtonCard>
          <ButtonCard title={'Cooking Tips & Tricks '} hex={'bg-[#84BD00]'}></ButtonCard>
        </div>

        <div className='flex flex-col md:items-start items-center '>
          <h1 className='sm:text-3xl text-2xl mt-12 font-bold text-gray-900 leading-tight mb-2 pb-4 relative'>
            <span className='bg-clip-text text-black'>Recommended Recipes</span>
          </h1>
          <div className='  grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:w-screen max-sm:px-8  max-sm:flex max-sm:flex-col max-sm:items-center  '>
            {data?.recipes?.map((item, key) => (
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

      <MyFooter></MyFooter>
    </main>
  );
}
