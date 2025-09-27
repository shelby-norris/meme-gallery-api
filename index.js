import express, { request, response } from "express";
const app = express();
const port = 3000;

// array containing memes (in-memory data)
const memes = [
  {
    id: 1,
    title: "Distracted Boyfriend",
    url: "https://i.imgur.com/example1.jpg",
  },
  { id: 2, title: "Success Kid", url: "https://i.imgur.com/example2.jpg" },
];


// *****MIDDLEWARE*****
// middleware to parse json
app.use(express.json())

// middleware for logging
app.use((request, response, next) => {
  console.log(
    `${request.method} ${request.url} at ${new Date().toISOString()}`
  );
  next();
})

// *****ROUTES*****
// root route from express site
app.get("/", (request, response) => {
  response.send("This is my Meme Gallery API!");
});

// get memes
app.get("/memes", (request, response) => {
  response.json(memes);
});

// get meme by id
app.get("/memes/:id", (request, response) => {
  const {id} = request.params;
  const foundMeme = memes.find((meme) => meme.id ===parseInt(id));

  if (!foundMeme) {
    return response.status(404).json({error: "Meme not found"});
  }
  response.json(foundMeme);
})

// create meme 
app.post("/memes", (request, response) => {
  const { title, url } = request.body;

  if (!title || !url){
    return response.status(400).json({error: "title and url required"})
  }

  const newMeme = {id: memes.length + 1, title, url};
  memes.push(newMeme)

  console.log(memes)

  response.status(201).json(newMeme)
});

app.listen(port, () => {
  console.log(`Meme Gallery API listening on port http://localhost:${port}`);
});
