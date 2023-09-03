import { HoudiniClient } from '$houdini';
import { PUBLIC_GRAPHQL_ENDPOINT } from '$env/static/public';
import { get } from 'svelte/store';

export default new HoudiniClient({
	url: PUBLIC_GRAPHQL_ENDPOINT,
	// fetchParams({ session }) {
	// 	const accessToken = session?.accessToken;
	// 	const gid = get(currentGroup);
	// 	console.log('gid :>> ', gid);
	// 	const headers: HeadersInit = {
	// 		'Content-Type': 'application/json',
	// 		Authorization: `Bearer ${accessToken}`
	// 	};

	// 	if (gid) {
	// 		headers['GroupID'] = gid;
	// 	}

	// 	return {
	// 		headers
	// 	};
	// }
});
