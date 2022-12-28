//this file will remove un transfered file
const fs = require('fs');
const moment = require('moment');
let interval;
// TODO: create a cron job
const start = ()=>{ console.log("\nWORKER.JS STARTED\n")
                   interval = setInterval(() => {
                       //don't use require() method as this will cache the json and
                       //when it will be modified we won't be able to see the changes
                            //let untransfered = require('./untransfered');
                            let untransfered = {}
                            fs.readFile('./untransfered.json', 'utf-8', (err, data) => {
                            if (err) { console.log(err)}
                            else{
                                    untransfered = JSON.parse(data)
                                    
                                    untransfered.locations.forEach(location=>{
                                        let last = moment(location.timestamp)
                                        let now = moment().format();
                                        let x = moment(last)
                                        let y = moment(now)
                                        let duration = moment.duration(y.diff(x))
                                        console.log(duration.as('minutes'))
                                        if(duration.as('minutes')>5){ //delete the files kept longer than 5mins
                                                fs.unlink(location.file,(err)=>{
                                                if(err) {
                                                    //no such file is found   
                                                        console.log("NO SUCH FILE IS FOUND..\n")
                                                        console.log(`${location}\n`)
                                                            //remove that obj from json file
                                                        //     let pendingObjs  =  untransfered.locations;
                                                        //     pendingObjs = pendingObjs.filter((obj)=> obj.file!=location.file)
                                                        //     const newjson  = {
                                                        //     locations: pendingObjs
                                                        //     }
                                                        // // console.log(pendingObjs)
                                                        //     fs.writeFile('./untransfered.json',JSON.stringify(newjson),err=>{
                                                        //         if(err) console.log(err)
                                                        //         else{
                                                        //             console.log("file stamp removed from untransfered.json...[process done by WORKER.JS]")
                                                        //         }
                                                        //     })
                                                    }
                                                    else{
                                                    //file is found and is deleted
                                                    console.log("FILE DELETED..{WORKER.JS}")
                                                }
                                            })
                                        }
                                        
                                    })
                            }
                            })
                           
                            },60000); //run in worker in every 1mins
                    }

const stop = ()=>{ clearInterval(interval);}
module.exports = {
    start,stop
}
//900000
