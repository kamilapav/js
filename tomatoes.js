class tomatoes extends Phaser.Scene {

       constructor() {
           super({ key: 'tomatoes' });
           
           // Put global variable here
       }
   
   
       init(data) {
           this.player = data.player
           this.inventory = data.inventory
       }
   
       preload() {
       //step 1 load Json
       this.load.tilemapTiledJSON("tomatoes","assets/tomatoes.json");

       
        // Step 2 : Preload any images here, nickname, filename
       this.load.image("pipoPng", "assets/Farm Tiled MA1/[A]Grass_pipo.png");
       this.load.image("farmPng", "assets/Farm Tiled MA1/farming_fishing.png")
       this.load.image("fencePng", "assets/Farm Tiled MA1/fence.png")
       this.load.image("fencealtPng", "assets/Farm Tiled MA1/fence_alt.png")
       this.load.image("plantsPng", "assets/Farm Tiled MA1/plants.png")
       this.load.image("tallgrassPng", "assets/Farm Tiled MA1/tallgrass.png")
       }
   
       create() {
        console.log('*** tomatoes scene');

        let map = this.make.tilemap({key: "tomatoes"});

        let pipoTiles = map.addTilesetImage("[A]Grass_pipo", "pipoPng");
        let farmTiles = map.addTilesetImage("farming_fishing", "farmPng");
        let fenceTiles = map.addTilesetImage("fence", "fencePng");
        let fencealtTiles = map.addTilesetImage("fence_alt", "fencealtPng");
        let plantsTiles = map.addTilesetImage("plants", "plantsPng");
        let tallgrassTiles = map.addTilesetImage("tallgrass", "tallgrassPng");
        

        let tileArray = [ pipoTiles, farmTiles, fenceTiles, fencealtTiles, plantsTiles, tallgrassTiles ]
      
              this.grassLayer = map.createLayer("grassLayer",tileArray, 0, 0);
              this.grasspipoLayer = map.createLayer("grasspipoLayer",tileArray, 0, 0);
              this.tallgrassLayer = map.createLayer("tallgrassLayer",tileArray, 0, 0);
              this.tomatoesLayer = map.createLayer("tomatoesLayer",tileArray, 0, 0);
              
         


              this.physics.world.bounds.width = this.tomatoesLayer.width; 
              this.physics.world.bounds.height = this.tomatoesLayer.height;
          
              this.player = this.physics.add.sprite(1920, 1229, "gurl").setScale(0.4)

          
              //enable debug
              window.player = this.player;
          
          
              this.player.setCollideWorldBounds(true); // don't go out of the this.map 
          
              // // create the arrow keys
               this.cursors = this.input.keyboard.createCursorKeys();
          
              // // camera follow player 
              this.cameras.main.startFollow(this.player);
          
              this.tallgrassLayer.setCollisionByExclusion(-1, true)
  
  
              this.physics.add.collider(this.player, this.tallgrassLayer);
          
          
                  
              }
          
              update() {
          
              //go back to worldmap, check for tomatoes exit
              if ( this.player.x < 622 && 
                     this.player.x < 342 && 
                     this.player.y > 338 &&
                     this.player.y > 611 ) {
                      this.world();
                  }
          
              if (this.cursors.left.isDown) {
                  this.player.body.setVelocityX(-200);
                  this.player.anims.play("left", true); 
                  } 
                  else if (this.cursors.right.isDown) {
                  this.player.body.setVelocityX(200);
                  this.player.anims.play("right", true);
                  } 
                  else if (this.cursors.up.isDown) {
                  this.player.body.setVelocityY(-200);
                  this.player.anims.play("front", true);
                  //console.log('front');
                  } 
                  else if (this.cursors.down.isDown) {
                  this.player.body.setVelocityY(200);
                  this.player.anims.play("back", true);
                  //console.log('back');
                  } 
                  else {
                  this.player.anims.stop(); 
                  this.player.body.setVelocity(0, 0);
                  }
              }
          
              // Function to jump tomatoes
            world(player, tile) {
              console.log("world function");
              
              this.scene.start("world");
            }
          
              
          
          }