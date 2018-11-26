const express = require('express')
let _id = 1000

let routes = function(Project){
    const projectRouter = express.Router()

    projectRouter.route('/')
        .post(function(req, res){
            let project = new Project(req.body)
            _id++
            project._id = _id
            project._links.href = "https://amycmgt.tk/projects/" + _id

            project.save()
            res.status(201).send(project)
        })
        .get(function(req,res){
            let query = {}
    
            if(req.query.author)
            {
                query.author = req.query.author
            }
            Project.find(query,function(err,project){
                if(err)
                    res.status(500).send(err)
                
                else
                    res.json({items: project})
            })
        })
        projectRouter.use('/:projectId',function(req,res,next){
            Project.findById(req.params.projectId,function(err,project){
                if(err)
                    res.status(500).send(err)
                
                else if(project){
                    req.project = project
                    next()
                }
                else{
                    res.status(404).send('no drawing found!')
                }
                    
            })
        })
        projectRouter.route('/:projectId')
        .get(function(req,res){
            
            res.json(req.project)
            

        })
        .put(function(req,res){

                req.project.title = req.body.title
                req.project.author = req.body.author
                req.project.save(function(err){
                    if(err)
                    res.status(500).send(err)
                    else{
                        res.json(req.project)
                    }
                })

        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id
            for(let p in req.body){
                req.project[p] = req.body[p]
            }
            req.project.save(function(err){
                if(err)
                res.status(500).send(err)
                else{
                    res.json(req.project)
                }
            })
        })
        .delete(function(req,res){
            req.project.remove(function(err){
                if(err)
                    res.status(500).send(err)
                else{
                    res.status(204).send('project removed')
                }
            })
        })

        
        return projectRouter
}

module.exports = routes
