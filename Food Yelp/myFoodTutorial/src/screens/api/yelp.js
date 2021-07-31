import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer dyBi8UPcd1xde4k09F6dDJkRLMtQeX4x4WROj1AlB5j7hnXHL2lQrkUwKlc9qq6Wt5fUP_3tOvuMqhGrWq14M1Mn_lSaE7pMlA_C_FPS0PJFm7-Qaog7eBe5R__iX3Yx'
    }
});

/*
    1. SearchScreen function called
    2. searchApi called immediately
    3. Make request to yelp API
    4. Get search results, call setter
    5. Updated state causes component to rerender
*/

