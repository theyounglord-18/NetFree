import { useContext,createContext } from "react";
import { useState, useEffect } from "react";
export const PaginationContext = createContext();
export function PaginationContextProvider({children}){
    const [pageSize, setPageSize] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [watchLater, setWatchLater] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState(null);
    useEffect(()=>{
        const fetchmovies = async () => {
            const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=9139705d9f63345831e93b1b5450a0da&language=en-US&region=IN&page=1');
            const data = await response.json();
            console.log(data)
            setTopRatedMovies(data.results)
        }
        fetchmovies()
    },[])
    const addToWatchLater = (movie) => {
        setWatchLater((prev)=>{
            const check = watchLater.find((item)=>item.id==movie.id)
            if(!check){
                return [...prev,movie]
            }else{
                return prev
            }
        })
    }

    const removeFromWatchLater = (movie)=>{
        setWatchLater((prev)=>{
            const remove = prev.filter((i)=>i.id!=movie.id)
            return remove
        })
    }
    return(
        <PaginationContext.Provider value={{pageSize, setPageSize, currentPage, setCurrentPage, setWatchLater, watchLater, topRatedMovies, addToWatchLater, removeFromWatchLater}}>
            {children}
        </PaginationContext.Provider>
    )
};