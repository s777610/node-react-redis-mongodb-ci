# AdvancedNodeStarter

### Start the redis locally
`brew services start redis`

### Stop the redis
`brew services stop redis`

### data expire after 5s
`client.set('color', 'red', 'EX', 5)`

### Clean redis
`node` 
`const redisUrl = "redis://127.0.0.1:6379";`
`const client = redis.createClient(redisUrl);`
`client.flushall()`