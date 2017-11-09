var AipOcrClient = require("baidu-aip-sdk").ocr;

// 设置APPID/AK/SK
var APP_ID = "10329828";
var API_KEY = "w92NSECvoHMp6GfGld3ZkEFu";
var SECRET_KEY = "t8EB2ThiuQt3c51xuhzyoIaZTEmAqk2C";

var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

var fs = require('fs');
var image = fs.readFileSync('./img.png');
var base64Img = new Buffer(image).toString('base64');
client.generalBasic(base64Img).then(function(result) {
    console.log(JSON.stringify(result));
});