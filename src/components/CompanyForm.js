import React, {Component} from "react";
import Modal from "./Modal";
import { status} from "../companies";
import Company from "./Company";
import "../App.css"
import { AppContext } from "../AppContext";

class CompanyForm extends Component{
    static contextType = AppContext;
    constructor(props){
        super(props);
        
        this.state = {
          company: [],
          id:0,
          name:"",
          info:"",
          contact:"",
          status:"researching",
          revenue:"",
          isOpen:false,
          modalName:""
        }
        this.name = React.createRef();
        this.revenue = React.createRef();
        this.info = React.createRef();
        this.contact = React.createRef();
      }
      componentDidMount(){
        const companies = this.context;
        this.setState({company:companies})
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
        if(input.target.name === "revenue"){
            this.setState({revenue: input.target.value.split(",").map(Number)});
        }

      }
      addCompany = (e, name, info, contact, revenue) =>{
        e.preventDefault();
        console.log("inside add method ",this.state.id)
        let obj = {
            id: this.state.company.length,
            companyName: name,
            status:this.state.status,
            companyInfo: info,
            keyContacts: contact,
            financialPerformance: revenue
        };
        if(this.name.current.value === ""){
            alert("add name")
        }else{
        this.name.current.value = "";
        const reset = this.name.current.value;
        this.info.current.value = "";
        const reset1 = this.info.current.value;
        this.contact.current.value = "";
        const reset2 = this.contact.current.value;
        this.revenue.current.value = ""
        const reset3 = this.revenue.current.value
        this.setState(() => {
            return {company : this.state.company.concat(obj), name: reset, info:reset1, contact:reset2, revenue:reset3}
        })
        
    }
        
    }

    eraseCompany = (id) =>{
        console.log("inside erase method ",id)
        this.setState({company: this.state.company.filter(item => item.id !== id) })
    }

    openModal = ({event, id, name}) =>{
        event.preventDefault();
        this.setState({isOpen:true,id, modalName:name})
        
    }
    updateCompany = ({event, id}) =>{
        event.preventDefault();
        if(this.state.name === ""){
            alert("add name")
        }else{
        this.setState({company : this.state.company.map(item => {
            let obj = {
                id: id,
                companyName: this.state.name,
                status:this.state.status,
                companyInfo: this.state.info,
                keyContacts: this.state.contact,
                financialPerformance: this.state.revenue
            };
            if(item.id === id){
                item = obj;
                this.toggleModal(event)
                return item;
            }
            return item
        })})
    }
        
    }

    toggleModal =(e) =>{
        e.preventDefault();
        this.setState({isOpen:false})
    }

    selectStatus = (selection) =>{
        this.setState({status: selection.target.value})
    }

    render(){
        const {name, info, contact, modalName, revenue} = this.state;
        console.log("From CompanyForm", this.state.company)
    return (
        <>
        <div style={{width:"50%", padding:10, borderRightStyle:"solid", borderRightColor:"#000", borderRightWidth:1,
    backgroundColor:"#A7AAAD"}}>
            <h1 style={{marginBottom:20}}>Company Dashboard</h1>
            <form>
            <input className="inputStyle" type="text" placeholder="Company Name" onChange={(text)=> this.userInput(text)} name="name" ref={this.name}/><br/>
            <textarea className="inputStyle" placeholder="Company Info" onChange={(text)=> this.userInput(text)} name="info" ref={this.info}></textarea><br/>
            <input className="inputStyle" type="text" placeholder="Company Contact" onChange={(text)=> this.userInput(text)} name="contact" ref={this.contact}/><br/>
            <input className="inputStyle" type="text" placeholder="Enter Last 3 Years Separated By Comma" onChange={(text)=> this.userInput(text)} name="revenue" ref={this.revenue}/><br/>
            <div style={{display:"flex", width:"100%", margin:10,  fontSize:18}}>
            <p style={{width:"16%", padding:10}}>Status: </p>
            <select style={{width:"65%", padding:10,  fontSize:18, borderWidth:.5, borderColor:"#000", marginBottom:20}} onChange={value => this.selectStatus(value)}>
                {status.map((item, index) => <option key={index}>{item}</option>)}
            </select>
            </div>
            <button className="buttonForm" onClick={(e) => this.addCompany(e, name, info, contact, revenue)}>Add Company</button><br/>
            </form>
        </div>
        <Company companydata={this.state.company} eraseCompany={this.eraseCompany}
        openModal={this.openModal}/>
        <Modal isOpen={this.state.isOpen} status={this.state.status}
         toggleModal={this.toggleModal} id={this.state.id} name={this.state.modalName}
          updateCompany={(id) => this.updateCompany(id, name)} />
        </>
    )
    }
}

export default CompanyForm;

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

