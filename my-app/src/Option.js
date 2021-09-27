import React from 'react';

export default Option = ({id = '', city = '',lat = '',lng = '',speaker = ''}) => {

    return{
        <React.Fragment>
        <div>
            <h2>${speaker}</h2>
            <h3>New York</h3>
            <button onclick="whichLocation(this.id)">Show</button>
        
        </div>

        </React.Fragment>
        
    }

}