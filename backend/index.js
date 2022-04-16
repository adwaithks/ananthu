const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');
const fs = require('fs');
const imgModel = require('./models/imgModel');
const morgan = require('morgan');
const statModel = require('./models/statModel');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const port = 5500;
const multer = require('multer');
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, 'latest')
    }
});
  
var upload = multer({ storage: storage });


app.get('/poststats', (req, res) => {
    const stats = new statModel({
        temperature: randomNumber(27, 38),
        humidity: randomNumber(65, 80),
        sag: randomNumber(1, 5)
    });
    console.log(stats);
    stats.save().then((doc) => {
        return res.json(doc);
    }).catch(err => {
        return err;
    });
    
});

app.get('/getstats', async (req, res) => {
    const data = await statModel.findOne()
    return res.json(data);
});

app.post('/imgupload', upload.single('image'), (req, res, next) => {
    console.log(req.file)
    var obj = {
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/latest')),
            contentType: 'image/png'
        }
    }
    console.log(obj)
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
    return res.json({status: 'ok'})
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




mongo_url = "mongodb+srv://ananthu:ananthu@cluster0.pzvdb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongo_url).then(() => console.log('Mongo connected!')).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






