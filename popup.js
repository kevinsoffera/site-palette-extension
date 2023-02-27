let myList = document.getElementById("list")

// Inject content script on popup load
window.addEventListener('load', function (evt) {
	browser.extension.getBackgroundPage().browser.tabs.executeScript(null, {
		file: 'payload.js'
	});;
});


// Receive colors and render on popup
browser.runtime.onMessage.addListener(function (message) {
    // console.log(message[0])
    renderColors(message)
    addText()
    textContrast()
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

}

// Display text on mouseover
function addText() {
    // selecting the elements to add a tooltip
    let target = document.getElementsByClassName("swatch");
    let colorText = document.getElementsByClassName("color-text");
    
    // add mouseover to all swatches
    for (let x = 0; x < target.length; x++) {
        // change display to 'block' on mouseover
        target[x].addEventListener('mouseover', () => {colorText[x].style.display = 'block';}, false);
        
        // change display to 'none' on mouseleave
        target[x].addEventListener('mouseleave', () => {colorText[x].style.display = 'none';}, false);
    }
}


function textContrast() {
    let colorText = document.getElementsByClassName("color-text")
    
    for (let x = 0; x < colorText.length; x++) {
        // split colors to grab rgb values
        let str = colorText[x].innerHTML
        let rgbString = str.slice(str.indexOf('(')+1, str.indexOf(')')).split(', ')

        let red = parseInt(rgbString[0])
        let green = parseInt(rgbString[1])
        let blue = parseInt(rgbString[2])

        /* calculates perceived lightness using the sRGB Luma method 
        Luma = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255 */
        const redCalc = (red * 0.2126)
        const greenCalc = (green * 0.7152)
        const blueCalc = (blue * 0.0722)

        const rgbSum = (redCalc + blueCalc + greenCalc)

        const perceivedLight = (rgbSum / 255)

        if (perceivedLight < 0.5) {
            colorText[x].style.color = "white"
        }
    }
}

// function brightness(red, green, blue) {

// }