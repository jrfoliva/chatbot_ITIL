import ChamadoDAO from "../Persistência/ChamadoDAO.js";

class Chamado {
    #numero
    #dataAbertura
    #dataFechamento
    #usuario
    #matricula
    #id_categoria
    #prioridade
    #tecnico
    #status

    constructor(numero=0, dataAbertura="", dataFechamento="", usuario="", matricula=0, id_categoria=0, 
                 prioridade="", tecnico="", status=""){
        this.#numero = numero;
        this.#dataAbertura = dataAbertura;
        this.#dataFechamento = dataFechamento;
        this.#usuario = usuario;
        this.#matricula = matricula;
        this.#id_categoria = id_categoria;
        this.#prioridade = prioridade;
        this.#tecnico = tecnico;
        this.#status = status;
    }

    // Início dos métodos get e set
    get numero() {return this.#numero}
    set numero(numero) {this.#numero = numero}

    get dataAbertura() {return this.#dataAbertura}
    set dataAbertura(data) {this.#dataAbertura = data}

    get dataFechamento() {return this.#dataFechamento}
    set dataFechamento(data) {this.#dataFechamento = data}

    get usuario() {return this.#usuario}
    set usuario(usuario) {this.#usuario = usuario}

    get matricula() {return this.#matricula}
    set matricula(matricula) {this.#matricula = matricula}

    get id_categoria() {return this.#id_categoria}
    set id_categoria(categoria) {this.#id_categoria = categoria}

    get prioridade() {return this.#prioridade}
    set prioridade(prioridade) {this.#prioridade = prioridade}

    get tecnico() {return this.#tecnico}
    set tecnico(tecnico) {this.#tecnico = tecnico}

    get status() {return this.#status}
    set status(status) {return this.#status = status}
    //fim dos métodos get e set

    toJSON() {
        return {
            numero         : this.#numero,
            dataAbertura   : this.#dataAbertura,
            dataFechamento : this.#dataFechamento, 
            usuario        : this.#usuario,
            matricula      : this.#matricula,
            id_categoria   : this.#id_categoria, 
            prioridade     : this.#prioridade,
            tecnico        : this.#tecnico,
            status         : this.#status
        }
    }

    incluir (chamado){
        const chamadoDAO = new ChamadoDAO();
        return chamadoDAO.gravar(chamado);
    }

    consulta (numero){
        const chamadoDAO = new ChamadoDAO();
        return chamadoDAO.consulta(numero);
    }
}

export default Chamado;