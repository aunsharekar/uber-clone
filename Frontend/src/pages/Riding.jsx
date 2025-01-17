import React, { useContext, useEffect } from 'react'
import ubermap from '../assets/images/ubermap.gif'
import ubercar from '../assets/images/ubercar.png'
import { Link, useLocation } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on('ride-ended', () => {
        navigate('/home')
    })


  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full z-50'>
            <i className="text-lg font-medium ri-home-4-line"></i>
        </Link>
        <div className='h-1/2'>
            <LiveTracking/>

        </div>
        <div className='h-1/2 p-4'>
        <div className='flex items-center justify-between'>
          <img className='h-12' src={ubercar} alt="" />
          <div className='text-right'>
            <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
            <p className='text-sm text-gray-600'>Kia Forte</p>
          </div>
        </div>

        <div className='flex flex-col gap-2 justify-between items-center'>
            <div className='w-full mt-5'>
                
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-lg ri-map-pin-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>1001 UTA Blvd</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="ri-bank-card-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>${ride?.fare}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Card</p>
                    </div>
                </div>
            </div>
        </div>
        <button className='w-full mt-5 bg-green-400 text-white font-semibold p-2 rounded-lg'>Make Payment</button>
        </div>
    </div>
  )
}

export default Riding