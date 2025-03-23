import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import cloud from './assets/backgroundcloud.png'
import cloud2 from './assets/cloud_part.png'
import waterDrop from './assets/drop.png'
import clear_sky from './assets/clear-sky.png'
import rain from './assets/rain.png'
import feelingTemperature from './assets/temperature.png'
import maxTemperature from './assets/RedarrowUp.png'
import minTemperature from './assets/BlueArrowDown.png'
import cloudy from './assets/cloudy.png'
import searchIcon from './assets/magnifying-glass.png'
import { TypeAnimation } from 'react-type-animation';
import { motion } from "motion/react";
import './App.css';



function App() {
  
  const [ActiveTab, setActiveTab] = useState(0)

  const [loading, setLoad] = useState(true)

  const tabs = [{tabName: "Semana"},{tabName: "Mes"},{tabName: "3 Meses"},{tabName: "6 Meses"}]

  const date = new Date(); const today = date.getDay();

  const days = [{dayName: "Domingo"},{dayName: "Lunes"},{dayName: "Martes"},{dayName: "Miércoles"},{dayName: "Jueves"},{dayName: "Viernes"},{dayName: "Sábado"}]
  
  const [City, setCity] = useState("SantoDomingo");

  const [position, setPosition] = useState([18.47186, -69.89232])

  const [weatherListDays, setWeatherDays] = useState([]);

  

  useEffect(() => {
    const fetchWeather = async () => {
    try{
      console.log(City)
    const response = await fetch(`https://api.api-ninjas.com/v1/weatherforecast?lat=${position[0]}&lon=${position[1]}`, {
      method: "GET",
      headers: {
          "X-Api-Key": "YnkR9NjNE9+XDgVW1EgPgA==GqMiLC9XsIme20YT"
      }
  })
  if(!response.ok){
    throw new Error(`Response status: ${response.status}`)
  }
  const data = await response.json();
  takeSpecificMoment(data)
  console.log(data)
}
    catch(error){
      console.error(error.message);
    }}

    function takeSpecificMoment(weatherApiArray){
      let initial_value = weatherApiArray.length/10
      let days = weatherApiArray.length/5
      let new_Array = [];
        for(let i = 0; i < 5; i++){
          new_Array.push(weatherApiArray[initial_value + (days * i)])
        }
        console.log(new_Array);
        setWeatherDays(new_Array)
    }

    fetchWeather();
  },[City])

  function TabConstruction({ActiveTab, setActiveTab, tabs}){
      return(
        <div className="tabs">
        {tabs.map((item, index) => (
          <div key={index} className="tab-item">
            
    <input type="radio" id={`radio-${index}`} name="tabs" checked={ActiveTab === index} readOnly/>
    <motion.div whileHover={index !== ActiveTab ? { scale: 1.2 }:{scale: 1.0}} whileTap={index !== ActiveTab ? { scale: 0.95 }:{scale: 1.0}} transition={{duration: 0.1 }} className="tab" htmlFor={`radio-${index}`} onClick={() => setActiveTab(index)}>{item.tabName}
          {index === ActiveTab ? (<motion.span className="glider" layoutId='circle' id='circle' transition={{type:"spring"}}/>):null}
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
            <LoadingComponent/>
            {weatherListDays.map((item, index) =>(
              <motion.div initial={{opacity: 0, scale: 0.5}} animate={{opacity:1, scale:1}} transition={{type: "spring", duration: 0.8, delay:0.7, ease:[0, 0.71, 0.2, 1.01]}} key={index} className="DaysContent">
                <div className="sections"><p>{CalculateNextDays(today, days)[index]}</p></div>
                <div className="humidity"><p><motion.img whileHover={{marginBottom: -4}} className="WaterDrop" src={waterDrop}/>{`${item.humidity}%`}</p></div>
                <div className="weather"><img className="weatherImageclass" src={WeatherImage(item.weather)}/></div>
                <div className="temperature"><img src={feelingTemperature} className="temperatureIMG"/>{`${item.feels_like}°C`}</div>
                <div className="temperature maxtemperature"><motion.img whileHover={{opacity: 1}} src={maxTemperature} className="maxIMG"/>{`${item.max_temp}°C`}</div>
                <div className="temperature mintemperature"><motion.img whileHover={{opacity: 1}} src={minTemperature} className="minIMG"/>{`${item.min_temp}°C`}</div>
                {setLoad(false)}
              </motion.div>
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

  function WeatherImage(state){
    if(state == "Clouds"){
      return cloudy
    }
    else if (state == "Rain"){
      return rain
    }
    else if(state == "Clear"){
      return clear_sky
    }
  }

  function LoadingComponent(){
    if(loading == true){
      return(
        <div>
          <TypeAnimation  className="h1_animation loading" preRenderFirstString={true} sequence={
      ['Cargando', 1, 'Cargando...', 1000,'Cargando', 1, 'Cargando...', 1000 ]
    }  speed={30} repeat={isFinite} cursor={false}/>
        </div>
      )
    }

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
      <img className="searchIcon" src={searchIcon}/>
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
        <div>
          <h3 className='thisDay' id='main'>Hoy</h3>
          <h4 className='thisDayD' htmlFor='main'>Sábado, 22-3-25</h4>
          <img className='Thisdayimg' src={WeatherImage("Clouds")}/>
          <h2 className='thisDayh2'>29<p className='thisDayh2p'>°C</p></h2>
        </div>
    </div>
    </>
  )
}

export default App
