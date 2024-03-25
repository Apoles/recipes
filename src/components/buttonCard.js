import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function ButtonCard({ hex, title }) {
  return (
    <div
      className={`${hex}  w-[236px] max-w-7xl  h-[86px]  p-4 flex flex-row items-center space-x-3 justify-between rounded-md shadow-md`}
    >
      <h1 className='text-lg font-medium text-white '>{title} </h1>
      <FontAwesomeIcon className=' w-5 h-5 text-white ' icon={faArrowRight} />
    </div>
  );
}
