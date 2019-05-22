import {Action} from "redux";
import Igrac from '../models/Igrac';
import Utakmica from '../models/Utakmica';
import {FilterIgrace,UbaciUtakmice, SAVE_IGRAC, ADD_IGRACI,PassOkupljanje, AddIgraci, CLEAR_IGRACI, UPDATE_IGRACI, UpdateIgraci, UBACI_UTAKMICE, FILTER_IGRACE, PASS_OKUPLJANJE, UPDATE_DOLAZAK, UpdateDolazak, FILTER_UTAKMICE, FilterUtakmice} from "./action";
import Okupljanje from "../models/Okupljanje";

const pocetni:Igrac[]=[];
const defUtamice:Utakmica[]=[];
const defOkupljanje:Okupljanje={datum:"",vreme:"",lokacija:"",dolaze:[]};
export function IgraciReducer(state:Igrac[]=pocetni,action:Action)
{
    switch(action.type)
    {
        case UPDATE_IGRACI:{
            const {strelci}=action as UpdateIgraci;
            const {nastupi}=action as UpdateIgraci;
            let i,j:number;
            for(i=0;i<strelci.length;i++)
            {
                for(j=0;j<state.length;j++)
                {
                    if(strelci[i]==state[j].id)
                    {
                        state[j].brojGolova++;
                    }
                }
            }
            for(i=0;i<nastupi.length;i++)
            {
                for(j=0;j<state.length;j++)
                {
                    if(nastupi[i]==state[j].id)
                    {
                        state[j].brojUtakmica++;
                    }
                }
            }
            return state;
        }
        case CLEAR_IGRACI:{
            state=[];
            return state;
        }
        case FILTER_IGRACE:{
            const {filter}=action as FilterIgrace;
            return state.filter((i:Igrac)=>{i.pozicija==filter})
        }
        case SAVE_IGRAC:{
            return state;
        }
        case ADD_IGRACI:{
            const {igraci}=action as AddIgraci;
            state=igraci;
            return state;
        }
        default:return state;
    }
}
export function utakmicaReducer (state:Utakmica[]=defUtamice,action:Action)
{
switch(action.type)
{
    case UBACI_UTAKMICE:{
        const {utakmice} =action as UbaciUtakmice;
        state=utakmice;
        return state;
    }
    case FILTER_UTAKMICE:{
        const {filter}=action as FilterUtakmice;
        console.log(filter);
        const fil=state.filter((u:Utakmica)=>u.lokacija==filter)
        console.log(fil);
        state=fil;
        return state;
    }
    default:return state;
}
}
export function okupljanjeReducer (state:Okupljanje=defOkupljanje,action:Action)
{
    switch(action.type)
    {
        case PASS_OKUPLJANJE:{
            const {okupljanje}=action as PassOkupljanje;
            state=okupljanje;
            return state;
        }
        case UPDATE_DOLAZAK:{
            const {id}=action as UpdateDolazak;
            const pom=state;
            pom.dolaze.push(id);
            state=pom;
            return state;
        }
        default:return state;
    }
}
