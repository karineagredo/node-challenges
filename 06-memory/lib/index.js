const fs = require('fs');
const stream = require('event-stream');

/**
 * Program to count the total number of IPs per region
 * @param countryCode a string. ISO 3661 country code
 */
(function () {
  exports.countryIpCounter = function (countryCode, cb) {
    if (!countryCode) {
      return cb();
    }
    var totalIPsRegion = 0;
    fs.createReadStream(__dirname + '/../data/geo.txt', { encoding: 'utf8' })
      .pipe(stream.split())
      .pipe(
        stream.mapSync(function (line) {
          const lineDetails = line.split('\t');
          // The countryCode is at index 3 in the given test file
          if (lineDetails[3] === countryCode) {
            // Calculate the number of IPs and add them to the counter
            totalIPsRegion += +lineDetails[1] - +lineDetails[0];
          }
        })
      )
      .on('error', function (err) {
        return cb();
      })
      .on('end', function () {
        return cb(null, totalIPsRegion);
      });
  };
}.call(this));
