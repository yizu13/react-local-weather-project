import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import cloud from './assets/backgroundcloud.png'
import cloud2 from './assets/cloud_part.png'
import searchIcon from './assets/magnifying-glass.png'
import { TypeAnimation } from 'react-type-animation';
import './App.css';



function App() {

  return (
    <>
    <div class="frame">
      {
    // <h1>Pronóstico del tiempo</h1>  
    }
    <TypeAnimation className="h1_animation" sequence={
      ['Prónostico del tiempo', 1000, 'En República Dominicana', 1000,'Prónostico del tiempo', 1000  ]
    }  speed={30} repeat={isFinite} cursor={false}
    />
      <div className='search'>
      <input type='text' placeholder='Busca una provincia' className='state_searcher' ></input>
      <img className="searchIcon"src={searchIcon}/>
      </div>
    </div>
    <div class="frame2">
      <h2></h2>
      <div class="backgroundImages">
        <img src={cloud} class="cloud1"/>
        <img src={cloud2} class="cloud2"/>
        <img src={cloud} class="cloud3"/>
      </div>
    </div>
    </>
  )
}

export default App
