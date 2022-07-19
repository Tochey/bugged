import React, {useState, useEffect} from "react";

import axios from "axios";
import IssueCard from "../../cards/issue/IssueCard";
let counter = 12012
const colorPicker = (prio) => {
    if (prio === "NORMAL") {
        return "rgba(0, 93, 241, 1)"
    } else if (prio === "IMPORTANT") {
        return "black"
    } else if (prio === "CRITICAL") {
        return "rgba(255, 0, 0, 1)"
    }
}

const Card = ({e}) => {

    let color = colorPicker(e.priority)
    const [user, setUser] = useState(null)
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        if (e.assignee === 0) {
            return setUser("Unassigned")
        }

        axios.get("http://localhost:9191/users/get/" + e.assignee).then((e) => {
            setUser(e.data.fname + " " + e.data.lname)
            setAvatar(e.data.avatar)
        })
    }, [e.assignee]);


    if (user != null) {
        return <IssueCard count={counter++} subject={e.subject} name={user}
                          priority={e.priority} priorityColor={color} lastUpdated={e.lastUpdated} avatar={avatar}/>
    }

}

const CompletedIssues = () => {

    const [issue, setIssue] = useState([])

    useEffect(() => {
        axios.get("http://localhost:9191/issues/getbystatus?status=DONE").then((e) => {
            setIssue(e.data)
        })

    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    {issue.map((e) => {
                        return <div className="col-lg-3 col-md-6">
                            <Card e={e}/>
                        </div>
                    })}
                </div>
            </div>

        </>

    )
}

export default CompletedIssues