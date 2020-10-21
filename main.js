
song = ""; 
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {

    song = loadSound("music.mp3"); 

}

function setup() { 
    canvas = createCanvas(600, 500); 
    canvas.center(); video = createCapture(VIDEO); 
    video.hide(); 
    PoseNet = ml5.poseNet(video,modelLoaded);
    PoseNet.on('pose',gotPoses);
}

function draw() { 
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        inNumberLeftWristY = Number(leftWristY);
        remove_decimal = floor(inNumberLeftWristY);
        volume = remove_decimal/500 ;
        document.getElementById("volume").innerHTML = "volume"+volume;
        song.setVolume(volume);
    }
 }
 
 function play() { 
     song.play();
     song.setVolume(1);
     song.rate(1); 
    }

function modelLoaded(){
    console.log("poseNet is initialised!!!");
    
}

function gotPoses(results,error){
    if (error){
        console.error(error);
    }
    else if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x ;
        leftWristY = results[0].pose.leftWrist.y ;
        rightWristX = results[0].pose.rightWrist.x ;
        rightWristY = results[0].pose.rightWrist.y ;
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        console.log("right wrist x  = "+rightWristX+"right wrist y = "+rightWristY);
        console.log("left wrist x  = "+leftWristX+"left wrist y = "+leftWristY);
    }
}