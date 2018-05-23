//configure the connection for the server
const config = {
	//for socketio
	host: '192.168.0.103',//local ip, remember to change on testing
	port: '3001',
	protocol: 'echo-protocol',
	//for Firmata
	serialPort: '/dev/cu.usbserial-AL02AF1A'
}

var app = require('express')();
var http = require('http').Server(app);
var sockio = require('socket.io')(http);
var _ = require('lodash');
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort(config.serialPort, {
      baudrate: 9600
});
var SERIAL_MESSAGE_DELIMITER = '\n';
var SENSOR_ASSIGN_DELIMITER = ':';

//Make the object for the devices and properties
var devObj = {};
var dataObj = {};
var clientObj = [];

app.get('/', function(req, res){
  res.send('<h1>Setting up server</h1><h2>Setting up Arduino</h2>');
});

let minions = [];

console.log("Starting up serial host...");

var message = "DATA GOES HERE";

function write(r,g,b) {
    port.open(function(err) {
				port.write(r + "," + g + "," + b, function(err, res) {
								if (err) { console.log(err); }
								//port.close();
				});
    });
}

port.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message);
  }
});

// the open event will always be emitted
port.on('open', function() {
  // open logic
    console.log('port opened');
});

// the data evend
port.on('data', function (data) {
    // received data
    // console.log ("---------------------");
    //console.log('Received Data: ' + data);
});

function receivedSensorData(dataArray){
	for(var g = 0; g < dataArray.length; g++){
		console.log(dataArray[g])
	}


}

sockio.on('connection', function(socketclient){
	minions.push(socketclient);

  console.log('a user connected:' + socketclient.id);
	devObj[socketclient.id] = {socket: socketclient};
	dataObj = {
		id: socketclient.id,
		connected: true,
		msg: 'I can see you Mr. ' + socketclient.id
	};



		// Get the data from all the minions
			socketclient.on('fromarduino', function(data){
					//Only phones will send this event
					console.log(data);
					// var receivedData = data.luz[0];
			});

				// Get the data from all the minions
					socketclient.on('datavalues', function(data){
							//Only phones will send this event
							console.log(data);

							// write(data[0],data[1],data[2]);
					});

	console.log(dataObj);

		socketclient.on('disconnect', () => {
				console.log('Got disconnect! ' + socketclient.id);

		});

});


http.listen(config.port, function(){
  console.log('listening on *: ' + config.port);
});
