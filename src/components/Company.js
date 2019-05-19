import React, {useContext} from "react";

import "../App.css";
import { AppContext } from "../AppContext";

const Company = (props) =>{
    const statusColor = (status) =>{
        switch(status){
            case "approved":
                return "status-green";
            case "pending approval":
                return "status-orange";
            case "declined":
                return "status-red";
            default:
                return ""
        }
    }
    const companies = useContext(AppContext)
    console.log("from Company ",companies)
    return (
        <div style={styles.container}>
           {companies.map((company, index) => <div key={company.id}>
            <h1 style={{paddingBottom:20}}>{company.companyName}</h1>
                <div style={{paddingBottom:20}}>
                    <p style={styles.textContainer}>{company.companyInfo}</p>
                    <p style={styles.textContainer}><span className="bold-span">HR Contacts:</span> {company.keyContacts}</p>
                    <p style={styles.textContainer}><span className="bold-span">Status:</span> <span className={statusColor(company.status)}>{company.status}</span></p>
                    <p style={styles.textContainer}><span className="bold-span">Financial Performance: </span><i className="fas fa-clipboard icon-report"
                    onClick={(e) => props.openModal({event:e, id :company.id, name:"report"})}></i></p>
                </div>
            <div className="icons"><i className="fas fa-trash-alt icon" onClick={() => props.eraseCompany(company.id)}></i>
             <i className="fas fa-user-edit icon" onClick={(e) => props.openModal({event:e , id :index, name:"edit"})}></i></div>
           <hr/></div>)}
        </div>
    )
}

export default Company;

const styles = {
    container:{
        width:"50%",
        padding:10,
        margin:10
    },
    textContainer:{
        textAlign:"left",
        fontSize:18,
        lineHeight:1.7
    }
}