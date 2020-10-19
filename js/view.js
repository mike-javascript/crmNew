var code = document.getElementById("code");
var block = document.getElementById("block");
var input = document.getElementById("input");
var add = document.getElementById("add");
var user = document.getElementById("user");


const createInput = () => {
    input.innerHTML = 
        `<input class="input" id="firstName" type="text" placeholder="ENTER YOUR FIRST NAME"/>
        <input class="input" id="lastName" type="text" placeholder="ENTER YOUR LAST NAME"/>
        <button id="button">ENTER</button>`
}

const red = () => {
    $("#red").fadeIn();
}

const redOut = () => {
    $("#red").fadeOut();
}

const codeView = num => {
    redOut();
    $("#input").fadeOut("fast");
    $("header").fadeOut("fast");
    num.forEach( x => {
        code.innerHTML += `<div class="number" id="${x}">${x}</div>`;
    })
    setTimeout( () => {
        $(code).fadeIn("slow");
        $(code).fadeIn("slow").css("display","flex");
    },500)
}

const arr = params => {
    $(code).fadeOut();
    if(params.length > 1) {
        params.forEach( x => {
            create(x);
        })
    } else {
        create(params[0]);
        add.style.display = "none";
        document.getElementById("forDelete").style.display = "none";
    }
    setTimeout(function () {
        $(block).fadeIn();
    },500)
}

const create = params => {
    var div = document.createElement("div");
    div.className = "user";
    div.innerHTML = 
        `<div class="border" id="${params.id}">
            <i id="${params.roles}"class="fas fa-pen-square"></i>
            <i id="forDelete" class="fas fa-trash-alt"></i>
        </div>
        <div class="border">${params.firstName}</div>
        <div class="border">${params.lastName}</div>
        <div class="border">${params.code}</div>`;
    user.appendChild(div);   
}

const myAlert = myAlert => {
    $("#background").fadeIn();
    document.getElementById("myAlert").innerHTML =
        `<div>${myAlert}</div>
        <div class="flex">
            <button id="ok"><strong>OK</strong></button>
            <button id="no"><strong>NO</strong></button>
        </div>`
    $("#myAlert").fadeIn();   
}

const delOk = () => {
    document.getElementById("ok").style.display = "none";
    document.getElementById("myAlert").style.textAlign = "center";
}

const fadeOut = () => {
    $("#background").fadeOut("fast");
    $("#myAlert").fadeOut("fast");
}

const top = params => {
    if(params > 700) {
        params = params - 200;
    }
    document.getElementById("myForm").style.top = params + 'px';
}

const addView = () => {
    document.getElementById("myForm").innerHTML =
        `<div class="center">
        <input class="form" id="newFirstName" type="text" placeholder="ENTER FIRST NAME"/>
        <input class="form" id="newLastName" type="text" placeholder="ENTER LAST NAME"/>
        <input class="form" id="newCode" type="number" placeholder="ENTER CODE"/>
        <input class="form" id="newRole" type="text" placeholder="ENTER ROLE"/>
        <div clas="flex">
            <button class="form btn" id="form">ENTER</button>
            <button class="form btn" id="annule">ANNULE</button>
        </div>
        </div>
        <div class="red" id="redForm">ALL FIELDS ARE REQUIRED
        </div>`
    fadeIn();
}

const fadeIn = () => {
    $("#background").fadeIn();
    $("#myForm").fadeIn(); 
}

const delNewRole = () => {
    document.getElementById("newRole").style.visibility = "hidden";
}

const topReal = () => {
    document.getElementById("myForm").style.top = '200px';
}

const edit = () => {
    $("#background").fadeOut("fast");
    $("#myForm").fadeOut("fast");
}

const reset = () => {
    user.innerHTML = "";
}

const topMyAlert = params => {
    document.getElementById("myAlert").style.top = (params - 50) + 'px';
}

const topMyAlertReal = () => {
    document.getElementById("myAlert").style.top = '200px';
}

const slide = x => {
    $(x).parentsUntil("div#user").slideUp();
}

const redForm = () => {
    $("#redForm").fadeIn();
}

const redFormOut = () => {
    $("#redForm").fadeOut();
}

const audio = params => {
    document.getElementById(params).play();
}

export { createInput, red, redOut, codeView, arr, myAlert, delOk, fadeOut, top, addView, delNewRole, 
            topReal, edit, reset, topMyAlert, topMyAlertReal, slide, redForm, redFormOut, audio }




