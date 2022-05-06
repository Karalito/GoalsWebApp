const express = require('express');
const dotnev = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 8010;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server is started on port ${port}`));
