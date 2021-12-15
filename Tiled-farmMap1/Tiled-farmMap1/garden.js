class garden extends Phaser.Scene {

       constructor() {
           super({ key: 'garden' });
           
           // Put global variable here
       }
   
   
       init(data) {
           this.player = data.player
           this.inventory = data.inventory
       }
   
       preload() {
       //step 1 load Json
           this.load.tilemapTiledJSON("garden","assets/garden.json");
   
            // Step 2 : Preload any images here, nickname, filename
            this.load.image("pipoPng", "assets/Farm Tiled MA1/[A]Grass_pipo.png");
            this.load.image("farmPng", "assets/Farm Tiled MA1/farming_fishing.png")
            this.load.image("fencePng", "assets/Farm Tiled MA1/fence.png")
            this.load.image("fencealtPng", "assets/Farm Tiled MA1/fence_alt.png")
            this.load.image("plantsPng", "assets/Farm Tiled MA1/plants.png")
            this.load.image("tallgrassPng", "assets/Farm Tiled MA1/tallgrass.png")
    
   
       }
   
       create() {
              console.log('*** garden scene');
      
              let map = this.make.tilemap({key: "garden"});
      
              let pipoTiles = map.addTilesetImage("[A]Grass_pipo", "pipoPng");
              let farmTiles = map.addTilesetImage("farming_fishing", "farmPng");
              let fenceTiles = map.addTilesetImage("fence", "fencePng");
              let fencealtTiles = map.addTilesetImage("fence_alt", "fencealtPng");
              let plantsTiles = map.addTilesetImage("plants", "plantsPng");
              let tallgrassTiles = map.addTilesetImage("tallgrass", "tallgrassPng");
              

              let tileArray = [ pipoTiles, farmTiles, fenceTiles, fencealtTiles, plantsTiles, tallgrassTiles ]
      

              this.soilLayer = map.createLayer("soilLayer",tilesArray, 0, 0);
              this.groundLayer = map.createLayer("groundLayer",tilesArray, 0, 0);
              this.plantLayer = map.createLayer("plantLayer",tilesArray, 0, 0);
              this.grassLayer = map.createLayer("grassLayer",tilesArray, 0, 0);

              this.physics.world.bounds.width = this.gardenLayer.width; 
              this.physics.world.bounds.height = this.gardenLayer.height;
          
              this.player = this.physics.add.sprite(639, 1005, "right");
          
              //enable debug
              window.player = this.player;
          
          
              this.player.setCollideWorldBounds(true); // don't go out of the this.map 
          
              // // create the arrow keys
               this.cursors = this.input.keyboard.createCursorKeys();
          
              // // camera follow player 
              this.cameras.main.startFollow(this.player);
          
              flourLayer.setCollisionByExclusion(-1, true)
              this.flourfactoryLayer.setCollisionByExclusion(-1, true)
         
          
              this.physics.add.collider(this.player, this.gardenLayer);
              this.physics.add.collider(this.player, this.gardenLayer);
           
          
          
                  
              }
          
              update() {
          
              //go back to worldmap, check for garden exit
              if ( this.player.x > 1603 && this.player.x < 1633
                     && this.player.y > 400 && this.player.y < 405 ) {
             
                      this.garden();
                  }
          
              if (this.cursors.left.isDown) {
                  this.player.body.setVelocityX(-300);
                  this.player.anims.play("left", true); 
                  } 
                  else if (this.cursors.right.isDown) {
                  this.player.body.setVelocityX(300);
                  this.player.anims.play("right", true);
                  } 
                  else if (this.cursors.up.isDown) {
                  this.player.body.setVelocityY(-300);
                  this.player.anims.play("front", true);
                  //console.log('front');
                  } 
                  else if (this.cursors.down.isDown) {
                  this.player.body.setVelocityY(300);
                  this.player.anims.play("back", true);
                  //console.log('back');
                  } 
                  else {
                  this.player.anims.stop(); 
                  this.player.body.setVelocity(0, 0);
                  }
              }
          
              // Function to jump to room1
            world(player, tile) {
              console.log("world function");
              
              // player.x = 352
              // player.y = 1103
          
              this.scene.start("world");
            }
          
              
          
          }
          