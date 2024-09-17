import './App.css';
import {useState} from 'react';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function App() {
const [city,setCity]=useState('');
const [wdetails,setWdetails]=useState();
const [isloading,setIsloading]=useState(false);

const getdata=(event)=>{
  setIsloading(true);
  fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&Lucknow&appid=0fde24f18909b27ce870124bbcdf96d5`)
  .then((res)=>res.json())
  .then((finalRes)=>{
    if(finalRes===undefined ||finalRes.cod==="400"  ){
      setWdetails(undefined);
      NotificationManager.warning('Enter city name first');
    }
    else{
      if(finalRes.cod==="404"){
        setWdetails(undefined);
        NotificationManager.info(`Invalid city - ${city}`);
      }
      else{
        setWdetails(finalRes);
        NotificationManager.success(`Fetch the weather of ${city}`,`Successfully!`);
      }
    }
    setIsloading(false);
  })

  event.preventDefault();
  // setCity=''
}

  return (
    <div className='weather'>
      <div className='box'>
        <h1>Simple weather app</h1>
        <form onSubmit={getdata}>
          <input type="text" placeholder="City Name" value={city} onChange={(e)=>setCity(e.target.value)}/><button>Submit</button>
        </form>
        <div className='info'>
          <img src="https://media.tenor.com/TAqs38FFJiwAAAAi/loading.gif" style={{width:"90px",height:"90px",position:"absolute",left:"80px"}} className={isloading?'':'loading'}/>
          {wdetails!==undefined?
          <>
          <h3>{wdetails.name}<span> {wdetails.sys.country}</span></h3>
          <h2>{wdetails.main.temp}°C</h2>
          <img src={`http://openweathermap.org/img/w/${wdetails.weather[0].icon}.png` }/>
          <p>{wdetails.weather[0].main}</p>
          
          </>
          :
          "No data Found"
          }
          
        </div>
      </div>
      <NotificationContainer/>
    </div>
  );
}

export default App;
