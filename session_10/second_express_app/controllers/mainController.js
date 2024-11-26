const data = require("../models/Player");

const getHome = (req, res) => {
    res.render("index.ejs");
}

const getPlayer = (req, res) => {
    const shortName = req.params.playerName;

    if(data[shortName]) {
        res.json(data[shortName]);
    } else {
        res.json(data["unknown"]);
    }
}

module.exports = {getHome, getPlayer}
// exports.getHome = getHome;
// exports.getPlayer = getPlayer;

// module.exports = {
//     getHome: (req, res) => {
//         res.render("index.ejs");
//     },
    
//     getPlayer: (req, res) => {
//         const shortName = req.params.playerName;
    
//         if(data[shortName]) {
//             res.json(data[shortName]);
//         } else {
//             res.json(data["unknown"]);
//         }
//     },
// }