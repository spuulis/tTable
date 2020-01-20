var canvas = document.getElementById('timesTable');
var ctx;

var mod = 200.000;
var mod2 = mod;
var multiplier = 2.000;
var direction = 0.01;

function init() {
    ctx = canvas.getContext("2d");

    var grd = ctx.createRadialGradient(300, 300, 0, 300, 300, 300);
    grd.addColorStop(0, "darkorange");
    grd.addColorStop(1, "darkred");
    ctx.strokeStyle = grd;
}

function tick() {
    update();
    draw();
    window.requestAnimationFrame(tick);
}

function update() {
    if(document.getElementById("auto").checked === true) {
        multiplier += parseFloat(document.getElementById("increment").value);
        multiplier = (multiplier + mod) % mod;
        document.getElementById("multiplier").value = (multiplier).toString(10);
        //console.log(multiplier);
    } else {
        multiplier = parseFloat(document.getElementById("multiplier").value);
    }
    document.getElementById("multiplier").step = document.getElementById("increment").value;
}

function draw() {
    ctx.lineWidth = 5;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(300, 300, 290, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth = 0.5;

    for(var i = 0; i < mod2; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.cos((Math.PI * 2 * i)/mod) * 290 + 300, Math.sin((Math.PI * 2 * i)/mod) * 290 + 300);
        ctx.lineTo(Math.cos((Math.PI * 2 * i * multiplier)/mod) * 290 + 300, Math.sin((Math.PI * 2 * i * multiplier)/mod) * 290 + 300);
        ctx.stroke();
    }

    //window.location = canvas.toDataURL("image/png");
}

if(typeof (canvas.getContext) !== undefined) {
    init();
    window.requestAnimationFrame(tick);
}