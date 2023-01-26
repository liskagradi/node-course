import fs from "fs";
const file = './db/data.json';

const saveData = (data) => {

  fs.writeFileSync(file, JSON.stringify(data));
};

const readData = () => {

  if (!fs.existsSync(file)) {
    return null;
  }
  
 const readedFile =  fs.readFileSync(file, { encoding: 'utf-8'});

 const info = JSON.parse(readedFile);

 return info;
}

export {
  saveData,
  readData
}
