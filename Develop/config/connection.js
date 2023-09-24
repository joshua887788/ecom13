// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const Sequelize = require('sequelize');

let sequelize;

// If JAWSDB_URL exists, it means we're on a platform like Heroku with JAWSDB provisioned.
// Therefore, we should use the JAWSDB connection string.
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // Else, we are in a local environment and should use local database credentials.
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            dialectOptions: {
                decimalNumbers: true,
            },
        }
    );
}

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
