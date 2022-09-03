const express = require('express');
const bodyparser = require('body-parser')
const path = require('path');
const cors = require('cors');
const exphbs = require('express-handlebars');
const env = require('dotenv').config();
const app = express();

// body parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());

// register route
require("./routers")(app);

// view engine setup
app.engine('handlebars', exphbs.engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ " }));
app.set('view engine', 'handlebars');


//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`app is live at ${PORT}`);
})