import React from 'react'
import ubercar from '../assets/images/ubercar.png'

const LookingForDriver = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={()=>{
                props.setVehicleFound(false)
            }} ><i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

        <div className='flex flex-col gap-2 justify-between items-center'>
            <img className='h-20' src={ubercar} alt="" />
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>1001 UTA Blvd</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>1001 UTA Blvd</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="ri-bank-card-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>${props.fare[props.vehicleType]}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Card</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default LookingForDriver