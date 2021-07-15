const router = require('express').Router();
const Check = require('../models/checks.model')

router.route('/addCheck').post(async (req, res) => {
    try {
        const {
            owner,
            reqUrl,
            channelSend
        } = req.body

        const interval = 5
        const type = "website"

        if (!owner || !reqUrl || !channelSend) {
            return res
                .status(400)
                .json({message: "You must include all fields."})
        }

        const alreadyRegistered = await Check.findOne({reqUrl, owner})

        if (alreadyRegistered) {
            return res
                .status(400)
                .json({message: "Check already registered", internal: 2})
        }

        const newCheck = new Check({
            owner,
            reqUrl,
            type,
            interval,
            channelSend
        })

        const savedCheck = await newCheck.save()
        return res
            .status(201)
            .json({
                savedCheck
            })

    } catch (err) {
        res
            .status(500)
            .json({error: err.message})
    }
})

router.route('/getChecks/:interval').get(async (req, res) => {
    try {
        console.log("1")
        const interval = req.params.interval

        const checks = await Check.find({interval})

        if (!checks) {
            return res
                .status(400)
                .json({message: "No checks exist for the specified interval"})
        }

        res
            .status(200)
            .json({checks})

    } catch (err) {
        res
            .status(500)
            .json({error: err.message})
    }
})

router.route('/update/:_id').put(async (req, res) => {
    try {
        const _id = req.params._id

        if (!_id) {
            return res
                .status(400)
                .json({message: "You must specify an ID with your request"})
        }

        const checkExists = await Check.findById({_id})

        if (!checkExists) {
            return res
                .status(400)
                .json({message: "No entry found"})
        }

        let lastState = checkExists.lastState !== true;

        const updated = await Check.findByIdAndUpdate({_id}, {lastState})

        res
            .status(200)
            .json({updated})

    } catch (err) {
        res
            .status(500)
            .json({error: err.message})
    }
})


module.exports = router;