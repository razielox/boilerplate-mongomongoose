require('dotenv').config();

let mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
//console.log(process.env.MONGO_URI)
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
})

let Person = new mongoose.model('Person', personSchema)
/* Person.findById('6435c713c6d6bf3d447043fb').then(result => {
  result.favoriteFoods.push('test1123')
  result.save().then(res => console.log(res))
}) */

const createAndSavePerson = (done) => {
  let personDocument = new Person({name: 'ismael', age: 29, favoriteFoods: ['tacos']})
  //personDocument.save().then((doc) => console.log(doc)).catch((err) => console.error(err))7
  personDocument.save().then((result) => {done(null, result)}).catch((err) => {done(null, err)})
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople).then(result => done(null, result)).catch(err => done(null, err))
  //done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName})
  .then(result => done(null, result))
  .catch(err => done(null, err))
  //done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}).then(result => done(null, result)).catch(err => done(null, err))
  //done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId}).then(result => done(null, result)).catch(err => done(null, err))
  //done(null /*, data*/);
};

/* findPersonById('6435c713c6d6bf3d447043fb', (err, data) => {
  console.log(data)
  data.favoriteFoods.push('test')
  console.log(data)
}) */


const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (err, data) => {
    data.favoriteFoods.push(foodToAdd)
    data.save().then(result => done(null, result)).catch(err => done(null, err))

  })

  //done(null /*, data*/);
};
const person = Person.findOneAndUpdate({name: 'Gary'},{$set:{age:31}},{new:true}).then(result => result)
console.log(person)
//console.log(Person.findOneAndUpdate({name: 'Gary'},{$set:{age:30}},{new:true}))

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName},{$set:{age:ageToSet}},{new:true}).then(result => done(null, result)).catch(err => done(null, err))


  //done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId).then(result => done(null, result)).catch(err => done(null, err))
  //done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}).then(result => done(null, result)).catch(err => done(null, err))
  //done(null /*, data*/);
};
  //console.log(Person.find({favoriteFoods: 'burrito'}).sort({name: 1}).limit(2).select({name:1, favoriteFoods: 1}).exec(result => console.log(result)))

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({name:1, favoriteFoods: 1}).exec().then(result => done(null, result)).catch(err => done(null, err))
  //done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
