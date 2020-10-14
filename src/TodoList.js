import React, { Component } from 'react';
import TodoItems from './TodoItems';

window.id = 0;
class TodoList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data : []
        }

        this.addTodo = this.addTodo.bind(this);
        this.apiUrl = 'https://localhost:3001/users/'
    }

    addTodo(e) {
        
        if (this._eleRef.value !== '') {
            this.state.data.push({
                name: this._eleRef.value,
                id: ++window.id
            })
        }

        this.setState({ data: this.state.data });
        
        this._eleRef.value = '';
        e.preventDefault();
    }

    render() {
        return (
            <div className="todomain">
                <div className="header">
                    <form onSubmit={this.addTodo}>
                        <input placeholder="enter text" ref={(a) => this._eleRef = a}></input>
                        <button type="submit" className="submit">Add</button>
                    </form>
                </div>
                <TodoItems data={this.state.data}/>
            </div>
        );
    }
}

export default TodoList