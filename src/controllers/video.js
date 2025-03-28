const Video = require('../models/video');
//fileSystem of Node.js
const fs = require('fs');

exports.uploadVideo = (req, res, next) => {
    const videoObject = JSON.parse(req.body.media);
    delete videoObject.userId;
    const files = JSON.parse(JSON.stringify(req.files));
    const video = files.video[0].filename; 
    const poster = files.image[0].filename;
    //...req.body copy all req.body attribute to new video
    // const video = new Video({
    //     ...req.body
    // });
    const media = new Video({
        ...videoObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/poster/${poster}`,
        videoUrl: `${req.protocol}://${req.get('host')}/film/${video}`
    });
    
    media.save()
    .then(() => res.status(201).json({
        message: 'Media saved',
    }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteVideo = (req, res, next) => {
    Video.findOne({ _id: req.params.id })
    .then((video) => {
        if(video.userId != req.auth.userId) {
            res.status(401).json({ message: 'Not authorized' });
        } else {
            const postername = `medias/image/${ video.imageUrl.split('poster/')[1] }`;
            const videoname = `medias/video/${ video.videoUrl.split('film/')[1] }`;
            
            if(postername !== undefined && videoname !== undefined) {
                try {
                    fs.unlinkSync(postername, console.log('Poster deleted'));
                    fs.unlink(videoname, () => {
                    Video.deleteOne({ _id: req.params.id })
                    .then(() => {
                        res.status(200).json({ message: 'Object deleted !' });
                    })
                    .catch((error) => res.status(401).json({ error }));
                });
                } catch (error) {
                }
            } else {
                Video.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Object deleted !' }))
                .catch((error) => res.status(401).json({ error }));
            }
        }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.updateVideo = (req, res, next) => {
    const media = JSON.parse(req.body.media);
    const videoObject = (req.files.image && req.files.video) ? { 
        ...media, 
        imageUrl: `${req.protocol}://${req.get('host')}/poster/${req.files.image[0].filename}`,
        videoUrl: `${req.protocol}://${req.get('host')}/film/${req.files.video[0].filename}`
    } : { ...media }; 

    delete videoObject._userId;

    Video.findOne({ _id: req.params.id })
    .then((video) => {
        if(video.userId != req.auth.userId) {
            res.status(401).json({ message: 'Not authorized' });
        } else {
            Video.updateOne({ _id: req.params.id }, { ...videoObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Object updated !' }))
            .catch((error) => res.status(401).json({ error }));
        }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllVideo = (req, res, next) => {
    Video.find()
    .populate('category')
    .then(videos => res.status(200).json({ videos }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneVideo = (req, res, next) => {
    Video.findOne({ _id: req.params.id })
    .populate('category')
    .then(video => res.status(200).json(video))
    .catch((error) => res.status(404).json({ error }));
};