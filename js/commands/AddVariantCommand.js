
/**
 * @param object THREE.Object3D
 * @constructor
 */

var AddVariantCommand = function ( object, propertyName ) {
	Command.call( this );
	this.type = 'AddVariantCommand';

	this.object = object;
	this.propertyName = propertyName;
	if ( object !== undefined ) {
		this.name = 'Add Variant for Property ' + propertyName + ' to Object ' + object.name;
	}
};

AddVariantCommand.prototype = {
	execute: function () {
		this.editor.addVariant( this.object, this.propertyName );
	},

	undo: function () {
		this.editor.removeVariant( this.object, this.propertyName );
	},

	toJSON: function () {
	},

	fromJSON: function ( json ) {
	}

};
