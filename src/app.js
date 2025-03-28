const express = require('express');

const cors = require('cors');

const app = express();

app.use(express.json());

//cors config
const corsOptions = {
    origin: 'http://localhost:4200',
    optionSuccessStatus: 200,
};

const mongoose = require('mongoose');

//MongoDB connection 
const mongoURI = 'mongodb://localhost:27017/media';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB database connected'))
  .catch(err => console.error(err));

const videoRoutes = require('./routes/video');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const contactRoutes = require('./routes/contact');
const auth = require('./middleware/auth');

const apiMedia = '/api/media';
const apiAuth = '/api/auth';
const apiCategory = '/api/category';
const apiContact = '/api/contact';

const path = require('path');

//middleware
app.use(cors(corsOptions));

app.use('/poster', express.static(path.join(__dirname, '../medias/image')));
app.use('/film', express.static(path.join(__dirname, '../medias/video')));

app.use(apiMedia, videoRoutes);
app.use(apiAuth, userRoutes);
app.use(apiCategory, categoryRoutes);
app.use(apiContact, contactRoutes);

module.exports = app;