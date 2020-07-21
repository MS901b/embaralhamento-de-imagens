/*
	Padronização do ID: 
		- [['p/parte','q/questao','/item'],'_'] vai gerar um id do tipo p1_q2_1
		- [['p/parte','q/questao','/itemletra'],'_'] vai gerar um id do tipo p1_q2_a
	Palavras-chave: questao, parte, item, itemletra, subitem
	Devem ser precedidas de uma barra '/'.
	A palavra-chave subitem será usada somente em questões com mais de um campo
*/

var IdPadrao = [
    ['parte/parte', 'q/questao', '/itemletra', '/subitem'], '_'
];

/*
	Questoes
	
	Aqui ficam concentrados todos os conteudos das questões da atividade!
	Veja que está separado por Parte/Questão/Item
	
	ATENÇÃO: Cada tipo possui um formato de entrada característico.
*/

var Partes = ['1', '2'];

var Questoes = [

    { //Parte 1

        parte1_q1: //Questão 1
        {
            itens: [{ //A
                tipo: 'generico',
                corrigir: corrige_q_1_a,
                enunciado: 'Sabendo que uma permutação tem comprimento 12, quais das estruturas de ciclos abaixo relacionadas podem representá-la?',
                dados: [
                    '<div class="input_check">',
                    '<div><input style="width: auto; margin: 0 10px 10px 0;" type="checkbox" id="input_q1_a"/> <label for="input_q1_a"><span>(1,8) (3,6,7,9) (5,4,2)</span></label></div>',
                    '<div class="limpador"></div>',
                    '<div><input style="width: auto; margin: 0 10px 10px 0;" type="checkbox" id="input_q1_b" /> <label for="input_q1_b"><span>(4) (1,2,3) (9,8,7,6,5)</span></label></div>',
                    '<div class="limpador"></div>',
                    '<div><input style="width: auto; margin: 0 10px 10px 0;" type="checkbox" id="input_q1_c" /> <label for="input_q1_c"><span>(7,4,8,2) (9,1,5) (3) (6)</span></label></div>',
                    '<div class="limpador"></div>',
                    '<div><input style="width: auto; margin: 0 10px 10px 0;" type="checkbox" id="input_q1_d" /> <label for="input_q1_d"><span>(1,2,3,4,5,6,7,8,9)</span></label></div>',
                    '<div class="limpador"></div>',
                    '<div><input style="width: auto; margin: 0 10px 10px 0;" type="checkbox" id="input_q1_e" /> <label for="input_q1_e"><span>(3,5,7,1) (1,8,9,2) (6)</span></label></div>',
                    '</div>'
                ].join(''),
                msgErro: 'Se você não lembra como calcular a quantidade de ciclos, retorne às partes anteriores para relembrar.',
                msgAjuda: 'É necessário assinalar todas as respostas possíveis.'
            }]
        },
        parte1_q2: //Questão 1
        {
            itens: [{ //A
                tipo: 'input',
                corrigir: corrige_q_2_a,
                enunciado: 'Agora, considerando a permutação definida na ferramenta ao lado, que tem comprimento 12, responda: qual é o comprimento de cada ciclo?',
                msgErro: 'Se você não lembra como calcular a quantidade de ciclos, retorne às partes anteriores para relembrar.',
                msgAjuda: 'Dê a(s) resposta(s) em qualquer ordem, mas sempre separe os números com vírgulas. Coloque os números separados por vírgulas'
            }]
        }
    },
    {
        parte2_q3: {
            enunciadoGeral: 'Considerando a permutação ao lado, responda os itens abaixo',
            itens: [{ //A
                    tipo: 'input',
                    corrigir: corrige_q_3_a,
                    enunciado: 'Qual é o comprimento dessa permutação?',
                    msgErro: '...',
                    msgAjuda: 'Lembre-se que o comprimento de uma permutação é o número de embaralhadas necessárias para que ela retorne à configuração original.'
                },
                { //B
                    tipo: 'input',
                    corrigir: corrige_q_3_b,
                    enunciado: 'Quantos ciclos tem essa permutação?',
                    msgErro: '...'
                },
                { //C
                    tipo: 'input',
                    corrigir: corrige_q_3_c,
                    enunciado: 'Qual é o tamanho de cada ciclo?',
                    msgAjuda: 'Dê a(s) resposta(s) em qualquer ordem, mas sempre separe os números com vírgulas.',
                    msgErro: '...'
                }

            ]
        }
    }
]

/*
	Bloco de Notas
	
	Nesse Array ficam os dados que aparecem no Bloquinho de notas.
	Se você for na linha 35 do exemplo_correcao.js verá que está sendo criada uma instância
	de "Blocao", uma classe de bloco de notas que permite tabelas no conteúdo. Se não for
	usar tabelas no Software, altere para "Bloco". Ambas classes utilizam a variavel global
	MeuBloco para preencher o seu conteúdo.
*/

var MeuBloco = new Array();