

// (socket) - es el cliente que se esta conectando al backend (pueden haber miles de clientes conectados al mismo tiempo)

const socketController = (socket) => {
    // siempre que recargo la app. socket.io hace que se pierda la conexion (desconectarse) y crea una nueva conexion totalmente diferente a la anterior

    console.log('client connected' , socket.id);

    socket.on('disconnect', () => {
        console.log('client disconnected' , socket.id)
   })

   socket.on('send-message', ( payload, callback ) => {
       // este callback hace referencia al 3er argumento (callback) de socket.emit('send-message')

       const id = 123456;
       callback({ id, createdAt: new Date().getTime(), payload });
       

       // emitir un evento al cliente. | cuando usamos socket.emit en vez de io.emit, se enviara el mensaje solo al cliente que esta ejecutando el evento, para enviar el mensaje a todos se necesita agregar una nueva propiedad llamada "broadcast" (para enviar un mensaje a todos los demas clientes, excepto a mi "actual cliente")


       socket.broadcast.emit('send-message-server', payload )
   })
   
}

module.exports = {
    socketController
}