let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.font = "15px myFont";
let interval;
let derniereUpdate = Date.now()
let dt 
let maintenant
ctx.fillStyle = 'rgb(255, 255, 255)'


function run(){

    requestAnimationFrame(run);
    maintenant = Date.now ()
    dt = (maintenant-derniereUpdate)/1000
    derniereUpdate= maintenant
    update();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw(ctx)
}

function init() {

    load();
    requestAnimationFrame(run);
    //interval= setInterval(run,1000/60);

}

init();
