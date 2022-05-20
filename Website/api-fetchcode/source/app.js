const app = require('express')();
const consign = require('consign');
const cors = require('cors');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'fetchcodeserver.mysql.database.azure.com', 
  port: 3306, 
  database: 'fetchcode', 
  user: 'FetchCode', 
  password: 'sidyfgygIJS956_kjhvfddv87' 
});

connection.connect(function(err) {
  if (err) console.error(err);
  console.log("Connected to database!");
});

app.db = connection;
app.use(cors());

consign({ cwd: 'src', verbose: false })
  .include('./config/passport.js')
  .include('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/router.js')
  .into(app);

app.get('/', (req, res) => {
  res.status(200).send('FetchCode');
});

app.use((err, req, res, next) => {
  const { name, message, stack } = err;
  if (name === 'validationError') res.status(400).json({ error: message });
  else if (name === 'forbiddenError') res.status(403).json({ error: message });
  else {
    console.log(message);
    res.status(500).json({ name, message, stack });
  }
  next(err);
});

module.exports = app;
