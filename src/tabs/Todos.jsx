import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  onHandleSubmit = value => {
    const newData = { id: nanoid(), text: value };
    this.setState(prevState => ({ todos: [...prevState.todos, newData] }));
  };
  render() {
    return (
      <>
        <SearchForm onSubmit={this.onHandleSubmit} />
        <Grid>
          {this.state.todos.map((todo, index) => (
            <GridItem key={todo.id}>
              <Todo todo={todo} index={index + 1} />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
