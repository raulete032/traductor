setInterval(()=>{
    let entrada= document.getElementById('selectIdiomaEntrada').selectedOptions[0].value;
    let salida= document.getElementById('selectIdiomaSalida').selectedOptions[0].value;

    if(entrada!=0 && salida!=0)
        document.getElementById('btnTraducir').disabled=false;
    else
        document.getElementById('btnTraducir').disabled=true;
}, 1000);


const divTextoEntrada= document.getElementById('idiomaEntrada');
const divTextoSalida= document.getElementById('idiomaSalida');


document.getElementById('btnTraducir').addEventListener('click', traducir);
divTextoEntrada.addEventListener('focusin', placeholder);
divTextoEntrada.addEventListener('focusout', placeholder);

/**
 * Función que borra o crea el placeholder del div
 */
function placeholder(){

    let text= divTextoEntrada.innerText;
    if(text=='Escribe aquí el texto a traducir')
        divTextoEntrada.textContent='';

    if(text=="")
        divTextoEntrada.textContent='Escribe aquí el texto a traducir';
}

/**
 * Función que manda la petición a la API de google para que haga la traducción
 */
function traducir(){

    var encodedParams = new URLSearchParams();
    let texto= divTextoEntrada.textContent;
    let target= document.getElementById('selectIdiomaSalida').selectedOptions[0].value;
    let source= document.getElementById('selectIdiomaEntrada').selectedOptions[0].value;
    encodedParams.append("q", texto);
    encodedParams.append("target", target);
    encodedParams.append("source", source);
    
    var options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': '504293c81fmshc65293d2efcc14fp108a1ajsn45f944adb924',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: encodedParams
    };
  
    fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
        .then(function(resp){
            if(resp.ok)
                resp.json()
                    .then(function(data){
                        divTextoSalida.innerHTML= data.data.translations[0].translatedText;
                    })
                    .catch(function(er){
                        console.log("ERROR: " + er);
                    })
        })
        .catch(function(er){
            console.log("ERROR: " + er);
        })


}