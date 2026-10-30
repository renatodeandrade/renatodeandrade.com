# Renato de Andrade — Portfolio

Portfólio profissional em inglês, conectando experiência farmacêutica, formação em Ciência de Dados e projetos práticos.

## Estrutura

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Conteúdo, navegação e estrutura semântica da página |
| `styles.css` | Cores, tipografia, espaçamento e layouts responsivos |
| `script.js` | Menu acessível, seção ativa, animações discretas e controle do GIF |
| `favicon.svg` | Monograma RA da aba do navegador |
| `assets/` | GIF de quatro imagens, alternativa estática e origem do material |
| `wrangler.jsonc` | Configuração do Cloudflare Workers e pasta de publicação |
| `scripts/build.mjs` | Prepara somente os seis arquivos públicos em `dist/` |
| `docs/REVIEW.md` | Diagnóstico do original, decisões e próxima etapa |

Sem frameworks, dependências de execução, fontes remotas ou compilação de código. A preparação para publicação apenas copia os arquivos públicos. A página funciona sem JavaScript; nesse caso, a navegação permanece expandida e a observação astronômica aparece como imagem estática. A abertura e a capa do No Balcão são ilustrações vetoriais/CSS decorativas. O card Caça-Asteroides usa um recorte de vídeo fornecido pelo proprietário, rotulado como exemplo de observação; detalhes em `assets/README.md`.

## Executar localmente

Abra `index.html` no navegador ou use um servidor local na raiz do repositório:

```bash
python3 -m http.server 8000
```

Acesse `http://localhost:8000`.

## Publicação no domínio existente

A integração do GitHub está vinculada ao **Cloudflare Workers Builds**, no Worker `renatodeandrade-com`. O erro de publicação ocorria porque faltava a configuração de entrada/arquivos estáticos do Wrangler.

`wrangler.jsonc` declara `assets.directory: "./dist"` e executa `node scripts/build.mjs` automaticamente antes do upload. O script inclui o HTML, o CSS, o JavaScript, o favicon, o GIF e sua imagem estática. Documentação e configurações não entram na pasta pública. Não é necessário criar um servidor JavaScript para este site.

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

- Edite conteúdo, ferramentas e projetos diretamente no HTML; preserve os `id` usados pelos links da navegação.
- Altere os tokens em `:root` no início de `styles.css` para ajustar a identidade visual.
- O menu usa o breakpoint de `760px` no CSS e no JavaScript; mantenha os dois sincronizados.
- As habilidades são apresentadas como ferramentas em desenvolvimento, sem porcentagens de proficiência.
- O e-mail público é `contato@renatodeandrade.com`. O currículo pessoal não é publicado junto da página.
- O No Balcão tem link para a demonstração. Inclua um link para código apenas quando houver uma versão pública destinada a visitantes.
- Os dois cards “Coming soon” ficam intencionalmente vazios e não são links. Substitua-os quando houver projetos prontos.
- O GIF tem botão Play/Pause, toca apenas quando visível e respeita `prefers-reduced-motion`. A escolha de pausa permanece ao sair e voltar ao card; sem JavaScript, há apenas a imagem estática.
- As entradas de seção acontecem uma vez. A reação ao ponteiro se limita à arte do topo; não altera a rolagem.
- Ao adicionar novas imagens, inclua os caminhos na lista de `scripts/build.mjs`.

## Validação desta versão

- Sintaxe JavaScript verificada com `node --check script.js`.
- IDs, âncoras, arquivos locais, hierarquia principal e formato do e-mail verificados.
- Revisão visual em Chromium e layouts de 320, 390, 768 e 1024 pixels em frames de teste, além do desktop. Sem transbordamento horizontal nas larguras conferidas.
- Menu móvel, Enter, Escape, fechamento ao selecionar seção e transferência de foco conferidos.
- Navegação sem o script conferida em um frame de 390 pixels.
- Contraste das combinações principais de texto medido: mínimo de 4,62:1 entre as cinco combinações avaliadas. Não equivale a uma auditoria WCAG completa.
- Pausa/reprodução do GIF, inclusive com Enter, conferidas no navegador. Arquivo verificado: 280 × 280 px, quatro quadros de 350 ms, ciclo de 1,4 segundo.
- Caminho JavaScript de movimento reduzido conferido com preferência simulada em uma página de teste removida antes da publicação. A regra CSS correspondente foi inspecionada; não houve mudança na preferência global do navegador.

Os testes de layout em frames não substituem testes em dispositivos físicos. Disponibilidade dos sites externos, recebimento de e-mail e comportamento em Safari/Firefox não foram validados. Nenhuma mensagem de teste foi enviada.
