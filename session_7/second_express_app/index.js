const express = require("express");
const path = require("path");
const app = express();

const PORT = 8000

const data = {
    "lionel messi": {
        "fullName": "Lionel Andrés Messi",
        "age": 37,
        "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/220px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"
    },
    "cristiano ronaldo": {
        "fullName": "Cristiano Ronaldo dos Santos Aveiro",
        "age": 39,
        "imgUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/220px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
    }, 
    "unknown": {
        "fullName": "unknown",
        "age": "unknown",
        "imgUrl": "unknown"
    }
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
})

app.get("/api/:playerName", (req, res) => {
    const shortName = req.params.playerName;

    console.log(shortName);

    if(data[shortName]) {
        res.json(data[shortName]);
    } else {
        res.json(data["unknown"]);
    }

})



app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})