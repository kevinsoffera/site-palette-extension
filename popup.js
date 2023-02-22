let myList = document.getElementById("list")

// Inject content script on popup load
window.addEventListener('load', function (evt) {
	browser.extension.getBackgroundPage().browser.tabs.executeScript(null, {
		file: 'payload.js'
	});;
});


// Receive colors and render on popup
browser.runtime.onMessage.addListener(function (message) {
    console.log(message)
    renderColors(message)
    console.log("rendered")
    addTooltip()
    console.log("tooltips")
});


// Display Colors on popup
function renderColors(siteColors) {
    let colors = siteColors
    let listItems = ""
    for (let i = 0; i < colors.length; i++) {
        listItems += `
            <div class="swatch" style="background-color:${colors[i]}">
                <span class="color-text">
                    ${colors[i]}
                </span>
            </div>
        `
    }
    document.getElementById("list").innerHTML = listItems
    myList = document.getElementById("list")
    // console.log(myList)
}


function addTooltip() {

    // selecting the elements for which we want to add a tooltip
    var target = document.getElementsByClassName("swatch");
    var colorText = document.getElementsByClassName("color-text");
    console.log(colorText)
    
    
    for (let x = 0; x < target.length; x++) {
        // change display to 'block' on mouseover
        target[x].addEventListener('mouseover', () => {colorText[x].style.display = 'block';}, false);
        
        // change display to 'none' on mouseleave
        target[x].addEventListener('mouseleave', () => {colorText[x].style.display = 'none';}, false);
    }
}