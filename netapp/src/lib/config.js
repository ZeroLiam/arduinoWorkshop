const config = {
	//for socketio
	host: '192.168.0.103',//local ip, remember to change on testing
	port: '3001',
	clientport: '3000',
	protocol: 'echo-protocol',
	//for Firmata
	serialPort: '/dev/cu.usbserial-AL02AF1A'
}

export default config;
