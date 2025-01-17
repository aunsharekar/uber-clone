import React from 'react'
import aunsh from '../assets/images/aunsh.jpeg'

const RidePopUp = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={()=>{
              props.setRidePopupPanel(false)  
            }} ><i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold'>New Ride available!</h3>
        <div className='flex items-center justify-between mt-4 p-3 bg-gray-200 rounded-lg'>
            <div className='flex items-center gap-3'>
                <img className='h-10 w-10 rounded-full object-cover' src={aunsh} alt="" />
                <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
            </div>
                <h5 className='text-lg font-semibold'>8.1 miles</h5>
        </div>
        <div className='flex flex-col gap-2 justify-between items-center'>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>1001 UTA Blvd</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>1001 UTA Blvd</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="ri-bank-card-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>${props.ride?.fare}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Card</p>
                    </div>
                </div>
            </div>
            <div className='flex mt-5 w-full items-center justify-between'>
            <button onClick={()=>{
                    props.setRidePopupPanel(false)
                }} className='mt-1 bg-gray-400 text-black font-semibold p-3 px-10 rounded-lg'>Ignore</button>
            <button onClick={()=>{
                props.setConfirmRidePopupPanel(true)
                props.confirmRide()
                }} className='bg-[#2692df] text-white font-semibold p-3 px-10 rounded-lg'>Accept</button>
                
            </div>
        </div>
    </div>
  )
}

export default RidePopUp