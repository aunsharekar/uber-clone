import React from 'react'
import ubercar from '../assets/images/ubercar.png'
import ubermoto from '../assets/images/uberbike.webp'
import uberauto from '../assets/images/uberauto.webp'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={()=>{
                props.setVehiclePanelOpen(false)
            }} ><i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
                props.setVehicleType('car')
            }} className='flex border-2 active:border-black bg-gray-100 mb-2 rounded-xl w-full p-3 items-center justify-between'>
                <img className='h-20' src={ubercar} alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>UberX <span><i className="ri-user-3-line"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>${props.fare.car}</h2>
            </div>
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
                props.setVehicleType('moto')
            }} className='flex border-2 active:border-black bg-gray-100 mb-2 rounded-xl w-full p-3 items-center justify-between'>
                <img className='h-14' src={ubermoto} alt="" />
                <div className='-ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>UberMoto <span><i className="ri-user-3-line"></i>1</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
                </div>
                <h2 className='text-lg font-semibold'>${props.fare.moto}</h2>
            </div>
            <div onClick={()=>{
                props.setConfirmRidePanel(true)
                props.setVehicleType('auto')
            }} className='flex border-2 active:border-black bg-gray-100 mb-2 rounded-xl w-full p-3 items-center justify-between'>
                <img className='h-14' src={uberauto} alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>UberXL <span><i className="ri-user-3-line"></i>5</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
                </div>
                <h2 className='text-lg font-semibold'>${props.fare.auto}</h2>
            </div>
    </div>
  )
}

export default VehiclePanel