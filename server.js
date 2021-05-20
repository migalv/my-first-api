const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

require('dotenv/config')

const app = express();

const port = process.env.PORT || 8000;

/// MIDDLEWARE ///
// Swagger ocumentation
const specs = swaggerJsdoc(require("./config/swagger_config"));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use(bodyParser.json());
app.use('/api/person', require('./routes/person'))

// Connect to MongoDB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err)
    else console.log("connected to DB!")
  },
);

app.listen(port, () => {
  console.log('We are live on port: ' + port);
});




// MongoClient.connect(db.url, (err, database) => {
//   if (err) return console.log(err)

//   require('./app/routes')(app, database);

//   app.listen(port, () => { console.log('We are live on ' + port); });
// })