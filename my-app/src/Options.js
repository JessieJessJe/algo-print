import React from 'react';
import Option from 'Option'

export default function Options(){


    const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

    let myLoc = [{
        'id': 'seoul',
        'city': 'Seoul, Korea',
        'lat': map(37.5,-180,180,-10,10),
        'lng': map(127,-180,180,-10,10),
        'speaker':'Yehwan Song'
    },{
        'id': 'lisbon',
        'city': 'Lisbon, Portugal',
        'lat': map(378.723,-180,180,-10,10),
        'lng': map(-9.14,-180,180,-10,10),
        'speaker':'Braulio Amado'
    },{
        'id': 'newyork',
        'city': 'New York, United States',
        'lat': map(40.7,-180,180,-10,10),
        'lng': map(-74,-180,180,-10,10),
        'speaker':'Laurel Schwulst'
    },{
        'id': 'beijing',
        'city': 'Beijing, China',
        'lat': map(39.9,-180,180,-10,10),
        'lng': map(116.4,-180,180,-10,10),
        'speaker':'Ronald Tau'
    }]

    // var options = []
    // for (var i = 0; i < myLoc.length; i++) {
    //     // note: we are adding a key prop here to allow react to uniquely identify each
    //     // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    //     rows.push(<div></div>);
    // }


    return{

        <React.Fragment>


        </React.Fragment>
    }
    
}