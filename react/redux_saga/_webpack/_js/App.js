import React from 'react';
import { Provider, connect } from 'react-redux';

// View (Container Components)
class FormApp extends React.Component {
  render() {
    return (
      <div>
        <FormInput handleClick={this.props.onClick} />
        <FormDisplay data={this.props.value} />
      </div>
    );
  }
}
FormApp.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
};


//FormInput
class FormInput extends React.Component {
  send(e) {
    e.preventDefault();
    this.props.handleClick(this.myInput.value.trim());
    this.myInput.value = '';
    return;
  }
  render() {
    return (
      <form>
        <input type="text" ref={(ref) => (this.myInput = ref)} defaultValue="" />
        <button onClick={(event) => this.send(event)}>Send</button>
      </form>
    );
  }
}
FormInput.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
};


//FormDisplay
class FormDisplay extends React.Component {
  render() {
    return (
      <div>{this.props.data}</div>
    );
  }
}
FormDisplay.propTypes = {
  data: React.PropTypes.string,
};



// Connect to Redux
function mapStateToProps(state) {
  return {
    value: state.value,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick(value) {
      dispatch( {
        type:'INCREMENT_ASYNC',
        value:value,
      } );
    },
  };
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormApp);


export default App