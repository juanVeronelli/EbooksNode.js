const absolute = document.querySelector('.absolute');
const about = document.querySelector('.container__scroll')
const li = Array.from(document.querySelectorAll('li'))
var father = document.querySelector('.navegation__list__cards');
const menu = document.querySelector('ul');
const ham = document.querySelector('.ham');


ham.addEventListener('click', ()=>{
    ham.classList.toggle('animation')
    menu.classList.toggle('activate')
    openToClosed();
    normalize();
})


function openToClosed(){
    let barras = document.querySelectorAll('.ham span');
    barras.forEach(child => {
        child.classList.toggle('animado');
    })
}; 

function normalize(){
    father.style.display = 'none'
    for(let i in li){
        li[i].firstChild.style.cursor = 'pointer'
        li[i].style.display = 'flex'
        li[i].style.alignItems = 'center'
        li[i].firstChild.style.fontSize = '150px'
    }
}
