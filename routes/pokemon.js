var express = require('express');
var router = express.Router();
var response = require('../response.js')

// GET ALL POKEMONS
router.get('/', function(req, res, next) {
  const pokemons = req.app.get("pokemons");
  res.send(pokemons);
});

// GET POKEMON BY ID
router.get('/pokemon/:id', function(req, res, next) {
  const pokemons = req.app.get("pokemons");
  let id = req.params.id;
  if(id < 0 || id > pokemons.length-1) {
    let messageError = "ID must be between 0 and " + (pokemons.length-1);
    console.log(messageError);
    res.status(404).send(messageError)
  }
  res.send(pokemons[id]);
});

// GET POKEMON BY NAME V2 (MULTILANG)
router.get('/pokemon', function(req, res, next) {
  const pokemons = req.app.get("pokemons");
  var s = req.query.search;
  var lang = "fr"
  lang = req.query.lang;
  if (s == "") {
    res.status(400).send("No string to search.")
  }
  var resultats = [];
  if (lang == "fr") {
    pokemons.forEach( (p) => {
      if (p.Nom.toLowerCase().includes(s)) {
        resultats.push(p);
      }
    });
  } else if (lang == "en") {
    pokemons.forEach( (p) => {
      if (p.Nom_anglais.toLowerCase().includes(s)) {
        resultats.push(p);
      }
    });
  }
  if (resultats.length > 0) {
    res.status(200).send(resultats)
  } else {
    res.status(404).send('No matches');
  }
});

// GET POKEMON BY TYPE
router.get('/pokemon/type/:type' , function(req, res, next) {
  const pokemons = req.app.get("pokemons");
  var type = req.params.type.toLowerCase();
  var resultats = []
  pokemons.forEach( (p) => {
    if(p.Type == type || p.Type_2 == type) {
      resultats.push(p);
    }
  });
  if (resultats.length > 0) {
    res.status(200).send(resultats);
  } else {
    res.status(404).send('No matches');
  }
});

module.exports = router;
