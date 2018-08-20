/**
 * @author dforrer / https://github.com/dforrer
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 */

/**
 * @param object THREE.Object3D
 * @constructor
 */

var AddObjectCommand = function ( object ) {

	Command.call( this );

	this.type = 'AddObjectCommand';

	this.object = object;
	if ( object !== undefined ) {

		this.name = 'Add Object: ' + object.name;

	}

};

AddObjectCommand.prototype = {

	execute: function () {

		this.object.position_default = this.object.position.clone();
		this.object.position_overridden = false;
		this.object.position_autoAction = undefined;
		this.object.rotation_default = this.object.rotation.clone();
		this.object.rotation_overridden = false;
		this.object.rotation_autoAction = undefined;
		this.object.scale_default = this.object.scale.clone();
		this.object.scale_overridden = false;
		this.object.scale_autoAction = undefined;
		this.object.traverse(function(o){
			o.position_default = o.position.clone();
			o.position_overridden = false;
			o.position_autoAction = undefined;
			o.rotation_default = o.rotation.clone();
			o.rotation_overridden = false;
			o.rotation_autoAction = undefined;
			o.scale_default = o.scale.clone();
			o.scale_overridden = false;
			o.scale_autoAction = undefined;
		});

		this.editor.addObject( this.object );
		this.editor.select( this.object );

	},

	undo: function () {

		this.editor.removeObject( this.object );
		this.editor.deselect();

	},

	toJSON: function () {

		var output = Command.prototype.toJSON.call( this );
		output.object = this.object.toJSON();

		return output;

	},

	fromJSON: function ( json ) {

		Command.prototype.fromJSON.call( this, json );

		this.object = this.editor.objectByUuid( json.object.object.uuid );

		if ( this.object === undefined ) {

			var loader = new THREE.ObjectLoader();
			this.object = loader.parse( json.object );

		}

	}

};
