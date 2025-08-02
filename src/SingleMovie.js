import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

const SingleMovie = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDataById = async (id) => {
    const apiUrl = `https://www.omdbapi.com/?apikey=f1a8ea1f&i=${id}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data.Response === "True") {
        setMovieData(data);
      } else {
        throw new Error(data.Error || "No movie found");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataById(id);
  }, [id]);

  if (loading) return <p>Loading movie...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="single-movie">
      <h2>{movieData.Title}</h2>
      <p><strong>Year:</strong> {movieData.Year}</p>
      <p><strong>Genre:</strong> {movieData.Genre}</p>
      <p><strong>Plot:</strong> {movieData.Plot}</p>
      <img src={movieData.Poster} alt={movieData.Title} />
      
      <br />
       <NavLink to="/">Back to Home</NavLink> 
    </div>
  );
};

export default SingleMovie;
