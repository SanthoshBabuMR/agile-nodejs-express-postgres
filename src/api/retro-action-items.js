import resource from 'resource-router-middleware';

const RETRO_ACTION_ITEM_NOT_FOUND = 'Retro Action Item Not Found!';
export default ({ config, db }) => {
	// const usersModel = users(db, Sequelize);
	return resource({
		/** Property name to store preloaded entity on `request`. */
		id : 'retroActionItem',
	
		/** For requests with an `id`, you can auto-load the entity.
		 *  Errors terminate the request, success sets `req[id] = data`.
		 */
		load(req, id, callback) {
			const query = 'SELECT * from retro_action_items where id = $1';
			const values = [id];
			db.query(query, values, (err, result) => {
				let retroActionItem = RETRO_ACTION_ITEM_NOT_FOUND;
				if(err) {
					return res.json(err);
				}
				if (result.rows.length) {
					retroActionItem = result.rows[0];
				}
				callback(err, retroActionItem)
			});
		},
	
		/** GET / - List all entities */
		index({ params }, res) {
			const selectStmt = 'SELECT * from retro_action_items';
			db.query(selectStmt, (err, result) => {
				if(err) {
					return res.json(err);
				}
				let retroActionItem = result.rows;
				res.json(retroActionItem);
			});
		},
	
		/** POST / - Create a new entity */
		create(req, res) {
			const query = "INSERT INTO retro_action_items(description, retro_points_id, owner_id) VALUES($1, $2, $3)";
			const values = [req.body.description, req.body.retro_points_id, req.body.owner_id];
	
			db.query(query, values, (err, result) => {
				if(err) {
					return res.json(err);
				}
				res.sendStatus(201);
			});
		},
	
		/** GET /:id - Return a given entity */
		read(req, res) {
			if(req.user === RETRO_ACTION_ITEM_NOT_FOUND) {
				return res.sendStatus(404);
			}
			res.json(req.tag);
		},
	
		/** PUT /:id - Update a given entity */
		update(req, res) {
			if(req.retroActionItem === RETRO_ACTION_ITEM_NOT_FOUND) {
				return res.sendStatus(404);
			}
			const query = "UPDATE retro_action_items SET description = $1, retro_points_id = $2, owner_id = $3 WHERE id = $4"
			const values = [req.body.description, req.body.reto_points_id, req.body.owner_id, req.params.retroActionItem ]
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
			if(req.retroActionItem === RETRO_ACTION_ITEM_NOT_FOUND) {
				return res.sendStatus(404);
			}
			const query = "DELETE FROM retro_action_items where id = $1";
			const values = [req.retroActionItem.id];
	
			db.query(query, values, (err, result) => {
				if(err) {
					return res.json(err);
				}
				res.sendStatus(204);
			});
		
		}
	});
};
