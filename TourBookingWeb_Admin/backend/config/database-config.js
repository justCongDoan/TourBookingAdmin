const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const db_url = 'mongodb+srv://congdoan2002tb2:3mVy5toyX9jvwAJx@cluster0.uxlk5j5.mongodb.net/tours_booking?retryWrites=true&w=majority';

const connection = () => {
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>console.log('Database connected!'))
.catch(e=>console.log(e));

};

module.exports = connection; 