/* Trabalho final da matéria: PROCESSAMENTO DE LINGUAGEM NATURAL E CHATBOT
   Professor Renato
   Aluno: Junior Freire Oliva RA: 10482110183

   Link do video: https://www.loom.com/share/6d0aa79851234b9786f9ce5628959f7c
*/

import Categoria from "../Modelo/Categoria.js";
import Chamado from "../Modelo/Chamado.js";
import objChamado from "../Persistência/objChamado.js";
import { formataData } from "../Util/funcoes.js";
//import { classificaChamado } from "../Util/funcoes.js";


export default class ChamadoCTRL {


    async processarIntents(requisicao, resposta) {
        const payload = requisicao.body;
        const intencao = payload['queryResult']['intent']

        const tecnicos = ['José', 'Maria', 'Ricardo', 'Priscila', 'Matheus', "Bruno", "Luís", "Gabriel"];

        //Prepara um objeto para ser persistido, caso haja a confirmação da abertura do chamado.
        objChamado['tecnico'] = tecnicos[Math.floor(Math.random() * (tecnicos.length - 1))];
        objChamado['dataAbertura'] = formataData();

        if (intencao) {
            if (intencao['displayName'] === 'CitarIncidente') {
                let resp = { fulfillmentMessages: [] };
                let strCategoria = payload["queryResult"]["parameters"]["categoria"][0].toUpperCase();
                const categoria = new Categoria(0, "", "");
                let listaCategoria = await categoria.consultar();
                let listaDescricao = [];
                listaCategoria.map((cat) => {
                    listaDescricao.push(cat['categoria']);
                });
                if (!listaDescricao.includes(strCategoria)) { //Se a descrição vinda não estiver contida na lista
                    resp['fulfillmentMessages'].push({
                        "text": {
                            "text": [
                                "Aqui está uma lista de categorias que estamos aptos a atender:"
                            ]
                        }
                    });
                    listaCategoria.map((cat) => {
                        resp['fulfillmentMessages'][0]["text"]["text"].push(`${cat.id}: ${cat.categoria}`);
                    });
                } else {
                    listaCategoria.find((cat) => {
                        if (strCategoria === cat['categoria']) { 
                            objChamado['id_categoria'] = cat.id;
                            objChamado['categoria'] = cat.categoria;
                            objChamado['prazo'] = cat.prazo;
                        }
                    });
                    resp["fulfillmentMessages"].push(
                        {
                            "text": {
                                "text": [
                                    `Certo, a categoria do seu problema é: ${objChamado.id_categoria} - ${objChamado.categoria} com atendimento no prazo de ${objChamado.prazo}. Qual a prioridade para este incidente? `
                                ]
                            }
                        }
                    );
                }
                return resposta.json(resp);
            } // Fim da inteção CitarIncidentes
            if (intencao['displayName'] === 'CitarPrioridade') {
                let resp = { fulfillmentMessages: [] };
                let strPrioridade = payload["queryResult"]["parameters"]["prioridade"];
                const listaPrioridades = ["baixa", "média", "alta", "altíssima"];
                if (!listaPrioridades.includes(strPrioridade)) {
                    resp['fulfillmentMessages'].push({
                        "text": {
                            "text": [
                                "Aqui está uma lista de prioridade que estamos aptos a atender:"
                            ]
                        }
                    });

                    listaPrioridades.map((prioridade) => {
                        resp['fulfillmentMessages'].push({
                            "text": {
                                "text": [
                                    `${prioridade}`
                                ]
                            }
                        })
                    });
                } else {
                    //classificaChamado();
                    objChamado.prioridade = payload["queryResult"]["parameters"]["prioridade"];
                    resp["fulfillmentMessages"].push(
                        {
                            "text": {
                                "text": [
                                    `Entendo, a sua prioridade é:  ${objChamado.prioridade.toUpperCase()}. Estou iniciando a abertura do chamado para este incidente, no entanto preciso que informe o usuário e matrícula por favor. `
                                ]
                            }
                        }
                    );
                }
                return resposta.json(resp);
            } // Fim da inteção CitarPrioridades    
            if (intencao['displayName'] === 'CitarUsuario') {
                let resp = { fulfillmentMessages: [] };
                let usuario = payload["queryResult"]["parameters"]["usuario"]["name"];
                let matricula = payload["queryResult"]["parameters"]["matricula"];
                if (usuario && matricula) {
                    objChamado.usuario = usuario;
                    objChamado.matricula = matricula;
                    resp["fulfillmentMessages"].push(
                        {
                            "text": {
                                "text": [
                                    `Confirma a abertura do chamado para o usuário: ${usuario} de matrícula: ${matricula}?`
                                ]
                            }
                        }
                    );
                }
                return resposta.json(resp);
            } // Fim da inteção CitarUsuario    
            if (intencao['displayName'] === 'CitarUsuario - yes') {
                let resp = { fulfillmentMessages: [] };
                let aceite = payload["queryResult"]["action"];
                if (aceite === "CitarUsuario.CitarUsuario-yes") {
                    const chamado = new Chamado(0, objChamado.dataAbertura, "2023-04-11",  objChamado.usuario,
                        parseInt(objChamado.matricula), objChamado.id_categoria, objChamado.prioridade, objChamado.tecnico, "ABERTO");
                    let numero = await chamado.incluir(chamado);
                    if  (numero) {
                        objChamado.numero = numero;
                        resp["fulfillmentMessages"].push(
                            {
                                "text": {
                                    "text": [
                                        `Pronto, o nº do chamado gerado é: ${objChamado.numero}. O técnico que fará o atendimento: ${objChamado.tecnico}. 
                                        Prazo para atendimento ${objChamado.prazo}. Obrigado por utilizar a nossa central. Até logo!` 
                                    ]
                                }
                            }
                        );
                    } else {
                        resp["fulfillmentMessages"].push(
                            {
                                "text": {
                                    "text": [
                                        `Desculpe estamos com instabilidade no momento, tente mais tarde por favor!`
                                    ]
                                }
                            }
                        );    
                    }                  
                }
                return resposta.json(resp);
            } // Fim da inteção CitarUsuario - yes   
        }
    }
}

