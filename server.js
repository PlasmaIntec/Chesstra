const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist'));

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
