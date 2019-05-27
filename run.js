const request = require('request');
const async = require('async');
const cheerio = require('cheerio');

const ironmans = [
  'https://www.com.tw/cross/check_008012_NO_1_108_0_3.html'
  // 'https://ithelp.ithome.com.tw/users/20107159/ironman/1325',
  // 'https://ithelp.ithome.com.tw/users/20107356/ironman/1315',
  // 'https://ithelp.ithome.com.tw/users/20107440/ironman/1355',
  // 'https://ithelp.ithome.com.tw/users/20107334/ironman/1335',
  // 'https://ithelp.ithome.com.tw/users/20107329/ironman/1286',
  // 'https://ithelp.ithome.com.tw/users/20091297/ironman/1330',
  // 'https://ithelp.ithome.com.tw/users/20075633/ironman/1375',
  // 'https://ithelp.ithome.com.tw/users/20107247/ironman/1312',
  // 'https://ithelp.ithome.com.tw/users/20107335/ironman/1337',
  // 'https://ithelp.ithome.com.tw/users/20106699/ironman/1283',
  // 'https://ithelp.ithome.com.tw/users/20107420/ironman/1381',
];

async.map( ironmans, getInfo, (err, results) => {
  console.log(results);
})

function getInfo(url, callback) {
  request(url, function(err, res, body) {
    let $ = cheerio.load(body);
    let link = url;
    // let name = $('.profile-header__name').text().trim();
    // let title = $('.qa-list__title--ironman').text().trim().replace('ç³»åˆ—', '');
    // let joinDays = $('qa--list__info--ironman span').eq(0).text().replace(/[^0-9]/g, '');
    // let posts = $('.qa--list__info--ironman span').eq(1).text().trim().replace(/[^0-9]/g, '');
    // let subscriber = $('.qa-list__info--ironman span').eq(2).text().replace(/[^0-9]/g, '');
    let postList = $('tbody').map((index, obj) => {
      return {
        alltr: $(obj).find('tr'),
        findPic: $(obj).find('tr>img'),
        title: $(obj).find('tr').eq(0).text().trim(),
    //     like: $(obj).find('.qa-condition__count').eq(0).text().trim(),
    //     comment: $(obj).find('qa-condition__count').eq(1).text().trim(),
    //     view: $(obj).find('.qa-condition__count').eq(2).text().trim(),
    //     date: $(obj).find('.qa-list__info-time').text().trim(),
    //     url: $(obj).find('.qa-list__title a').attr('href').trim(),
      }
    }).get()

    callback(null, {
      // name, 
      // title, 
      link, 
      // joinDays, 
      // posts, 
      // subscriber, 
      postList
    });
  })
}