const Client = require('pg').Client

const cliente = new Client({
    user: 'postgres',
    host: '10.0.0.2',
    database: 'Produtos',
    password: 'postgres',
    port: 5432
});

async function getData(){
    try{
        console.log("Iniciando conexão com postgresql...")
        await cliente.connect()
        console.log("Ok")
        const resultado = await cliente.query("SELECT * FROM produtos")
        console.table(resultado.rows)
    }catch(ex){
        console.log("Error" + ex)
    }finally{
        await cliente.end()
    }
}

async function inserirProduto(nome_produto, preço){
    try{
        console.log("Iniciando conexão com postgresql...")
        await cliente.connect()
        console.log("Ok")
        await cliente.query('INSERT INTO produtos("nome_produto", "preço") VALUES ('+"'"+nome_produto+"', '"+preço+"');")
        console.log("Inserção bem sucedida")
    }catch(ex){
        console.log("Error" + ex)
    }
}

async function updateProduto(preço, mouse){
    try{
        console.log("Iniciando conexão com postgresql...")
        await cliente.connect()
        console.log("Ok")
        await cliente.query("UPDATE produtos SET preço = '"+preço+"' WHERE nome_produto = '"+mouse+"';")
        console.log("Produto atualizado com sucesso!")
    }catch(ex){
        console.log("Error" + ex)
    }finally{
        await cliente.end()
    }
}

async function delProduto(id){
    try{
        console.log("Iniciando conexão com postgresql...")
        await cliente.connect()
        console.log("Ok")
        await cliente.query("DELETE FROM produtos WHERE id = '"+id+"';")
        console.log("Produto deletado com sucesso!")
    }catch(ex){
        console.log("Error" + ex)
    }finally{
        await cliente.end()
    }
}

module.exports = {getData, inserirProduto, updateProduto, delProduto};