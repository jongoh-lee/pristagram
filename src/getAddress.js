const fetch = require("node-fetch");

let date;
fetch("https://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=ko&address="+ encodeURIComponent("서울시 용산구 이태원동") + "&key=AIzaSyB77l5gKZERH5nDSvT5PboXLkl_uJbVcUQ").then(e => e.json()).then(e => e == date);

console.log(date);


