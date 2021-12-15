class main extends Phaser.Scene {
  constructor() {
    super({
      key: "main",
    });

    // Put global variable here
  }


  preload() {
    // Preload all the assets here
    
    // Preload any images here
    this.load.image('intro', 'assets/intro.png');
    this.load.image('gameover', 'assets/gameover.png'); 
    this.load.audio("restaurant", "assets/ping.mp3");
    this.load.audio("flour", "assets/censor.mp3"); 
    this.load.audio("tomatoes", "assets/windblow.mp3");
    this.load.image('gameover', 'assets/ping.mp3');
    


  }
  create() {
    console.log("*** main scene");

    this.add.image(0,0,'intro').setOrigin(0,0);
    console.log("This is intro")

    this.music = this.sound
    .add("tomatoes", {
     loop: true,
    })

    
    .setVolume(0.08); // 10% volume
    this.music.play()

    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music

    // Add image and detect spacebar keypress
    //this.add.image(0, 0, 'main').setOrigin(0, 0);

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
          
     
          this.scene.start("story", { playerPos: playerPos });
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