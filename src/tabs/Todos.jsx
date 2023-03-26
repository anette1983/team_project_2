import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  }

  onHandleSubmit = (value) => {
    const newData = {id: nanoid(), text: value}
    this.setState((prevState)=> ({ todos: [...prevState.todos, newData]
    }))

  }
  render() {
    return (
      <SearchForm onSubmit={this.onHandleSubmit}/>
    )
  }
}
