require('dotenv').config()
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express();
const port = process.env.PORT;
const imageLabelDir = process.env.ImageLabelDir;

const imageExts = ['.png', '.PNG', '.jpg', '.JPEG']

labelReferencesImage = (file) => {
    return fs.readdirSync(imageLabelDir).filter(f => path.basename(file) === path.basename(f) && 
                                              imageExts.indexOf(path.extname(f)) != -1).length > 0;
}

app.get('/listImagesAndLabels', (req, res) => { 
    res.send(fs.readdirSync(imageLabelDir));
});

app.get('/getFile/:file', (req, res) => {
    res.sendFile(path.join(imageLabelDir, req.params.file));
});

app.post('/editLabel/:file', (req, res) => {
    if(path.extname(req.params.file) != '.txt' || !labelReferencesImage(req.params.file)) {
        res.status(400).send('Invalid input');
    } else {
        fs.writeFileSync(path.join(imageLabelDir, req.params.file));
        res.send('Label saved');
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));