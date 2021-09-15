import React from 'react';
import { useSelector } from 'react-redux';

export const HomeScreen = () => {

    const {name} = useSelector(state => state.auth);

    return (
        <div className="container_home">
            <div className="container_home text">
                <h3>Hello  <b>{name}</b></h3>
                <p>This is the Perfect place to save whatever you want.</p>
                <hr />
            </div>
          
            <div className="footer">
                <p>Developed by Alexis Chavez</p><br />
                <span>More about my work <a href="https://alexchavezz.github.io/PORTAFOLIO/" target="_black">Here!</a></span>
            </div>
        
        </div>
    );
}
