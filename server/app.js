const
    express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    project = require('./models/projectModel'),
    db = mongoose.connect("mongodb://localhost:27017/projects", { useNewUrlParser: true })
const app = express()

const port =  7000


app.options("/projects", function(req, res, next){

 res.header('Allow', 'GET,POST,OPTIONS,DELETE')
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE')
  res.set({ 'content-type': 'application/json;charset=utf-8' })
  res.set({ 'Accept': 'application/json' })

//  res.header('Accept', 'application/json')
  res.sendStatus(200);
});
app.options("/projects/:projectId", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
 res.header('allow', 'GET,PUT,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,PATCH,OPTIONS');
// res.set({'Access-Control-Allow-Origin','*'})
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
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
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




