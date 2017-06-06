import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import FontIcon from 'material-ui/FontIcon';

import _ from 'underscore';

export default class ListHTML extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      name: '',
      type: 'section',
      category: 'Manga',
      status: "incomplete",
      mainInfo: {
        released: 1,
        watched: 0,
        total: 1,
        updateState: 'weekly',
        url: '',
        pending: [],
        dateReference: {},
      }
    }, this.props.data);
  }

  setStateDefault() {
    let defaultState = Object.assign({
      name: '',
      type: 'section',
      category: 'Manga',
      status: "incomplete",
      mainInfo: {
        released: 1,
        watched: 0,
        total: 1,
        updateState: 'weekly',
        url: '',
        pending: [],
        dateReference: {},
      }
    }, this.props.data);

    this.setState(defaultState)
  }

  handleTypeChange(event, index, value) {
    const newState = {
      ...this.state,
      type: value
    };
    this.setState(newState);
  }

  handleNameChange(event, value) {
    const newState = {
      ...this.state,
      name: value
    };
    this.setState(newState);
  }

  handleCategoryChange(event, index, value) {
    const newState = {
      ...this.state,
      category: value
    };
    this.setState(newState);
  }

  handleStatusChange(event, index, value) {
    const newState = {
      ...this.state,
      status: value
    };
    this.setState(newState);
  }

  handleUpdateStateChange(event, index, value) {
    const newState = {
      ...this.state
    };

    if (newState.mainInfo) {
      newState.mainInfo.updateState = value;
    }

    this.setState(newState);
  }

  handleWatchedChange(event, value) {
    const newState = {
      ...this.state
    };

    if (newState.mainInfo) {
      newState.mainInfo.watched = value && value < 0 ? 0 : value;
    }

    this.setState(newState);
  }

  handleRelesedChange(event, value) {
    const newState = {
      ...this.state
    };

    if (newState.mainInfo) {
      newState.mainInfo.released = value && value < 1 ? 1 : value;
    }

    this.setState(newState);
  }

  handleTotalChange(event, value) {
    const newState = {
      ...this.state
    };

    if (newState.mainInfo) {
      newState.mainInfo.total = value && value < 1 ? 1 : value;
    }

    this.setState(newState);
  }

  handleUrlChange(event, value) {
    const newState = {
      ...this.state
    };

    if (newState.mainInfo) {
      newState.mainInfo.url = value
    }

    this.setState(newState);
  }

  handleDateChange(event, date) {
    const newState = {
      ...this.state
    };

    if (newState.mainInfo) {
      newState.mainInfo.dateReference = date;
    }

    this.setState(newState);
  }

  calculatePercentage(baseData = dataTemplate) {
    baseData.forEach((data) => {
      if (data.type == 'main') {
        data.watchedPercentage = 0;
        data.completePercentage = 0;
        if (data.mainInfo.released && data.mainInfo.total) {
          data.completePercentage = (data.mainInfo.released * 100) / data.mainInfo.total;
          data.watchedPercentage = (data.mainInfo.watched * 100) / data.mainInfo.released;
        }
      } else {
        data.watchedPercentage = 0;
        data.completePercentage = 0;

        this.calculatePercentage(data.sectionInfo);

        const completedPerc = _.pluck(data.sectionInfo, 'completePercentage');
        const watchedPerc = _.pluck(data.sectionInfo, 'watchedPercentage');

        let calPerc = 0;
        let watPerc = 0;

        try {
          calPerc = completedPerc.reduce((acc, val) => {
            return acc + val;
          });
        } catch ( e ) {
          // console.log(e)
        }

        try {
          watPerc = watchedPerc.reduce((acc, val) => {
            return acc + val;
          });
        } catch ( e ) {
          // console.log(e)
        }

        if (calPerc && completedPerc.length) {
          data.completePercentage = calPerc / completedPerc.length
        }

        if (watPerc && watchedPerc.length) {
          data.watchedPercentage = watPerc / watchedPerc.length;
        }
      }
    });
  }

  processList(data, id) {
    data.id = Date.now()

    let reference = undefined;

    let flag = false;

    const parseData = (data = dataTemplate) => {
      data.forEach((dataInner) => {
        if (dataInner.id == id) {
          flag = true;
          reference = dataInner;
          return;
        } else {
          if (dataInner.sectionInfo && dataInner.type == 'section' && !flag) {
            parseData(dataInner.sectionInfo)
          }

        }
      });
    }

    if (data.type == 'section' && !data.sectionInfo) {
      data.sectionInfo = [];
    }

    if (id == 0) {
      dataTemplate.push(data);
    } else {
      parseData();
      reference && reference.sectionInfo.push(data);
    }
    this.calculatePercentage();
  }

  updateData(id) {
    let reference = undefined;

    let flag = false;

    const parseData = (data = dataTemplate) => {
      data.forEach((dataInner) => {
        if (dataInner.id == id) {
          flag = true;
          reference = dataInner;
          return;
        } else {
          if (dataInner.sectionInfo && dataInner.type == 'section' && !flag) {
            parseData(dataInner.sectionInfo)
          }
        }
      });
    }

    parseData();

    if (reference.type == 'main' && this.state.type == 'section') {
      reference.sectionInfo = [];
    }

    reference.name = this.state.name;
    reference.type = this.state.type;
    reference.category = this.state.category;
    reference.status = this.state.status;
    reference.mainInfo = this.state.mainInfo;

    this.calculatePercentage();
  }

  deleteData(id) {
    let flag = false;

    const parseData = (data = dataTemplate) => {
      const index = _.pluck(data, 'id').indexOf(id);
      if (index >= 0) {
        flag = true;
        data.splice(index, 1);
        return;
      } else {
        data.forEach((dataObj) => {
          if(dataObj.type == 'section' && !flag) {
            parseData(dataObj.sectionInfo);
          }
        });
      } 
    }

    parseData();
    this.calculatePercentage();
  }

  handleSaveClick() {
    this.processList(this.state, this.props.baseId);
    this.props.onSaveClick(dataTemplate);
    this.setStateDefault();
    this.props.resetFunction();
  }

  handleUpdateClick() {
    this.updateData(this.props.baseId);
    this.props.onUpdateClick(dataTemplate);
    this.setStateDefault();
    this.props.resetFunction();
  }

  handleDeleteClick() {
    this.deleteData(this.props.baseId);
    this.props.onDeleteClick(dataTemplate);
    this.props.resetFunction();
  }

  handleCancelClick() {
    this.props.resetFunction();
  }

  render() {
    const styleText = {
      margin: "0px"
    }

    const styleSelect = {
      marginRight: "15px"
    }

    const datePickStyle = {
      marginRight: '15px',
      display: 'inline-block'
    };

    const divStyle = {
      textAlign: 'right',
      padding: '10px'
    };

    const saveBtnStyle = {
      marginRight: '15px'
    };
    const HTML = this.props.onDeleteClick ?
      (<h4>Please Confirm Delete</h4>)
      : (<div>
                    <TextField style={ styleText } floatingLabelText="Name" value={ this.state.name } fullWidth={true} onChange={this.handleNameChange.bind(this)} />
                    <div>
                      <SelectField floatingLabelText="Category" value={this.state.category} style={styleSelect} onChange={this.handleCategoryChange.bind(this)} >
                        <MenuItem value={"Manga"} primaryText="Manga" />
                        <MenuItem value={"Comics"} primaryText="Comics" />
                        <MenuItem value={"Anime"} primaryText="Anime" />
                        <MenuItem value={"Cartoon"} primaryText="Cartoon" />
                        <MenuItem value={"Movie"} primaryText="Movie" />
                        <MenuItem value={"TV"} primaryText="TV" />
                      </SelectField>
                      <SelectField floatingLabelText="Status" value={this.state.status} style={styleSelect} onChange={this.handleStatusChange.bind(this)} >
                        <MenuItem value={"complete"} primaryText="Complete" />
                        <MenuItem value={"incomplete"} primaryText="Incomplete"/>
                      </SelectField>
                      <br />
                      <SelectField floatingLabelText="type" value={this.state.type} style={styleSelect} onChange={this.handleTypeChange.bind(this)}>
                        <MenuItem value={"section"} primaryText="Parent" />
                        <MenuItem value={"main"} primaryText="Main"/>
                      </SelectField>
                      <br />
                      {(this.state.type == 'main') ? (
        <div>  
                                <SelectField floatingLabelText="Relese Schedule" value={ this.state.mainInfo ? this.state.mainInfo.updateState : null } style={styleSelect} onChange={this.handleUpdateStateChange.bind(this)}>
                                  <MenuItem value={"daily"} primaryText="Daily" />
                                  <MenuItem value={"weekly"} primaryText="Weekly"/>
                                  <MenuItem value={"monthly"} primaryText="Monthly"/>
                                  <MenuItem value={"early"} primaryText="Yearly"/>
                                  <MenuItem value={"none"} primaryText="None"/>
                                </SelectField>
                                <br />
                                <DatePicker floatingLabelText="Next / Last Date" style={datePickStyle} value={this.state.mainInfo.dateReference} onChange={this.handleDateChange.bind(this)} />
                                <TextField floatingLabelText="Watched" style={styleSelect} value={this.state.mainInfo.watched} type="number" onChange={this.handleWatchedChange.bind(this)}/>
                                <TextField floatingLabelText="Released" style={styleSelect} value={this.state.mainInfo.released} type="number" onChange={this.handleRelesedChange.bind(this)} />
                                <TextField floatingLabelText="Total" style={styleSelect} value={this.state.mainInfo.total} type="number" onChange={this.handleTotalChange.bind(this)} />
                                <TextField floatingLabelText="Url to Track" style={styleSelect} fullWidth={true} value={this.state.url} onChange={this.handleUrlChange.bind(this)} />
                              </div>) : null}
                            </div>
                            <br />
                            <br />
                    </div>);

    return (<div>
                       { HTML }
                      <div style={ divStyle }>
                        {this.props.onSaveClick ? (<RaisedButton primary={true} label="Add" onClick={this.handleSaveClick.bind(this)} style={saveBtnStyle}/>) : this.props.onUpdateClick ? (<RaisedButton primary={true} label="Update" onClick={this.handleUpdateClick.bind(this)} style={saveBtnStyle} />) : ((<RaisedButton secondary={true} label="Delete" onClick={this.handleDeleteClick.bind(this)} style={saveBtnStyle} />))}
                        <RaisedButton label="Cancel" onClick={this.handleCancelClick.bind(this)}/>
                      </div>
                  </div>
    );
  }
}