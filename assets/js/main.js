var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#3e6ff',
    physics: {
    	default: 'arcade',
    	arcade: {
    		gravity: { y: 300 }
    	}
    },
    scene: {
    	preload: preload,
    	create: create,
    	update: update
    }
};
 
var game = new Phaser.Game(config);

function preload () {
	this.load.image('sky', 'assets/sprites/sky.png');
	this.load.image('ground', 'assets/sprites/platform.png');
	this.load.image('star', 'assets/sprites/star.png');
	this.load.atlas(
		'hamtaro',
		'assets/sprites/hamham.png',
		'assets/sprites/hamtaro.json'
	)
}

function create () {
	ceu = this.add.image(400, 300, 'sky').setScale(4);
	piso = this.physics.add.staticGroup();
	piso.create(0, 968, 'ground').setScale(3).refreshBody();
	piso.create(250, 600, 'ground');
	pisoSecond = this.physics.add.staticGroup();
	pisoSecond.create(0, 968, 'ground').setScale(3).refreshBody();
	pisoSecond.create(700, 400, 'ground');
	personagem = this.physics.add.sprite(400, 400, 'hamtaro');
	personagem.setBounce(0.2);
	personagem.setCollideWorldBounds(true);
	estrelas = this.physics.add.group({
		key: 'star',
		repeat: 20,
		setXY: { x: 30, y: 0, stepX: 75 }
	});
	contador = this.add.text(100, 100,'contador',0)
	this.contador = 0;

	cursors = this.input.keyboard.createCursorKeys();
	this.physics.add.collider(personagem, piso);
	this.physics.add.collider(estrelas, piso);
	this.physics.add.collider(personagem, pisoSecond);
	this.physics.add.collider(estrelas, pisoSecond);
	titulo = this.add.text(100, 50, 'Hamtarooo!',{
		fontFamily: 'Arial',
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white'
	});
	this.anims.create({ 
    key: 'esquerda', 
    frames: this.anims.generateFrameNames('hamtaro', { 
        prefix: 'hamtaro_', 
        start: 4,
        end: 6            
    }),
    repeat: -1,
    duration: 300
  	});
	this.anims.create({ 
    key: 'direita', 
    frames: this.anims.generateFrameNames('hamtaro', { 
        prefix: 'hamtaro_', 
        start: 1,
        end: 3            
    }),
    repeat: -1,
    duration: 300
  });
 
  this.anims.create({ 
    key: 'parado', 
    frames: this.anims.generateFrameNames('hamtaro', { 
      prefix: 'hamtaro_', 
      start: 11,
      end: 12
    }),
    repeat: -1,
    duration: 300
  });
  this.physics.add.overlap(
	personagem,
	estrelas,
	pegarEstrela,
	null,
	this
	);
}

function update () {
	if (cursors.left.isDown) {
		personagem.setVelocityX(-160);
		personagem.anims.play('esquerda', true);
	}
	else if(cursors.right.isDown) {
		personagem.setVelocityX(160);
		personagem.anims.play('direita', true);
	}
	else if(cursors.up.isDown && personagem.body.touching.down){
		personagem.setVelocityY(-350);
	}
	else{
		personagem.setVelocityX(0);
		personagem.anims.play('parado');
	}
}
function pegarEstrela (personagem, star) {
  star.disableBody(true, true);
  this.contador = this.contador+1;
contador.setText(`contador: ${this.contador}`)
}
