import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPasword] = useState("")
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    getUserById();
  }, [])

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:7000/users/${id}`);
    setUsername(response.data.username)
    setEmail(response.data.email)
    setPasword(response.data.password)
  }

  const updateUser = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:7000/api-user/${id}`, {
        username,
        email,
        password,
      })
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="columns mt-5">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">password</label>
            <div className="control">
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={password}
                  onChange={(e) => setPasword(e.target.value)}
                  placeholder="password"
                />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser