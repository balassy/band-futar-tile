module.exports = {
    server: {
        app: {
            message: 'Band Tile service for BKK Futár'
        },
        connections: {
            router: {
                isCaseSensitive: false
            }
        }
    },

    connections: [
        {
            port: 80,
            labels: ['api']
        }
    ],

    registrations: [
        {
            plugin: './next-ride',
            options: {
                routes: {
                    prefix: '/nextride'
                }
            }
        }
    ]
};