const canvas = document.getElementById('canvas');
const video = document.getElementById('video');
const context = canvas.getContext('2d');
const btnStart = document.getElementById('btnStart');
const btnCal = document.getElementById('btnCal');

const config = {
  canvasWidth: 800,
  canvasHeight: 600,
  fps: 6,
  noiseLessRadius: 10,
};

btnStart.addEventListener('click', start);

// btnCal.addEventListener('click', callOnce);

function start () {
  initStyle();
  navigator.mediaDevices.getUserMedia({ video: true }).then(stream => video.srcObject = stream);
  setInterval(refreshCavnas, 1000 / config.fps);
}

function getPixelAvg (d) {
  let sum = 0;
  d.forEach(v => {
    sum = sum + v.r + v.g + v.b;
  });
  return sum / d.length / 3;
}

function refreshCavnas () {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const rgbaData = convertImageDataToRGBA(imageData.data);
  if (!rgbaData.length) { return; }

  // callOnce(rgbaData);
  // processGray(rgbaData);
  binarization(rgbaData);

  const finalData = convertRGBAtoImageData(rgbaData);
  context.putImageData(finalData, 0, 0);
}

function initStyle () {
  canvas.width = config.canvasWidth;
  canvas.height = config.canvasHeight;
  canvas.style.width = config.canvasWidth / 2 + 'px';
  canvas.style.height = config.canvasHeight / 2 + 'px';
  video.width = config.canvasWidth;
  video.height = config.canvasHeight;
  video.style.width = config.canvasWidth + 'px';
  video.style.height = config.canvasHeight + 'px';
  video.style.display = 'none';
}

/**
 * @param {ImageData} imageData
 * @return {Array<{r,g,b,a}>} 
 */
function convertImageDataToRGBA (imageData) {
  const rgba = [];
  for (let i = 0; i < imageData.length; i += 4) {
    rgba.push({
      r: imageData[i],
      g: imageData[i + 1],
      b: imageData[i + 2],
      a: imageData[i + 3],
    });
  }
  return rgba;
}

/**
 * @param {Array<{r,g,b,a}>} rgba
 * @return {ImageData}
 */
function convertRGBAtoImageData (rgba) {
  const arr = [];
  rgba.forEach(v => {
    arr.push(v.r);
    arr.push(v.g);
    arr.push(v.b);
    arr.push(v.a);
  });
  return new ImageData(Uint8ClampedArray.from(arr), config.canvasWidth, config.canvasHeight);
}

/**
 * @param {Array<{r,g,b,a}>} rgba
 */
function process (rgbaData) {
  const arr = imageData.data;
  const pipes = [processGray, noiseLess];
  pipes.forEach(p => {
    for (let i = 0; i < arr.length;) {
      p(arr, i);
      i += 4;
    }
  });
}

function processGray (arr, i) {
  const white = arr[i] + arr[i + 1] + arr[i + 2] < 383;
  arr[i] = white ? 255 : 0;
  arr[i + 1] = white ? 255 : 0;
  arr[i + 2] = white ? 255 : 0;
}

function noiseLess (arr, i) {
  const n = i / 4;
  const x = n % config.canvasWidth;
  const y = Math.floor(n / config.canvasWidth);
  let count = 0;
  for (let jj = 0; jj < config.noiseLessRadius; jj++) {
    for (let kk = 0; kk < config.noiseLessRadius; kk++) {
      // const p = 
    }
  }
}

function binarization (d) {
  const avg = getPixelAvg(d);
  d.forEach(v => {
    const underAvg = (v.r + v.g + v.b) / 3 < avg;
    v.r = underAvg ? 0 : 255;
    v.g = underAvg ? 0 : 255;
    v.b = underAvg ? 0 : 255;
  });
}