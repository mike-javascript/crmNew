const firstAndLast = async (first, last) => {
    var user = "";
    var settings = {
        "url": "https://catch-meir-ca532e.appdrag.site/api/firstAndLast",
        "data": {
            "firstName" : first,
            "lastName" : last
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    await $.ajax(settings).done( response => {
        if(response.Table.length > 0) {
            user = true;
        } else {
            user = false;
        }
    });
    return user
}

const check = async (first, last, code) => {
    var user = true;
    var settings = {
        "url": "https://catch-meir-ca532e.appdrag.site/api/check",
        "data": {
            "firstName": first,
            "lastName": last,
            "code": code,
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    await $.ajax(settings).done( response => {
        if(response.Table.length > 0) {
            user = roles(response);
        } else {
            user = false;
        }
    });
    return user
}

const roles = async (params) => {
    var role = [];
    switch (params.Table[0].roles) {
        case "admin":
            role = all();
            break;
        case "manager":
            role = await all();
            role.shift();
            break;
        case "seller":
            role = params.Table;
            break;   
    }
    return role
}

const all = async () => {
    var arr = []
    var settings = {
        "url": "https://catch-meir-ca532e.appdrag.site/api/all",
        "data": {
            "AD_PageNbr" : "1",
            "AD_PageSize" : "500"
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    await $.ajax(settings).done( response => {
        arr = response.Table; 
    });
    return arr
}

const del = async (id) => { 
    var ok = "";
    var settings = {
        "url": "https://catch-meir-ca532e.appdrag.site/api/delete",
        "data": {
            "id" : id
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    await $.ajax(settings).done(function (response) {
        ok = response.status;  
    });
    return ok
}

const createAdd = async (x) => { 
    var ok = "";
    var settings = {
        "url": "https://catch-meir-ca532e.appdrag.site/api/add",
        "data": {
            "firstName" : x[0],
            "lastName" : x[1],
            "code" : x[2],
            "roles" : x[3]
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    await $.ajax(settings).done(function (response) {
        ok = response.status; 
    });
    return ok
}

const edit = async (old, arrNew) => {
    for (let i = 0; i < arrNew.length; i++) {
        if(arrNew[i] == "") {
            arrNew[i] = old[i]
        }
    }
    var ok = "";
    var settings = {
        "url": "https://catch-meir-ca532e.appdrag.site/api/edit",
        "data": {
            "id" : arrNew[0],
            "firstName" : arrNew[1],
            "lastName" : arrNew[2],
            "code" : arrNew[3],
            "roles" : arrNew[4]
        },
        "method": "POST",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    await $.ajax(settings).done(function (response) {
        ok = response.status;
    });
    return ok
}

export { firstAndLast, check, del, createAdd, edit } 