var Item = React.createClass({
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
      <div>
        <span>{this.props.item.text}</span>
        <button onClick={this._onDelete}>delete</button>
        <button onClick={this._onAddCart}>add</button>
      </div>
    );
  }
});
