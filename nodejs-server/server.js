const express = require('express');
const bodyParser = require('body-parser')

const router = require('./router/auth');
const app = express();
const port = 8000;

app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => console.log(`Server is running on port ${port}`));