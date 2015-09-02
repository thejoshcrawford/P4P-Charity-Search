Install Elasticsearch v2
1.  Download and install Java https://java.com/en/download/win10.jsp	
1.  Download and install Elasticsearch to c:\ https://github.com/rgl/elasticsearch-setup/releases
1.  Set JAVA_HOME environment variable to C:\Program Files (x86)\Java\jre1.8.0_60 or equivalent
1.  Change clustername (to db for consistency) and node name C:\elasticsearch-1.7.1\config\elasticserch.yml
1.  Start Elasticsearch service
1.  Test with Postman GET localhost:9200

Install Marvel Plugin
1.  navigate to elasticserch\bin
1.  plugin.bat -i elasticsearch/marvel/latest
1.  restart elasticserch service
1.  test http://localhost:9200/_plugin/marvel

Sync Mysql v2 - http://blog.pluralsight.com/elasticsearch-and-sql-server
1.  ~~Install jdbc plugin c:\elasticsearch\bin>plugin -i jdbc -u  http://xbib.org/repository/org/xbib/elasticsearch/importer/elasticsearch-jdbc/1.7.0.1/elasticsearch-jdbc-1.7.0.1-dist.zip~~
1.  ~~Now, restart your Elasticsearch node or cluster.~~
1.  Download and extract http://xbib.org/repository/org/xbib/elasticsearch/importer/elasticsearch-jdbc/1.7.1.0/elasticsearch-jdbc-1.7.1.0-dist.zip
1.  Run script from extracted dir
```shell
echo '{
"type" : "jdbc",
"jdbc" : {
"driver": "com.mysql.jdbc.Driver",
"url" : "jdbc:mysql://10.0.1.190:3306/gopro",
"user" : "root",
"password" : "holeshot",
"sql" : "select *, charity_id as _id from p4p_charities",
"treat_binary_as_string" : true,
"elasticsearch" : {
"cluster" : "gopro",
"host" : "localhost",
"port" : 9300
},
"index" : "p4p_charities",
"type":"charity"
}
}
' | java \
-cp "C:/elasticsearch-jdbc-1.7.1.0/lib/elasticsearch-jdbc-1.7.1.0-uberjar.jar;C:/elasticsearch-jdbc-1.7.1.0/lib/mysql-connector-java-5.1.33.jar" \
-Dlog4j.configurationFile="file://localhost/C:/elasticsearch-jdbc-1.7.1.0/bin/log4j2.xml" \
org.xbib.tools.Runner \
org.xbib.tools.JDBCImporter
```
1.  Verify by checking if index created or debug by checking logs in log directory
1.  Add schedule "schedule" : "0 0-59 0-23 ? * *"

Search Endpoint: search-p4p-search2-ral7jaq7affid657aaekpon5vu.us-east-1.cloudsearch.amazonaws.com

Search Docs: http://docs.aws.amazon.com/cloudsearch/latest/developerguide/searching-compound-queries.html

Simple Query: https://search-p4p-search2-ral7jaq7affid657aaekpon5vu.us-east-1.cloudsearch.amazonaws.com/2013-01-01/search?q=non-profit

Security

Search is a readonly endpoint. Document uploads are secured via AWS user.

Installation:

1.  Gather data with the following query
```
SELECT 
    charity_id,
    charity_name,
    charity_ein,
    charity_city,
    charity_state,
    charity_zip,
    case
        when
            charity_ein IS NOT NULL
                AND charity_ein <> ''
                AND charity_nfg_opt_out = 0
                AND charity_nfg_fails = 0
                AND charity_subsection_code = '03'
        THEN
            true
        ELSE false
    END AS nfg_eligible
FROM
    gopro.p4p_charities
```
1.  Export data as csv or json
1.  Partition data in 5MB chunks
1.  Resize search instance to large or bigger
1.  Upload data through the AWS Cloudsearch Dashboard or CLI
1.  Create suggester
1.  Index data 
1.  Resize instance
1.  Start cron job to keep data updated

how to get data in programatically

post updates with cron

