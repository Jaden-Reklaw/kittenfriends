const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

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
            res.sendStatus(500);
        });
});

//Route for deleting kitten from database
router.delete('/delete/:id',(req, res) => {
    let kitten_id = req.params.id;
    console.log('deleting kitten with id ', kitten_id);

    const queryText = `DELETE FROM kittens WHERE id = $1;`;
    pool.query(queryText,[kitten_id]).then((result) => {
            res.sendStatus(202);
        }).catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
})

module.exports = router;