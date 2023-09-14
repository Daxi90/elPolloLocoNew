/**
 * Represents the first level of the game.
 * @type {Level}
 */
let level1;

/**
 * Initializes the game level with specified enemies, coins, bottles, clouds, and background objects.
 * @param {World} world - The game world in which the level is initialized.
 */
function initLevel(world) {
  /**
   * Constructs a new level instance.
   * @param {Enemy[]} enemies - List of enemy instances for the level.
   * @param {Coins[]} coins - List of coin instances for the level.
   * @param {Bottle[]} bottles - List of bottle instances for the level.
   * @param {Cloud[]} clouds - List of cloud instances for the level.
   * @param {BackgroundObject[]} backgroundObjects - List of background objects to render in the level.
   */

  level1 = new Level(
    [new Chicken(), new Chicken(), new Chicken(), new Endboss()],
    [
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
    ],
    [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()],
    [new Cloud()],
    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        -719
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

      new BackgroundObject("img/5_background/layers/air.png", 1438),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 1438),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        1438
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 1438),

      new BackgroundObject("img/5_background/layers/air.png", 2157),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 2157),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        2157
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 2157),
    ]
  );
}
