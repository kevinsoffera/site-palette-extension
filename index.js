let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "purple", "pink"]
const list = document.getElementById("list")


let listItems = ""
for (let i = 0; i < colors.length; i++) {
    listItems += `
        <div class="flex-item" style="background:${colors[i]}">
            ${colors[i]}
        </div>

    `
    list.innerHTML = listItems

}

/* 
Add functionality to sort colors
*/

// $(function () {

//     $("button").click(function () {
//         $("h1").hide();
//     });

// });