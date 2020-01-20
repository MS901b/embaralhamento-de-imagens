var window_loaded = false;
var flash_loaded = true;

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
	
	switch(PosicaoAtual.Parte)
	{
		case 0:
			if ($('SalvaLocal').Pega(nomeSoft, 'atividade_2') != '3')
				$('SalvaLocal').Salva(nomeSoft, 'atividade_2', '2');
			
			$w('parte1_q1_a parte1_q1_b parte1_q1_c parte1_q1_d parte1_q1_e parte1_q2_a').each(monitora_texto);
			parte_1.inicia();
		break;
		
		case 1:
			$w('parte2_q3_a_11 parte2_q3_a_12').each(monitora_texto);
			parte_2.inicia();
		break;
		
		case 2:
			$w('parte3_q4_a parte3_q5_a').each(monitora_texto);
			parte_3.popupInicial = new Popup($('link_valor_inicial'), 'Preencha corretamente o embaralhamento.', ['seta_baixo', 'direita'], 8);
			document.observe('mousedown', parte_3.popupInicial.fecha.bind(parte_3.popupInicial));
			
			$('grade').trava();
			$('embaralhar').trava();
			$('resetar').trava();
			
			parte_3.inicia();
		break;
		
		case 3:
			parte_4.inicia();
			PegaQuestao({Parte: 3, Questao:'parte4_q6', Item: 0}).seleciona();
		break;
	}
}


Event.observe(window, 'load', function()
{

	BlocoNotas = new Bloco();

});

var parte_1 = new (Class.create({
	imagem: null,
	inicia: function()
	{
		this.imagem = $('SalvaLocal').Pega(nomeSoft, 'imagem_escolhida');
		
		$('imagem_atual').update('<img src="imgs/embaralhamento0'+this.imagem+'.jpg" />');
		$R('A','I').each(function(letra, i){
			$('resp0'+(i+1)).update('<img src="imgs/imagem'+this.imagem+letra+'.gif" />');
		}.bind(this));
	}
}))();

var parte_2 = new (Class.create({
	imagem: null,
	inicia: function()
	{
		this.imagem = $('SalvaLocal').Pega(nomeSoft, 'imagem_escolhida');
		
		$('imagem_atual').update('<img src="imgs/embaralhamento0'+this.imagem+'.jpg" />');
		$R('A','I').each(function(letra, i){
			$('resp0'+(i+1)).update('<img src="imgs/imagem'+this.imagem+letra+'.gif" />');
		}.bind(this));
		
		var status = $('SalvaLocal').Pega(nomeSoft, 'automacao_atividade_'+PosicaoAtual.Atividade+'_parte_1');
		if(status == '3')
			this.msgAoAcertar();
	},
	msgAoAcertar: function()
	{
		var valor = [
			$('SalvaLocal').Pega(nomeSoft, PosicaoAtual.Atividade + 'parte2_q3_a_11'),
			$('SalvaLocal').Pega(nomeSoft, PosicaoAtual.Atividade + 'parte2_q3_a_12')
		];
		$('texto_ao_acertar').setStyle({visibility: 'visible'});
		$('ciclos').update('(1, 5, 3, 2, 8) ('+ valor[0].split(',').join(', ')+ ') ('+valor[1]+')');
	}
}))();

var parte_3 = new (Class.create({
	popupInicial: null, resposta: null,
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
		$('trava_embaralhamento').hide();
		
		var permuta_escolhida = $('SalvaLocal').Pega(nomeSoft, 'valor_inicial_a2p3');
		if(typeof permuta_escolhida == 'object' && permuta_escolhida != null)
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

		
		$('SalvaLocal').SalvaObjeto(nomeSoft, 'valor_inicial_a2p3', this.permuta.resposta);
		
		removeEsperando({Parte: 2, Questao:'parte3_q4', Item: 0}, '');
		removeEsperando({Parte: 2, Questao:'parte3_q5', Item: 0}, '');
		$('velatura_applet').hide();
		$('trava_embaralhamento').show();
		$('valor_inicial').addClassName('desabilitada');
		$('link_valor_inicial').hide();
		$('unset_inicial').show();
		$('grade').destrava();
		$('embaralhar').destrava();
		$('resetar').destrava();
	},
	
	unset_inicial: function()
	{
		if (this.resultado == 'sim')
		{
			parte_3.zerar();
			$('velatura_applet').show();
			$('link_valor_inicial').show();
			$('velatura_applet').setOpacity(0.8);
			$('trava_embaralhamento').hide();
			$('unset_inicial').hide();
			
			adicionaEsperando({Parte: 2, Questao:'parte3_q4', Item: 0});
			adicionaEsperando({Parte: 2, Questao:'parte3_q5', Item: 0});
			$('valor_inicial').removeClassName('desabilitada');
			
			$('grade').trava();
			$('embaralhar').trava();
			$('resetar').trava();
		}
	},
	
	zerar: function()
	{
		$('ordem1').update('');
		this.resposta = $H({});
		
		$R('01','09').each(function(num){
			$('idisp'+num).update($('iresp'+num));
		});
		
		$$('.iresp').each(function(item)
		{
			item.setStyle({
				top: '0',
				left: '0',
				position: 'relative'
			});
		});
		
		resetar();
	}
}))();

var parte_4 = new (Class.create({
	imagem: null,
	inicia: function()
	{
		this.imagem = $('SalvaLocal').Pega(nomeSoft, 'imagem_escolhida');
		
		$R('A','I').each(function(letra, i){
			$('resp0'+(i+1)).update('<img src="imgs/imagem'+this.imagem+letra+'.gif" />');
		}.bind(this));
		
		this.permuta = new Permutador({
			container: 'disp',
			drags: 'resp',
			drops: 'dock',
			ordem: 'ordem1',
			callbacks: {onDrop: this.salva.bind(this)}
		});
	},
	salva: function()
	{
		$('SalvaLocal').SalvaObjeto(nomeSoft, 'a2_p4_q'+this.selecionada, this.permuta.resposta);
	},
	selecionou_1: function()
	{
		this.selecionada = 1;
		this.ajusta();
	},
	selecionou_2: function()
	{
		this.selecionada = 2;
		this.ajusta();
	},
	selecionou_3: function()
	{
		this.selecionada = 3;
		this.ajusta();
	},
	ajusta: function()
	{
		var resp = $('SalvaLocal').Pega(nomeSoft, 'a2_p4_q'+this.selecionada);
		if(typeof resp == 'object' && resp != null)
			this.permuta.setPermuta(resp);
		else
			this.permuta.zera();
	},
	redefinir: function()
	{
		this.permuta.zera();
		this.salva();
		this.ajusta();
	}
}))();

// função que é chamada sempre que todas as questões de uma determinada parte são acertadas
function tudoCerto()
{
	if (PosicaoAtual.Parte == 3)
		$('SalvaLocal').Salva(nomeSoft, 'atividade_2', '3');
}


// PARTE 1
function corrige_q_1_a(valor)
{
	var resp = valor[0].replace(/ /gi, '');
	return [resp == "1,5,3,2,8"];
}
function corrige_q_1_b(valor)
{
	var resp = valor[0].replace(/ /gi, '');
	return [resp == "5,3,2,8,1"];
}
function corrige_q_1_c(valor)
{
	var resp = valor[0].replace(/ /gi, '');
	return [resp == "3,2,8,1,5"];
}
function corrige_q_1_d(valor)
{
	var resp = valor[0].replace(/ /gi, '');
	return [resp == "2,8,1,5,3"];
}
function corrige_q_1_e(valor)
{
	var resp = valor[0].replace(/ /gi, '');
	return [resp == "8,1,5,3,2"];
}
function corrige_q_2_a(valor)
{
	var resp = valor[0].replace(/ /gi, '');
	return [resp == "1,5,3,2,8" || resp == "5,3,2,8,1" || resp == "3,2,8,1,5" || resp == "2,8,1,5,3" || resp == "8,1,5,3,2"];
}



// PARTE 2
function corrige_q_3_a(valor)
{
	valor[0] = valor[0].replace(/[\(\) ]/gi, '');
	valor[1] = valor[1].replace(/[\(\) ]/gi, '');
	
	var teste1 = valor[0] == '9,4,7' || valor[0] == '4,7,9' || valor[0] == '7,9,4';
	var teste2 = valor[1] == '6'
	
	if (teste1 && teste2)
		parte_2.msgAoAcertar();
	
	return [teste1, teste2];
}



// PARTE 3
function corrige_q_4_a(valor)
{
	return [(valor[0] == montaCiclo(parte_3.permuta.resposta).length)];
}

function corrige_q_5_a(valor)
{
	return [ciclosIguais(valor[0], montaCiclo(parte_3.permuta.resposta))];
}




// PARTE 4
function corrige_q_6_a(valor)
{
	var resp = ordenaCiclo(montaCiclo($('SalvaLocal').Pega(nomeSoft, 'a2_p4_q1')));
	return [resp.length == 3 && resp[0].length == 2 && resp[1].length == 3 && resp[2].length == 4];
}

function corrige_q_7_a(valor)
{
	var resp = ordenaCiclo(montaCiclo($('SalvaLocal').Pega(nomeSoft, 'a2_p4_q2')));
	return [resp.length == 4 && resp[0].length == 1 && resp[1].length == 2 && resp[2].length == 2 && resp[3].length == 4];
}

function corrige_q_8_a(valor)
{
	var resp = montaCiclo($('SalvaLocal').Pega(nomeSoft, 'a2_p4_q3'));
	return [resp.length == 2]
}