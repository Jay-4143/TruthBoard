const express = require('express');
const app = express();
app.get('/', (req, res) => {
  console.log('Test request received');
  res.send('ok');
});
app.listen(5005, () => console.log('5005 TEST READY'));
