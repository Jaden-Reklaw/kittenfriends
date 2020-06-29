const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

//Status codes for modifying the database
const CREATED = 201;
const ACCEPTED = 202;
const INTERNAL_SERVER_ERROR = 500;

//Route for getting kittens from database
router.get('/get', (req, res) => {
    // returns all kittens
    const queryText = `SELECT * FROM  kittens ORDER BY name`;
    pool.query(queryText)
    .then( (result) => {
        res.send(result.rows);
    })
    .catch( (error) => {
        console.log(`Error on query ${error}`);
        res.sendStatus(INTERNAL_SERVER_ERROR);
    });
});

//Route for adding a kitten to the database
router.post('/add', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    const queryText = 
                    `
                        INSERT INTO "kittens" ("name", "email")
                        VALUES($1, $2);
                    `;
    pool.query(queryText,[name, email])
    .then(() => {
        res.sendStatus(CREATED);
    }).catch( (error) => {
        console.log(`Error on query ${error}`);
        res.sendStatus(INTERNAL_SERVER_ERROR);
    });
})

//Route for deleting kitten from database
router.delete('/delete/:id',(req, res) => {
    let kitten_id = req.params.id;
    console.log('deleting kitten with id ', kitten_id);

    const queryText = `DELETE FROM kittens WHERE id = $1;`;
    pool.query(queryText,[kitten_id])
    .then(() => {
        res.sendStatus(ACCEPTED);
    }).catch( (error) => {
        console.log(`Error on query ${error}`);
        res.sendStatus(INTERNAL_SERVER_ERROR);
    });
})

module.exports = router;