import React, { Component } from 'react'
import UserList from './UserList';

class AddUser extends Component {

    constructor(props) {

        super(props);

        this.state = {
            users : []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/users')
        .then(result => result.json())
        .then(
            (result) => {
                this.setState({ users: result.data });  
            },
            (error) => {
                console.log('error', error)
            }
        )
    }

    registerUser = this.registerUser.bind(this);

    registerUser(e) {
        console.log('hiiii', this.name.value, this.email.value)

        e.preventDefault();

        const user = {
            name: this.name.value,
            email: this.email.value
        }

        this.setState({user: this.state.users});

        const postOptions = {
            method: 'POST',
            headers: { 'Content-Type' : 'Application/json' },
            body: JSON.stringify(user)
        }


        fetch('http://localhost:3001/users', postOptions)
        .then(result => result.json())
        .then(
            (result) => {
                console.log('result', result)

                if(result.statusCode === 200) {
                    this.state.users.push({
                        _id: result.data._id,
                        name: user.name,
                        email: user.email
                    })
                    this.setState({ users: this.state.users })
                    this.name.value = '';
                    this.email.value = '';
                } else {
                    console.log(result)
                }
            },
            (error) => {
                console.log('error : ', error)
            }
        )
    }

    render() {
        return (
            <div className="user">
                <div className="adduser">
                    <form onSubmit={this.registerUser}>
                        <div className="form-row">
                            <label>Name : </label>
                            <input placeholder="Name" ref={(name) => this.name = name}></input>
                        </div>
                        <div className="form-row">
                            <label>Email : </label>
                            <input placeholder="Email" ref={(email) => this.email = email}></input>
                        </div>
                        <div className="form-row">
                            <button type="submit" className="btn">Save</button>
                        </div>
                    </form>
                </div>
                <div>
                    <UserList users={this.state.users}/>
                </div>
            </div>
        )
    }
}

export default AddUser;