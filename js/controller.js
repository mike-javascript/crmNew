import * as View from "./view.js";
import * as Model from "./model.js";

const objVar = {
    arr : "",
    old : [],
    code : "",
    oldId : "",
    tryCode : 0,
    time : null,
    arrNew : [],
    newArr : [],
    myAlert : "",
    newRole : "",
    lastName : "",
    firstName : ""
}

export const init = () => {
    View.createInput();
    document.getElementById("button").addEventListener("click", start, {once:true});
    window.addEventListener("keydown", startEnter);
}

const startEnter = e => {
    if (e.key == "Enter") {
        e.preventDefault();
        start();
    }
}

const start = () => {
    objVar.firstName = document.getElementById("firstName").value;
    objVar.lastName = document.getElementById("lastName").value;
    if(objVar.firstName == "" || objVar.lastName == "" ) {
        document.getElementById("button").addEventListener("click", start, {once:true});
        View.red();
        View.audio("smallError");
    } else {
        View.redOut();
        startBis();
    }
}

const startBis = async () => {
    window.removeEventListener("keydown", startEnter);
    var user = await Model.firstAndLast(objVar.firstName, objVar.lastName);
    if(user) {
        View.audio("succes");
        var number = [1,2,3,4,5,6,7,8,9];
        View.codeView(number);
        num();
    } else {
        document.getElementById("button").addEventListener("click", start, {once:true});
        View.audio("bigError");
        objVar.myAlert = "YOUR FIRST NAME OR YOUR LAST NAME IS INCORRECT";
        myAlertAll(objVar.myAlert, newStart)
    }
}

const newStart = () => {
    window.addEventListener("keydown", startEnter);
}

const num = () => {
    document.querySelectorAll(".number").forEach( x => {
        x.addEventListener("click", clickCode);
    }) 
    window.addEventListener("keydown", keyCode);
}

const clickCode = e => {
    e.path[0].style.background = "red";
    View.audio("bip");
    objVar.code += e.toElement.innerText;
    clickKeyCode(e.path[0]);
}

const keyCode = e => {
    var keyNum = document.getElementById(e.key);
    keyNum.style.background = "red";
    View.audio("bip");
    objVar.code += e.key;
    clickKeyCode(keyNum);
}

const clickKeyCode = params => {
    objVar.newArr.push(params);
    clearTimeout(objVar.time);
    color();
}

const color = () => {
   if(objVar.code.length < 4) {
        objVar.time = setTimeout( () => {
            objVar.code = "";
            originColor();
            View.audio("bigError");
        }, 3000) 
    } else {
        window.removeEventListener("keydown", keyCode);
        checkCode(objVar.code);
    }
}

const originColor = () => {
    objVar.newArr.forEach( x => {
        x.style.background = "aqua";
    })
}
    
const checkCode = async (code) => {
    if (code.length == 4) {
        objVar.arr = await Model.check(objVar.firstName, objVar.lastName, code);
        if(objVar.arr) {
            View.audio("succes");
            View.arr(objVar.arr);
            eventDel();
            addOne();
            editOne();
        } else {
            codeFalse();
        }
    }
}

const codeFalse = () => {
    objVar.tryCode ++
    if(objVar.tryCode == 3) {
        objVar.myAlert = "THE POLICE ARRIVE";
        View.myAlert(objVar.myAlert);
        View.delOk();
        View.audio("audioPolice");
    } else {
        objVar.myAlert = "YOUR CODE IS INVALID";
        View.audio("bigError");
        View.myAlert(objVar.myAlert);
        document.getElementById("ok").addEventListener("click", removeCode);
        window.addEventListener("keydown", myAlertOutEnter, {once:true});
    }
}

const myAlertOutEnter = e => {
    if (e.key == "Enter") {
        e.preventDefault();
        removeCode();
    }
}

const removeCode = () => {
    View.fadeOut();
    originColor();
    objVar.newArr = [];
    objVar.code = "";
    num();
}

const editOne = () => {
    document.querySelectorAll(".fa-pen-square").forEach( x => {
        x.addEventListener("click", function () {
            setPosition(this);
            objVar.oldId = this.parentNode.id;
            var oldFirst = $(this).parent().next().text();
            var oldLast = $(this).parent().next().next().text();
            var oldCode = $(this).parent().next().next().next().text();
            var oldRole = this.id;
            objVar.old = [objVar.oldId, oldFirst, oldLast, oldCode, oldRole];
            editTwo(oldRole);
        }) 
    })
}

const setPosition = x => {
    var position = x.getBoundingClientRect().top;
    View.top(position);
}

const editTwo = oldRole => {
    if(objVar.arr[0].roles == "manager") {
        editTwoManager(oldRole);
    } else if(objVar.arr[0].roles == "seller") {
        same();
    } else {
        View.addView();
        editThree();
    }
}

const editTwoManager = params => {
    if(params == "manager") {
        objVar.newRole = "manager";
        same();
    } else {
        View.audio("smallError");
        objVar.myAlert = "YOU ARE NOT ALLOWED TO MODIFY";
        myAlertAll(objVar.myAlert);
    }
}

const same = () => {
    View.addView();
    View.delNewRole();
    editThree();
}

const editThree = () => {
    btnAnnule();
    document.getElementById("form").addEventListener("click", editFour);
    window.addEventListener("keydown", editThreeKey);
}

const btnAnnule = () => {
    document.getElementById("annule").addEventListener("click", () => {
        timeForTop(View.topReal);
        View.edit();
        window.removeEventListener("keydown", addEnter);
    })
}

const timeForTop = callback => {
    setTimeout(() => {
        callback();
    },600);
}

const editThreeKey = e => {
    if (e.key == "Enter") {
        e.preventDefault();
        editFour();
    }
}

const editFour = async () => {
    window.removeEventListener("keydown", editThreeKey);
    View.audio("set");
    objVar.arrNew = [objVar.oldId];
    objVar.arrNew.push(...getArray(objVar.newRole));
    var editOk = await Model.edit(objVar.old, objVar.arrNew);
    View.edit();
    editFive(editOk);
    timeForTop(View.topReal);
}

const editFive = params => {
    if(params == "OK") {
        userInit();
    } else {
        objVar.myAlert = "THERE IS AN ERROR";
        myAlertAll(objVar.myAlert);
    }
}

const userInit = async () => {
    var user = await Model.check(objVar.arr[0].firstName, objVar.arr[0].lastName, objVar.arr[0].code);
    View.reset();
    View.arr(user);
    editOne();
    eventDel();
}

const eventDel = () => {
    document.querySelectorAll(".fa-trash-alt").forEach( x => {
        x.addEventListener("click", function () {
            var pos = this.getBoundingClientRect().top;
            View.topMyAlert(pos);
            objVar.myAlert = "ARE YOU SURE ?";
            View.myAlert(objVar.myAlert);
            ifNo();
            ifOk(this);
        })
    }) 
}

const ifNo = () => {
    var no = document.getElementById("no");
    no.style.display = "block";
    no.addEventListener("click", () => {
        View.fadeOut();
        timeForTop(View.topMyAlertReal);
    })
}

const ifOk = x => {
    document.getElementById("ok").addEventListener("click",  () => {
        eventDelTwo(x);
    })
    window.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            eventDelTwo(x);
        }
    },{once:true})
}

const eventDelTwo = async (x) => {
    timeForTop(View.topMyAlertReal);
    View.fadeOut();
    var ok = await Model.del(x.parentNode.id);
    if(ok == "OK") {
        View.audio("delete");
        View.slide(x);
    } else {
        objVar.myAlert = "THERE IS AN ERROR";
        myAlertAll(objVar.myAlert);
    }
}

const addOne = () => {
    document.getElementById("add").addEventListener("click", () => {
        View.addView();
        if(objVar.arr[0].roles == "manager") {
            View.delNewRole();
            objVar.newRole = "seller";
        }
        addTwo();
    })
}

const addTwo = () => {
    document.getElementById("form").addEventListener("click", addThree);
    btnAnnule();
    window.addEventListener("keydown", addEnter);
}

const addEnter = e => {
    if (e.key == "Enter") {
        e.preventDefault();
        addThree();
    }
}

const addThree = async () => {
    var array = getArray(objVar.newRole);
    var x = array.some(item => {return item == ""});
    if(x) {
        View.redForm();
        View.audio("smallError");
    } else {
        document.getElementById("form").removeEventListener("click", addThree);
        window.removeEventListener("keydown", addEnter);
        View.redFormOut();
        var ok = await Model.createAdd(array);
        addFour(ok);
    }   
}

const getArray = newRole => {
    var array = [];
    var newFistName = document.getElementById("newFirstName").value;           
    var newLastName = document.getElementById("newLastName").value;
    var newCode = document.getElementById("newCode").value;
    newRole += document.getElementById("newRole").value;
    array.push(newFistName,newLastName,newCode,newRole);
    return array
}

const addFour = params => {
    if(params == "OK") {
        userInit();
        View.audio("set");
    } else {
        objVar.myAlert = "THERE IS AN ERROR";
        myAlertAll(objVar.myAlert);
    }
}

const myAlertAll = (myAlert, callback) => {
    View.audio("bigError");
    View.myAlert(myAlert);
    document.getElementById("ok").addEventListener("click", () => {
        View.fadeOut();
        callback();
    })
    window.addEventListener("keydown", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            View.fadeOut();
            callback();
        }
    }, {once: true})
}






