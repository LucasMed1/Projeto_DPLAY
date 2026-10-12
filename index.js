//Armazenamento

const fs = require("node:fs");
let tarefas;
if (fs.existsSync("tarefas.json")){
    const conteudo = fs.readFileSync("tarefas.json", "utf8");
    tarefas = JSON.parse(conteudo);
}else{
    tarefas = [];
}

function salvarTarefas(tarefas){
    const conteudo = JSON.stringify(tarefas, null, 2)
    fs.writeFileSync("tarefas.json", conteudo, "utf8")
}


//Entradas (cada tarefa tem nome, id, descrição e status)

const IdentificarComando = process.argv[2];

switch (IdentificarComando){
    case "listar":
        if (tarefas.length === 0){
            console.log("Nenhuma tarefa foi cadastrada ainda")
        }else{
            tarefas.forEach(tarefa =>{
                console.log(`ID: ${tarefa.id} `);
                console.log(`Descrição: ${tarefa.descricao} `);
                console.log(`Status: ${tarefa.status} `);
                console.log(`Hora: ${tarefa.dataCriacao} `);
            })
        }
        break;
    case "adicionar":
        const descricao = process.argv.slice(3).join(" ").trim();
        if (descricao === ""){
            console.log("Você deve informar a descrição da tarefa")
            break;
        }
        const NovoId = tarefas.length + 1; //ver outra forma de fazer isso
        const tarefa = {
            id: NovoId,
            descricao: descricao,
            status: "pendente",
            dataCriacao: new Date().toISOString()
        };
        tarefas.push(tarefa);
        salvarTarefas(tarefas);
        console.log(`Tarefa ${tarefa.id} adicionada`)
        break;
    case "concluir": {
        const id = Number(process.argv[3]);
        if (!Number.isInteger(id) || id <= 0) {
            console.log("Informe um ID válido.");
            break;}
        const tarefa = tarefas.find(tarefa => tarefa.id === id);
        if (!tarefa) {
            console.log(`Não existe tarefa com o ID ${id}.`);
            break;}
        tarefa.status = "concluída";
        salvarTarefas(tarefas);
        console.log(`Tarefa #${id} concluída.`);
        break;}
    case "remover":
         const id = Number(process.argv[3]);
         if (!Number.isInteger(id) || id <= 0) {
            console.log("Informe um ID válido.");
            break;}
            const indice = tarefas.findIndex(tarefa => tarefa.id === id);
            if (indice === -1) {
                console.log(`Não existe tarefa com o ID ${id}.`);
                break;}
                tarefas.splice(indice, 1);
                salvarTarefas(tarefas);
                console.log(`Tarefa #${id} removida.`);
                break;
    case "ajuda":
        console.log("Aqui vão os comandos possíveis: listar, adicionar, concluir e remover") //transformar isso em uma lista com comandos
        break;
    default:
        console.log("Esse comando não funciona, consulte o comando ajuda para ver os argumentos possíveis")

}
//Regras 