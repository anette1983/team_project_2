import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    value: '',
  };

  onHandleSubmit = value => {
    this.setState({ value });
  };
  render() {
    return (
      <>
        <SearchForm onSubmit={this.onHandleSubmit} />
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
      </>
    );
  }
}
