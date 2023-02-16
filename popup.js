let colors = ["#8B0000", "red", "darkorange", "orange", "gold", "yellow", "greenyellow", "green", 
    "darkgreen", "blue", "darkblue", "indigo", "purple", "pink"]

let list = document.getElementById("list")

/*
Display Colors
*/

function renderColors(siteColors) {
    let colors = siteColors
    let listItems = ""
    for (let i = 0; i < colors.length; i++) {
        listItems += `
            <div class="flex-item" style="background:${colors[i]}">
                ${colors[i]}
            </div>
        `
    }
    document.getElementById("list").innerHTML = listItems
}



window.addEventListener('load', function (evt) {
	browser.extension.getBackgroundPage().browser.tabs.executeScript(null, {
		file: 'payload.js'
	});;
});

// renderColors()

browser.runtime.onMessage.addListener(function (message) {
    console.log(message)
	// colors = message;
    renderColors(message)
});



/* 
Add functionality to sort colors
*/
