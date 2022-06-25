import express from 'express';
var expressApp = express();

// Body parser
expressApp.use(express.json());
expressApp.use(express.urlencoded({extended: false}));

// Get from env variable if not just 5000
const port = process.env.PORT || 5000

// Status
expressApp.get('/api/status', (req, res) => {
  res.json({status: "up"});
})

// Use animix router 
expressApp.use('/api/animix', require('./routes/api/animixApi.ts'));

// Use publications router 
expressApp.use('/api/db', require('./routes/api/firebaseApi.ts'));

// Runs the server on the port
expressApp.listen(port, () => {
  console.log(`Anime web-app listening on port ${port}`)
})



