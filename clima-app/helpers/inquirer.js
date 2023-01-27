import inquirer from 'inquirer';
import colors from 'colors';

const menuOptions = [
  {
    type: 'list',
    name: 'option',
    message: 'Select an option',
    choices: [
      {
        value: 1,
        name: `${'1.'.magenta} Search city`
      },
      {
        value: 2,
        name: `${'2.'.magenta} History`,
      },
      {
        value: 0,
        name: `${'0.'.magenta} Exit`
      },
    ]
  }
]

const inquirerMenu = async () => {
// 

  console.clear();
  console.log('===================================='.magenta);
  console.log('       Select option'.magenta);
  console.log('====================================\n'.magenta);

 const {option} = await inquirer.prompt(menuOptions);
 
 return option;
};

const pause = async () => {
  const exitOption = [
    {
      type: 'input',
      name: 'exit',
      message: `\n Press ${'ENTER'.magenta} to continue...\n`
    }
  ];
  return await inquirer.prompt(exitOption)
}

const getInput = async (message) => {

  const questions = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate( value ) {
        if ( value.length === 0 ) {
         return 'Please enter a valid description';
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(questions);
  return desc;

}

const listPlaces = async ( places = [] ) => {

  const choices = places.map(( place, i) => {
    const idx = `${i + 1}.`.magenta;
    return {
        value: place.id,
        name: `${idx} ${place.name}`
    }
  });

  choices.unshift({
    value: '0',
    name: `${'0.'.magenta} Cancel`
  });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select a place',
      choices
    }
  ];

  const {id} = await inquirer.prompt(questions);

  return id;

}

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]

  const { ok } = await inquirer.prompt(question)
  return ok;
}

const checklistTasks = async ( tasks = []) => {

  const choices = tasks.map(( task, i) => {
    const idx = `${i + 1}.`.magenta;
    return {
        value: task.id,
        name: `${idx} ${task.desc}`,
        checked: (task.completed) ? true : false
    }
  });

  const questions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select tasks',
      choices
    }
  ];

  const {ids} = await inquirer.prompt(questions);
  return ids;

}

 export {  
  inquirerMenu,
  pause,
  getInput,
  listPlaces,
  confirm,
  checklistTasks
} 