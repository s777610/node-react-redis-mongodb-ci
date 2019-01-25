const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");
const keys = require("../config/keys");

const client = redis.createClient(keys.redisUrl);
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
  // this is query instance
  this.useCache = true;
  // this.hashKey is top level key
  this.hashKey = JSON.stringify(options.key || "");
  return this; // in order to use promise chain
};

// able to run some cache before executing query
mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  // this.getQuery(), like { _user: req.user.id }
  // this.mongooseCollection.name, lile blogs
  ///// create a new obj /////
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  // See if we have a value for 'key' in redis
  const cacheValue = await client.hget(this.hashKey, key);

  // if we do, return that
  if (cacheValue) {
    // from json to js obj, but normally exec will return mongoose model
    const document = JSON.parse(cacheValue);

    return Array.isArray(document)
      ? document.map(doc => new this.model(doc))
      : new this.model(document);
  }

  // otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, arguments);
  // set result into redis
  client.hset(this.hashKey, key, JSON.stringify(result));
  client.expire(this.hashKey, 10);
  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};
