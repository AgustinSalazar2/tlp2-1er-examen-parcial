//Archivo de configuracion de la aplicacion

//Importando librerias:
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

//Funcion de conexion a la Base de Datos:
 const dbConnect = require('./db/dbConnection');

//Inicializaciones:
const app = express(); //Inicializacion de la libreria express
dbConnect(); //Se inicializa la conexion a la Base de Datos

//Configuracion del puerto:
const port = process.env.PORT || 4000;

//Middlewares:
app.use(cors()); //Habilita cors para  poder acceder de distintos dominios
app.use(morgan('dev')); //Muestra en la consola el estado de las solicitudes
app.use(express.json()); // Para que el servidor comprenda archivos con formato json

//Importacion de rutas:
app.use(require('./routes/home.routes'));
app.use(require('./routes/auth.routes'));
app.use(require('./routes/user.routes'));
app.use(require('./routes/task.routes'));

//Configuracion de puerto de escucha del servidor:
app.listen(port, ()=> console.log(`Servidor corriendo en http://localhost:${port}`));
