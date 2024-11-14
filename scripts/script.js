var cleaveNome, cleaveCargo, cleaveCelular, cleaveCelular2, cleaveEmail, cleaveCidade;

document.addEventListener('DOMContentLoaded', function() {
    // Código que usa o Cleave
    cleaveNome = new Cleave('#nome', {
		blocks: [100],
		delimiter: '',
		uppercase: true
    });

    cleaveCargo = new Cleave('#cargo', {
		blocks: [100],
		delimiter: '',
		uppercase: false
    });
	
	cleaveCelular = new Cleave('#celular', {
		delimiters: ['(', ') ', ' ', '-'],
		blocks: [0, 2, 1, 4, 4],
		numericOnly: true
    });
	
	cleaveCelular2 = new Cleave('#celular2', {
		delimiters: ['(', ') ', ' ', '-'],
		blocks: [0, 2, 1, 4, 4],
		numericOnly: true
    });
	
	cleaveEmail = new Cleave('#email', {});

	cleaveCidade = new Cleave('#cidade', {
		blocks: [100],
		delimiter: '',
		uppercase: false
    });
});


function configureFormEvent(formId, customConst, cleaveInstances) {
    const form = document.getElementById(formId);
	
	if (!form) {
        console.error(`Formulário com ID "${formId}" não encontrado.`);
        return;
    }
	
	
    form.addEventListener('submit', function(event) {
        event.preventDefault();
		
			function getFromCleaveInput(cleaveInstance) {
				return cleaveInstance.getRawValue();
			}
		
			function getFromCleaveInputFormated(cleaveInstance) {
				return cleaveInstance.getFormattedValue();
			}
		
			const nome = getFromCleaveInput(cleaveNome);
			const cargo = getFromCleaveInput(cleaveCargo);
			const celular = getFromCleaveInputFormated(cleaveCelular);
			const celular2 = getFromCleaveInputFormated(cleaveCelular2);
			const email = getFromCleaveInputFormated(cleaveEmail);
			const cidade = getFromCleaveInput(cleaveCidade);


			function separarDDD(celular) {
				const match = celular.match(/^\((\d{2})\)\s(.+)/);
				if (match) {
					return {
						ddd: `(${match[1]})`,
						numero: match[2]
					};
				} else {
					return {
						ddd: null,
						numero: null
					};
				}
			}

			const { ddd: ddd1, numero: numero1} = separarDDD(celular);
			const { ddd: ddd2, numero: numero2} = separarDDD(celular2);

	
			const canvas = document.getElementById('canvas');
			const ctx = canvas.getContext('2d');
		
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const imgBase64 = customConst; // Substitua pela string Base64 completa
			const img = new Image();
			img.src = imgBase64;
			img.onload = function() {
				// Obtém a largura e a altura originais da imagem
				const larguraImagem = img.width;
				const alturaImagem = img.height;

				// Limpa o canvas antes de desenhar a nova imagem
				ctx.clearRect(0, 0, canvas.width, canvas.height);

				// Ajusta o tamanho do canvas para que seja do mesmo tamanho da imagem base64
				canvas.width = larguraImagem;
				canvas.height = alturaImagem;

				// Desenha a imagem com as dimensões originais
				ctx.drawImage(img, 0, 0, larguraImagem, alturaImagem);

				ctx.font = 'bold 75px "Noto Sans", sans-serif';
				ctx.fillStyle = '#000000';
				ctx.fillText(nome, 1200, 135); 

				ctx.font = '400 55px "Noto Sans", sans-serif';
				ctx.fillStyle = '#000000';
				ctx.fillText(cargo, 1200, 210); 
				
				ctx.font = '400 45px "Noto Sans", sans-serif';
				ctx.fillStyle = '#000000';
				ctx.fillText(email, 1280, 415); 
			
				ctx.font = '400 45px "Noto Sans", sans-serif';
				ctx.fillStyle = '#000000';
				ctx.fillText(cidade, 1280, 628);

				
				if (celular2) {

					ctx.font = 'bold 40px "Noto Sans", sans-serif';
					ctx.fillStyle = '#000000';
					ctx.fillText(ddd1, 1280, 314);

					ctx.font = 'bold 55px "Noto Sans", sans-serif';
					ctx.fillStyle = '#000000';
					ctx.fillText(numero1, 1370, 314);

					ctx.font = 'bold 40px "Noto Sans", sans-serif';
					ctx.fillStyle = '#000000';
					ctx.fillText(ddd2, 1780, 314);

					ctx.font = 'bold 55px "Noto Sans", sans-serif';
					ctx.fillStyle = '#000000';
					ctx.fillText(numero2, 1870, 314);
					
				} else {

					ctx.font = 'bold 40px "Noto Sans", sans-serif';
					ctx.fillStyle = '#000000';
					ctx.fillText(ddd1, 1280, 314); 

					ctx.font = 'bold 55px "Noto Sans", sans-serif';
					ctx.fillStyle = '#000000';
					ctx.fillText(numero1, 1370, 314); 

				}

				document.getElementById('downloadJPG').style.display = 'block';

				document.getElementById('downloadJPG')?.addEventListener('click', function() {
					const canvas = document.getElementById('canvas');
					const link = document.createElement('a');
					link.href = canvas.toDataURL('image/jpg');
					link.download = 'download.jpg';
					link.click();
				});
			};
    });
}

const fundoAssinatura = localStorage.getItem('fundoAssinatura');
							
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const formId = 'assinaturaForm';
    if (formId) {
        configureFormEvent(formId, fundoAssinatura);
    } else {
        console.error('Parâmetro "form" não encontrado na URL.');
    }
});


