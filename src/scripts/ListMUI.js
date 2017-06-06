import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';

import ListMUIAddEdit from './ListMUIAddEdit';
import ListHTML from './ListHTML';

export default class ListMUI extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      editMode: false,
      deleteMode: false
    };
  }

  showAndHide() {
    this.setState({
      open: !this.state.open
    });
  }

  showDialog() {
    this.setState({
      editMode: true
    });
  }

  hideDialog() {
    this.setState({
      editMode: false
    });
  }

  showConfirm() {
    this.setState({
      deleteMode: true
    });
  }

  hideConfirm() {
    this.setState({
      deleteMode: false
    });
  }

  render() {
    const secondaryTextStyle = {
      color: '#808080',
      fontSize: '18px'
    };

    const completeStyle = {
      color: '#2E8B57',
      fontSize: '12px',
      fontWeight: 'bold',
      opacity: '0.5'
    };

    const incompleteStyle = {
      color: '#8B0000',
      fontSize: '12px',
      fontWeight: 'bold',
      opacity: '0.5'
    };

    const progessStyle = {
      marginTop: '5px'
    };

    const episodeStyle = {
      color: '#000000'
    };

    const progressLabelStyle = {
      paddingTop: '16px',
      fontWeight: 'bold',
      fontSize: '14px',
      color: '#808080'
    }

    const pendingBtnStyle = {
      margin: '3px',
    }

    const pendingLabelStyle = {
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: '13px'
    }

    let relData = '';
    let watchData = '';
    let updateState = '';
    const pendingBtns = [];
    const listItems = [];

    if (this.props.data.type != 'main') {
      const prefix = this.props.prefix ? `${this.props.prefix} ${this.props.data.name}` : this.props.data.name;
      this.props.data.sectionInfo.forEach((list, i) => {
        listItems.push(<ListMUI key={ i } data={ list } prefix={ prefix } bgcolor={!this.props.bgcolor} updateList={this.props.updateList}></ListMUI>);
      });
      listItems.push(<ListMUIAddEdit key={this.props.data.sectionInfo.length} listName={ prefix } baseId={this.props.data.id} updateList={this.props.updateList} bgcolor={!this.props.bgcolor}/>);
    }

    if (this.props.data.type == 'main') {
      if (this.props.data.mainInfo.watched != undefined && this.props.data.mainInfo.total != undefined && this.props.data.mainInfo.released != undefined) {
        watchData = `( ${ this.props.data.mainInfo.watched } / ${ this.props.data.mainInfo.released } )`;
        relData = `( ${ this.props.data.mainInfo.released } / ${ this.props.data.mainInfo.total } )`
      }

      updateState = this.props.data.mainInfo.updateState + ' , '

      if (this.props.data.mainInfo.pending.length) {
        this.props.data.mainInfo.pending.forEach((pending, i) => {
          pendingBtns.push(<RaisedButton labelStyle = { pendingLabelStyle } style={ pendingBtnStyle } key={ i } label={`Ep ${pending.episodeNo} ( ${pending.date} )`} secondary={true} />);
        })
      }
    }

    const opts = {};

    const nestedListStyle = {
      marginLeft: 18,
      padding: '0px'
    }

    const btnLabelStyle = {
      fontSize: '10px',
      padding: "0px"
    };

    const editBtnStyle = {
      width: "32px",
      height: "1p8x",
      lineHeight: 'unset'
    };

    const deleteBtnStyle = {
      width: "60px",
      height: "18px",
      lineHeight: 'unset',
    // marginRight: '35px'
    };

    const divStyle = {
      textAlign: 'right'
    };

    const paperStyle = {
      padding: "15px",
      marginBottom: '10px',
    };

    const dialogStyle = {
      paddingTop: '25px'
    }

    paperStyle.backgroundColor = this.props.bgcolor ? '#efefef' : '#ffffff';

    return <Paper zDepth={1} rounded={true} style={paperStyle} >
              <div style={divStyle}>
                <FlatButton label="Edit" primary={ true } style={editBtnStyle} labelStyle={btnLabelStyle} onClick={this.showDialog.bind(this)}/>
                        <Dialog title="Edit Mode" modal={true} open={this.state.editMode} style={dialogStyle} autoDetectWindowHeight={false} repositionOnUpdate={false}>
                          <ListHTML onUpdateClick={this.props.updateList} baseId={this.props.data.id} resetFunction={this.hideDialog.bind(this)} data={this.props.data}/>
                        </Dialog>
                <FlatButton label="Delete" secondary={ true } style={ deleteBtnStyle } labelStyle={btnLabelStyle} onClick={this.showConfirm.bind(this)} />
                        <Dialog title="Confirm Delete" modal={true} open={this.state.deleteMode} >
                          <ListHTML onDeleteClick={this.props.updateList} baseId={this.props.data.id} resetFunction={this.hideConfirm.bind(this)}/>
                        </Dialog>
                {listItems && listItems.length ? (<FlatButton icon={<FontIcon className={ this.state.open ? "fa fa-angle-up" : "fa fa-angle-down"} />} primary={ true } style={editBtnStyle} labelStyle={btnLabelStyle} onClick={this.showAndHide.bind(this)}/>) : null}
              </div>
              <span>
                { `${this.props.prefix ? this.props.prefix + ' ' : '' }`} <b>{`${this.props.data.name}` }</b>
              </span>
              <span style={ secondaryTextStyle }> { ` ( ${ updateState }${ this.props.data.category } )` }</span>
              <span style={this.props.data.status == 'incomplete' ? incompleteStyle : completeStyle }>{` ${this.props.data.status}`}</span>

              <br /> <br /><span style={ progressLabelStyle }>Watch Progress <span style={episodeStyle} >{ watchData }</span></span>
              <LinearProgress style={ progessStyle } mode="determinate" value={ this.props.data.watchedPercentage }/>
              
              <br /><span style={ progressLabelStyle }>Completion Progress <span style={episodeStyle} >{ relData }</span></span>
              <LinearProgress color="green" style={ progessStyle } mode="determinate" value={ this.props.data.completePercentage }/>

              <br />
              <div>
                { pendingBtns }
              </div>
              {this.state.open ? (<div style={nestedListStyle}>{listItems}</div>) : null}
          </Paper>
  }
}