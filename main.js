var e = "https://teachablemachine.withgoogle.com/models/nfQAAFfxk/model.json";
var Prediction1 = ""
var Prediction2 = ""
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function takeSnapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="captureImage" src="'+data_uri+'">'

    });

}
console.log(ml5.version); 
classifier = ml5.imageClassifier(e, modelLoaded);
function modelLoaded() {
    console.log("The model is Loaded 😃")

}
function speak() {
    var synth = window.speechSynthesis;
    speakData1 = "The First Prediction is "+Prediction1;
    speakData2 = "and the second prediction is "+Prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2)
    synth.speak(utterThis);
}
function check() {
    img = document.getElementById("captureImage");
    classifier.classify(img, gotResult);
    
}
function gotResult(error, result) {
    if (error){
        console.log(error);
    }
    else {
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        Prediction1 = result[0].label;
        Prediction2 = result[1].label;
        speak();
        if (result[0].label == "glad"){
            document.getElementById("update_emoji").innerHTML = "&#128512;"
        }
        if (result[0].label == "mad"){
            document.getElementById("update_emoji").innerHTML = "&#128545;"
        }
        if (result[0].label == "sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;"
        }
        if (result[0].label == "bad"){
            document.getElementById("update_emoji").innerHTML = "&#128545;"
        }
        if (result[1].label == "glad"){
            document.getElementById("update_emoji2").innerHTML = "&#128512;"
        }
        if (result[1].label == "mad"){
            document.getElementById("update_emoji2").innerHTML = "&#128545;"
        }
        if (result[1].label == "sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;"
        }
        if (result[1].label == "bad"){
            document.getElementById("update_emoji2").innerHTML = "&#128545;"
        }
    }
  
}

