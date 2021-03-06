var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',

    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var sky, jet, cursors, bomb, ammo;
var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'http://labs.phaser.io/assets/skies/space3.png');
    this.load.image('jet', 'assets/images/jet.png');
    this.load.image('bomb', 'assets/images/bomb.png');
    this.load.image('ammo', 'assets/images/ammo.png');
    this.load.image('coin', 'assets/images/coin.png');
}

function create() {
    sky = this.add.image(400, 300, 'sky');
    jet = this.physics.add.image(400 , 500,'jet').setScale(0.15).setOrigin(0.5,0)
    jet.setCollideWorldBounds(true)

    cursors = this.input.keyboard.createCursorKeys();
    this.input.on('pointerdown', shoot, this)

    bombs = this.physics.add.group({
        key: 'bomb',
        repeat: 3,
        setXY: {
            x:20, y:50, stepX: Phaser.Math.Between(10, config.width - 15), stepY: Phaser.Math.Between(15, 300)
        }
    })
}

function shoot() {
    ammo = this.physics.add.image(jet.x, jet.y, 'ammo').setScale(0.1)
    ammo.setRotation(-Phaser.Math.PI2 / 4);
    ammo.setVelocityY(-1000)
    this.physics.add.collider(ammo, bombs, destroyBomb, null, this)
}

function destroyBomb(ammo, bomb){
    bomb.disableBody(true,true)
    ammo.disableBody(true,true)
}

function update() {
    if (cursors.left.isDown) 
    {
        jet.setVelocityX(-300);
    }
    else if (cursors.right.isDown)
    {
        jet.setVelocityX(300);
    }
    else
    {
        jet.setVelocityX(0);
    }

    if (cursors.up.isDown)
    {
        jet.setVelocityY(-300);
    }
    else if (cursors.down.isDown)
    {
        jet.setVelocityY(300);
    }
    else
    {
        jet.setVelocityY(0);
    }

}
