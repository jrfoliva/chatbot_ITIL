import Conectar from "./conexao.js";
import Categoria from "../Modelo/Categoria.js";

export default class CategoriaDAO {
  
    //Outros métodos 

    
    async consultar(descricao){
        const conexao = await Conectar();
        let sql = null;
        let rows = [];
        if (descricao !== ''){
            sql = "select * from CATEGORIA where categoria like ?";
            rows = await conexao.query(sql, ['%'+descricao+'%']);
            return rows[0]['id']; //retorna o id
        } else { // senão retorna uma lista de categorias
            sql = "select * from CATEGORIA order by categoria";
            rows = await conexao.query(sql);
        }
        let listaCategoria = [];
        for (const row of rows[0]){
            const categoria = new Categoria(row.id, row.categoria, row.prazo);
            listaCategoria.push(categoria);
        }
        return listaCategoria;
    }
}

