var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

//设置静态资源目录
app.use(express.static(path.join(__dirname, 'static')));

//监听用户连接
io.on('connection', function(socket){
    console.log('a user connected');
    //监听用户断开连接
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    });

http.listen(3000,function(){
    console.log('listening on *:3000');
})