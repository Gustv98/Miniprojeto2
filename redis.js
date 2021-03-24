require('dotenv').config();
const redis = require("redis");
const database = require('./database');
const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

client.on("connect", function(error){
    console.log("Conectado!");
});

client.on("error", function(error){
    console.log(error);
});

function getKey(chave){
    return client.get(chave, (err, value) => {
        if (value) {
        console.log("Chave encontrada no Redis! \nO valor associado a essa chave eh: " + value)
        }
        else if(chave != null){
            database.getData(chave)
            console.log("Produto encontrado no Postgresql!")
        }
        else { 
        client.set("Chave não encontrada!");
        }
    });
}

function setKey(chave, val){
        if(typeof val == 'object'){
            val = JSON.stringify(val)
        }
        client.set(chave, val)
}

function delKey(chave){
    client.del(chave, function(err, resp){
            if(err) throw err;
            console.log(resp);
         });
}

function setTime(chave, val, tempo = 30){
        if(typeof val == 'object'){
            val = JSON.stringify(val)
        }
        client.set(chave, val)
        client.expire(chave, tempo)
    
}


module.exports = {getKey, setKey, setTime, delKey};