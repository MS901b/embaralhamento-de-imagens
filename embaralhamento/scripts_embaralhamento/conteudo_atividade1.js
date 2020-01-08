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

var Partes = ['1', '2', '3'];
var nomeSoft="Embaralhamento";

var Questoes = 
[
	{//Parte 1
		parte1_q1: //Questão 1
		{
			itens: 
			[
				{//A
					tipo: 'tabela',
					corrigir: corrige_q_1_a,
					enunciado: 'No quadro abaixo, descreva a permutação com que você embaralhou a figura, indicando os números das posições para as quais cada uma das peças foram levadas.',
					dados:	[
								[{value: 'Posição inicial', largura: 6},	{value: 'Posição após permutação', largura: 6}],	//header
								[{value: '1 ->', tipo: 'texto'},	{tipo: 'input'}],
								[{value: '2 ->', tipo: 'texto'},	{tipo: 'input'}],
								[{value: '3 ->', tipo: 'texto'},	{tipo: 'input'}],
								[{value: '4 ->', tipo: 'texto'},	{tipo: 'input'}],
								[{value: '5 ->', tipo: 'texto'},	{tipo: 'input'}],
								[{value: '6 ->', tipo: 'texto'},	{tipo: 'input'}],
								[{value: '7 ->', tipo: 'texto'},	{tipo: 'input'}],
								[{value: '8 ->', tipo: 'texto'},	{tipo: 'input'}],
								[{value: '9 ->', tipo: 'texto'},	{tipo: 'input'}]
							],
					msgErro: 'Faça de novo a animação e veja para qual posição cada carta foi.',
					msgAjuda: 'As cartas mudam de posição a cada embaralhada. A que estava na posição 1 vai para a posição 3, por exemplo. Para enxergar as posições, habilite a grade no quadro.'
				}
			]
		},
		parte1_q2: //Questão 2
		{
			itens: 
			[
				{//B
					tipo: 'multiplo_input',
					corrigir: corrige_q_2_a,
					enunciado: 'Embaralhe novamente e indique as novas posições das seguintes cartas:',
					dados:	[
							 [{tipo: 'pequeno', label:'A'},	{tipo: 'pequeno', label: 'D'},	{tipo: 'pequeno', label: 'F'}]
							],
					msgErro: 'Confira novamente a posição das cartas A, D e F.',
					msgAjuda: 'Para enxergar as posições, habilite a grade no quadro.'
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
					tipo: 'input',
					corrigir: corrige_q_3_a,
					enunciado: 'O embaralhamento ao lado é o mesmo da parte anterior. Qual é o menor número de embaralhadas necessárias para que a figura retorne à forma original?',
					msgErro: 'Zere o embaralhamento e conte novamente.',
					msgAjuda: 'Basta embaralhar as peças até que elas voltem à sua posição original que o número de embaralhadas feitas estará indicado no campo <strong>contador</strong>.'
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
					enunciado: 'Após quantas embaralhadas a figura volta à posição original pela primeira vez?',
					msgErro: 'Zere seu embaralhamento e conte novamente.',
					msgAjuda: 'Depois de criar seu embaralhamento, basta contar as embaralhadas necessárias para que as peças voltem à posição original.'
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

var MeuBloco = new Array(
);
