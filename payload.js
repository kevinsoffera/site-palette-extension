browser.runtime.sendMessage(getAllColors())

// scrape via https://stackoverflow.com/questions/23842320/get-all-style-attribute-colors
function getAllColors() {
    // regex via http://stackoverflow.com/a/7543829/149636
    let rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;

    let allColors = [];

    let elems = document.getElementsByTagName('*');
    let total = elems.length;

    let x,y,elemStyles,styleName,styleValue,rgbVal;

    for(x = 0; x < total; x++) {
        elemStyles = window.getComputedStyle(elems[x]);

        for(y = 0; y < elemStyles.length; y++) {
            styleName = elemStyles[y];
            styleValue = elemStyles[styleName];

            if(!styleValue) {
                continue;
            }

            // convert to string to avoid match exceptions
            styleValue += "";

            rgbVal = styleValue.match(rgbRegex);
            if(!rgbVal) { // property does not contain a color
                continue;
            }

            if(allColors.indexOf(rgbVal.input) == -1) { // avoid duplicate entries
                allColors.push(rgbVal.input);
                // maximum of 100 for performance reasons
                if (allColors.length == 100) {
                    return allColors
                }
            }

        }

    }

    return allColors;
}

