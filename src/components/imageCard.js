import React from 'react';

const ImageCard = () => {
  return (
    <div className='max-sm:w-screen  max-sm:p-5  max-w-5xl  flex-col rounded-lg   flex  lg:flex-row'>
      <img className='w-[1570px] h-96  object-cover ' src='/res.jpeg' alt='' />
      <div className='flex flex-col bg-[#b6dae3]  justify-center p-6'>
        <h5 className='mb-2 text-2xl font-bold'>Card title</h5>
        <p className='mb-4 text-base font-normal '>
          This is a wider card with supporting text below as a natural lead-in to additional content. This content is a
          little bit longer.
        </p>
        <p className='text-xs text-surface/75 '>Last updated 3 mins ago</p>
      </div>
    </div>
  );
};

export default ImageCard;
