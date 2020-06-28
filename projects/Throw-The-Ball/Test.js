
window.onload = () => {

    // "Import" des classes box2dweb
let b2World = Box2D.Dynamics.b2World;
let b2Vec2 = Box2D.Common.Math.b2Vec2;
let b2ContactListener = Box2D.Dynamics.b2ContactListener;
let b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
let b2BodyDef = Box2D.Dynamics.b2BodyDef;
let b2Body = Box2D.Dynamics.b2Body;
let b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
let b2Fixture = Box2D.Dynamics.b2Fixture;
let b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
let b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;



let context = window.document.getElementsByTagName("canvas")[0].getContext('2d');
console.log('Début du code');

function CreateBall(_x,_y,_radius,_density) {
    // Créer la matière (b2body) pour la bille
    let billeBodyDef = new b2BodyDef();
    billeBodyDef.position.Set(_x/scale,_y/scale);
    billeBodyDef.type = b2Body.b2_staticBody;
    let billeBody = world.CreateBody(billeBodyDef);

    // Créer la fixture de la bille
    let billefixDef = new b2FixtureDef();
    billefixDef.shape = new b2CircleShape(_radius/scale);
    billefixDef.density = _density;
    billefixDef.friction = 10;
    billefixDef.restitution = 0.9;

    // Création de la fixture
    let billeFix = billeBody.CreateFixture(billefixDef);
    billeFix.SetUserData({name : 'bille'});

    return billeBody;
}

function CreateBox(_x,_y, _width, _height,_name){
    let boxBodyDef = new b2BodyDef();
    boxBodyDef.position.Set(_x/scale,_y/scale);
    boxBodyDef.type = b2Body.b2_staticBody;
    let boxBody = world.CreateBody(boxBodyDef);

    let boxFixDef = new b2FixtureDef();
    boxFixDef.shape = new b2PolygonShape();
    boxFixDef.shape.SetAsBox(_width/scale, _height/scale);
    
    let boxFix = boxBody.CreateFixture(boxFixDef);
    boxFix.SetUserData({name : _name});
    
    return boxBody;
}

function CreateTriangle(_x,_y){
    // Créer la matière (b2Body) pour le triangle
    let triBodyDef = new b2BodyDef();
    triBodyDef.position.Set(_x/scale,_y/scale);
    triBodyDef.type = b2Body.b2_dynamicBody;
    let triBody = world.CreateBody(triBodyDef);

    // Créer la b2Fixture de la bille
    let trifixDef = new b2FixtureDef();

    trifixDef.shape = new b2PolygonShape();
    let tabVec = [
        new b2Vec2(0,-1),
        new b2Vec2(-2,2),
        new b2Vec2(1,0)
        
    ];
    trifixDef.shape.SetAsArray(tabVec,3);

    trifixDef.density = 5;
    trifixDef.friction = 0.1;
    trifixDef.restitution = 1;
    triBody.CreateFixture(trifixDef);
}

// Zoom
let scale = 50;

// créer le monde
let gravity = new b2Vec2(0,10);
let world = new b2World(gravity);

// Sol 
CreateBox(40,600,1000,100,'box');

// Coin Gauche
CreateBox(0,39,10,1000000,'box')

// Coin Droit
CreateBox(800,39,10,1000000,'box')

// Plafond
CreateBox(300,0,1000000,10,'box');

// Tuyau Droit
CreateBox(750,359,5,50,'box');

// Tuyau Gauche
CreateBox(690,359,5,50,'box');

// Mur Gauche Poubelle
CreateBox(670,459,5,40,'box');

// Mur Droit Poubelle
CreateBox(770,459,5,40,'box');

// Sol Poubelle
CreateBox(720,495,44,5,'End');



// Préparer la simulation
let TimeStep = 1 / 60

let b = CreateBall(300,400,20,10);

        let angle = -60;
        let point = b.GetPosition();
function onKey() {
        const touchName = event.code;
for(let i = 0; i < 1000; i++){
    let trueAngle = angle
    let force = new b2Vec2(30,trueAngle);
    if (touchName === 'Space') {
        b.SetType(b2Body.b2_dynamicBody);
        b.ApplyImpulse(force, point);
    }
    if (touchName === 'ArrowUp') {

        trueAngle = angle -= 10;
        console.log(trueAngle);
    } 
    if (touchName === 'ArrowDown') {
        trueAngle = angle += 10;
        console.log(trueAngle);
    } 
    return;
}
    }

document.addEventListener('keydown', onKey);

// Définir la méthode d'affichage du débug
let debugDraw = new b2DebugDraw();
// Définir les propriétés d'affichage du débug
debugDraw.SetSprite(context);   // contexte
debugDraw.SetFillAlpha(0.3);    // transparence
debugDraw.SetLineThickness(1.0);    // épaisseur du trait
debugDraw.SetDrawScale(scale);  // Zoom sur l'affichage
// Affecter la méthode d'affichage du débug au monde 2dbox
debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
world.SetDebugDraw(debugDraw);

window.setInterval(() => {
    world.Step(TimeStep,10,10);
    
    // collision avec le sol 
    // on crée un listener
    let contactListener = new b2ContactListener();
    contactListener.BeginContact = (_contact) => {
        let fixA = _contact.GetFixtureA();
        let fixB = _contact.GetFixtureB();

        if(fixB.GetUserData().name == 'bille'){
            
        
        }
        if(fixA.GetUserData().name == 'End'){
            console.log(`
            
            
            
            WELL DONE
            
            
            
            `);
            b.SetType(b2Body.b2_staticBody);
        }
    };

    // on ajoute le listener
    world.SetContactListener(contactListener);
    world.DrawDebugData();
    world.ClearForces();
}, 100/6);
};



