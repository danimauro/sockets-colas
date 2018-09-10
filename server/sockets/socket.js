const { io } = require('../server');
const { TicketControll } = require('../classes/ticket-control');

ticketControll = new TicketControll();

io.on('connection', (client) => {

    client.on('siguienteTiket', (data, callback) => {
        let siguiente = ticketControll.siguiente();
        console.log(siguiente);
        callback(siguiente)
    });

    client.emit('estadoActual', { actual: ticketControll.getUltimoTiket(), ultimos4: ticketControll.getUltimos4() });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControll.atenderTicket(data.escritorio);
        callback(atenderTicket);
    });

    client.broadcast.emit('ultimos4', { ultimos4: ticketControll.getUltimos4() });

});