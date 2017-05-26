const osmosis = require('osmosis');
// const connection = require('./connect');

// const insertArticles = function (connection, title, author, date, link, abstract, poster, tags) {
//   // connection.connect();
//   connection.query(`INSERT INTO articles (title, author, date, link, abstract, poster, tags) VALUES
//       ('${title}', '${author}', '${date}', '${link}', '${abstract}', '${poster}', '${tags}')`, function (error, results, fields) {
//     if (error) throw error;
//     console.log('inserted=====');
//   });
//   // connection.end();
// };

const spider = function (url) {
    console.log("Opening " + url);
    // var nextUrl = '';
    osmosis
        .get(url)
        .find('.zpcon li')
        .set({
          company: 'a.comtxt',
          companyLink: 'a.comtxt@href',
          position: 'a.blue',
          positionLink: 'a.blue@href',
        })
        // .find('.pagination > .pull-right')
        // .set({'nextLink': '@href'})
        .data(function(data) {
            console.log('======');
            console.log(data);
            // nextUrl = data.nextLink;
        })
        // .log(console.log)
        // .error(console.log)
        // .debug(console.log)
        .done(function() {
            // if (nextUrl) {
            //     setTimeout(function(){
            //         console.log('then');
            //         spider(nextUrl);
            //     }, 1000);
            // }
            console.log('done');
            return;
        });
};

module.exports = spider;
