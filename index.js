require("dotenv").config();
const Person = require("./models/person.js");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
morgan.token("postData", function (req, res) {
  if (Object.keys(req.body).length > 0) {
    return String(JSON.stringify(req.body));
  } else {
    return "{NO post data}";
  }
});

app.use(morgan(":method :url :status :response-time ms - :postData"));

app.get("/api/persons", (req, res) => {
  Person.find({}).then(result => {
    res.json(result);
  });
});

app.get("/info", (req, res) => {
  let reqReceivedTimeStamp = Date();

  Person.find({}).then(result => {
    console.log("At /info. result: ", result);

    let info = `<p>Phonebook has info for ${result.length} people</p><p>${reqReceivedTimeStamp}</p>`;
    res.send(info);
  });

});


app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  Person.findById(id).then(person => {
    res.json(person);
  });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  Person.findByIdAndDelete(id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  const person = {
    number: req.body.number,
  };

  Person.findByIdAndUpdate(id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson);
    })
    .catch(error => next(error));
});

// const isExistingName = (name) => {
//   Person.find({}).then(result => {
//     let foundName = result.find(p => p.name === name);
//     console.log("foundName: ", foundName);
//     return foundName ? true : false;
//   });
// };

app.post("/api/persons", (req, res, next) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: "One or more properties is missing from the request"
    });
  }

  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  });

  person.save().then(savedPerson => {
    res.json(savedPerson);
  })
    .catch(error => next(error));
});


const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Phonebook is listening on ${PORT}`);
});
