const project = require('../models/Projects')
const user = require('../models/User')

const general_field = async (req, res) => {
    try {
        const findProject = await project.findOne({ _id: req.params.id })
        if (!req.user._id.equals(findProject.projectOwner)) {
            return res.status(400).json({
                message: 'You are not the owner of this project'
            })
        }
        if (findProject) {
            return res.status(200).json({
                chatBotName: findProject.configuration.general.chatBotName,
                welcomeMessage: findProject.configuration.general.welcomeMessage,
                inputPlaceholder: findProject.configuration.general.inputPlaceholder,
            })
        } else {
            return res.status(400).json({
                message: 'Project not found'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}
const update_general = async (req, res) => {
    try {
        const findProject = await project.findOne({ _id: req.body.id })
        if (!req.user._id.equals(findProject.projectOwner)) {
            return res.status(400).json({
                message: 'You are not the owner of this project'
            })
        }

        if (findProject) {
            const updatedProj = await project.findOneAndUpdate({ _id: req.body.id },
                {
                    $set: {
                        "configuration.general.chatBotName": req.body.chatBotName,
                        "configuration.general.welcomeMessage": req.body.welcomeMessage,
                        "configuration.general.inputPlaceholder": req.body.inputPlaceholder,
                    }
                })
            if (updatedProj) {
                return res.status(200).json({
                    message: 'Updated Successfully'
                })
            } else {
                return res.status(400).json({
                    message: 'Something went wrong'
                })
            }
        } else {
            return res.status(400).json({
                message: 'Project not found'
            })
        }
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
}
const display_field = async (req, res) => {
    try {
        const findProject = await project.findOne({ _id: req.params.id })
        if (!req.user._id.equals(findProject.projectOwner)) {
            return res.status(400).json({
                message: 'You are not the owner of this project'
            })
        }
        if (findProject) {
            return res.status(200).json({
                primaryColor: findProject.configuration.display.primaryColor,
                fontColor: findProject.configuration.display.fontColor,
                fontsize: findProject.configuration.display.fontsize,
                chatHeight: findProject.configuration.display.chatHeight,
                showSources: findProject.configuration.display.showSources,

                chat_position: findProject.configuration.display.chat_position,
                chat_icon: findProject.configuration.display.chat_icon,
                chat_bottom_distance: findProject.configuration.display.chat_bottom_distance,
                chat_horizontal_distance: findProject.configuration.display.chat_horizontal_distance,

                bot_image: findProject.configuration.display.bot_image,
            })
        } else {
            return res.status(400).json({
                message: 'Project not found'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}
const update_display = async (req, res) => {
    try {
        const findProject = await project.findOne({ _id: req.body.id })
        if (!req.user._id.equals(findProject.projectOwner)) {
            return res.status(400).json({
                message: 'You are not the owner of this project'
            })
        }

        if (findProject) {
            const updatedProj = await project.updateOne({ _id: req.body.id },
                {
                    $set: {
                        "configuration.display.primaryColor": req.body.primary_color,
                        "configuration.display.fontColor": req.body.Font_Color,
                        "configuration.display.fontsize": req.body.font_size,
                        "configuration.display.chatHeight": req.body.chat_height,
                        "configuration.display.showSources": req.body.show_sources,

                        "configuration.display.chat_position": req.body.position_on_screen,
                        "configuration.display.chat_icon": req.body.chat_icon_size,
                        "configuration.display.chat_bottom_distance": req.body.dist_from_bottom,
                        "configuration.display.chat_horizontal_distance": req.body.horizontal_dist,

                        "configuration.display.bot_image": req.body.bot_img,
                    }
                })
            if (updatedProj) {
                return res.status(200).json({
                    message: 'Updated Successfully'
                })
            } else {
                return res.status(400).json({
                    message: 'Something went wrong'
                })
            }
        } else {
            return res.status(400).json({
                message: 'Project not found'
            })
        }
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
}

module.exports = {
    general_field,
    update_general,
    display_field,
    update_display
}