const express = require('express');
const app = express();
const cors = require('cors');
const getip = require('./routes/getIP');

app.use(cors());
//configuraciones
app.set('port', process.env.PORT || 3001);
app.set('ip', process.env.IP || '10.60.63.122' );


//Middlewares
app.use(express.json());

//Routes
app.use(require('./routes/proyectos'));
app.use(require('./routes/actividades'));
app.use(require('./routes/colaboradores'));
app.use(require('./routes/getIP'));
console.log(getip);

app.listen(app.get('port'), app.get('ip'), () => {
    console.log('Server', app.get('port'));
});



