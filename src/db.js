// import Sequelize from 'sequelize';
const { Client } = require('pg');

export default callback => {
	// TODO: move to config file
	var conString = "postgres://postgres:password@localhost:5432/agile";
	const client = new Client(conString);
	client.connect();

	// const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/agile');

	// connect to a database if needed, then pass it to `callback`:
	callback(client);

	// sequelize
	// .authenticate()
	// .then(() => {
		
	// 	console.log('Connection has been established successfully.');
	// 	callback(sequelize);
	// })
	// .catch(err => {
	// 	console.error('Unable to connect to the database:', err);
	// 	callback(sequelize);
	// });
	
}
