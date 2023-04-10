import Conectar from "./conexao.js";
import Chamado from "../Modelo/Chamado.js";


export default class ChamadoDAO {
    async gravar(chamado) {
        if (chamado instanceof Chamado) {
            const conexao = await Conectar();
            const sql = `INSERT INTO CHAMADOS (dataAbertura, dataFechamento, usuario, matricula, id_categoria, prioridade, tecnico, status)
                                        VALUES(?,?,?,?,?,?,?,?)`;
            const valores = [chamado.dataAbertura, chamado.dataFechamento, chamado.usuario, chamado.matricula, chamado.id_categoria, chamado.prioridade,
                             chamado.tecnico, chamado.status];

            try {
                const [rows] = await conexao.query(sql, valores);
                return rows['insertId'];
            } catch (error) {
                throw new Error(error);
            }
        }
    }

    async consulta(num) {
        const conexao = await Conectar();
        let [rows] = [];
        if (num > 0) {
            const sql = `SELECT * FROM CHAMADOS WHERE numero = ?`;
            rows = await conexao.query(sql, [num]);
        } else {
            const sql = "SELECT * FROM CHAMADOS ORDER BY dataAbertura";
            rows = await conexao.query(sql);
        }
        listaChamados = [];
        for (let f of rows) { // para cada campo vindo do select
            const chamado = new Chamado(f['numero'], f['dataAbertura'], f['dataFechamento'],f['usuario'],
                f['matricula'], f['id_categoria'], f['prioridade'], f['tecnico'], f['status']);
            listaChamados.push(chamado);    
        }
        return listaChamados;
    }
}