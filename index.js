const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
morgan.token("postData", function (req, res) {
  if (Object.keys(req.body).length > 0) {
    return String(JSON.stringify(req.body));
  } else {
    return "{NO post data}";
  }
});

app.use(morgan(":method :url :status :response-time ms - :postData"));

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  let numberOfPeople = persons.length;
  let reqReceivedTimeStamp = Date();

  let info = `<p>Phonebook has info for ${numberOfPeople} people</p><p>${reqReceivedTimeStamp}</p>`;
  res.send(info);
});


app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  let person = persons.find(p => String(p.id) === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  persons = persons.filter(p => String(p.id) !== id);

  res.status(204).end();
});

const generateId = () => {
  let maxId = 0;
  if (persons.length > 0) {
    maxId = Math.max(...persons.map(n => n.id));
  } else {
    maxId = 0;
  }
  return maxId + 1;
};

const isExistingName = (name) => {
  let foundName = persons.find(p => p.name === name);
  return foundName ? true : false;
};

app.post("/api/persons", (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: "One or more properties is missing from the request"
    });
  } else if (isExistingName(req.body.name)) {
    return res.status(400).json({
      error: "name already exists"
    });

  }

  const person = {
    id: generateId(),
    name: req.body.name,
    number: req.body.number,
  };

  persons = persons.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Phonebook is listening on ${PORT}`);
});
