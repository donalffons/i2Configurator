
/**
 * @param object THREE.Object3D
 * @constructor
 */

var Add3DFileCommand = function ( filename ) {
	Command.call( this );
	this.type = 'Add3DFileCommand';

	this.filename = filename;
};

Add3DFileCommand.prototype = {
	execute: function () {
		var currVariant = getCurrentVariant();
		if(currVariant.filenames == null) {
			currVariant.filenames = [];
		}
		currVariant.filenames.push(this.filename);

		var newVariant = {"filenames": [this.filename]};
		LoadVariant(newVariant);
	},

	undo: function () {
		//this.editor.removeVariant( this.object, this.propertyName );
	},

	toJSON: function () {
	},

	fromJSON: function ( json ) {
	}

};
