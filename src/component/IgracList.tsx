import { Component, Dispatch } from "react";
import React from 'react';
import Igrac from '../models/Igrac';
import {AppState} from '../store/index';
import {connect} from 'react-redux';
import { Action } from "redux";
import IgracCom from './IgracCom';
import { saveIgrac, fetchIgraci, deleteIgrac, clearIgraci, filterIgrace } from "../store/action";
interface Props{
    players:Igrac[];
    filtriraj:Function;
    saveIgraca:Function;
    fetchIgrace:Function;
    deleteIgrac:Function;
    clearIgracii:Function;
     }
     interface State{
        igraci:Igrac[];
        novaSifra:string;
        novoIme:string;
        novoPrezime:string;
        noviKontakt:string;
        noviBroj:number;
        novaPozicija:string;
        nijePrikazanoNesto:boolean;
        najStrelac:boolean;
        najIgrac:boolean;
        brojPretrage:number;
        pretraga:boolean;
        filter:string;
     }
     class IgracList extends Component<Props,State>{
        constructor(props:Props)
        {
            super(props);
            this.state={novaSifra:"",igraci:this.props.players,novoIme:"",novoPrezime:"",noviKontakt:"",noviBroj:0,novaPozicija:"Napad",nijePrikazanoNesto:true,najStrelac:false,najIgrac:false,brojPretrage:0,pretraga:false,filter:""};           
        }
        render(){
            return(
               <React.Fragment><h2>*Igraci*</h2>
                   {this.state.nijePrikazanoNesto?<button onClick={()=>{this.setState({nijePrikazanoNesto:false,najIgrac:false,najStrelac:false});this.props.fetchIgrace("");this.setState({filter:"igrac"})}}>Prikazi Sve Igrace </button>
                    
                   :<button onClick={()=>{this.setState({nijePrikazanoNesto:true});this.props.clearIgracii()}}>Ocisti</button>}
                   {this.state.nijePrikazanoNesto?null:<h3> Svi {this.state.filter}i </h3>}
               <ul>{this.state.nijePrikazanoNesto?null:this.props.players.map((ig:Igrac,ind:number)=>(<li key={ind} className="okvir"><IgracCom player={{id:ig.id,ime:ig.ime,prezime:ig.prezime,kontakt:ig.kontakt,brojDresa:ig.brojDresa,brojGolova:ig.brojGolova,brojUtakmica:ig.brojUtakmica,pozicija:ig.pozicija}}/><button onClick={()=>this.props.deleteIgrac(ig.id)}>Obrisi</button></li>))}</ul>
               {this.state.nijePrikazanoNesto?null:<div><p>U ligi se trenutno nalaze {this.props.players.length} {this.state.filter}a.</p></div>}
               {this.state.nijePrikazanoNesto?<div > <button onClick={()=>{this.setState({nijePrikazanoNesto:false,najIgrac:false,najStrelac:false});this.props.fetchIgrace("?pozicija=Napad");this.setState({filter:"napadac"})}}> Prikazi Napadace</button><button onClick={()=>{this.setState({nijePrikazanoNesto:false,najIgrac:false,najStrelac:false});this.props.fetchIgrace("?pozicija=Odbrana");this.setState({filter:"odbramben"})}}> Prikazi Odbrambene</button><button onClick={()=>{this.setState({nijePrikazanoNesto:false,najIgrac:false,najStrelac:false});this.props.fetchIgrace("?pozicija=Golman");this.setState({filter:"golman"})}}> Prikazi Golmane</button><button onClick={()=>{this.setState({nijePrikazanoNesto:false,najIgrac:false,najStrelac:false});this.props.fetchIgrace("?pozicija=Rezerva");this.setState({filter:"rezervn"})}}> Prikazi Rezervne</button></div>:null}
               {this.state.nijePrikazanoNesto?null:<div><div><button onClick={()=>this.setState({najStrelac:true})}>Prikazi Najboljeg Strelca</button>{this.state.najStrelac?<label>{this.najboljiStrelac()}<button onClick={()=>{this.setState({najStrelac:false})}}>Ocisti</button></label>:null}</div><div><button onClick={()=>this.setState({najIgrac:true})}>Prikazi Najiskusnijeg Igraca</button>{this.state.najIgrac?<label>{this.najiskusnijiIgrac()}<button onClick={()=>{this.setState({najIgrac:false})}}>Ocisti</button></label>:null}</div></div>}
               {this.state.nijePrikazanoNesto?null:<p>Pretrazi igrace po broju dresa : <input  type="number" value={this.state.brojPretrage}  onChange={(e : React.FormEvent<HTMLInputElement>)=>{this.setState({brojPretrage:+e.currentTarget.value})}}></input> <button onClick={()=>{this.setState({pretraga:true})}}>Pretrazi</button></p>}
               {this.state.pretraga?<p>{this.vratiTrazenog()}<button onClick={()=>{this.setState({pretraga:false})}}>Skloni</button></p>:null}
               <h3>Dodajte novog Igraca</h3>
               <p>Unesite ime igraca <input placeholder="Ime" onChange={(e : React.FormEvent<HTMLInputElement>)=>{this.setState({novoIme:e.currentTarget.value})}}/></p>
               <p>Unesite prezime igraca <input placeholder="Prezime" onChange={(e : React.FormEvent<HTMLInputElement>)=>{this.setState({novoPrezime:e.currentTarget.value})}}/></p>
               <p>Unesite kontakt igraca <input placeholder="Kontakt" onChange={(e : React.FormEvent<HTMLInputElement>)=>{this.setState({noviKontakt:e.currentTarget.value})}}/></p>
               <p>Unesite broj dresa igraca <input type="number" value={this.state.noviBroj} onChange={(e : React.FormEvent<HTMLInputElement>)=>{this.setState({noviBroj:+e.currentTarget.value})}}/></p>
               <p>Unesite poziciju igraca <select onChange={(e : React.FormEvent<HTMLSelectElement>)=>{this.setState({novaSifra:e.currentTarget.value})}}><option > </option><option value="Napad">Napad</option><option value="Odbrana">Odbrana</option><option value="Golman">Golman</option><option value="Rezerva">Rezerva</option></select></p>
               <p>Unesite vasu sifru <input type="password" placeholder="Sifra" onChange={(e : React.FormEvent<HTMLInputElement>)=>{this.setState({novoIme:e.currentTarget.value})}}></input></p>
               <p><button onClick={()=>{console.log(this.state.novoIme+" "+this.state.noviBroj+" "+this.state.novaPozicija);this.props.saveIgraca({ime:this.state.novoIme,prezime:this.state.novoPrezime,kontakt:this.state.noviKontakt,brojDresa:this.state.noviBroj,pozicija:this.state.novaPozicija,brojGolova:0,brojUtakmica:0,id:0,sifra:this.state.novaSifra});this.setState({nijePrikazanoNesto:false});this.setState({filter:"igrac"})}}>Dodaj Igraca</button></p>
               
               </React.Fragment>)
        }
        najboljiStrelac(){
            let i:number;
            let najviseGolova:number=-1;
            let maxIndex=-1;
            for(i=0;i<this.props.players.length;i++)
            {
                    if(this.props.players[i].brojGolova>najviseGolova)
                    {
                        najviseGolova=this.props.players[i].brojGolova;
                        maxIndex=i;
                    }
            }
            if(this.props.players.length==0)
            {
                return "Nema Igraca";
            }
            else{
                return this.props.players[maxIndex].brojDresa + " "+this.props.players[maxIndex].ime+ " "+this.props.players[maxIndex].prezime+", pozicija "+this.props.players[maxIndex].pozicija+" ,broj golova :"+this.props.players[maxIndex].brojGolova+ " ,broj nastupa :"+this.props.players[maxIndex].brojUtakmica+" ,kontakt "+this.props.players[maxIndex].kontakt;
            }
        } 
        najiskusnijiIgrac(){
            let i:number;
            let najviseNastupa:number=-1;
            let maxIndex=-1;
            for(i=0;i<this.props.players.length;i++)
            {
                    if(this.props.players[i].brojUtakmica>najviseNastupa)
                    {
                        najviseNastupa=this.props.players[i].brojUtakmica;
                        maxIndex=i;
                    }
            }
            if(this.props.players.length==0)
            {
                return "Nema Igraca";
            }
            else{
                return this.props.players[maxIndex].brojDresa + " "+this.props.players[maxIndex].ime+ " "+this.props.players[maxIndex].prezime+", pozicija "+this.props.players[maxIndex].pozicija+" ,broj golova :"+this.props.players[maxIndex].brojGolova+ " ,broj nastupa :"+this.props.players[maxIndex].brojUtakmica+" ,kontakt "+this.props.players[maxIndex].kontakt;
            }
        }
        vratiTrazenog()
        {
            let flag:boolean=true;
            let i:number;
            for(i=0;i<this.props.players.length;i++)
            {
                    if(this.props.players[i].brojDresa==this.state.brojPretrage)
                    {
                        return this.props.players[i].brojDresa + " "+this.props.players[i].ime+ " "+this.props.players[i].prezime+", pozicija "+this.props.players[i].pozicija+" ,broj golova :"+this.props.players[i].brojGolova+ " ,broj nastupa :"+this.props.players[i].brojUtakmica+" ,kontakt "+this.props.players[i].kontakt;
                    }
            }
            return "Nema igraca sa tim brojem";
        }   
    }
    function mapStateToProps(state:AppState)
    {
        state.igraci.forEach(i=>{
            console.log(i.ime+" "+i.prezime);
        })
    return {
        players:state.igraci,
    }
    }
    const mapDispatchToProps = (dispatch:Dispatch<Action>) => ({
        
        saveIgraca: (ig:Igrac)=>dispatch(saveIgrac(ig)),
        fetchIgrace:(dod:string)=>dispatch(fetchIgraci(dod)),
        deleteIgrac:(id:number)=>dispatch(deleteIgrac(id)),
        clearIgracii:()=>dispatch(clearIgraci()),
        filtriraj:(filter:string)=>dispatch(filterIgrace(filter))
    });
    export default connect(mapStateToProps,mapDispatchToProps) (IgracList);