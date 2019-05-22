import Igrac from "../models/Igrac";
import Utakmica from "../models/Utakmica";
import Okupljanje from "../models/Okupljanje";
const url1='http://localhost:3001/igraci'
const url2='http://localhost:3001/utakmice'
const url3='http://localhost:3001/okupljanje'
export function fetchujOkupljanje()
{

    return fetch(url3)
    .then(response=>response.json());
}
export function dodajOkupljanjee(okupljanje:Okupljanje){
    const podaci={      
        method:"put",
        headers: new Headers({
          'Content-Type': 'application/json', 
    }),
        body: JSON.stringify(okupljanje)
    };
    return fetch(url3,podaci)
    .then(response=>response.json());
}
export function dohvatiUtakmice()
{
    return fetch(url2)
    .then(response=>response.json());
}
export function postUtakmica(utakmica:Utakmica)
{
    const podaci={      
        method:"post",
        headers: new Headers({
          'Content-Type': 'application/json', 
    }),
        body: JSON.stringify(utakmica)
    };
     fetch(url2,podaci)
    .then(response=>response.json());
}
export function getAllIgraci(dod:string)
{
    return fetch(url1+dod)
    .then(response=>response.json());
}
export function delIgrac(id:number)
{
    const podaci={      
        method:"delete",
        headers: new Headers({
          'Content-Type': 'application/json', 
    }),
        
    };
    return fetch(url1+"/"+id,podaci)
    .then(response=>response.json());
}
export function savujIgraca(igrac:Igrac)
{
    const podaci={      
        method:"post",
        headers: new Headers({
          'Content-Type': 'application/json', 
    }),
        body: JSON.stringify(igrac)
    };
    return fetch(url1,podaci)
    .then(response=>response.json());
}
export function putuj(igraci:Igrac[],strelci:number[],nastupi:number[])
{
    let i,j:number;
    for(i=0;i<strelci.length;i++)
    {
        for(j=0;j<igraci.length;j++)
        {
            if(igraci[j].id==strelci[i])
            {
                const podaci={      
                    method:"put",
                    headers: new Headers({
                      'Content-Type': 'application/json', 
                }),
                    body: JSON.stringify(igraci[j])
                };
                fetch(url1+"/"+igraci[j].id,podaci)
                .then(response=>response.json());
                
            }
        }
    }
    for(i=0;i<nastupi.length;i++)
    {
        for(j=0;j<igraci.length;j++)
        {
            if(igraci[j].id==nastupi[i])
            {
                const podaci={      
                    method:"put",
                    headers: new Headers({
                      'Content-Type': 'application/json', 
                }),
                    body: JSON.stringify(igraci[j])
                };
                 fetch(url1+"/"+igraci[j].id,podaci)
                .then(response=>response.json());
            }
        }
    }
}