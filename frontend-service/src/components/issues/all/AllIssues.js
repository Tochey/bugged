import IssueCard from "../../cards/issue/IssueCard";
import React, {useEffect, useState} from "react";
import axios from "axios"
import './allissues.css'
const colorPicker = (prio) => {
    if (prio === "NORMAL") {
        return "rgba(0, 93, 241, 1)"
    } else if (prio === "IMPORTANT") {
        return "black"
    } else if (prio === "CRITICAL") {
        return "rgba(255, 0, 0, 1)"
    }

}
const Card = ({issue}) => {

    let color = colorPicker(issue.priority)
    const [user, setUser] = useState(null)

    const [avatar, setAvatar] = useState();
    const [title, setTitle] = useState(null)


    useEffect(() => {
        if (issue.assignee === 0) {
            return setUser("Unassigned")
        }
        axios.get("http://localhost:9191/users/get/" + issue.assignee).then((e) => {
            setTitle(e.data.title)
            setUser(e.data.fname + " " + e.data.lname)
            setAvatar(e.data.avatar)
        })

    }, [issue.assignee]);


    if (user != null) {
        return <IssueCard count={issue.val} subject={issue.subject} name={user} title={title}
                          priority={issue.priority} priorityColor={color} lastUpdated={issue.lastUpdated} avatar={avatar} category={issue.category}/>
    }

}
const AllIssues = () => {
    const [issue, setIssue] = useState([])

    useEffect(() => {
        axios.get("http://localhost:9191/issues/getall").then((e) => setIssue(e.data))
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6">
                    <h2>TODO</h2>
                    {issue.map((e) => {
                            if (e.status === "TODO") {
                                return <Card issue={e}/>
                            }
                            return null
                        }
                    )}

                </div>
                <div className="col-lg-3 col-md-6">
                    <h2>INPROGRESS</h2>
                    {issue.map((e) => {
                            if (e.status === "INPROGRESS") {
                                return <Card issue={e}/>
                            }
                            return null
                        }
                    )}

                </div>
                <div className="col-lg-3 col-md-6">
                    <h2>REVIEW</h2>
                    {issue.map((e) => {
                            if (e.status === "REVIEW") {
                                return <Card issue={e}/>
                            }
                            return null
                        }
                    )}
                </div>
                <div className="col-lg-3 col-md-6">
                    <h2>DONE</h2>
                    {issue.map((e) => {
                            if (e.status === "DONE") {
                                return <Card issue={e}/>
                            }
                            return null
                        }
                    )}
                </div>
            </div>
        </div>
    );

}

export default AllIssues