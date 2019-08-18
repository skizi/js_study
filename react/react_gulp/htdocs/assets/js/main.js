var Item = React.createClass({displayName: "Item",
  propTypes: {
    item: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      text: React.PropTypes.string.isRequired
    }),
    // 削除するための処理をI/Fとして定義
    onDelete: React.PropTypes.func.isRequired,
    onAddCart: React.PropTypes.func.isRequired
  },
  
  // 親に処理を委譲する
  _onDelete() {
    this.props.onDelete(this.props.item.id);
  },

  _onAddCart() {
    this.props.onAddCart(this.props.item.id);
  },

  render() {
    return (
      React.createElement("div", null, 
        React.createElement("span", null, this.props.item.text), 
        React.createElement("button", {onClick: this._onDelete}, "delete"), 
        React.createElement("button", {onClick: this._onAddCart}, "add")
      )
    );
  }
});

//gulpでreact
//http://qiita.com/cortyuming/items/9e7c30224ff3e4671019

var ItemList = React.createClass({displayName: "ItemList",

  itemLength:3,

  getInitialState() {
    return {
      items: [
        {id:1, text:"商品1"},
        {id:2, text:"商品2"},
        {id:3, text:"商品3"}
      ]
    };
  },

  // ItemListはこのComponentが管理しているので削除する処理もここにあるべき
  deleteItem(id) {
    this.setState({
      items: this.state.items.filter((item) => {
        return item.id !== id;
      })
    });
  },
  
  addCart(id) {
    var _items = this.state.items;
    _items.push( { id:this.itemLength+1, text:'商品' + ( this.itemLength + 1 ) } );
    this.setState({ items:_items });

    this.itemLength += 1;
    this.props.onAddCart(id);
  },


  render() {
    var items = this.state.items.map((item) => {
      return(
        React.createElement("li", {key: item.id}, 
          React.createElement(Item, {onDelete: this.deleteItem, onAddCart: this.addCart, item: item})
        )
      );
    });
    return React.createElement("ul", null, items);
  }
});


//gulpとreactの連携
//http://qiita.com/cortyuming/items/9e7c30224ff3e4671019

window.onload = function(){

	var Main = React.createClass({displayName: "Main",

		addCart:function( id ){
			console.log( id );
		},

		render() {
			return (
					React.createElement(ItemList, {onAddCart: this.addCart})
			);
		}
	});
	function addCart(){
		
	}
	React.render(React.createElement(ItemList, {onAddCart: addCart}), document.getElementById( 'ItemList' ) );
};