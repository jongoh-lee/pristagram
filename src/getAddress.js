const fetch = require("node-fetch");

const googleKey = process.env.GOOGLE_API_KEY;
let date;
fetch("https://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=ko&address="+ encodeURIComponent("서울시 용산구 이태원동") + `&key=${googleKey}`).then(e => e.json()).then(e => e == date);

console.log(date);


