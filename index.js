const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

//basic get request from the default browser page 
app.get('/', (req, res) => {
    res.send("Hello from NODE");
});
