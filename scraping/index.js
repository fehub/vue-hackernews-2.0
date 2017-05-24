const osmosis = require('osmosis')
var nextLink = ''

const spider = function (url) {
    console.log("Opening " + url)
    var nextUrl = ''
    osmosis
        .get(url)
        .find('h3 > a')
        .set('title')
        .find('.pagination > .pull-right')
        .set({'nextLink': '@href'})
        .data(function(data) {
            // do something with listing data
            console.log(data.title)
            nextUrl = data.nextLink
        })
        // .log(console.log)
        // .error(console.log)
        // .debug(console.log)
        .done(function() {
            if (nextUrl) {
                setTimeout(function(){
                    console.log('then');
                    spider(nextUrl)
                }, 1000);
            }
            return
        })
}

module.exports = spider
