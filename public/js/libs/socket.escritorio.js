//Comando para establecer la comunicacion

var socket = io();

//tomar los parametros que estan en el url

let searchParams = new URLSearchParams(window.location.search);

console.log(searchParams.has('escritorio'));

if (!searchParams.has('escritorio')) {
    window.location = "index.html";
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);
$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === "No hay tickets") {
            $('small').text(resp)
            alert(resp)
            return;
        }

        $('small').text('Tiket ' + resp.numero)

    });
});