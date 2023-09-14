/**
 * Represents a game level with its various elements.
 */
class Level{
    /**
     * List of enemies present in the level.
     * @type {Array}
     */
    enemies;

    /**
     * List of coins present in the level.
     * @type {Array}
     */
    coins;

    /**
     * List of bottles present in the level.
     * @type {Array}
     */
    bottles;

    /**
     * List of clouds present in the level.
     * @type {Array}
     */
    clouds;

    /**
     * List of background objects present in the level.
     * @type {Array}
     */
    backgroundObjects;

    /**
     * X-coordinate representing the end of the level.
     * @type {number}
     */
    level_end_x = 2250;

    /**
     * Creates a new level.
     * 
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} coins - The coins in the level.
     * @param {Array} bottles - The bottles in the level.
     * @param {Array} clouds - The clouds in the level.
     * @param {Array} backgroundObjects - The background objects in the level.
     */
    constructor(enemies, coins, bottles, clouds, backgroundObjects){
        this.enemies = enemies;
        this.coins = coins;
        this.bottles = bottles;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
