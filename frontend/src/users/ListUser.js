import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import axios from "axios"

const ListUser = () => {
    const [users, setUser] = useState([])

    useEffect(()=>{
        getUser()
    },[])

    const getUser = async() =>{
        const response = await axios.get(`http://localhost:7000/api-user`)
        setUser(response.data)
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:7000/api-user/${id}`)
            getUser()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="justify-content-center text-center">Id</th>
                        <th className="justify-content-center text-center">Username</th>
                        <th className="justify-content-center text-center">Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((a,b) => (
                        <tr key={b}>
                            <td>
                            {b + 1}
                            </td>
                            <td>
                                {a.username}
                            </td>
                            <td>
                                {a.email}
                            </td>
                            <td>
                            <Link to={`/edit/${a._id}`}><Button variant='primary'>Update</Button></Link>
                                <Button onClick={() => deleteUser(a._id)} variant='danger'>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default ListUser