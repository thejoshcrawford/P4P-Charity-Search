var fs = require('fs');
var AWS = require('aws-sdk');
var mysql = require("mysql");

var cloudsearch = new AWS.CloudSearch({apiVersion: '2013-01-01'});
var configPath = './sync-config.json';

// get datetime this was run last
var config = { syncDate: '2000-01-01'};
if (fs.existsSync(configPath)){
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

// get select the changes since last 
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'test',
  password : 'test',
  database : 'gopro'
});
 
connection.connect();
 
connection.query('SELECT \
    charity_id,\
    charity_name,\
    charity_ein,\
    charity_city,\
    charity_state,\
    charity_zip,\
    case\
        when\
            charity_ein IS NOT NULL\
                AND charity_ein <> ''\
                AND charity_nfg_opt_out = 0\
                AND charity_nfg_fails = 0\
                AND charity_subsection_code = '03'\
        THEN\
            true\
        ELSE false\
    END AS nfg_eligible\
FROM\
    gopro.p4p_charities', function(err, rows, fields) {
  if (err) throw err;
 
  console.log('The solution is: ', fields);
});


// build batch shell

// add deletes

// add updates or add deletes then adds

// add adds

// apply batch 

// update datetime

var search = function(dir, needle) {
  if(!fs.existsSync(dir)) {
    return console.log('Directory ' + dir + ' does not exist.');
  }
  
var haystack = fs.readdirSync(dir), path, stats;
  for(var s = 0; s < haystack.length; s++) {
    path = dir + '/' + haystack[s];
    stats = fs.statSync(path);
    
if(stats.isDirectory()) {
      search(path, needle);
    } else if(path.indexOf(needle) >= 0) {
      console.log(path);
    }
  }
};

search(process.argv[2], process.argv[3]);