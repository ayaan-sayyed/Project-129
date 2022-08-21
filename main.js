leftWristY = 0;
leftWristX = 0;
rightWristY = 0;
rightWristX = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
var TheNights = "";
var GamesBegin = "";
var MagentaRiddim = "";

function preload() {
    TheNights = loadSound("The Nights.mp3");
    GamesBegin = loadSound("LET THE GAMES BEGIN.mp3");
    MagentaRiddim = loadSound("Magenta Riddim.mp3");
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.position(480, 250);
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotResults);
}

function draw() {
    image(video, 0, 0, 650, 470);
    fill("red");
    stroke("yellow");
    GamesBegin.isPlaying();
    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        TheNights.stop();
        GamesBegin.play();
    }
    if (scorerightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        MagentaRiddim.isPlaying();
        TheNights.stop();
        GamesBegin.stop();
        MagentaRiddim.play();
    }
}


function play() {
    TheNights.play();
    TheNights.setVolume(0.7);
    TheNights.rate(1);
}

function stop() {
    TheNights.stop();
}

function modelLoaded() {
    console.log("Model is Loaded!!!!!!!!!!!!!!!!!");
}

function gotResults(Results) {
    if (Results.length > 0) {
        console.log(Results);
        leftWristY = Results[0].pose.leftWrist.y;
        rightWristY = Results[0].pose.rightWrist.y;
        console.log(leftWristY);
        console.log(rightWristY);
        scoreleftWrist = Results[0].pose.keypoints[9].score;
        scorerightWrist = Results[0].pose.keypoints[10].score;
    }

}