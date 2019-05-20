// // Write your code here
// let canvas = document.getElementById("main");
// let c = canvas.getContext('2d');
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
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
    x: 200,
    y: 50
};
let circle2 = {
    x: 200,
    y:80
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
    fillStyle: '#18181D',
    strokeStyle: '#18181D'
}});
let ball2 = Bodies.circle(circle2.x, circle2.y, 40, {render: {
    fillStyle: '#18181D',
    strokeStyle: '#18181D'
}});
let ball3 = Bodies.circle(circle3.x, circle3.y, 40, {render: {
    fillStyle: '#18181D',
    strokeStyle: '#18181D'
}});
let ball4 = Bodies.circle(circle4.x, circle4.y, 40, {render: {
    fillStyle: '#18181D',
    strokeStyle: '#18181D'
}});
let ball5 = Bodies.circle(circle5.x, circle5.y, 40, {render: {
    fillStyle: '#18181D',
    strokeStyle: '#18181D'
}});
let ball6 = Bodies.circle(circle6.x, circle6.y, 40, {render: {
    fillStyle: '#18181D',
    strokeStyle: '#18181D'
}});
let ball7 = Bodies.circle(circle7.x, circle7.y, 40, {render: {
    fillStyle: '#18181D',
    strokeStyle: '#18181D'
}});
// let floor=Bodies.trapezoid(window.innerWidth/2+100,window.innerHeight-100,window.innerWidth,100,.9,{isStatic: true});
let softBody =Composites.softBody(400, 30, 10, 10, 10, 10, true, 20);
let myCradle=Composites.newtonsCradle(600, 100, 8, 10, 160);
let rectangle = Bodies.rectangle(50, 50, 50, 50);
// let floor = Bodies.rectangle(window.innerWidth/2, window., innerHeight, window.innerWidth, 30, {isStatic: true});
let ceiling = Bodies.rectangle(window.innerWidth/2, 0, window.innerWidth, 30, {isStatic: true});
let leftWall = Bodies.trapezoid(300, window.innerHeight*7/8, 500, 300, 1, {isStatic: true});
let rightWall = Bodies.trapezoid(window.innerWidth-300, window.innerHeight*7/8, 500, 300,1, {isStatic: true});
// let anchorPoint1 = {x: circle1.x, y: circle1.y};
// let anchorPoint2 = {x: circle2.x, y: circle2.y};
let anchorPointA = {x: window.innerWidth/2, y: 50};
let anchorPointB = {x: 50, y: window.innerHeight/2};
let anchorPointC = {x: window.innerWidth-50, y: window.innerHeight/2};
let anchor1 = Constraint.create({
    pointA: anchorPointA,
    bodyB: ball1,
    stiffness: 0.7

});
let anchor = Constraint.create({
    pointA: circle1,
    pointB: circle2,
    bodyA: ball1,
    bodyB: ball2,
    stiffness: 0.7,
    render: {
        fillStyle: '#18181D',
        strokeStyle: '#18181D'
    }
});
let anchor2 = Constraint.create({
    pointA: circle2,
    pointB: circle3,
    bodyA: ball2,
    bodyB: ball3,
    stiffness: 0.7,
    render: {
        fillStyle: '#18181D',
        strokeStyle: '#18181D'
    }
});
let anchor3 = Constraint.create({
    pointA: anchorPointB,
    bodyB: ball4,
    stiffness: 0.7

});
let anchor4 = Constraint.create({
    pointA: circle4,
    pointB: circle5,
    bodyA: ball4,
    bodyB: ball5,
    render: {
        fillStyle: '#18181D',
        strokeStyle: '#18181D'
    }
});
let anchor5 = Constraint.create({
    pointA: anchorPointC,
    bodyB: ball6,
    stiffness: 0.7
});
let anchor6 = Constraint.create({
    pointA: circle6,
    pointB: circle7,
    bodyA: ball6,
    bodyB: ball7,
    render: {
        fillStyle: '#18181D',
        strokeStyle: '#18181D'
    }
});
// let wall = Bodies.circle(0, window.innerHeight-50, 200, {isStatic: true});
// let wall1 = Bodies.circle(300, window.innerHeight-50, 200, {isStatic: true});
// let wall2 = Bodies.circle(600, window.innerHeight-50, 200, {isStatic: true});

World.add(engine.world, [ ceiling, ball1, ball2, ball3, ball4, ball5, ball6, ball7, anchor1, anchor, anchor2, anchor3, anchor4, anchor5, anchor6]);

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

})
