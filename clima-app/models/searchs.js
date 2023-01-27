import fs from "fs";
import axios from "axios";

class Searchs {

  history = [];
  file = './db/database.json';

  constructor() {
    this.readDB();

  }

  get capitalizedHistory(){

    return this.history.map( place => {
      let words = place.split(' ');
      words = words.map( w => w[0].toUpperCase() + w.substring(1));

      return words.join(' ');
    })

  }

  get paramsMapBox() {
   return {
    'access_token': process.env.MAPBOX_KEY,
    'limit' : 5,
    'lenguaje': 'es'
    }
  }

  get paramsWeather() {
    return {
      appid : process.env.OPENWEATHER_KEY,
      lang: 'es',
      units: 'metric'
    }
  }

  async city ( place = '') {
 
  try {
    const instance = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
      params: this.paramsMapBox
    })

    const resp = await instance.get();
    
    return resp.data.features.map(place => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
    }));

  } catch (error) {
    return [];
  }

  }

  async searchWeather( lat, lon ) {
    try {
      // crear axios.create
      const weatherGet = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params:{ ...this.paramsWeather, lat, lon }
      }) 

      // get resp.data
      const weatherResp = await weatherGet.get();

      const { weather, main } = weatherResp.data;
      return {
        temp: main.temp,
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
      }


    } catch (error) {
      console.log(error);
    }
  }

  addhistory( place = ''){

    if (this.history.includes(place.toLocaleLowerCase())) {
      return;
    }

    this.history = this.history.splice(0,5);

    this.history.unshift(place.toLocaleLowerCase());

    // Grabar in DB
    this.saveDB();

  }

  saveDB(){
    
    const payload = {
      history: this.history
    }
    fs.writeFileSync(this.file, JSON.stringify(payload))

  }
  readDB(){
    // debe existir
    if (!fs.existsSync(this.file)) return;

    // cargar datos const info
    const info = fs.readFileSync(this.file, {encoding: 'utf-8'});

    const data = JSON.parse(info);
    this.history = data.history;

  }


}

export default Searchs;