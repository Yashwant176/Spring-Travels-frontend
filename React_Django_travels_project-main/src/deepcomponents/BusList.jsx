import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BusList = ({token}) => {
    const [buses, setBuses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterOrigin, setFilterOrigin] = useState('')
    const [filterDestination, setFilterDestination] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/buses/")
                setBuses(response.data)
            } catch (error) {
                console.log('error in fetching buses', error)
                setError('Failed to load buses. Please try again later.')
            } finally {
                setIsLoading(false)
            }
        }
        fetchBuses()
    }, [])

    const handleViewSeats = (id) => {
        navigate(`/bus/${id}`)
    }

    const filteredBuses = buses.filter(bus => {
        const matchesSearch = bus.bus_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             bus.number.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesOrigin = filterOrigin ? bus.origin.toLowerCase() === filterOrigin.toLowerCase() : true
        const matchesDestination = filterDestination ? bus.destination.toLowerCase() === filterDestination.toLowerCase() : true
        return matchesSearch && matchesOrigin && matchesDestination
    })

    const uniqueOrigins = [...new Set(buses.map(bus => bus.origin))]
    const uniqueDestinations = [...new Set(buses.map(bus => bus.destination))]

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
            {/* <div className="">
                <img src="/assets/Green Bus.png" alt="" />
            </div> */}
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Available Buses</h1>
            
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <input
                            type="text"
                            placeholder="Search buses..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={filterOrigin}
                            onChange={(e) => setFilterOrigin(e.target.value)}
                        >
                            <option value="">All Origins</option>
                            {uniqueOrigins.map(origin => (
                                <option key={origin} value={origin}>{origin}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={filterDestination}
                            onChange={(e) => setFilterDestination(e.target.value)}
                        >
                            <option value="">All Destinations</option>
                            {uniqueDestinations.map(destination => (
                                <option key={destination} value={destination}>{destination}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={() => {
                                setSearchTerm('')
                                setFilterOrigin('')
                                setFilterDestination('')
                            }}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {filteredBuses.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900">No buses found</h3>
                    <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBuses.map((bus) => (
                        <div key={bus.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">{bus.bus_name}</h2>
                                        <p className="text-gray-600">Bus No: {bus.number}</p>
                                    </div>
                                    <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                        Available
                                    </span>
                                </div>

                                <div className="mt-4">
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        <span>{bus.origin} → {bus.destination}</span>
                                    </div>

                                    <div className="flex items-center text-gray-600 mb-2">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span>Depart: {bus.start_time}</span>
                                    </div>

                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span>Arrive: {bus.reach_time}</span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button
                                        onClick={() => handleViewSeats(bus.id)}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                                    >
                                        View Seats & Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BusList