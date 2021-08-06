import React, { useState, useEffect } from 'react';

// API
import API from '../API';

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

// Component Imports
import HeroImage from './HeroImage';
// Hooks
import { useHomeFetch } from '../hooks/useHomeFetch';

// Image Imports
import NoImage from '../images/no_image.jpg';

// Start Home Component:
const Home = () => {
    const { state, loading, error } = useHomeFetch();

    // Sanity Check
    console.log(state);

    return (
        <>
            {state.results[0] ? 
                <HeroImage 
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                    title={state.results[0].original_title}
                    text={state.results[0].overview}
                />
            : null
            }
        </>
    );
};


export default Home;


