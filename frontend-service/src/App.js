import "./App.css"
import Header from "./components/header/Header";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import AllIssues from "./components/issue/AllIssues";
import OpenIssue from "./components/issue/OpenIssue";
import User from "./components/user/User";
import CompletedIssue from "./components/issue/CompletedIssue";


function App() {
    return (

         <Router>
             <>
                    <Routes>
                    <Route exact path="/" element={   <> <Header openIssue ={true} openUser ={false}/> <AllIssues /> </>} />
                    <Route exact path="/open-issues" element={  <> <Header openIssue ={true} openUser ={false}/> <OpenIssue /> </>} />
                        <Route exact path="/user" element={  <> <Header openIssue ={false} openUser ={true}/> <User /> </>} />
                        <Route exact path="/completed-issues" element={  <> <Header openIssue ={true} openUser ={false}/> <CompletedIssue /> </>} />
            </Routes>
             </>
         </Router>


    );


}

export default App
