import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
  
app.get('/', (req, res) => {
  console.log('get response');
  res.send('test');
});
  
app.listen('8000', () => {
  console.log('server is starting!');
});
