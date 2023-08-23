require('dotenv').config();
import app  from "./app"
import "./database.js"

const PORT = process.env.PORT
app.listen(PORT)
console.log('servidor en Puerto', PORT)
