//     reads a few urls out of a file (attached),
//   	 For each url: gets the content at that url as it  would be returned on a mobile browser like an iphone (You can look up )
// 	   Save the content to a file.

var fs = require('fs');
var lineReader = require('line-by-line');
var url = require('url');
var request = require('request');

  lr = new lineReader('example_files.txt');

  lr.on('error', function(err) {
    console.log('error reading file or line');
  });

  lr.on('line', function(line) {
    //we have our line

    //parse our url for the file name
    var parts = url.parse(line, true);
    
    //set up options for our request
    var options = {
      url: line,
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25'
      }
    }

    request(options, function(err, response, body) {

      if (err) {
        return console.log("Error fetching content from " + parts.hostname, err);
      }

      if (!err && response.statusCode == 200) {
        console.log("received code 200 from " + parts.hostname + ", writing file");

        var stream = fs.createWriteStream(parts.hostname + ".txt");

        stream.write(body.toString());

      }
    });

  });

  lr.on('end', function() {

  });
