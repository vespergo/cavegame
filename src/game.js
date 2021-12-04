
let app = new PIXI.Application({ width: 640, height: 360 });
document.body.appendChild(app.view);
PIXI.settings.TARGET_FPMS = 0.03;

let marble = PIXI.Texture.from('/img/blocks/marble.png');
let water = PIXI.Texture.from('/img/blocks/water.png');
let lava = PIXI.Texture.from('/img/blocks/lava.png');
let grass = PIXI.Texture.from('/img/blocks/grass.png');
let dirt = PIXI.Texture.from('/img/blocks/dirt.png');
let bedrock = PIXI.Texture.from('/img/blocks/bedrock.png');
let stone = PIXI.Texture.from('/img/blocks/stone.png');

let background = new PIXI.Sprite(PIXI.Texture.BLACK);
background.width = app.screen.width;
background.height = app.screen.height;
background.interactive = true;
background.on('pointerdown', Test);
app.stage.addChild(background);


app.ticker.add((delta) => {

    for (var i = 1; i < app.stage.children.length; i++) {
        let child = app.stage.children[i];

        if (child.moving) {

            //collision with previous block
            for (let x = 1; x < app.stage.children.length; x++) {
                let item = app.stage.children[x];
                if (item !== child && Collision(child, item)) {
                    child.moving = false;
                    break;
                }
            }
        }

        if (child.moving) {
            //lower bounds
            if (child.y + child.height <= app.screen.height) {
                child.y += 2
            } else {
                child.moving = false;
            }
        }
        
    }
});


function Test(e) {
    sprite = GetCurrentTile();
    sprite.x = e.data.global.x;
    sprite.y = e.data.global.y;
    sprite.moving = true;
    app.stage.addChild(sprite);
}

function Collision(a, b) {
    var ab = a.getBounds();
    var bb = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

function GetCurrentTile() {
    let sprite;
    if (sessionStorage['currentTile'] == 'marble')
        sprite = new PIXI.Sprite(marble);
    else if (sessionStorage['currentTile'] == 'water')
        sprite = new PIXI.Sprite(water);
    else if (sessionStorage['currentTile'] == 'lava')
        sprite = new PIXI.Sprite(lava);
    else if (sessionStorage['currentTile'] == 'grass')
        sprite = new PIXI.Sprite(grass);
    else if (sessionStorage['currentTile'] == 'bedrock')
        sprite = new PIXI.Sprite(bedrock);
    else if (sessionStorage['currentTile'] == 'stone')
        sprite = new PIXI.Sprite(stone);
    else if (sessionStorage['currentTile'] == 'dirt')
        sprite = new PIXI.Sprite(dirt);

    return sprite;
}
