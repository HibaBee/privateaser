'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];





//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];






//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];

function step1 ()
{
console.log("Step 1 : ");
var booking_price;
for(var i = 0; i<events.length; i++)
{
booking_price = bars[i].pricePerHour * events[i].time + bars[i].pricePerPerson * events[i].persons;
events[i].price = booking_price;
console.log(booking_price);
}
}

function step2 ()
{
console.log("Step 2 : ");
var nb_pers;
for(var i = 0; i< events.length;i++)
{
nb_pers = events[i].persons;

if(nb_pers>=10 && nb_pers < 20)
{
events[i].price = events[i].price*(1-10/100);
}
if(nb_pers>=20 && nb_pers < 60)
{
events[i].price = events[i].price*(1-30/100);
}
if(nb_pers>60)
{
events[i].price = events[i].price*(1-50/100);
}
//console.log(events[i].price);
}
}

function step3 ()
{
var commission;
var insurance;
var treasury;
var privateaser;
console.log("Step 3 :");
for (var i = 0; i< events.length; i++)
{
commission = (events[i].price)*30/100;
events[i].commission = commission;
insurance = commission/2;
events[i].insurance = insurance;
treasury = events[i].persons;
events[i].treasury = treasury;
privateaser = commission - insurance - treasury;
events[i].privateaser = privateaser;
//console.log(commission);
//console.log(insurance);
console.log(events[i].treasury);
console.log(events[i].privateaser);
}
}

function step4()
{
var montant_deductible =0;
console.log("Step 4 :");
for (var i = 0; i< events.length; i++)
{
if (events[i].options.deductibleReduction == true)
{
montant_deductible = events[i].persons;
events[i].price = events[i].price + montant_deductible;
events[i].privateaser = events[i].privateaser + montant_deductible;
}
console.log(montant_deductible);
}
}

function step5()
{
for (var i = 0; i< actors.length; i++)
{
for(var j = 0; j< events.length; j++)
{
for(var k = 0; k<3; k++)// le temps d'atteindre payment length
{
if(actors[i].eventId == events[j].id && actors[i].payment[k].who == "booker" && actors[i].payment[k].type == "debit")
{
actors[i].payment[k].amount = events[j].price;
}

if(actors[i].eventId == events[j].id && actors[i].payment[k].who == "bar" && actors[i].payment[k].type == "credit")
{
actors[i].payment[k].amount = events[j].price -events[j].commission;
}

if(actors[i].eventId == events[j].id && actors[i].payment[k].who == "insurance" && actors[i].payment[k].type == "credit")
{
actors[i].payment[k].amount = events[j].insurance;
}

if(actors[i].eventId == events[j].id && actors[i].payment[k].who == "treasury" && actors[i].payment[k].type == "credit")
{
actors[i].payment[k].amount = events[j].treasury;
console.log("dans treasury");
}

if(actors[i].eventId == events[j].id && actors[i].payment[k].who == "privateaser" && actors[i].payment[k].type == "credit")
{
actors[i].payment[k].amount = events[j].privateaser;
console.log("dans privateaser");
}

}

}

}
}

step1();
step2();
step3();
step4();
step5();
console.log(bars);
console.log(events);
console.log(actors);
