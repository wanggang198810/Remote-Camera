/**
 * Camera.js
 */
var config = require(__dirname + '/config/config.js');
var moment = require('moment');
var spawn = require('child_process').spawn;

exports.cameraCtrl = function(app) {
    // Take the photo form the Remote camera
    app.get('/api/take', function(req, res) {
        //console.log('---> 准备拍照 ----------');
        var title = moment().format('YYYYMMDD-hhmmss-a');
        //set picture
        var param = [];
        param.push("-d");
        param.push(config.piVedioPath);
        param.push("-r");
        param.push(config.pictureXY);
        param.push("--title");
        param.push(title);
        param.push("--no-timestamp");
        param.push(config.picturePath + title + '.jpg');
        //set result
        var result = {};
        //console.log('---> Done');

        //console.log('---> 启动进程');
        var fswebcam = spawn('fswebcam', param);
        //console.log('---> Done');

        //console.log('---> 准备数据');
        fswebcam.on('exit', function(code) {
            result = {
                'stat': 'ok',
                'id': title
            }
            //console.log('---> 成功，发送数据');
            res.send(200, result);
            fswebcam.kill();
        });
        fswebcam.on('error', function() {
            //console.log('error');
            result = {
                'stat': 'fail'
            }
            //console.log('---> 失败，发送数据');
            res.send(200, result);
            fswebcam.kill();
        });
        //console.log('---> Done     ---------|');
        //console.log('');
    });
}



