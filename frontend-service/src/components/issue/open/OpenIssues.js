import React, {useEffect, useState} from 'react';
import EditPage from "../../actions/edit/EditPage"
import axios from "axios";

const RenderAssignee = ({username}) => {
    return <p className="signe">Assignee: {username} </p>
}

const Priority = ({priority}) => {
    if (priority === "NORMAL") {
        return <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1.5" y1="1.5" x2="13.5" y2="1.5" stroke="#029EF5" strokeWidth="3" strokeLinecap="round"/>
        </svg>
    } else if (priority === "IMPORTANT") {
        return <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1.5" y1="6.5" x2="13.5" y2="6.5" stroke="#181818" strokeWidth="3" strokeLinecap="round"/>
            <line x1="1.5" y1="1.5" x2="13.5" y2="1.5" stroke="#181818" strokeWidth="3" strokeLinecap="round"/>
        </svg>
    } else {
        return <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1.5" y1="11.5" x2="13.5" y2="11.5" stroke="#CC0303" strokeWidth="3" strokeLinecap="round"/>
            <line x1="1.5" y1="6.5" x2="13.5" y2="6.5" stroke="#CC0303" strokeWidth="3" strokeLinecap="round"/>
            <line x1="1.5" y1="1.5" x2="13.5" y2="1.5" stroke="#CC0303" strokeWidth="3" strokeLinecap="round"/>
        </svg>
    }
}

const RenderInfo = ({issues}) => {
    const [state, setState] = useState(false)
    const [issueId, setIssueId] = useState(0)
    return (
        <>
            {issues.map((e) =>
                <div className="column">
                    <div className="status">
                        <span className={e.status}> {e.status} </span>
                    </div>
                    <div className="key">
                        <p onClick={() => {
                            setIssueId(e.issueId)
                            setState(true)
                        }}> #{e.val} </p>
                    </div>
                    <div className="subject">
                        <p>{e.subject}</p>
                    </div>
                    <div className="category">
                        <p> category </p>
                    </div>
                    <div className="priority">
                        <Priority priority={e.priority}/>
                    </div>
                    <div className="last-updated">
                        <p className="lastupdated">{e.lastUpdated}</p>
                    </div>
                    <div className="created-at">
                        <p className="created">09:44:56 AM</p>
                    </div>
                </div>
            ).reverse()}

            <EditPage open={state} onClose={() => setState(false)} issueId={issueId}/>
        </>

    )
}

const OpenIssues = () => {
    const [state, setState] = useState([])

    useEffect(() => {

        axios.get("http://localhost:9191/users/getusersandissues").then((e) => {
            setState(e.data)
        })

    }, []);
    return (
        <div className="App">
            <div className="title">
                <h4> issues</h4>
            </div>
            <div className="table">
                <div className="header">
                    <div className="status">
                        <h4>Status</h4>
                    </div>
                    <div className="key">
                        <h4>Key</h4>
                    </div>
                    <div className="subject">
                        <h4>Subject</h4>
                    </div>
                    <div className="category">
                        <h4>Category</h4>
                    </div>
                    <div className="priority">
                        <h4>Priority</h4>
                    </div>
                    <div className="last-updated">
                        <h4>Last Update</h4>
                    </div>
                    <div className="created-at">
                        <h4>Created</h4>
                    </div>
                </div>

                {state.map((e) =>
                    <>

                        <RenderAssignee username={e.user.fname + " " + e.user.lname}/>
                        <div className="data">
                            <div className="data-in">
                                <RenderInfo issues={e.issues}/>
                            </div>

                        </div>
                    </>
                )}
            </div>
        </div>


    );

}

export default OpenIssues