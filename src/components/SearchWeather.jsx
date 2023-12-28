// Import all functions needed
import React, { useEffect, useState } from 'react'
import './SearchWeather.css';
import {FaSearch, FaCloudSun, FaRegSnowflake, FaSmog} from 'react-icons/fa';
import axios from 'axios';
import { IoThunderstormOutline } from "react-icons/io5";
import { BsCloudDrizzle } from "react-icons/bs";
import { GiHeavyRain } from "react-icons/gi";

// Let us create different states
function SearchWeather() {
    const [search, setSearch] = useState("Lagos")
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [data4, setData4] = useState([])
    const [input, setInput] = useState('')

    // Let us gate data online using axios package
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=3b2d0f0ccdb13e95b01040acd0652b7f`)
        .then((result) => {
            console.log(result.data);
            setData1(result.data)
            setData2(result.data.main)
            setData3(result.data.wind)
            setData4(result.data.weather[0])
        })
        .catch((err) => {
            console.log(err);
        })
    },[search])

    // Get current date and time
    const currentDate = new Date()
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'Macrh', 'April', 'May', 'June', 'July', 'August', 'September', 'December'];

    let hours = currentDate.getHours()
    let minutes = currentDate.getMinutes()
    let seconds = currentDate.getSeconds()
    let time = null;

    // Establish 12 hours time system
    if (hours > 12) {
        hours = (hours - 12)
        time = `${hours} : ${minutes} : ${seconds}pm`;
    } else {
        hours = hours
        time = `${hours} : ${minutes} : ${seconds}am`;
    }

// Get weather emoji
let emoji = null;
if (data4.main == "Clouds") {
    emoji = <FaCloudSun size = {40}/>;
} else if (data4.main == "Thunderstorm") {
    emoji = <IoThunderstormOutline size = {40}/>
} else if (data4.main == "Drizzle") {
    emoji = <BsCloudDrizzle size = {40}/>
} else if (data4.main == "Rain") {
    emoji = <GiHeavyRain size = {40}/>
} else if (data4.main == "Snow") {
    emoji = <FaRegSnowflake size = {40}/>;
} else {
    emoji = <FaSmog size = {40}/>
}

// Let us create a function for the search button
const handleSearch = (e) => {
    e.preventDefault()
    setSearch(input)
}

// Let us create a function for the enter key
const pressHandle = (e) =>{
    if (e.key == "Enter") {
        e.preventDefault()
        setSearch(input)
    }
}

  return (
    <div className='slider'>
        <div className='bg'>
            <div className='content-container'>
                <div className='card'>
                    <div className='search'>
                        <input className='search-bar' type="text" onChange = {(e) => setInput(e.target.value)} onKeyUp = {pressHandle} required />
                        <FaSearch className='search-icon' size={20} onClick = {handleSearch} />
                    </div>

                    <div className='weather'>
                        <h2 className='city'>Weather in {data1.name}</h2>
                        <h1 className='temp'>{data2.temp} <sup>o</sup>C </h1>
                        {/* <i className = {`fas ${emoji} fa-4x`}></i> */}
                        {emoji}
                        <p className='description'>{data4.main}</p>
                        <p className='humidity'>Humidty : {data2.humidity}%</p>
                        <p className='wind'>Wind speed : {data3.speed}km/h</p>
                    </div>
                </div>

                <p className='date'>{days[currentDate.getDay()]}, {currentDate.getDate()}th {currentDate.toLocaleString("default", {month:'long'})} {currentDate.getFullYear()} <br /> {time} </p>
            </div>
        </div>
    </div>
  )
}

export default SearchWeather