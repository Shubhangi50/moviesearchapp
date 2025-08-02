import React from 'react'
import { useGlobalContext } from './context'
import { NavLink } from 'react-router-dom';

const Movies = () => {
  const { movies, isLoading } = useGlobalContext();
  if (isLoading) {
    return (
      <section>
        <div className="loading">Loading....</div>;
      </section>
    );
  }


  return (
   <>
   <section className='movie-page'>
    <div className=' container grid grid-4-col'>
   
  
   {movies.map((curMovie)=> {
    const {imdbID, Title, Poster} = curMovie;
    const movieName = Title.length > 15 ? `${Title.substring(0, 15)}...` : Title;
   return (
   < NavLink to ={`movie/${imdbID}`} key={imdbID}>
    <div className='card'>
      <div className='card-info'>
        <h2>{movieName}</h2>
        <img src={Poster} alt={imdbID} />

      </div>

    </div>
   </NavLink>
   )
   })}
    </div>
   </section>
   </>
  )
};

export default Movies