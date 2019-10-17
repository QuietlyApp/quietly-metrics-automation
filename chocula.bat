REM @ECHO ON
IF EXIST "C:\quietly-automation-tests" (
rmdir /S /Q "C:\quietly-automation-tests"
)
mkdir "C:\quietly-automation-tests"
git clone "https://quietly-qa:N0*morewaffles!@github.com/QuietlyApp/quietly-automation-tests" "C:\quietly-automation-tests"
cd "C:\quietly-automation-tests\quietly-insights\selenium_tests"
call npm install
start selenium-standalone start
Timeout 10
cd "C:\quietly-automation-tests\quietly-insights\selenium_tests\" && mocha --reporter mocha-testrail-reporter --reporter-options domain=quietlyinsights.testrail.io,username=edwin@quiet.ly,password=fQK2DNVoLpST8VpjQ/Dm-IMr02Z69CEtw4zsQXSrn,projectId=1,suiteId=8
REM cd "C:\quietly-automation-tests\quietly-insights\selenium_tests\" && mocha --reporter mochawesome --reporter-options reportDir="C:\Automation Results",reportFilename=FinalTestResults_%date:~-10,2%%date:~-7,2%%date:~-4,4%
REM cd "C:\quietly-automation-tests\quietly-insights\selenium_tests\" && mocha --grep delete_account --reporter mochawesome --reporter-options reportDir="C:\Automation Results",reportFilename=DeleteAccTestResults_%date:~-10,2%%date:~-7,2%%date:~-4,4%
