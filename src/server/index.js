import express from 'express'
import bodyParser  from 'body-parser'
import path from 'path'
import cors from 'cors'
import {data} from './testData';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'build')));


app.get('/', function (req, res) {
    return res.send('hello');
});

app.get('/tubes', function (req, res) {
    res.send(data);
});

app.post('/tube', (req, res) => {
    res.send(req.body);
});



app.listen(process.env.PORT || 8080);