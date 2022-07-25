import React from 'react';
import './issuecard.css'


const IssueCard = ({count, subject, name, priorityColor, priority,category, avatar}) => {

    const Priority = ({color}) => {
        return <div className="task-button" id="priority" style={{backgroundColor: color}}>
            {priority}
        </div>
    }

    return (
        <div className="issue-box">
            <div className="issue-number">
                #{count}
            </div>
            <div className="name-issue">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a style={{color: "#16192c"}}> {subject} </a>
            </div>

            <div className="person-name">
                <div className="row">
                    <div className="col-md-3">
                        <img src={avatar} alt="" srcSet=""/>
                    </div>
                    <div className="col-md-9">
                        <span>{name}<br/>
                            <span style={{fontSize:"15px"}}> Category: <span style={{fontSize:"17px"}}>{category}</span> </span>
                        </span>
                    </div>
                </div>

            </div>
            <Priority color={priorityColor}/>
        </div>

    )
}
export default IssueCard