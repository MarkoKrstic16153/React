import { Component, Dispatch } from "react";
import React from 'react';
import Igrac from '../models/Igrac';
import {AppState} from '../store/index';
import {connect} from 'react-redux';
import { Action } from "redux";
import {  fetchIgraci, updateIgraci, putIgraci, dodajUtakmicu, fetchUtakmice, filterIgrace, filterUtakmice } from "../store/action";
import Utakmica from "../models/Utakmica";
import UtakmicaCom from "./UtakmicaCom";

interface Props{
utakmice:Utakmica[];
sviIgraci:Igrac[];
dohvatiIgrace:Function;
updateujIgrace:Function;
putIgrace:Function;
dodajUtakmicu:Function;
vratiSveUtakmice:Function;
filtrirajUtakmice:Function;
     }
     interface State{
         novaLokacija:string;
         noviDatum:string;
         brojUnosaIgraca:number;
         koSeUnosi:number;
         klikNaFormu:boolean;
         klikNaListu:boolean;
         golovi1:number;
         golovi2:number;
         neispravanUnos:boolean;
         strelci:number[];
         indexPrvi:number;
         indexDrugi:number;
         nizDodatih:number[];
         nizIgraca:string[];
         nizPrvihStrelaca:string[];
         nizDrugihStrelaca:string[];
         dodavanjeOverflow:boolean;
         kojaEkipa:string;
         clear:boolean;
         lokacijaPretraga:string;
         flagZaPretrazi:boolean;
     }
     class UtakmicaList extends Component<Props,State>{
        constructor(props:Props)
        {
            super(props);
           this.state={lokacijaPretraga:"",flagZaPretrazi:false,nizPrvihStrelaca:[],nizDrugihStrelaca:[],clear:false,kojaEkipa:"crvenog",dodavanjeOverflow:false,nizIgraca:[],nizDodatih:[],indexPrvi:-1,indexDrugi:-1,strelci:[],neispravanUnos:false,golovi1:0,golovi2:0,brojUnosaIgraca:0,koSeUnosi:-1,klikNaFormu:false,klikNaListu:false,novaLokacija:"",noviDatum:""};
        }
        render(){
            return(
               <React.Fragment>
                   <h2>*Utakmice*</h2>
                    <div><button onClick={()=>{this.setState({flagZaPretrazi:!this.state.klikNaListu,klikNaListu:!this.state.klikNaListu});this.props.vratiSveUtakmice()}}>Prikazi Utakmice</button><button onClick={()=>{this.setState({klikNaFormu:!this.state.klikNaFormu});this.props.dohvatiIgrace("")}}>Dodaj novu Utakmicu</button></div>
                    {this.state.flagZaPretrazi?<div>Pretrazite  Utakmice po lokaciji : <input placeholder="Lokacija" onChange={(e : React.FormEvent<HTMLInputElement>)=>{this.setState({lokacijaPretraga:e.currentTarget.value})}}></input><button onClick={()=>{if(this.state.lokacijaPretraga!=""){this.setState({flagZaPretrazi:false,lokacijaPretraga:""});this.props.filtrirajUtakmice(this.state.lokacijaPretraga)}}}>Pretrazi</button></div>:null}
                    {this.state.klikNaListu?<h3>Sve Utakmice</h3>:null}
                    {this.state.klikNaListu?this.props.utakmice.map((u:Utakmica,ind:number)=>(<div key={ind}><UtakmicaCom utakmica={u}/> </div>)):null}
                    {this.state.klikNaListu?<div><h2>Statistika</h2><p>U ligi je odigrano {this.props.utakmice.length} meca.</p><p className="red">Crveni su pobedili u {this.nadjiCrvenePobede()}/{this.props.utakmice.length}meceva, odnosno {(this.nadjiCrvenePobede()/this.props.utakmice.length)*100}%.</p><p className="black">Crni su pobedili u {this.nadjiCrnePobede()}/{this.props.utakmice.length}meceva, odnosno {(this.nadjiCrnePobede()/this.props.utakmice.length)*100}%.</p><p>Nereseno je bilo u {this.nadjiNeresene()}/{this.props.utakmice.length}meceva, odnosno {(this.nadjiNeresene()/this.props.utakmice.length)*100}%.</p></div>:null}
                       {this.state.klikNaFormu?<div> <h3>Dodaj novu Utakmicu</h3>
                        <div>Unesite lokaciju meca : <input placeholder="Lokacija" onChange={(e : React.FormEvent<HTMLInputElement>)=>{this.setState({novaLokacija:e.currentTarget.value})}}></input></div>
                        <div>Unesite datum meca : <input placeholder="Datum" onChange={(e : React.FormEvent<HTMLInputElement>)=>{this.setState({noviDatum:e.currentTarget.value})}}></input></div>
                        {this.state.brojUnosaIgraca!=10?<div><label>Dodajte {this.state.brojUnosaIgraca%5+1}. Igraca {this.state.kojaEkipa} tima :</label><select onChange={(e : React.FormEvent<HTMLSelectElement>)=>{console.log(e.currentTarget.value);this.setState({koSeUnosi:+e.currentTarget.value,clear:true})}}><option></option>{this.props.sviIgraci.map((ig:Igrac,ind:number)=>(this.daLiJeSelektovanaOpcija(ig)?<option value={ig.id} key={ig.id}>{ig.brojDresa +" "+ig.ime+" "+ig.prezime}</option>:null))}</select>{this.state.clear?<label><button onClick={()=>{if(this.state.brojUnosaIgraca<10){console.log("Dodaje se igrac "+this.state.koSeUnosi);this.setState({brojUnosaIgraca:this.state.brojUnosaIgraca+1,kojaEkipa:"crvenog",dodavanjeOverflow:false,clear:false});this.state.nizIgraca.push(this.vratiInfo(this.state.koSeUnosi));this.state.nizDodatih.push(this.state.koSeUnosi);}else this.setState({dodavanjeOverflow:true});if(this.state.brojUnosaIgraca>=4)this.setState({kojaEkipa:"crnog"});if(this.state.brojUnosaIgraca==9)this.setState({dodavanjeOverflow:true})}}>Dodaj Igraca</button></label>:null}</div>:<div>{}Dodali ste Sve Igrace</div>}
                        {this.state.dodavanjeOverflow?<div>Selektujte Strelce prve ekipe  <select onChange={(e : React.FormEvent<HTMLSelectElement>)=>{console.log(e.currentTarget.value);this.setState({indexPrvi:+e.currentTarget.value})}}><option></option>{this.vratiSamoKojiIgraju(true).map((ig:Igrac,ind:number)=>(<option value={ig.id} key={ig.id}>{ig.brojDresa +" "+ig.ime+" "+ig.prezime}</option>))}</select><button onClick={()=>{console.log("Prvi tim "+this.state.indexPrvi);this.setState({golovi1:this.state.golovi1+1});this.state.strelci.push(this.state.indexPrvi);this.state.nizPrvihStrelaca.push(this.vratiInfo(this.state.indexPrvi))}}>Dodajte gol prvoj ekipi</button>    
                        Selektujte Strelce druge ekipe  <select onChange={(e : React.FormEvent<HTMLSelectElement>)=>{console.log(e.currentTarget.value);this.setState({indexDrugi:+e.currentTarget.value})}}><option></option>{this.vratiSamoKojiIgraju(false).map((ig:Igrac,ind:number)=>(<option value={ig.id} key={ig.id}>{ig.brojDresa +" "+ig.ime+" "+ig.prezime}</option>))}</select><button onClick={()=>{console.log("Drugi tim "+this.state.indexDrugi);this.setState({golovi2:this.state.golovi2+1});this.state.strelci.push(this.state.indexDrugi);this.state.nizDrugihStrelaca.push(this.vratiInfo(this.state.indexDrugi))}}>Dodajte gol drugoj ekipi</button></div>:null}
                        {this.state.dodavanjeOverflow?<div>Trenutni Rezultat je {this.state.golovi1} : {this.state.golovi2}</div>:null}
                        <div><button onClick={()=>{if(this.state.brojUnosaIgraca<=9){this.setState({neispravanUnos:true})}else {this.setState({neispravanUnos:false});console.log(this.state.strelci);console.log(this.state.nizDodatih);this.props.updateujIgrace(this.state.strelci,this.state.nizDodatih);this.props.putIgrace(this.props.sviIgraci,this.state.strelci,this.state.nizDodatih);this.props.dodajUtakmicu({datum:this.state.noviDatum,lokacija:this.state.novaLokacija,ekipa1Golovi:this.state.golovi1,ekipa2Golovi:this.state.golovi2,ekipa1:this.vratiPrvi(),ekipa2:this.vratiDrugi(),strelci1:this.state.nizPrvihStrelaca,strelci2:this.state.nizDrugihStrelaca});this.setState({nizPrvihStrelaca:[],nizDrugihStrelaca:[],brojUnosaIgraca:0,kojaEkipa:"crvenog",nizDodatih:[],nizIgraca:[],strelci:[]})}}}>Dodajte Utakmicu</button><label>{this.state.neispravanUnos?"Niste uneli dovoljan broj igraca!":null}</label></div></div>:null}
               </React.Fragment>
            )
        }
        nadjiCrvenePobede()
        {
            let i,vrati:number;
            vrati=0;
            for(i=0;i<this.props.utakmice.length;i++)
            {
                if(this.props.utakmice[i].ekipa1Golovi>this.props.utakmice[i].ekipa2Golovi)
                vrati++;
            }
            return vrati;
        }
        nadjiCrnePobede()
        {
            let i,vrati:number;
            vrati=0;
            for(i=0;i<this.props.utakmice.length;i++)
            {
                if(this.props.utakmice[i].ekipa1Golovi<this.props.utakmice[i].ekipa2Golovi)
                vrati++;
            }
            return vrati;
        }
        nadjiNeresene()
        {
            let i,vrati:number;
            vrati=0;
            for(i=0;i<this.props.utakmice.length;i++)
            {
                if(this.props.utakmice[i].ekipa1Golovi==this.props.utakmice[i].ekipa2Golovi)
                vrati++;
            }
            return vrati;
        }
        vratiSamoKojiIgraju(f:boolean)
        {
            let i,j:number;
            let niz:Igrac[]=[];
            if(f==true)
            for(i=0;i<this.state.nizDodatih.length/2;i++)
            {
                for(j=0;j<this.props.sviIgraci.length;j++)
                {
                    if(this.state.nizDodatih[i]==this.props.sviIgraci[j].id)
                    {
                            niz.push(this.props.sviIgraci[j]);
                    }
                }
            }
            else
            for(i=this.state.nizDodatih.length/2;i<this.state.nizDodatih.length;i++)
            {
                for(j=0;j<this.props.sviIgraci.length;j++)
                {
                    if(this.state.nizDodatih[i]==this.props.sviIgraci[j].id)
                    {
                            niz.push(this.props.sviIgraci[j]);
                    }
                }
            }
            return niz;
        }
        vratiPrvi()
        {
            let i:number;
            let niz:string[]=[];
            for(i=0;i<this.state.nizIgraca.length/2;i++)
            {
                niz.push(this.state.nizIgraca[i])
            }
            return niz;
        }
        vratiDrugi()
        {
            let i:number;
            let niz:string[]=[];
            for(i=this.state.nizIgraca.length/2;i<this.state.nizIgraca.length;i++)
            {
                niz.push(this.state.nizIgraca[i])
            }
            return niz;
        }
        vratiInfo(idd:number)
        {
            let j:number;
            for(j=0;j<this.props.sviIgraci.length;j++)
            {
                    if(this.props.sviIgraci[j].id==idd)
                    return this.props.sviIgraci[j].brojDresa+" "+this.props.sviIgraci[j].ime+" "+this.props.sviIgraci[j].prezime;
            }
           return "" 
        }
        daLiJeSelektovanaOpcija(ig:Igrac)
        {
           let j:number;
                for(j=0;j<this.state.nizDodatih.length;j++)
                {
                        if(ig.id==this.state.nizDodatih[j])
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
        sviIgraci:state.igraci,
        utakmice:state.utakmice
    }
    }
    const mapDispatchToProps = (dispatch:Dispatch<Action>) => ({
        dohvatiIgrace:(dod:string)=>dispatch(fetchIgraci(dod)),
        updateujIgrace:(stre:number[],igr:number[])=>dispatch(updateIgraci(stre,igr)),
        putIgrace:(IGR:Igrac[],stre:number[],igr:number[])=>dispatch(putIgraci(IGR,stre,igr)),
        dodajUtakmicu:(u:Utakmica)=>dispatch(dodajUtakmicu(u)),
        vratiSveUtakmice:()=>dispatch(fetchUtakmice()),
        filtrirajUtakmice:(filter:string)=>dispatch(filterUtakmice(filter))
    });
    export default connect(mapStateToProps,mapDispatchToProps) (UtakmicaList);