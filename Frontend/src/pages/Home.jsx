import React, { useContext, useEffect, useRef, useState } from 'react'
import uberlogo from '../assets/images/uber_logo.png'
import ubermap from '../assets/images/ubermap.gif'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'


const Home = () => {
    const [ pickup, setPickup ] = useState('')
    const [ destination, setDestination ] = useState('')
    const [ panelOpen, setPanelOpen ] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [ vehiclePanelOpen, setVehiclePanelOpen ] = useState(false)
    const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
    const [ vehicleFound, setVehicleFound ] = useState(false)
    const [ waitingForDriver, setWaitingForDriver ] = useState(false)
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
    const [ fare, setFare ] = useState({})
    const [ vehicleType, setVehicleType ] = useState(null)
    const [ ride, setRide ] = useState(null)

    const navigate = useNavigate()

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    useEffect(() => {
        socket.emit('join', { userType: 'user', userId: user._id })
    }, [ user ])

    socket.on('ride-confirmed', ride => {
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride => {
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } })
    })

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }


    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function(){
        if (panelOpen){
            gsap.to(panelRef.current,{
                height: '70%',
                padding: 24
                //opacity: 1
            })
            gsap.to(panelCloseRef.current,{
                opacity: 1
            })
        }else {
            gsap.to(panelRef.current,{
                height: '0%',
                padding: 0
                //opacity: 0
            })
            gsap.to(panelCloseRef.current,{
                opacity: 0
            })
        }
    }, [panelOpen])
    

    useGSAP(function(){
        if (vehiclePanelOpen){
            gsap.to(vehiclePanelRef.current,{
                transform: 'translateY(0)'
            })
        }else {
            gsap.to(vehiclePanelRef.current,{
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanelOpen])

    useGSAP(function(){
        if (confirmRidePanel){
            gsap.to(confirmRidePanelRef.current,{
                transform: 'translateY(0)'
            })
        }else {
            gsap.to(confirmRidePanelRef.current,{
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel])

    useGSAP(function(){
        if (vehicleFound){
            gsap.to(vehicleFoundRef.current,{
                transform: 'translateY(0)'
            })
        }else {
            gsap.to(vehicleFoundRef.current,{
                transform: 'translateY(100%)'
            })
        }
    }, [vehicleFound])

    useGSAP(function(){
        if (waitingForDriver){
            gsap.to(waitingForDriverRef.current,{
                transform: 'translateY(0)'
            })
        }else {
            gsap.to(waitingForDriverRef.current,{
                transform: 'translateY(100%)'
            })
        }
    }, [waitingForDriver])

    async function findTrip() {
        setVehiclePanelOpen(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setFare(response.data)
    }

    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

  return (
    <div className='h-screen relative overflow-hidden'>
        <div className='fixed top-0 left-0 right-0 p-6 flex items-center justify-between w-full z-50'>
        <img className='w-16' src={uberlogo} alt="Uber Logo" />
        <Link to='/home' className='h-10 w-10 bg-gray-100 flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-logout-box-fill"></i>
        </Link>
    </div>
        <div className='h-[70%] w-screen'>
            {/*Temporary Image*/}
            <LiveTracking />
        </div>
        <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
            <div className='h-[30%] p-6 bg-white relative'>
            <h5 ref={panelCloseRef} onClick={() =>{
                setPanelOpen(false)
            }} className='absolute opacity-0 top-6 right-10 text-2xl z-50'>
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h4 className='text-2xl font-semibold'>Where you headed?</h4>
            <form className='relative py-3' onSubmit={(e) => {
                submitHandler(e)
            }}>
                <div className='line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-900 rounded-full'></div>
                <input
                    onClick={() => {
                        setPanelOpen(true)
                        setActiveField('pickup')
                    }}
                    value={pickup}
                    onChange={handlePickupChange} 
                    className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full' 
                    type="text" 
                    placeholder='Add a pickup location' 
                />
                <input
                    onClick={() => {
                        setPanelOpen(true)
                        setActiveField('destination')
                    }} 
                    value={destination}
                    onChange={handleDestinationChange}
                    className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' 
                    type="text" 
                    placeholder='Where you headed?' 
                />
            </form>
            <button 
                onClick={findTrip}
                className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>Find Ride
            </button>
            </div>
            <div ref={panelRef} className='bg-white h-0'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions} 
                        setPanelOpen={setPanelOpen} 
                        setVehiclePanelOpen={setVehiclePanelOpen}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField} 
                    />
            </div>
        </div>
        <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
            <VehiclePanel 
                setVehicleType={setVehicleType}
                fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>

        <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
            <ConfirmRide 
                createRide={createRide}
                pickup={pickup}
                destination={destination}
                fare={fare}
                vehicleType={vehicleType}
                setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
        </div>

        <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
            <LookingForDriver 
                createRide={createRide}
                pickup={pickup}
                destination={destination}
                fare={fare}
                vehicleType={vehicleType}
                setVehicleFound={setVehicleFound} />
        </div>

        <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'>
            <WaitingForDriver 
                ride={ride}
                setVehicleFound={setVehicleFound}
                setWaitingForDriver={setWaitingForDriver}
                waitingForDriver={waitingForDriver}  />
        </div>
    </div>
  )
}

export default Home