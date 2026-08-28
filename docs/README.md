# docs

Material interno de trabalho. Nada aqui é publicado no site.

## fotos-cliente/

As 21 fotos que a padaria enviou em 26/08/2026, renomeadas e sem metadados.
`fotos-cliente/LEIA-ME.md` classifica cada uma, registra o cardápio semanal
com preços que apareceu nas artes e explica por que as duas peças de
tabacaria ficaram fora do site.

## Sorvete a quilo e tabacaria

Em 28/08/2026 o cliente informou que **não vende mais sorvete a quilo**. A menção
saiu da confeitaria, das menções da seção "Quem somos" e do depoimento antigo,
que citava justamente isso.

Na mesma conversa pediu a tabacaria. Ela entrou como **menção neutra** na faixa
"Na loja também tem", sem imagem de produto, preço ou apelo de compra. A Lei
9.294/1996, com a redação da Lei 10.167/2000, proíbe propaganda de cigarro em
qualquer meio e só permite exposição no ponto de venda — uma seção própria com
foto de maço e chamada de venda seria propaganda. Vale confirmar com o contador
ou advogado da casa antes de ir além disso.

## Cardápio digital e /admin

O cardápio de mesa fica em `/cardapio` (QR Code nas mesas, sem link na home)
e é editado em `/admin`. Os dados ficam em `data/cardapio.json`.

Variáveis de ambiente (ver `.env.local.example`):

    ADMIN_PASSWORD=...   # senha do /admin
    ADMIN_SECRET=...     # assina o cookie de sessão; openssl rand -hex 32

### ATENÇÃO ANTES DE PUBLICAR

O `/admin` grava num arquivo no disco. **Isso não funciona na Vercel** nem em
nenhuma hospedagem serverless: o disco é somente leitura e efêmero. Ler o
cardápio funciona; salvar vai dar erro 500 com a explicação na tela.

Para produção é preciso trocar `gravar` em `src/lib/cardapio-digital.ts` por um
armazenamento de verdade — Vercel Blob é o caminho mais curto, e mantém o
formato JSON. O resto do código não muda: só aquelas duas funções.

## cardapio/

`cardapio-corrigido-para-comer.jpg` e `cardapio-corrigido-para-beber.jpg` —
fotos do cardápio de mesa com as **correções manuscritas de preço**, passadas
em 27/08/2026. **É a fonte válida**, mais recente que o PDF.

Nessa revisão as omeletes perderam o tamanho duplo (4 ovos): o bloco está
coberto com papel branco na foto. Sobrou só a versão de dois ovos.

`cardapio-rainha-da-massa.pdf` — cardápio oficial anterior, em PDF.
**Os preços dele estão desatualizados**; serve para a estrutura das seções. Duas páginas: *Para comer* (café da manhã, sanduíches,
omeletes, salgados) e *Para beber* (bebidas quentes e geladas).

Alimenta `src/lib/cardapio.ts`. **Os preços não vão para o site**, por decisão
do cliente — o site nomeia os itens e manda o cliente ao balcão ou ao iFood.

O rodapé das duas páginas traz **Rua Washington Luiz, 1.255** — mais uma fonte
oficial contra o endereço do Google. Ver a pendência de endereço acima.

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
- ~~Qual endereço vale~~ — **RESOLVIDO em 28/08/2026**: o cliente confirmou
  **Rua Washington Luiz, 1.255 · CEP 25655-007**. O site usa esse endereço. As
  coordenadas do mapa continuam sendo as do pino do Google, que fica na esquina
  com a Saldanha Marinho — se o pino estiver errado, só reivindicar o perfil
  corrige.
- **Os preços do almoço.** O cardápio que o cliente passou em 27/08/2026 já
  está publicado em `src/lib/almoco.ts`, mas sem valores. As artes traziam
  R$ 27 no prato do dia e R$ 35 na feijoada, de data incerta. Preço é o que
  mais converte numa busca por almoço — vale confirmar e publicar.
- **O cardápio da confeitaria** (`src/lib/cardapio.ts`). Ainda vem das fotos e
  das avaliações — o PDF oficial cobre só a lanchonete, não a confeitaria.
  O café da manhã já foi corrigido pelo cardápio real.
- **As respostas do FAQ** (`src/lib/perguntas.ts`), principalmente
  estacionamento e acessibilidade — vieram do Restaurant Guru e de uma
  avaliação, não da padaria.
- ~~A citação da avaliação~~ — **RESOLVIDO**: o cliente enviou capturas de três
  avaliações públicas de 5 estrelas (Bre Mi, Nathalia Karl, Renata Kally). Estão
  em `src/lib/depoimentos.ts`, transcritas literalmente, num carrossel.
- **O link da loja no iFood.** Hoje o iFood é citado em texto, sem link.
- Se a quinta-feira é mesmo strogonoff "de frango ou carne, depende da
  semana". Se houver um padrão, o site pode mostrar o certo.
- O cardápio de verdade — a lista de itens no site saiu das avaliações de
  clientes, não de um cardápio oficial.
- A história da casa. Não há nada público além da abertura do CNPJ em 2004.
  Atenção: a matéria sobre uma padaria de Petrópolis fundada em 1968 por Odyr
  Carneiro é de **outra empresa** (Massas Carneiro, Estrada da Saudade).
