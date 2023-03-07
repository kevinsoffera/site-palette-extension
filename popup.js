let myList = document.getElementById("list")

// Inject content script on popup load
window.addEventListener('load', function (evt) {
	browser.extension.getBackgroundPage().browser.tabs.executeScript(null, {
		file: 'payload.js'
	});;
});


// Receive colors and render on popup
browser.runtime.onMessage.addListener(function (message) {
    renderColors(message)
    addText()
    textContrast()
});



function renderColors(siteColors) {
    // Display Colors on popup window
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


function addText() {
    // Display color text on mouseover (r, g, b) or (r, g, b, a)

    // selecting the elements to add a tooltip
    let target = document.getElementsByClassName("swatch");
    let colorText = document.getElementsByClassName("color-text");
    
    // add mouseover to all swatches
    for (let x = 0; x < target.length; x++) {
        // change display to 'block' on mouseover
        target[x].addEventListener('mouseover', () => {colorText[x].style.display = 'block';}, false); 
        // change display to 'none' on mouseleave
        target[x].addEventListener('mouseleave', () => {colorText[x].style.display = 'none';}, false);

        // copy to clipboard on click, update text to "Copied!"
        target[x].addEventListener('click', () => {
            rgb = colorText[x].innerText
            navigator.clipboard.writeText(colorText[x].innerText)
            colorText[x].innerText= "Copied!"
            // set text back to original color
            setTimeout(() => {
                colorText[x].innerText = rgb 
            }, "2000")
        })
    }
}


function textContrast() {
    // add contrast for dark colors
    let colorText = document.getElementsByClassName("color-text")
    
    for (let x = 0; x < colorText.length; x++) {
        // split colors to grab rgb values
        let str = colorText[x].innerHTML
        let rgbString = str.slice(str.indexOf('(')+1, str.indexOf(')')).split(', ')

        let red = parseInt(rgbString[0])
        let green = parseInt(rgbString[1])
        let blue = parseInt(rgbString[2])

        const perceivedLight = brightness(red, green, blue)

        if (perceivedLight < 0.5) {
            colorText[x].style.color = "white"
        }
    }
}

function brightness(red, green, blue) {
    /* 
    calculates perceived lightness using the sRGB Luma method 
    Luma = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255 
    formula from https://css-tricks.com/switch-font-color-for-different-backgrounds-with-css/
    */
    const redCalc = (red * 0.2126)
    const greenCalc = (green * 0.7152)
    const blueCalc = (blue * 0.0722)

    const rgbSum = (redCalc + blueCalc + greenCalc)

    const lightness = rgbSum / 255

    return lightness
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

