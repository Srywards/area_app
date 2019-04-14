var actions = [
	{
		label: 'gdrive',
		value: '0',
		actions: [
			{
				label: 'gdriveList',
				value: '0',
				description: 'List gdrive',
				parametre: [
					{
						name: '',
						type: ''
					}
				]
			},
			{
				label: 'gdriveUpdateListener',
				value: '1',
				description: 'Get last time modif',
				parametre: [
					{
						name: 'fileName',
						type: 'String'
					}
				]
			}
		]
	},
	{
		label: 'reddit',
		value: '1',
		actions: [
			{
				label: 'redditReceiver',
				value: '0',
				description: 'Get latest inbox message',
				parametre: [
					{
						name: '',
						type: ''
					}
				]
			},
			{
				label: 'redditHottest',
				value: '1',
				description: 'get hottest topic for subreddits',
				parametre: [
					{
						name: 'subredditName',
						type: 'string'
					}
				]
			}
		]
	},
	{
		label: 'spotify',
		value: '2',
		actions: [,
			{
				label: '',
				value: '0',
				description: '',
				parametre: [
					{
						name: '',
						type: ''
					}
				]
			},
			{
				label: 'spotifyTrack',
				value: '1',
				description: 'Tracking current playing song.',
				parametre: [
					{
						name: '',
						type: ''
					}
				]
			}
		]
	},
	{
		label: 'gmail',
		value: '3',
		actions: [{
			label: '',
			value: '0',
			description: '',
			parametre: [
				{
					name: '',
					type: ''
				}
			]
		},
			{
				label: 'gmailReceiver',
				value: '1',
				description: 'gmail mail listenter',
				parametre: [
					{
						name: 'subject:*',
						type: ''
					}
				]
			}
		]
	},
	{
		label: 'timer',
		value: '4',
		actions: [
			{
				label: 'timerDate',
				value: '0',
				description: 'timer to a Date',
				parametre: [
					{
						name: 'Date',
						type: 'date'
					}
				]
			},
			{
				label: 'timerLooper',
				value: '1',
				description: 'looper',
				parametre: [
					{
						name: 'min',
						type: 'int'
					}
				]
			}
		]
	}
];

export default actions;