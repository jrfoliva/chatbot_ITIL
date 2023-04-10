import objChamado from "../Persistência/objChamado.js";

export function formataData() {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth();
    const ano = data.getFullYear();
    return ano + '-' + mes + '-' + dia;
}


export  function classificaChamado() {
    let chamado = objChamado;
    if (chamado.categoria.toUpperCase() === "IMPRESSORA") {
        chamado.prioridade = "MÉDIA";
    } else if (chamado.categoria.toUpperCase() === "EMAIL") {
        chamado.prioridade = "ALTA";
    } else if (chamado.categoria === "ERP") {
        chamado.prioridade = "ALTÍSSIMA";
    } else {
        chamado.prioridade = "BAIXA";
    }
}