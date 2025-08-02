import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();
const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppProvider = ({children}) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const[isError, setisError] = useState({
        show:false, msg:''

    })
    const[query, setQuery] = useState("titanic")
    const getMovies = async(url)=>{
       
        try{
       const res = await fetch(url);
       const data = await res.json();
       
       console.log("abc",data);
       if(data.Response==="True"){
        setIsLoading(false);
        setMovies(data.Search);
    }else{
        setisError(
            {
                show:true,
                msg:data.Error,
            }
        )
    }
        }
        catch(error){
        console.log(error);
        }

    }
  useEffect(() =>{
   let timerOut =  setTimeout(()=>{
        getMovies(`${API_URL}&s=${query}`);
    },500)

    return () => clearTimeout(timerOut);
  
  },[query])

    return <AppContext.Provider value={{isLoading, isError, movies, setQuery}}>
        {children}
    </AppContext.Provider>
};

const useGlobalContext = () => {
    return useContext(AppContext);
};


export {AppContext, AppProvider, useGlobalContext};