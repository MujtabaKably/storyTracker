import React from 'react';

import ListMUI from './ListMUI';
import ListMUIAddEdit from './ListMUIAddEdit';

window.dataTemplate = localStorage.getItem('listData') ? JSON.parse(localStorage.getItem('listData')) : [];

export default class ListContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: window.dataTemplate
    }
  }

  updateList(data) {
    localStorage.setItem('listData', JSON.stringify(data));
    this.setState(data);
  }

  render() {
    const listValues = [];

    const divStyle = {

    }

    this.state.data.forEach((data, i) => {
      listValues.push(<ListMUI key={i} data={data} bgcolor={false} updateList={this.updateList.bind(this)}></ListMUI>)
    });

    return <div>
      {listValues}
      <ListMUIAddEdit listName="Main" baseId={0} updateList={this.updateList.bind(this)} bgcolor={false}/>
    </div>
  }
}

