import React from 'react';

const ImageCard = () => {
  return (
    <div className='max-sm:w-screen  max-sm:p-5  max-w-5xl  flex-col rounded-lg   flex  lg:flex-row'>
      <img className='w-[1570px] h-96  object-cover ' src='/res.jpeg' alt='' />
      <div className='flex flex-col bg-[#b6dae3]  justify-center p-6'>
        <h5 className='mb-2 text-2xl font-bold'>Cheesecake</h5>
        <p className='mb-4 text-base font-normal '>
          Look no further for a creamy and ultra smooth classic cheesecake recipe! No one can deny its simple decadence
        </p>
        <p className='text-xs text-surface/75 '>Last updated 3 mins ago</p>
      </div>
    </div>
  );
};

export default ImageCard;
