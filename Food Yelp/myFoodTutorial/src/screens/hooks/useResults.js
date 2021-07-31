import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
    // ADD in code to make request to api
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')

    const searchApi = async (searchTerm) => { //searchApi accepts an argument called searchTerm, and we run the searchApi request with that argument instead of term

        try {
        const response = await yelp.get('/search', {
            params: {
                limit: 50,
                term: searchTerm,
                location: 'San Jose',
            } //when we call yelp.get, we have to pass in diff params to customise the search we make
        
        }); //wait for some response to come back
        setResults(response.data.businesses)
        } catch (err) {
            setErrorMessage('Something went wrong')
        }     
    };

    useEffect(() => {
        // add code to run only 1 time
        searchApi('pasta');
    }, [])

    return [searchApi, results, errorMessage]

};