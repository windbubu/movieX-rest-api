let mongodbURL = "mongodb://localhost:27017/movieX";

// set mongodb url if snv is development
if (process.env.NODE_ENV === "development") {
  mongodbURL = "mongodb://localhost:27017/movieX";
}

// set mongodb url if env is production
if (process.env.NODE_ENV === "production") {
  mongodbURL = `mongodb+srv://Burak:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0-mxfko.mongodb.net/test?retryWrites=true&w=majority`;
}

module.exports = mongodbURL;
