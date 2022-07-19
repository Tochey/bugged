import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import './user.css'

const UserCard = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get("http://localhost:9191/users/getall").then((e) => setUsers(e.data))
    }, []);

        return (
            <>

            <div className="container">
                <div className="row">
                    {users.map((e) => {
                        return <div className="col-lg-3 col-md-6">
                        <div className="issue-box">
                            <div className="user-image">
                                <img src={e.avatar} alt="" srcSet="" />
                            </div>

                            <div className="user-name">
                                {e.fname} {e.lname}
                                <p className="title">{e.title}</p>

                            </div>
                            <div className="person-social">
                                <i className="fab fa-linkedin"></i>
                            </div>
                            <div className="feature-button">
                                Visit Profile
                            </div>

                        </div>
                    </div>
                    })}
                </div>
            </div>

                </>

                )

}


export default UserCard