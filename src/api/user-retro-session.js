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
			const query = 'SELECT * from USER_RETRO_SESSION where retro_session_id = $1';
			const values = [id];
			db.query(query, values, (err, result) => {
				let userRetroSession = USER_RETRO_SESSION_NOT_FOUND;
				if(err) {
					return res.json(err);
				}
				if (result.rows.length) {
					userRetroSession = result.rows;
				}
				req.retro_session_id = id;
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
			const query = "INSERT INTO USER_RETRO_SESSION(retro_session_id, user_id) VALUES($1, $2)";
			const values = [req.body.retro_session_id, req.body.user_id];
	
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
			res.json(req.userRetroSession);
		},
		
		/** DELETE /:id - Delete a given entity */
		delete(req, res) {
			const query = "DELETE FROM USER_RETRO_SESSION where retro_session_id = $1";
			const values = [req.retro_session_id];
	
			db.query(query, values, (err, result) => {
				if(err) {
					return res.json(err);
				}
				res.sendStatus(204);
			});
		
		}
	});
};
