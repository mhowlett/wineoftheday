import express from 'express';
import fs from 'fs';

var lines = [];
function generateContent() {
  let result = "";
  let n = Math.round(Math.random()*1) + 2;
  for (let i=0; i<n; ++i) {
    var l = Math.round(Math.random()*lines.length)
    result += lines[l] + " ";
  }
  return result;
}

var varieties = [
  'Semillon',
  'Sauvignon Blanc',
  'Chenin Blanc',
  'Riesling',
  'Pinot Noir',
  'Pinot Meunier',
  'Merlot',
  'Pinot gris',
  'Pinot Grigio',
  'Shiraz'
]
function generateVariety() {
  var l = Math.round(Math.random()*(varieties.length-1))
  return varieties[l];
}
function replaceVarieties(text) {
  while (text.indexOf("VARIETY") != -1) {
    text = text.replace("VARIETY", generateVariety())
  }
  return text;
}

var vinyard = [
  'La Boatina',
  'Adelsheim',
  'Dorrien Estate',
  'Highbank',
  'Black Rock',
  'Borodell on the Mount',
  'Crittenden Estate',
  'Ashton Hills',
  'Fermoy Estate',
  'Montee de Saint-Romble',
  'Monte Park Wines',
  'Rockfield Estate',
  "Montgomery's Hill"
];
function generateVinyard() {
  var l = Math.round(Math.random()*(vinyard.length-1))
  return vinyard[l];
}
function replaceVinyards(text) {
  while (text.indexOf("VINYARD") != -1) {
    text = text.replace("VINYARD", generateVinyard())
  }
  return text;
}

var winemaker = [
  'Roland Lavantureux',
  'Laurent Pinson'
];
function generateWinemaker() {
  var l = Math.round(Math.random()*(winemaker.length-1))
  return winemaker[l];
}
function replaceWinemakers(text) {
  while (text.indexOf("WINEMAKER") != -1) {
    text = text.replace("WINEMAKER", generateWinemaker())
  }
  return text;
}

var winename = [
  'Moet Imperial'
];
function generateWinename() {
  var l = Math.round(Math.random()*(winename.length-1))
  return winename[l];
}
function replaceWinenames(text) {
  while (text.indexOf("WINENAME") != -1) {
    text = text.replace("WINENAME", generateWinename())
  }
  return text;
}

var areas = [
'Liguria',
'Soave',
'Veneto',
'Santa Margherita',
'Galicia',
'Chablis Vau de Vey',
'Beaune',
'Lignorelles',
'Graves',
'Pessac-Leognan',
'Loir Valley',
'Vouvray',
'the Vallee Coquette',
'Maimbray',
'Bue',
'Upper Loire',
'the Coteaux du Giennois',
'Chavignol',
'Crezancy-en-Sancerre',
'Vaillons',
'Fourchaume',
'Vaulorent',
'Montmains',
'Forets',
'Maligny',
'Dijon'  
];
function generateArea() {
  var l = Math.round(Math.random()*(areas.length-1))
  return areas[l];
}
function replaceAreas(text) {
  while (text.indexOf("AREA") != -1) {
    text = text.replace("AREA", generateArea())
  }
  return text;
}

var regions = [
  'Bordeaux',
  'Chablis',
  'Margaret River'
];
function generateRegion() {
  var l = Math.round(Math.random()*(regions.length-1))
  return regions[l];
}
function replaceRegions(text) {
  while (text.indexOf("REGION") != -1) {
    text = text.replace("REGION", generateRegion())
  }
  return text;
}

var app = express();
app.set('view engine', 'jade');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index.jade', {
    variety: generateVariety(),
    vinyard: generateVinyard(),
    price: Math.round(Math.random() * 100) + ".99",
    content: replaceVarieties(replaceVinyards(replaceWinemakers(replaceWinenames(replaceAreas(replaceRegions(generateContent()))))))
  });
});

app.get('/buy-now', function (req, res) {
  res.render('buynow.jade');
});

app.use('/static', express.static(__dirname + '/public'));

fs.readFile('output.txt', function (err, data) {
  if (err) {
     return console.error(err);
  }
  lines = data.toString().split('\n');
  console.log("# sentences: " + lines.length);
  
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  })
});
