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
            port: process.env.PORT || 3000,
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