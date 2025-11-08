export interface Playlist {
  id: string;
  title: string;
  url: string;
  description: string;
}

export const playlists: Playlist[] = [
  {
    id: "flow-state",
    title: "Flow State Music [8D AUDIO]",
    url: "https://www.youtube.com/watch?v=k39oVsZqyDQ",
    description: "Binaural Theta Waves para concentração profunda"
  },
  {
    id: "hipermente",
    title: "Música Hipermente",
    url: "https://www.youtube.com/watch?v=4MFOBeUCPkw",
    description: "Lista de produtividade ilimitada"
  },
  {
    id: "relaxamento",
    title: "Estado de Relaxamento",
    url: "https://www.youtube.com/watch?v=-Td_HLFDOdU&list=PLMI0S_5CL3WlSOg0HIRGWsqfwKl1g1NeJ",
    description: "Música para relaxar, encontre a calma"
  },
  {
    id: "produtividade",
    title: "Música para Produtividade",
    url: "https://www.youtube.com/watch?v=K1ktwpr38sY",
    description: "Foco no trabalho"
  }
];

export interface FlowRitualStep {
  number: number;
  title: string;
  duration: number; // in seconds
  description: string;
  instructions?: string[];
}

export const flowRitual: FlowRitualStep[] = [
  {
    number: 1,
    title: "Prepare o ambiente",
    duration: 60,
    description: "Crie um espaço livre de distrações para sua imersão",
    instructions: [
      'Avise: "Agora é meu momento, não quero ser interrompido."',
      "Feche notificações, desligue o celular ou coloque no modo foco.",
      "Ajuste a luz — prefira uma iluminação suave."
    ]
  },
  {
    number: 2,
    title: "Conecte com o corpo",
    duration: 60,
    description: "Relaxe e prepare sua mente através da respiração consciente",
    instructions: [
      "Sente-se confortável, com os pés firmes no chão.",
      "Inspire profundamente pelo nariz por 4 segundos, segure por 2 e solte devagar por 6.",
      "Repita três vezes, sentindo o corpo relaxar."
    ]
  },
  {
    number: 3,
    title: "Escolha sua trilha",
    duration: 30,
    description: "Selecione a música que te ancorará no presente",
    instructions: [
      "Coloque uma playlist instrumental ou sons que te ancoram no presente.",
      "Deixe o som preencher o ambiente, mas sem roubar sua atenção."
    ]
  },
  {
    number: 4,
    title: "Centralize o foco",
    duration: 90,
    description: "Visualize seu estado de flow",
    instructions: [
      'Feche os olhos e pergunte mentalmente: "O que eu quero criar / resolver / entregar agora?"',
      "Visualize você fluindo — ideias vindo com facilidade, tudo se encaixando.",
      "Sinta a leveza de estar 100% presente."
    ]
  },
  {
    number: 5,
    title: "Ancore o estado",
    duration: 60,
    description: "Crie um gatilho físico para entrar em flow",
    instructions: [
      "Escolha um pequeno gesto (como tocar o peito ou juntar as mãos).",
      'Diga mentalmente: "Estou em flow."',
      "Abra os olhos. Comece a agir sem pensar em resultado, apenas na próxima ação."
    ]
  }
];

export interface DayContent {
  number: number;
  title: string;
  emoji: string;
  subtitle: string;
  journey: {
    from: string;
    where: string;
    to: string;
  };
  questions: string[];
  pda: {
    perception: string;
    decision: string;
    action: string;
  };
}

export const frustrationProtocol: DayContent[] = [
  {
    number: 1,
    title: "O RECONHECIMENTO",
    emoji: "🔴",
    subtitle: "Encarando a Roda de Frente",
    journey: {
      from: "Quantas vezes você já entrou nessa roda? Quando começou?",
      where: "Em qual estágio da roda você está AGORA? (Empolgação falsa? Frustração ativa? Revolta? Sonho congelado?)",
      to: "Se continuar nesse padrão, onde você estará daqui a 1 ano?"
    },
    questions: [
      "Olhando para suas últimas 3 tentativas no digital, qual foi o PADRÃO que se repetiu? (Não foque no que deu errado, mas no SEU padrão de comportamento em cada etapa)",
      "Em qual momento exato você percebe que a empolgação inicial começa a virar frustração? É quando aparecem as primeiras dificuldades técnicas? Quando não vê resultado imediato? Quando compara seu início com o sucesso dos outros?",
      "Quando você entra na fase de REVOLTA, contra quem ou o quê você está verdadeiramente revoltado? Contra o mercado? Contra você mesmo? Contra quem prometeu que seria fácil? Contra sua própria incapacidade de persistir?",
      "Por quanto tempo, em média, seu \"sonho fica de molho\" antes de você se empolgar com a próxima oportunidade? Dias? Semanas? Meses? E o que REATIVA essa empolgação - é algo interno ou sempre um gatilho externo (novo curso, nova promessa)?",
      "Se você pudesse voltar no tempo e dar UM ÚNICO CONSELHO para o \"você\" do início da primeira tentativa, qual seria? (E por que você não está seguindo esse conselho AGORA?)",
      "Qual é o CUSTO REAL de continuar nessa roda? Não apenas financeiro, mas emocional, de tempo, de relacionamentos, de auto-estima, de oportunidades perdidas?",
      "Complete: \"Eu continuo girando nessa roda porque secretamente acredito que...\" (Esta é a crença mais perigosa - aquela que você não admite nem para si mesmo)"
    ],
    pda: {
      perception: "Eu percebi que meu padrão é _____________ e isso me mantém preso porque _____________. O ponto onde sempre trava é _____________ e a verdadeira razão é _____________.",
      decision: "Decido que NÃO VOU MAIS _____________ (comportamento específico da roda). Em vez disso, quando sentir _____________ (gatilho), vou _____________.",
      action: "Escreva em um papel e cole no espelho: \"Eu reconheço meu padrão e escolho quebrá-lo. Hoje, eu _____________ (uma ação diferente do padrão).\" Exemplo: \"Hoje, quando sentir vontade de desistir da tarefa difícil e procurar um novo 'método mágico', vou fazer UMA ação concreta no projeto atual, por menor que seja.\""
    }
  },
  {
    number: 2,
    title: "O PONTO DE VIRADA",
    emoji: "🟡",
    subtitle: "Identificando o Gatilho da Frustração",
    journey: {
      from: "Suas tentativas anteriores sempre começaram com empolgação. O que DISPAROU a transição para frustração?",
      where: "Você consegue sentir quando a frustração está se aproximando ANTES dela chegar?",
      to: "Como seria se você pudesse ANTECIPAR e NEUTRALIZAR a frustração?"
    },
    questions: [
      "Descreva em DETALHES a última vez que você passou de empolgado para frustrado. Qual foi a situação exata? Que horas eram? O que você estava tentando fazer? Qual foi o pensamento específico que mudou tudo?",
      "A frustração aparece quando você se compara com outros, quando enfrenta dificuldades técnicas, ou quando não vê resultados imediatos? Seja específico. Qual é o seu gatilho PRIMÁRIO?",
      "Qual foi a PRIMEIRA emoção que apareceu antes da frustração se instalar? Ansiedade? Medo de fracassar? Vergonha? Raiva?",
      "Você tem um discurso interno específico quando a frustração chega? Tipo: \"Eu sabia que não ia dar certo\", \"Todo mundo consegue menos eu\", \"Isso é difícil demais para mim\". Qual é a sua frase-gatilho?",
      "O que você FAZ fisicamente quando a frustração chega? Fecha o computador? Deita? Pega o celular? Vai comer algo? Come identifica esse movimento automatizado?",
      "Se a frustração fosse uma pessoa ao seu lado sussurrando coisas, o que ela estaria dizendo? Escreva o diálogo completo.",
      "Qual seria o OPOSTO da sua reação automática à frustração? Se você normalmente desiste, o oposto seria persistir. Se você foge, seria enfrentar. Descreva o oposto completo do seu padrão."
    ],
    pda: {
      perception: "Meu gatilho primário de frustração é _____________. Eu percebo que ele aparece quando _____________. A emoção que vem ANTES da frustração é _____________.",
      decision: "Quando sentir _____________ (emoção ou situação gatilho), em vez de _____________ (reação automática), vou fazer _____________ (ação específica e oposta).",
      action: "Crie um \"Plano Anti-Frustração\" de emergência: Liste 3 ações FÍSICAS que você pode fazer nos primeiros 30 segundos de frustração (Ex: respirar 3 vezes, sair da cadeira, beber água, escrever \"Isso é temporário\"). Guarde esse plano no celular ou na frente do computador."
    }
  },
  {
    number: 3,
    title: "A REVOLTA INTERIOR",
    emoji: "🔥",
    subtitle: "Transformando Raiva em Combustível",
    journey: {
      from: "A frustração se transformou em revolta. Você está com raiva, mas de quem ou do quê?",
      where: "Essa raiva está te paralisando ou poderia te impulsionar?",
      to: "E se você pudesse usar essa energia explosiva a seu favor?"
    },
    questions: [
      "Quando você está revoltado, qual é a narrativa que domina sua mente? \"O mercado é injusto\", \"As pessoas só querem vender curso\", \"Nada funciona de verdade\"? Escreva todas as suas revoltas sem filtro.",
      "Essa revolta tem alguma base real ou é só uma forma de proteger seu ego da sensação de ter falhado? Seja brutalmente honesto.",
      "Se você pudesse gritar a revolta para o mundo sem consequências, o que você gritaria? (Pode ser palavrão, pode ser tudo. Ninguém está julgando.)",
      "A revolta é contra algo EXTERNO ou contra VOCÊ MESMO? Quanto % é para fora e quanto % é raiva de si?",
      "Quando você está revoltado, qual é a sua ação destrutiva preferida? Deletar tudo? Queimar pontes? Falar mal nas redes? Gastar dinheiro? Identificar é o primeiro passo para desarmar.",
      "Você já usou essa raiva de forma produtiva alguma vez? Lembra de algum momento em que você canalizou a revolta para criar algo, lutar por algo, provar algo? Conte essa história.",
      "O que a sua revolta está PROTEGENDO? Normalmente, a raiva protege algo frágil por baixo - medo, tristeza, vergonha. Cave fundo. O que tem embaixo?"
    ],
    pda: {
      perception: "Eu percebi que minha revolta é _____________ % contra o externo e _____________ % contra mim mesmo. O que ela está protegendo é _____________.",
      decision: "Decido que, em vez de deixar a revolta me destruir, vou usá-la para _____________. Toda vez que sentir raiva, vou canalizá-la em ação: _____________.",
      action: "Escreva uma \"Carta de Revolta\": Coloque TUDO no papel - todos os palavrões, toda a raiva, todo o ressentimento. Depois, queime ou rasgue. Literalmente. Essa é a purga simbólica. Depois disso, escreva uma SEGUNDA carta: \"O que eu realmente quero provar?\""
    }
  },
  {
    number: 4,
    title: "O SONHO CONGELADO",
    emoji: "❄️",
    subtitle: "Por Que Você Desiste de Desistir?",
    journey: {
      from: "Você colocou o sonho de molho. Disse que ia esquecer. Mas não esqueceu.",
      where: "O sonho está congelado, mas não morto. Por que ele ainda te persegue?",
      to: "E se o problema não for o sonho, mas a forma como você está tentando realizá-lo?"
    },
    questions: [
      "Seja sincero: quantas vezes você disse \"Vou desistir de vez\" e não desistiu? Por que esse sonho não morre?",
      "O que você faz no período em que o sonho está \"de molho\"? Como você preenche o vazio? Com que você se distrai?",
      "Se você realmente pudesse MATAR o sonho de uma vez por todas, mataria? Ou há uma parte de você que sabe que vai voltar?",
      "Qual é a diferença entre o sonho REAL que você tem e a VERSÃO FANTASIADA que o mercado vendeu para você? Onde está a distorção?",
      "Se ninguém nunca mais pudesse te vender um curso, um método, uma promessa de resultado rápido - você ainda tentaria? Como você tentaria?",
      "Complete: \"O que eu realmente quero não é _____________ (resultado fantasioso). O que eu realmente quero é _____________ (verdade profunda).\"",
      "Se você fosse ensinar alguém que está começando hoje, o que você diria sobre a diferença entre tentar e CONSTRUIR?"
    ],
    pda: {
      perception: "Eu percebi que meu sonho não morre porque _____________. A distorção entre o real e o fantasioso está em _____________. O que eu realmente quero é _____________.",
      decision: "Decido parar de perseguir _____________ (versão fantasiosa) e começar a construir _____________ (versão real, tangível, factível).",
      action: "Reescreva seu objetivo de forma CONCRETA e SEM FANTASIAS. Tire tudo que for: \"vou ganhar X\", \"vou ser famoso\", \"vou viver de\". Reescreva como: \"Vou criar X\", \"Vou aprender Y\", \"Vou fazer Z durante 90 dias\". O objetivo deve ser 100% sobre AÇÃO, 0% sobre resultado."
    }
  },
  {
    number: 5,
    title: "O CICLO EXPOSTO",
    emoji: "🔄",
    subtitle: "Vendo a Roda por Completo",
    journey: {
      from: "Você viveu Empolgação → Frustração → Revolta → Sonho de Molho. Repita. Repita. Repita.",
      where: "Agora você vê o ciclo completo. Você sabe como ele funciona. Isso muda tudo.",
      to: "A consciência é o primeiro passo para a liberdade. Como você vai sair da roda?"
    },
    questions: [
      "Agora que você vê a roda completa, em qual ponto você percebe que poderia ter SAÍDO em vez de continuar girando?",
      "Quem ou o que MANTÉM você na roda? É confortável estar preso? Há algum benefício oculto em continuar falhando? (Atenção: sim, tem. E você precisa admitir.)",
      "Se você sair da roda e realmente CONSTRUIR algo, o que você vai perder? Conforto? Desculpas? A identidade de \"alguém que tenta mas nunca consegue\"?",
      "Você tem medo de sair da roda e falhar DE VERDADE? Tipo, falhar tentando de forma consistente, sem desculpas, sem atalhos? Porque se você REALMENTE tentar e não der certo, aí não dá para culpar a roda.",
      "Se você pudesse desenhar a sua vida FORA da roda, como seria? Descreva um dia comum, daqui a 6 meses, da versão de você que saiu.",
      "O que você precisa ABANDONAR de verdade para sair? Não é só comportamento. É crença, identidade, narrativa. O que você precisa matar?",
      "Última pergunta pesada: Você QUER sair da roda ou você só quer a SENSAÇÃO de estar tentando?"
    ],
    pda: {
      perception: "Eu percebi que o benefício oculto de ficar na roda é _____________. O que eu preciso abandonar para sair é _____________.",
      decision: "Decido sair da roda. Escolho construir em vez de tentar. Aceito que posso falhar de verdade, mas prefiro isso a continuar fingindo.",
      action: "Declare sua saída: Grave um áudio ou escreva uma mensagem para você mesmo (pode ser no WhatsApp, no notion, onde quiser): \"Hoje, [data], eu saio da roda da frustração. Não vou mais me empolgar com promessas. Não vou mais me revoltar quando travar. Vou CONSTRUIR. E se falhar, vou falhar construindo.\""
    }
  },
  {
    number: 6,
    title: "O PROTOCOLO DA AÇÃO",
    emoji: "⚡",
    subtitle: "Construindo o Sistema Anti-Roda",
    journey: {
      from: "Você decidiu sair. Agora precisa de um SISTEMA para não voltar.",
      where: "Não basta querer. Precisa ter estrutura, ritual, método. Sem isso, a roda te puxa de volta.",
      to: "Você vai criar seu próprio protocolo de ação consistente. Não mais tentativas. Construção."
    },
    questions: [
      "Qual é a MENOR ação diária que você pode fazer, todos os dias, que caminha na direção do seu objetivo real? (Tem que ser TÃO pequena que é impossível falhar. Ex: 15 min por dia, uma postagem, um contato, etc.)",
      "Como você vai MEDIR essa ação? Dias consecutivos? Checklist? Planilha? Precisa ser visível e tangível.",
      "Qual é o horário sagrado dessa ação? Onde ela vai acontecer? Com que música? Que ritual vai anteceder?",
      "O que você vai fazer quando SENTIR o primeiro sinal de frustração voltando? Qual é o seu gatilho de emergência para não voltar na roda?",
      "Quem vai te cobrar? Você precisa de accountability externa? Um amigo, um grupo, um mentor, alguém?",
      "Se você fizer essa ação consistente por 30 dias, o que vai ter CONSTRUÍDO ao final? Seja específico e realista.",
      "Como você vai comemorar os marcos? Dia 7, dia 15, dia 30. Precisa ter recompensa no caminho, senão o cérebro desiste."
    ],
    pda: {
      perception: "Eu percebi que preciso de um sistema porque _____________. Minha ação mínima diária é _____________ e vai acontecer às _____________ (horário).",
      decision: "Decido que por 30 dias vou fazer _____________ (ação diária específica) SEM EXCEÇÃO. Se eu falhar um dia, recomeço a contagem.",
      action: "Monte seu tracker: pode ser um papel na parede com 30 quadradinhos, pode ser um app, pode ser um X no calendário. TODO DIA, depois de fazer a ação, você marca. Se pular um dia, zera a contagem e recomeça do zero. Sem desculpas."
    }
  },
  {
    number: 7,
    title: "O RENASCIMENTO",
    emoji: "🔥",
    subtitle: "Declaração de Liberdade da Roda",
    journey: {
      from: "Você entrou nessa jornada preso no ciclo. Hoje você sai livre.",
      where: "Você sabe quem você ERA. Agora vai declarar quem você É.",
      to: "Essa não é só uma reflexão. É um compromisso inegociável consigo mesmo."
    },
    questions: [],
    pda: {
      perception: "",
      decision: "",
      action: ""
    }
  }
];

export const skillsProtocol: DayContent[] = [
  {
    number: 1,
    title: "DOWNLOAD DE CONHECIMENTO",
    emoji: "📥",
    subtitle: "O Inventário do Que Você Sabe",
    journey: {
      from: "Você tem habilidades que nem percebe. Estão invisíveis para você.",
      where: "Hoje você vai fazer o inventário completo. Tudo que você sabe fazer.",
      to: "Ao final, você verá que tem muito mais valor do que imagina."
    },
    questions: [
      "Quais são todas as coisas que você sabe fazer bem — mesmo as que parecem simples ou \"sem valor\"?",
      "Quais dessas atividades você sente prazer em realizar?",
      "Quais você realiza com facilidade, mesmo que outras pessoas considerem difíceis?",
      "O que as pessoas costumam elogiar em você ou pedir ajuda para fazer?"
    ],
    pda: {
      perception: "Eu percebi que tenho habilidades em _____________. As que me dão mais prazer são _____________.",
      decision: "Decido parar de desvalorizar o que sei fazer. Essas habilidades têm potencial real.",
      action: "Faça uma lista extensa. Nenhuma habilidade é pequena demais para estar nela. Anote TUDO."
    }
  },
  {
    number: 2,
    title: "O IMPACTO DAS SUAS HABILIDADES",
    emoji: "💎",
    subtitle: "O Que Isso Gera no Mundo",
    journey: {
      from: "Você tem as habilidades mapeadas. Mas qual o valor delas?",
      where: "Habilidade só vira valor quando resolve um problema real.",
      to: "Você vai conectar suas habilidades com impactos concretos."
    },
    questions: [
      "Para cada habilidade da sua lista, que impacto positivo ela pode gerar na vida de alguém?",
      "Que tipo de problema essa habilidade resolve?",
      "Esse problema é percebido com clareza pelas pessoas (alto nível de consciência) ou ainda é invisível para elas?",
      "Se alguém quisesse pagar por essa solução, quanto você acredita que pagaria?",
      "Quantas pessoas você imagina que têm esse mesmo problema?"
    ],
    pda: {
      perception: "Eu percebi que minhas habilidades resolvem _____________. O impacto principal é _____________.",
      decision: "Decido focar nas habilidades que geram o maior impacto: _____________.",
      action: "Relacione suas habilidades com o impacto e o potencial de valor percebido. Crie uma tabela simples."
    }
  },
  {
    number: 3,
    title: "A ORIGEM DO VALOR",
    emoji: "🎯",
    subtitle: "Ambição ou Segurança",
    journey: {
      from: "Impacto é bom, mas por que as pessoas compram?",
      where: "Elas compram para ganhar, economizar ou evitar perder recursos.",
      to: "Você vai posicionar suas habilidades na motivação certa."
    },
    questions: [
      "Essa habilidade ajuda as pessoas a ganhar recursos? (Ambição)",
      "Ela ajuda a economizar recursos? (Segurança e Ambição)",
      "Ou ela evita perder recursos? (Segurança)",
      "Em qual dessas três categorias cada habilidade se encaixa melhor?"
    ],
    pda: {
      perception: "Eu percebi que minhas habilidades principais se encaixam em _____________.",
      decision: "Decido posicionar minha oferta para pessoas que buscam _____________.",
      action: "Classifique cada habilidade em uma dessas três motivações. Isso define a lente de venda."
    }
  },
  {
    number: 4,
    title: "OS RECURSOS NECESSÁRIOS",
    emoji: "🛠️",
    subtitle: "O Preço do Jogo",
    journey: {
      from: "Você sabe o que oferece e para quem. Mas qual é o custo?",
      where: "Todo serviço demanda recursos: tempo, dinheiro, ferramentas, conhecimento.",
      to: "Você vai mapear o que precisa para colocar isso no mercado."
    },
    questions: [
      "Quais recursos (ferramentas, tempo, conhecimento técnico, dinheiro) são necessários para oferecer essa habilidade como serviço?",
      "Você já possui algum desses recursos? Quais precisa conquistar?",
      "Qual seria o custo — financeiro, de tempo ou emocional — para colocar isso no mercado?",
      "O quão disposto(a) você está a pagar esse preço?",
      "Quais habilidades demandam mais recursos e quais demandam menos?"
    ],
    pda: {
      perception: "Eu percebi que para começar preciso de _____________. O que já tenho é _____________.",
      decision: "Decido começar com as habilidades que demandam menos recursos: _____________.",
      action: "Faça um mapa visual de cada habilidade com seus custos e viabilidade."
    }
  },
  {
    number: 5,
    title: "CONSTRUINDO O SEU MVP",
    emoji: "🚀",
    subtitle: "Do Saber ao Fazer",
    journey: {
      from: "Você sabe o que pode oferecer e o que precisa para isso.",
      where: "Agora você vai criar um protótipo mínimo do seu serviço.",
      to: "Um MVP simples, testável e real. Sem perfeccionismo."
    },
    questions: [
      "Dentre todas as habilidades mapeadas, qual combina alto valor percebido e baixa exigência de recursos?",
      "Como você pode transformar essa habilidade em um serviço simples, direto e testável nos próximos dias?",
      "Que promessa clara esse serviço entrega?",
      "Que tipo de pessoa se beneficiaria mais desse serviço?"
    ],
    pda: {
      perception: "Eu percebi que a habilidade ideal para começar é _____________. Ela resolve _____________ e posso oferecer com _____________.",
      decision: "Decido criar meu MVP: _____________.",
      action: "Escreva uma mini proposta de valor (1 parágrafo) descrevendo seu serviço."
    }
  },
  {
    number: 6,
    title: "TESTE DE CAMPO",
    emoji: "🎪",
    subtitle: "O Primeiro Contato com o Mercado",
    journey: {
      from: "Você tem o MVP. Mas está só na sua cabeça.",
      where: "Agora você vai colocar à prova com pessoas reais.",
      to: "Sem teste, sem validação. É hora de oferecer."
    },
    questions: [
      "Quem são as pessoas na sua zona de influência (amigos, familiares, colegas, grupos) que poderiam se interessar por esse serviço?",
      "Como você pode oferecer esse serviço de forma simples, sem precisar de nada além do que já tem?",
      "Qual será sua mensagem de convite ou apresentação? (escreva uma versão curta)"
    ],
    pda: {
      perception: "Eu percebi que posso oferecer para _____________. Minha mensagem será _____________.",
      decision: "Decido oferecer meu MVP para pelo menos 3 pessoas. Vou fazer isso HOJE.",
      action: "Ofereça seu MVP para pelo menos 3 pessoas. Anote as reações e os resultados."
    }
  },
  {
    number: 7,
    title: "REFLEXÃO E MELHORIA",
    emoji: "🔬",
    subtitle: "De Tentativa a Aprendizado",
    journey: {
      from: "Você ofereceu seu serviço. Teve reações, resultados, feedbacks.",
      where: "Agora você vai extrair lições e ajustar o caminho.",
      to: "Esse é o ciclo de construção real: testar, aprender, melhorar."
    },
    questions: [
      "O que você aprendeu ao colocar seu serviço no mundo?",
      "Que partes da sua oferta funcionaram bem?",
      "O que gerou dúvida, resistência ou desinteresse?",
      "Se você fosse refazer, o que mudaria na forma de apresentar ou entregar?",
      "Qual foi a objeção mais comum que apareceu?",
      "Você percebeu alguma necessidade ou dor que não tinha mapeado antes?",
      "Com base no teste, qual é a próxima versão do seu serviço? O que você vai manter, tirar ou adicionar?"
    ],
    pda: {
      perception: "Eu percebi que _____________. O feedback mais importante foi _____________.",
      decision: "Decido melhorar _____________ e testar novamente com _____________.",
      action: "Escreva a versão 2.0 do seu serviço com base nos aprendizados. Liste as 3 melhorias principais que você vai implementar."
    }
  }
];
