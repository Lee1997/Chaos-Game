var firstPixel = true;

function startTriangle(){
  pixels = 0;
  firstPixel = true;
  ctx.clearRect(0, 0, width, height);

  // 3 intial points
  ctx.fillRect(width / 2,10,1,1);
  ctx.fillRect(width / 6, height - 10, 1, 1);
  ctx.fillRect((width / 6)*5, height - 10, 1, 1);
}

window.onload = function(){
  canvas = document.getElementById('triangleCanvas');
  ctx = canvas.getContext("2d");
  width = canvas.width;
  height = canvas.height;

  lastX = 0;
  lastY = 0;

  p1x = width / 2;
  p1y = 10;

  p2x = (width / 6);
  p2y = (height - 10);

  p3x = ((width / 6) * 5);
  p3y = (height - 10);

  pixels = 0;
  pixelP = document.getElementById('pixels');
}

function addSingle(){

  if(firstPixel){
    var r1 = Math.random();
    var r2 = Math.random();

    var px = (1 - Math.sqrt(r1)) * p1x + (Math.sqrt(r1) * (1 - r2)) * p2x + (Math.sqrt(r1) * r2) * p3x;
    var py = (1 - Math.sqrt(r1)) * p1y + (Math.sqrt(r1) * (1 - r2)) * p2y + (Math.sqrt(r1) * r2) * p3y;

    lastX = Math.round(px);
    lastY = Math.round(py);
    ctx.fillRect(px, py, 1, 1);
    pixels++;
    pixelP.innerHTML = "Pixels: " + pixels;
    firstPixel = false;
    return;
  }

  var rand = Math.floor(Math.random() * 3) + 1;

  var pointX;
  var pointY;

  switch(rand){
    case 1 : pointX = p1x; pointY = p1y; break;
    case 2 : pointX = p2x; pointY = p2y; break;
    case 3 : pointX = p3x; pointY = p2y; break;
  }

  var drawX = (lastX + pointX) / 2;
  var drawY = (lastY + pointY) / 2;

  lastX = drawX;
  lastY = drawY;

  ctx.fillRect(drawX, drawY, 1, 1);
  pixels++;
  pixelP.innerHTML = "Pixels: " + pixels;


}

function draw1000(){
  for(var i = 0; i < 1000; i++){
    addSingle();
  }
  pixelP.innerHTML = "Pixels: " + pixels;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



async function runTriangle(ms){
  for(var i = 0; i < 15000; i++){
    addSingle();
    if(i < 1000) await sleep(3);
    else if(i < 3000) await sleep(2);
    else await sleep(1);
  }
  pixelP.innerHTML = "Pixels: " + pixels;
}
