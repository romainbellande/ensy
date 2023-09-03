// import { PUBLIC_GRAPHQL_ENDPOINT } from '$env/static/public';
/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	cacheBufferSize: 0,
	watchSchema: {
		url: (env) => env.PUBLIC_GRAPHQL_ENDPOINT
	},
	plugins: {
		'houdini-svelte': {}
	},
	scalars: {
		UUID: {
			type: 'string'
		},
		DateTime: {
			type: 'Date'
		},
		ConnectionCursor: {
			type: 'string'
		}
	},
	defaultCachePolicy: 'NetworkOnly',
	defaultLifetime: 0
};

export default config;
