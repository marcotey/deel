const express = require('express');
const bodyParser = require('body-parser');
const {getProfile} = require('./middleware/getProfile');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const contractRoute = require('./routes/contractsRoute')
const jobsRoute = require('./routes/jobRoutes')
const adminRoutes = require('./routes/adminRoutes')
const balanceRoutes = require('./routes/balanceRoutes')
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/contracts', getProfile, contractRoute);
app.use('/contracts', getProfile, contractRoute);
app.use('/jobs', getProfile, jobsRoute);
app.use('/admin', adminRoutes);
app.use('/balances', getProfile, balanceRoutes);



module.exports = app;
