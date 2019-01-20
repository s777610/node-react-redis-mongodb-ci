# Node-React-Redis-Mongodb-CI
This application was built by Node, MongoDB, Redis and react. On the back-end, the restful-API was built by express,  which is a  framework. On the front-end, it was built by React. In addition, I used Redis to cache the data in order to improve the performance of this app. All data is stored on MongoDB. For testing, I used jest to implement the unit test. Whenever I push code to GitHub, Travis CI will pull my code and build testing environment in order to run the test.

### Start the redis locally
`brew services start redis`

### Stop the redis
`brew services stop redis`

### Data expire after 5s
`client.set('color', 'red', 'EX', 5)`

### Clean redis
`node` =>
`const redisUrl = "redis://127.0.0.1:6379";` => 
`const client = redis.createClient(redisUrl);` => 
`client.flushall()` =>

### AWS-S3
## Install AWS SDK