const
    express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    project = require('./models/projectModel'),
    db = mongoose.connect("mongodb://localhost:27017/projects", { useNewUrlParser: true })
const app = express()

const port = process.env.PORT || 7000


app.options("/:projectId", function(req, res, next){
  
 res.header('allow', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.set({ 'content-type': 'application/json;charset=utf-8' })
  res.set({ 'Accept': 'application/json' })
//  res.header('Accept', 'application/json')
  res.sendStatus(200);
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

let projectRouter = require('./Routes/projectRoutes')(project)
app.use(function(req,res,next){
    if(req.accepts('json')){
        res.header('Access-Control-Allow-Origin', '*');
        next()
        return
    }
    res.sendStatus(404)
})
app.use('/projects', projectRouter)

app.get('/', function(req, res){
    res.send('test')
})


app.listen(port, function(){
    console.log('Server is listening to port: ' + port)
})

