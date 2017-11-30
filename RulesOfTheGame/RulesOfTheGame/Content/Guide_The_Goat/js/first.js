$(function () {
    $("#sketch-holder").append('<script type="text/javascript">(function () {game = new Phaser.Game(600,400, Phaser.AUTO,"sketch-holder");game.state.add("Boot", Boot);game.state.add("Preload", Preload);game.state.add("GameTitle", GameTitle);game.state.add("Main", Main);game.state.add("GameOver", GameOver);game.state.start("Boot");})();</script>');
});