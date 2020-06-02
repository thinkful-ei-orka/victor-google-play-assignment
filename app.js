const express = require('express');
const morgan = require('morgan');

const apps = require('./apps-data');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

app.get('/apps', (req, res) => {
     // ALL OUR CODE HERE
     // let dataResponse = [...appsData];

     const { sort, genres } = req.query;

     let sortQuery = ['Rating', 'App'];

     let genreQuery = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

     let results = apps;

     if (sort) {
          if (!sortQuery.includes(sort)) {
               return res
                    .status(400)
                    .send({ error: 'Sort must be one of "app" or "rating"' });
          }
     }

     if (sort) {
          results.sort((a, b) => {
               return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
          });
     }

     if (genres) {
          if (!genreQuery.includes(genres)) {
               return res
                    .status(400)
                    .send({ error: 'Sort must be one of the available genres' });
          }
     }

     if (genres) {
          results = results.filter(game => {
               return game.Genres === genres
          })
     }

     res
          .json(results)
});

app.listen(8000, () => {
     console.log('Server started on PORT 8000');
});