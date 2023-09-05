const project = require('../models/Projects')
const user = require('../models/User')

const Create_project = async (req, res) => {

    if (req.accessToken === undefined) {
        return res.status(400).json({
            message: 'User has been logged out'
        })
    }
    // return
    const newProject = new project({
        projectOwner: req.user._id,
        projectName: req.body.projectName,
    })
    const projectAdded = await newProject.save()
    if (projectAdded)
        return res.status(200).json({
            message: 'Project created successfully'
        })
    else
        return res.status(400).json({
            message: 'Error creating project'
        })
}

const get_all_proiects = async (req, res) => {

    const projects = await project.find({
        projectOwner: req.user._id
    })
    if (projects)
        return res.status(200).json({
            projects
        })
    else
        return res.status(400).json({
            message: 'Error getting projects'
        })
}

const add_field = async (req, res) => {

    const findProject = await project.findOne({ _id: req.body.id })
    if (!req.user._id.equals(findProject.projectOwner)) {
        return res.status(400).json({
            message: 'You are not the owner of this project'
        })
    }

    if (findProject) {
        findProject.uploads.push({
            name: req.body.projectName,
            link: req.body.link,
            transcript: req.body.transcript
        });

        const savedProject = await findProject.save()
        if (savedProject)
            return res.status(200).json({
                message: 'Field uploaded successfully'
            })
        else
            return res.status(400).json({
                message: 'Error uploading field'
            })
    } else {
        return res.status(400).json({
            message: 'Project not found'
        })
    }
}

const get_all_fields = async (req, res) => {
    const findProject = await project.findOne({ _id: req.params.id })
    if (!req.user._id.equals(findProject.projectOwner)) {
        return res.status(400).json({
            message: 'You are not the owner of this project'
        })
    }
    if (findProject) {
        return res.status(200).json({
            uploads: findProject.uploads
        })
    } else {
        return res.status(400).json({
            message: 'Project not found'
        })
    }
}

const delete_field = async (req, res) => {
    const findProject = await project.findOne({ _id: req.body.projectId })
    if (!req.user._id.equals(findProject.projectOwner)) {
        return res.status(400).json({
            message: 'You are not the owner of this project'
        })
    }
    if (findProject) {
        findProject.uploads.pull({
            _id: req.body.id,
        });

        const savedProject = await findProject.save()
        if (savedProject)
            return res.status(200).json({
                message: 'Field uploaded successfully'
            })
        else
            return res.status(400).json({
                message: 'Error uploading field'
            })
    }
}
const edit_field = async (req, res) => {
    const findProject = await project.findOne({ _id: req.params.id })
    if (!req.user._id.equals(findProject.projectOwner)) {
        return res.status(400).json({
            message: 'You are not the owner of this project'
        })
    }
    if (findProject) {
        const matchFound = await project.findOne(
            { _id: req.params.id }, // Find the project by its ID
            { uploads: { $elemMatch: { _id: req.params.recordId } } } // Use $elemMatch to filter the uploads array
        )

        return res.status(200).json({ transcript: matchFound.uploads[0].transcript })
    }
}
const saveEdit = async (req, res) => {
    try {
        const findProject = await project.findOne({ _id: req.body.id })
        if (!req.user._id.equals(findProject.projectOwner)) {
            return res.status(400).json({
                message: 'You are not the owner of this project'
            })
        }

        if (findProject) {
            const updatedProject = await project.updateOne(
                { _id: req.body.id, "uploads._id": req.body.recordId },
                {
                    $set: {
                        "uploads.$.transcript": req.body.transcript,
                        // You can add more fields to update here if needed
                    }
                }
            )
            if (updatedProject)
                return res.status(200).json({
                    message: 'Field updated successfully'
                })
            else
                return res.status(400).json({
                    message: 'Error updating field'
                })
        }
    } catch (error) {
        res.status(400).json({
            message:"Error updating field"
        })
    }

}

module.exports = {
    Create_project,
    get_all_proiects,
    add_field,
    get_all_fields,
    delete_field,
    edit_field,
    saveEdit
};