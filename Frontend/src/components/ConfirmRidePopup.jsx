import React, { useState } from 'react'
import aunsh from '../assets/images/aunsh.jpeg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopup = (props) => {
    const [ otp, setOtp ] = useState('')
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding', { 
                state: { 
                    ride: props.ride,
                    pickup: props.ride.pickup,
                    destination: props.ride.destination 
                } 
            })
        }
    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel(false)
            }} >
                <i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-semibold'>Confirm this Ride</h3>
            <div className='flex items-center justify-between mt-4 p-3 bg-gray-200 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src={aunsh} alt="" />
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
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
                
                <div className='mt-6 w-full'>
                    <form onSubmit={submitHandler}>
                        <input 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)} 
                            type="text" 
                            className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' 
                            placeholder='Enter OTP' 
                        />
                        <button className='w-full mt-5 text-lg flex justify-center bg-[#2692df] text-white font-semibold p-3 rounded-lg'>Confirm</button>
                        <button 
                            onClick={() => {
                                props.setConfirmRidePopupPanel(false)
                                props.setRidePopupPanel(false)
                            }} 
                            className='w-full mt-1 bg-[#bc1c1c] text-lg text-white font-semibold p-3 rounded-lg'>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopup
