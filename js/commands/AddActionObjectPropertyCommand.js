
/**
 * @param object THREE.Object3D
 * @constructor
 */

var AddActionObjectPropertyCommand = function ( object, property, value, cb ) {
	Command.call( this );
	this.type = 'AddActionObjectPropertyCommand';

	this.object = object;
	this.property = property;
	this.value = value;
	this.callback = cb;
	if ( object !== undefined ) {
		this.name = 'Add action for property ' + property + ' to object ' + object.name;
	}
};

AddActionObjectPropertyCommand.prototype = {
	execute: async function () {
		let action = await this.editor.addActionObjectProperty( this.object, this.property, this.value );
		this.callback(action);
	},

	undo: async function () {
		await this.editor.removeActionObjectProperty( this.object, this.property, this.value );
	},

	toJSON: function () {
	},

	fromJSON: function ( json ) {
	}

};
