const express = require('express');
const bodyParser = require('body-parser');
const Jobs = require('../models/jobs');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(function logger(req, res) {
    console.log(req.method, req.url)
})
router.get('/jobs', async (req, res) => {
    try {
        const jobs = await Jobs.find();
        res.json(jobs);
    } catch (err) {
        console.log(err)
    }
});

router.post('/jobs', async (req, res) => {
    const job = new Jobs(req.body);
    try {
        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch (err) {

        console.log(err);
    }
});

router.put('/jobs/:id', async (req, res) => {
    try {
        const updatedJob = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(updatedJob);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

router.delete('/jobs/:id', async (req, res) => {
    try {
        await Jobs.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Job listing deleted'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;