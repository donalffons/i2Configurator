
/**
 * @param object THREE.Object3D
 * @constructor
 */

var RemoveActionObjectPropertyCommand = function ( action, cb ) {
	Command.call( this );
	this.type = 'AddActionObjectPropertyCommand';

	this.action = action;
	this.callback = cb;
	if ( action !== undefined ) {
		this.name = 'Remove action for property ' + action.getProperty();
	}
};

RemoveActionObjectPropertyCommand.prototype = {
	execute: async function () {
		await this.editor.removeActionObjectProperty( this.action );
		this.callback();
	},

	undo: async function () {
		await this.editor.addActionObjectProperty( this.object, this.property, this.value );
	},

	toJSON: function () {
	},

	fromJSON: function ( json ) {
	}

};
