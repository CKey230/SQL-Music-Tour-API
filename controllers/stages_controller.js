const stages = require('express').Router()
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')

//get stages
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            where: {
                stage_name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        })
        res.status(200).json(foundStages)
    } catch (err) {
        res.status(500).json(err)
    }
})

//stage by ID
stages.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.id }
        })
        res.status(200).json(foundStage)
    } catch (err) {
        res.status.json(err)
    }
})

//update stage
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Succesfully updated ${updatedStages} stage(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete stage
stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = stages