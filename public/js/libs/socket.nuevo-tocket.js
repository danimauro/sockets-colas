//Comando para establecer la comunicacion

var socket = io();
var label = $('#lblNuevoTicket');
socket.on('connect', function() {
    console.log('Conectado al Servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos la conexion con el servidor');
});

//recibir información
socket.on('estadoActual', function(data) {
    label.text(data.actual)
});

$('button').on('click', function() {

    //enviar información
    socket.emit('siguienteTiket', null, function(siguienteTicket) {
        label.text(siguienteTicket)
    });

});