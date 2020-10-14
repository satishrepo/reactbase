import React, { Component } from 'react';

class UserList extends Component {

    deleteUser(userId) {
        fetch('http://localhost:3001/users/' + userId, { method: 'DELETE' })
        .then(result => result.json())
        .then(
            (result) => {
                console.log(result)
                this.users = this.users.filter(item => item._id !== userId);
                // this.setState({ users: users})
            },
            (error) => {
                console.log('error', error)
            }
        )
    }

    render() {
        this.users = this.props.users
        return (
            <div>
                <div>
                    <ul>
                        {this.users.map((item) => (
                            <li key={item._id}>{item.name} - {item.email} <button onClick={() => this.deleteUser(item._id)}> X </button> </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

}

export default UserList;