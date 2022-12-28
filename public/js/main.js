$(document).ready(()=>{
    const $ = jQuery.noConflict();
    const inputUrl = $('#link')
    const videoInfo = $('#video-info')
    videoInfo.css('display','none')
    let isActive = false
    $('#convert').on('click',(e)=>{
        $('tbody').html(""); 
        $('#message').text("")
        $('#message').css('display','none')
        $('#message').removeClass('text-focus-in')
        const url = $(inputUrl).val().trim()
        if(url!=''){
            if(isActive){
                $('#title').removeClass('text-focus-in')
                $('#bigImage').css('filter','blur(4px)')
                $('#bigImage').removeClass('rotate-in-2-cw')
                $('#bigImage').addClass('swirl-out-bck')
                $('#title').css('filter','blur(3px)')
                $('#thumbnail').removeClass('kenburns-top')
            }
            console.log(url)
            
           
            $.post('/videoinfo',{url:url},(response)=>{
                if(response.code==='405'){
                    //download only audio which are less than 20mins
                    $('tbody').html(""); 
                    $('#message').css('display','inline-block')
                    $('#readmore').attr('href','#')
                    $('#message').text(response.err)
                    $('#message').addClass('text-focus-in')
                    $('#message').css("display","inline-block")
                    //only audio can be downloaded
                   
                    let blur = 4;
                    const resObj = (response.audioinfo);
                    console.log(resObj)
                    $('tbody').html("");

                    let audioDownload = `<tr>
                    <td>High Quality MP3</td>
                        <td><a href='/audiostream?quality=mp3&from=${url}&title=${resObj.title.toString()}' 
                        class="uk-button uk-button-default" 
                        type="button">Download</a></td>`
                    
                        $('tbody').append(audioDownload); 
                        $('#thumbnail').attr('src',resObj.thumbnail)
                        $('#title').text(resObj.title)
                        $('#author').text(resObj.author)
                        $('#readmore').attr('href',resObj.channel_url)
                        videoInfo.css('display','block')
                        $('#thumbnail').on('load',(e)=>{
                            $('#bigImage').css('filter','blur(0px)')
                            $('#bigImage').removeClass('swirl-out-bck')
                            $('#title').css('filter','blur(0)')
                            $('#title').addClass('text-focus-in')
                            $('#thumbnail').addClass('kenburns-top')
                            $('#bigImage').addClass('rotate-in-2-cw')
                            isActive = true
                        })
                }else if(response.code==='40X'){
                    //url contains audio greater than 20mins
                    $('tbody').html(""); 
                    $('#message').css('display','inline-block')
                    $('#readmore').attr('href','#')
                    $('#message').text(response.err)
                    $('#message').addClass('text-focus-in')
                    $('#message').css("display","inline-block")
                }else{
                    $('#message').css("display","none")
                    let blur = 4;
                    const resObj = JSON.parse(response);
                    console.log(resObj)
                    $('tbody').html(""); 
                   
                   
                resObj.availQuality.forEach(q=>{
                    let component = `<tr>
                    <td>${q}</td>
                        <td><a href='/redirect?quality=${q}&from=${url}&title=${resObj.title.toString()}' 
                        class="uk-button uk-button-default download_video" resolutions='${q}' 
                        type="button">Download</a></td>
                    </tr>`
                    $('tbody').append(component); 
                })
                    let audioDownload = `<tr>
                    <td>High Quality MP3</td>
                        <td><a href='/audiostream?quality=mp3&from=${url}&title=${resObj.title.toString()}' 
                        class="uk-button uk-button-default" 
                        type="button">Download</a></td>`
                    
                        $('tbody').append(audioDownload); 
                    
                    $('#thumbnail').attr('src',resObj.thumbnail)
                    $('#title').text(resObj.title)
                    $('#author').text(resObj.author)
                    $('#readmore').attr('href',resObj.channel_url)
                    videoInfo.css('display','block')
                    $('#thumbnail').on('load',(e)=>{
                        $('#bigImage').css('filter','blur(0px)')
                        $('#bigImage').removeClass('swirl-out-bck')
                        $('#title').css('filter','blur(0)')
                        $('#title').addClass('text-focus-in')
                        $('#thumbnail').addClass('kenburns-top')
                        $('#bigImage').addClass('rotate-in-2-cw')
                        isActive = true
                    })
                }
              
            })
        }else{
            console.log("URL is empty!!")
        }
    })
    // $('table').on('click','.download_video',(e)=>{
    //     const resolutions = e.target.attributes.resolutions.value.toString();
    //     const from = $(inputUrl).val().trim()
    //     const url = `/download?quality=${resolutions}&from=${from}`;
    //     $.get(url,(response)=>{
    //         console.log(`download request sent to ${url}`)
    //     });
    //     // $('.download_video').each(event=>{
    //     //     console.log(event.target)
    //     //     if(event.target === target){
    //     //         console.log(target)
    //     //     }
    //     // })
    //     // $( "li.item-a" ).parent().css( "background-color", "red" );    
    // })

    
})