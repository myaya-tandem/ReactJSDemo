var Fetch = require('whatwg-fetch');
var rootUrl = 'https://api.imgur.com/3/'
var apiKey = '3a4808136bda5ea';
var apiSecret = 'f9515237285415f84f7544dbb4ec868db344df2a';

module.exports = {
    get: function(url   ) {
        return fetch(rootUrl + url, {
            headers: {
                'Authorization': 'Client-ID ' + apiKey
            }
        })
        .then(function(response) {
            //console.log(response);
            return response.json();
        });
        //.then(function(data) {
        //    console.log(data);
        //});
    }
};