// TODO: Modify this function
function generateShortCode(storeId, transactionId) {
    // Convert the storeId and transactionId to base 36 (using numbers and letters)
    var storeCode = storeId.toString(36);
    var transactionCode = transactionId.toString(36);

    // Return concatenated code, padded to ensure consistent lengths for easier decoding
    return storeCode.padStart(4, '0') + transactionCode.padStart(5, '0');
}

function decodeShortCode(shortCode) {
    // Split the shortCode back into its store and transaction components
    var storeCode = shortCode.substring(0, 4);
    var transactionCode = shortCode.substring(4, 9);

    // Convert the base 36 codes back to integers
    var storeId = parseInt(storeCode, 36);
    var transactionId = parseInt(transactionCode, 36);

    return {
        storeId: storeId,
        shopDate: new Date(),
        transactionId: transactionId
    };
}

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {

    var storeIds = [175, 42, 0, 9]
    var transactionIds = [9675, 23, 123, 7]

    storeIds.forEach(function (storeId) {
        transactionIds.forEach(function (transactionId) {
            var shortCode = generateShortCode(storeId, transactionId);
            var decodeResult = decodeShortCode(shortCode);
            $("#test-results").append("<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>");
            AddTestResult("Length <= 9", shortCode.length <= 9);
            AddTestResult("Is String", (typeof shortCode === 'string'));
            AddTestResult("Is Today", IsToday(decodeResult.shopDate));
            AddTestResult("StoreId", storeId === decodeResult.storeId);
            AddTestResult("TransId", transactionId === decodeResult.transactionId);
        })
    })
}

function IsToday(inputDate) {
    // Get today's date
    var todaysDate = new Date();
    // call setHours to take the time out of the comparison
    return (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0));
}

function AddTestResult(testName, testResult) {
    var div = $("#test-results").append("<div class='" + (testResult ? "pass" : "fail") + "'><span class='tname'>- " + testName + "</span><span class='tresult'>" + testResult + "</span></div>");
}