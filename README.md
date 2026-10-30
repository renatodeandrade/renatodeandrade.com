# Renato de Andrade — Portfolio

Portfólio profissional em português do Brasil, com uma versão secundária em inglês, conectando experiência farmacêutica, formação em Ciência de Dados e projetos práticos.

- Português (padrão): [renatodeandrade.com](https://renatodeandrade.com/).
- Inglês: [renatodeandrade.com/en/](https://renatodeandrade.com/en/).
- O seletor PT / EN permanece visível no celular. Os links funcionam sem JavaScript; com o script, a seção escolhida é mantida na troca.

## Estrutura

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Página principal em PT-BR |
| `en/index.html` | Versão em inglês, com as mesmas seções |
| `styles.css` | Cores, tipografia, espaçamento e layouts responsivos |
| `script.js` | Menu acessível, seção ativa, animações discretas e controle do GIF |
| `favicon.svg` | Monograma RA da aba do navegador |
| `assets/` | GIF de quatro imagens, alternativa estática e origem do material |
| `wrangler.jsonc` | Configuração do Cloudflare Workers e pasta de publicação |
| `scripts/build.mjs` | Prepara somente os sete arquivos públicos em `dist/` |
| `docs/REVIEW.md` | Diagnóstico do original, decisões e próxima etapa |

Sem frameworks, dependências de execução, fontes remotas ou compilação de código. A preparação para publicação apenas copia os arquivos públicos. A página funciona sem JavaScript; nesse caso, a navegação permanece expandida e a observação astronômica aparece como imagem estática. A abertura e a capa do No Balcão são ilustrações vetoriais/CSS decorativas. O card Caça-Asteroides usa um recorte de vídeo fornecido pelo proprietário, rotulado como exemplo de observação; detalhes em `assets/README.md`.

## Executar localmente

Use um servidor local na raiz do repositório, pois as duas páginas compartilham arquivos por caminhos absolutos a partir da raiz:

```bash
python3 -m http.server 8000
```

Acesse `http://localhost:8000/` ou `http://localhost:8000/en/`.

## Publicação no domínio existente

A integração do GitHub está vinculada ao **Cloudflare Workers Builds**, no Worker `renatodeandrade-com`. O erro de publicação ocorria porque faltava a configuração de entrada/arquivos estáticos do Wrangler.

`wrangler.jsonc` declara `assets.directory: "./dist"` e executa `node scripts/build.mjs` automaticamente antes do upload. O script inclui os dois HTMLs, o CSS, o JavaScript, o favicon, o GIF e sua imagem estática. Documentação e configurações não entram na pasta pública. Não é necessário criar um servidor JavaScript para este site.

Configuração da integração existente:

- Diretório raiz: raiz do repositório.
- Branch de produção: `main`.
- Comando de build do painel: pode permanecer vazio; o Wrangler executa o preparo configurado.
- Deploy de produção: `npx wrangler deploy`.
- Upload de branches de revisão: `npx wrangler versions upload`.

Validação local, com Node.js instalado:

```bash
node --check script.js
node scripts/build.mjs
npx wrangler deploy --dry-run
```

O último comando valida a publicação sem enviá-la à conta. A publicação real acontece pela integração do Cloudflare após o merge na `main`. Rotas e domínio permanecem administrados na configuração existente do Cloudflare.

## Manutenção

- Atualize conteúdo, ferramentas e projetos nos dois HTMLs; preserve os mesmos `id` nas duas versões para manter as âncoras e a troca de idioma.
- Cada página tem `lang`, título, descrição, canonical, Open Graph e alternativas `hreflang` próprios. A raiz é sempre PT-BR, sem redirecionamento automático baseado no navegador.
- Altere os tokens em `:root` no início de `styles.css` para ajustar a identidade visual.
- O menu usa o breakpoint de `960px` no CSS e no JavaScript; mantenha os dois sincronizados. O conteúdo passa a uma coluna em `760px`.
- As habilidades são apresentadas como ferramentas em desenvolvimento, sem porcentagens de proficiência.
- O e-mail público é `contato@renatodeandrade.com`. O currículo pessoal não é publicado junto da página.
- O No Balcão tem link para a demonstração. Inclua um link para código apenas quando houver uma versão pública destinada a visitantes.
- Os dois cards “Em breve” / “Coming soon” ficam intencionalmente vazios e não são links. Substitua-os quando houver projetos prontos.
- O GIF tem botão Reproduzir/Pausar ou Play/Pause, toca apenas quando visível e respeita `prefers-reduced-motion`. Textos e rótulos acessíveis vêm dos atributos `data-*` do botão em cada HTML. A escolha de pausa permanece ao sair e voltar ao card; sem JavaScript, há apenas a imagem estática.
- As entradas de seção acontecem uma vez. A reação ao ponteiro se limita à arte do topo; não altera a rolagem.
- Ao adicionar novas imagens, inclua os caminhos na lista de `scripts/build.mjs`.

## Validação da versão bilíngue

- Sintaxe do JavaScript e do preparo de publicação verificada; build com os sete arquivos públicos; `wrangler deploy --dry-run` concluído.
- Idiomas, canonical, alternativas `hreflang`, IDs, âncoras e arquivos locais conferidos nos dois HTMLs.
- Troca PT → EN → PT conferida no navegador, incluindo preservação da seção selecionada.
- Layouts de 320, 390, 768 e 1024 pixels conferidos em frames, além do desktop; sem transbordamento horizontal. Menu móvel e fechamento ao selecionar seção conferidos.
- Troca de idioma sem JavaScript conferida em frame de 390 pixels, com navegação expandida.
- Controles do GIF e rótulos acessíveis conferidos em ambos os idiomas; ícones do LinkedIn e GitHub inspecionados visualmente.

## Verificações anteriores preservadas

- Sintaxe JavaScript verificada com `node --check script.js`.
- IDs, âncoras, arquivos locais, hierarquia principal e formato do e-mail verificados.
- Revisão visual em Chromium e layouts de 320, 390, 768 e 1024 pixels em frames de teste, além do desktop. Sem transbordamento horizontal nas larguras conferidas.
- Menu móvel, Enter, Escape, fechamento ao selecionar seção e transferência de foco conferidos.
- Navegação sem o script conferida em um frame de 390 pixels.
- Contraste das combinações principais de texto medido: mínimo de 4,62:1 entre as cinco combinações avaliadas. Não equivale a uma auditoria WCAG completa.
- Pausa/reprodução do GIF, inclusive com Enter, conferidas no navegador. Arquivo verificado: 280 × 280 px, quatro quadros de 350 ms, ciclo de 1,4 segundo.
- Caminho JavaScript de movimento reduzido conferido com preferência simulada em uma página de teste removida antes da publicação. A regra CSS correspondente foi inspecionada; não houve mudança na preferência global do navegador.

Os testes de layout em frames não substituem testes em dispositivos físicos. Disponibilidade dos sites externos, recebimento de e-mail e comportamento em Safari/Firefox não foram validados. Nenhuma mensagem de teste foi enviada.
