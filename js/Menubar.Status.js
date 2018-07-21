/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.Status = function ( editor ) {

	var container = new UI.Panel();
	container.setClass( 'menu right' );

	var version = new UI.Text( 'r' + THREE.REVISION );
	version.setClass( 'title' );
	version.setOpacity( 0.5 );
	container.add( version );

	return container;

};
