const fs = require('fs')

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControll {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.ticket = [];
        this.ultimos4 = [];
        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.ticket = data.ticket;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1;
        let tiket = new Ticket(this.ultimo, null);
        this.ticket.push(tiket)
        this.grabarArchivo();
        return `Ticket ${ this.ultimo }`;
    }

    getUltimoTiket() {
        return `Ticket ${ this.ultimo }`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.ticket.length === 0) {
            return 'No hay tickets';
        }
        let numeroTicket = this.ticket[0].numero;
        this.ticket.shift(); //Eliminamos el primer elemento del arreglo 
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el ultimo elemento del arreglo
        }

        this.grabarArchivo();
        return atenderTicket;
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.ticket = [];
        this.ultimos4 = [];
        console.log('se ha inicializado el archivo');
        this.grabarArchivo();

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            ticket: this.ticket,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }
}

module.exports = {
    TicketControll
}