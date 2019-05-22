import {Action} from "redux";
import Igrac from '../models/Igrac';
import Utakmica from '../models/Utakmica';
import Okupljanje from "../models/Okupljanje";
export const DELETE_IGRAC="DELETE_IGRAC";
export const ADD_IGRAC="ADD_IGRAC";
export const FETCH_IGRACI="FETCH_IGRACI";
export const SAVE_IGRAC="SAVE_IGRAC";
export const ADD_IGRACI="ADD_IGRACI";
export const CLEAR_IGRACI="CLEAR_IGRACI";
export const UPDATE_IGRACI="UPDATE_IGRACI";
export const PUT_IGRACI="PUT_IGRACI";
export const DODAJ_UTAKMICU="DODAJ_UTAKMICU";
export const FETCH_UTAKMICE="FETCH_UTAKMICE";
export const UBACI_UTAKMICE="UBACI_UTAKMICE";
export const FILTER_IGRACE="FILTER_IGRACE";
export const DODAJ_OKUPLJANJE="DODAJ_OKUPLJANJE";
export const DOHVATI_OKUPLJANJE="DOHVATI_OKUPLJANJE";
export const PASS_OKUPLJANJE="PASS_OKUPLJANJE";
export const UPDATE_DOLAZAK="UPDATE_DOLAZAK";
export const FILTER_UTAKMICE="FILTER_UTAKMICE";

export interface FilterUtakmice extends Action {
    filter:string;
}
export function filterUtakmice(filter:string):FilterUtakmice{
    return {
            type:FILTER_UTAKMICE,
            filter:filter
    }
}
export interface UpdateDolazak extends Action{
    id:number;
}
export function updateDolazak(id:number):UpdateDolazak
{
return {
    type:UPDATE_DOLAZAK,
    id:id
}
}
export interface PassOkupljanje extends Action{
    okupljanje:Okupljanje;
}
export function passOkupljanje(okupljanje:Okupljanje) :PassOkupljanje{
    return {
        type:PASS_OKUPLJANJE,
        okupljanje:okupljanje
    }
}
export interface DohvatiOkupljanje extends Action{
}
export function dohvatiOkupljanje():DohvatiOkupljanje{
    return {
        type:DOHVATI_OKUPLJANJE
    }
}
export interface DodajOkupljanje extends Action{
    okupljanje:Okupljanje;
}
export function dodajOkupljanje(okupljanje:Okupljanje) :DodajOkupljanje{
    return{
        type:DODAJ_OKUPLJANJE,
        okupljanje:okupljanje
    }
}
export interface FilterIgrace extends Action{
    filter:string;
}
export function filterIgrace(filter:string) :FilterIgrace{
    return {
        type:FILTER_IGRACE,
        filter:filter
    }
}
export interface UbaciUtakmice extends Action{
    utakmice:Utakmica[];
}
export function ubaciUtakmice(utakmice:Utakmica[]):UbaciUtakmice{
    return{
        type:UBACI_UTAKMICE,
        utakmice:utakmice
    }
}
export interface FetchUtakmice extends Action{
   
}
export function fetchUtakmice() :FetchUtakmice
{
    return{
        type:FETCH_UTAKMICE
    }
}

export interface DodajUtakmicu extends Action{
    utakmica:Utakmica;
}

export function dodajUtakmicu(utakmica:Utakmica) :DodajUtakmicu{
    return {
        type:DODAJ_UTAKMICU,
        utakmica:utakmica
    }
}

export interface PutIgraci extends Action{
    igraci:Igrac[];
    strelci:number[];
    nastupi:number[];
}
export function putIgraci(igraci:Igrac[],strelci:number[],nastupi:number[]):PutIgraci
{
    return{
        type:PUT_IGRACI,
        igraci:igraci,
        strelci:strelci,
        nastupi:nastupi
    }
}

export interface UpdateIgraci extends Action{
    strelci:number[];
    nastupi:number[];
}
export interface ClearIgraci extends Action{

}
export function updateIgraci(strelci:number[],nastupi:number[]) :UpdateIgraci
{
    return {
        type:UPDATE_IGRACI,
        strelci:strelci,
        nastupi:nastupi
    }
}
export function clearIgraci() :ClearIgraci{
    return {
        type:CLEAR_IGRACI
    }
}

export interface DeleteIgrac extends Action{
    id:number;
}
export function deleteIgrac(id:number):DeleteIgrac
{
    return {
        type:DELETE_IGRAC,
        id:id
    }
}

export interface FetchIgraci extends Action{
    dodatak:string
    }
    export function fetchIgraci(dodatak:string):FetchIgraci
    {
        return {
            type:FETCH_IGRACI,
            dodatak:dodatak
        }
    }

export interface SaveIgrac extends Action{
    igrac:Igrac;
}
export function saveIgrac(igrac:Igrac) : SaveIgrac{
    return {
        type:SAVE_IGRAC,
        igrac:igrac
    }
}
    export interface AddIgraci extends Action{
        igraci:Igrac[];
    }
    export function addIgraci(igraci:Igrac[]):AddIgraci{
        return{
            type:ADD_IGRACI,
            igraci:igraci
        }
    }


