function main(){
    return new Promise((resolve, reject)=>{
        for( let i in li ){
            li[i].addEventListener('click', async ()=>{
                await comprobacion(li[i]);
                resolve();          
            })
        }
        async function comprobacion(selected){
            li.forEach( async element => {
                style(element);
                if(selected == li[3]){
                    return
                }
                else{
                    if(selected != element){
                        element.style.display = 'none'
                    } else if(selected === li[0]) {
                        await getShop();
                    } else if(selected === li[1]){
                        getLibrary();

                    }
                }
            })
        }
    
        async function style(element){
            let hijo = element.firstChild;
            let padre = element.parentNode;
            padre.style.alignItems = 'flex-start'
            element.style.alignItems = 'flex-start'
            hijo.style.fontSize = '80px'
            hijo.style.cursor = 'default'
            // padre.innerHTML = ''
        }
        async function getShop () {
            clear();
            father.style.display = 'grid'
            const response = await fetch('http://localhost:3000/Books?ebooks=true', {mode: "cors"} );
            const data = await response.json();

            if(!(document.querySelectorAll('.navegation__list__cards__Card').length > 1)){
                data.forEach(libro=>{
                    father.insertAdjacentHTML('beforeend', libro.template);
                })
                const btns = Array.from(document.querySelectorAll('.add'));
                post(btns);
            }else{
                reject();
            }
        }   
    })
}

function clear(){
    let elements = Array.from(document.querySelectorAll('.navegation__list__cards__Card'));
    for(let i in elements){
        father.removeChild(elements[i]);
    }
}

const getLibrary = async () => {
    clear();
    father.style.display = 'grid'
    const response = await fetch('http://localhost:3000/library?books=true');
    const data = await response.json();
    Object.values(data).forEach(book => {
        father.insertAdjacentHTML('beforeend', book.template);
    })
    let elements = Array.from(document.querySelectorAll('.remove'));
    for(let e in elements){
        elements[e].addEventListener('click', ()=>{
            deleteBooks(elements[e].id, elements[e])
        });
    }
}

function deleteBooks(id, element){
    let dad = element.parentNode;
    father.removeChild(dad);
    fetch(`http://localhost:3000/` + id, {method:"DELETE"})
}

const post = async (btns) => {
    for(let i = 0; i<= btns.length; i++){
        btns[i].addEventListener('click', async function(){
            const elementFather = btns[i].parentNode;
            let exist = await ifexists(elementFather.id);
            if(exist === -1){
                animateAlertAddBook()
                fetch(`http://localhost:3000/${elementFather.id}`,{method:"POST"})
            }else{
                animateAlertErrBook()
            }
        })
    }

}

async function ifexists(id){
    const response = await fetch('http://localhost:3000/library?books=true', {method:"GET"})
    const data = await response.json();
    const index = Object.values(data).findIndex( (element) => element.id === parseInt(id));
    return index
}


function animateAlertAddBook(){
    
}

main();



