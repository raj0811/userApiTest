const mongoose=require('mongoose')
mongoose.connect(process.env.MONGO_DB)

const db = mongoose.connection

db.on('error',console.error.bind(console,`Error in Connecting to DATABASE`));

db.once('open',function(){
    console.log(`Connected to Database`);
})
