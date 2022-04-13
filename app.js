const pageRouter = require('./routes/pageJae')
const visitorsRouter = require('./routes/visitorsJae')
const express = require('express')
const flash = require('connect-flash')
const logger = require('morgan')
const path = require('path')
const sequelize = require('./models').sequelize

const app = express()
sequelize.sync()



app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set('port', process.env.PORT || '8001')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(flash())
app.use(logger('dev'))

app.use('/', pageRouter)
app.use('/visitorsjae', visitorsRouter)

app.use(function(req, res, next) {
    const err = new Error('not found')
    err.status = 404
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.end(`<p> ${err.message}, status: ${err.status} </p>`);
  });

app.listen(app.get('port'), () => {
    console.log('Listening on port ' + app.get('port'))
})

