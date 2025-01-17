import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

const LiveTracking = ({ pickup, destination }) => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [directions, setDirections] = useState(null);

    useEffect(() => {
        // Get the current position of the user
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });

        const watchId = navigator.geolocation.watchPosition((position) => {
            setCurrentPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        const fetchDirections = async () => {
            console.log('Fetching directions from:', pickup, 'to:', destination);
    
            if (pickup && destination) {
                const origin = typeof pickup === 'string' ? pickup : new google.maps.LatLng(pickup.lat, pickup.lng);
                const dest = typeof destination === 'string' ? destination : new google.maps.LatLng(destination.lat, destination.lng);
    
                const directionsService = new google.maps.DirectionsService();
                directionsService.route(
                    {
                        origin: origin,
                        destination: dest,
                        travelMode: google.maps.TravelMode.DRIVING,
                    },
                    (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            setDirections(result);
                        } else {
                            console.error('Error fetching directions:', status);
                        }
                    }
                );
            }
        };
    
        fetchDirections();
    }, [pickup, destination]);
    

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition || { lat: 0, lng: 0 }}
                zoom={15}
            >
                {currentPosition && <Marker position={currentPosition} />}
                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
        </LoadScript>
    )
}

export default LiveTracking
