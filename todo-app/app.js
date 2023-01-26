import colors from 'colors';
import { inquirerMenu, 
          pause, 
          getInput, 
          listTaskDelete, 
          confirm, 
          checklistTasks
        } from './helpers/inquirer.js';
import  {saveData, readData } from './helpers/saveFile.js';

import Tasks from './models/tasks.js';

const main = async () => {

  let opt = '';
  const tasks = new Tasks();

     //Read Tasks
     const savedTasks = readData();
     if (savedTasks) {
      tasks.setTasksToList(savedTasks);
     }

  do {
   opt = await inquirerMenu();

   switch (opt) {
    case '1':
      // Create task
      const desc = await getInput('Description: ');
      tasks.createTask(desc);
    break;

    case '2':
      // List all task
      tasks.listAllTasks();
    break;

    case '3':
      // List Completed task
    tasks.listCompletedPending(true);
    break;

    case '4':
      // List pending task
    tasks.listCompletedPending(false);
    break;

    case '5':
      // Checkbox task
    const ids = await checklistTasks(tasks.listedArr);
    tasks.toggleStatusTask(ids);

    break;

    case '6':
      // Delete task
      const id = await listTaskDelete(tasks.listedArr);
      
      if (id !== '0') {
        const deleteOk = await confirm('Are you sure?');
        if (deleteOk) {
          tasks.deleteTask(id);
          console.log('Task Deleted')
        }
      }

    break;
   }
   
   saveData(tasks.listedArr);
   await pause();

  } while (opt !== '0');
  

  
}

main();