//gulpとreactの連携
//http://qiita.com/cortyuming/items/9e7c30224ff3e4671019

window.onload = function(){

	var Main = React.createClass({

		addCart:function( id ){
			console.log( id );
		},

		render() {
			return (
					<ItemList onAddCart={this.addCart}></ItemList>
			);
		}
	});
	function addCart(){
		
	}
	React.render(<ItemList onAddCart={addCart} />, document.getElementById( 'ItemList' ) );
};