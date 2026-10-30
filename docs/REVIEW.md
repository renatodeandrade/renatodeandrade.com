# Revisão do portfólio — 30/10/2026

## Segunda revisão do Site

A revisão solicitada após a primeira versão substitui “r.” por um monograma RA, remove setas diagonais decorativas e uniformiza os ícones de menu, localização, conferência e retorno ao topo. A paleta foi preservada. O diagrama de Venn deu lugar a dois blocos de saúde e dados conectados por linhas.

Foram acrescentados dois cards vazios “Coming soon”, entrada discreta de seções, indicação da seção ativa e reação leve da arte ao ponteiro. O card Caça-Asteroides passou a mostrar quatro quadros de um vídeo fornecido, em GIF recortado com pausa e alternativa estática; a seleção e a conversão estão registradas em `assets/README.md`.

Após aprovação no Site privado, esta revisão foi incorporada ao pull request do repositório. A falha `Workers Builds: renatodeandrade-com` foi tratada adicionando `wrangler.jsonc` e a preparação de `dist/`; o log indicava ausência da entrada/diretório de arquivos estáticos. O restante deste documento registra o diagnóstico e o escopo da primeira versão.

## Estado analisado

Repositório: [renatodeandrade/renatodeandrade.com](https://github.com/renatodeandrade/renatodeandrade.com).

Base: commit [`eec281a`](https://github.com/renatodeandrade/renatodeandrade.com/commit/eec281abe58432ff60397d060fd424bc674d7c2a), de 05/09/2026, “Contact section update / LinkedIn link was broken”. A árvore desse commit contém somente `index.html` e `README.md`; não havia CSS, JavaScript ou instruções `AGENTS.md`.

O HTML original tem 59 linhas e 1.532 bytes no repositório. Já acerta no idioma `en`, em UTF-8, na tag de viewport, em um único `h1` e nas seções Home, About, Skills, Projects e Contact. Os cinco links internos apontam para IDs existentes. A apresentação conecta Farmácia a dados, e o contato oferece GitHub, LinkedIn e e-mail.

## Problemas concretos e resposta implementada

| Evidência no original | Efeito para o visitante | Alteração |
| --- | --- | --- |
| Nenhuma folha de estilos ou estilo interno | Fonte, espaçamento e links com padrões do navegador; ausência de composição visual | CSS separado com paleta, tipografia, largura de leitura, espaçamento, contraste e layout responsivo |
| `Projects coming soon.` | A principal seção não demonstra nenhum trabalho | No Balcão com contexto, contribuição, ferramentas e demonstração; Caça-Asteroides com descrição factual da participação |
| Hero sem chamada para ação | O visitante precisa decidir sozinho o próximo passo | Botões para projetos e contato, além de posicionamento profissional explícito |
| `<title>Renato de Andrade da Silva</title>`, sem descrição | Título pouco informativo e sem resumo para resultados de busca | Nome público “Renato de Andrade”, área de atuação, description, metadados Open Graph básicos e favicon |
| `href="mailto: contato@renatodeandrade.com"` | Espaço indevido torna a URI não canônica e pode afetar clientes de e-mail | `mailto:contato@renatodeandrade.com`, com endereço legível |
| Seções diretamente no `body`, sem `main`, cabeçalho ou rodapé | Menos marcos semânticos para navegação assistiva | `header`, navegação rotulada, `main`, seções nomeadas, `footer` e link de pular conteúdo |
| Ferramentas em listas, sem contexto de aprendizado | Pode sugerir domínio uniforme de todas as competências | “A growing toolbox”, categorias e texto explícito sobre desenvolvimento por estudos/projetos; HTML retirado da lista de competências |
| Formação e experiência ausentes | A transição de carreira tem pouco contexto verificável | Trajetória curta: Farmácia, RD Saúde, Ciência de Dados e No Balcão |
| README com apenas duas linhas | Falta orientação para editar, executar e validar | Instruções de manutenção, execução e limites dos testes |

O LinkedIn original já está correto e foi preservado. A meta viewport original também estava correta; não se atribui a ela um problema que não existia.

## Direção visual e referências

As referências orientam a estrutura, sem reutilização de seus códigos ou estilos:

- [Soroush Taheri](https://soroush-thr.github.io/): posicionamento profissional explícito, apresentação imediata de área e próximos passos. A página pública foi lida em 30/10/2026.
- [Lokeshwari](https://lokeshwari249.github.io/personal-portfolio/): navegação simples, ferramentas visíveis e sequência fácil de percorrer. A página pública foi lida em 30/10/2026.
- [Purav Dhanki](https://puravdhanki.github.io/Purav-Portfolio/): trajetória em timeline e organização de projetos. A página publicada não foi acessível pelo mecanismo de pesquisa desta sessão; foram examinados o [HTML e o README do repositório](https://github.com/puravdhanki/Purav-Portfolio), que confirmam esses componentes.

A adaptação usa fundo claro, verde escuro, verde suave como apoio, títulos amplos e linhas discretas. A ilustração da abertura representa a conexão entre saúde e dados. Os desenhos dos projetos são capas gráficas, não imagens de descobertas científicas ou capturas da interface do jogo.

O inglês inicial e o nome público foram preservados. Bilinguismo, modo escuro e fundo interativo permanecem para uma etapa posterior, conforme as decisões anteriores do projeto.

## Conteúdo e cuidado editorial

A trajetória e a descrição dos projetos foram conferidas no currículo atualizado fornecido pelo proprietário. O conteúdo apresenta graduação em Ciência de Dados em andamento, experiência na RD Saúde até abril/2026 e participação no Caça-Asteroides. No Balcão é descrito como idealização e publicação com apoio de IA; não há afirmação de desenvolvimento integral sem assistência.

Não foram acrescentados indicadores inventados, níveis de domínio, descobertas de asteroides, depoimentos, experiência profissional em dados ou resultados não demonstrados. Contatos privados do currículo não foram incluídos. O domínio e a infraestrutura atuais não foram alterados. O link da demonstração foi preservado a partir dos materiais do proprietário; a disponibilidade da aplicação externa não pôde ser confirmada pelo mecanismo de pesquisa desta sessão.

## Próxima etapa implementável

**Prioridade 1 — transformar No Balcão em um estudo de caso curto.**

Criar `projects/no-balcao.html` com cinco blocos: problema observado, público e escopo, decisões do projeto, contribuição pessoal/uso de IA e resultado demonstrável. Acrescentar duas capturas reais do jogo e um link de retorno para a home. Reutilizar os tokens de `styles.css`; acrescentar à capa um link “Read case study”. Resultado demonstrável, neste momento, significa uma aplicação publicada e navegável; métricas de aprendizado ou adoção só entram após medição. Não apresentar regras regulatórias como orientação clínica atual sem revisão específica.

Aceite: página sem placeholders; capturas com texto alternativo; autoria e apoio de IA claros; demonstração funcionando; descrição compreensível em cerca de dois minutos.

**Prioridade 2 — um primeiro projeto diretamente ligado a dados.**

Construir uma análise pequena de uma pergunta concreta de saúde ou operações, com conjunto de dados público ou explicitamente sintético. Versionar pergunta, origem/licença, dicionário, limpeza, consultas ou notebook, dois ou três gráficos, interpretação e limitações. Acrescentar o projeto à home somente quando houver uma entrega reproduzível. A seleção do conjunto e a análise ainda não foram executadas.

Aceite: execução reproduzível a partir do README; resultados conferidos; ao menos uma conclusão e uma limitação fundamentadas; nenhum dado pessoal de pacientes ou empregadores.

**Depois:** preparar currículo público sem contatos privados e então adicionar seu download; adaptar conteúdo para pt-BR; avaliar modo escuro. Animações adicionais dependem de benefício claro para a leitura.

## Verificação e escopo da entrega

Verificações de sintaxe, arquivos, âncoras, contraste e navegação estão descritas no README. A prévia usa a mesma página estática proposta para o repositório. Os testes não incluem envio de e-mail, funcionamento interno do jogo, auditoria WCAG completa ou dispositivos físicos. A proposta fica em branch própria com pull request para revisão; não envolve merge automático nem alteração do domínio.
