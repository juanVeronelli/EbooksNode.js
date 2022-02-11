const string = document.getElementById('subtitle');

function animation(str){
    let arrayFromStr = str.split('');
    let i = 0;
    let printStr = setInterval(()=>{
        string.innerHTML += arrayFromStr[i];
        i++;
        if(i === arrayFromStr.length){
            clearInterval(printStr);
            setTimeout(()=>{
                string.innerHTML = '';
                setTimeout(()=>{animation('/E-books')},500)
            },700)
        }
    },200)
}

animation('/ E-books');

