class ebooks {
    constructor(element){
        this.id = element.id
        this.title = element.title;
        this.author = element.author;
        this.date = element.date;
        this.price = element.price;
        this.image = element.image;

    }
    getTemplate(){
        const templateEbook = {
        "id": this.id,
        "template":`
        <div id="${this.id}" class="navegation__list__cards__Card">
            <img src=${this.image} alt="">
            <h4> ${this.title} </h4>
            <span> ${this.price} </span>
            <button id="${this.id}" class="add"> Add to library </button>
        </div>
        `}
        return templateEbook;
    }
    getTemplateLibrary(){
        const templateLibrary = {
            "id":this.id,
            "template":`
            <div id="${this.id}" class="navegation__list__cards__Card">
                <img src=${this.image} alt="">
                <h4> ${this.title} </h4>
                <button id="${this.id}" class="remove"> Remove </button>
            </div>
            `
        }
        return templateLibrary;
    }
};
const getEbooks = async (data) => {
    var arrayTemplates = [];
    Object.values(data.ebooks).forEach( element => {
        arrayTemplates.push(new ebooks(element).getTemplate());
    })
    return arrayTemplates;
}



const addToLibrary = async (id, data) => {
    var templates = []
    const object = Object.values(data.ebooks).filter((books)=> {return books.id == id });
    templates.push(new ebooks(object[0]).getTemplateLibrary());
    return templates
}

const deleteToLibrary = (param, data) => {
    const index = Object.values(data).findIndex( (element) => element.id === parseInt(param));
    return index
}

module.exports = {
    getEbooks,
    addToLibrary,
    deleteToLibrary
}


        // var arrayTemplates = [];
        // arrayTemplates.push(new ebooks(object[0]).getTemplate());
        // console.log(arrayTemplates);
        // return arrayTemplates;