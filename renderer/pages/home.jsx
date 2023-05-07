import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>vivAIldi</title>
      </Head>
      <div className='mt-1 w-full flex-wrap flex justify-center'>
      <img className='absolute top-20 ml-auto mr-auto' src='images/logo.png' />
      <button class="absolute bottom-80 left-80 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-l">
        Jazz
      </button>
      <button class="absolute bottom-80 right-80 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
        Classical
      </button>
      <Link href='/create'>
      <button class="absolute bottom-40 transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:bg-blue-700 text-white text-2xl font-bold py-8 px-16 rounded-full">
        Create Your Masterpiece
      </button>    
      </Link>
      </div>
    </React.Fragment>
  );
}

export default Home;


