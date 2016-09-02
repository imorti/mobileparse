//reads a few urls out of a file (attached),
//   	 For each url: gets the content at that url as it  would be returned on a mobile browser like an iphone (You can look up )
// 	 Save the content to a file.

var fs = require('fs');
var lineReader = require('line-by-line');
var url = require('url');

var request = require('request');
var http = require('http');

  lr = new lineReader('example_files.txt');

  lr.on('error', function(err) {
    console.log('error reading file or line');
  });

  lr.on('line', function(line) {
    //we have our line

    //parse our url for the file name
    var parts = url.parse(line, true);
    console.log("host name is: " + url.format(parts.hostname));

    request(line, function(err, response, body) {
      if (!err && response.statusCode == 200) {
        console.log("received code 200, writing file");

        var stream = fs.createWriteStream(parts.hostname + ".txt");

        stream.write(body.toString());

      }
    });

    // console.log(line);

  });

  lr.on('end', function() {
    //all lines read we're done now
    console.log('All lines processed. Thanks and have a great day.');
  });
