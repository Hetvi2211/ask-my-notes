document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const button = document.querySelector("button");

    form.addEventListener("submit", () => {
        button.innerText = "Generating...";
        button.disabled = true;
    });

});