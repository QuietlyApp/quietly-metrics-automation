Quietly Consumer Product
==========================

The repository is split into three folders: Client, Server, Shared.

Client: Things to know
------------------------
* Webpack is used to build the files required for developing locally and also for Production.
* All files are inside the folder `app` and webpack builds the folder `dist`. Any changes made to `dist`
folder will be gone every time the app gets built.
* `NODE_ENV=localdev webpack --watch` or `NODE_ENV=localdev webpack` should be used when working locally. It creates the `dev` folder inside `dist`. Its not pushed to the repository. `.gitignore` has necessary config to make sure that doesn't happen.
* Important:  During deployment, the `post_deploy.sh` script will run `webpack` to build the environment-specific files for both the "client/insights" and "client/tracker" directories.
* We are using `css-loader / sass-loader` and `file-loader` to build the CSS and image files. To make sure webpack can add images to build please follow this syntax for \<img\> tag.
  <br> `<img className="blah" src={require("../static/images/ui/backgrounds/bg-tracker.png")} />`
* Use `.scss` files for writing CSS code. If you are running the --watch command in webpack, they will be built automatically when making changes.
* Try to use the BEM methodology when coding your .scss files. More information can be found here: https://en.bem.info/methodology/quick-start/
* HtmlWebpackPlugin is used to create the `index.html` in the `dist` folder. It is using the file `app/index.html` as template. stylesheet and javascript tags will be added by the plugin.

Server: Things to know
------------------------
* The folder `static` is a soft link to `client/dist`. This is served as static folder by express. No need to change any code in here. It will be the same as client/dist. So every time there is a new build server picks up the new changes.
* `ENV` file should be copied inside the server folder. Get the file from the team.
* Server has three process: `API`, `WORKER` , and `CHROMIUM`. To run all three we are using pm2.


Shared: Things to know
------------------------
* This folder has common code shared between client and server.
* All chart options should go inside here.


To setup a local environment
===================================
Pre-requisites
------------------------
* Node.js >= 7.x
    > To install: `brew install node@7` or `https://nodejs.org/en/download/package-manager/`
* Mysql >= 5.7.X
    > To install: <br>Linux: `apt-get install mysql-server` <br> Mac: `brew install mysql`
* Redis >= 3.0.X
    > To install: <br>Linux: `https://gist.github.com/selvavalluvan/7f2f6af49e3ff1dd512343dcfcd8b05a` <br> Mac: `brew install redis`
* MongoDB
    > To install: <br>Linux: `sudo apt-get install mongodb`  <br> Mac: `brew install mongodb && brew services start mongodb`

# Install instructions
------------------------
## Repo checkout:
```
git clone git@github.com:QuietlyApp/quietly-insights.git ~/quietly-insights
```
   Create and `.env` file in `src/server/` and paste the contents of .env file from your team member. This file holds all the passwords.

## Server setup:
```
npm install -g pm2 sequelize-cli grunt webpack
cd ~/quietly-insights/src/shared/
npm install
cd ~/quietly-insights/src/server/
npm install
bash dbsetup.sh
npm run migrate
pm2 start ecosystem.config.js
```

## Client setup:
```
cd ~/quietly-insights/src/client
npm install
```
## Development:
```
cd ~/quietly-insights/src/client
npm run client
```
  Check [http://localhost:9000](http://localhost:9000) to checkout the app. For the stdout/stderr for all processes:
```
  cd ~/quietly-insights/src/server/
  pm2 logs
```

Notes:
Since `webpack --watch` is running while developing, all changes will reflect in localhost when reloaded.
For hot reloading install appropriate packages and for debugging use intellij debug feature.

### Pose as any user
  * Sign in as insights@quiet.ly
  * Open a new tab and go to the appropriate url below where AID is the user's account id
   * http://localhost:9000/api/account/pose?aid=AID
   * https://qa.quiet.ly/app/api/account/pose?aid=AID
   * https://insights.quiet.ly/app/api/account/pose?aid=AID

## UI Tests:
```
cd ~/quietly-insights/selenium_tests
npm install
./setup.sh
./run.sh "Login Tests"
./run.sh # runs all UI Tests
```

You can alternatively run the `selenium-standalone start` command in a separate window while you run mocha separately:

```
mocha --grep "Login Tests"
```

# Deployment

## Deploying from the local machine
  Generate a ssh key as needed and get another developer to append your public key to `/home/ubuntu/.ssh/authorized_keys` on the desired remote machine.

  ```
  cd src/server
  pm2 deploy qa|production
  ```  

  For a new EC2 instance, run the following command for headless chromium to work. This is needed for generating screenshots and scraping.
  ```
  sudo apt-get update && sudo apt-get install xorg openbox libnss3 libasound2
  ```

## Migrate the database (as needed)

  If you made any changes to the database, you'll have to run the db migration/update script after deploying from the local machine. SSH into the desired machine and run the db:migrate script. See `src/server/package.json` for details. Caution: don't use `db:migrate:undo:all` option on production deployment. Be careful with `npm run migrate_production` - the change is permanent.

  ```
  ssh ubuntu@[qa|production].quiet.ly
  cd /var/qly/quietly-insights/source/src/server
  npm run migrate|migrate_qa|migrate_production
  ```

## Build new wordpress plugin on the local machine

  ```
  cd src/client/wordpress
  bash build.sh
  ```
  Those commands should create the `quietly-analytics.zip` file that is uploaded to Wordpress as a plugin.


# Metrics

## Retrieved from Google Analytics
  * Pageviews
  * Unique Pageviews
  * Avg Session Duration
  * Users (Readers/Visitors)
  * Exit Rate
  * Conversion Rate (for GA Goals)

## Based on events from code snippet

  * Average Read Percentage and Completion Rate for a Property
    * see `tracker_analytics_monthly` and `tracker_analytics_weekly` for results
  * Average Read Percentage and Completion Rate for a Page
    * aggregated from `tracker_conversion_pageviews_analytics` and `tracker_article_aggregate`
  * Conversion Rate and Goal Completions (for Link Click and Form Submission Goals)
    * see `tracker_conversion_analytics` for results
  * Page Score
    * see `tracker_conversion_pagescore_analytics` for results

## Based on events from code snippet and data retrieved from BuzzSumo, TextRazor, and Google Analytics

  * Reach Topic Score
    * BuzzSumo
    * TextRazor
  * Engage Topic Score
    * BuzzSumo
    * TextRazor
    * If available
      * Average Read Percentage
      * Completion Rate
      * GA Exit Rate
      * differentiated using GA Unique Pageviews
    * Fallback
      * GA Avg Time on Page
      * GA Exit Rate
  * Conversion Topic Score
    * BuzzSumo
    * TextRazor
    * If available:
      * Conversion Rate
    * Fallback:
      * GA Conversion Rate

# The Code Snippet and related metrics

## Average Read Percentage and Completion Rate for a Property

1. `tracker_block_events` (~1K rows) populates from clients running `analytics.min.js`
  * (session_id, *block_id*, *value*, created_at)
  * Each row tracks the read-delta-T for a block-session

2. periodically delete rows from `tracker_block_events` and aggregate (group by session_id and block_id) them into `tracker_block_aggregate` (~27M rows)
  * (session_id, *block_id*, *article_id*, page_id, property_id, created_at, *block_read*)
  * Each row tracks the read-total-T and block-read-completion for a block-session

3. ON_INSERT/ON_UPDATE trigger for `tracker_block_aggregate` inserts/updates `tracker_article_aggregate_queue` (~100 rows)
  * (session_id, article_id, property_id, created_at)
  * Each row tracks the article-session that needs to be checked

4. periodically delete rows from `tracker_article_aggregate_queue` and aggregate (ON_DELETE trigger that inserts/updates) them into `tracker_article_aggregate` (~1.4M)
  * (session_id, article_id, property_id, created_at, *read_percentage*, *complete*)
  * Each row tracks the article-session read percentage and completion

5. aggregate (ON_INSERT/ON_UPDATE trigger that inserts/updates) rows for `tracker_article_aggregate` into `tracker_analytics_monthly` and `tracker_analytics_weekly`
  * (property_id, reportDate, *completion_rate*, *avg_read_percentage*)
  * Each row tracks the property read percentage and completion


## Average Read Percentage and Completion Rate for a Page

1. `tracker_conversion_pageviews_analytics` (~11K rows) populates from clients running `analytics.min.js` for every new session-page
  * (property_id, period, *page_id*, *count*, reportDate)
  * Each row tracks the unique view count for each page-property

2. Aggregate (for any given property_id and a date range) rows from `tracker_conversion_pageviews_analytics` JOIN `tracker_article_aggregate`
  * (url, title, completionRate, avgReadPercentage, pageviews, reportDate)

## Conversion Rate (for Link Click and Form Submission Goals)

1. `tracker_conversion_events` populates from clients running `analytics.min.js` for every unique click/form conversion
  * (session_id, property_id, type, page_id, descriptor, reportDate)

2. for each new unique click/form conversion in `tracker_conversion_events`, a row is inserted/updated in `tracker_conversion_analytics`
  * (property_id, page_id, descriptor, conversions, reportDate)
  * Each row tracks the conversions from a page for the goal-reportPeriod-reportDate-property

## Page Score

1. `tracker_conversion_events` populates from clients running `analytics.min.js` for every unique click/form conversion
  * (session_id, property_id, type, page_id, descriptor, reportDate)

2. for each new unique click/form conversion in `tracker_conversion_events`, rows are inserted/updated in `tracker_conversion_pagescore_analytics` after looking at the conversion session's pageview history in `tracker_page_events` (~1.8M)
  * (property_id, page_id, score, reportDate)
Uses the Fibonacci sequence to weigh converting pages.

    Example 1: User lands on an article and immediately converts
    * page1 gets a score of 1.0

    Example 2: User lands on an article, reads another article, and then converts
    * page1 gets a score of (4 / (4 + 6)) = (4 / 10) = 0.4
    * page2 gets a score of (6 / (4 + 6)) = (6 / 10) = 0.6

    Example 3: User lands on an article, reads 2 more articles, and then converts
    * page1 gets a score of (4 / (4 + 6 + 10)) = (4 / 20) = 0.2
    * page2 gets a score of (6 / (4 + 6 + 10)) = (6 / 20) = 0.3
    * page3 gets a score of (10 / (4 + 6 + 10)) = (10 / 20) = 0.5

# Calculating topic performance

## Reach
  * Unique Pageviews (100%)

## Engage (Tracker)
  * Completion Rate (20%)
  * AvgReadPercentage (50%)
  * ExitRate (30%)

## Engage (Google Analytics)
Uses the UniquePageView 2-step median filter where an initial retrieval is used to determine a minimum UniquePageView count and this result is used to filter the results of the second call.
  * AvgTimeOnPage (60%)
  * ExitRate (40%)

## Convert
Uses the GoalCompletionLocation filter for the property's domain and the Fibonacci sequence to weigh converting pages.
  * ConversionRate (100%)

## Based on events from code snippet

  * Average Read Percentage and Completion Rate for a Property
    * see `tracker_analytics_monthly` and `tracker_analytics_weekly` for results
  * Average Read Percentage and Completion Rate for a Page
    * aggregated from `tracker_conversion_pageviews_analytics` and `tracker_article_aggregate`
  * Conversion Rate and Goal Completions (for Link Click and Form Submission Goals)
    * see `tracker_conversion_analytics` for results
  * Page Score
    * see `tracker_conversion_pagescore_analytics` for results

# Prioritizing and filtering topics

Listed in order of implementation

## cross-product of topic scores and performance score
  * Each article has a performance score and hundreds of topics with relevancy scores.
  * To find an aggregate performance score for each topic, multiply a topic's score with its article's performance score for each article, and find the average for each topic-article product.

## normalizing article performance scores
  * article performance score scaling issue: Sometimes, an article may perform really well - a couple of magnitudes greater - and this might cause topics from only that article to show up at the top of the topic recommendation list.
  * Solution (works well): Exponentially scale down the performance scores. e.g. take the score to the power of (1/10). This works well because scores are scaled down in proportion to their largeness; large scores are reduced dramatically but small scores are reduced comparatively very little  

## topic noise cancellation 1 - drop common topics
  * generic topics issue: Topics are too generic to be useful/interesting/insightful
  * Solution 1 (works well): Remove topics that show up in ALL of the given list of articles. Grab a large set of articles - like 50 - and create a running list of topics to throw out for that domain.


## clustered topics removal
  * some topics have the same relevancy score: If their relevancy scores are high, they will dominate the recommended topics list. This is made worse when these clustered topics very closely related
  * Solution 1 (works well): Drop the extra topics based on the square root of the length of the topic cluster e.g. if the cluster length is 8, reduce the length to 2 and simply throw out the 6. Additionally, topic similarity calculations could be done (with a new API?) so we're not randomly dropping topics.

## similar topics removal
  * some topics are too similar e.g. Computing vs Computing Science, e.g. Marketing vs Marketing Analysis.
  * Solution 1 (works well): Drop a topic if it is part of another topic e.g. drop Computing and Marketing while retaining Computing Science and Marketing Analysis

## topic prevalence promotion
  * some topics have only 1 or 2 related stories but are also very relevant
  * Solution 1 (works well): Count the number of times a topic recurs, and update topic's score using the formula: new_score = (old_score * 0.65) + ((-1/(2x) + 1) * 0.35) where x is the recurrence count.

## topic noise cancellation 2 - drop useless topics
  * generic topics issue: Topics are too generic to be useful/interesting/insightful
  * Solution 2 (does not work well, even when used in conjunction with Solution 1): Remove topics with a relevancy score that's less then 0.5 (or some other smaller number). Did not seem to make a difference.

## topic noise cancellation 3 - limit number of topics
  * generic topics issue: Topics are too generic to be useful/interesting/insightful
  * Solution 3 (does not work well, even when used in conjunction with Solutions 1 and 2): Apply a maximum limit of 30 topics for each article. Did not seem to make a difference.

## topic noise cancellation 4 - use article performance rankings instead of article performance scores
  * generic topics issue: Topics are too generic to be useful/interesting/insightful
  * Solution 4 (does not work well, even when used in conjunction with Solutions 1, 2, and 3): Use the ordered index to calculate artificial geometrically decreasing performance scores e.g. for a list of 10 topics, use the reverse fibonacci sequence: 144, 89, 55, 34, 21, 13, 8, 5, 3, 2. Performance scores end up being consistent and evenly spaced out (at least geometrically so). Did not seem to make a difference (since the problem is with the topics, not the articles' performance scores)

## topic noise cancellation 5 - the mean score method
  * generic topics issue: Topics are too generic to be useful/interesting/insightful
  * Solution 5 (works really well): Find out how many times a topic shows up in the given list of articles and do this for all topics. Using these counts of recurrences, throw out any topic that appears more times than the average recurrence count. Going forward, we could also use the square root of the average recurrence count.
