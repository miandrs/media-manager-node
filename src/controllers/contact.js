const Contact = require('../models/contact');

exports.createContact = (req, res, next) => {
    const contactObj = JSON.parse(JSON.stringify(req.body.contact));
    delete contactObj._id;
    const contact = new Contact({
        ...contactObj
    });
    
    contact.save()
    .then(() => res.status(201).json({ message: 'Message sent' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllContact = (req, res, next) => {
    Contact.find()
    .then((contact) => res.status(200).json({ contact }))
    .catch((error) => res.status(404).json({ error }));
};