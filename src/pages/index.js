import { Inter } from 'next/font/google';
import MealCard from '../components/mealCard';
import TopCard from '@/components/topCard';
import MyHeader from '@/components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import ButtonCard from '@/components/buttonCard';
import MyFooter from '@/components/footer';
import ImageCard from '@/components/imageCard';
import Link from 'next/link';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ data }) {
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

      <MyFooter></MyFooter>
    </main>
  );
}

export async function getServerSideProps() {
  const data = (await axios.get('https://dummyjson.com/recipes?limit=15')).data;
  return {
    props: {
      data,
    },
  };
}
