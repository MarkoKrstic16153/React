import {PUT_IGRACI,DOHVATI_OKUPLJANJE,SAVE_IGRAC, SaveIgrac, FETCH_IGRACI, addIgraci, DELETE_IGRAC, DeleteIgrac, passOkupljanje,fetchIgraci, FetchIgraci, PutIgraci, DODAJ_UTAKMICU, DodajUtakmicu, FETCH_UTAKMICE, fetchUtakmice, ubaciUtakmice, DODAJ_OKUPLJANJE, DodajOkupljanje} from './action';
import {all, takeEvery,put} from 'redux-saga/effects';
import { dodajOkupljanjee,fetchujOkupljanje,postUtakmica,dohvatiUtakmice,savujIgraca,getAllIgraci,delIgrac,putuj} from '../services/beton.service';
function* fetchPlayers(action :FetchIgraci)
{
    const igraci=yield getAllIgraci(action.dodatak);
    console.log(igraci);
    yield put(addIgraci(igraci));
}
function* zapamtiIgraca(action:SaveIgrac)
{
    yield savujIgraca(action.igrac);
    yield put(fetchIgraci(""));
}
function* obrisiIgraca(action:DeleteIgrac)
{
    yield delIgrac(action.id);
    yield put(fetchIgraci(""));
}

function* putujIgraci(action:PutIgraci)
{
    yield putuj(action.igraci,action.strelci,action.nastupi);
    yield put(fetchIgraci(""));
}

function* addUtakmica(action:DodajUtakmicu)
{
yield postUtakmica(action.utakmica);
yield put(fetchUtakmice());
yield put(fetchIgraci(""));
}
function* fetchujUtakmice()
{
    const utakmice=yield dohvatiUtakmice();
    console.log(utakmice);
    yield put(ubaciUtakmice(utakmice));
}
function* addOkupljanje(action:DodajOkupljanje)
{
const ok=yield dodajOkupljanjee(action.okupljanje);
yield put(passOkupljanje(ok));
}
function* fetchOkupljanje()
{
const okupljanje=yield fetchujOkupljanje();
yield put(passOkupljanje(okupljanje));
}
export function* rootSaga()
{
    yield all([
        takeEvery(SAVE_IGRAC,zapamtiIgraca),
        takeEvery(FETCH_IGRACI,fetchPlayers),
        takeEvery(DELETE_IGRAC,obrisiIgraca),
        takeEvery(PUT_IGRACI,putujIgraci),
        takeEvery(DODAJ_UTAKMICU,addUtakmica),
        takeEvery(FETCH_UTAKMICE,fetchujUtakmice),
        takeEvery(DODAJ_OKUPLJANJE,addOkupljanje),
        takeEvery(DOHVATI_OKUPLJANJE,fetchOkupljanje)
    ])
}