import React, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css"
import Banner from "./Components/Banner/Banner";
import RowPost from "./Components/RowPost/RowPost";
import { action, originals } from "./url";
import axios from './axios'
import { API_KRY } from "./constants/constants";




function App() {
  
  const [genres,setGenres]=useState([])
  useEffect(() => {
    axios.get(`genre/movie/list?api_key=${API_KRY}&language=en-US`).then((response)=>{
      setGenres(response.data.genres)
    })
   
  }, [])

  
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <RowPost url={originals} title="Netflix Originals" />
      {/* <RowPost url={action} title="Action" isSmall /> */}
      
      {
        genres.map((obj)=>{
          return(
            <RowPost url={`discover/movie?api_key=${API_KRY}&with_genres=${obj.id}`} name={obj.name} title="Action" isSmall />
          )
        })
      }

      
    

    </div>
  );
}

export default App;
