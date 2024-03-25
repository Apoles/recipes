const TopCard = () => {
  return (
    <div className='max-sm:hidden  w-full   header-bg py-14 rounded-2xl mb-12 '>
      <div className=' mx-auto lg:px-24  px-12  max-md:pl-8 '>
        <div className={'grid grid-cols-2'}>
          <div className='text-white  max-md:w-80  space-y-4'>
            <h1 className='text-5xl font-bold max-md:text-4xl text-orange-500 '>Trending Now.</h1>
            <p className='text-5xl font-bold max-md:text-4xl  '>Mike’s famous salad with cheese. </p>

            <p className='text-2xl   font-semibold'>By John Mike</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCard;
