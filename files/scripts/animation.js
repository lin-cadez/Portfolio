const text = document.getElementById("text").textContent;
let variable = 0;
function typeWriter() {
    text.length > variable
        ? ((document.getElementById("text").innerHTML = text.substring(0, variable + 1)),
          variable++,
          setTimeout(typeWriter, 50))
        : (variable = 0);
}
window.onload = function () {
    typeWriter();
}
