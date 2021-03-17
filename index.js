const express = require('express');
// const router = require('./Routers');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
// const controller = require('./controllers');

const app = express();
const port = process.env.PORT || 5000;

app.use(
  morgan(':method :url :stauts :res[content-length] - :response-times ms')
);

app.use(
  session({
    secret: '@A!B$',
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: '*',
      path: '/*',
      maxAge: 24 * 3600 * 1000,
      sameSite: 'none',
      httpOnly: true,
      secure: true
    }
  })
)
app.use(cors());
app.use(express.json());


app.use('/', router);
app.use('/user',router);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Connect Successfully'});
});

app.listen(port, () => {
  console.log('Server on port ' + port);
});