var window_loaded = false;
var flash_loaded = false;

Event.observe(window, 'load', function()
{
	window_loaded = true;
	BlocoNotas = new Bloco();
	$('grade').observe('click', mostrargrade);
	tentaCerregarValores();
});


Event.observe(document, 'flash:SalvaLocal', function(ev)
{
	flash_loaded = true;
	tentaCerregarValores();
});

function tentaCerregarValores()
{
	if(!flash_loaded || !window_loaded)
		return;
	
	var imagem = $('SalvaLocal').Pega(nomeSoft, 'imagem_escolhida');
	posta_mensagem(imagem,true);
	
	$('grade').trava();
	$('embaralhar').trava();
	$('zerar').trava();
	
	switch(PosicaoAtual.Parte)
	{
		case 0:
			if ($('SalvaLocal').Pega(nomeSoft, 'atividade_1') != '3')
				$('SalvaLocal').Salva(nomeSoft, 'atividade_1', '2');
			
			$w('parte1_q1_a_22 parte1_q1_a_32 parte1_q1_a_42 parte1_q1_a_52 parte1_q1_a_62 parte1_q1_a_72 parte1_q1_a_82 parte1_q1_a_92 parte1_q1_a_102 parte1_q2_a_11 parte1_q2_a_12 parte1_q2_a_13').each(monitora_texto);
			parte_1.inicia();
		break;
		
		case 1:
			$w('parte2_q3_a').each(monitora_texto);
			parte_2.inicia();
		break;
		
		case 2:
			$w('parte3_q4_a').each(monitora_texto);
			parte_3.inicia();
			parte_3.popupInicial = new Popup($('link_valor_inicial'), 'Preencha corretamente o embaralhamento.', ['seta_baixo', 'direita'], 8);
			document.observe('mousedown', parte_3.popupInicial.fecha.bind(parte_3.popupInicial));
		break;
	}
}

// funções de cada parte

var parte_1 = new (Class.create({
	imagem: null,
	inicia: function()
	{
		this.imagem = $('SalvaLocal').Pega(nomeSoft, 'imagem_escolhida');
		$R('A','I').each(function(letra, i){
			$('resp0'+(i+1)).setStyle({background: 'url(imgs/imagem'+this.imagem+letra+'.gif)' });
		}.bind(this));
		
		$('grade').destrava();
		$('embaralhar').destrava();
		$('zerar').destrava();
	}
}))();

var parte_2 = new (Class.create({
	imagem: null,
	inicia: function()
	{
		this.imagem = $('SalvaLocal').Pega(nomeSoft, 'imagem_escolhida');
		$('imagem_atual').update('<img src="imgs/embaralhamento0'+this.imagem+'.jpg" />');
		$R('A','I').each(function(letra, i)
		{
			$('resp0'+(i+1)).update('<img src="imgs/imagem'+this.imagem+letra+'.gif" />');
		}.bind(this));
		
		$('grade').destrava();
		$('embaralhar').destrava();
		$('zerar').destrava();
	}
}))();

var parte_3 = new (Class.create({
	imagem: null,
	inicia: function()
	{
		// A imagem escolhida
		this.imagem = $('SalvaLocal').Pega(nomeSoft, 'imagem_escolhida');
		$('imagem_atual').update('<img src="imgs/embaralhamento0'+this.imagem+'.jpg" />');
		
		// Seta as imagens do quebra cabeça de acordo com a imagem escolhida
		$R('A','I').each(function(letra, i)
		{
			$('resp0'+(i+1)).update('<img src="imgs/imagem'+this.imagem+letra+'.gif" />');
			$('iresp0'+(i+1)).setStyle({background: 'url(imgs/imagem'+this.imagem+letra+'.gif)' });
		}.bind(this));
		
		this.permuta = new Permutador({
			container: 'idisp',
			drags: 'iresp',
			drops: 'idock',
			ordem: 'ordem1'
		});
		
		$('unset_inicial').hide();
		$('velatura_applet').show();
		$('velatura_applet').setOpacity(0.8);
		$('erro').hide();
		$('trava_embaralhamento').hide();
		
		var permuta_escolhida = $('SalvaLocal').Pega(nomeSoft, 'valor_inicial_a1p3');
		if(typeof permuta_escolhida == 'object')
			if(this.permuta.setPermuta(permuta_escolhida))
				this.set_inicial();
	},
	set_inicial: function()
	{
		var erro = false;
		for(a = 0; a < this.permuta.resposta.length; a++)
			if (!this.permuta.resposta[a])
				erro = true;
		
		if (erro)
		{
			this.popupInicial.abre();
			return;
		}

		
		$('SalvaLocal').SalvaObjeto(nomeSoft, 'valor_inicial_a1p3', this.permuta.resposta);
		
		removeEsperando({Parte: 2, Questao:'parte3_q4', Item: 0}, '');
		$('velatura_applet').hide();
		$('trava_embaralhamento').show();
		$('valor_inicial').addClassName('desabilitada');
		$('link_valor_inicial').hide();
		$('unset_inicial').show();
		
		$('grade').destrava();
		$('embaralhar').destrava();
		$('zerar').destrava()
	},
	unset_inicial: function()
	{
		if (this.resultado == 'sim')
		{
			parte_3.zerar();
			$('velatura_applet').show();
			$('trava_embaralhamento').hide();
			adicionaEsperando({Parte: 2, Questao:'parte3_q4', Item: 0});
			$('valor_inicial').removeClassName('desabilitada');
			
			$('grade').trava();
			$('embaralhar').trava();
			$('zerar').trava();
			
			$('link_valor_inicial').show();
			$('unset_inicial').hide();
		}
	},
	zerar: function()
	{
		this.permuta.zera();
		
		$R('01','09').each(function(num)
		{
			$('idisp'+num).update($('iresp'+num));
			$('iresp'+num).setStyle({
				top: '0',
				left: '0',
				position: 'relative'
			});
		});
		
		resetar();
	}
}))();








// função que é chamada sempre que todas as questões de uma determinada parte são acertadas
function tudoCerto()
{
	if (PosicaoAtual.Parte == 2)
		$('SalvaLocal').Salva(nomeSoft, 'atividade_1', '3');
}

//Vários campos independentes: no caso, uma tabela em que cada campo tem seu resultado
//Veja que o Array possui tamanho 4 (um para cada campo)
function corrige_q_1_a(valor)
{
	return [(valor[0] == 3),(valor[1] == 6),(valor[2] == 8),(valor[3] == 4),(valor[4] == 9),(valor[5] == 7),(valor[6] == 5),(valor[7] == 1),(valor[8] == 2)];
}

//Vários campos independentes: no caso, uma tabela em que cada campo tem seu resultado
//Veja que o Array possui tamanho 4 (um para cada campo)
function corrige_q_2_a(valor)
{
	var divErro = PegaQuestao({Parte: 0, Questao:'parte1_q2', Item: 0}).MsgErro.divCont.firstDescendant();
	
	if (valor[0] != 8 || valor[1] != 4 || valor[2] != 5)
	{
		a = '';
		b = 0;
		if (valor[0] != 8)
		{
			a = a + 'A, ';
			b++;
		}
		if (valor[1] != 4)
		{
			a = a + 'D, ';
			b++;
		}
		if (valor[2] != 5)
		{
			a = a + 'F, ';
			b++;
		}
		a = a.substr(0,a.length-2) + '.'
		
		if (b == 1)	divErro.update('Confira novamente a posição da seguinte carta: ' + a);
		if (b > 1)	divErro.update('Confira novamente a posição das seguintes cartas: ' + a);
	}
	
	return [(valor[0] == 8),(valor[1] == 4),(valor[2] == 5)];
}

function corrige_q_3_a(valor)
{
	return [(valor == 15)];
}

function corrige_q_4_a(valor)
{
	return [valor == comprimentoCiclo(montaCiclo(parte_3.permuta.resposta))];
}






//Vários campos dependentes: no caso, uma matriz que somente está correta com um conjunto de respostas
//Veja que o Array possui tamanho 1, apesar de 5 campos na questão!
function corrige_q_2_c(valor)
{
	return [valor[0]*(valor[2]-3*valor[4]) + 2*(8-3*valor[3]) + valor[1]*(8*valor[4]-valor[2]*valor[3]) == 0];
}
