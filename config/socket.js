const app = require('../app');
let io = require('socket.io');

io = io(server);
app.use(function(req, res, next) {
    req.io = io;
    next();
});
