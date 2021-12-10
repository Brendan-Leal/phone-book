const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;
console.log("connecting to", url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "Name must be greater than 3 characters in length"],
    unique: ["{VALUE} is already in the database"],
  },
  number: {
    type: String,
    minlength: [10, "Phone number must have 10 digits"]
  },
});
personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Person", personSchema);



// const name = process.argv[3];
// const number = process.argv[4];
// console.log("name: ", name);
// console.log("number", number);

// if (name && number) {
//   console.log("adding person to DB...");
//   let newPerson = new Person({
//     name,
//     number,
//   });

//   newPerson.save().then(result => {
//     console.log(result);
//     mongoose.connection.close();
//   });
// } else {
//   Person.find({}).then(result => {
//     result.forEach(person => console.log(person));
//     mongoose.connection.close();
//   });
// }

