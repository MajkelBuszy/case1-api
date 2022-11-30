require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const costRoutes = require('./routes/cost-routes');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PATCH, GET, DELETE');
    next();
});

app.use('/api/cost', costRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to database.')
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}.`);
    });
}).catch((error) => {
    console.error(error);
})
