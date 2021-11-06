let app = new PIXI.Application({ width: 640, height: 360 });
document.body.appendChild(app.view);

let marble = PIXI.Texture.from('/img/blocks/marble.png');

let background = new PIXI.Sprite(PIXI.Texture.BLACK);
background.width = app.screen.width;
background.height = app.screen.height;
background.interactive = true;
background.on('pointerdown', Test);
app.stage.addChild(background);

let decayTimer = 1;

app.ticker.add((delta) => {

    decayTimer++;
    if (app.stage.children.length > 1 && decayTimer % 500 == 0)
        app.stage.removeChild(app.stage.children[1]);

    for (var i = 1; i < app.stage.children.length; i++) {
        let child = app.stage.children[i];

        if (child.y + child.height <= app.screen.height) {
            child.x += 1;
            child.y += 2
        }
    }
});


function Test(e) {
    let sprite = new PIXI.Sprite(marble);
    sprite.x = e.data.global.x;
    sprite.y = e.data.global.y;
    app.stage.addChild(sprite);
}
