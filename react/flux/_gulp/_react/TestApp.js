var TestApp = function( React, ReactDOM, TestStore, TestAction ){

  var Constructor = React.createClass({
    
    getInitialState: function () {
      return {
        value:''
      }
    },

    componentDidMount: function() {
      var self = this;
      TestStore.on( 'change', function () {
        self.setState( TestStore.getAll() );
      } );
    },
    
    render: function () {
      return (
        <div className="testApp">
          <TestForm />
          <TestDisplay data={this.state.value} />
          <ItemList />
        </div>
      );
    }
  });


  var TestForm = React.createClass({
    send: function (e) {
      e.preventDefault();
      var testValue = ReactDOM.findDOMNode(this.refs.test_value).value.trim();
      TestAction.test(testValue);
      ReactDOM.findDOMNode(this.refs.test_value).value = "";
      return;
    },

    render: function () {
      return (
        <section id="testForm">
          <form>
            <input type="text" ref="test_value" />
            <button onClick={this.send}>送信</button>
          </form>
        </section>
      );
    }
  });


  var TestDisplay = React.createClass({

    render: function () {
      var message = this.props.data;
      return (
        <div id="testDisplay">{message}</div>
      );
    }

  });


  var ItemList = React.createClass({

    itemLength:3,

    getInitialState() {
      return {
        items: TestStore.getAll()
      };
    },

    
    componentDidMount: function() {

      TestStore.on( 'addItem', function(){

        var _items = this.state.items;
        var id = this.itemLength + 1;
        _items.push( { id:id, text:'商品' + id } );
        this.setState({ items:_items });

        this.itemLength++;
      
      }.bind( this ) );


      TestStore.on( 'deleteItem', function( id ){

        if( this.state.items.length <= 1 ) return;

        this.state.items = this.state.items.filter( ( item ) => {
          return item.id !== id;
        } );
        this.setState({ items:this.state.items });

        //this.itemLength = this.state.items.length;

      }.bind( this ) );
    
    },


    render: function () {
      var items = this.state.items.map((item) => {
        return(
          <li key={item.id}>
            <Item id={item.id} text={item.text} />
          </li>
        );
      });
      return <section id="itemList"><ul>{items}</ul></section>;
    }
  });


  var Item = React.createClass({

    add : function( e ){
      TestAction.addItem( this.props.id );
      return;
    },

    delete : function( e ){
      TestAction.deleteItem( this.props.id );
      return;
    },

    render: function(){
      return (
        <div>
          <span>{this.props.text}</span>
          <button onClick={this.add}>add</button>
          <button onClick={this.delete}>delete</button>
        </div>
      );
    }

  });


  ReactDOM.render(
    <Constructor />,
    document.getElementById("content")
  );

}

module.exports = TestApp;