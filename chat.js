import apiKeys from "./apikey.js";
// get data from api

async function getData(value){
    
    
    const url = "https://api.openai.com/v1/chat/completions";
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${apiKeys}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: value}],
        })
    }
    
    let data = await fetch(url, requestOptions);
    data = await data.json();
    
    return data.choices[0].message.content;
}
// initialize elements
let message = document.getElementById("message")
let sent = document.getElementById("sent")
let value;
// funtion to create query box
function createQueryBox(value) {
    let container = document.createElement("div")
    container.className = "query-container";
    container.innerHTML = `
    <spna class="query">
    ${value} 
    </spna>
    `;
    document.querySelector(".message").appendChild(container)
}
// funtion to create answer box and this is async func because we have wait to get response from user;
async function createAnsBox(value) {
    let answer = await getData(value);
    console.log(answer)
    let container = document.createElement("div")
    container.className = "answer-container";
    container.innerHTML = `
    <span class="answer">
            ${answer}
    </span>
    `;
    document.querySelector(".message").appendChild(container) 
    sent.disabled = false;
}



// this will trigger the message sent when we click on sent button
sent.addEventListener("click", (event) => {
    value = message.value;
    message.value = "";
    createQueryBox(value);
    sent.disabled = true;
    createAnsBox(value);
    // getOfflineData(value);
    
})
// this will trigger the message sent when we press Enter
document.addEventListener("keyup", (event) => {
    if (event.key == "Enter" && sent.disabled==false) {
        value = message.value;
        message.value = "";
        createQueryBox(value);
        sent.disabled = true;
        createAnsBox(value);
    }
})

// get response from my data

// function getOfflineData (value) {
//     value = value.toLowerCase();
//     console.log(responseObject[value])
//    if(responseObject[value] === undefined){
//     let container = document.createElement("div")
//     container.className = "answer-container";
//     container.innerHTML = `
//     <span class="answer">
//             Sorry we have no answer try something else
//     </span>
//     `;
//     document.querySelector(".message").appendChild(container) 
//    }
//    else{
//         let container = document.createElement("div")
//     container.className = "answer-container";
//     container.innerHTML = `
//     <span class="answer">
//             ${responseObject[value]}
//     </span>
//     `;
//     document.querySelector(".message").appendChild(container) 
//    }
// }
