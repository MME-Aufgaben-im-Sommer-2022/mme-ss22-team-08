// eslint-disable-next-line no-undef
const client = new Appwrite.Client(),
    // eslint-disable-next-line no-undef
    account = new Appwrite.Account(client),
    // eslint-disable-next-line no-undef
    database = new Appwrite.Databases(client,"6324444bf0c125e7623c");
    // eslint-disable-next-line no-undef
    //users = new sdk.Users(client);

function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return match[2];
    }
    return null;
}

function setupServerConnection() {
    client
        .setEndpoint("https://appwrite.software-engineering.education/v1") // Your API Endpoint
        .setProject("62f0ca546a9a137d9df7");
}

function init() {
    setupServerConnection();
    let changeAmountButton = document.querySelector("#changeStartAmount"),
        changeMailButton = document.querySelector("#changeMail"),
        deleteItemsButton = document.querySelector("#deleteItems"),
        deleteSessionButton = document.querySelector("#deleteSession"),
        userId = getCookie("userId");
    changeAmountButton.onclick = function() {
        database.getDocument('63244466832556b90656', userId)
        .then(response => {
            console.log(response.data);
            let data = JSON.parse(response.data),
                meta = {
                    updateDate: data[0].updateDate,
                    startCredit: document.querySelector(".inputStartAmount").value,
            };
            data[0] = meta;
            console.log(JSON.stringify(data));
            updateData(JSON.stringify(data), userId);
        }, error => {
            console.log(error);
        });
    };
    changeMailButton.onclick = function() {
        let mailElement = document.querySelector(".inputNewMail"),
            passwordElement = document.querySelector(".inputPassword");
        account.updateEmail(mailElement.value, passwordElement.value)
            .then(response => {
                document.querySelector("#mailText").innerHTML = "Email-Adresse erfolgreich zu " + mailElement.value + " geändert.";
                mailElement.value = "";
                passwordElement.value = "";
                console.log(response);
            }, error => {
                console.log(error);
            });
    };
    deleteItemsButton.onclick = function() {
        let newData = {};
        database.updateDocument('63244466832556b90656', userId, {data: JSON.stringify(newData)})
            .then(response => {
                console.log(response);
                //parseJsonDoc(response.data);
            }, error => {
                console.log(error);
            });
    };
    deleteSessionButton.onclick = function() {
        document.cookie = "userId=";
        window.location.replace("./pageLogin.html");
    };
}



function updateData(newData, userId) {
    console.log(newData);
    database.updateDocument('63244466832556b90656', userId, {data: newData})
            .then(response => {
                console.log(response);
                //parseJsonDoc(response.data);
            }, error => {
                console.log(error);
            });
}

init();