import React, { useRef, useState } from 'react'
import uberlogo from '../assets/images/uber_logo.png'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const { ride, pickup, destination } = location.state || {}

    useGSAP(() => {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    return (
        <div className='h-screen relative flex flex-col justify-end'>
            {/* Header */}
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src={uberlogo} alt="" />
                <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-fill"></i>
                </Link>
            </div>

            {/* Route Information */}
            <div 
                className='h-1/5 p-6 flex items-center justify-between relative bg-gray-300'
                onClick={() => setFinishRidePanel(true)}
            >
                <h5 className='p-1 text-center w-[95%] absolute top-0'>
                    <i className="text-3xl text-gray-500 ri-arrow-up-wide-line"></i>
                </h5>
                <h4 className='text-xl font-semibold'>8.2 miles away</h4>
                <button className='bg-[#2692df] text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>

            {/* Finish Ride Panel */}
            <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <FinishRide 
                    ride={ride}
                    setFinishRidePanel={setFinishRidePanel} 
                />
            </div>

            {/* Live Tracking */}
            <div className='h-screen fixed w-screen top-0 z-[-1]'>
                <LiveTracking pickup={pickup} destination={destination} />
            </div>
        </div>
    )
}

export default CaptainRiding
