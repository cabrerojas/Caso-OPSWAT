# 
 Backend con nodejs y express para manejar lista de amenazas recopildadas de API externa.
 Dentro de lo solicitado estaba utilizar un Logger, concepto que no manejana ni habia utilizado, luego de investigar en internet encontre la libreria de `winston` la cual estudie he implemente en el proyecto.

## Intalaciones previas

Node version: v14.17.0
npm version: 6.14.13

instalar nodemon

https://www.npmjs.com/package/nodemon

`npm install -g nodemon`

Para las dependencias del proyecto solo se debe ejecutar: 

`npm install`

Librerias utilizadas: cors,dotenv,express,mongoose,request y winston.

## Variables de entorno

Crear archivo `.env` en la raiz del proyecto con los siguientes parametros.

`PORT=4001`

`DB_CNN=cadena de conexion de su bd en mongoDB`

## Para iniciar:

`npm start`

## Para iniciar en desarrollo:

`npm run dev`
`nodemon dev`


