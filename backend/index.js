const express = require('express');
const app = express();
const imgModel = require('./models/imgModel');
const statModel = require('./models/statModel');
const mongoose = require('mongoose'); 
const port = 5500;
const multer = require('multer');

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });


app.get('/poststats', (req, res) => {
    const stats = new statModel({
        temperature: randomNumber(27, 38),
        humidity: randomNumber(65, 80),
        sag: randomNumber(1, 5)
    });
    stats.save().then((doc) => {
        return doc
    }).catch(err => {
        return err
    });
    return "OK"
});

app.get('/getstats', (req, res) => {
    const data = statModel.find();
    return data;
});

app.post('/imgupload', upload.single('image'), (req, res, next) => {
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});

app.get('/getimage', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});




mongo_url = "mongodb+srv://ananthu:ananthu123@cluster0.pzvdb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongo_url).then(() => console.log('Mongo connected!')).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






