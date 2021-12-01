class flourfactory extends Phaser.Scene {

       constructor() {
           super({ key: 'flourfactory' });
           window.holdpresent = 0
           // Put global variable here
       }
   
   
       init(data) {
           this.player = data.player
           this.inventory = data.inventory
       }
   
       preload() {
       //step 1 load Json
           this.load.tilemapTiledJSON("factory","assets/factory.json");


       // Step 2 : Preload any images here, nickname, filename
       this.load.image("pipoPng", "assets/Farm Tiled MA1/[A]Grass_pipo.png");
       this.load.image("farmPng", "assets/Farm Tiled MA1/farming_fishing.png")
       this.load.image("fencePng", "assets/Farm Tiled MA1/fence.png")
       this.load.image("fencealtPng", "assets/Farm Tiled MA1/fence_alt.png")
       this.load.image("plantsPng", "assets/Farm Tiled MA1/plants.png")
       this.load.image("tallgrassPng", "assets/Farm Tiled MA1/tallgrass.png")
       this.load.image("flour", "assets/Farm Tiled MA1/flour.png")

       
   
       }
   
       create() {
              console.log('*** flourfactory scene');
      
              let map = this.make.tilemap({key: "factory"});
      
              let pipoTiles = map.addTilesetImage("[A]Grass_pipo", "pipoPng");
              let farmTiles = map.addTilesetImage("farming_fishing", "farmPng");
              let fenceTiles = map.addTilesetImage("fence", "fencePng");
              let fencealtTiles = map.addTilesetImage("fence_alt", "fencealtPng");
              let plantsTiles = map.addTilesetImage("plants", "plantsPng");
              let tallgrassTiles = map.addTilesetImage("tallgrass", "tallgrassPng");
              

              let tileArray = [ pipoTiles, farmTiles, fenceTiles, fencealtTiles, plantsTiles, tallgrassTiles ]
              this.groundLayer = map.createLayer("groundLayer", tileArray, 0, 0);
              this.flourLayer = map.createLayer("flourLayer", tileArray, 0, 0);
              this.tallgrassLayer = map.createLayer("tallgrassLayer", tileArray, 0, 0);
              this.factoryLayer = map.createLayer("factoryLayer", tileArray, 0, 0);
              this.fenceLayer = map.createLayer("fenceLayer", tileArray, 0, 0);

              this.player = this.physics.add.sprite(500, 500, "gurl").setScale(0.4)
          
              //enable debug
              window.player = this.player;
          
          
              this.player.setCollideWorldBounds(true); // don't go out of the this.map 
          
              // // create the arrow keys
               this.cursors = this.input.keyboard.createCursorKeys();
          
              // // camera follow player 
              this.cameras.main.startFollow(this.player);
          
              this.factoryLayer.setCollisionByExclusion(-1, true)
              //this.flourLayer.setCollisionByExclusion(-1, true)
  
             this.physics.add.collider(this.player, this.factoryLayer);
            // this.physics.add.collider(this.player, this.flourLayer);
          

            //setTilesIndexcallBack
            //this.flourLayer.setTilesIndexCallback(81,this.removeItem,this);
        
             

             this.flourLayer.setCollisionByProperty({ flours: true })
             this.flourLayer.setCollisionByProperty({ flour: false })
             this.flourLayer.setCollisionByProperty({ pack: false })

             // collect item
            this.flour = this.physics.add.sprite(231,311, 'flour');

            // collect action
            this.physics.add.overlap( this.player,this.flour,this.holditem, null, this );

             
              }
          
              update() {

              // hold flour
             if (window.holdflour == 1 ) {
       
             this.flour.x = this.player.x+32
             this.flour.y = this.player.y

      }
          
              //go back to worldmap, check for flourfactory exit
              if (   this.player.y > 600 ) {
                      this.world();
                  }
          
              else if (this.cursors.left.isDown) {
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
          
            // Function to jump to flourfactory
             world(player, tile) {
             console.log("world function");
                        
              this.scene.start("world");

             }


            // Function to hold present
            holditem(player){
            console.log("hold item")
    
            window.holdflour = 1
    
            }
        
        
            // function removeItems(player, flour) { console.log('hit item', flour.index ); if (tile.index !== 83) return;
            // if (tile.index !== 84) return;
            // this.flourLayer.removeTileAt(flour.x, flour.y); // remove the item
            // return false; }  
          
          
        }
