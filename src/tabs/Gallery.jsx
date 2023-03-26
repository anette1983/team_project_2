import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    images: [],
    value: '',
    page: 1,
    results: 0,
    isHidden: false,
    error: null,
    isLoadin: false,
  };

  async componentDidUpdate(_, prevState) {
    const { value, page } = this.state;

    if (prevState.value !== value || prevState.page !== page) {
      this.setState({ isLoadin: true });
      try {
        const { photos, total_results } = await ImageService.getImages(
          value,
          page
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...photos],
          results: total_results,
          isHidden: true,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoadin: false });
      }
    }
  }

  onHandleSubmit = value => {
    this.setState({
      value,
      images: [],
      page: 1,
      results: 0,
      isHidden: false,
    });
  };

  onHandleIncrementPage = () => {
    this.setState(s => ({ page: s.page + 1 }));
  };

  render() {
    // sad
    const { images, isHidden, results, error, isLoadin } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.onHandleSubmit} />

        {isLoadin && <Text>Завантаження...</Text>}

        <Grid>
          {images.map(({ id, avg_color, alt, src }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {isHidden && results !== images.length && (
          <Button onClick={this.onHandleIncrementPage}>
            {isLoadin ? 'Loading...' : 'Load More'}
          </Button>
        )}
        {error && <Text>Помилка</Text>}
      </>
    );
  }
}
