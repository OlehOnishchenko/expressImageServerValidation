import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import express from 'express';

const app = express()
const port = 3000;
const favicon = readFileSync('img.jpeg');
const imagePath = 'img.jpeg';

function validateDimention(value, maxValue = 1000) {
  if (isNaN(value) ||  value <= 0 || value > maxValue)    {
    throw new Error('Invalid width || height');
  }
}

app.get('/img/:width/:height', (req, res) => {
  try {
  const width = parseInt(req.params.width, 10);
  const height = parseInt(req.params.height, 10);


  console.log(`Received request for image with width: ${width} and height: ${height}`);

  validateDimention(width);
  validateDimention(height);

  res.setHeader('Content-Type', 'image/jpeg');

  sharp(imagePath)
    .resize(width, height, {
      fit: "cover",
      position: "center"
    })
    .jpeg({ quality: 80 })
    .pipe(res);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

app.get('/', (req, res) => {
  res.redirect('/img/100/100');

});

// starts a simple http server locally on port 127.0.0.1:3000

app.listen(port, () => {
  console.log(`Server is running on port 127.0.0.1:${port}`)
});
