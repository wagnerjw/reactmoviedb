import { useState, useEffect } from "react";

// API import
import API from '../API';


export const useMovieFetch = movieId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                //initialize loading, and errors
                setLoading(true);
                setError(false);

                //load the movie data, load the movie credits
                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);
                // now get the director only
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );

            // set the state to the movies, cast, directors
            setState({
                ...movie,
                actors: credits.cast,
                directors
            })
                // else catch error
            } catch (error) {
                setError(true);
            }

            // loading is done, set loading to false
            setLoading(false);
        }; 
        fetchMovie();
    }, [movieId]);

    return { state, loading, error };
};

