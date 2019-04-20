import resource from 'resource-router-middleware';
// import users from '../models/users';
// import Sequelize from 'sequelize';

const USER_NOT_FOUND = 'User Not Found!';
export default ({ config, db }) => {
	// const usersModel = users(db, Sequelize);
	return resource({
		/** Property name to store preloaded entity on `request`. */
		id : 'user',
	
		/** For requests with an `id`, you can auto-load the entity.
		 *  Errors terminate the request, success sets `req[id] = data`.
		 */
		load(req, id, callback) {
			// usersModel.findOne({ where: {id: id} }).then(user => {
			// 	let err = 'Not Found';
			// 	if (user) {
			// 		err = null;
			// 	}
			// 	callback(err, user.get({
			// 		plain: true
			// 	}))
			// });

			const query = 'SELECT * from users where id = $1';
			const values = [id];
			db.query(query, values, (err, result) => {
				let user = USER_NOT_FOUND;
				if(err) {
					return res.json(err);
				}
				if (result.rows.length) {
					user = result.rows[0];
				}
				callback(err, user)
			});
		},
	
		/** GET / - List all entities */
		index({ params }, res) {
			// usersModel.findAll().then(users => {
			// 	res.json(users.get({
			// 		plain: true
			// 	}));
			// });
			const selectStmt = 'SELECT * from users';
			db.query(selectStmt, (err, result) => {
				if(err) {
					return res.json(err);
				}
				let users = result.rows;
				res.json(users);
			});
		},
	
		/** POST / - Create a new entity */
		create(req, res) {
			// usersModel.create({
			// 	email: req.body.email,
			// 	name: req.body.name
			// }).then(() => {
			// 	res.json('User Created!');
			// });

			const query = "INSERT INTO users(email, name) VALUES($1, $2)";
			const values = [req.body.email, req.body.name];
	
			db.query(query, values, (err, result) => {
				if(err) {
					return res.json(err);
				}
				res.sendStatus(201);
			});
		},
	
		/** GET /:id - Return a given entity */
		read(req, res) {
			if(req.user === USER_NOT_FOUND) {
				return res.sendStatus(404);
			}
			res.json(req.user);
		},
	
		/** PUT /:id - Update a given entity */
		update(req, res) {
			if(req.user === USER_NOT_FOUND) {
				return res.sendStatus(404);
			}
			const query = "UPDATE users SET name = $1, email = $2 WHERE id = $3"
			const values = [req.body.name, req.body.email, req.params.user ]
			db.query(query, values, (err, result) => {
				if(err) {
					return res.json(err);
				}
				if(result.rowCount === 0) {
					res.sendStatus(404);
				}
				res.sendStatus(204);	
			});
		},
	
		/** DELETE /:id - Delete a given entity */
		delete(req, res) {
			// usersModel.destroy({
			// 	where: {
			// 		id: req.user.id
			// 	}
			// }).then(() => {
			// 	res.sendStatus(204);
			// });
			
			if(req.user === USER_NOT_FOUND) {
				return res.sendStatus(404);
			}
			const query = "DELETE FROM users where id = $1";
			const values = [req.user.id];
	
			db.query(query, values, (err, result) => {
				if(err) {
					return res.json(err);
				}
				res.sendStatus(204);
			});
		
		}
	});
};
