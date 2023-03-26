import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

const LS_KEY = 'todos';

export class Todos extends Component {
  state = {
    todos: [],
  };

  onHandleSubmit = value => {
    const newData = { id: nanoid(), text: value };
    this.setState(prevState => ({ todos: [...prevState.todos, newData] }));
  };

  deleteTodos = (id) => {
    this.setState(prevState => ({todos: prevState.todos.filter(todo => todo.id !== id)}))
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      localStorage.setItem(LS_KEY, JSON.stringify(todos));
    }
  }

  componentDidMount() {
    const savedTodos = JSON.parse(localStorage.getItem(LS_KEY));
    if (savedTodos) {
      this.setState({ todos: savedTodos });
    }
  }

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onHandleSubmit} />
        <Grid>
          {this.state.todos.map((todo, index) => (
            <GridItem key={todo.id}>
              <Todo todo={todo} index={index + 1} onDeleteClick={this.deleteTodos} />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
