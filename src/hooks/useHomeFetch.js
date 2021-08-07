
// import hooks
import { useState, useEffect, useRef } from 'react';

// import the API calls
import API from '../API';

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
};

export const useHomeFetch = () =>{
    // declaring useState hooks
    const [searchTerm, setSearchTerm] = useState('')
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    
    //SANITY CHECK
    //console.log(searchTerm)

    // fetch the list of movies from the api
    const fetchMovies = async (page, searchTerm = '') => {
        try {
            setError(false);
            setLoading(true);

            //fetch the movies, await the data, spread the values
            const movies = await API.fetchMovies(searchTerm, page);
            setState(prev => ({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }));
            
        } catch (error) {
            setError(true);
        }
    
        //unmount the spinner
        setLoading(false);
    };
    
    // initialization and search
    useEffect(() => {
        setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm])

    // load more movies
    useEffect(() => {
        if (!isLoadingMore) return;
        fetchMovies(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    }, [isLoadingMore, searchTerm, state.page])

    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};

