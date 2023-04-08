// create simple webserver in nodejs

const express = require('express') // load express module
const app = express() // instantiate
const port = 3000 // specify port number

// set up route for root
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// listen on port `port`
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
