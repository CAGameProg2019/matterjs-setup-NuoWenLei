// // Write your code here
// let canvas = document.getElementById("main");
// let c = canvas.getContext('2d');
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Detector = Matter.Detector,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites;
let engine = Engine.create();
let render = Render.create({
    options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false
},
    element: document.body,
    engine: engine,

});
Engine.run(engine);
Render.run(render);

let mpos = {
    x: 0,
    y:0
};
let circle1 = {
    x: 500,
    y: 50
};
let circle2 = {
    x: 100,
    y:400
};
let circle3 = {
    x: 200,
    y:100
};
let circle4 = {
    x: 300,
    y: 200
};
let circle5 = {
    x: 150,
    y: 200
}
let circle6 = {
    x: 400,
    y: 300
}
let circle7 = {
    x: 300,
    y: 300
}
let circleHappened = false;
let newWallHappened = false;


// for(let i = 0; i < 100; i++){
//     let circle = Bodies.circle(window.innerWidth/2, 30, 5);
//     World.add(engine.world, [circle]);
// }
let ball=Bodies.circle(window.innerWidth/2+50, 300, 40);
let ball1 = Bodies.circle(circle1.x, circle1.y, 40, {render: {
    fillStyle: 'blue'
}, density: 2});
let ball2 = Bodies.rectangle(circle2.x, circle2.y, 40, 40);
// let ball3 = Bodies.rectangle(circle3.x, circle3.y, 40, 40);
// let ball4 = Bodies.rectangle(circle4.x, circle4.y, 40, 40);
// let ball5 = Bodies.rectangle(circle5.x, circle5.y, 40, 40);
// let ball6 = Bodies.rectangle(circle6.x, circle6.y, 40, 40);
// let ball7 = Bodies.rectangle(circle7.x, circle7.y, 40, 40);
// let floor=Bodies.trapezoid(window.innerWidth/2+100,window.innerHeight-100,window.innerWidth,100,.9,{isStatic: true});
let softBody =Composites.softBody(400, 30, 10, 10, 10, 10, true, 20);
let myCradle=Composites.newtonsCradle(600, 100, 8, 10, 160);
let rectangle = Bodies.rectangle(window.innerWidth/4, window.innerHeight*3/4, 500, 20, {density: 0.2});
// let floor = Bodies.rectangle(window.innerWidth/2, window., innerHeight, window.innerWidth, 30, {isStatic: true});
let ceiling = Bodies.rectangle(window.innerWidth/2, 0, window.innerWidth, 30, {isStatic: true});
let leftWall = Bodies.trapezoid(300, window.innerHeight*7/8, 500, 300, 1, {isStatic: true});
let rightWall = Bodies.trapezoid(window.innerWidth-300, window.innerHeight*7/8, 500, 300,1, {isStatic: true});
let floor = Bodies.rectangle(window.innerWidth*3/4, window.innerHeight, window.innerWidth/2, 20, {isStatic: true});
let floor1 = Bodies.trapezoid(0, window.innerHeight/6, 700, 100, 1, {isStatic: true});
// let detector = Detector.canCollide(
//     ball1,
//     ball2
// );

// if(detector){
//     ball1.render:
//     {
//         fillStyle: 'red'
//     };
// }
// let anchorPoint1 = {x: circle1.x, y: circle1.y};
// let anchorPoint2 = {x: circle2.x, y: circle2.y};
let anchorPointA = {x: window.innerWidth/4, y: window.innerHeight*3/4};

let constraint = Constraint.create({
    pointA: anchorPointA,
    bodyB: rectangle
});
function createTower(x, y) {
    return Bodies.rectangle(x, y, 40, 40, {
        density: 0.000001,
        friction: .6
    });
}

let tower = Composites.stack(800, 395, 5, 4, 0, 0, createTower);

World.add(engine.world, [ ball1, constraint, rectangle, ball2, tower, floor]);

let world = engine.world;
let Mouse= Matter.Mouse;
let MouseConstraint=Matter.MouseConstraint;
let mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine, {mouse: mouse});

World.add(world, mouseConstraint);
render.mouse = mouse;


window.addEventListener('mousemove', function(event){
    mpos.x = event.clientX;
    mpos.y = event.clientY;
})
window.addEventListener('keydown', function(event){
    if (event.key == 'w' && !circleHappened){
        for(let i = 0; i < 100; i++){
            let circle = Bodies.circle(window.innerWidth*4/10, 50, 1);
            World.add(engine.world, [circle]);
        }
        for(let i = 0; i < 100; i++){
            let circle = Bodies.circle(window.innerWidth*6/10, 50, 1);
            World.add(engine.world, [circle]);
        }
        circleHappened = true;

    }
    if(event.key == 's' && !newWallHappened){
        let leftllaW = Bodies.trapezoid(300, window.innerHeight*3/8, 630, -300, 1, {isStatic: true});
        let rightllaW = Bodies.trapezoid(window.innerWidth-300, window.innerHeight*3/8, 630, -300,1, {isStatic: true});
        let ritWall = Bodies.trapezoid(300, window.innerHeight/8-35, 630, 300, 1, {isStatic: true});
        let lftWall = Bodies.trapezoid(window.innerWidth-300, window.innerHeight/8-35, 630, 300, 1, {isStatic:true});
        World.add(engine.world, [leftllaW, rightllaW, ritWall, lftWall]);
        newWallHappened = true;
        console.log(mpos);
    }
    if(event.key == 'n'){
        let newBall = Bodies.circle(circle1.x, circle1.y, 40, {render: {
            fillStyle: 'blue'
        }, density: 2});
        World.add(engine.world, [newBall]);
    }
    if(event.key == 'm'){
        let newRock= Bodies.rectangle(circle2.x, circle2.y, 40, 40);
        World.add(engine.world, [newRock]);
    }
    if(event.key == 'b'){
        Matter.Body.setAngle(rectangle, Math.PI);
        Matter.Body.setVelocity(rectangle, {x: 0, y:0});
        console.log('hi');
    }

});
