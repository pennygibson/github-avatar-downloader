var request = require('request');
var fs = require('fs');



console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "pennygibson";
var GITHUB_TOKEN = "2cb5712cd7e2523d398b7cf0174f86abd8ca2a7d";

function getRepoContributors(repoOwner, repoName, cb){
  var requestURL = 'https://'+GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);

  var options = {
    url: requestURL,
    headers: {"User-Agent":"GitHub Avatar Downloader - Student Project"}
  }

  request(options, function (error, response, body){

   var data = JSON.parse(body);

   cb(error, data)


 });
}

getRepoContributors(process.argv[2], process.argv[3], function(error, data) {
  if(!process.argv[3]){
    console.log('Invalid Input')
  } else {

  for(var i = 0; i < data.length; i++){
    downloadImageByURL(data[i].avatar_url, './avatars/' + data[i].login + '.jpg');

  }
}
});

function downloadImageByURL(url, filePath){

  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}














