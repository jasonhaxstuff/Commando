/** An action (subcommand) */
class Action {
	/**
	 * @typedef {Object} ActionInfo
	 * @property {string} name - The name of the action (must be lowercase)
	 * @property {string[]} [aliases] - Alternative names for the action (all must be lowercase)
	 * @property {Function} runner - The function to be run whenever the action is used.
	 * @property {Argument[]} [args] - The argument(s) that the action will use.
	 * @property {number} [wait=30] - How long to wait for input (in seconds)
	 */

	/**
	 * @param {CommandoClient} client Client the action is for
	 * @param {ActionInfo} info Information for the action
	 */
	constructor(client, info) {
		this.constructor.validateInfo(client, info);

		/**
		 * Name for the action
		 */
		this.name = info.name;

		/**
		 * The function to run whenever the action is used.
		 */
		this.runner = info.runner;

		/**
		 * The argument(s) that the action will use.
		 */
		this.args = info.args;

		/**
		 * Aliases for the action
		 * @type {string[]}
		 */
		this.aliases = info.aliases || null;

		/**
		 * How long to wait for input (in seconds)
		 * @type {number}
		 */
		this.wait = info.wait || 30;
	}

	/**
	 * Validates the constructor parameters
	 * @param {CommandoClient} client - Client to validate
	 * @param {ActionInfo} info - Info to validate
	 * @private
	 */
	static validateInfo(client, info) {
		if(!client) throw new Error('The action client must be specified.');
		if(typeof info !== 'object') throw new TypeError('Action info must be an Object.');
		if(typeof info.name !== 'string') throw new TypeError('Action name must be a string.');
		if(typeof info.runner !== 'function') throw new TypeError('Action runner must be a Function.');
		if(info.args && !Array.isArray(info.args)) throw new TypeError('Action args must be an Array.');
	}
}

module.exports = Action;
