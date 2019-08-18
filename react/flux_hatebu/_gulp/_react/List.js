var List = function( React, ReactDOM, TestStore, TestAction, listIndex ){

  var Constructor = React.createClass({

    itemLength:3,

    getInitialState() {
      return {
        items: TestStore.getState( listIndex )
      };
    },

    
    componentDidMount: function() {

      TestStore.on( 'click', function( clickIndex, _listIndex ){

        if( _listIndex == listIndex ){
          console.log( 'listIndex:' + listIndex + ', clickIndex:' + clickIndex );
        }
      
      }.bind( this ) );
    
    },


    render: function () {
      var items = this.state.items.map((item) => {
        //ユニークなkey必須
        return <Item key={item.id} id={item.id} title={item.title} text={item.text} fav={item.fav} url={item.url} />
      });
      return <ul>{items}</ul>
    }
  });


  var Item = React.createClass({

    click : function( e ){
      TestAction.click( this.props.id, listIndex );
      return;
    },

    render: function(){
      var id = this.props.id;
      return (
        <li onClick={this.click}>
          <h3>{this.props.title}</h3>
          <p className="outline">{this.props.text}</p>
          <p className="detail">
            <span className="fav">{this.props.fav}users</span>
            <a href="url.jp" className="url">{this.props.url}</a>
          </p>
        </li>
      );
    }

  });


  var listContainer = document.getElementById( 'listContainer' );
  var lists = listContainer.getElementsByClassName( 'list' );
  ReactDOM.render( <Constructor />, lists[listIndex] );

}

module.exports = List;