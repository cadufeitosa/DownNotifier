const router = require('express').Router();
const axios = require('axios');

router.route('/five').get(async (req, res) => {
    try {
        axios.get(`${process.env.AXIOS_BASEURL}check/getChecks/5`).then(function (response) {
            response.data.checks.map(a => {
                axios.get(`${a.reqUrl}`).then(function (response) {
                    if (a.lastState === true) return
                    axios.put(`${process.env.AXIOS_BASEURL}check/update/${a._id}`).catch(function (err) {console.log(err)})
                    clint.channels.cache.get(a.channelSend).send(`Hooray! ${a.reqUrl} is back online! @everyone`)
                }).catch(function (err) {
                    if (a.lastState === false) return
                    axios.put(`${process.env.AXIOS_BASEURL}check/update/${a._id}`).catch(function (err) {console.log(err)})
                    clint.channels.cache.get(a.channelSend).send(`Oh no! It appears that ${a.reqUrl} is offline! We'll le you know once it's back online! @everyone`)
                })
            })
        })
        res
            .status(200)
            .json({message: "ok"})

    } catch (err) {
        res
            .status(500)
            .json({error: err.message})
    }
})

module.exports = router