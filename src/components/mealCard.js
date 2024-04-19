import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MealCard = ({ diffucult, title, star, time, image, url }) => {
  const router = useRouter();

  return (
    <div className=' space-y-1 h-96   bg-white p-4 rounded-lg max-w-xs mx-auto shadow-lg  flex flex-col justify-between '>
      <Link href={`/recipe/${url}`}>
        {' '}
        <div>
          {' '}
          <img
            className='mb-5 rounded-lg object-cover  w-96 h-52 '
            src={`${image}`}
            alt='src'
            width={350}
            height={200}
          ></img>
          <p className='text-gray-600 font-light text-sm '>{diffucult}</p>
          <div className='  flex flex-row items-center justify-between'>
            <h1 className='md:text-lg text-base font-bold '>{title}</h1>
            <div className=' pl-3 flex flex-row items-center  justify-center '>
              <FontAwesomeIcon className='text-yellow-400 w-5 h-5 ' icon={faStar} />
              <p className='pl-1  text-center text-xs text-gray-600'>{star}</p>
            </div>
          </div>
        </div>
      </Link>

      <div className='  flex flex-row items-center justify-between'>
        <p className='text-lg font-bold text-red-600 '>{time} min</p>

        <div className=' w-14 flex flex-row items-center justify-center space-x-4 '>
          {' '}
          <FontAwesomeIcon
            onClick={() => {
              router.push('/login');
            }}
            className='w-5 h-5 text-red-600 hover:text-red-900 '
            icon={faHeart}
          />
          <FontAwesomeIcon className='w-5 h-5 ' icon={faComment} />
        </div>
      </div>
    </div>
  );
};

export default MealCard;
