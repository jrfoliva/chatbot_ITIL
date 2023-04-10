import CategoriaDAO from "../Persistência/CategoriaDAO.js";

export default class Categoria {
    #id
    #categoria
    #prazo

    constructor(id=0, categoria="", prazo=""){
        this.#id = id;
        this.#categoria = categoria;
        this.#prazo = prazo;
    }

    //Início Metodos get e set
    get id() {return this.#id}
    set id(id) {this.#id = id}
    
    get categoria() {return this.#categoria}
    set categoria(categoria) {this.#categoria = categoria}

    get prazo() {return this.#prazo}
    set prazo(prazo) {this.#prazo = prazo}
    //Fim 

    toJSON() {
        return {
            id        : this.#id,
            categoria : this.#categoria,
            prazo     : this.#prazo
        }
    }

    consultar(descricao="") {
        const categoriaDAO = new CategoriaDAO();
        return categoriaDAO.consultar(descricao);
    }
}