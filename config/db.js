const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://rpbarmaiya:pWVsgzcNnzK5lCLa@cluster0.bxawwhy.mongodb.net/?retryWrites=true&w=majority')

const db = mongoose.connection

db.on('error',console.error.bind(console,`Error in Connecting to DATABASE`));

db.once('open',function(){
    console.log(`Connected to Database`);
})
