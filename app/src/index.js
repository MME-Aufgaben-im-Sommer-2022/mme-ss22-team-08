function init() {
    console.log("### Starting MME Project ###"); // eslint-disable-line no-console
    let button = document.querySelector("button");
    button.onclick = function() {
        console.log("clicked!"); // eslint-disable-line no-console
        window.location.replace("./pageLogin.html");
    };
}

init();