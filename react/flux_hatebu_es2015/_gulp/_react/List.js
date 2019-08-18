var List = function( testStore, TestAction, listIndex ){

  var React = require("react");
  var Container = require("flux/utils").Container;
  var ReactDOM = require("react-dom");
  // import React, { Component } from 'react';
  // import ReactDOM, { render } from 'react-dom';
  // import { ReduceStore, Container } from 'flux/utils';

  // import PropTypes from 'prop-types';
  // import { PropTypes } from 'react';
  var PropTypes = require('prop-types');



  class ListApp extends React.Component {

    static getStores() {

      return [testStore];
    
    }


    static calculateState( prevState ) {
    
      return testStore.getState();

    }


    render() {

      var lists = this.state.items.map((item) => {
        return <List key={item.id} id={item.id} contents={item.contents} />
      });
      
      return <div className={`inner left${this.state.activeIndex}`}>{lists}</div>

    }

  };




  class List extends React.Component {

    render() {

      var items = this.props.contents.map((item) => {
        //ユニークなkey必須
        return <Item key={item.id} id={item.id} title={item.title} text={item.text} subject={item.subject} url={item.url} />
      });
      
      return <div className={`list left${this.props.id}`}><ul>{items}</ul></div>

    }

  };


  class Item extends React.Component {

    // static propTypes = {
    //   title: React.PropTypes.string.isRequired,
    //   text: React.PropTypes.string.isRequired,
    //   subject: React.PropTypes.string.isRequired,
    //   url: React.PropTypes.string.isRequired
    // }

    getShortText( text, length ){

      if( text.length > length ){
        text = text.slice( 0, length ) + '...';
      }

      return text;

    }


    click( e ){

      //e.preventDefault();
      //TestAction.click( this.props.id - 1, listIndex );
      return;
    
    }


    render(){
      var id = this.props.id;
      return (
        <li onClick={this.click.bind( this )}>
          <h3>{this.getShortText( this.props.title, 18 )}</h3>
          <p className="outline">{this.getShortText( this.props.text, 50 )}</p>
          <p className="detail">
            <span className="fav">{this.props.subject}</span>
            <a href={this.props.url} target="_blank" className="url">{this.getShortText( this.props.url, 35 )}</a>
          </p>
        </li>
      );
    }

  };


  const ListAppContainer = Container.create(ListApp);
  var listContainer = $( '#listContainer' );
  ReactDOM.render( <ListAppContainer />, listContainer[0] );

}

module.exports = List;