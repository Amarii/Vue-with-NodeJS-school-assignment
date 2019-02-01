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
    res.status(400).send('error')
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
let page = 1
let limit =  parseInt(req.query.limit)
let start = parseInt(req.query.start)
let previousPage = (parseInt(req.query.limit) - 1)
if((previousPage) == 0){
    previousPage = 1
}

           Project.find({})
           .skip((perPage * page) - perPage)
           .limit(limit)
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
                        pagination: {currentPage: page,
                                        currentItems: limit || count,
                                        totalPages: Math.ceil(count / limit) || 1,
                                        totalItems: count,
                                        _links: {
                                            first: {
                                                page: 1,
                                                href: 'http://amycmgt.tk/projects/?start=1&limit=' + (limit || count)
                                            },
                                            last: {
                                                page: Math.ceil(count/ limit),
                                                href: 'http://amycmgt.tk/projects/?start=' + ((count - limit) + 1) +'&limit=' + limit
                                            },
                                            previous: {
                                                page: 10000,
                                                href: 'http://amycmgt.tk/projects/?start='+(start - limit) + '&limit=' + limit
                                            },
                                            next: {
                                                page: (limit + 1),
                                                href: 'http://amycmgt.tk/projects/?start='+ (start + limit) +'&limit=' + limit

                                    }

                   }
                }
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















