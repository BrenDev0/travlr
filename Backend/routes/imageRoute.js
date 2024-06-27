const router = require('express').Router()
const path = require('path')
const fs = require('fs')

const getImage =  (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', fileName);
  
    try {
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        res.status(404).send('File not found.');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      res.status(500).send('Internal server error.');
    }
  };

router.get('/get-image/:filename', getImage )

module.exports = router