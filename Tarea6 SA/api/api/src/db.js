const MongoClient = require('mongodb').MongoClient

const MONGO_DB_NAME = process.env.MONGO_DB_NAME
const MONGO_PORT = process.env.PORT
const MONGO_URI = process.env.MONGODB_URI
const MONGO_OPTIONS = {
  poolSize: 5,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

class Connection {
  constructor (uri, options, name) {
    this.db = null
    this.uri = uri
    this.options = options
    this.name = name
  }

  connect () {
    if (this.db) {
      return Promise.resolve(this.db)
    } else {
      return MongoClient.connect(this.uri, this.options).then(client => {
        // console.log(client.db(this.name))
        this.db = client.db(this.name)
        return this.db
      })
    }
  }
}

module.exports = new Connection(MONGO_URI, MONGO_OPTIONS, MONGO_DB_NAME)
