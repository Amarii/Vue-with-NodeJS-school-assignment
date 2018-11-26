const 
    express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    project = require('./models/projectModel'),
    db = mongoose.connect("mongodb://localhost:27017/projects", { useNewUrlParser: true })
const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

let projectRouter = require('./Routes/projectRoutes')(project)



app.use('/projects', projectRouter)

app.get('/', function(req, res){
    res.send('test')
})
app.use("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  });
app.listen(port, function(){
    console.log('Server is listening to port: ' + port)
})

