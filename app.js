//consts
const express = require('express')
const app = express()
const port = 3000

//inicializa o express
app.use(express.json()) 

//lista de alunos
let listaAlunos = [
    {ra: 1, nome: "Leon Fagundes",
            turma: "3sem",
            curso: "Desenvolvimento de Software e Multiplataforma"},
    {ra: 2, nome: "Mayara",
            turma: "3sem",
            curso: "Controle de Obras"},
    {ra: 3, nome: "Nicole Fava",
            turma: "1sem",
            curso: "Ciência de Dados para Negocios"},
    {ra: 4, nome: "Julia",
            turma: "2sem",
            curso: "Desenvolvimento de Software e Multiplataforma"
    }
];

//GET para listar todos os alunos
app.get('/alunos', (req, res) => {
    res.send(JSON.stringify(listaAlunos));
})

//GET para listar um aluno específico
app.get('/alunos/id', (req, res) => {
    const ra = req.query.ra;
    const aluno = buscarAluno(ra);
    if (aluno) {
        res.send(JSON.stringify(aluno));
    } else {
        res.status(301).send('Aluno não encontrado.');
    }
})
//POST para adicionar um aluno a lista de alunos
app.post('/addaluno', (req, res) => {
    const aluno = req.body;
    addAluno(aluno.ra, aluno.nome, aluno.turma);
    res.send('Aluno adicionado com sucesso.');
})

//POST para adicionar um curso ao aluno
app.post('/addcurso', (req, res) => {
    const ra = req.body.ra;
    const curso = req.body.curso;
    addCursoAoAluno(ra, curso);
    res.send('Curso adicionado com sucesso.');
})

//PUT para alterar os dados de um aluno através do RA inclusive o CURSO
app.put('/alterarDados', (req, res) => {
    alterarAlunoPeloRa(req.body.ra, req.body.campo, req.body.novoDado);
    res.send(JSON.stringify(listaAlunos));
})

app.delete('/removerAluno', (req, res) => {
    removerAluno(req.body.ra);
    res.send(JSON.stringify(listaAlunos));
})

//listen
app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
})

//FUNÇÕES
function addAluno(ra, nome, turma) {
    let aluno = {
        ra: ra,
        nome: nome,
        turma: turma
    }
    listaAlunos.push(aluno)
}

function buscarAluno(ra) {
    let index = listaAlunos.findIndex(x => x.ra == ra)
    return listaAlunos[index];
}

function addCursoAoAluno(ra, curso) {
    let aluno = buscarAluno(ra)
    if (aluno) {
        aluno.curso = curso;
    }
}

function alterarAlunoPeloRa(ra, campo, novoDado) {
    let aluno = buscarAluno(ra);
    if(aluno) {
        switch (campo.toUpperCase()) {
            case 'NOME':
                aluno.nome = novoDado; break
            case 'RA':
                aluno.ra = novoDado; break
            case 'CURSO':
                aluno.curso = novoDado; break
            case 'TURMA':
                aluno.turma = novoDado; break
        }
        index = listaAlunos.indexOf(aluno)
        listaAlunos[index] = aluno;
    }
}

function removerAluno(ra) {
    let aluno = buscarAluno(ra);
    if(aluno) {
        const indiceAluno = listaAlunos.indexOf(aluno);
        listaAlunos.splice(indiceAluno, 1);
    }
}

function removerCursoDoAluno(ra, curso) {
    let aluno = buscarAluno(ra);
    if(aluno && aluno.curso) {
        delete aluno.curso;
    }
}
