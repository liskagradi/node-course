import { getInput, inquirerMenu, pause } from "./helpers/inquirer.js";
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
        const place = await getInput('City: ');
        await searchs.city(place);

        // Search places

        // Select place

        // weather

        // Show results

        console.log('\n Information \n');
        console.log('City: ');
        console.log('Lat: ');
        console.log('Lng: ');
        console.log('Temp: ');
        console.log('Min: ');
        console.log('Max: ');

      break;

      case 2:
        //Show history

      break;

      case 0:
        //Exit
        
      break;
    
    }

   if(opt !== 0) await pause();
    
  } while (opt !== 0);


}

main();