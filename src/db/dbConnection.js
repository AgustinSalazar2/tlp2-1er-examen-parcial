const mongoose = require('mongoose');

const dbConnect = ()=> {
    try {
        mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conectado a la BD');
    } catch (error) {
        console.log('Error al conectar la BD');
        console.log(error.message);
    }
}

module.exports = dbConnect;