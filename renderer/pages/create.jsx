import React from 'react'
import Tuner from './next'
import Link from 'next/link'

export default function Create() {
    
  return (
    <>
        <div className='w-full flex justify-evenly'>
            <Tuner drums={false} instrument={"Melody"}/>
            <Tuner drums={true} instrument={"Snare"}/>
            <Tuner drums={true} instrument={"Kick"}/>
            <Tuner drums={true} instrument={"Hi Hat"}/>
        </div>
        <div className='mt-1 w-full flex-wrap flex justify-center'>
            <Link href="/home">
                <a className='text-white font-bold px-4 py-2 rounded bg-black-600'>Home</a>
            </Link>
        </div>
    </>
    )
}
