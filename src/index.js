require('dotenv').config();
import app  from "./app"
import "./database.js"

const PORT = 3000
app.listen(PORT)
console.log('servidor en Puerto', PORT)
