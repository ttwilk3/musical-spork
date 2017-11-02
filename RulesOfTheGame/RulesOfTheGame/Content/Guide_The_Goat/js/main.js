var Main = function(game){

};

Main.prototype = {

	create: function() {

		//Start the Arcade Physics systems
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//Change the background colour
		this.game.stage.backgroundColor = "#a9f0ff";

		//Add the tilemap and tileset image. The first parameter in addTilesetImage
		//is the name you gave the tilesheet when importing it into Tiled, the second
		//is the key to the asset in Phaser
	    this.map = this.game.add.tilemap('tilemap','level1');
	    this.map.addTilesetImage('tiles');

	    //Add both the background and ground layers. We won't be doing anything with the
	    //GroundLayer though
	    this.backgroundlayer = this.map.createLayer('BackgroundLayer');
	    this.groundLayer = this.map.createLayer('GroundLayer');

	    //Before you can use the collide function you need to set what tiles can collide
	    this.map.setCollisionBetween(1, 100, true, 'GroundLayer');

	    //Add the sprite to the game and enable arcade physics on it
	    this.sprite = this.game.add.sprite(50, this.game.world.centerY, 'player');
	    this.game.physics.arcade.enable(this.sprite);

	    //Change the world size to match the size of this layer
	    this.groundLayer.resizeWorld();

	    //Set some physics on the sprite
		this.sprite.body.bounce.y = 0.2;
		this.sprite.body.gravity.y = 500;
		this.sprite.body.gravity.x = 20;
		this.sprite.body.velocity.x = 100;

		//Create a running animation for the sprite and play it
		this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
		this.sprite.animations.add('left', [16, 17, 18, 19], 10, true);

		//Make the camera follow the sprite
	    this.game.camera.follow(this.sprite);
	    this.keys = this.game.add.group();
	    this.keys.enableBody = true;
	    //  Create a star inside of the 'stars' group
        var key = this.keys.create(12600,6, 'key');
        this.game.physics.arcade.enable(key);
        //  Let gravity do its thing
        key.body.gravity.y = 300;

	    //Enable cursor keys so we can create some controls
	    this.cursors = this.game.input.keyboard.createCursorKeys();
	},

	update: function() {

		//Make the sprite collide with the ground layer
		this.game.physics.arcade.collide(this.sprite, this.groundLayer);
        this.game.physics.arcade.collide(this.keys, this.groundLayer);
		//  Reset the this.sprites velocity (movement)
        this.sprite.body.velocity.x = 0;

        if (this.cursors.left.isDown)
        {
            //  Move to the left
            this.sprite.body.velocity.x = -300;

            this.sprite.animations.play('left');
        }
        else if (this.cursors.right.isDown)
        {
            //  Move to the right
            this.sprite.body.velocity.x = 300;

            this.sprite.animations.play('right');
        }
        else
        {
            //  Stand still
            this.sprite.animations.stop();

            this.sprite.frame = 1;
        }

        //  Allow the this.sprite to jump if they are touching the ground.
        if (this.cursors.up.isDown)
        {
            this.sprite.body.velocity.y = -350;
        }

	},

	gameOver: function(){
		this.game.state.start('GameOver');
	},

};