const app = require('./app')
const server = app

const port = 3000

server.listen(port,()=>{
    console.log(`Server is running at port: ${port}`);
})