import * as dotenv from 'dotenv';
dotenv.config();


import { getInput, inquirerMenu, listPlaces, pause } from "./helpers/inquirer.js";
import Searchs from "./models/searchs.js";

const main = async () => {
  let opt;

  const searchs = new Searchs();

  do {
// Show Menu
    opt = await inquirerMenu();
 
    switch (opt) {
      //Search City
      case 1:
        // Show message
        const inputCity = await getInput('City: ');
        
        // Search places
        const places = await searchs.city(inputCity);


        // Select place

        const idPlace = await listPlaces(places)

        if (idPlace === '0') continue;

        //Getting info to fill info
        const selectedPlace = places.find( place => place.id === idPlace)

        // weather

        const weather = await searchs.searchWeather(selectedPlace.lat, selectedPlace.lng )
        // Save in history
          searchs.addhistory(selectedPlace.name)

        // Show results
        console.clear();
        console.log('\n Information \n');
        console.log('City: ', selectedPlace.name);
        console.log('Lng: ', selectedPlace.lng);
        console.log('Lat: ', selectedPlace.lat);
        console.log('Temp: ', weather.temp);
        console.log('Desc: ', weather.desc);
        console.log('Min: ', weather.min);
        console.log('Max: ', weather.max);

      break;

      case 2:
        //Show history

        searchs.capitalizedHistory.forEach((place, i) => {
          const idx = `${i + 1}.`.magenta;
          console.log(`${idx} ${place}`);
        });

      break;

      case 0:
        //Exit
        
      break;
    
    }

   if(opt !== 0) await pause();
    
  } while (opt !== 0);


}

main();