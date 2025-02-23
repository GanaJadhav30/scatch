const multer = require('multer');

// Set up multer memory storage
const storage = multer.memoryStorage();

// Create a multer instance with memory storage
const upload = multer({ storage: storage });


module.exports = upload ;