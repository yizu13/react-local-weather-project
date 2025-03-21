import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import cloud from './assets/backgroundcloud.png'
import cloud2 from './assets/cloud_part.png'
import searchIcon from './assets/magnifying-glass.png'
import { TypeAnimation } from 'react-type-animation';
import { motion } from "motion/react";
import './App.css';



function App() {
  
  const [ActiveTab, setActiveTab] = useState(0)

  const tabs = [{tabName: "Semana"},{tabName: "Mes"},{tabName: "3 Meses"},{tabName: "6 Meses"}]

  const date = new Date(); const today = date.getDay();

  const days = [{dayName: "Domingo"},{dayName: "Lunes"},{dayName: "Martes"},{dayName: "Miércoles"},{dayName: "Jueves"},{dayName: "Viernes"},{dayName: "Sábado"}]

  const weather_example = [
    {
      "timestamp": 1740247200,
      "temp": 13,
      "feels_like": 12,
      "humidity": 70,
      "min_temp": 10,
      "max_temp": 13,
      "weather": "Clouds",
      "cloud_pct": 40,
      "wind_speed": 2.36,
      "wind_degrees": 231
    },
    {
      "timestamp": 1740258000,
      "temp": 11,
      "feels_like": 11,
      "humidity": 76,
      "min_temp": 9,
      "max_temp": 11,
      "weather": "Clouds",
      "cloud_pct": 27,
      "wind_speed": 2.3,
      "wind_degrees": 231
    }
  ]

  function TabConstruction({ActiveTab, setActiveTab, tabs}){
      return(
        <div className="tabs">
        {tabs.map((item, index) => (
          <div key={index} className="tab-item">
            
    <input type="radio" id={`radio-${index}`} name="tabs" checked={ActiveTab === index} readOnly/>
    <motion.div whileHover={index !== ActiveTab ? { scale: 1.2 }:{scale: 1.0}} whileTap={index !== ActiveTab ? { scale: 0.95 }:{scale: 1.0}} transition={{duration: 0.1 }} className="tab" htmlFor={`radio-${index}`} onClick={() => setActiveTab(index)}>{item.tabName}
          {index === ActiveTab ? (<motion.span className="glider" layoutId='circle' id='circle'/>):null}
    </motion.div>
         </div>
        ))}
        </div>
      );
  }

  function TabContent({ ActiveTab, tabs }){
      if(ActiveTab === 0){
        return (
          <div className="content">
            {weather_example.map((item, index) =>(
              
              <div key={index}>
                <p>{CalculateNextDays(today, days)[index]}</p>
              </div>
            ))}
          </div>
        )
      }
      else if(ActiveTab === 1){
        return (
          <div className="content">
            <p>pedro</p>
          </div>
        )
      }

      else if(ActiveTab === 2){
        return(
          <div className="content">
            <p>mango</p>
          </div>
        )
      }
      else if (ActiveTab === 3){
        return(
          <div className="content">
            <p>aguacate</p>
          </div>
        )
      }
  }
  function CalculateNextDays(currentDay, Days_array){
    const new_Array = [];
    let inCurrentDay = currentDay;
    for(let i = 0; i < Days_array.length; i++){
      inCurrentDay++
      if((inCurrentDay) <= 6){
        new_Array.push(Days_array[inCurrentDay].dayName)
      }else{
        inCurrentDay -= 7
        new_Array.push(Days_array[inCurrentDay].dayName)
      }
    }
    return new_Array
  }

  return (
    <>
    <div className="frame">
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
      <div className="tabs_container">
      <TabConstruction ActiveTab={ActiveTab} setActiveTab={setActiveTab} tabs={tabs} />
    </div>
      <TabContent ActiveTab={ActiveTab} tabs={tabs}/>
    </div>
    <div className="frame2">
      <div className="backgroundImages">
        <img src={cloud} className="cloud1"/>
        <img src={cloud2} className="cloud2"/>
        <img src={cloud} className="cloud3"/>
      </div>
    </div>
    </>
  )
}

export default App
