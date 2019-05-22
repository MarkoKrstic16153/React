import { combineReducers } from "redux";
import {IgraciReducer, utakmicaReducer, okupljanjeReducer } from "./beton-reducer";
import Igrac from '../models/Igrac';
import Utakmica from "../models/Utakmica";
import Okupljanje from "../models/Okupljanje";
export interface AppState{
    igraci:Igrac[],
    utakmice:Utakmica[],
    okupljanje:Okupljanje
}
export const rootReducer = combineReducers({
    igraci:IgraciReducer,
    utakmice:utakmicaReducer,
    okupljanje:okupljanjeReducer
    //dodaj selekted reducer
    }) 

