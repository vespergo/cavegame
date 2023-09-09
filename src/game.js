﻿var config = {
    type: Phaser.AUTO,
    backgroundColor: 'rgba(200, 200, 200, 1)',
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
var player;
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
    this.load.image('god', '/img/blocks/god.png');
    this.load.image('pattern', '/img/blocks/pattern.png');
    this.load.image('player', '/img/player.png');
    this.load.image('sun', '/img/sun.png');
}

function create() {

    this.add.image(config.width - 48, 30, 'sun');

    player = this.physics.add.sprite(30, config.height - 48, 'player');
    player.setCollideWorldBounds(true);   
    this.physics.world.gravity.y = 800;

    cursors = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });

    jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
       

    // tile placement
    this.input.on('pointerdown', function (pointer) {
        let block = this.physics.add.sprite(pointer.x, pointer.y, sessionStorage['currentTile']);
        block.setCollideWorldBounds(true);        

        // Enable collision between the player and the blocks
        this.physics.add.collider(player, block);                
        blocks.push(block);
    }, this);

    
}

function update()
{
    // Horizontal movement
    if (cursors.left.isDown) {
        player.setVelocityX(-200); // Move left
    } else if (cursors.right.isDown) {
        player.setVelocityX(200); // Move right
    } else {
        player.setVelocityX(0); // Stop horizontal movement
    }

    // Jumping mechanics
    if (jumpKey.isDown && player.body.onFloor()) {
        player.setVelocityY(-400); // Jump when on the ground
    }
    
}



