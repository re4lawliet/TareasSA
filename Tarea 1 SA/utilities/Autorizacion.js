const fetch = require('node-fetch');
const APIURL = 'https://api.softwareavanzado.world/index.php?option=token&api=oauth2';


export const getToken =()=>{
    let data={
        grant_type    : 'client_credentials',
        client_id     : 're4lawliet@gmail.com',
        client_secret : 201314646
    };

    return new Promise(async(solve,reject)=>{
    fetch(APIURL, { 
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify(data)
      
    })
    .then(res => {
        if(!res.ok){
            reject(res);
        }else{
            solve(res.json());
        }
    })
    .catch(err=>{
        reject(err);
    })
    })
};