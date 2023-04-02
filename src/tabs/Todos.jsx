import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

const LS_KEY = 'todos';

export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
  currentTodo: {id: 'kwz2vOch2Opj2ENA8vdxB', text: 'batman'},
  };

  onHandleSubmit = value => {
    const newData = { id: nanoid(), text: value };
    this.setState(prevState => ({ todos: [...prevState.todos, newData] }));
  };

  deleteTodos = (id) => {
    this.setState(prevState => ({todos: prevState.todos.filter(todo => todo.id !== id)}))
  }

  onHandleChange = (id) => {
    const current = this.state.todos.find((todo) => id === todo.id);
    // this.setState(prevState => {
    //   console.log('currentTodo :>> ', prevState.currentTodo);
  
    //   return { currentTodo: current };
    // });
    // this.setState({currentTodo: current});
    // this.setState({...this.state, currentTodo: current});
    
    
    this.handleEdit(current);
  }

  handleEdit = (current) => {

    this.setState({isEditing: true, currentTodo: {...this.state.currentTodo, ...current}});
    

  }

  

  handleCancel = () => {
    this.setState({isEditing: false, currentTodo: {}});
   
  }

  handleEditFormUpdate = (current, id) => {
console.log('id :>> ', id);
this.setState(prevState=> ({
  todos: prevState.todos.map(todo=> {
    if( todo.id === id) {
      return {
        ...todo,
        text: current,
        id: id
      }
    }
  })
}))
console.log('this.state.todos :>> ', this.state.todos);

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
      {this.state.isEditing ? <EditForm onUpdate={this.handleEditFormUpdate} onCancel={this.handleCancel} currentTodo={this.state.currentTodo}/> : <SearchForm onSubmit={this.onHandleSubmit} />}
        <Grid>
          {this.state.todos.map((todo, index) => (
            <GridItem key={todo.id}>
              <Todo todo={todo} index={index + 1} onDeleteClick={this.deleteTodos} onHandleChange={this.onHandleChange}/>
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
