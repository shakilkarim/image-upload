const express =require("express");
const router = express.Router();
const multer = require('multer');

router.post("/image-upload",async(req,res)=>{
try{
    const storage=multer.diskStorage({
        destination: (req,file,callBack)=> {
            callBack(null,'public/media');
        },
        filename: (req,file,callBack)=> {
            callBack(null,file.originalname)
        }    
        
    });
// video/mp4
    const maxSize = 5 * 1024 * 1024; // for 5MB  
    const upload=multer({
        storage:storage,
        fileFilter:(req,file,cb) => {
            if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp'){
                cb(null,true)
            }else{
                cb(null,false)
                return cb(new Error("Only jpg, png, jpeg and webp format is allowed"));
            }
        },
        limits:{fieldSize : maxSize},

    }).array('photos', 12)

    upload(req,res, (error) => {
        console.log('body-test', req.body);
        console.log('file-test', req.files);
        res.send("file upload success");

        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            res.status(400).json({
                status:'fail',
                message:error.message
            })
          } else if (err) {
            // An unknown error occurred when uploading.
            res.status(400).json({
                status:'fail',
                message:error.message
            })
          }
      
    })


    
 
}catch(err){
    console.log(err)
}
})



module.exports=router;