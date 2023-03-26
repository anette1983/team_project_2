import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    images: [],
    value: '',
    page: 1,
    results: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { value, page } = this.state;
    if (prevState.value !== value || prevState.page !== page) {
      const { photos, total_results } = await ImageService.getImages(
        value,
        page
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        results: total_results,
      }));
    }
  }

  onHandleSubmit = value => {
    this.setState({ value });
  };

  render() {

    // sad
    const { images } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.onHandleSubmit} />
        <Grid>
          {images.map(({ id, avg_color, alt, src }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
