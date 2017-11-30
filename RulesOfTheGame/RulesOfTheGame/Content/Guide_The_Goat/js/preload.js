var Preload = function(game){};

Preload.prototype = {

    preload: function () {
        this.game.load.spritesheet('player', root + 'Content/Guide_The_Goat/js/player.png', 56, 80, 27);
        this.game.load.spritesheet('key', root + 'Content/Guide_The_Goat/js/Key.png', 32, 32, 4);
        this.game.load.tilemap('tilemap', root + 'Content/Guide_The_Goat/js/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('tilemap', root + 'Content/Guide_The_Goat/js/level2.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', root + 'Content/Guide_The_Goat/js/Dirt2.png');
    },

    create: function () {
        this.game.state.start("Main");
    }
};