/*jshint node:true*/
module.exports = function (app) {
    var express = require('express');
    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    var upload = multer({
        limits: {
            files: 1,
            fileSize: 500000,
            fields: 0
        },
        storage: storage
    });

    var projectRouter = express.Router();

    projectRouter.post('/', upload.single('projectData'), function (req, res) {
        res.send(req.file.filename);
    });

    projectRouter.get('/:id', function (req, res) {
        res.sendFile(req.params.id, {
            root: __dirname + '/../../uploads/'
        });
    });

    projectRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    app.use('/api/project', projectRouter);
};