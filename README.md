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
    p4p_charities
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

Setup and Start Sync
1.  Setup Config - http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html
  *  Configure instance to use IAM roles or
  *  Create shared credentials file ~/.aws/credentials 