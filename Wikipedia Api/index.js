var request = require("request");
var query = "english";
var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} +"&format=json`;
request(url, function (err, response, body) {
  if (err) {
    var error = "cannot connect to the server";
    console.log(error);
  } else {
    console.log("body:", body);
  }
});
