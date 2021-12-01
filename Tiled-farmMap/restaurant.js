class restaurant extends Phaser.Scene {

       constructor() {
           super({ key: 'restaurant' });
           
           // Put global variable here
       }
   
   
       init(data) {
           this.player = data.player
           this.inventory = data.inventory
       }
   
       preload() {
       //step 1 load Json
           this.load.tilemapTiledJSON("restaurant","assets/restaurant.json");
   

            // Step 2 : Preload any images here, nickname, filename
            this.load.image("pipoPng", "assets/Farm Tiled MA1/[A]Grass_pipo.png");
            this.load.image("farmPng", "assets/Farm Tiled MA1/farming_fishing.png")
            this.load.image("fencePng", "assets/Farm Tiled MA1/fence.png")
            this.load.image("fencealtPng", "assets/Farm Tiled MA1/fence_alt.png")
            this.load.image("plantsPng", "assets/Farm Tiled MA1/plants.png")
            this.load.image("tallgrassPng", "assets/Farm Tiled MA1/tallgrass.png")
       }

       create() {
        console.log('*** restaurant scene');

        let map = this.make.tilemap({key: "restaurant"});

        let pipoTiles = map.addTilesetImage("[A]Grass_pipo", "pipoPng");
        let farmTiles = map.addTilesetImage("farming_fishing", "farmPng");
        let fenceTiles = map.addTilesetImage("fence", "fencePng");
        let fencealtTiles = map.addTilesetImage("fence_alt", "fencealtPng");
        let plantsTiles = map.addTilesetImage("plants", "plantsPng");
        let tallgrassTiles = map.addTilesetImage("tallgrass", "tallgrassPng");
        

        let tileArray = [ pipoTiles, farmTiles, fenceTiles, fencealtTiles, plantsTiles, tallgrassTiles ]
      
             
              this.floorLayer = map.createLayer("floorLayer",tileArray, 0, 0);
              this.tableLayer = map.createLayer("tableLayer",tileArray, 0, 0);
              this.foodLayer = map.createLayer("foodLayer",tileArray, 0, 0);
         
         
              this.player = this.physics.add.sprite(980, 1400, "gurl").setScale(0.4)
          
              //enable debug
              window.player = this.player;
          
          
              this.player.setCollideWorldBounds(true); // don't go out of the this.map 
          
              // // create the arrow keys
               this.cursors = this.input.keyboard.createCursorKeys();
          
              // // camera follow player 
              this.cameras.main.startFollow(this.player);
          
              this.tableLayer.setCollisionByExclusion(-1, true)
  
  
              this.physics.add.collider(this.player, this.tableLayer);
          
          
                  
              }
          
              update() {
          
              //go back to worldmap, check for restaurant exit
              if ( this.player.x < 20
                  && this.player.y > 300 && this.player.y > 380 ) {
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
          
              // Function to jump to restaurant
            world(player, tile) {
              console.log("world function");
              
              // player.x = 352
              // player.y = 1103
          
              this.scene.start("world");
            }
          
              
          
          }