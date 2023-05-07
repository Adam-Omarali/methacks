import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>vivAIldi</title>
      </Head>
      <div className='mt-1 w-full flex-wrap flex justify-center'>
        <Link href='/create'>
          <a className='btn-blue'>Create</a>
        </Link>
      </div>
      {/* <div className='mt-1 w-full flex-wrap flex justify-center'>
        <Link href='/drums'>
          <a className='btn-blue'>Drums</a>
        </Link>
      </div>
      <div className='mt-1 w-full flex-wrap flex justify-center'>
        <Link href='/microphone'>
          <a className='btn-blue'>Microphone</a>
        </Link>
      </div> */}
    </React.Fragment>
  );
}

export default Home;
