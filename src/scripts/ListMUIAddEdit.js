import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

import ListHTML from './ListHTML';

export default class ListMUIAddEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  showAndHide() {
    this.setState({
      open: !this.state.open
    });
  }

  hide() {
    this.setState({
      open: false
    });
  }

  render() {
    const opts = {};
    opts.nestedListStyle = {
      // marginLeft: 18,
      padding: '0px'
    }
    opts.style = {
      marginBottom: '10px',
      padding: '15px'
    }
    opts.style.backgroundColor = this.props.bgcolor ? '#efefef' : '#ffffff';

    const titleStyle = {
      margin: '0px',
      fontWeight: '100',
      marginBottom: '15px'
    };

    const spanStyle = {
      fontWeight: 'bold'
    };

    const btnLabelStyle = {
      fontSize: '10px',
      padding: "0px"
    };

    const editBtnStyle = {
      width: "32px",
      height: "22px",
      lineHeight: 'unset'
    };

    const divStyle = {
      textAlign: 'right'
    };

    const nestedItem = [<div key={0} >
                          <ListHTML onSaveClick = {this.props.updateList} baseId={this.props.baseId} resetFunction={this.hide.bind(this)}/>
                      </div>];

    return <Paper zDepth={1} rounded={true} style={opts.style}>
              <div style={divStyle}>
                <FlatButton icon={<FontIcon className={ this.state.open ? "fa fa-angle-up" : "fa fa-angle-down"} />} primary={ true } style={editBtnStyle} labelStyle={btnLabelStyle} onClick={this.showAndHide.bind(this)}/>
              </div>
              <h4 style={ titleStyle }>Add New Item to <span style={spanStyle}>{ this.props.listName }</span> list</h4> 
              <div>
                { this.state.open ? ( nestedItem ) : null }
              </div>
           </Paper>
  }
}