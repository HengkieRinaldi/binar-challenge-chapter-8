import React from "react"
import axios from "axios"


class AddUser extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
    }
    handleChangeUsername = event =>{this.setState({username: event.target.value})}
    handleChangeEmail = event =>{this.setState({email: event.target.value})}
    handleChangePassword = event =>{this.setState({password: event.target.value})}

    handlerSubmit = async (e) => {
        e.preventDefault()
        const users = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        let config = {
            url: 'http://localhost:7000/api-user',
            data: JSON.stringify(users),
            headers: {"Content-Type":"application/json"},
            method: "POST",
        }
        await axios(config)
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
    }

    render() {
        return (
            <>
                <form onSubmit={this.handlerSubmit}>
                    <label>username
                        <input type="text" name="username" onChange={this.handleChangeUsername}/>
                    </label>
                    <label>email
                        <input type="text" name="email" onChange={this.handleChangeEmail}/>
                    </label>
                    <label>password
                        <input type="text" name="password" onChange={this.handleChangePassword}/>
                    </label>
                <button type="submit" >add</button>
                </form>
            </>
        )
    }
}

export default AddUser