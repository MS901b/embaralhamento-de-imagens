/*
	Padronização do ID: 
		- [['p/parte','q/questao','/item'],'_'] vai gerar um id do tipo p1_q2_1
		- [['p/parte','q/questao','/itemletra'],'_'] vai gerar um id do tipo p1_q2_a
	Palavras-chave: questao, parte, item, itemletra, subitem
	Devem ser precedidas de uma barra '/'.
	A palavra-chave subitem será usada somente em questões com mais de um campo
*/
 
var IdPadrao = [['parte/parte','q/questao','/itemletra','/subitem'],'_'];


var Partes = ['1', '2', '3', '4'];
var nomeSoft="Embaralhamento";

var Questoes = 
[
	
	{//Parte 1
		
		parte1_q1: //Questão 1
		{
			enunciadoGeral: 'Informe a posição de cada peça abaixo até que ela volte à posição original. Para isso, digite os números das posições pelas quais a peça passou, mas separando esses números com vírgulas.',
			itens: 
			[
				{//A
					tipo: 'input',
					corrigir: corrige_q_1_a,
					enunciado: 'Peça A',
					msgErro: 'Siga este exemplo: 1, 4, 3, 8. Caso esteja respondido da forma correta, siga a peça novamente e verifique se o caminho está correto. Note que a posição inicial deve ser o primeiro número de sua resposta.',
					msgAjuda: 'Se a peça A, por exemplo, passar pelas posições 1, 4, 9, 3, a resposta deve ser 1, 4, 9, 3.'
				},
				{//B
					tipo: 'input',
					corrigir: corrige_q_1_b,
					enunciado: 'Peça E',
					msgErro: 'Siga este exemplo: 1, 4, 3, 8. Caso esteja respondido da forma correta, siga a peça novamente e verifique se o caminho está correto. Note que a posição inicial deve ser o primeiro número de sua resposta.',
					msgAjuda: 'Se a peça E, por exemplo, passar pelas posições 1, 4, 9, 3 a resposta deve ser 1, 4, 9, 3.'
				},
				{//C
					tipo: 'input',
					corrigir: corrige_q_1_c,
					enunciado: 'Peça C',
					msgErro: 'Siga este exemplo: 1, 4, 3, 8. Caso esteja respondido da forma correta, siga a peça novamente e verifique se o caminho está correto. Note que a posição inicial deve ser o primeiro número de sua resposta.',
					msgAjuda: 'Se a peça C, por exemplo, passar pelas posições 1, 4, 9, 3 a resposta deve ser 1, 4, 9, 3.'
				},
				{//D
					tipo: 'input',
					corrigir: corrige_q_1_d,
					enunciado: 'Peça B',
					msgErro: 'Siga este exemplo: 1, 4, 3, 8. Caso esteja respondido da forma correta, siga a peça novamente e verifique se o caminho está correto. Note que a posição inicial deve ser o primeiro número de sua resposta.',
					msgAjuda: 'Se a peça B, por exemplo, passar pelas posições 1, 4, 9, 3 a resposta deve ser 1, 4, 9, 3.'
				},
				{//E
					tipo: 'input',
					corrigir: corrige_q_1_e,
					enunciado: 'Peça H',
					msgErro: 'Siga este exemplo: 1, 4, 3, 8. Caso esteja respondido da forma correta, siga a peça novamente e verifique se o caminho está correto. Note que a posição inicial deve ser o primeiro número de sua resposta.',
					msgAjuda: 'Se a peça H, por exemplo, passar pelas posições 1, 4, 9, 3 a resposta deve ser 1, 4, 9, 3.'
				}
			]
		},
		parte1_q2: //Questão 2
		{
			itens: 
			[
				{//A
					tipo: 'input',
					corrigir: corrige_q_2_a,
					enunciado: 'Todas as respostas escritas acima representam o mesmo ciclo. Escolha uma delas e repita o ciclo abaixo:',
					msgErro: 'Basta colocar uma das sequências que você respondeu acima.'
				}
			]
		}
	},
	{//Parte 2
		parte2_q3: //Questão 3
		{
			itens: 
			[
				{//A
					tipo: 'multiplo_input',
					corrigir: corrige_q_3_a,
					enunciado: 'Identifique os outros dois ciclos dessa permutação. Utilize apenas vírgulas entre os números sem espaços. Lembre que o ciclo tem cinco peças que são<br />(1, 5, 3, 2, 8).',
					dados:	[
							 [{tipo: 'normal', label:'Ciclo de 3 peças'},	{tipo: 'normal', label: 'Ciclo de uma peça'}]
							],
					msgErro: 'Procure os outros ciclos no embaralhamento. Há um ciclo de três peças e um de apenas uma.'
				}
			]
		}
	},
	{//Parte 3
		parte3_q4: //Questão 4
		{
			itens: 
			[
				{//A
					tipo: 'input',
					corrigir: corrige_q_4_a,
					esperando: true,
					enunciado: 'O embaralhamento que você criou possui quantos ciclos?',
					msgErro: 'Utilize o mesmo procedimento utilizado nas partes anteriores para identificar ciclos.'
				}
			]
		},
		parte3_q5: //Questão 5
		{
			itens:
			[
				{//A
					tipo: 'input',
					corrigir: corrige_q_5_a,
					esperando: true,
					enunciado: 'Represente abaixo os ciclos desta permutação. Lembre-se de utilizar a notação que definimos, expressando cada ciclo entre parênteses.',
					msgErro: 'Certifique-se que os ciclos estão corretos, seguindo uma peça de cada um deles.',
					msgAjuda: 'Um exemplo de representação de embaralhamento é: (4,2,5) (3,8,6) (1,7,9).'
				}
			]
		}
	},
	{//Parte 4
		parte4_q6:
		{
			itens:
			[
				{//A
					tipo: 'generico',
					corrigir: corrige_q_6_a,
					associado: true,
					selecionada: parte_4.selecionou_1.bind(parte_4),
					dados: '',
					enunciado: 'Arrastando as peças na ferramenta ao lado, defina uma permutação formada por 3 ciclos: um de comprimento 2, um de comprimento 4, e um de comprimento 3.',
					msgErro: 'Verifique se o seu ciclo possui os tamanhos corretos e se eles realmente são ciclos. Para relembrar o que é um ciclo, retorne às partes anteriores.',
					msgAjuda: 'O tamanho de um ciclo é definido pelo número de posições que ele contém. Para criar o seu embaralhamento, faça um ciclo de cada vez e de forma ordenada.'
				}
			]
		},
		parte4_q7:
		{
			itens:
			[
				{//A
					tipo: 'generico',
					corrigir: corrige_q_7_a,
					associado: true,
					selecionada: parte_4.selecionou_2.bind(parte_4),
					dados: '',
					enunciado: 'Agora, o desafio é definir uma permutação composta por quatro ciclos: um de comprimento 1, dois de comprimento 2, e um de comprimento 4.',
					msgErro: 'Verifique se o seu ciclo possui os tamanhos corretos e se eles realmente são ciclos. Para relembrar o que é um ciclo, retorne às partes anteriores.',
					msgAjuda: 'O tamanho de um ciclo é definido pelo número de posições que ele contém. Para criar o seu embaralhamento, faça um ciclo de cada vez e de forma ordenada.'
				}
			]
		},
		parte4_q8:
		{
			itens:
			[
				{//A
					tipo: 'generico',
					corrigir: corrige_q_8_a,
					associado: true,
					selecionada: parte_4.selecionou_3.bind(parte_4),
					dados: '',
					enunciado: 'No ferramenta ao lado, crie uma permutação composta por exatamente dois ciclos.',
					msgErro: 'Para relembrar o que é um ciclo, retorne às partes anteriores.',
					msgAjuda: 'Tente definir um ciclo de cada vez. Repare que, após definir o primeiro, todas as peças restantes deverão ser utilizadas no segundo ciclo.'
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