
$(document).ready(()=>{
    const $ = jQuery.noConflict();
    const bar = $('#js-progressbar')
    const btn = $('#autofire')
    const downloadStatus = $('#downloadStatus')
    const data = {
        quality: $(btn).attr('quality'),
        url: $(btn).attr('url'),
        title: $(btn).text(),
    }
   
    console.log(data)
    const socket = io.connect(`${window.location.host}`)
    let statusFlag = false

    if(data.url&&data.quality&&data.title){
        let i=0;
        socket.emit('downloadInfo',data);
        socket.on('progress',progress=>{
            
            console.log(progress.progress)
            if(!statusFlag){ 
                $(downloadStatus).addClass('tracking-in-expand')
                $(downloadStatus).text('Downloading audio now...') 
                statusFlag=true
            }
            if(progress.progress == 100){ 
               
                console.log("audio donneee")
                $(downloadStatus).removeClass('tracking-in-expand')
                $(downloadStatus).addClass('tracking-out-contract')
                if(i!=1){
                    setTimeout(()=>{
                        $(downloadStatus).removeClass('tracking-out-contract')
                        $(downloadStatus).addClass('tracking-in-expand')
                        $(downloadStatus).text('Downloading video now...')
                        i=1;
                    },1000)
                }
                else{
                    $(downloadStatus).removeClass('tracking-in-expand')
                    $(downloadStatus).addClass('tracking-out-contract')
                    setTimeout(()=>{
                        $(downloadStatus).removeClass('tracking-out-contract')
                        $(downloadStatus).addClass('tracking-in-expand')
                        $(downloadStatus).text('Merging audio and video... Please wait')
                        $('#random_facts').append(`<p>Redirecting to download page...</p>`)
                        // redirect to home
                        setTimeout(()=>{
                            window.location.href = '/'
                        })
                    },1000)
                    
    
                }
              
                bar.attr('value',0)
            }
              bar.attr('value',progress.progress)
           
        })

    }
   
    socket.on('downloadlink',(link)=>{
     
        window.location.href = link
    })
    socket.on('redirect',link=>{
        
        window.location.href = link
    })
  
})