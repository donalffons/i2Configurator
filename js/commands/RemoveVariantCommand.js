
/**
 * @param object THREE.Object3D
 * @constructor
 */

var RemoveVariantCommand = function ( object, propertyName ) {
	Command.call( this );
	this.type = 'AddVariantCommand';

	this.object = object;
	this.propertyName = propertyName;
	if ( object !== undefined ) {
		this.name = 'Remove Variant for Property ' + propertyName + ' from Object ' + object.name;
	}
};

RemoveVariantCommand.prototype = {
	execute: function () {
		this.editor.removeVariant( this.object, this.propertyName );
	},

	undo: function () {
		this.editor.addVariant( this.object, this.propertyName );
	},

	toJSON: function () {
	},

	fromJSON: function ( json ) {
	}

};
