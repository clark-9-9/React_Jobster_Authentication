const { NotFound, BadRequest } = require("../errors")
const JobModel = require("../model/Job")



const getAllJob = async (req, res) => {
    
    const{ userId } = req.user
    const jobs = await JobModel.find({ createdBy:userId })
    
    res.status(200).json({ jobs, count: jobs.length })
}


const getJob = async (req, res) => {
    const{
        user:{ userId },
        params:{ id: jobId }
    } = req

    const job = await JobModel.findOne({ _id: jobId, createdBy:userId })

    if(!job) throw new NotFound(`there is not any job by id: ${jobId}`)

    res.status(200).json({ job })
}


const createJob = async (req, res) => {

    req.body.createdBy = req.user.userId
    const job = await JobModel.create(req.body)


    res.status(201).json({ job })

}


const updateJob = async (req, res) => {
    const{
        user:{ userId },
        params:{ id: jobId },
        body:{ company, position }
    } = req


    if(!company && !position) throw new BadRequest("please provide company and position")
    if(!company) throw new BadRequest("please provide company")
    if(!position) throw new BadRequest("please provide position")


    const job = await JobModel.findOneAndUpdate(
        { _id: jobId, createdBy:userId },
        req.body,
        { new:true, runValidators:true }
    )

    res.status(200).json({ job })


}


const deleteJob = async (req, res) => {
    const{
        user:{ userId },
        params:{ id: jobId },
    } = req

    const job = await JobModel.findOneAndRemove({ _id: jobId, createdBy:userId })

    res.status(200).json({ job })

}





module.exports = {
    getAllJob, getJob, createJob, updateJob, deleteJob
}