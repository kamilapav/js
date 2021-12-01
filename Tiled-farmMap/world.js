class world extends Phaser.Scene {
  constructor() {
    super("world");
  }

  // incoming data from scene below
  init(data) {}

  preload() {

    // load atlas ??
    this.load.atlas( 'gurl', 'assets/gurl.png', 
    'assets/gurl.json')
    this.load.atlas( 'boy', 'assets/boy.png', 
    'assets/boy.json')
    
    // Step 1, load JSON
    this.load.tilemapTiledJSON("farm","assets/farm MA1.json");

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("pipoPng", "assets/Farm Tiled MA1/[A]Grass_pipo.png");
    this.load.image("farmPng", "assets/Farm Tiled MA1/farming_fishing.png")
    this.load.image("fencePng", "assets/Farm Tiled MA1/fence.png")
    this.load.image("fencealtPng", "assets/Farm Tiled MA1/fence_alt.png")
    this.load.image("plantsPng", "assets/Farm Tiled MA1/plants.png")
    this.load.image("samplemapPng", "assets/Pipoya RPG Tileset 32x32/SampleMap/samplemap.png")
    this.load.image("tallgrassPng", "assets/Farm Tiled MA1/tallgrass.png")
    
  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key:'farm'});

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let pipoTiles = map.addTilesetImage("[A]Grass_pipo", "pipoPng");
    let farmTiles = map.addTilesetImage("farming_fishing", "farmPng");
    let fenceTiles = map.addTilesetImage("fence", "fencePng");
    let fencealtTiles = map.addTilesetImage("fence_alt", "fencealtPng");
    let plantsTiles = map.addTilesetImage("plants", "plantsPng");
    let samplemapTiles = map.addTilesetImage("samplemap", "samplemapPng");
    let tallgrassTiles = map.addTilesetImage("tallgrass", "tallgrassPng");

    let tileArray = [ pipoTiles, farmTiles, fenceTiles, fencealtTiles, plantsTiles, samplemapTiles, tallgrassTiles ]


    // Step 5  Load in layers by layers
    this.grassLayer = map.createLayer("grass Layer", tileArray, 0, 0);
    this.treeandgrassLayer = map.createLayer("tree and grass Layer", tileArray, 0, 0);
    this.houseandrestaurantLayer = map.createLayer("house and restaurant Layer", tileArray, 0, 0);
    this.tallgrassLayer = map.createLayer("tall grass Layer", tileArray, 0, 0);
    this.plantsLayer = map.createLayer("plants Layer", tileArray, 0, 0);
    this.fencealtLayer = map.createLayer("fence alt Layer", tileArray, 0, 0);
    this.framingLayer = map.createLayer("framing Layer", tileArray, 0, 0);
    this.farmLayer = map.createLayer("farm Layer", tileArray, 0, 0);
     
    // Add main player here with physics.add.sprite

    
  


    this.anims.create({
      key: "left",
      frames: [
        { key: "gurl", frame: "left2" },
        { key: "gurl", frame: "left3" },
        { key: "gurl", frame: "left4" },
        { key: "gurl", frame: "left5" },
 
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: [
        { key: "gurl", frame: "right2" },
        //{ key: "gurl", frame: "right3" },
        { key: "gurl", frame: "right4" },
        { key: "gurl", frame: "right5" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "back",
      frames: [
        { key: "gurl", frame: "front1" },
        { key: "gurl", frame: "front2" },
        { key: "gurl", frame: "front3" },
        { key: "gurl", frame: "front4" },
        { key: "gurl", frame: "front5" },
 
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "front",
      frames: [
        { key: "gurl", frame: "back1" },
        { key: "gurl", frame: "back2" },
        { key: "gurl", frame: "back3" },
        { key: "gurl", frame: "back4" },
        { key: "gurl", frame: "back5" },
 
      ],
      frameRate: 10,
      repeat: -1,
    });
    

    this.player = this.physics.add.sprite(310, 409,'gurl').setScale(0.4)

  

    this.player.setCollideWorldBounds(true);//don't go out of the this.map
    window.player = this.player;

    // Add time event / movement here



    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool
    this.boy = this.physics.add.sprite(371,351, "boy").play("boy").setScale(0.4);

    // enemy tween
    this.time.addEvent({
      delay: 1000,
      callback: this.moveLeftRight,
      callbackScope: this,
      loop: false,
    });



    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    //this.grassLayer.setCollisionByExclusion(-1, true)
    this.treeandgrassLayer.setCollisionByExclusion(-1, true)
     this.houseandrestaurantLayer.setCollisionByExclusion(-1, true)
     //this.tallgrassLayer.setCollisionByExclusion(-1, true)
     this.plantsLayer.setCollisionByExclusion(-1, true)
     //this.fencealtLayer.setCollisionByExclusion(-1, true)
     this.framingLayer.setCollisionByExclusion(-1, true)
     this.farmLayer.setCollisionByExclusion(-1, true)
  
  
     //this.physics.add.collider(this.player, this.grassLayer);
     this.physics.add.collider(this.player, this.treeandgrassLayer);
     this.physics.add.collider(this.player,  this.houseandrestaurantLayer);
     //this.physics.add.collider(this.player, this.tallgrassLayer);
     this.physics.add.collider(this.player, this.plantsLayer);
    //this.physics.add.collider(this.player, this.fencealtLayer);
     this.physics.add.collider(this.player,  this.framingLayer);
     this.physics.add.collider(this.player,this.farmLayer);


     this.physics.add.collider(this.player,this.boy);

     this.physics.add.overlap(
      this.player,
      this.boy,
      this.boyOverlap,
      null,
      this
    );

     

     }/////////////////// end of create //////////////////////////////

  moveLeftRight() {
    console.log("moveLeftRight");
    this.tweens.timeline({
      targets: this.boy,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 2000,
      tweens: [
        {
          x: 26, //where you want to start and tweens
        },
        {
          x: 333, //must same with add sprite x
        },
      ],
    });
  }
     


  update() {

    //Enter flourfactory
    if (
      this.player.x > 389 &&
      this.player.x < 549 &&
      this.player.y > 515 &&
      this.player.y < 547 
   
       ) {
          this.flourfactory();
       }


      //Enter tomatoes
      if ( 
       this.player.x > 156 && 
       this.player.x < 270 && 
       this.player.y < 299 && 
      this.player.y > 121
      
      ) {
      this.tomatoes();
  }

   
   //Enter restaurant
   if (
    this.player.x > 334 &&
    this.player.x < 380 &&
    this.player.y > 185 &&
    this.player.y < 190

  ) {
     this.restaurant();
  }

 
     //go back to worldmap, check for flourfactory exit
     if ( this.player.x > 25 && 
      this.player.x < 719 && 
      this.player.y < 183 &&
      this.player.y > 300 

      ){
      this.fourfactory();
        }


        //go back to worldmap, check for tomatoes exit
        if ( this.player.x < 295 && 
               this.player.x > 622 && 
               this.player.y < 609 ) {
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
  
   //function to jump to flourfactory
   flourfactory(player, tile) {
    console.log("flourfactory function");
    this.scene.start("flourfactory");
  

   }

   //function to jump to restaurant
   restaurant(player, tile) {
    console.log("restaurant function");
    this.scene.start("restaurant");

   } 

  //function to jump to tomatoes
  tomatoes(player, tile) {
    console.log("tomatoes function");
    this.scene.start("tomatoes");
  }

} //////////// end of class world ////////////////////////
