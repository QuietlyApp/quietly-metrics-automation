//This defines all the stuff we'll add for Add Competitor Page
const common = require('../common/common_functions');
const val = require('../common/validations');
const commonBeforeAfter = require('../common/commonBeforeAfter');
const {user: commonUserData} = require('../common/common_data');

//Number of Tests: 2

describe('Multiple Browser Session Tests', function () {
    commonBeforeAfter.loadBeforeAndAfterEach();
    
    // it('Scroll Page Partially', async function() {
    //     await common.partialPageScroll();
    // });
    // it('Scroll Page Fully', async function() {
    //     await common.completePageScroll();
    // });
    // it('Navigate Link Layers', async function() {
    //     await common.ticTacToe();
    // });
    // it('Page Skim Test', async function() {
    //     await common.principalSkimmer();
    // });
    it('Paragraph Read Test', async function() {
        //control variables for iterations
        for(let i = 0; i < commonUserData.readTestIterations; i++)
        {
            console.log("Paragraph Read Test - Iteration " + i);
            await common.paragraphReadTest();
        }
    });
    it('Paragraph Up and Down Read Test', async function() {
        //control variables for iterations
        for(let i = 0; i < commonUserData.readTestIterations; i++)
        {
            console.log("Paragraph Read Test - Iteration " + i);
            await common.paragraphReadTest(commonUserData.readUpDownSequence);
        }
    });
    it('Conversion Test', async function() {
        for(let i = 0; i < commonUserData.convertLinkIterations; i++)
        {
            console.log("Convert Link Test - Iteration " + i);
            await common.convertLink();
        }
        for(let i = 0; i < commonUserData.convertFormIterations; i++)
        {
            console.log("Convert Form Test - Iteration " + i);
            await common.convertForm();
        }
        for(let i = 0; i < commonUserData.noConvertIterations; i++)
        {
            console.log("No Convert Test - Iteration " + i);
            await common.dontConvert();
        }        
    });
    it('Single Depth Conversion Test', async function() {
        for(let i = 0; i < commonUserData.SDConvertLinkIterations; i++)
        {
            console.log("Single Depth Convert Link Test - Iteration " + i);
            await common.convertLink(
                ["https://stagingblog.quiet.ly/blog/uncategorized/links-and-goals/"]
            );
        }
        for(let i = 0; i < commonUserData.SDConvertFormIterations; i++)
        {
            console.log("Single Depth Convert Form Test - Iteration " + i);
            await common.convertForm(
                ["https://stagingblog.quiet.ly/blog/uncategorized/links-and-goals/"]
            );
        }
        for(let i = 0; i < commonUserData.SDNoConvertIterations; i++)
        {
            console.log("Single Depth No Convert Test - Iteration " + i);
            await common.dontConvert(
                ["https://stagingblog.quiet.ly/blog/uncategorized/links-and-goals/"]
            );
        }        
    });
});