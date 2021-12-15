class story extends Phaser.Scene {
  constructor() {
    super({
      key: "story",
    });

  }


  preload() {

    // Preload any images here
    this.load.image('storyline', 'assets/storyline.png');

  }
  create() {
    console.log("*** storyline scene");

    this.add.image(0,0,'storyline').setOrigin(0,0);
    console.log("This is storyline")

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
          
          this.scene.start("ruler", { playerPos: playerPos });
        },
        this
      );

    }
  }