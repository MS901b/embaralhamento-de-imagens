/*
	Padronização do ID: 
		- [['p/parte','q/questao','/item'],'_'] vai gerar um id do tipo p1_q2_1
		- [['p/parte','q/questao','/itemletra'],'_'] vai gerar um id do tipo p1_q2_a
	Palavras-chave: questao, parte, item, itemletra, subitem
	Devem ser precedidas de uma barra '/'.
	A palavra-chave subitem será usada somente em questões com mais de um campo
*/
 
var IdPadrao = [['parte/parte','q/questao','/itemletra','/subitem'],'_'];

/*
	Questoes
	
	Aqui ficam concentrados todos os conteudos das questões da atividade!
	Veja que está separado por Parte/Questão/Item
	
	ATENÇÃO: Cada tipo possui um formato de entrada característico.
*/

var Partes = ['1', '2', '3', '4', '5'];

var Questoes = 
[
	
	{//Parte 1
		
		parte1_q1: //Questão 1
		{
			itens: 
			[
				{//A
					tipo: 'input',
					corrigir: corrige_q_1_a,
					enunciado: 'Identifique e escreva abaixo os ciclos da permutação representada ao lado.',
					msgErro: 'Lembre-se de seguir o caminho das peças.',
					msgAjuda: 'Um exemplo de representação dos ciclos de um embaralhamento é: (4,2,5) (3,8,6) (1,7,9).'
				}
			]
		},
		parte1_q2: //Questão 2
		{
			enunciadoGeral:'De quantas em quantas embaralhadas cada ciclo é completado?',
			itens: 
			[
				{//A
					tipo: 'input',
					corrigir: corrige_q_2_a,
					enunciado: 'Ciclo que contém a carta 8:',
					msgErro: 'Calcule o número de posições pelas quais uma peça desse ciclo passa.',
					msgAjuda:'Embaralhe até que o ciclo volte à configuração original.'
				},
				{//B
					tipo: 'input',
					corrigir: corrige_q_2_b,
					enunciado: 'Ciclo que contém a carta 7:',
					msgErro: 'Calcule o número de posições pelas quais uma peça desse ciclo passa.',
					msgAjuda:'Embaralhe até que o ciclo volte à configuração original.'
				},
				{//C
					tipo: 'input',
					corrigir: corrige_q_2_c,
					enunciado: 'Ciclo que contém a carta 2:',
					msgErro: 'Calcule o número de posições pelas quais uma peça desse ciclo passa.',
					msgAjuda:'Embaralhe até que o ciclo volte à configuração original.'
				}
			]
		},
		parte1_q3: //Questão 3
		{
			itens: 
			[
				{//A
					tipo: 'input',
					corrigir: corrige_q_3_a,
					enunciado: 'Qual o comprimento desta permutação?',
					msgErro: 'Embaralhe até que a figura volte ao original.',
					msgAjuda: 'Tente observar as respostas à questão 2, ou então, clique o botão "Embaralhar" até que a figura volte à posição original.'
				}
			]
		}
	},
	{//Parte 2
		parte2_q4: //Questão 4
		{
			enunciadoGeral:'Ao lado temos um novo embaralhamento. Após quantas embaralhadas cada um dos ciclos volta à posição original?',
			itens: 
			[
				{//A
					tipo: 'input',
					corrigir: corrige_q_4_a,
					enunciado: 'Ciclo que contém a carta 8:',
					msgErro: 'Calcule o número de posições pelas quais uma peça desse ciclo passa.',
					msgAjuda: 'Embaralhe até que o ciclo volte ao seu estado original.'
				},
				{//B
					tipo: 'input',
					corrigir: corrige_q_4_b,
					enunciado: 'Ciclo que contém a carta 7:',
					msgErro: 'Calcule o número de posições pelas quais uma peça desse ciclo passa.',
					msgAjuda: 'Embaralhe até que o ciclo volte ao seu estado original.'
				},
				{//C
					tipo: 'input',
					corrigir: corrige_q_4_c,
					enunciado: 'Ciclo que contém a carta 6:',
					msgErro: 'Calcule o número de posições pelas quais uma peça desse ciclo passa.',
					msgAjuda: 'Embaralhe até que o ciclo volte ao seu estado original.'
				}
			]
		},
		parte2_q5: //Questão 5
		{
			itens: 
			[
				{//A
					tipo: 'input',
					corrigir: corrige_q_5_a,
					enunciado: 'Após quantas embaralhadas todas as peças retornam às posições originais pela primeira vez?',
					msgErro: 'Embaralhe até que a figura volte ao original.',
					msgAjuda: 'Basta embaralhar até que a figura volte ao original.'
				}
			]
		}
	},
	{//Parte 3
		parte3_q6: //Questão 6
		{
			itens: 
			[
				{//A
					tipo: 'input',
					corrigir: corrige_q_6_a,
					esperando: true,
					enunciado: 'Represente a estrutura de ciclos dessa permutação.',
					msgAjuda: 'Um exemplo de representação dos ciclos de um embaralhamento é: (4,2,5) (3,8,6) (1,7,9).'
				}
			]
		},
		parte3_q7: //Questão 7
		{
			itens:
			[
				{//A
					tipo: 'input',
					corrigir: corrige_q_7_a,
					esperando: true,
					enunciado: 'Qual é o comprimento dessa permutação?',
					msgErro: 'Embaralhe até que as cartas retornem à posição original pela primeira vez.',
					msgAjuda: 'Lembre que o comprimento de uma permutação é o número de embaralhadas necessárias para que todas as peças retornem às posições originais.'
				}
			]
		}
	},
	{//Parte 4
		parte4_q8:
		{
			itens:
			[
				{//A
					tipo: 'input',
					corrigir: corrige_q_8_a,
					enunciado: 'Se uma permutação possuir 3 ciclos de comprimento 3, 4 e 2, qual será o comprimento da permutação?',
					msgErro: 'Se estiver com dificuldades, crie um embaralhamento nesse modelo e confira.',
					msgAjuda: 'Lembre-se que basta encontrar o mmc entre os tamanhos dos ciclos.'
				},
				{//B
					tipo: 'input',
					corrigir: corrige_q_8_b,
					enunciado: 'Qual é o comprimento de uma permutação que tem ciclos de comprimentos 4 e 5?',
					msgErro: 'Se estiver com dificuldades, crie um embaralhamento neste modelo e confira.',
					msgAjuda: 'Lembre-se que basta encontrar o mmc entre os tamanhos dos ciclos.'
				}
			]
		},
		parte4_q9:
		{
			itens:
			[
				{//A
					tipo: 'multipla_escolha',
					corrigir: corrige_q_9_a,
					tamanho: 'grande',
					enunciado: 'Quais das permutações abaixo têm comprimento 15?',
					dados:	[
						{value: 'a', label: '(1)(2,3)(6,8,7)(9,5,4)'},
						{value: 'b', label: '(1,2,3,4,5)(6,7,8,9)'},
						{value: 'c', label: '(3,6,9)(2)(8,7,5,1,4)'},
						{value: 'd', label: '(5,3,7)(2,4,9,6,8,1)'}
					],
					msgErro: 'Lembre-se que basta encontrar o mmc entre os tamanhos dos ciclos.',
					msgAjuda: 'Lembre-se que o número mínimo de embaralhamentos  necessários para voltar ao original é o mmc dos tamanhos dos ciclos. '
				}
			]
		}
	},
	{//Parte 5
		parte5_q10:
		{
			enunciadoGeral: 'Utilizando a ferramenta ao lado crie:',
			itens:
			[
				{//A
					tipo: 'generico',
					corrigir: corrige_q_10_a,
					associado: true,
					dados: '',
					selecionada: parte_5.selecionou_1.bind(parte_5),
					enunciado: 'Uma permutação de comprimento 6',
					msgErro: 'Crie os ciclos na ferramenta, ao lado, corretamente.'
				},
				{//B
					tipo: 'generico',
					corrigir: corrige_q_10_b,
					associado: true,
					dados: '',
					selecionada: parte_5.selecionou_2.bind(parte_5),
					enunciado: 'Uma permutação de comprimento 10',
					msgErro: 'Crie os ciclos na ferramenta, ao lado, corretamente.'
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