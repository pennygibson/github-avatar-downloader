var request = require('request');
var fs = require('fs');
require('dotenv').config();



console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;
var username = process.argv[2]
var github_repo_name = process.argv[3]

function getRepoContributors(repoOwner, repoName, cb){
  if(!repoOwner || !repoName){
    console.log('Invalid Input')
    return;
  }

  var requestURL = 'https://'+GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);

  var options = {
    url: requestURL,
    headers: {"User-Agent":"GitHub Avatar Downloader - Student Project"}
  }

  request(options, function (error, response, body){

   var data = JSON.parse(body);

   cb(error, data) //is invoking the function that was passed into the callback
 });
}

getRepoContributors(username, github_repo_name, function(error, data) {


  for(var i = 0; i < data.length; i++){
    downloadImageByURL(data[i].avatar_url, './avatars/' + data[i].login + '.jpg');
  }

});

function downloadImageByURL(url, filePath){

  request.get(url)
    .pipe(fs.createWriteStream(filePath));
}














