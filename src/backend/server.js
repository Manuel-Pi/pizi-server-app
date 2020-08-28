var mongoose = require('mongoose');
module.exports = (socketServer, console) => {
    // Get io for a specific namespace
    const io = socketServer.of('/pizi-server');

    // Init game from DB
    mongoose.connection.once('open', () => {
        console.debug("Database connected!")
    });

    io.on('connection', socket => {
        /*************** CONNECTIONS *****************/
        console.debug("Client connected to server");
    });
}