import resource from 'resource-router-middleware';

const RETRO_POINT_NOT_FOUND = 'Retro Point Not Found!';
export default ({ config, db }) => {
	// const usersModel = users(db, Sequelize);
	return resource({
		/** Property name to store preloaded entity on `request`. */
		id : 'retroPoint',
	
		/** For requests with an `id`, you can auto-load the entity.
		 *  Errors terminate the request, success sets `req[id] = data`.
		 */
		load(req, id, callback) {
			const query = 'SELECT * from retro_points where id = $1';
			const values = [id];
			db.query(query, values, (err, result) => {
				let retro_point = RETRO_POINT_NOT_FOUND;
				if(err) {
					return res.json(err);
				}
				if (result.rows.length) {
					retro_point = result.rows[0];
				}
				callback(err, retro_point)
			});
		},
	
		/** GET / - List all entities */
		index({ params }, res) {
			const selectStmt = 'SELECT * from retro_points';
			db.query(selectStmt, (err, result) => {
				if(err) {
					return res.json(err);
				}
				let retro_points = result.rows;
				res.json(retro_points);
			});
		},
	
		/** POST / - Create a new entity */
		create(req, res) {
			const query = "INSERT INTO retro_points(description, tag_id, user_id) VALUES($1, $2, $3)";
			const values = [req.body.description, req.body.tag_id, req.body.user_id ];
	
			db.query(query, values, (err, result) => {
				if(err) {
					return res.json(err);
				}
				res.sendStatus(201);
			});
		},
	
		/** GET /:id - Return a given entity */
		read(req, res) {
			if(req.retroPoint === RETRO_POINT_NOT_FOUND) {
				return res.sendStatus(404);
			}
			res.json(req.retroPoint);
		},
	
		/** PUT /:id - Update a given entity */
		update(req, res) {
			if(req.retroPoint === RETRO_POINT_NOT_FOUND) {
				return res.sendStatus(404);
			}
			const query = "UPDATE retro_points SET description = $1, tag_id = $2, user_id = $3 WHERE id = $4"
			const values = [req.body.description, req.body.tag_id, req.body.user_id, req.params.retroPoint ]
			db.query(query, values, (err, result) => {
				if(err) {
					return res.json(err);
				}
				if(result.rowCount === 0) {
					return res.sendStatus(404);
				}
				res.sendStatus(204);	
			});
		},
	
		/** DELETE /:id - Delete a given entity */
		delete(req, res) {			
			if(req.retroPoint === RETRO_POINT_NOT_FOUND) {
				return res.sendStatus(404);
			}
			const query = "DELETE FROM retro_points where id = $1";
			const values = [req.retroPoint.id];
	
			db.query(query, values, (err, result) => {
				if(err) {
					return res.json(err);
				}
				res.sendStatus(204);
			});
		
		}
	});
};
