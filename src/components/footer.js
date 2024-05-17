export default function MyFooter() {
  return (
    <footer className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='lg:flex lg:items-start lg:gap-8'>
          <div className='text-[#509E2F]'></div>

          <div className='mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16'>
            <div className='col-span-2'>
              <div>
                <h2 className='text-2xl font-bold text-gray-900'>Get the latest news!</h2>

                <p className='mt-4 text-gray-500'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non cupiditate quae nam molestias.
                </p>
              </div>
            </div>

            <div className='col-span-2 lg:col-span-3 lg:flex lg:items-end'>
              <div className='w-full'>
                <label htmlFor='UserEmail' className=''>
                  {' '}
                  Email{' '}
                </label>

                <div className=' border p-2  sm:flex sm:items-center sm:gap-4'>
                  <input
                    type='email'
                    id='UserEmail'
                    placeholder='dolaripsum@rhcp.com'
                    className='w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm'
                  />

                  <button className='mt-1 w-full bg-[#509E2F] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0'>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 border-t border-gray-100 pt-8'>
          <div className='sm:flex sm:justify-between'>
            <p className='text-xs text-gray-500'>&copy; 2022. Company Name. All rights reserved.</p>

            <ul className='mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end'>
              <li>
                <p href='' className='text-gray-500 transition hover:opacity-75'>
                  {' '}
                  Terms & Conditions{' '}
                </p>
              </li>

              <li>
                <p href='' className='text-gray-500 transition hover:opacity-75'>
                  {' '}
                  Privacy Policy{' '}
                </p>
              </li>

              <li>
                <p href='' className='text-gray-500 transition hover:opacity-75'>
                  {' '}
                  Cookies{' '}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
