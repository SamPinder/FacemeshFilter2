let facemesh;
let video;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);

  facemesh.on("predict", results => {
    predictions = results;
  });
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function drawFilter() {
    if (predictions.length > 0 && predictions[0].annotations.hasOwnProperty('noseTip')) {
        const noseTip = predictions[0].annotations.noseTip[0];
        const x = noseTip[0];
        const y = noseTip[1];

       
       
        // Hat base
        fill(255, 0, 0);
      triangle(x - 50, y - 150, x + 50, y - 150, x, y -250);
     
      fill(255,255,0);
    circle(x, y-250,30);
    }
}
 
 
  function drawMustache(){
  if (predictions.length > 0) {
    console.log(Object.keys(predictions[0].annotations))
    const noseBottom = predictions[0].annotations.noseBottom[0];
    let bottomX = predictions[0].annotations.noseBottom[0][0];
    let bottomY = predictions[0].annotations.noseBottom[0][1];
    fill(0);
    triangle(bottomX - 40, bottomY, bottomX - 40, bottomY + 20, bottomX - 20, bottomY + 10);
    triangle(bottomX - 40, bottomY, bottomX - 20, bottomY, bottomX - 30, bottomY + 25);
    triangle(bottomX - 30, bottomY - 3, bottomX - 10, bottomY - 3, bottomX - 20, bottomY + 23);
    triangle(bottomX - 20, bottomY - 5, bottomX, bottomY -5, bottomX - 10, bottomY + 20);
    triangle(bottomX - 10, bottomY - 5, bottomX + 10, bottomY -5, bottomX, bottomY + 20);
    triangle(bottomX, bottomY - 3, bottomX + 20, bottomY -3, bottomX + 10, bottomY + 23);
    triangle(bottomX + 10, bottomY, bottomX + 30, bottomY, bottomX + 20, bottomY + 25);
    triangle(bottomX, bottomY + 10, bottomX + 30, bottomY, bottomX + 30, bottomY + 20);
  }
}


function draw() {
  image(video, 0, 0, width, height);

  //drawKeypoints();
  printAnnotations();
  drawFilter();
  drawMustache();
}

function printAnnotations(){
  if (predictions.length > 0) {
    console.log(Object.keys(predictions[0].annotations))
   
    const midEyes = predictions[0].annotations.midwayBetweenEyes[0];
    let x =  predictions[0].annotations.midwayBetweenEyes[0][0];
    let y =  predictions[0].annotations.midwayBetweenEyes[0][1];
    console.log(midEyes)
   
  }
}





function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;
    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];
      fill(0, 255, 0);
      ellipse(x, y, 5, 5);

    }
  }
}

