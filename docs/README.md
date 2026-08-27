# docs

Material interno de trabalho. Nada aqui é publicado no site.

## fotos-cliente/

As 21 fotos que a padaria enviou em 26/08/2026, renomeadas e sem metadados.
`fotos-cliente/LEIA-ME.md` classifica cada uma, registra o cardápio semanal
com preços que apareceu nas artes e explica por que as duas peças de
tabacaria ficaram fora do site.

## diagnostico-presenca-digital.html

Diagnóstico da presença digital da padaria, levantado em 27/08/2026 a partir de
fontes públicas — Google Maps e Busca Google, Instagram `@rainha_da_massa_`,
Restaurant Guru, OpenStreetMap e registros de CNPJ. **Nada foi confirmado com o
cliente além do endereço.**

Abrir direto no navegador (é um arquivo único, sem dependências):

    open docs/diagnostico-presenca-digital.html

Também publicado como Artifact, para compartilhar por link:
<https://claude.ai/code/artifact/a9784008-b2de-4fca-a97a-8f935f159ee4>

### O que precisa ser confirmado com o cliente

- Horário real de fechamento — o Google diz 21h, a bio do Instagram diz 22h.
- Se R. Saldanha Marinho, 7 e Rua Washington Luiz, 1255 são o mesmo ponto.
  As ruas se cruzam onde fica a padaria, então provavelmente sim.
- Se já existe WhatsApp e só não está divulgado.
- **Qual endereço vale.** As artes da própria padaria trazem Rua Washington
  Luiz, 1.255 no rodapé, e não Saldanha Marinho, 7. Ver `fotos-cliente/LEIA-ME.md`.
- **Os preços do almoço.** O cardápio que o cliente passou em 27/08/2026 já
  está publicado em `src/lib/almoco.ts`, mas sem valores. As artes traziam
  R$ 27 no prato do dia e R$ 35 na feijoada, de data incerta. Preço é o que
  mais converte numa busca por almoço — vale confirmar e publicar.
- **O cardápio do café da manhã e da confeitaria** (`src/lib/cardapio.ts`).
  Montei a partir das fotos, dos posts e das avaliações. Perguntar o que mais
  sai de manhã que não está lá.
- **As respostas do FAQ** (`src/lib/perguntas.ts`), principalmente
  estacionamento e acessibilidade — vieram do Restaurant Guru e de uma
  avaliação, não da padaria.
- **A citação da avaliação** em `src/lib/depoimentos.ts`. O certo é o cliente
  reivindicar o perfil do Google e autorizar, ou coletar depoimentos próprios.
- **O link da loja no iFood.** Hoje o iFood é citado em texto, sem link.
- Se a quinta-feira é mesmo strogonoff "de frango ou carne, depende da
  semana". Se houver um padrão, o site pode mostrar o certo.
- O cardápio de verdade — a lista de itens no site saiu das avaliações de
  clientes, não de um cardápio oficial.
- A história da casa. Não há nada público além da abertura do CNPJ em 2004.
  Atenção: a matéria sobre uma padaria de Petrópolis fundada em 1968 por Odyr
  Carneiro é de **outra empresa** (Massas Carneiro, Estrada da Saudade).
