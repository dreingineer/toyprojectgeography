const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const Region = require('./models').Region;
const Province = require('./models').Province;
const Municipality = require('./models').Municipality;

// manual
// Region.create({
//     code: 14,
//     name: "Ilocos"
// }).then( region => {
//     region.createProvince({
//         code: 136,
//         name: "Ilocos Norte"
//     }).then( province => {
//         province.createMunicipality({
//             code:2900,
//             name:"Laoag"
//         }).then(() => console.log('Added Region, Province at Municipality'));
//     });
// });


// looking for all the data inside the database

// Region.findAll({
//     include: [Province]
// }).then( regions => {
//     console.log(regions);
// });


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
// app.get('/',(req, res) => {
//     Region.findAll({
//         include:[Province]
//     }).then( regions =>{
//         res.send({regions: regions});
//     });
// });

app.get('/', (req,res) => {
    Region.findAll({
        include:[{
            model: Province,
            include: [Municipality]
        }]
    }).then( municipalities => {
        res.send({ Regions: municipalities});
    });
});

// app.get('/', (req,res)=> {
//     Region.findAll({
//         include:[{
//             model: Region,
//             include: [{
//                 model: Province,
//                 include:[Municipality]
//             }]
//         }]
//     }).then(municipalities => {
//         res.send({regions: municipalities});
//     });
// });


// Post a region
app.post('/api/regions', (req, res) => {
    Region.create({
        code:req.body.code,
        name:req.body.name
    }).then( regions => {
        res.send(regions);
    });
});

// Post a province
app.post('/api/province/:region_id' ,(req, res) => {
    // Province.create({...req.body, regionId: req.params.region_id})
    Province.create({
        code:req.body.code,
        name:req.body.name,
        regionId: req.params.region_id
    })
    .then(provinces => {
        res.send(provinces);
    });
});

// Post a municipality
app.post('/api/municipalities/:province_id',(req, res) => {
    Municipality.create({
      code:req.body.code,
      name:req.body.name,
      provinceId: req.params.province_id 
    }).then( municipalities => {
        res.send(municipalities);
    });
});















app.listen(3000, () => console.log('Listening to port 3000.'));