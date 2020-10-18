const video  = document.getElementById('video');
const play  = document.getElementById('play');
const stop  = document.getElementById('stop');
const progress  = document.getElementById('progress');
const timestamp  = document.getElementById('timestamp');


//Play and Pause Video
function toggleVideoStatus(){
    if(video.paused){
        video.play();
    }

    video.pause();
}
//Update the Play/pause Icon
function updatePlayIcon(){
    if(video.paused){
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    }
    else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }
}

//update progress and timestamp
function updateProgress(){
    return true;
}

//set video time to progress
function setVideoProgress(){
    return true;
}

//Stop video
function stopVideo(){
    return true;
}
//EventListeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress)
