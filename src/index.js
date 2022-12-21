const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || '192.168.70.226' );


//Middlewares
app.use(express.json());

//Routes
app.use(require('./routes/proyectos'));
app.use(require('./routes/actividades'));
app.use(require('./routes/colaboradores'));

app.listen(app.get('port'), app.get('ip'), () => {
    console.log('Server', app.get('port'));
});



