import mongoose, {Mongoose, Model} from 'mongoose';
import {getEnvironmentVariables} from "application-common-components";

const [
  DB_PROTOCOL,
  DB_USER,
  DB_PASS,
  DB_URL,
  DB_NAME,
  DB_PARAMS,
] = getEnvironmentVariables(
  'DB_PROTOCOL',
  'DB_USER',
  'DB_PASS',
  'DB_URL',
  'DB_NAME',
  'DB_PARAMS'
)

const DB_URI = `${DB_PROTOCOL}://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASS)}@${DB_URL}/${DB_NAME}${DB_PARAMS}`

export let databaseConnection:Mongoose;

export const isDatabaseConnected = () => databaseConnection !== undefined;

export const connectToDatabase = () => {
  return mongoose.connect(DB_URI, {
    dbName: DB_NAME,
    useUnifiedTopology: true,
    useNewUrlParser: true,

    // not sure this is needed every time we open a connection...
    useCreateIndex: true,

    // use MongoDB driver's instead of mongoose
    useFindAndModify: false,

    // we'll see when we need this
    // maxIdleTimeMS: 10000,
    // socketTimeoutMS: 10000,
    // connectTimeoutMS: 10000,
  }).then(db => {
    databaseConnection = db;
    return db;
  });
}

export const addModelToDatabase = (model:Model<any>) => model;