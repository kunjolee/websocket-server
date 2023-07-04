// Tenemos que decirle desde el frontend que se conecte a el socket
// User un objeto que la libreria socket.io/socket.io.js nos da "io()"

// emit: emitir un evento (emitir eventos personalizados) (no mayusculas, camelcase, caracteres especiales)
// on: escuchar un evento

// al momento de reconectarme puede tardar unos segundos, ya que el cliente tiene un timer que cada cierto tiempo intentara conectarse al servidor. Una vez ya conectados podemos hacer la comunicacion en tiempo real entre el back y el front

const lblOnline  = document.getElementById('lblOnline');
const lblOfline  = document.getElementById('lblOffline');
const txtMessage = document.getElementById('txtMessage');
const btnEnviar  = document.getElementById('btnEnviar');

// Este es e client
const socket = io();

socket.on('connect' , () => {
    lblOfline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    lblOfline.style.display = '';
    lblOnline.style.display = 'none';
})

socket.on('send-message-server', ( payload ) => {
    console.log('estoy en send-message-server',payload)
})

btnEnviar.addEventListener('click', () => {
    const message = txtMessage.value
    // custom events: emmit

    const payload = {
        message, 
        id: '123232',
        date: Date.now()
    }

    // este 3er argumento que es una callback hace referencia al callback (2do argumento) de socket.on('send-message) del server
    
    // Esto lo hacemos si queremos obtener una respuesta desde el server (para solo un cliente y no para todos)
    socket.emit('send-message', payload, ( id ) => {
        console.log('from my server', id)
    });
});