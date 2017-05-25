const osmosis = require('osmosis');
const connection = require('./connect');

const insertArticles = function (connection, title, author, date, link, abstract, poster, tags) {
  // connection.connect();
  connection.query(`INSERT INTO articles (title, author, date, link, abstract, poster, tags) VALUES
      ('${title}', '${author}', '${date}', '${link}', '${abstract}', '${poster}', '${tags}')`, function (error, results, fields) {
    if (error) throw error;
    console.log('inserted=====');
  });
  // connection.end();
};

const spider = function (url) {
    console.log("Opening " + url);
    var nextUrl = '';
    osmosis
        .get(url)
        .find('.post-items .item')
        .set({
          title: 'h3 > a',
          link: 'h3 > a@href',
          author: '.author > a',
          date: '.post-meta > .date',
          abstract: '.summary > p',
          poster: '.image > img@src',
          tags: '.tags > a',
        })
        .find('.pagination > .pull-right')
        .set({'nextLink': '@href'})
        .data(function(data) {
            console.log(data.title);
            insertArticles(connection, data.title, data.author, data.date, data.link, '', data.poster, data.tags); 
            nextUrl = data.nextLink;
        })
        // .log(console.log)
        // .error(console.log)
        // .debug(console.log)
        .done(function() {
            if (nextUrl) {
                setTimeout(function(){
                    console.log('then');
                    spider(nextUrl);
                }, 1000);
            }
            return;
        });
};

module.exports = spider;
