import { app } from "./app";
import { envVars } from "./app/config/env";
import {Server} from 'http'
const port = envVars.PORT || 5000
let server:Server ;

async function serverStart() {
    
  try {
    server = app.listen(port, () => {
      console.log(`Events & Activities app listening on port ${port}`)
    })
  } catch (error) {
    console.log(error);
  }
}

serverStart()

process.on("unhandledRejection",(error)=>{
    console.log('unhandled Rejection detected... server shuting down...',error);
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1) 
})

process.on("uncaughtException",(error)=>{
    console.log('uncaught Exception detected... server shuting down...',error);
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1) 
})

process.on("SIGTERM",()=>{
    console.log('SIGTERM SIGTERM RECIVEED... server shuting down...');
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1) 
})

process.on("SIGINT",()=>{
    console.log('SIGTERM SIGTERM RECIVEED... server shuting down...');
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1) 
})