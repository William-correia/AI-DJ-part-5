song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

leftWristX = 0;
leftWristY = 0;

RightWristX = 0;
RightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() 
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist =  results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        scoreRightWrist =  results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX +" leftWristY = "+ leftWristY);
    
    }
}


function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FFFF00");
    stroke("FFFF00");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(scoreRighttWrist > 0.2)
	{
		circle(RightWristX,RightWristY,20);
        song1.stop();
        
        if(song2_status = false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
        }
    }

    if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
        song2.stop();
        
        if(song1_status = false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
        }
    }
}
