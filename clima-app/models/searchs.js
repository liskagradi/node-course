import axios from "axios";

class Searchs {

  history = ['Bogotá', 'Madrid', 'San José'];

  constructor() {
    //TODO: Leer BD si existe

  }

  async city ( place = '') {
  // console.log('city is: ',place);

  try {
    const resp = await axios.get('https://reqres.in/api/users?page=2');

    console.log(resp.data.per_page);
  
  
      return [];
  } catch (error) {
    return []
  }

  }

}

export default Searchs;