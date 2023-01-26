import { v4 as uuidv4 } from 'uuid';

class Task {

  id = '';
  desc = '';
  completed = null;

  constructor( desc) {
    this.desc = desc;
    this.id = uuidv4();
  }
}

export default Task;