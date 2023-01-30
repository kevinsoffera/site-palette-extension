// Get colors

$.each(document.styleSheets, function(sheetIndex, sheet) {
    console.log("Looking at styleSheet[" + sheetIndex + "]:");
    $.each(sheet.cssRules || sheet.rules, function(ruleIndex, rule) {
        console.log("rule[" + ruleIndex + "]: " + rule.cssText);
    });
});