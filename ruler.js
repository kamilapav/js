class ruler extends Phaser.Scene {
  constructor() {
    super({
      key: "ruler",
    });

  }


  preload() {

    // Preload any images here
    this.load.image('ruler', 'assets/ruler.png');

  }
  create() {
    console.log("*** ruler scene");

    this.add.image(0,0,'ruler').setOrigin(0,0);
    console.log("This is ruler")

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
      spaceDown.on(
        "down",
        function () {
          console.log("Jump to world scene");
  
          let playerPos = {};
          playerPos.x = 700;
          playerPos.y = 2895;
          playerPos.dir = "back";
        
          this.scene.start("world", { playerPos: playerPos });
        },
        this
      );

    }
  }