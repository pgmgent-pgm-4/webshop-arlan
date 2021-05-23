export const parseSongRequest = (request) => {
	const { song } = request.body;

	// checking if the request contains a song
	if (!song) {
		throw new Error('No Song object supplied.')
	}

	// check if we have all necessary request parameters
	if (!song.title || !song.artist || !song.URI) {
		throw new Error('One of the parameters wasn\'t entered');
	}

	song.title = song.title.trim();
	song.artist = song.artist.trim();
	song.URI = song.URI.trim();

	return song;
};

export const parseUserRequest = (request) => {
	const { user } = request.body;
	console.log(user);

	// checking if the request contains a user
	if (!user) {
		throw new Error('No user object supplied.');
	}

	// check if we have all necessary request parameters
	if (!user.username || !user.email || !user.password) {
		throw new Error('One of the parameters wasn\'t entered');
	}

	user.username = user.username.trim();
	user.email = user.email.trim();

	return user;
}