var MainMenu = function( testStore, TestAction ){

  var React = require("react");
  var Container = require("flux/utils").Container;
  var ReactDOM = require("react-dom");
  var PropTypes = require('prop-types');




  class MainMenuApp extends React.Component {

    static getStores() {

      return [testStore];
    
    }


    static calculateState( prevState ) {
    
      return testStore.getState();

    }


    render() {
      var items = this.state.news.map((item) => {
        return <MenuBtn key={item.id} id={item.id} title={item.title} />
      });
      return <ul>{items}</ul>
    }

  };


  class MenuBtn extends React.Component {

    click( e ){

      TestAction.mainMenuClick( this.props.id );
    
    }


    render(){
      var id = this.props.id;
      return (
        <li onClick={this.click.bind( this )}><h4>{ this.props.title }</h4><p>***</p></li>
      );
    }

  };


  const MainMenuAppContainer = Container.create(MainMenuApp);
  var element = $( '#mainMenu .news' );
  ReactDOM.render( <MainMenuAppContainer />, element[0] );

}

module.exports = MainMenu;