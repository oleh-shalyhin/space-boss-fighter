define(["Phaser",
	  "component/Background",
	  "component/Player",
	  "component/BulletManager",
	  "component/EnemyManager",
	  "constant/BackgroundConstants",
	  "constant/PlayerConstants",
	  "constant/EnemyConstants",
	  "constant/BulletConstants",
	  "constant/StateConstants",
	  "controller/CheckCollisionsController"],
		function(Phaser, 
				Background,
				Player,
				BulletManager,
				EnemyManager,
				BackgroundConstants,
				PlayerConstants,
				EnemyConstants,
				BulletConstants,
				StateConstants,
				CheckCollisionsController) {

	function GameState() {
		this.bg = new Background();
		this.player = new Player();
		this.enemyManager = new EnemyManager();
		this.bulletManager = new BulletManager();
		this.checkCollisionsController;
	}

	GameState.prototype.create = function() {
		this.bg.create(this);
		this.player.create(this);
		this.enemyManager.create(this);
		this.bulletManager.create(this);
		this.checkCollisionsController = new CheckCollisionsController(this._getComponentsViews());
	};

	GameState.prototype._getComponentsViews = function() {
		return {
			player: this.player.getSpriteToCheckCollisions(),
			enemies: this.enemyManager.getGroupToCheckCollisions(),
			bullets: this.bulletManager.getGroupToCheckCollisions()
		};
	};

	GameState.prototype.update = function() {
		this.bg.update();
		this.player.update();
		this.enemyManager.resetEnemy(this);
		this.checkCollisionsController.checkCollisions(this);
	};

	return GameState;
});