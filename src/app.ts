import express from 'express';
var app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Get from env variable if not just 5000
const port = process.env.PORT || 5000

// Status
app.get('/api/status', (req, res) => {
  res.json({status: "up"});
})

// Use publications router 
app.use('/api/anime', require('./routes/api/animeApi.ts'));

// Runs the server on the port
app.listen(port, () => {
  console.log(`Anime web-app listening on port ${port}`)
})

