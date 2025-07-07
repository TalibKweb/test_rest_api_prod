const mongoose = require('mongoose');

// >>>>>>>>>>>>>>>>>>>> Old Method
// mongoose.connect(process.env.USER_DATABASE_CONNECTION_URI)
//     .then(res =>  console.log('✅ MongoDB connected to DB:', mongoose.connection.name) )
//     .catch(err => console.log('Error Occured', err.message))

const userDB = mongoose.createConnection(process.env.USER_DATABASE_CONNECTION_URI)
userDB.on('connected', () =>
    console.log('✅ Connected to User DB:', userDB.name)
);

const prodsDB = mongoose.createConnection(process.env.PRODS_DATABASE_CONNECTION_URI)
prodsDB.on('connected', () =>
    console.log('✅ Connected to Product DB:', prodsDB.name)
);


module.exports = { userDB, prodsDB };
