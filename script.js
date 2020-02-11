function $(selector) {
    return document.querySelector(selector);
}

const backgroundSpace = $("#space");
const context = backgroundSpace.getContext("2d");
const my_gradient = context.createLinearGradient(0, 0, 0, 170);
my_gradient.addColorStop(0, "blue");
my_gradient.addColorStop(1, "blue");
context.fillStyle = my_gradient;
context.fillRect(0, 0, 400, 400)