var request = require('request');

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

getRepoContributors("jquery", "jquery", function(error, data) {
  for(var i = 0; i < data.length; i++){
    console.log(data[i].avatar_url);
  }
});
