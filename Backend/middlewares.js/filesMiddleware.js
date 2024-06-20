const multer = require('multer')

    
        const storage = multer.diskStorage({
            destination: function(req, file, cb){
                cb(null, 'uploads/')
            },
            filename: function(req, file, cb){
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                cb(null, file.fieldname + '-' + uniqueSuffix)
            }
            
        });
        
        const fileFilter = (req, file, cb) => {
            const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (allowedFileTypes.includes(file.mimetype)){
                
                cb(null, true)
        
            } else {
                console.log("multer")
                cb(null, false)
            }
        }
        
        const upload = multer({storage: storage, fileFilter: fileFilter});
       
        


module.exports = upload



