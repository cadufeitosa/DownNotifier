const router = require('express').Router();
let Guild = require('../models/guild.model');

router.route('/newGuild').post(async (req, res) => {
    try {
        const {
            guild_id
        } = req.body

        let addedDate = new Date().toLocaleDateString('pt-BR')

        const existingGuild = await Guild.findOne({guild_id: guild_id})
        if (existingGuild) {
            return res
                .status(400)
                .json({
                    message: "A guild with this ID is already registered."
                })
        }

        const newGuild = new Guild({
            guild_id,
            addedDate
        })

        const savedGuild = await newGuild.save()
        return res
            .status(201)
            .json({
                savedGuild
            })

    } catch (err) {
        res
            .status(500)
            .json({error: err.message})
    }
});

router.route('/deleteGuild/:guild_id').delete( async (req, res) => {
    try {
        const guild_id = req.params.guild_id

        const guildExists = await Guild.findOne({guild_id: guild_id})
        if (!guildExists) {
            return res
                .status(400)
                .json({
                    message: "There is no Guild registered with this ID"
                })
        }

        if (guildExists) {
            await Guild.findOneAndDelete({guild_id: guild_id})

            return res
                .status(201)
                .json({
                    "Deleted Guild": guild_id
                })
        }

    } catch (err) {
        res
            .status(500)
            .json({error: err.message})
    }
})

router.route('/getGuild/:guild_id').get( async (req, res) => {
    try {
        const guild_id = req.params.guild_id

        const guildExists = await Guild.findOne({guild_id: guild_id})
        if (!guildExists) {
            return res
                .status(400)
                .json({
                    message: "There is no Guild registered with this ID"
                })
        }

        if (guildExists) {
            return res
                .status(200)
                .json({
                    guildExists
                })

        }


    } catch (err) {
        res
            .status(500)
            .json({error: err.message})
    }
})

router.route('/changePrefix/:guild_id').put( async (req, res) => {
    try {
        const guild_id = req.params.guild_id
        const prefix = req.body.prefix

        const guildExists = await Guild.findOne({guild_id: guild_id})
        if (!guildExists) {
            return res
                .status(400)
                .json({
                    message: "No guild with this ID exists"
                })
        }

        if (guildExists) {
            const updatedPrefix = await Guild.findOneAndUpdate({guild_id: guild_id}, {prefix: prefix})

            if (updatedPrefix) {
                return res
                    .status(201)
                    .json({
                        message: `Prefix updated. New prefix is ${prefix}`
                    })
            }
        }

    } catch (err) {
        res
            .status(500)
            .json({error: err.message})
    }
})

module.exports = router;