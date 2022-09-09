const mongoose = require('mongoose');

//configuracion para guardar variables de entorno
// const {NOTAS_APP_MONGODB_HOST, NOTAS_APP_MONGODB_DATABASE} = process.env;

const MONGODB_URI ="mongodb+srv://notas:12345@cluster0.gjpklmx.mongodb.net/?retryWrites=true&w=majority";

// const MONGODB_URI = `mongodb://${NOTAS_APP_MONGODB_HOST}/${NOTAS_APP_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

.then(db => console.log('la base de datos está conectada'))
.catch(err => console.log(err));