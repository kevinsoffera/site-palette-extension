let myList = document.getElementById("list")

/*
Display Colors
*/

function renderColors(siteColors) {
    let colors = siteColors
    let listItems = ""
    for (let i = 0; i < colors.length; i++) {
        listItems += `
            <div class="flex-item tooltiptext" style="background:${colors[i]};tooltip:${colors[i]}">
                ${colors[i]}
            </div>
        `
    }
    document.getElementById("list").innerHTML = listItems
}


// Inject content script on page load
window.addEventListener('load', function (evt) {
	browser.extension.getBackgroundPage().browser.tabs.executeScript(null, {
		file: 'payload.js'
	});;
});

// Receive message 
browser.runtime.onMessage.addListener(function (message) {
    console.log(message)
	// colors = message;
    renderColors(message)
});



/* 
Add functionality to sort colors
*/
