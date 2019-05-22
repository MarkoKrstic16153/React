import { Component, Dispatch } from "react";
import React from 'react';
import Igrac from "../models/Igrac";
interface Props{
   player:Igrac;
    }
    interface State{
    }
    class IgracCom extends Component<Props,State>{
        constructor(props:Props)
        {
            super(props);
        }
        render(){
            return(
               <React.Fragment> <p>* {this.props.player.brojDresa + " "+this.props.player.ime+ " "+this.props.player.prezime+", pozicija "+this.props.player.pozicija+" ,broj golova :"+this.props.player.brojGolova+ " ,broj nastupa :"+this.props.player.brojUtakmica}</p><label>Kontakt {this.props.player.kontakt}</label> *</React.Fragment>
            )
        }
    }
    export default IgracCom;
