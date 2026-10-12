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
            break;
        }
        const filtro = process.argv[3];
        const statusPorFiltro = {
            pendentes : "pendente",
            concluidas: "concluída"
        };
        if (filtro && !statusPorFiltro[filtro]){
            console.log("Filtro inválido. Use `pendentes` ou `concluidas`")
            break;
        }
        let tarefasExibidas;

        if(filtro){
            tarefasExibidas = tarefas.filter(tarefa => tarefa.status === statusPorFiltro[filtro]);

        }else{
            tarefasExibidas = tarefas;
        }
        if(tarefasExibidas.length === 0){
            console.log("Nenhuma tarefa encontrada para esse filtro")
            break;
        }
    
        tarefasExibidas.forEach(tarefa =>{
            console.log(`ID: ${tarefa.id} `);
            console.log(`Descrição: ${tarefa.descricao} `);
            console.log(`Status: ${tarefa.status} `);
            console.log(`Criada em: ${new Date(tarefa.dataCriacao).toLocaleString("pt-BR")}`);
            });
        break;
    case "adicionar":
        const descricao = process.argv.slice(3).join(" ").trim();
        if (descricao === ""){
            console.log("Você deve informar a descrição da tarefa")
            break;
        }
        let novoId = 1;
        while (tarefas.some(tarefa=>tarefa.id === novoId)){
            novoId++;
        }
        const tarefa = {
            id: novoId,
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
    case "editar": {
        const id = Number(process.argv[3]);
        const novaDescricao = process.argv.slice(4).join(" ").trim();

        if(!Number.isInteger(id) || id <= 0){
            console.log("Informe um ID válido")
            break;
        }
        if (novaDescricao === ""){
            console.log("Informe uma nova descrição");
            break;
        }
        const tarefa = tarefas.find(tarefa => tarefa.id === id);

        if (!tarefa){
            console.log(`Não existe uma tarefa com esse ID`)
            break;
        }
        tarefa.descricao = novaDescricao;
        salvarTarefas(tarefas);
        console.log(`Descrção da tarefa ${id} foi atualizada`);
        break;
    }
    case "ajuda":
       console.log(`
        Comandos disponíveis:
        node index.js ajuda
        node index.js adicionar "descrição"
        node index.js listar
        node index.js listar pendentes
        node index.js listar concluidas
        node index.js concluir <id>
        node index.js remover <id>
        node index.js editar <id> "nova descrição"
        `);
        break;
    default:
        console.log("Esse comando não funciona, consulte o comando ajuda para ver os argumentos possíveis")

}