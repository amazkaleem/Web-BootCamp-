import fs from 'fs/promises';

//readFile() - callback
// fs.readFile('./text.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

//readFileSync() - synchronous
// const data = fs.readFileSync('./text.txt', 'utf-8');
// console.log(data);

// readFile() - Promise .then()
// fs.readFile('./test.txt', 'utf8')
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// readFile() - async/await
const readFile = async () => {
    try {
      const data = await fs.readFile('./test.txt', 'utf8');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
};


// writeFile() -- Creates a new file and then writes data into it

const writeFile = async () => {
    try {
      await fs.writeFile('./text.txt', 'I am finally saved!');
      console.log('File written to...');
    } catch (error) {
      console.log(error);
    }
  };
  

  // appendFile() -- appends data into an already existing file
  const appendFile = async () => {
    try {
      await fs.appendFile('./text.txt', '\nAAAAAHHHHHHH!');
      console.log('File appended to...');
    } catch (error) {
      console.log(error);
    }
  };
  
  writeFile();
  appendFile();
  readFile();

