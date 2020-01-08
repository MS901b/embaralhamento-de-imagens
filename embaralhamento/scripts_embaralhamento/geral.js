function mostrargrade()
{
	$$('.resp').each(function(item)
	{
		if($('grade').checked)
			$(item).setOpacity(0.4);
		else
			$(item).setOpacity(1);
	});
}

function monitora_texto(item)
{
	var valor = $('SalvaLocal').Pega(nomeSoft, PosicaoAtual.Atividade + item);
	if(valor != 'undefined')
		$(item).setValue(valor);
	
	$(item).observe('change', function(ev)
	{
		var item = Event.element(ev);
		$('SalvaLocal').Salva(nomeSoft, PosicaoAtual.Atividade + item.id, item.value);
	});
}

function monitora_radio(item)
{
	var valor = $('SalvaLocal').Pega(nomeSoft, PosicaoAtual.Atividade + item);
	if(valor != 'undefined')
		$(item).checked = eval(valor);
	
	$(item).observe('change', function(ev)
	{
		ev.findElement('.input_radio').select('input[type=radio]').each(function(item){
			$('SalvaLocal').Salva(nomeSoft, PosicaoAtual.Atividade + item.id, item.checked);
		})
	});
}
function monitora_check(item)
{
	var valor = $('SalvaLocal').Pega(nomeSoft, PosicaoAtual.Atividade + item);
	if(valor != 'undefined')
		$(item).checked = eval(valor);
	
	$(item).observe('click', function(ev)
	{
		ev.findElement('.input_check').select('input[type=checkbox]').each(function(item){
			$('SalvaLocal').Salva(nomeSoft, PosicaoAtual.Atividade + item.id, item.checked);
		})
	});
}

function posta_mensagem(num, silencioso)
{
	var img = '';
	switch (num)
	{
		case '1': img = 'Imagem 1'; break;
		case '2': img = 'Imagem 2'; break;
		case '3': img = 'Imagem 3'; break;
	}
	
	var texto = 'Escolhi '+img+' como a imagem guia para o meu software.'
	
	MeuBloco = [texto];
	if(BlocoNotas.divCont.visible())
		BlocoNotas.mostra(BlocoNotas.atual);
}


function mmc(o){
	for(var i, j, n, d, r = 1; (n = o.pop()) != undefined;)
		while(n > 1){
			if(n % 2){
				for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2);
				d = i <= j ? i : n;
			}
			else
				d = 2;
			for(n /= d, r *= d, i = o.length; i; !(o[--i] % d) && (o[i] /= d) == 1 && o.splice(i, 1));
		}
	return r;
};

// Pega um Array e transforma em ciclo
function montaCiclo(permut)
{
	var ciclo = [];
	var ciclo_atual = [];
	var total = permut.length;
	var i = 0;
	
	while(total)
	{
		if(ciclo_atual.indexOf(permut[i]) == -1)
		{
			ciclo_atual.push(permut[i]);
			i = permut[i]-1;
			total--;
		}
		else
		{
			ciclo.push(ciclo_atual.clone());
			ciclo_atual = [];
			while(ciclo.flatten().indexOf(i+1) != -1)
				i++;
		}
	}
	ciclo.push(ciclo_atual);
	
	return ciclo;
}

// Verifica se é um ciclo (string ou ciclo)
function is_ciclo(ciclo)
{
	if(typeof ciclo == 'object' && ciclo.length)
	{
		certo = true;
		for(var a = 0; a < ciclo.length; a++)
			if(typeof ciclo[a] != 'object' || !ciclo.length)
				certo = false;
		return certo;
	}		
	else if(ciclo.length)
	{
		return is_ciclo(stringPraCiclo(ciclo));
	}
	return false;
}

// Passa um ciclo pra string
function cicloPraString(ciclo)
{
	if(!is_ciclo(ciclo))
		return null;
	
	for(var a = 0; a < ciclo.length; a++)
		ciclo[a] = ciclo[a].join(',');
	return '(' + ciclo.join(')(') + ')';
}

// Passa uma string pra ciclo
function stringPraCiclo(string)
{
	var ciclos = string.replace(/ /gi, '').replace(/\)\(/g,'|').replace('(','').replace(')','').split('|');
	for(var a = 0; a < ciclos.length; a++)
	{
		ciclos[a] = ciclos[a].split(',');
		for(var b = 0; b < ciclos[a].length; b++)
			ciclos[a][b] = Number(ciclos[a][b]);
	}
	return ciclos;
}

// Quantos passos o ciclo dá até voltar à posição inicial
function comprimentoCiclo(ciclo)
{
	var len = [];
	for(var a = 0; a < ciclo.length; a++)
		len.push(ciclo[a].length);
	return mmc(len);
}

// Compara dois ciclos
function ciclosIguais(ciclo1, ciclo2)
{
	if(typeof ciclo1 == 'string') ciclo1 = stringPraCiclo(ciclo1);
	if(typeof ciclo2 == 'string') ciclo2 = stringPraCiclo(ciclo2);
	
	ciclo1 = cicloPraString(ordenaCiclo(ciclo1));
	ciclo2 = cicloPraString(ordenaCiclo(ciclo2));
	
	return ciclo1 == ciclo2;
}

// Ordena os ciclos de maneira segura
function ordenaCiclo(ciclo)
{
	for(var a = 0; a < ciclo.length; a++)
	{
		var i = ciclo[a].indexOf(ciclo[a].max());
		var tmp = [];
		do{
			tmp.push(ciclo[a][i]);
			i = ++i%ciclo[a].length;
		}while(tmp.length != ciclo[a].length)
		ciclo[a] = tmp;
	}
	return ciclo.sortBy(function(i){if(typeof i == 'object' && i.length) return Number(i.join('')); return 0;})
}


var Permutador = Class.create({
	initialize: function(options)
	{
		var defaults = $H({container: 'disp', drags: 'resp', drops: 'dock', ordem: 'ordem', callbacks: {}})
		this.options = defaults.merge($H(options)).toObject();
		this.options.ordem = $(this.options.ordem);
		
		$R('01', '09').each(function(el)
		{
			el = this.options.drags+el
			new Draggable(el,{revert: true, 
				onStart: function(a){a.handle.up().setStyle({zIndex: 500});},
				onEnd: function(a){$R('01', '09').each(function(el){$(this.options.drops+el).setStyle({zIndex: 0})}.bind(this));}.bind(this)
			});
			$(el).setStyle({cursor: 'move'});
		}.bind(this));
		
		$R('01', '09').each(function(el)
		{
			Droppables.add(this.options.drops+el,{
				accept: this.options.drags, 
				onDrop: this.onDrop.bind(this)
			});
			
		}.bind(this));
		
		this.zera();
	},
	onDrop: function(quem, onde_caiu, ev)
	{
		if(!Element.empty(onde_caiu))
		{
			// Quem tá na caixa onde ele caiu
			var quem_ta = $(onde_caiu).down();
			
			// Qual é a caixa onde ele estava
			var onde_tava = quem.up();
			
			this.resposta[Number(quem_ta.id.substr(quem_ta.id.length-2,2))-1] = undefined;
			if(onde_tava.id.indexOf(this.options.drops) != -1)
				this.resposta[Number(quem_ta.id.substr(quem_ta.id.length-2,2))-1] = Number(onde_tava.id.substr(onde_tava.id.length-2,2));
				
			onde_tava.insert(quem_ta);
		}
		$(onde_caiu).insert(quem);
		quem.setStyle({
			top: 0,
			left: 0
		});
		
		var de = Number(quem.id.substr(quem.id.length-2,2))-1;
		var para = Number(onde_caiu.id.substr(onde_caiu.id.length-2,2));
		
		this.resposta[de] = para;
		this.atualizaOrdem();
		
		if(typeof this.options.callbacks.onDrop == 'function')
			this.options.callbacks.onDrop();
	},
	atualizaOrdem: function()
	{
		this.options.ordem.update();
		for(a = 0; a < this.resposta.length; a++)
			if (this.resposta[a])
				this.options.ordem.insert('<div>0'+(a+1)+'<em> -> </em>0'+(this.resposta[a])+'</div>');
	},
	setPermuta: function(permuta)
	{
		this.zera();
		this.resposta = permuta;
		for(var a = 0; a < permuta.length; a++)
			if($(this.options.drops+'0'+permuta[a]) && $(this.options.drags+'0'+(a+1)))
				$(this.options.drops+'0'+permuta[a]).insert($(this.options.drags+'0'+(a+1)));
		this.atualizaOrdem();
		
		return true;
	},
	zera: function()
	{
		this.options.ordem.update();
		this.resposta = new Array(9);
		
		$R('01','09').each(function(num){
			$(this.options.container+num).insert($(this.options.drags+num));
		}.bind(this));
	}
});