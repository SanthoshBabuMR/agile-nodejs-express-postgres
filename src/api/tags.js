import resource from 'resource-router-middleware';

const TAG_NOT_FOUND = 'Tag Not Found!';
export default ({ config, db }) => {
	// const usersModel = users(db, Sequelize);
	return resource({
		/** Property name to store preloaded entity on `request`. */
		id : 'tag',
	
		/** For requests with an `id`, you can auto-load the entity.
		 *  Errors terminate the request, success sets `req[id] = data`.
		 */
		load(req, id, callback) {
			const query = 'SELECT * from tags where id = $1';
			const values = [id];
			db.query(query, values, (err, result) => {
				let tag = TAG_NOT_FOUND;
				if(err) {
					return res.json(err);
				}
				if (result.rows.length) {
					tag = result.rows[0];
				}
				callback(err, tag)
			});
		},
	
		/** GET / - List all entities */
		index({ params }, res) {
			const selectStmt = 'SELECT * from tags';
			db.query(selectStmt, (err, result) => {
				if(err) {
					return res.json(err);
				}
				let tags = result.rows;
				res.json(tags);
			});
		},
	
		/** POST / - Create a new entity */
		create(req, res) {
			const query = "INSERT INTO tags(name, description) VALUES($1, $2)";
			const values = [req.body.name, req.body.description];
	
			db.query(query, values, (err, result) => {
				if(err) {
					return res.json(err);
				}
				res.sendStatus(201);
			});
		},
	
		/** GET /:id - Return a given entity */
		read(req, res) {
			if(req.user === TAG_NOT_FOUND) {
				return res.sendStatus(404);
			}
			res.json(req.tag);
		},
	
		/** PUT /:id - Update a given entity */
		update(req, res) {
			if(req.tag === TAG_NOT_FOUND) {
				return res.sendStatus(404);
			}
			const query = "UPDATE tags SET name = $1, description = $2 WHERE id = $3"
			const values = [req.body.name, req.body.description, req.params.tag ]
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
			if(req.user === TAG_NOT_FOUND) {
				return res.sendStatus(404);
			}
			const query = "DELETE FROM tags where id = $1";
			const values = [req.tag.id];
	
			db.query(query, values, (err, result) => {
				if(err) {
					return res.json(err);
				}
				res.sendStatus(204);
			});
		
		}
	});
};
