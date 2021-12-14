class gameover extends Phaser.Scene {
  constructor() {
    super("gameover");

    // Put global variable here
  }

  preload() {
    // Preload all the assets here
    
    // Preload any images here
   

  }

  create() {
    console.log("*** gameover scene");

    this.add.image(0,0,'gameover').setOrigin(0,0);
    console.log("This is gameover Scene")

    //window.music = this.music


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

    // Add any text in the main page
    // this.add.text(90, 600, "Press spacebar to continue", {
    //   font: "30px Courier",
    //   fill: "#FFFFFF",
    // });

    // Create all the game animations here
  }
}