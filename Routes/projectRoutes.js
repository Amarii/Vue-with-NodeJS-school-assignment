const express = require('express')


let routes = function(Project){
    const projectRouter = express.Router()

    projectRouter.route('/')
        .post(function(req, res){
            let project = new Project(req.body)


     //   console.log(_id)
            project._links.self.href = "http://amycmgt.tk/projects/" + project._id
            project._links.collection.href = "http://amycmgt.tk/projects/"
if(!req.body.title || !req.body.author || !req.body.desc){
    res.sendStatus(400)
    }
    else{
            project.save(function(err){
                if(err)
                    res.send(err)
                    res.status(201).send(project)
            })


    }
        })
        .get(function(req,res,next){
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
        .get(function(req,res,next){

            res.json(req.project)


        })
        .put(function(req,res,next){

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
        .patch(function(req,res,next){
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
    .delete(function(req,res,next){
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


