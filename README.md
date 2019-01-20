## Node-React-Redis-Mongodb-CI
This application was built by Node, MongoDB, Redis and react. On the back-end, the restful-API was built by express,  which is a framework. On the front-end, it was built by React. In addition, I used Redis to cache the data in order to improve the performance of this app. All data is stored on MongoDB. All images are stored on AWS S3. For testing, I used jest to implement the unit test. Whenever I push code to GitHub, Travis CI will pull my code and build testing environment in order to run the test.

## Features
1. Login: 
Users can log in this application via google account. It implements OAuth 2.0. It uses passport and GoogleStrategy to manage auth. After login, the information fo users will be stored on MongoDB.

2. Cache:
I used Redis to cache data in order to improve the performance. Redis is a key-value pair memory server. All MongoDB query go through Redis before arriving in MongoDB. The redis check if it has a record corresponding to that query. If it does, it will send responses back to express. If it doesn't, it will forward the query to MongoDB and store the result for future need.

3. Image uploading:
All images are stored on AWS S3. Whenever a user wants to upload an image to the application, the client side will make a request to express server to get key and get pre-signed URL from AWS S3. After that, client-side makes a put request to upload an image to S3 directly without going through the express server. By doing so, it can prevent consuming too much server-side resource when uploading images.

4. Test
I used Jest to run unit test. In addition, I use Puppeteer, which is a Node library provides a high-level API to control Chrome or Chromium over the DevTools Protocol, to run headless testing. Whenever I push my code to Github, the Travis CI will pull my code and run test for it automatically.

## Architecture
```
├── README.md
├── client
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   └── manifest.json
│   └── src
│       ├── actions
│       │   ├── index.js
│       │   └── types.js
│       ├── components
│       │   ├── App.js
│       │   ├── Dashboard.js
│       │   ├── Header.js
│       │   ├── Landing.js
│       │   └── blogs
│       │       ├── BlogField.js
│       │       ├── BlogForm.js
│       │       ├── BlogFormReview.js
│       │       ├── BlogList.js
│       │       ├── BlogNew.js
│       │       ├── BlogShow.js
│       │       └── formFields.js
│       ├── index.js
│       └── reducers
│           ├── authReducer.js
│           ├── blogsReducer.js
│           └── index.js
├── config
│   ├── ci.js
│   ├── dev.js
│   ├── keys.js
│   └── prod.js
├── index.js
├── middlewares
│   ├── cleanCache.js
│   └── requireLogin.js
├── models
│   ├── Blog.js
│   └── User.js
├── package-lock.json
├── package.json
├── routes
│   ├── authRoutes.js
│   ├── blogRoutes.js
│   └── uploadRoutes.js
├── services
│   ├── cache.js
│   └── passport.js
└── tests
    ├── blogs.test.js
    ├── factories
    │   ├── sessionFactory.js
    │   └── userFactory.js
    ├── header.test.js
    ├── helpers
    │   └── page.js
    └── setup.js
```

### Start the redis locally
`brew services start redis`

### Stop the redis
`brew services stop redis`

### Data expire after 5s
`client.set('color', 'red', 'EX', 5)`

### Clean redis step by step
`node` =>
`const redisUrl = "redis://127.0.0.1:6379";` => 
`const client = redis.createClient(redisUrl);` => 
`client.flushall()` =>

