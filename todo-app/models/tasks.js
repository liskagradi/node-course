import colors from 'colors';
import Task from "./task.js";

class Tasks {

  _listed = {};

  get listedArr() {
    const list = [];
    Object.keys(this._listed).forEach( key => {
      const task = this._listed[key];
      list.push(task);
    });

    return list;
  }

  constructor() {
    this._listed = {};
  }

  deleteTask(id = '') {
    if (this.listedArr[id]) {
      delete this.listedArr[id];
    }
  }
  createTask(desc = '') {
    const task = new Task(desc);
    this._listed[task.id] = task;
  }

  setTasksToList( tasks = []) {
    tasks.forEach(key => {
      this._listed[key.id] = key;
    })
  }

  listFormattedTask (tasks) {
    tasks.forEach( (task, index) => {
      const idx = `${index + 1}.`.magenta;
      const { desc, completed } = task;
      const status = completed ? `${completed}`.green :`${'Pending'.red}`;

      const list = `${idx} ${desc} :: ${status} `;
      console.log(list);
    })
  }

  listAllTasks () {
    this.listFormattedTask(this.listedArr);
  }

  listCompletedPending( completed = true) {
    const tasks = this.listedArr;
    let pendingList = [];

    const completedTasks =  tasks.filter(filterTasks);

    if (completed) {
    this.listFormattedTask(completedTasks)
    }else {
     this.listFormattedTask(pendingList)
    }

    
    function filterTasks(task) {
      if (task.completed) {
        return true;
      }
      pendingList.push(task)
      return false;
    }

  }

  toggleStatusTask( ids = []) {

    ids.forEach(id => {

      const task = this._listed[id];

      if (!task.completed) {
        task.completed = new Date().toISOString();
      }

    });

    this.listedArr.forEach(task => {
      if (!ids.includes(task.id)) {
        this._listed[task.id].completed = null;
      }
    })

  }

}
export default Tasks;