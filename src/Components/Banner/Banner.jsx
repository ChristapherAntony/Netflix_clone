
import React, { useEffect, useState } from 'react'
import {API_KRY,imgUrl} from "../../constants/constants"
import axios from '../../axios'
import "./Banner.css"


function Banner() {
  const [movie, setMovie] = useState()
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KRY}&language=en-US`).then((response)=>{
      setMovie(response.data.results[Math.floor(Math.random() * 21 )])
    })
   
  }, [])
  return (
    <div style={{backgroundImage:`url(${movie?imgUrl+ movie.backdrop_path:""})`}} className='banner'>
        <div className="content">
            <h1 className="title">{movie?.title}</h1>
            <div className="banner_buttons">
                <button className="button">Play</button>
                <button className="button">My list</button>
            </div>
            <h1 className="description">{movie?.overview}</h1>
        </div>
        <div className="fade_bottom"></div>
        
    </div>
  )
}

export default Banner