//gulpでreact
//http://qiita.com/cortyuming/items/9e7c30224ff3e4671019

var ItemList = React.createClass({

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
        <li key={item.id}>
          <Item onDelete={this.deleteItem} onAddCart={this.addCart} item={item} />
        </li>
      );
    });
    return <ul>{items}</ul>;
  }
});

