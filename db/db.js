const mongoose = require('mongoose');

// >>>>>>>>>>>>>>>>>>>> Old Method
mongoose.connect(process.env.DATABASE_CONNECTTION_URI)
    .then(res =>  console.log('✅ MongoDB connected to DB:', mongoose.connection.name) )
    .catch(err => console.log('Error Occured', err.message))

module.exports = mongoose;



// let conn = null;
// module.exports = async () => {
//     if (conn) return conn
//     conn = await mongoose.connect(process.env.DATABASE_CONNECTTION_URI, {
//         dbName: 'users'
//     });
//     return conn;
    
// };


