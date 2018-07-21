
/**
 * @param object THREE.Object3D
 * @constructor
 */

var Remove3DFileCommand = function ( filename ) {
	Command.call( this );
	this.type = 'Remove3DFileCommand';

	this.filename = filename;
	alert("Remove " + filename);
};

Remove3DFileCommand.prototype = {
	execute: function () {
		var filename = this.filename;
		for(var i = 0; i < autoPropertyChangeList.propChangeList.length; i++) {
			var e = autoPropertyChangeList.propChangeList[i];
			if(e.selector.type == "hierarchy" && e.selector.hierarchy[0] == "Scene" && e.selector.hierarchy[1] == filename) {
				autoPropertyChangeList.propChangeList.splice(i);
				i -= 1;
				alert('deleted ' + JSON.stringify(e));
			}
		}
		getCurrentVariant().filenames.splice(getCurrentVariant().filenames.indexOf(this.filename));
		for(var i = 0; i < editor.scene.children.length; i++) {
			if(editor.scene.children[i].name == this.filename) {
				editor.execute( new RemoveObjectCommand( editor.scene.children[i] ) );
			}
		}
	},

	undo: function () {
		//this.editor.removeVariant( this.object, this.propertyName );
	},

	toJSON: function () {
	},

	fromJSON: function ( json ) {
	}

};
