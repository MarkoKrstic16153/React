import { Component, Dispatch } from "react";
import React from 'react';
import Igrac from '../models/Igrac';
import {AppState} from '../store/index';
import {connect} from "react-redux";
import { Action } from 'redux';
import Utakmica from "../models/Utakmica";
interface Props{
    utakmica:Utakmica;
     }
     interface State{ 
         detalji:boolean;   
     }
     class UtakmicaCom extends Component<Props,State>{
         constructor(props:Props)
         {
             super(props);   
             this.state={detalji:false};            
         }
         render(){
             return(
                <React.Fragment>
                    <p>Utakmica je odigana na terenu {this.props.utakmica.lokacija}, datum: {this.props.utakmica.datum}</p>
                    <p>Rezultat je <label className="red">{this.props.utakmica.ekipa1Golovi}</label> : <label className="black">{this.props.utakmica.ekipa2Golovi}</label></p>
                    <p>Ishod meca je {this.vratiIshod()}<button onClick={()=>this.setState({detalji:!this.state.detalji})}>Detalji</button></p>
                   {this.state.detalji?<div className="kon"> <div className="bRed"><div><p className="red">Sastav Crvenih :</p>
                    <ul>{this.props.utakmica.ekipa1.map((r:string,ind:number)=>(<li className="rDot"key={ind}>{r}</li>))}</ul></div>
                    <div><p className="red">Strelci Crvenih</p>
                    <ul>{this.props.utakmica.strelci1.map((r:string,ind:number)=>(<li className="rDot"key={ind}>{r}</li>))}</ul></div></div>
                   <div className="bBlack"> <div><p className="black">Sastav Crnih :</p>
                   <ul>{this.props.utakmica.ekipa2.map((r:string,ind:number)=>(<li className="bDot"key={ind}>{r}</li>))}</ul></div>
                    <div><p className="black">Strelci Crnih</p>
                    <ul>{this.props.utakmica.strelci2.map((r:string,ind:number)=>(<li className="bDot"key={ind}>{r}</li>))}</ul></div></div>
                    </div>:null}
                </React.Fragment>
                )
         }
       vratiIshod()
       {
           if(this.props.utakmica.ekipa1Golovi>this.props.utakmica.ekipa2Golovi)
           return "Pobeda crvene ekipe.";
           else if(this.props.utakmica.ekipa1Golovi<this.props.utakmica.ekipa2Golovi)
           return "Pobeda crne ekipe.";
           else
           return "Neresen."
       }  
     }
     export default UtakmicaCom;