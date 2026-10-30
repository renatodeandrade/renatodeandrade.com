# Renato de Andrade — Portfolio

Portfólio profissional em inglês, conectando experiência farmacêutica, formação em Ciência de Dados e projetos práticos.

## Estrutura

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Conteúdo, navegação e estrutura semântica da página |
| `styles.css` | Cores, tipografia, espaçamento e layouts responsivos |
| `script.js` | Menu móvel acessível e ano do rodapé |
| `favicon.svg` | Marca simples da aba do navegador |
| `docs/REVIEW.md` | Diagnóstico do original, decisões e próxima etapa |

Sem frameworks, dependências, fontes remotas ou etapa de compilação. A página funciona sem JavaScript; nesse caso, a navegação permanece expandida. As ilustrações são vetoriais/CSS e decorativas, não capturas do jogo ou gráficos com resultados reais.

## Executar localmente

Abra `index.html` no navegador ou use um servidor local na raiz do repositório:

```bash
python3 -m http.server 8000
```

Acesse `http://localhost:8000`.

## Publicação no domínio existente

Os quatro arquivos da página ficam na raiz para preservar o fluxo estático atual. Esta alteração não exige trocar hospedagem, instalar pacotes ou configurar serviços. Revise o pull request e a prévia antes de incorporar a alteração à branch de produção. A configuração da integração do Cloudflare Pages não foi alterada ou inspecionada nesta entrega.

## Manutenção

- Edite conteúdo, ferramentas e projetos diretamente no HTML; preserve os `id` usados pelos links da navegação.
- Altere os tokens em `:root` no início de `styles.css` para ajustar a identidade visual.
- O menu usa o breakpoint de `760px` no CSS e no JavaScript; mantenha os dois sincronizados.
- As habilidades são apresentadas como ferramentas em desenvolvimento, sem porcentagens de proficiência.
- O e-mail público é `contato@renatodeandrade.com`. O currículo pessoal não é publicado junto da página.
- O No Balcão tem link para a demonstração. Inclua um link para código apenas quando houver uma versão pública destinada a visitantes.

## Validação desta versão

- Sintaxe JavaScript verificada com `node --check script.js`.
- IDs, âncoras, arquivos locais, hierarquia principal e formato do e-mail verificados.
- Revisão visual em Chromium e layouts de 320, 390, 768 e 1024 pixels em frames de teste, além do desktop de 1363 pixels.
- Menu móvel, Enter, Escape, fechamento ao selecionar seção e transferência de foco conferidos.
- Navegação sem o script conferida em um frame de 390 pixels.
- Contraste das combinações principais de texto medido: mínimo de 4,62:1 entre as cinco combinações avaliadas. Não equivale a uma auditoria WCAG completa.
- Movimento reduzido previsto no CSS. Sem dependência de animações para exibir conteúdo.

Os testes de layout em frames não substituem testes em dispositivos físicos. Disponibilidade dos sites externos, recebimento de e-mail e comportamento em Safari/Firefox não foram validados. Nenhuma mensagem de teste foi enviada.
