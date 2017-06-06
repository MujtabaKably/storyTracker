import React from "react";
import ReactDOM from "react-dom";
import ListContainer from './scripts/ListContainer';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const app = document.getElementById('app');

ReactDOM.render(<MuiThemeProvider><ListContainer /></MuiThemeProvider>, app);