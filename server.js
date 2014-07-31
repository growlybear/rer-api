var express = require('express');
var restful = require('node-restful');
var mongoose = restful.mongoose;    // Extend mongo with the restful

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/courtinfo');

var Case = app.resource = restful.model('case', mongoose.Schema({

    caseNumber: { type: String },   // "caseNumber": "S CI 2014 03644"
    actionCode: { type: String },   // "actionCode": "COM Mortgages & Other Securities",
    filedDate:  { type: Date   },   // "filedDate": "17-Jul-2014",
    locality:   { type: String },   // "locality": "Supreme Court 436 Lonsdale St",
    caseTitle:  { type: String },   // "caseTitle": "National Australia Bank Limited (ACN 004 044 937) v. Tess Aust. Pty Ltd (ABN 12 004 044 937) & Ors.",
    caseStatus: { type: String }    // "caseStatus": "Open",

})).methods(['get', 'put', 'post', 'delete']);

Case.register(app, '/api/cases');


app.listen(port);

module.exports = app;
