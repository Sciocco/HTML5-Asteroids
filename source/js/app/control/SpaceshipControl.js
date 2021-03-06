/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 26/02/13
 * Time: 10:41
 */
define(['lib/KeyPoll'], function (KeyPoll) {

	/**
	 * Uses a KeyPoll object to control the players spaceship based on keyboard input.
	 * @param config
	 * @param keypoll
	 * @constructor
	 */
	function SpaceshipControl(config, keypoll) {
		this.config = config;
		this.keypoll = keypoll;
	}

	var api = SpaceshipControl.prototype;

	api.update = function update(entity, dt) {

		// check which keys are down, and modify the entity.motion object;
		if (entity.motion && entity.state) {
			var thruster = false;
			var steering = 0;
			var fire = false;

			if (this.keypoll.isDown(KeyPoll.UP)) thruster = true;

			if (this.keypoll.isDown(KeyPoll.LEFT)) steering = -this.config.shipSteeringSpeed;
			if (this.keypoll.isDown(KeyPoll.RIGHT)) steering = this.config.shipSteeringSpeed;

			if (entity.state.weapon) {
				if (this.keypoll.isDown(KeyPoll.FIRE)) fire = true;
				if (this.keypoll.isDown(KeyPoll.FIRE1)) fire = true;
				if (this.keypoll.isDown(KeyPoll.FIRE2)) fire = true;

				entity.state.weapon.triggerDown = fire;
			}

			entity.motion.av = steering;
			entity.state.thruster = thruster;
		}

	};

	return SpaceshipControl;
});