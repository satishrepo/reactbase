import React, { Component } from 'react';

class TodoItems extends Component {
    
    taskItem(item) {
        return <li key={item.id}>{item.name}</li>
    }

    render() {
        const allItems = this.props.data;
        const allTasks = allItems.map(this.taskItem);

        return (
            <ul>
                {allTasks}
            </ul>
        )
    }
}

export default TodoItems;