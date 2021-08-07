import React from 'react';
import { useParams } from 'react-router-dom';

// config imports
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

// components import
import Grid from './Grid';
import Spinner from './Spinner';
import BreadCrumb from './BreadCrumb';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';

// hooks import
import { useMovieFetch } from '../hooks/useMovieFetch';

// image import
import NoImage from '../images/no_image.jpg';


const Movie = () => {
    const { movieId } = useParams();
    const { state: movie, loading, error } = useMovieFetch(movieId);

    // SANITY CHECK - remember in the line below MOVIE = STATE...
    //console.log(movie)

    // handle the spinner and error messages... 
    if (loading) return <Spinner />; 
    if (error) return <div>Something went wrong... </div>;
    
    return ( 
        <>
            <BreadCrumb movieTitle={movie.original_title} />
            <MovieInfo movie={movie} />
            <MovieInfoBar 
                time={movie.runtime} 
                budget={movie.budget} 
                revenue={movie.revenue} 
            />
            <Grid header='Cast Members'>
                {movie.actors.map(actor => (
                    <Actor
                        key={actor.credit_id}
                        name={actor.name}
                        character={actor.character}
                        imageUrl={
                            actor.profile_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                            : NoImage
                        }
                    />
                ))}
            </Grid>
        </>
    )
};

export default Movie;