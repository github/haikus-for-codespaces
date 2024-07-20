let express = require('express');
let app = express();
let ejs = require('ejs');
const haikus = require('./haikus.json');
const port = process.env.PORT || 3000;

app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {haikus: haikus});
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
// Assuming the haikus.json file contains an array of haikus
const haikus = require('./haikus.json');

// Accessing the imported data
console.log(haikus); // Output: [ { title: 'Autumn', content: 'Leaves falling gently' }, { title: 'Ocean', content: 'Waves crashing on shore' }, ... ]
// path: haikus.json
// [
