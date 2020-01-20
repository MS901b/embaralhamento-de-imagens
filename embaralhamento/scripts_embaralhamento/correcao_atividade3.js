var window_loaded = false;
var flash_loaded = true;

Event.observe(window, 'load', function()
{
	window_loaded = true;
	BlocoNotas = new Bloco();
	if($('grade'))
		$('grade').observe('click', mostrargrade);
	tentaCerregarValores();
});


Event.observe(document, 'flash:SalvaLocal', function(ev)
{
	flash_loaded = true;
	tentaCerregarValores();
});


/*
	Esse script de exemplo registra o observer em change no input 'parte1_q1_a',
	fazendo com que seu valor volte sempre pro valor 21.
*/

function tentaCerregarValores()
{
	if(!flash_loaded || !window_loaded)
		return;
	
	BlocoNotas = new Bloco();
	
	switch(PosicaoAtual.Parte)
	{
		case 0: 
			if ($('SalvaLocal').Pega(nomeSoft, 'atividade_3') != '3')
				$('SalvaLocal').Salva(nomeSoft, 'atividade_3', '2');
			
			$w('parte1_q1_a parte1_q2_a parte1_q2_b parte1_q2_c parte1_q3_a').each(monitora_texto);
			parte_1.inicia();
		break;
		
		case 1: 
			$w('parte2_q4_a parte2_q4_b parte2_q4_c parte2_q5_a').each(monitora_texto);
			parte_2.inicia();
		break;
		
		case 2: 
			$w('parte3_q6_a parte3_q7_a').each(monitora_texto);
			parte_3.popupInicial = new Popup($('link_valor_inicial'), 'Preencha corretamente o embaralhamento.', ['seta_baixo', 'direita'], 8);
			document.observe('mousedown', parte_3.popupInicial.fecha.bind(parte_3.popupInicial));
			
			$('grade').trava();
			$('embaralhar').trava();
			$('zerar').trava();
			parte_3.inicia();
		break;
		
		case 3:
			$w('parte4_q8_a parte4_q8_b').each(monitora_texto);
			$R('parte4_q9_a_1', 'parte4_q9_a_4').each(monitora_radio);
			
			$('ciclo_criado').update($('SalvaLocal').Pega(nomeSoft, 'atv3_comprimentos'));
			$('embaralhadas').update($('SalvaLocal').Pega(nomeSoft, 'atv3_comprimento'));
		break;
		
		case 4:
			parte_5.inicia();
			PegaQuestao({Parte: 4, Questao:'parte5_q10', Item: 0}).seleciona();
		break;
	}

}

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

		console.log("CAIU NO INICIA")
		
		var permuta_escolhida = $('SalvaLocal').Pega(nomeSoft, 'valor_inicial_a3p3');
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

		
		$('SalvaLocal').SalvaObjeto(nomeSoft, 'valor_inicial_a3p3', this.permuta.resposta);
		
		removeEsperando({Parte: 2, Questao:'parte3_q6', Item: 0}, '');
		removeEsperando({Parte: 2, Questao:'parte3_q7', Item: 0}, '');
		$('velatura_applet').hide();
		$('trava_embaralhamento').show();
		$('valor_inicial').addClassName('desabilitada');
		$('link_valor_inicial').hide();
		$('unset_inicial').show();
		$('grade').destrava();
		$('embaralhar').destrava();
		$('zerar').destrava();
	},
	
	unset_inicial: function()
	{
		if (this.resultado == 'sim')
		{
			parte_3.permuta.zera();
			
			// Bloqueia as próximas partes, apaga o valor inicial do local
			$('SalvaLocal').Salva(nomeSoft, 'automacao_atividade_'+PosicaoAtual.Atividade+'_parte_2', '2');
			$('SalvaLocal').Salva(nomeSoft, 'automacao_atividade_'+PosicaoAtual.Atividade+'_parte_3', '0');
			$('SalvaLocal').Salva(nomeSoft, 'automacao_atividade_'+PosicaoAtual.Atividade+'_parte_4', '0');
			$('SalvaLocal').Apaga(nomeSoft, 'valor_inicial_a3p3');
			gerencia_partes();
			permiteContinuar(false);
			$('corrigir_tudo').removeClassName('algo_errado').removeClassName('tudo_certo');
			
			$('velatura_applet').show();
			$('link_valor_inicial').show();
			$('velatura_applet').setOpacity(0.8);
			$('trava_embaralhamento').hide();
			$('unset_inicial').hide();
			
			adicionaEsperando({Parte: 2, Questao:'parte3_q6', Item: 0});
			adicionaEsperando({Parte: 2, Questao:'parte3_q7', Item: 0});
			$('valor_inicial').removeClassName('desabilitada');
			
			$('grade').trava();
			$('embaralhar').trava();
			$('zerar').trava();
		}
	}
}))();

var parte_5 = new (Class.create({
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
		$('SalvaLocal').SalvaObjeto(nomeSoft, 'a3_p5_q'+this.selecionada, this.permuta.resposta);
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
	ajusta: function()
	{
		console.log("CAIU NO AJUSTA")
		var resp = $('SalvaLocal').Pega(nomeSoft, 'a3_p5_q'+this.selecionada);
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
	if (PosicaoAtual.Parte == 4)
		$('SalvaLocal').Salva(nomeSoft, 'atividade_3', '3');
}

	

function corrige_q_1_a(valor)
{
	var correto = '(3,8,5)(7,9,1,4,6)(2)';
	return [ciclosIguais(correto, valor[0])];
}

function corrige_q_2_a(valor)
{
	return [valor[0] == 3];
}
function corrige_q_2_b(valor)
{
	return [valor[0] == 5];
}
function corrige_q_2_c(valor)
{
	return [valor[0] == 1];
}
function corrige_q_3_a(valor)
{
	return [valor[0] == 15];
}


function corrige_q_4_a(valor)
{
	return [valor[0] == 3];
}
function corrige_q_4_b(valor)
{
	return [valor[0] == 3];
}
function corrige_q_4_c(valor)
{
	return [valor[0] == 3];
}
function corrige_q_5_a(valor)
{
	return [valor[0] == 3];
}

function corrige_q_6_a(valor)
{
	var ciclo = montaCiclo(parte_3.permuta.resposta)
	var certo = ciclosIguais(valor[0], ciclo)
	if(certo)
	{
		var comprimentos = [];
		for(var a = 0; a < ciclo.length; a++) 
			comprimentos.push(ciclo[a].length); 
		
		$('SalvaLocal').Salva(nomeSoft, 'atv3_comprimentos', comprimentos.join(','));
		$('SalvaLocal').Salva(nomeSoft, 'atv3_comprimento', comprimentoCiclo(ciclo));
	}
	return [certo];
}

function corrige_q_7_a(valor)
{
	return [valor[0] == comprimentoCiclo(montaCiclo(parte_3.permuta.resposta))];
}

function corrige_q_8_a(valor)
{
	return [valor[0] == 12];
}
function corrige_q_8_b(valor)
{
	return [valor[0] == 20];
}
function corrige_q_9_a(valor)
{
	return [valor[0]?false:null, valor[1]?false:null, valor[2]?true:null, valor[3]?false:null];
}


function corrige_q_10_a(valor)
{
	return [comprimentoCiclo(montaCiclo($('SalvaLocal').Pega(nomeSoft, 'a3_p5_q1'))) == 6]
}


function corrige_q_10_b(valor)
{
	return [comprimentoCiclo(montaCiclo($('SalvaLocal').Pega(nomeSoft, 'a3_p5_q2'))) == 10]
}

