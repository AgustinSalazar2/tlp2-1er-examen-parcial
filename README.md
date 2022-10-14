## Tec. en Desarrollo de Software Multiplataforma.

### Para ejecutar el proyecto, se debe tener instalado __Node.js__ y __npm__.

### Para clonar el repositorio:
```bash
Abrir la terminal de comandos, ubicarse en el directorio donde desea clonar el repositorio,
ejecute el comando: git clone https://github.com/AgustinSalazar2/tlp2-1er-examen-parcial.git
```

### Para instalar las dependencias que necesita este proyecto, ejecutar el siguiente comando:
```bash
npm install
```

### En el archivo .env configurar las variables de entorno necesarias para las pruebas:
```bash
MONGO_DB_URI=  < 'URI de mongodb' >

SECRET =  < 'Palabra secreta para generar el token' >
```

### Para poder crear usuarios primero se debe crear un usuario con el rol de "admin", ya que es el unico que tiene permisos para crear nuevos usuarios.


### Para ejecutar el proyecto, ejecutar el siguiente comando:

```bash
npm run dev
```
