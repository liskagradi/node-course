const { resolve } = require('path');

require('colors');

const showMenu = () => {
  

  return new Promise( resolve => {



  console.clear();

  console.log('===================================='.magenta);
  console.log('       Select task'.magenta);
  console.log('====================================\n'.magenta);

  console.log(`${'1.'.magenta} Create task`);
  console.log(`${'2.'.magenta} List tasks`);
  console.log(`${'3.'.magenta} List completed tasks`);
  console.log(`${'4.'.magenta} List incompleted tasks`);
  console.log(`${'5.'.magenta} Complete task(s)`);
  console.log(`${'6.'.magenta} Delete task`);
  console.log(`${'0.'.magenta} Close app\n`);

  const readline = require('readline').createInterface({
    input:  process.stdin,
    output: process.stdout
  });

  readline.question('Select an option: ', (opt) => {
    readline.close();
    resolve(opt)
  });
})
};

const pause = () => {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input:  process.stdin,
      output: process.stdout
    });
  
    readline.question(`\n\n Press ${'ENTER'.magenta} to continue...\n`, (opt) => {
      readline.close();
      resolve(opt)
    });
  })

};


module.exports = {
  showMenu,
  pause
}