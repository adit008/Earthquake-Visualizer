import React from 'react'
import Side from '../Components/EarthquakeData'
import EarthquakeData from '../Components/EarthquakeData'

const Visuals = () => {
  return (
    <div className='h-screen w-screen flex'>
        <div className='bg-amber-100 w-screen h-screen '>
            <EarthquakeData />
        </div>

    </div>
  )
}

export default Visuals