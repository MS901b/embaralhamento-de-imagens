/*
				
	Referências bibliográficas:
	
	Esse conteúdo aparecerá no popup de Referencias, paginado de acordo com a ordem no array.
	
*/



var Referencias = new Array(
	{
		titulo: 'MMC',
		link: 'mmc',
		texto: [
			'Você lembra como calcular o Mínimo Múltiplo Comum entre dois ou mais números? Veja um exemplo com os números 3, 6 e 8. Para isso, escreva os números na seguinte disposição:',
			'<table style="margin-bottom:10px;"><tr><td style="border-right: 1px solid black; padding-right:5px;"> 3, 6, 8 </td></tr><tr><td style="border-right: 1px solid black; padding-right:5px;">&nbsp;</td></tr><tr><td style="border-right: 1px solid black; padding-right:5px;">&nbsp;</td></tr></table>',
			'Agora, você precisa verificar se algum desses números é divisível pelo primeiro número primo: o 2. Como você pode perceber, tanto o 6 como o 8 são:',
			'<table style="margin-bottom:10px;"><tr><td style="border-right: 1px solid black; padding-right:5px;"> 3, 6, 8 </td><td style="padding-left:5px;">2</td></tr><tr><td style="border-right: 1px solid black; padding-right:5px;">3, 3, 4</td></tr><tr><td style="border-right: 1px solid black; padding-right:5px;">&nbsp;</td></tr></table>',
			'Agora, restaram os números 3, 3, e 4. E o 4 ainda é divisível por 2, então é possível dividir novamente por 2:',
			'<table style="margin-bottom:10px;"><tr><td style="border-right: 1px solid black; padding-right:5px;"> 3, 6, 8 </td><td style="padding-left:5px;">2</td></tr><tr><td style="border-right: 1px solid black; padding-right:5px;">3, 3, 4</td><td style="padding-left:5px;">2</td></tr><tr><td style="border-right: 1px solid black; padding-right:5px;">3, 3, 2</td></tr></table>',
			'Podemos dividir novamente por 2:',
			'<table style="margin-bottom:10px;"><tr><td style="border-right: 1px solid black; padding-right:5px;"> 3, 6, 8 </td><td style="padding-left:5px;">2</td></tr><tr><td style="border-right: 1px solid black; padding-right:5px;">3, 3, 4</td><td style="padding-left:5px;">2</td></tr><tr><td style="border-right: 1px solid black; padding-right:5px;">3, 3, 2</td><td style="padding-left:5px;">2</td></tr><tr><td style="border-right: 1px solid black; padding-right:5px;">3, 3, 1</td></tr></table>',
			'Agora, como não é mais possível dividir por 2, tente o próximo primo, o 3.',
			'<table style="margin-bottom:10px;"><tr><td style="border-right: 1px solid black; padding-right:5px;"> 3, 6, 8 </td><td style="padding-left:5px;">2</td></tr><tr><td style="border-right: 1px solid black; padding-right:5px;">3, 3, 4</td><td style="padding-left:5px;">2</td></tr><tr><td style="border-right: 1px solid black; padding-right:5px;">3, 3, 2</td><td style="padding-left:5px;">2</td></tr><tr><td style="border-right: 1px solid black; padding-right:5px;">3, 3, 1</td><td style="padding-left:5px;">3</td></tr><tr><td style="border-right: 1px solid black; padding-right:5px;">1, 1, 1</td></tr></table>',
			'Agora que não é mais possível dividir por qualquer número primo, basta multiplicar todos os números da coluna da direita: ',
			'MMC(3, 6, 8) = 2.2.2.3 = 24',
			'Veja mais um exemplo, mas, desta vez, entre os números 10, 2 e 5:',
			'<table style="margin-bottom:10px;"><tr><td style="border-right: 1px solid black; padding-right:5px;"> 2, 5, 10 </td><td style="padding-left:5px;">2</td></tr><tr><td style="border-right: 1px solid black; padding-right:5px;">1, 5, 5</td><td style="padding-left:5px;">5</td></tr><tr><td style="border-right: 1px solid black; padding-right:5px;">1, 1, 1</td></tr></table>',
			'MMC(2, 5, 10) = 2.5 = 10'
		]
	},
	{
		titulo: 'Teoria dos Grupos',
		texto: [
			'O conceito de grupo emergiu do estudo de equações de polinômios com Évariste Galois na década de 1830. Após contribuições vindas de outros ramos da matemática, como da teoria dos números e da geometria, a noção de grupo foi generalizada e se estabeleceu firmemente por volta de 1870.',
			'A teoria dos grupos moderna - uma área muito ativa de pesquisa - estuda os grupos em si mesmos. Para explorá-los, matemáticos formularam várias noções para quebrar grupos em partes menores e mais compreensíveis, como subgrupos, grupos quocientes e grupos simples.',
			'Além das propriedades abstratas, matemáticos estudam as diferentes maneiras pelas quais um grupo pode ser expresso concretamente (as representações do grupo), tanto de um ponto-de-vista teórico   como de um prático-computacional. Em particular, uma teoria ricamente desenvolvida é a dos grupos finitos, que culminou com a monumental classificação dos grupos finitos simples, completada em 1983.',
			'Um exemplo simples de grupo é o dos números inteiros com a operação soma usual.',
			'<strong>Curiosidade</strong>',
			'O cubo de Rubik, também conhecido como cubo mágico, é um quebra cabeça tridimensional, inventado pelo Húngaro Ernõ Rubik em 1974. Esse jogo pode ser resolvido utilizando princípios básicos da teoria de grupos.'
		]
	}
);