function $(selector) {
    return document.querySelector(selector);
}

const backgroundSpace = $("#space");
const context = backgroundSpace.getContext("2d");
const my_gradient = context.createLinearGradient(0, 0, 0, 170);
my_gradient.addColorStop(0, "black");
my_gradient.addColorStop(1, "white");
context.fillStyle = my_gradient;
context.fillRect(20, 20, 150, 100);