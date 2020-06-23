const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

//Route for all the movies
router.get('/', (req, res) => {
    console.log('in get request');
    // returns all kittens
    const queryText = `SELECT * FROM  kittens ORDER BY name`;
    pool.query(queryText)
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;