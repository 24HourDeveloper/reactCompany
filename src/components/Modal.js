import React, {Component} from "react";
import {Bar} from "react-chartjs-2";

import "../App.css"
import {status} from "../companies";
import { AppContext } from "../AppContext";

export default class Modal extends Component{
    static contextType = AppContext;
   constructor(props){
       super(props);
       this.state = {
        company:[] ,
        name:"",
        info:"",
        contact:"",
        status:"researching"
       }
   }
   componentDidMount(){
    const companies = this.context;
    this.setState({company:companies})
  }

    renderModal = () =>{
        if(this.props.name === "report"){
        return <div style={styles.container} className={this.props.isOpen ? "open":"close" }>
            <div className="edit-modal">
            <h1 style={{marginBottom:20}}>Company Dashboard</h1>
            <Bar
                data={{
                    labels : ["2016", "2017", "2018"],
                    datasets:[{
                        label:"Revenue Total Each Year",
                        data: this.state.company [this.props.id].financialPerformance,
                        backgroundColor:["#2785C3", "#2785C3", "#2785C3"]
                    }]
                }} 

                options= {{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                 } }
            />
            <button className="buttonForm" onClick={this.props.toggleModal}>Close</button>
            </div>
        </div>
        }else if(this.props.name === "edit"){
            return <div style={styles.container} className={this.props.isOpen ? "open":"close" }>
            <div className="edit-modal">
            <h1 style={{marginBottom:20}}>Company Dashboard</h1>
            <form>
            <input className="inputStyle" type="text" placeholder="Company Name" name="name" defaultValue={this.state.company[this.props.id].companyName} onChange={(v)=> this.userInput(v)}/><br/>
            <input className="inputStyle" type="text" placeholder="Company Info" name="info" defaultValue={this.state.company[this.props.id].companyInfo}/><br/>
            <input className="inputStyle" type="text" placeholder="Company Contact" name="contact" defaultValue={this.state.company[this.props.id].keyContacts}/><br/>
            <div style={{display:"flex", width:"100%", margin:10,  fontSize:18}}>
            <p style={{width:"16%", padding:10}}>Status: </p>
            <select style={{width:"65%", padding:10,  fontSize:18, borderWidth:.5, borderColor:"#000", marginBottom:20}} onChange={value => this.selectStatus(value)} value={this.state.company[this.props.id].status}>
                {status.map((item, index) => <option key={index}>{item}</option>)}
            </select>
            </div>
            <button className="buttonForm" onClick={(e) => this.updateCompany(e, this.props.id)}>Update Company</button><br/>
            <button className="buttonForm" onClick={this.props.toggleModal}>Cancel</button>
            </form>
            
            </div>
        </div>
        }
        return null;
    }

    userInput = (input) =>{
        if(input.target.name === "name"){
            this.setState({name: input.target.value})
        }
        if(input.target.name === "info"){
            this.setState({info: input.target.value})
        }
        if(input.target.name === "contact"){
            this.setState({contact: input.target.value});
        }

      }

      updateCompany = (e, id) =>{
          
        e.preventDefault();
        console.log(e.target);
        this.setState({company : this.state.company.map(item => {
            let obj = {
                id: id,
                companyName: this.state.name,
                status:item.status,
                companyInfo: item.companyInfo,
                keyContacts: item.keyContacts,
                financialPerformance: 500000
            };
            if(item.id === id){
                item = obj;
                this.props.toggleModal();
                return item;
            }
            return item
        })})
    }
    render(){
        console.log("From Modal", this.state.company)
        return this.renderModal()
    }
}

const styles ={
    container:{
    backgroundColor:"rgb(33, 141, 212, .3)",
    position:"fixed",
    top:0,
    bottom:0,
    width:"70%",
    paddingTop:"10%",
    paddingLeft:"20%"
    }
}