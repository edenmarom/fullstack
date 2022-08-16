import mongoose from 'mongoose';

const connectionString = "mongodb+srv://fullstack:fullstack@cluster0.fsk9njw.mongodb.net/?retryWrites=true&w=majority";
const connectionOptions = {
    "useNewUrlParser": true,
    "useUnifiedTopology": true,
    "socketTimeoutMS": 0,
    "keepAlive": true
};

export let db;

export const initDb = () => {
    db = mongoose.connection;

    db.on('connected', () => {
        console.log("DB connected!");
    }),
        db.on('disconnected', () => {
            console.log('DB disconnected! Trying to reconnect...');
            mongoose.connect(connectionString, connectionOptions);
        });
    db.on('error', error => {
        console.log('DB connection error : ' + error);
    });

    mongoose.connect(connectionString, connectionOptions).
        catch(error => console.log('DB connection error : ' + error));
};






 