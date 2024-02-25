import React from 'react'
import heroImage from '../assets/hero.png'

const Hero = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center md:pt-16'>
      <div className='md:pt-4 md:w-[50vw]'>
<h1 className='text-xl font-semibold font-sans text-slate-600 mt-20'>Latest Collections</h1>
<h1 className='md:text-8xl text-4xl   font-sans gradient-text text-transparent  bg-gradient-to-r from-slate-600 to-slate-900 font-extrabold bg-clip-text mt-6 md:mt-0'>Your's Choices</h1>
<h1  className='md:text-8xl text-4xl  font-sans gradient-text text-transparent  bg-gradient-to-r from-slate-900 to-slate-700 font-extrabold bg-clip-text pl-20 md:pl-32'>Our Priorities</h1>
<p className='md:text-xl md:mt-5 mt-3 font-semibold text-slate-700'>"Get all the latest technolgies with greatest Deals"</p>
<p className='md:text-xl md:mt-2 font-semibold text-slate-700 pl-[2rem]'>-Kartik Verma</p>
<div className=' md:mt-10 md:ml-32 mt-6 ml-6 flex space-x-8'>
<button className='bg-slate-900 text-white text-lg px-8  py-1 md:py-2 rounded-lg hover:bg-white border-2 hover:text-slate-700 font-semibold md:text-3xl border-slate-900'>Shop</button>
<button className='md:text-3xl text-lg border-slate-900 border-2 hover:bg-slate-900 font-semibold hover:text-white px-8 py-2 rounded-lg'>Login</button>
</div>

<p className=' md:mt-10 mt-4 md:text-xl font-semibold text-slate-700'>Our Collections:</p>
      </div>
      <div>
<img src={heroImage} alt="" className='md:h-[90vh] h-[70vh] md:w-[40vw] object-cover ' />
      </div>
    </div>
  )
}

export default Hero
