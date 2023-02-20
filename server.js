const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./controller/input_code');

const bodyParser = require('body-parser');

const PORT = 3000;

app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}))
app.use('/code', router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});