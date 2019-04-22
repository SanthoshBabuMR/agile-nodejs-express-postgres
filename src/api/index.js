import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import users from './users';
import tags from './tags';
import retroPoints from './retro-points';
import retroActionItems from './retro-action-items';
import retroSession from './retro-session';
import userRetroSession from './user-retro-session';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	api.use('/users', users({ config, db}));

	api.use('/tags', tags({ config, db}));

	api.use('/retro-points', retroPoints({ config, db}));

	api.use('/retro-action-items', retroActionItems({ config, db}));

	api.use('/retro-session', retroSession({ config, db}));

	api.use('/user-retro-session', userRetroSession({ config, db}));
	
	
	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}

