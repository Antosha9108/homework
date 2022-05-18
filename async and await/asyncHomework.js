
//fetch API
const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json')

console.log(fetchPromise);

fetchPromise.then( response => {
    console.log(`Received response: ${response.status}`);
});

console.log('Started request...')


//chaining promises



fetchPromise.then(response => {
    const jsonPromise = response.json();
    jsonPromise.then(json => {
        console.log(json[0].name)
    })
})

//same but neater 
fetchPromise
    .then(response =>{
        if (!response.ok){
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(json => {
        console.log(json[0].name)
    })

    //catching errors

    const fetchPromise2 = fetch('bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

    fetchPromise2
        .then( response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })

        .then(json => {
            console.log(json[0].name);
        })
        .catch(error =>{
            console.error(`Could not get products: ${error}`)
        });


        //chaining promises
        const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
        const fetchPromise4 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
        const fetchPromise5 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

        Promise.all([fetchPromise3,fetchPromise4,fetchPromise5])
            .then(responses => {
                for(const response of responses){
                    console.log(`${response.url}:${response.status}`)
                }
            })
            .catch(error =>{
                console.error(`Failed to fetch: ${error}`)
            });


        //async and await
        async function fetchProducts(){
            try {
                // after this line, our function will wait for the `fetch()` call to be settled
                // the `fetch()` call will either return a Response or throw an error
                const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
                if(!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                // after this line, our function will wait for the `response.json()` call to be settled
                // the `response.json()` call will either return JSON object or throw an error
                    const json = await response.json();
                    console.log(json[0].name)
            }
            catch(error) {
                console.error(`could not get products: ${error}`)
            }
        }

        fetchProducts();