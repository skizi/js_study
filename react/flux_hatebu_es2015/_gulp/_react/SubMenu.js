var SubMenu = function( testStore, TestAction ){

  var React = require("react");
  var Container = require("flux/utils").Container;
  var ReactDOM = require("react-dom");
  var PropTypes = require('prop-types');




  class SubMenuApp extends React.Component {

    static getStores() {

      return [testStore];
    
    }


    static calculateState( prevState ) {
    
      return testStore.getState();

    }


    render() {

      var w = this.state.items.length * 300 + 5;
      var style = { width:w + 'px' };
      var items = this.state.items.map((item) => {
        return <MenuBtn key={item.id} id={item.id} title={item.title} activeIndex={this.state.activeIndex} />
      });
      return <ul style={style}>{items}</ul>
    }

  };


  class MenuBtn extends React.Component {

    click( e ){

      if( $( e.target ).hasClass( 'close_btn' ) ) return;
      TestAction.subMenuClick( this.props.id );
    
    }


    closeBtnClick( e ){

      console.log( "close" );
      TestAction.subMenuCloseBtnClick( this.props.id );
      return;

    }


    render(){
      var id = this.props.id;
      var classStr = '';
      if( id == this.props.activeIndex ) classStr = 'active';
      return (
        <li className={classStr} onClick={this.click.bind( this )}>
          {this.props.title}
          <p className='close_btn' onClick={this.closeBtnClick.bind( this )}>×</p>
        </li>
      );
    }

  };


  const SubMenuAppContainer = Container.create(SubMenuApp);

  var element = $( '#subMenu' );
  ReactDOM.render( <SubMenuAppContainer />, element[0] );

}

module.exports = SubMenu;