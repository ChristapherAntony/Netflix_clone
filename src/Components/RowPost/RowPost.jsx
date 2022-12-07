
import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import { API_KRY, imgUrl } from '../../constants/constants'
import Youtube from 'react-youtube'
import "./RowPost.css"


function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId, setUrlId] = useState('')
  useEffect(() => {
    axios.get(props.url).then((response) => {
      setMovies(response.data.results)
    }).catch(err => {
      alert("network error")
    })

  }, [])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id) => {
    console.log(id);

    axios.get(`movie/${id}/videos?api_key=${API_KRY}&language=en-US&=934641`).then((response) => {
      console.log(response.data.results);
      const index = response.data.results.map(object => object.type).indexOf('Trailer');
      if (index > 0) {
        
        setUrlId(response.data.results[index])
      } else {
        console.log("array is empty");
      }
    })
  }

  return (
    <div className='row'>
      <h2>{props.name}</h2>
      <div className="posters">
        {
          movies.map((obj) => {
            return (
              <img onClick={() => { handleMovie(obj.id) }} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imgUrl + obj.backdrop_path}`} alt="posters" />

            )
          })
        }


      </div>
      {urlId && <Youtube opts={opts} videoId={urlId.key} />}


    </div>
  )
}

export default RowPost