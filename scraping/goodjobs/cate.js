const osmosis = require('osmosis');
const connection = require('./connect');

const baseurl = 'http://m.goodjobs.cn';

const insertJobs = function (connection, title, titleLink, company, salary, address, date, feedback) {
  // connection.connect();
  connection.query(`INSERT INTO network (title, titleLink, company, salary, address, date, feedback) VALUES
      ('${title}', '${titleLink}', '${company}', '${salary}', '${address}', '${date}', '${feedback}')`, function (error, results, fields) {
    if (error) throw error;
    console.log('inserted=====');
  });
  // connection.end();
};
const spider = function (url) {
    console.log("Opening " + url);
    var nextUrl = '';
    osmosis
        .get(url + '/list.php?boxwpve=1043&boxftve=5115')
        .find('#id-joblist-minheight section')
        .set({
          title: '.job_name',
          titleLink: 'a@href',
          company: '.corp_name',
          salary: '.apply_name > i',
          address: '.apply_name > span',
          date: '.m_city_name',
          feedback: '.date_name',
        })
        .find('.MPropelPager span:nth-child(4)>a@href')
        .set('nextUrl')
        .data(function(data) {
            console.log('======');
            console.log(data);
            insertJobs(connection, data.title, baseurl + data.titleLink, data.company, data.salary, data.address, data.date, data.feedback);
            nextUrl = data.nextUrl;
        })
        .done(function() {
            if (nextUrl) {
                setTimeout(function(){
                    console.log('then');
                    spider('http://m.goodjobs.cn' + nextUrl);
                }, 500);
            }
            console.log('done');
            return;
        });
};

module.exports = spider;
