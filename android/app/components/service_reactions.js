var reactions = [
	{
		label: '',
		value: "0",
		description: '',
		service: '',
		parametre: [
			{
				label: '',
				type: ''
			}
		]
	},
	{
		label: 'gmailSender',
		value: '1',
		description: 'gmail mail sender',
		service: 'gmail',
		parametre: [
			{
				label: 'mail',
				type: 'string'
			}
		]
	},
	{
		label: 'spotifyCreatePlaylist',
		value: '2',
		description: 'Create Playlist',
		service: 'spotify',
		parametre: [
			{
				label: 'playlistname',
				type: 'string'
			}
		]
	},
	{
		label: 'spotifyAddTrackToPlaylist',
		value: '3',
		description: 'Add track to playlist',
		service: 'spotify',
		parametre: [
			{
				label: 'playlistName, trackName',
				type: 'string'
			}
		]
	},
	{
		label: 'gdriveDeleter',
		value: '4',
		description: 'Delete files',
		service: 'gmail',
		parametre: [
			{
				label: 'fileName',
				type: 'string'
			}
		]
	}
];

export default reactions;