// Controller for handling input code
const express = require('express');
const {generateSequence} = require('../service/sequence_generator/sequenceService');
const router = express.Router();

router.post('/', (req, res) => {
    let data = req.body.code;
    let sequence = generateSequence(data);
    return res.send({data: sequence});
})

module.exports = router;
