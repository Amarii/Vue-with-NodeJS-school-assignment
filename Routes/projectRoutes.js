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
           let perPage = 10
           let page = req.params.page || 1
           let limit = parseInt(req.query.limit) || 10

           Project.find({})
           .skip((perPage * page) - perPage)
           .limit(perPage)
           .exec(function(err,projects){
               Project.count().exec(function(err, count){
                   if (err) return next(err)
                   let response = {
                       items: projects,
                       _links:{
                           self:{
                               href: "http://amycmgt.tk/projects"
                            }
                        },
                        "pagination": {'currentPage': page,
                                        'currentItems': limit,
                                        'totalPages': Math.ceil(count / perPage),
                                        'totalItems': count
                                    },
                                    
                   }
                   
                   res.json(response)
               })
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
                req.project.desc = req.body.desc
                req.project.author = req.body.author
                if(!req.body.title || !req.body.author || !req.body.desc){
                    res.sendStatus(400)
                }
                else{
                req.project.save(function(err){
                    if(err)
                    res.status(500).send(err)
                    else{
                        res.json(req.project)
                    }
                })
            }

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
                res.sendStatus(204, 'project removed')
            }
        })
    })


    return projectRouter
}


module.exports = routes


