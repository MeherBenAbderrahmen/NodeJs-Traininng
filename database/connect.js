const mongoose = require('mongoose')
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
mongoose.connect('mongodb://localhost:27017/challenge_DataBase', options).then(connect =>{
  console.log("=> connect successfully");
}).catch(err =>{
    console.log(err);
    console.log("failed");
});
