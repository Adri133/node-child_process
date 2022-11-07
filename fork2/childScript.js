const slowFunction = () => {
  let counter = 0;
  while (counter < 50000000000) {
    counter++;
  }

  return counter;
}

process.on('message', (parentMessage) => {
  const { parent } = parentMessage
  console.log('log messages from parent:', parent); // parent = 'Be good my child!'
  let slowResult = slowFunction();
  let message = `{"totalCount":${slowResult}}`;
  process.send(message);  
});