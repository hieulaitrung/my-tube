import express from 'express'
import bodyParser  from 'body-parser'
import path from 'path'
import cors from 'cors'
import {data} from './testData';
import pickby from 'lodash.pickby';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../build')));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/tubes', function (req, res) {
    const searchTerm = req.query.term;
    const result = {};
    if (searchTerm) {
        const searchRE = new RegExp(searchTerm, 'i');
        result.articles = pickby(data.articles, (value) => {
            return value.title.match(searchRE) || value.body.match(searchRE);
        });
    } else {
        result.articles = data.articles;
    }
    result.authors = data.authors
    res.send(result);
});

app.post('/tube', (req, res) => {
    res.send(req.body);
});



app.listen(process.env.PORT || 5000);