@echo off

set DIR=%~dp0
set LIB="%DIR%\bin"
set BIN="%DIR%\lib"

REM ???
echo {^
    "type" : "jdbc",^
    "jdbc": {^
        "url":"jdbc:mysql://localhost:3306/gopro",^
        "user":"root",^
        "password":"holeshot",^
        "sql":"select * from p4p_charities",^
        "index" : "p4p_charities",^
        "type" : "charity"^
    }^
}' | java \
       -cp "${lib}/*" \
       -Dlog4j.configurationFile=${bin}/log4j2.xml \
       org.xbib.tools.Runner \
       org.xbib.tools.JDBCImporter
       
pause