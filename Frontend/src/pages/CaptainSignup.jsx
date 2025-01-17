import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainSignup = () => {

    const navigate = useNavigate()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword] = useState('')
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    
    const [ vehicleColor, setVehicleColor ] = useState('')
    const [ vehiclePlate, setVehiclePlate ] = useState('')
    const [ vehicleCapacity, setVehicleCapacity ] = useState('')
    const [ vehicleType, setVehicleType ] = useState('')

    const { captain, setCaptain } = React.useContext(CaptainDataContext)

    const submitHandler = async(e) => {
        e.preventDefault()
        const captainData={
            fullname:{
                firstname:firstName,
                lastname:lastName
            },
            email:email,
            password:password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

        if (response.status === 201) {
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('token', data.token)
            navigate('/captain-home')
        }
        
        setEmail('')
        setFirstName('')
        setLastName('')
        setPassword('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
    }

    
    // useEffect(()=>{
    //     if (userData){
    //         console.log(userData)
    //     }
    // }, [userData])


  return (
    <div className='p-5 px-5 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-16 mb-10' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>

            <h3 className=' text-lg w-1/2 font-medium mb-2'>What's your name?</h3>
            <div className='flex gap-4 mb-7'>
            <input 
                required
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'  
                type="text" 
                placeholder='First Name'
                value={firstName}
                onChange={(e)=>{
                    setFirstName(e.target.value)
                }}
                />

            <input 
                required
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'  
                type="text" 
                placeholder='Last Name'
                value={lastName}
                onChange={(e)=>{
                    setLastName(e.target.value)
                }}
                />
            </div>

            <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
            <input 
                required
                className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'  
                type="email" 
                placeholder='email@example.com'
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            
            <input 
                className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
                required
                type='password' 
                placeholder='password'
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                />
            
            <h3 className='text-lg font-medium mb-2'>Vehicle Details</h3>
            <div className='flex gap-4 mb-7'>
                <input 
                    required
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                    type="text"
                    placeholder='Vehicle Color'
                    value={vehicleColor}
                    onChange={(e) => {
                        setVehicleColor(e.target.value)
                    }}
                    />
                <input 
                    required
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                    type="text"
                    placeholder='Vehicle Plate'
                    value={vehiclePlate}
                    onChange={(e) => {
                        setVehiclePlate(e.target.value)
                    }}
                    />
            </div>
            <div className='flex gap-4 mb-7'>
            <input 
                required
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder='Vehicle Capacity'
                value={vehicleCapacity}
                onChange={(e) => {
                    setVehicleCapacity(e.target.value)
                }}
                />
                <select
                    required
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                    value={vehicleType}
                    onChange={(e) => {
                        setVehicleType(e.target.value)
                    }}
                    >
                        <option value="" disabled>Vehicle Type</option>
                        <option value="car">Car</option>
                        <option value="auto">Auto</option>
                        <option value="moto">Moto</option>
                </select>
            </div>

            <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Account</button>
            </form>
            <p className='text-center'>Already have an account?
            <Link to="/captain-login" className='text-blue-600'>Login here!</Link></p>
        </div>
        <div>
            <p className='text-[10px] mt-6 leading-tight'>By proceeding, you consent to get calls, emails, including any automated means, from Uber and it's affiliates to the credentials provided.</p>
        </div>
    </div>
  )
}

export default CaptainSignup