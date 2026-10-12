//Entradas (cada tarefa tem nome, id, descrição e status)

const IdentificarComando = process.argv[2];

switch (IdentificarComando){
    case "listar":
        console.log("Você escolheu listar")
        break;
    case "adicionar":
        console.log("Você escolheu adicionar")
        break;
    case "concluir":
        console.log("Você escolheu concluir")
        break;
    case "remover":
        console.log("Você escolheu remover")
        break;
    case "ajuda":
        console.log("Aqui vão os comandos possíveis: listar, adicionar, concluir e remover") //transformar isso em uma lista com comandos
        break;
    default:
        console.log("Esse comando não funciona, consulte o comando ajuda para ver os argumentos possíveis")
}


//Regras 


//Armazenamento