var window_loaded = false;
var flash_loaded = true;
var popup;

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
	
	if (PosicaoAtual.Parte == 0)
	{
		a = $('SalvaLocal').Pega(nomeSoft, 'desafio_1');
		if (a != 3)
			$('SalvaLocal').Salva(nomeSoft, 'desafio_1', '2');
	}
});


function tentaCerregarValores()
{
	if(!flash_loaded || !window_loaded)
		return;
	
	BlocoNotas = new Bloco();
	
	switch(PosicaoAtual.Parte)
	{
		case 0:
			$R('input_q1_a', 'input_q1_e').each(monitora_check);
			$w('parte1_q2_a').each(monitora_texto);
			
			this.imagem = $('SalvaLocal').Pega(nomeSoft, 'imagem_escolhida');
			$R('A','I').each(function(letra, i){
				$('resp0'+(i+1)).update('<img src="imgs/imagem'+this.imagem+letra+'.gif" />');
			}.bind(this));
			
			var a = PegaQuestao({Parte: 0, Questao:'parte1_q1', Item: 0});
			a.inputs = [$('input_q1_a'),$('input_q1_b'),$('input_q1_c'),$('input_q1_d'),$('input_q1_e')];
			a.inputs.each(function(input){
				input.observe('change', this.nada.bind(this));
			}.bind(a));
		break;
		
		case 1:
			$w('parte2_q3_a parte2_q3_b parte2_q3_c').each(monitora_texto);
			
			popup = new Popup($('novo'), 'Novo embaralhamento gerado.', ['seta_baixo', 'direita'], 8);
			document.observe('mousedown', popup.fecha.bind(popup));
			
			novo(true);
			$R('resp01', 'resp09').each(function(el)
			{
				Event.observe($(el), 'click', function()
				{
					if (anterior)
					{
						$(anterior).setStyle({border: 'none', overflow: 'visible', height: '56px', width: '74px'});
						$(anterior).firstDescendant().setStyle({margin: '0', overflow: 'visible'});
					}
					if (anterior != el)
					{
						anterior = el;
						$(el).setStyle({border: '3px solid #F00', overflow: 'hidden', height: '50px', width: '68px'});
						$(el).firstDescendant().setStyle({margin: '-3px', overflow: 'hidden'});
					}
					else
					{
						anterior = '';
					}
				});
				
				$(el).setStyle({
					cursor: 'pointer'
				});
			});
			
			this.imagem = $('SalvaLocal').Pega(nomeSoft, 'imagem_escolhida');
			$R('A','I').each(function(letra, i){
				$('resp0'+(i+1)).update('<img src="imgs/imagem'+this.imagem+letra+'.gif" />');
			}.bind(this));
		break;
	}
	$('grade').checked = false;
}

var contador = 0;
var anterior = '';
var ciclo;

function novo(esconde_popup)
{
	resetar();
	ciclo = $R(1,9).sortBy(function(){return Math.random();});
	
	
	$('parte2_q3_a').value = "";
	$('parte2_q3_b').value = "";
	$('parte2_q3_c').value = "";
	a = PegaQuestao({Parte: 1, Questao:'parte2_q3', Item: 0}).nada();
	a = PegaQuestao({Parte: 1, Questao:'parte2_q3', Item: 1}).nada();
	a = PegaQuestao({Parte: 1, Questao:'parte2_q3', Item: 2}).nada();
	
	if(!esconde_popup)
		popup.abre();
}


function embaralhar()
{
	for(a = 0; a < ciclo.length; a++)
	{
		resp = 'disp0'+ciclo[a];
		base = 'disp0'+(a+1);
		$(resp).insert($(base).firstDescendant());
	}
	$('contador').update(++contador);
}

function resetar()
{
	$('contador').update(contador = 0);
	
	$R('01', '09').each(function(num)
	{
		$('disp'+num).insert($('resp'+num));
	});
}


// função que é chamada sempre que todas as questões de uma determinada parte são acertadas
function tudoCerto()
{
	if (PosicaoAtual.Parte == 0)
		$('SalvaLocal').Salva(nomeSoft, 'desafio_1', '3');
}


function corrige_q_1_a(valor)
{
	return [valor[0] && !valor[1] && valor[2] && !valor[3] && !valor[4]];
}

function corrige_q_2_a(valor)
{
	var resp = valor[0].replace(/[ ]/gi,'').split(',').sortBy(function(s){return s});
	return [resp.length == 3 && resp[0] == '2' && resp[1] == '3' && resp[2] == '4'];
}

function corrige_q_3_a(valor)
{
	return [valor[0] == comprimentoCiclo(montaCiclo(ciclo))];
}

function corrige_q_3_b(valor)
{
	return [valor[0] == montaCiclo(ciclo).length];
}

function corrige_q_3_c(valor)
{
	var resp = valor[0].replace(/[ ]/gi,'').split(',').sortBy(function(s){return s}).join('');
	
	var esperado = [];
	var tmp = montaCiclo(ciclo);
	for(var a = 0; a < tmp.length; a++)
		esperado.push(tmp[a].length);
	esperado = esperado.sortBy(function(s){return s}).join('');
	
	return [resp == esperado];
}