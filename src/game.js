/// <reference path="phaser.js" />

var config = {
    type: Phaser.AUTO,
    backgroundColor: 'rgba(46, 56, 201, 1)',
    parent: 'game',
    width: 640,
    height: 360,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
let playerContainer;
let player;
let pickAxe;

let cursors;
let jumpKey;
let blocks = [];

function preload() {
    this.load.image('marble', '/img/blocks/marble.png');
    this.load.image('water', '/img/blocks/water.png');
    this.load.image('lava', '/img/blocks/lava.png');
    this.load.image('grass', '/img/blocks/grass.png');
    this.load.image('dirt', '/img/blocks/dirt.png');
    this.load.image('bedrock', '/img/blocks/bedrock.png');
    this.load.image('stone', '/img/blocks/stone.png');
    this.load.image('commandblock', '/img/blocks/commandblock.png');
    this.load.image('pattern', '/img/blocks/pattern.png');
    this.load.image('coal', '/img/blocks/coal.png');
    this.load.image('gold', '/img/blocks/gold.png');
    this.load.image('diamond', '/img/blocks/diamond.png');
    this.load.image('iron', '/img/blocks/iron.png');
    this.load.image('player', '/img/player.png');
    this.load.image('sun', '/img/sun.png');
    this.load.image('pickaxe', '/img/items/wooden_pickaxe.png');
    this.load.image('coal_block', '/img/blocks/coal_block.png');
    this.load.image('diamond_block', '/img/blocks/diamond_block.png');
    this.load.image('gold_block', '/img/blocks/gold_block.png');
    this.load.image('silver_ore', '/img/blocks/silver_ore.png');
    this.load.image('iron_block', '/img/blocks/iron_block.png');
}

function create() {

    this.add.image(config.width - 48, 30, 'sun');
    playerContainer = this.add.container(16, config.height - 48);
    playerContainer.setSize(32, 96);
    player = this.add.sprite(0, 0, 'player');
    pickAxe = this.add.sprite(0, 0, 'pickaxe');
    playerContainer.add(player);
    playerContainer.add(pickAxe);

    this.physics.world.enable(playerContainer);
    playerContainer.body.setCollideWorldBounds(true);
    this.physics.world.gravity.y = 800;

    cursors = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });

    jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    //debug
    console.log(`cont x:${playerContainer.x} cont y:${playerContainer.y}, width:${playerContainer.width}, height:${playerContainer.height}`);

    // tile placement
    this.input.on('pointerdown', function (pointer) {
        let block = this.physics.add.sprite(pointer.x, pointer.y, sessionStorage['currentTile']);
        block.setCollideWorldBounds(true);        
        block.setPushable(false);
        
        // Enable collision between the player and the blocks
        this.physics.add.collider(block, blocks);   
        this.physics.add.collider(block, playerContainer);
        blocks.push(block);
    }, this);

    
}

function update()
{
    // Horizontal movement
    if (cursors.left.isDown) {
        playerContainer.body.setVelocityX(-200); // Move left
    } else if (cursors.right.isDown) {
        playerContainer.body.setVelocityX(200); // Move right
    } else {
        playerContainer.body.setVelocityX(0); // Stop horizontal movement
    }

    // Jumping mechanics
    if (jumpKey.isDown && playerContainer.body.onFloor()) {
        playerContainer.body.setVelocityY(-400); // Jump when on the ground
    }
    
}



