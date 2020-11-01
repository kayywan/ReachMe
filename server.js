import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import path from 'path'
import router from 'express.Router()'
import posts from '../models/posts'

// app config
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
  // need to double check if syntax matches with what's already been created
app.get('/', (req, res) => res.status(200).send('hello world'));

// create a post function
app.post("./upload", (req, res) => {
  const body = req.body; 

  
  posts.create(body, (err, data) => {
    if (err) {
      res.status (400).send(err)
    } else {
      res.status(200).send(data);
    }
  });
});
// create a get function after data has been pushed into db
app.get ('/sync', (req, res) => {
  posts.find(err, data) => {
    if (err) {
      res.status (400).send(err)
    } else {
      res.status(200).send(data);
    }
  }
})

app.use(routes);

// Connect to the Mongo DB

const connection_url = 'mongodb+srv://admin:iFo0nsf7aKodl7uB@cluster0.w6bts.mongodb.net/reachmeDB?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
  userCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  
mongoose.connection.once("open", () => {
  console.log("DB Connected");
});

process.env.MONGODB_URI || "mongodb://localhost/users";


app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
