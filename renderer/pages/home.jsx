import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
const core = require('@magenta/music/node/core');
const music_rnn = require('@magenta/music/node/music_rnn');

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
    </React.Fragment>
  );
}

export default Home;
