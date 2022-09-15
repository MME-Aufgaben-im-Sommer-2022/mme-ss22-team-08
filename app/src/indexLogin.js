// eslint-disable-next-line no-undef
const client = new Appwrite.Client(),
    // eslint-disable-next-line no-undef
    account = new Appwrite.Account(client);

function setupServerConnection() {
    client
        .setEndpoint("https://appwrite.software-engineering.education/v1") // Your API Endpoint
        .setProject("62f0ca546a9a137d9df7");

    // Register User
    account.create('unique()', 'me@example.com', 'password', 'Tobi')
            .then(response => {
                console.log(response);
            }, error => {
                console.log(error);
            });
}

function init() {
    setupServerConnection();
    let button = document.querySelector("button");
    button.onclick = function() {
        window.location.replace("./pageMain.html");
    };
    

}

init();