import { Component, Dispatch } from "react";
import React from 'react';
import Igrac from '../models/Igrac';
import {AppState} from '../store/index';
import {connect} from "react-redux";
import { Action } from "redux";
import {  fetchIgraci, updateIgraci, putIgraci, dodajUtakmicu, fetchUtakmice, dodajOkupljanje, dohvatiOkupljanje, updateDolazak } from "../store/action";
import Utakmica from "../models/Utakmica";
import UtakmicaCom from "./UtakmicaCom";
import Okupljanje from "../models/Okupljanje";

interface Props{
    igraci:Igrac[];
    okupljanje:Okupljanje;
    dohvatiIgrace:Function;
    dodajOkupljanje:Function;
    dohvatiOkupljanje:Function;
    update:Function;
     }
     interface State{ 
          klikNaPrikazi:boolean;
          klikNaNapravi:boolean;  
          novoVreme:string;
          noviDatum:string;
          novaLokacija:string;
          legalniUnos:boolean;
          noviSemafor:boolean;
          unetaSifra:string;
          uhvacenId:number;
          losLogin:boolean;
          akcija:boolean;
          message:string;
          dodajOkSifra:string;
     }
     class OkupljanjeCom extends Component<Props,State>{
        constructor(props:Props)
        {
            super(props);   
            this.state={dodajOkSifra:"",message:"",uhvacenId:-1,losLogin:true,unetaSifra:"",akcija:false,noviSemafor:false,legalniUnos:true,klikNaNapravi:false,klikNaPrikazi:false,noviDatum:"",novoVreme:"",novaLokacija:""};       
        }
        render(){
                return(
                    <React.Fragment>
                        <h2>Okupljanje</h2>
                        <div ><button onClick={()=>{this.setState({klikNaPrikazi:!this.state.klikNaPrikazi,noviSemafor:!this.state.noviSemafor,akcija:true,message:"",unetaSifra:"",uhvacenId:-1,losLogin:true});this.props.dohvatiIgrace("");this.props.dohvatiOkupljanje();}}>Prikazi Okupljanje</button><button onClick={()=>{this.props.dohvatiIgrace("");this.setState({klikNaNapravi:!this.state.klikNaNapravi,dodajOkSifra:""})}}>Napravi Okupljanje</button></div>
                        {this.state.klikNaNapravi?<div><div>Unesite Lokaciju <input placeholder="Lokacija" onChange={(e : React.FormEvent<HTMLInputElement>)=>{this.setState({novaLokacija:e.currentTarget.value})}}></input></div><div>Unesite Datum <input placeholder="Datum" onChange={(e : React.FormEvent<HTMLInputElement>)=>{this.setState({noviDatum:e.currentTarget.value})}}></input></div><div>Unesite Vreme <input placeholder="Vreme" onChange={(e : React.FormEvent<HTMLInputElement>)=>{this.setState({novoVreme:e.currentTarget.value})}}></input></div><div>Unesite Sifru <input placeholder="Sifra" type="password" onChange={(e : React.FormEvent<HTMLInputElement>)=>{this.setState({dodajOkSifra:e.currentTarget.value})}}></input></div><div><button onClick={()=>{if(this.state.novoVreme!="" && this.state.noviDatum!="" && this.state.novaLokacija!="" && this.dodajOkupljanjeAutetifikuj()){this.props.dodajOkupljanje({datum:this.state.noviDatum,lokacija:this.state.novaLokacija,vreme:this.state.novoVreme,dolaze:[],sifra:this.state.dodajOkSifra});this.setState({klikNaNapravi:false,legalniUnos:true})}else{this.setState({legalniUnos:false})}}}>Napravi Dogadjaj</button></div>{this.komentar()}</div>:null}
                        {this.state.noviSemafor && this.state.losLogin && this.props.okupljanje.datum!=""?<div><div>Unesite Vasu sifru <input type="password" onChange={(e : React.FormEvent<HTMLInputElement>)=>{this.setState({unetaSifra:e.currentTarget.value})}}></input><button onClick={()=>{this.autentifikuj()}}>Login</button><label>{this.state.message}</label></div></div>:this.state.klikNaPrikazi && this.props.okupljanje.vreme=="" && this.state.akcija?<div>Trenutno Nema zakazanih Okupljanja, organizujte novo!</div>:null}
                        {this.state.losLogin?null:<div><h3>Lista pozvanih igraca</h3><div>Mesto :{this.props.okupljanje.lokacija} Datum :{this.props.okupljanje.datum} Vreme :{this.props.okupljanje.vreme}</div><div>{this.props.igraci.map((i:Igrac,ind:number)=>(<li key={ind}className="okupljanjeLista">{i.brojDresa} {i.ime} {i.prezime} {this.daLiNeDolazi(i.id) && i.id==this.state.uhvacenId?<button onClick={()=>{this.props.update(this.state.uhvacenId);this.props.dodajOkupljanje(this.props.okupljanje);}}>Dolazim</button>:null}  {this.daLiNeDolazi(i.id)?<label>Status : Ne Dolazi</label>:<label>Status : Dolazi</label>}  </li>))}</div><p>Trenutno dolaze {this.props.okupljanje.dolaze.length} igraca.  {this.props.okupljanje.sifra==this.state.unetaSifra?<button onClick={()=>{this.props.dodajOkupljanje({datum:"",vreme:"",lokacija:"",dolaze:[]});this.setState({losLogin:true,uhvacenId:-1,unetaSifra:"",message:"",klikNaPrikazi:false})}}>Zavrsi Okupljanje</button>:null} </p></div>}
                    </React.Fragment>
                )
        }
        
        autentifikuj()
        {
         let i :number; 
         for(i=0;i<this.props.igraci.length;i++)
         {
             if(this.props.igraci[i].sifra==this.state.unetaSifra)
             {
                  this.setState({losLogin:false,uhvacenId:this.props.igraci[i].id,message:this.props.igraci[i].ime +" "+this.props.igraci[i].prezime});
                  
                  console.log("Uspesan");
                  return;
             }
         }
         this.setState({losLogin:true,uhvacenId:-1,message:"Nepostojeci password, pokusajte opet"})
        }
        dodajOkupljanjeAutetifikuj()
        {
            let i :number;
            for(i=0;i<this.props.igraci.length;i++)
            {
                if(this.props.igraci[i].sifra==this.state.dodajOkSifra)
                return true;
            }
            return false;
        }
        komentar(){
            if(this.state.legalniUnos==false)
            {
                return "Nevalidni Unos!";
            }
            return "";
        }
        daLiNeDolazi(index:any)
        {
            let i:number;
            for(i=0;i<this.props.okupljanje.dolaze.length;i++)
            {
                    if(this.props.okupljanje.dolaze[i]==index)
                    return false;
            }
            return true;
        }
    }
    function mapStateToProps(state:AppState)
    {
        state.igraci.forEach(i=>{
            console.log(i.ime+" "+i.prezime);
        })
    return {
        igraci:state.igraci,
        okupljanje:state.okupljanje
    }
    }
    const mapDispatchToProps = (dispatch:Dispatch<Action>) => ({
        dohvatiIgrace:(str:string)=>dispatch(fetchIgraci(str)),
        dodajOkupljanje:(okup:Okupljanje)=>dispatch(dodajOkupljanje(okup)),
        dohvatiOkupljanje:()=>dispatch(dohvatiOkupljanje()),
        update:(id:number)=>dispatch(updateDolazak(id))
    });

    export default connect(mapStateToProps,mapDispatchToProps) (OkupljanjeCom);