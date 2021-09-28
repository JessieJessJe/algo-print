// const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

// var mylat = map(40.7,-180,180,-10,10);
// var mylng = map(-74,-180,180,-10,10);

// function searchMyLocation(){
//     let q = document.getElementById('mylocation').value;
//     let query = 'https://nominatim.openstreetmap.org/search?q=' + q + '&format=geojson';

//     console.log('query', query)

//     fetch(query)
//     .then((resp) => resp.json())
//     .then((d) => { 
        
//         mylat = map(d.features[0].geometry.coordinates[1],-180,180,-10,10);
//         mylng = map(d.features[0].geometry.coordinates[0],-180,180,-10,10);
//         console.log(d.features[0].geometry.coordinates)
//     })


// }
