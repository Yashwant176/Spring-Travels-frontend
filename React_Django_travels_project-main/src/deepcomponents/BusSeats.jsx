import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const BusSeats = ({ token }) => {
    const [bus, setBus] = useState(null)
    const [seats, setSeats] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedSeat, setSelectedSeat] = useState(null)

    const { busId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                const response = await axios(`http://localhost:8000/api/buses/${busId}`)
                setBus(response.data)
                setSeats(response.data.seats || [])
            } catch (error) {
                console.log('Error in fetching details', error)
                setError('Failed to load bus details. Please try again later.')
            } finally {
                setIsLoading(false)
            }
        }
        fetchBusDetails()
    }, [busId])

    const handleBook = async (seatId) => {
        if (!token) {
          alert('Please login to book a seat');
          navigate('/login');
          return;
        }
      
        try {
          const res = await axios.post(
            'http://localhost:8000/api/booking/',
            { seat: seatId },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          alert('Booking successful!');
          setSeats((prevSeats) =>
            prevSeats.map((seat) =>
              seat.id === seatId ? { ...seat, is_booked: true } : seat
            )
          );
        } catch (error) {
          alert(error.response?.data?.error || 'Please login to book a seat')
          navigate('/login');
        }
      };
      

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-4 max-w-4xl mx-auto">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {bus && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">{bus.bus_name}</h1>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Journey Details</h3>
                                <div className="space-y-2">
                                    <p className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        <span className="font-medium">Route:</span> {bus.origin} → {bus.destination}
                                    </p>
                                    <p className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <span className="font-medium">Departure:</span> {bus.start_time}
                                    </p>
                                    <p className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <span className="font-medium">Arrival:</span> {bus.reach_time}
                                    </p>
                                    <p className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v4a4 4 0 008 0V7m-8-3v4a4 4 0 008 0V4M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <span className="font-medium">Bus Number:</span> {bus.number}
                                    </p>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Seat Legend</h3>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-md mr-2"></div>
                                        <span className="text-sm text-gray-600">Available</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 bg-red-500 rounded-md mr-2"></div>
                                        <span className="text-sm text-gray-600">Booked</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 bg-yellow-500 rounded-md mr-2"></div>
                                        <span className="text-sm text-gray-600">Selected</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Select Your Seat</h2>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {seats.map((seat) => (
                            <button
                                key={seat.id}
                                onClick={() => !seat.is_booked && handleBook(seat.id)}
                                disabled={seat.is_booked || selectedSeat === seat.id}
                                className={`relative p-4 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
                                    seat.is_booked 
                                        ? 'bg-red-100 cursor-not-allowed' 
                                        : selectedSeat === seat.id
                                            ? 'bg-yellow-100'
                                            : 'bg-green-100 hover:bg-green-200 cursor-pointer'
                                }`}
                            >
                                <span className={`text-lg font-medium ${
                                    seat.is_booked ? 'text-red-800' : 'text-green-800'
                                }`}>
                                    {seat.seat_number}
                                </span>
                                {seat.is_booked && (
                                    <span className="text-xs text-red-600 mt-1">Booked</span>
                                )}
                                {selectedSeat === seat.id && !seat.is_booked && (
                                    <div className="absolute top-0 right-0 -mt-2 -mr-2">
                                        <div className="animate-ping h-4 w-4 rounded-full bg-yellow-400 opacity-75"></div>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <button
  onClick={() => navigate('/my-bookings')}
  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
>
  View Booking Details
</button>
        </div>
    )
}

export default BusSeats