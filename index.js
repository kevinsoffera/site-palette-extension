let colors = ["#8B0000", "red", "darkorange", 
"orange", "gold", "yellow", "greenyellow", "green", 
"darkgreen", "blue", "darkblue", "indigo", "purple", "pink"]

const list = document.getElementById("list")
const urlBtn = document.getElementById("url-btn")
let url = document.getElementById("url")
let urlString = ""


urlBtn.addEventListener("click", function(){
    browser.tabs.query({active: true, currentWindow: true}, function(tabs){
        urlString = tabs[0].url
    })
})


let listItems = ""
for (let i = 0; i < colors.length; i++) {
    listItems += `
        <div class="flex-item" style="background:${colors[i]}">
            ${colors[i]}
        </div>
    `
    
}
list.innerHTML = listItems



/* 
Add functionality to sort colors
*/

// $(function () {

//     $("button").click(function () {
//         $("h1").hide();
//     });

// });