// setting up required packages and routes
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
// initializing express app and setting up port
const app = express();
const port = process.env.PORT || 3001;
// setting up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// setting up routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// setting up listener
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});