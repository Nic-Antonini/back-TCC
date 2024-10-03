const db = require('../database/connection'); 

module.exports = {
    async listarAgricultor(request, response) {
        try {     
            const sql = `SELECT
                Agri_id, Agri_Foto_Perfil, Agri_Foto_Capa,
                Agri_Biografia, Usu_Id, Agri_Ativo
                FROM Agricultor
                WHERE Agri_Ativo = 1;`;     
                
            const Agricultor = await db.query(sql);

            const nItens = Agricultor[0].length;


            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de Agricultores.', 
                dados: Agricultor[0],
                nItens
            });
            
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }, 

    async listarAgricultorPorId(request, response) {
        try {
            const id = request.params.id;
            const Agricultor = await db('Agricultor').where('id', id).first();
            if (!Agricultor) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Agricultor não encontrado.',
                    dados: null
                });
            }
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Agricultor encontrado.',
                dados: Agricultor
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    
    async cadastrarAgricultor(request, response) {
        try { 
            const {Agri_id, Agri_Foto_Perfil, Agri_Foto_Capa, Agri_Biografia, Usu_Id} = request.body;
            
            const sql = `INSERT INTO Agricultor
                (Agri_Foto_Perfil, Agri_Foto_Capa, Agri_Biografia, Usu_Id)
                VALUES (?,?,?,?)`;
                

            const values = [Agri_Foto_Perfil, Agri_Foto_Capa, Agri_Biografia, Usu_Id]
            const execSql = await db.query(sql,values);
            const Agri_Id = execSql[0].insertId;


            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de Agricultores.', 
                dados: Agri_Id
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }, 
    


    async editarAgricultor(request, response) {
        try {    
            const {Agri_Foto_Perfil, Agri_Foto_Capa, Agri_Biografia, Usu_Id} = request.body;
            const {Agri_Id} = request.params;
            const sql= `UPDATE Agricultor SET Agri_Foto_Perfil = ?,  Agri_Foto_Capa = ?, Agri_Biografia = ?, Usu_Id = ?
                        WHERE Agri_Id = ?;`;
            const values = [Agri_Foto_Perfil, Agri_Foto_Capa, Agri_Biografia, Usu_Id];
            const atualizaDados = await db.query (sql, values);

        
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Agricultor ${Usu_Id} atualizado com sucesso!`, 
                dados: atualizaDados[0].affectedRows
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }, 


    async apagarAgricultor (request, response) {
        try {  
            const {Agri_Id} = request.params;
            const sql = `DELETE FROM Agricultor WHERE Agri_Id = ?`;
            const values = [Agri_Id]     
            const excluir = await db.query (sql, values);

            return response.status(200).json({
                sucesso: true, 
                mensagem: `Agricultor ${Usu_Id} excluído com sucesso`, 
                dados: excluir [0].affectedRows
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }, 


async ocultarAgricultor(request, response) {
    try {  
        const Agri_Ativo = false;
        const {Agri_Id} = request.params;
        const sql = `UPDATE Agricultor SET Agri_Ativo = ?
            WHERE Agri_Id = ?;`;
        const values = [Agri_Ativo, Agri_Id];
        const atualizacao = await db.query(sql,values);

        return response.status(200).json({
            sucesso: true, 
            mensagem: `Agricultor ${Agri_Id} excluído com sucesso`, 
            dados: atualizacao[0].affectedRows
        });

    } catch (error) {
        return response.status(500).json({
            sucesso: false,
            mensagem: 'Erro na requisição.',
            dados: error.message
        });
    }
}
}