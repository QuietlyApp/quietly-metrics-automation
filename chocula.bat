REM @ECHO ON
IF EXIST "C:\quietly-metrics-tests" (
rmdir /S /Q "C:\quietly-metrics-tests"
)
mkdir "C:\quietly-metrics-tests"
git clone "https://quietly-qa:N0*morewaffles!@github.com/QuietlyApp/quietly-metrics-automation" "C:\quietly-metrics-tests"
cd "C:\quietly-metrics-tests\quietly-insights\selenium_tests"
call npm install
start selenium-standalone start
Timeout 10
REM cd "C:\quietly-metrics-tests\quietly-insights\selenium_tests\" && mocha --reporter mocha-testrail-reporter --reporter-options domain=quietlyinsights.testrail.io,username=edwin@quiet.ly,password=fQK2DNVoLpST8VpjQ/Dm-IMr02Z69CEtw4zsQXSrn,projectId=1,suiteId=8
cd "C:\quietly-metrics-tests\quietly-insights\selenium_tests\" && mocha --reporter mochawesome --reporter-options reportDir="C:\Metrics Results",reportFilename=FinalTestResults_%date:~-10,2%%date:~-7,2%%date:~-4,4%
REM cd "C:\quietly-metrics-tests\quietly-insights\selenium_tests\" && mocha --grep delete_account --reporter mochawesome --reporter-options reportDir="C:\

Results",reportFilename=DeleteAccTestResults_%date:~-10,2%%date:~-7,2%%date:~-4,4%
