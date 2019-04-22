import resource from 'resource-router-middleware';
// import users from '../models/users';
// import Sequelize from 'sequelize';

const USER_RETRO_SESSION_NOT_FOUND = 'USER RETRO SESSION Not Found!';
export default ({ config, db }) => {
	// const usersModel = users(db, Sequelize);
	return resource({
		/** Property name to store preloaded entity on `request`. */
		id : 'userRetroSession',
	
		/** For requests with an `id`, you can auto-load the entity.
		 *  Errors terminate the request, success sets `req[id] = data`.
		 */
		load(req, id, callback) {
				const query = 'SELECT * from USER_RETRO_SESSION where id = $1';
			const values = [id];
			db.query(query, values, (err, result) => {
				let userRetroSession = USER_RETRO_SESSION_NOT_FOUND;
				if(err) {
					return res.json(err);
				}
				if (result.rows.length) {
					userRetroSession = result.rows[0];
				}
				callback(err, userRetroSession)
			});
		},
	
		/** GET / - List all entities */
		index({ params }, res) {
			const selectStmt = 'SELECT * from USER_RETRO_SESSION';
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
			const query = "INSERT INTO USER_RETRO_SESSION(description) VALUES($1)";
			const values = [req.body.description];
	
			db.query(query, values, (err, result) => {
				if(err) {
					return res.json(err);
				}
				res.sendStatus(201);
			});
		},
	
		/** GET /:id - Return a given entity */
		read(req, res) {
			if(req.userRetroSession === USER_RETRO_SESSION_NOT_FOUND) {
				return res.sendStatus(404);
			}
			res.json(req.user);
		},
	
		/** PUT /:id - Update a given entity */
		update(req, res) {
			if(req.userRetroSession === USER_RETRO_SESSION_NOT_FOUND) {
				return res.sendStatus(404);
			}
			const query = "UPDATE USER_RETRO_SESSION SET description = $1 WHERE id = $3"
			const values = [req.body.description, req.params.userRetroSession ]
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
			if(req.userRetroSession === USER_RETRO_SESSION_NOT_FOUND) {
				return res.sendStatus(404);
			}
			const query = "DELETE FROM USER_RETRO_SESSION where id = $1";
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
