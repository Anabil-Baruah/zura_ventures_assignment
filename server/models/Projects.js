const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    projectOwner: mongoose.ObjectId,
    projectName: String,
    dateOfCreation: { type: Date, default: Date.now },

    uploads:[{
        name: String,
        dateOfCreation:{
            type: Date,
            default: Date.now
        },
        link:String,
        transcript: String,
    }],

    configuration: {
        general: {
            chatBotName: String,
            welcomeMessage: String,
            inputPlaceholder: String,
        },
        display: {
            primaryColor: String,
            fontColor: String,
            fontsize: String,
            chatHeight: String,
            showSources: Boolean,

            chat_position: String,
            chat_icon: String,
            chat_bottom_distance: String,
            chat_horizontal_distance: String,

            bot_image: String,
        }
    }
})

module.exports = mongoose.model("Project", projectSchema)