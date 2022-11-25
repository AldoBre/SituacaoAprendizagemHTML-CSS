const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", express.static("."))

app.listen(3000, () => {
  console.log(`O servidor está rodando na URL: http://localhost:3000`)
})
