"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Translation dictionary
const t = {
  es: {
    nav: {
      solucion: "Solución",
      modulos: "Módulos",
      proceso: "Proceso",
      contacto: "Contacto",
      verDemo: "Ver Demo"
    },
    hero: {
      badge: "No pierdas más ventas por falta de seguimiento",
      title1: "Centralizá tus consultas y multiplicá tus cierres.",
      title2: "Tu inmobiliaria bajo tu completo ",
      titleControl: "Control",
      subtitle: "No dejes que los interesados se enfríen o queden olvidados en un Excel o chat de WhatsApp. Te damos tu propio portal premium y un sistema inteligente que responde al instante y organiza a tu equipo de ventas.",
      demoBtn: "Ver Demo",
      contactBtn: "Agendar Consulta",
      testimonial: "“La solución definitiva para dueños de inmobiliarias que quieren automatizar su crecimiento y proteger cada oportunidad de negocio.”"
    },
    table: {
      badge: "Diferencia de Negocio",
      title: "¿Seguir perdiendo ventas o tomar el control de tu inmobiliaria?",
      subtitle: "Descubrí cómo cambia tu facturación cuando pasás de usar planillas sueltas a tener una plataforma que automatiza tu seguimiento.",
      headers: ["Característica", "Herramientas Aisladas", "Solución n-sistemas.com"],
      row1: ["Costos Mensuales", "✕ Licencias mensuales por cada vendedor que encarecen tu negocio", "✓ Inversión única por tu propio software, sin pagos de alquiler eterno"],
      row2: ["Implementación", "✕ Meses de configuración, problemas técnicos y pérdida de tiempo", "✓ Lanzamiento rápido gracias a nuestra base tecnológica pre-construida"]
    },
    modules: {
      badge: "Equipamiento comercial",
      title: "Todo lo que tu inmobiliaria necesita para vender más y automatizar el trabajo",
      subtitle: "Implementamos una suite de herramientas integradas y las adaptamos a tus necesidades específicas. Rapidez en la puesta en marcha con la flexibilidad de un desarrollo a medida.",
      item1: {
        title: "Portal Web Premium Propio",
        bullets: [
          "Dominio propio con SSL — tu URL corporativa exclusiva",
          "Branding completo: logo, paleta, tipografía de tu marca",
          "Fichas con galería HD, planos y ubicación satelital",
          "Botón de WhatsApp directo en cada propiedad"
        ]
      },
      item2: {
        title: "Integraciones con WhatsApp y Automatizaciones",
        bullets: [
          "Respuesta inmediata automática al recibir una consulta",
          "Reglas de asignación sin código fáciles de editar",
          "Georouting: deriva al asesor de la zona correcta",
          "Alertas automatizadas por e-mail y notificaciones push"
        ]
      },
      item3: {
        title: "Seguimiento y Control Comercial",
        bullets: [
          "Pipeline visual con columnas por estado del prospecto",
          "Drag & Drop para avanzar leads cómodamente",
          "Asignación automática o manual de asesores",
          "Roles de usuario configurables y descarga a CSV"
        ]
      },
      item4: {
        title: "Base de Datos 100% de tu Inmobiliaria",
        bullets: [
          "Resguardo seguro de contactos en tu propio servidor",
          "Los datos no se van con los asesores que se retiren",
          "Exportación de bases de datos completa y al instante",
          "Cifrado de datos sensibles de clientes e inversores"
        ]
      },
      item5: {
        title: "Planos y Loteos Interactivos",
        bullets: [
          "Trazado de parcelas interactivas sobre mapas reales",
          "Colores por estado: disponible, reservado, vendido",
          "Centroide y cálculo de superficie automático",
          "Interfaz táctil ideal para mostrar en tablets o móviles"
        ]
      },
      item6: {
        title: "Control de Contratos y Alquileres",
        bullets: [
          "Calendario compartido de visitas, firmas y entregas",
          "Administración del vencimiento de contratos de locación",
          "Alertas automáticas 30/60/90 días antes del vencimiento",
          "Soporte directo de mesa de ayuda con nuestro equipo"
        ]
      },
      item7: {
        title: "¿Tu inmobiliaria necesita algo específico?",
        desc: "Desarrollamos herramientas o reportes adicionales adaptados exclusivamente a tu manera de trabajar. Código a medida que es de tu propiedad, sin licencias mensuales eternas.",
        btn: "Consultar por un módulo personalizado"
      }
    },
    benefits: {
      badge: "Ventaja de Negocio",
      title: "Protegé tu inversión y multiplicá la rentabilidad de tu inmobiliaria",
      subtitle: "Nos enfocamos en resolver los problemas reales que te hacen perder dinero y clientes hoy en día:",
      b1: {
        title: "Respuesta inmediata para asegurar al cliente",
        desc: "Quien responde primero se lleva la venta. Nuestra plataforma envía un WhatsApp de bienvenida automático en segundos al interesado y alerta a tus vendedores para iniciar el seguimiento en minutos."
      },
      b2: {
        title: "Aumentá el valor percibido de tus proyectos",
        desc: "Tus desarrollos merecen una presentación premium. Los portales interactivos a medida y los mapas interactivos generan un impacto visual que acelera las decisiones de los inversores."
      },
      b3: {
        title: "Tu propio software, tu propia base de datos",
        desc: "Nunca más dependas de un software de terceros. Sos el dueño absoluto del código y de los datos. Sin licencias que aumentan a fin de mes ni riesgo de perder tus contactos."
      }
    },
    timeline: {
      badge: "Transición sin fricción",
      title: "Cómo implementamos tu nueva plataforma inmobiliaria",
      subtitle: "Te acompañamos en cada etapa para asegurar que tu equipo empiece a usar el sistema de inmediato y sin detener tus ventas.",
      s1: {
        title: "Diagnóstico Comercial",
        desc: "Analizamos tus flujos de venta, dónde se pierden los contactos actualmente y qué información es clave para que tus asesores cierren operaciones."
      },
      s2: {
        title: "Configuración e Imagen Corporativa",
        desc: "Desplegamos tu portal premium y panel de control, adaptándolo completamente con tus logotipos, colores corporativos y tipografías."
      },
      s3: {
        title: "Automatizaciones e Integraciones",
        desc: "Configuramos el motor de respuestas inmediatas de WhatsApp y las integraciones específicas que tu negocio requiera."
      },
      s4: {
        title: "Puesta en Marcha y Capacitación",
        desc: "Migramos tu cartera actual de clientes y propiedades, y entrenamos a tus asesores para garantizar una transición fluida."
      },
      s5: {
        title: "Servicio Posventa",
        desc: "Soporte técnico diario y adaptaciones continuas del sistema para darte tranquilidad y seguridad a largo plazo."
      }
    },
    cta: {
      title: "Tomá el control de tus clientes hoy mismo y asegurá cada oportunidad de venta",
      subtitle: "Hablemos sin compromiso. Analizaremos cómo está funcionando tu seguimiento actual y te mostraremos cómo una plataforma propia puede ayudarte a cerrar más negocios sin gastar de más."
    },
    form: {
      title: "¡Consulta recibida!",
      success: "Gracias por comunicarte con n-sistemas.com. Te contactaremos tan pronto como podamos.",
      contactTitle: "¿Querés ver cómo funciona para tu inmobiliaria?",
      contactSubtitle: "Dejanos tus datos. Te mostraremos una demo real y analizaremos cómo evitar que se te sigan escapando interesados.",
      bullet1: "Ideal para inmobiliarias, barrios cerrados, loteadoras y comercializadoras de propiedades.",
      bullet2: "Control total: La información de tus clientes y propiedades es 100% tuya, protegida bajo tu propia base de datos.",
      badge: "Hablemos hoy",
      name: "Nombre Completo *",
      namePlaceholder: "Ej. Juan Pérez",
      company: "Empresa / Inmobiliaria",
      companyPlaceholder: "Ej. Inmobiliaria Líder",
      email: "Correo Electrónico *",
      emailPlaceholder: "juan@empresa.com",
      phone: "WhatsApp (con código de país)",
      phonePlaceholder: "Ej. +5491122334455",
      btn: "Contáctame"
    },
    footer: {
      desc: "Plataformas web y sistemas inteligentes diseñados para que inmobiliarias y loteos aseguren sus ventas y consigan más clientes sin depender de sistemas rígidos.",
      navigation: "Navegación",
      demoTitle: "Demostración",
      copyright: "n-sistemas.com. Todos los derechos reservados. Desarrollador tecnológico inmobiliario independiente.",
      demo: "Acceso Demo",
      support: "Soporte Comercial"
    },
    demoMock: {
      title: "Plataforma n-sistemas.com Inmobiliarios",
      titleCrm: "Seguimiento de Clientes",
      titleWa: "WhatsApp Logs",
      titleSat: "Editor Satelital",
      newLeads: "Leads Nuevos Hoy",
      vsYesterday: "+24% vs ayer",
      leadsValue: "48 Prospectos",
      waResponse: "RESPUESTA AUTOMÁTICA",
      waInput: "\"Hola, me interesa el Lote 12. ¿Qué financiación tienen?\"",
      waBubble: "¡Hola! Contamos con financiación propia de hasta 48 cuotas fijas en USD. ¿Deseas agendar una llamada?",
      waGeorouting: "Georouting: Lead derivado a Asesor Comercial Canning.",
      satSector: "Plano del Sector",
      satVectorial: "MAPA VECTORIAL",
      satLotsTitle: "Lotes Asociados",
      statusDisponible: "Disponible",
      statusReservado: "Reservado",
      statusVendido: "Vendido",
      kanbanNew: "Nuevo",
      kanbanContact: "Contacto",
      kanbanNeg: "Negociación"
    }
  },
  en: {
    nav: {
      solucion: "Solution",
      modulos: "Modules",
      proceso: "Process",
      contacto: "Contact",
      verDemo: "View Demo"
    },
    hero: {
      badge: "Never lose a sale due to lack of follow-up",
      title1: "Centralize your leads and multiply your closings.",
      title2: "Your real estate agency under your full ",
      titleControl: "Control",
      subtitle: "Don't let prospects go cold or get forgotten in an Excel sheet or WhatsApp chat. We give you your own premium portal and an intelligent system that responds instantly and organizes your sales team.",
      demoBtn: "View Demo",
      contactBtn: "Schedule Consultation",
      testimonial: "“The ultimate solution for real estate agency owners who want to automate growth and secure every business opportunity.”"
    },
    table: {
      badge: "Business Difference",
      title: "Keep losing sales or take control of your real estate agency?",
      subtitle: "Find out how your revenue changes when you transition from scattered spreadsheets to an automated follow-up platform.",
      headers: ["Feature", "Isolated Tools", "n-sistemas.com Solution"],
      row1: ["Monthly Costs", "✕ Monthly licenses for each agent that make your business expensive", "✓ One-time investment for your own software, no eternal rent payments"],
      row2: ["Implementation", "✕ Months of configuration, technical issues, and wasted time", "✓ Fast launch thanks to our pre-built technological foundation"]
    },
    modules: {
      badge: "Commercial suite",
      title: "Everything your real estate agency needs to sell more and automate work",
      subtitle: "We deploy an integrated suite of tools and adapt them to your specific needs. Speed of deployment with the flexibility of custom code.",
      item1: {
        title: "Own Premium Web Portal",
        bullets: [
          "Own domain with SSL — your exclusive corporate URL",
          "Complete branding: logo, palette, typography of your brand",
          "Property sheets with HD gallery, floorplans and satellite location",
          "Direct WhatsApp button on every property page"
        ]
      },
      item2: {
        title: "WhatsApp Integrations & Automations",
        bullets: [
          "Immediate automatic reply upon receiving an inquiry",
          "Easy-to-edit no-code assignment rules",
          "Georouting: routes to the right advisor for the zone",
          "Automated alerts via email and push notifications"
        ]
      },
      item3: {
        title: "Commercial Tracking & Control",
        bullets: [
          "Visual pipeline with columns by prospect status",
          "Drag & Drop to easily advance leads",
          "Automatic or manual advisor assignment",
          "Configurable user roles and complete CSV download"
        ]
      },
      item4: {
        title: "100% Owned Database",
        bullets: [
          "Secure backup of contacts on your own server",
          "Data doesn't leave with advisors who exit the company",
          "Complete and instant database export",
          "Encryption of sensitive client and investor data"
        ]
      },
      item5: {
        title: "Interactive Maps & Lot Plots",
        bullets: [
          "Plotting of interactive parcels on real maps",
          "Colors by status: available, reserved, sold",
          "Automatic centroid and area calculation",
          "Touch interface ideal for displaying on tablets or mobiles"
        ]
      },
      item6: {
        title: "Contract & Rental Management",
        bullets: [
          "Shared calendar for visits, signatures, and handovers",
          "Management of contract expirations for leases",
          "Automatic alerts 30/60/90 days before expiration",
          "Direct help desk support with our technical team"
        ]
      },
      item7: {
        title: "Does your real estate agency need something specific?",
        desc: "We develop additional tools or reports adapted exclusively to your way of working. Custom code that is your property, with no eternal monthly licenses.",
        btn: "Inquire about a custom module"
      }
    },
    benefits: {
      badge: "Business Advantage",
      title: "Protect your investment and multiply real estate profitability",
      subtitle: "We focus on solving the real problems that cause you to lose money and clients today:",
      b1: {
        title: "Immediate response to secure the client",
        desc: "The first to respond gets the sale. Our platform sends an automatic welcome WhatsApp to the lead in seconds and alerts your agents to start the follow-up in minutes."
      },
      b2: {
        title: "Increase the perceived value of your projects",
        desc: "Your developments deserve a premium presentation. Tailored interactive portals and custom maps create a visual impact that accelerates investor decisions."
      },
      b3: {
        title: "Your own software, your own database",
        desc: "Never depend on third-party software again. You are the absolute owner of the code and the data. No surprise license increases at the end of the month or risk of losing contacts."
      }
    },
    timeline: {
      badge: "Frictionless Transition",
      title: "How we implement your new real estate platform",
      subtitle: "We accompany you at every stage to ensure your team starts using the system immediately without stopping your sales.",
      s1: {
        title: "Commercial Diagnosis",
        desc: "We analyze your sales flows, where contacts are currently lost, and what information is key for your agents to close operations."
      },
      s2: {
        title: "Configuration & Corporate Image",
        desc: "We deploy your premium portal and control panel, fully adapting it with your logos, corporate colors, and typography."
      },
      s3: {
        title: "Automations & Integrations",
        desc: "We configure the instant WhatsApp response engine and the specific integrations that your business requires."
      },
      s4: {
        title: "Go-Live & Training",
        desc: "We migrate your current list of clients and properties, and train your advisors to guarantee a smooth transition."
      },
      s5: {
        title: "After-Sales Service",
        desc: "Daily technical support and continuous system updates to give you peace of mind and long-term security."
      }
    },
    cta: {
      title: "Take control of your clients today and secure every sales opportunity",
      subtitle: "Let's talk without commitment. We will analyze your current follow-up flow and show you how a custom platform can help you close more deals without overspending."
    },
    form: {
      title: "Inquiry received!",
      success: "Thanks for reaching out to n-sistemas.com. We will contact you as soon as possible.",
      contactTitle: "Want to see how it works for your agency?",
      contactSubtitle: "Leave us your details. We will show you a real demo and analyze how to stop losing prospects.",
      bullet1: "Ideal for real estate agencies, gated communities, lot developers and property commercializers.",
      bullet2: "Total control: Your client and property data is 100% yours, protected under your own database.",
      badge: "Let's talk today",
      name: "Full Name *",
      namePlaceholder: "e.g. John Doe",
      company: "Company / Real Estate Agency",
      companyPlaceholder: "e.g. Leading Real Estate",
      email: "Email Address *",
      emailPlaceholder: "john@company.com",
      phone: "WhatsApp (with country code)",
      phonePlaceholder: "e.g. +123456789",
      btn: "Contact me"
    },
    footer: {
      desc: "Web platforms and intelligent systems designed so that real estate agencies and land developments secure their sales and get more clients without depending on rigid systems.",
      navigation: "Navigation",
      demoTitle: "Demostration",
      copyright: "n-sistemas.com. All rights reserved. Independent real estate technology developer.",
      demo: "Demo Access",
      support: "Commercial Support"
    },
    demoMock: {
      title: "n-sistemas.com Real Estate Platform",
      titleCrm: "Lead Tracking",
      titleWa: "WhatsApp Logs",
      titleSat: "Satellite Editor",
      newLeads: "New Leads Today",
      vsYesterday: "+24% vs yesterday",
      leadsValue: "48 Leads",
      waResponse: "AUTOMATIC REPLY",
      waInput: "\"Hello, I am interested in Lot 12. What financing do you offer?\"",
      waBubble: "Hello! We offer in-house financing with up to 48 fixed monthly installments in USD. Would you like to schedule a call?",
      waGeorouting: "Georouting: Lead forwarded to Canning Sales Advisor.",
      satSector: "Sector Layout",
      satVectorial: "VECTORIAL MAP",
      satLotsTitle: "Associated Lots",
      statusDisponible: "Available",
      statusReservado: "Reserved",
      statusVendido: "Sold",
      kanbanNew: "New",
      kanbanContact: "Contact",
      kanbanNeg: "Negotiation"
    }
  },
  pt: {
    nav: {
      solucion: "Solução",
      modulos: "Módulos",
      proceso: "Processo",
      contacto: "Contato",
      verDemo: "Ver Demo"
    },
    hero: {
      badge: "Não perca mais vendas por falta de acompanhamento",
      title1: "Centralize seus contatos e multiplique seus fechamentos.",
      title2: "Sua imobiliária sob seu total ",
      titleControl: "Controle",
      subtitle: "Não deixe que os interessados esfriem ou fiquem esquecidos em planilhas de Excel ou conversas de WhatsApp. Entregamos seu próprio portal premium e um sistema inteligente que responde instantaneamente e organiza sua equipe de vendas.",
      demoBtn: "Ver Demo",
      contactBtn: "Agendar Consulta",
      testimonial: "“A solução definitiva para donos de imobiliárias que desejam automatizar o crescimento e proteger cada oportunidade de negócio.”"
    },
    table: {
      badge: "Diferencial de Negócio",
      title: "Continuar perdendo vendas ou assumir o controle da sua imobiliária?",
      subtitle: "Descubra como seu faturamento muda ao passar de planilhas soltas para uma plataforma que automatiza seu acompanhamento.",
      headers: ["Característica", "Ferramentas Isoladas", "Solução n-sistemas.com"],
      row1: ["Custos Mensais", "✕ Licenças mensais por cada vendedor que encarecem seu negócio", "✓ Investimento único pelo seu próprio software, sem aluguel eterno"],
      row2: ["Implementación", "✕ Meses de configuração, problemas técnicos e desperdício de tempo", "✓ Lançamento rápido graças à nossa base tecnológica pré-construída"]
    },
    modules: {
      badge: "Suíte comercial",
      title: "Tudo o que sua imobiliária precisa para vender mais e automatizar o trabalho",
      subtitle: "Implantamos uma suíte de ferramentas integradas e as adaptadas às suas necessidades específicas. Rapidez na ativação com a flexibilidade do desenvolvimento sob medida.",
      item1: {
        title: "Portal Web Premium Próprio",
        bullets: [
          "Domínio próprio com SSL — sua URL corporativa exclusiva",
          "Branding completo: logotipo, paleta, tipografia da sua marca",
          "Fichas com galeria HD, plantas e localização por satélite",
          "Botão de WhatsApp direto em cada imóvel"
        ]
      },
      item2: {
        title: "Integrações com WhatsApp e Automatizações",
        bullets: [
          "Resposta automática imediata ao receber uma consulta",
          "Reglas de distribuição sem código fáceis de editar",
          "Georouting: direciona ao corretor da zona correta",
          "Alertas automatizados por e-mail e notificações push"
        ]
      },
      item3: {
        title: "Acompanhamento e Controle Comercial",
        bullets: [
          "Pipeline visual com colunas por etapa do cliente",
          "Drag & Drop para mover leads confortavelmente",
          "Distribuição automática ou manual de corretores",
          "Permissões de usuário configuráveis e exportação CSV"
        ]
      },
      item4: {
        title: "Banco de Dados 100% Próprio",
        bullets: [
          "Backup seguro de contatos no seu próprio servidor",
          "Os dados não vão embora com os corretores que saem",
          "Exportação de banco de dados completa e instantânea",
          "Criptografia de dados sensíveis de clientes e investidores"
        ]
      },
      item5: {
        title: "Mapas e Loteamentos Interativos",
        bullets: [
          "Traçado de lotes interativos em mapas reais",
          "Cores por status: disponível, reservado, vendido",
          "Centroide e cálculo de área automáticos",
          "Interface tátil ideal para tablets ou celulares"
        ]
      },
      item6: {
        title: "Controle de Contratos e Aluguéis",
        bullets: [
          "Calendário compartilhado de visitas, assinaturas e entregas",
          "Administração de vencimentos de contratos de aluguel",
          "Alertas automáticos 30/60/90 dias antes do vencimento",
          "Suporte de mesa de ajuda direta com nossa equipe"
        ]
      },
      item7: {
        title: "Sua imobiliária precisa de algo específico?",
        desc: "Desenvolvemos ferramentas ou relatórios adicionais adaptados exclusivamente ao seu modo de trabalhar. Código sob medida que é sua propriedade, sem mensalidades eternas.",
        btn: "Consultar sobre um módulo personalizado"
      }
    },
    benefits: {
      badge: "Vantagem de Negócio",
      title: "Proteja seu investimento e multiplique a rentabilidade imobiliária",
      subtitle: "Focamos em resolver os problemas reais que fazem você perder dinheiro e clientes hoje em dia:",
      b1: {
        title: "Resposta imediata para garantir o cliente",
        desc: "Quem responde primeiro fecha a venda. Nossa plataforma envia um WhatsApp automático de boas-vindas em segundos ao lead e alerta seus corretores para iniciar o contato em minutos."
      },
      b2: {
        title: "Aumente o valor percebido dos seus projetos",
        desc: "Seus loteamentos merecem uma apresentação premium. Portais interativos sob medida e mapas personalizados criam um impacto visual que acelera as decisões dos investidores."
      },
      b3: {
        title: "Seu próprio software, seu banco de dados",
        desc: "Nunca mais dependa de software de terceiros. Você é o proprietário absoluto do código e dos dados. Sem surpresas com licenças que sobem no fim do mês ou risco de perder contatos."
      }
    },
    timeline: {
      badge: "Transição sem Atrito",
      title: "Como implementamos sua nova plataforma imobiliária",
      subtitle: "Acompanhamos você em cada etapa para garantir que sua equipe comece a usar o sistema imediatamente sem interromper suas vendas.",
      s1: {
        title: "Diagnóstico Comercial",
        desc: "Analisamos seus fluxos de vendas, onde os contatos são perdidos atualmente e quais dados são chaves para os corretores fecharem negócios."
      },
      s2: {
        title: "Configuração e Branding",
        desc: "Implantamos seu portal premium e painel de controle, adaptando-o completamente com seus logotipos, cores corporativas e tipografia."
      },
      s3: {
        title: "Automatizações e Integrações",
        desc: "Configuramos o motor de respostas instantâneas do WhatsApp e as integrações específicas que sua empresa precisar."
      },
      s4: {
        title: "Ativação e Treinamento",
        desc: "Migramos sua carteira atual de clientes e imóveis, treinamos sua equipe e garantimos uma transição tranquila."
      },
      s5: {
        title: "Serviço Pós-Venda",
        desc: "Suporte técnico diário e atualizações contínuas do sistema para sua total tranquilidade e segurança a longo prazo."
      }
    },
    cta: {
      title: "Assuma o controle de seus clientes hoje e garanta cada oportunidade de venda",
      subtitle: "Fale conosco sem compromisso. Analisaremos seu fluxo atual e mostraremos como uma plataforma própria pode ajudá-lo a fechar mais negócios sem gastar a mais."
    },
    form: {
      title: "Consulta recebida!",
      success: "Obrigado por entrar em contato com n-sistemas.com. Entraremos em contato o mais rápido possível.",
      contactTitle: "Quer ver como funciona para sua imobiliária?",
      contactSubtitle: "Deixe-nos seus dados. Mostraremos uma demonstração real e analisaremos como evitar a perda de prospectos.",
      bullet1: "Ideal para imobiliárias, condomínios fechados, loteadoras e comercializadoras de imóveis.",
      bullet2: "Controle total: As informações de seus clientes e imóveis são 100% suas, protegidas sob seu próprio banco de dados.",
      badge: "Fale conosco hoje",
      name: "Nome Completo *",
      namePlaceholder: "Ex. João Silva",
      company: "Empresa / Imobiliária",
      companyPlaceholder: "Ex. Imobiliária Líder",
      email: "E-mail *",
      emailPlaceholder: "joao@empresa.com",
      phone: "WhatsApp (com código do país)",
      phonePlaceholder: "Ex. +5511999999999",
      btn: "Fale comigo"
    },
    footer: {
      desc: "Plataformas web e sistemas inteligentes projetados para que imobiliárias e loteamentos garantam suas vendas e conquistem mais clientes sem depender de sistemas rígidos.",
      navigation: "Navegação",
      demoTitle: "Demonstração",
      copyright: "n-sistemas.com. Todos os direitos reservados. Desenvolvedor de tecnologia imobiliária independente.",
      demo: "Acesso Demo",
      support: "Suporte Comercial"
    },
    demoMock: {
      title: "Plataforma n-sistemas.com Imobiliários",
      titleCrm: "Acompanhamento de Leads",
      titleWa: "WhatsApp Logs",
      titleSat: "Editor Satélite",
      newLeads: "Novos Leads Hoje",
      vsYesterday: "+24% vs ontem",
      leadsValue: "48 Leads",
      waResponse: "RESPOSTA AUTOMÁTICA",
      waInput: "\"Olá, me interessa o Lote 12. Qual financiamento vocês oferecem?\"",
      waBubble: "Olá! Oferecemos financiamento próprio em até 48 parcelas fixas em USD. Deseja agendar uma conversa?",
      waGeorouting: "Georouting: Lead encaminhado ao Assessor de Vendas Canning.",
      satSector: "Planta do Setor",
      satVectorial: "MAPA VETORIAL",
      satLotsTitle: "Lotes Associados",
      statusDisponible: "Disponível",
      statusReservado: "Reservado",
      statusVendido: "Vendido",
      kanbanNew: "Novo",
      kanbanContact: "Contato",
      kanbanNeg: "Negociação"
    }
  }
};

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    whatsapp: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeMockTab, setActiveMockTab] = useState<"crm" | "wa" | "sat">("crm");
  const [hoveredLotId, setHoveredLotId] = useState<string | null>(null);
  
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState<'es' | 'en' | 'pt'>('es');

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
  }, []);

  useEffect(() => {
    // 1. Initial quick detection based on browser locales and timezones
    const browserLang = navigator.language || '';
    let detectedLang: 'es' | 'en' | 'pt' = 'en';
    if (browserLang.startsWith('pt')) {
      detectedLang = 'pt';
    } else if (browserLang.startsWith('es')) {
      detectedLang = 'es';
    } else {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz.includes('Sao_Paulo') || tz.includes('Lisbon')) {
          detectedLang = 'pt';
        } else if (
          tz.includes('Buenos_Aires') || 
          tz.includes('Santiago') || 
          tz.includes('Bogota') || 
          tz.includes('Mexico') || 
          tz.includes('Madrid')
        ) {
          detectedLang = 'es';
        }
      } catch (e) {}
    }
    setLanguage(detectedLang);

    // 2. Fetch precise country detection in the background to refine
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.country_code) {
          const country = data.country_code.toUpperCase();
          if (country === 'BR' || country === 'PT') {
            setLanguage('pt');
          } else if (['AR', 'MX', 'ES', 'CO', 'CL', 'PE', 'VE', 'EC', 'UY', 'PY', 'BO', 'GT', 'HN', 'SV', 'NI', 'CR', 'PA', 'DO', 'PR'].includes(country)) {
            setLanguage('es');
          } else {
            setLanguage('en');
          }
        }
      })
      .catch(() => {
        // Fallback silently to navigator.language detection
      });
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
  };

  const miniLots = [
    { id: "L01", name: "Terreno B. Histórico", area: "600 m²", status: "vendido", points: "50,140 80,140 80,170 50,170", color: "#ef4444", fill: "rgba(239, 68, 68, 0.15)" },
    { id: "L02", name: "Oficina Zona Centro", area: "120 m²", status: "disponible", points: "155,125 185,125 185,150 155,150", color: "#10b981", fill: "rgba(16, 185, 129, 0.15)" },
    { id: "L03", name: "Local Comercial Centro", area: "250 m²", status: "reservado", points: "210,65 240,65 240,90 210,90", color: "#f59e0b", fill: "rgba(245, 158, 11, 0.15)" },
    { id: "L04", name: "Quinta B. Ferrando", area: "1500 m²", status: "disponible", points: "315,75 355,75 355,110 315,110", color: "#10b981", fill: "rgba(16, 185, 129, 0.15)" },
    { id: "L05", name: "Lote en el Campo", area: "3200 m²", status: "disponible", points: "345,65 385,65 385,90 345,90", color: "#10b981", fill: "rgba(16, 185, 129, 0.15)" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email) {
      alert("Por favor completa los campos requeridos.");
      return;
    }
    // Simulate successful API call
    setSubmitted(true);
  };

  return (
    <>
      {/* Header / Nav */}
      <header className="header">
        <div className="container header-container">
          <Link href="/" className="logo" style={{ textTransform: "lowercase", display: "flex", alignItems: "baseline", gap: "2px" }}>
            <span style={{ fontWeight: 300, letterSpacing: "-0.03em" }} className="logo-text">n-sistemas</span>
            <span style={{ fontWeight: 400, opacity: 0.8 }} className="logo-dot">.com</span>
          </Link>
          <nav className="nav" style={{ alignItems: "center", gap: "16px" }}>
            <a href="#solucion" className="nav-link">{t[language].nav.solucion}</a>
            <a href="#modulos" className="nav-link">{t[language].nav.modulos}</a>
            <a href="#proceso" className="nav-link">{t[language].nav.proceso}</a>
            <a href="#contacto" className="nav-link">{t[language].nav.contacto}</a>
            
            <Link href="/admin" className="btn btn-secondary" style={{ padding: "8px 18px", fontSize: "0.9rem" }}>
              {t[language].nav.verDemo}
            </Link>

            {/* Language dropdown menu */}
            <div className="lang-selector-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'es' | 'en' | 'pt')}
                className="lang-select"
              >
                <option value="es">ES</option>
                <option value="pt">POR</option>
                <option value="en">EN</option>
              </select>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section className="hero" id="solucion">
        <div className="container hero-grid">
          <div className="hero-content animate-fade-in">
            <div className="badge">{t[language].hero.badge}</div>
            <h1 className="hero-title" style={{ textAlign: "center", width: "100%" }}>
              {t[language].hero.title1}<br />{t[language].hero.title2}<span style={{ background: "linear-gradient(135deg, #ffe066 0%, #f59e0b 50%, #d97706 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: "bold", textShadow: "0 0 30px rgba(245, 158, 11, 0.25)" }}>{t[language].hero.titleControl}</span>
            </h1>
            <p className="hero-subtitle">
              {t[language].hero.subtitle}
            </p>
            <div className="btn-group">
              <Link href="/admin" className="btn btn-primary">
                {t[language].hero.demoBtn}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <a href="#contacto" className="btn btn-secondary">
                {t[language].hero.contactBtn}
              </a>
            </div>
            <p style={{ marginTop: "24px", fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "italic" }}>
              {t[language].hero.testimonial}
            </p>
          </div>

          {/* Dashboard Mockup Preview */}
          <div className="animate-fade-in delay-2" style={{ position: "relative" }}>
            <div className="dashboard-mockup">
              <div className="dashboard-header">
                <div className="dashboard-dots">
                  <div className="dashboard-dot"></div>
                  <div className="dashboard-dot"></div>
                  <div className="dashboard-dot"></div>
                </div>
                <div className="dashboard-title">{t[language].demoMock.title}</div>
                <div style={{ width: "42px" }}></div>
              </div>

              <div className="dashboard-layout">
                {/* Mini sidebar inside mockup */}
                <div className="dashboard-sidebar">
                  <div
                    className={`sidebar-icon ${activeMockTab === "crm" ? "active" : ""}`}
                    onClick={() => setActiveMockTab("crm")}
                    title={t[language].demoMock.titleCrm}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M7 7h10M7 12h10M7 17h6" />
                    </svg>
                  </div>
                  <div
                    className={`sidebar-icon ${activeMockTab === "wa" ? "active" : ""}`}
                    onClick={() => setActiveMockTab("wa")}
                    title={t[language].demoMock.titleWa}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <div
                    className={`sidebar-icon ${activeMockTab === "sat" ? "active" : ""}`}
                    onClick={() => setActiveMockTab("sat")}
                    title={t[language].demoMock.titleSat}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </div>
                </div>

                <div className="dashboard-content">
                  {activeMockTab === "crm" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
                      <div className="mock-card leads-chart">
                        <div className="leads-header">
                          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{t[language].demoMock.newLeads}</span>
                          <span style={{ fontSize: "0.8rem", color: "#10b981", fontWeight: "bold" }}>{t[language].demoMock.vsYesterday}</span>
                        </div>
                        <div className="leads-value">{t[language].demoMock.leadsValue}</div>
                        <div style={{ height: "40px", marginTop: "10px", width: "100%" }}>
                          <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                            <path d="M0,35 Q20,10 40,25 T80,5 T100,20 L100,40 L0,40 Z" fill="rgba(59, 130, 246, 0.15)" stroke="none" />
                            <path d="M0,35 Q20,10 40,25 T80,5 T100,20" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                      <div className="kanban-board">
                        <div className="kanban-col">
                          <span className="kanban-col-title">{t[language].demoMock.kanbanNew}</span>
                          <div className="kanban-item">G. Pérez - Lote 5</div>
                        </div>
                        <div className="kanban-col">
                          <span className="kanban-col-title">{t[language].demoMock.kanbanContact}</span>
                          <div className="kanban-item">M. Paz - Dpto 2D</div>
                        </div>
                        <div className="kanban-col">
                          <span className="kanban-col-title">{t[language].demoMock.kanbanNeg}</span>
                          <div className="kanban-item" style={{ borderColor: "rgba(59,130,246,0.3)", background: "rgba(59,130,246,0.05)" }}>I. Casal - Campo</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMockTab === "wa" && (
                    <div className="whatsapp-log" style={{ width: "100%" }}>
                      <div className="mock-card" style={{ padding: "12px", borderLeft: "3px solid #25d366" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "#25d366", display: "block" }}>{t[language].demoMock.waResponse}</span>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-heading)", marginTop: "2px" }}>
                          {t[language].demoMock.waInput}
                        </p>
                      </div>
                      <div className="wa-bubble">
                        {t[language].demoMock.waBubble}
                      </div>
                      <div className="mock-card" style={{ padding: "8px", background: "var(--bg-column)" }}>
                        <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ color: "#f59e0b", flexShrink: 0 }}>
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                          </svg>
                          {t[language].demoMock.waGeorouting}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeMockTab === "sat" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1.10fr 0.90fr", gap: "12px", width: "100%" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>{t[language].demoMock.satSector}</span>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "170px",
                            background: "var(--bg-color)",
                            borderRadius: "6px",
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                            overflow: "hidden"
                          }}
                        >
                          <svg viewBox="0 0 400 200" width="100%" height="100%" style={{ display: "block" }}>
                            <image
                              href="/mapa-colonia.jpg"
                              x="0"
                              y="0"
                              width="400"
                              height="200"
                              preserveAspectRatio="xMidYMid slice"
                              opacity="0.75"
                            />
                            {miniLots.map((lot) => {
                              const isHovered = hoveredLotId === lot.id;
                              return (
                                <polygon
                                  key={lot.id}
                                  points={lot.points}
                                  fill={isHovered ? "rgba(59, 130, 246, 0.45)" : lot.fill}
                                  stroke={isHovered ? "#ffffff" : lot.color}
                                  strokeWidth={isHovered ? 2 : 1.5}
                                  style={{ cursor: "pointer", transition: "all 0.15s" }}
                                  onMouseEnter={() => setHoveredLotId(lot.id)}
                                  onMouseLeave={() => setHoveredLotId(null)}
                                />
                              );
                            })}
                          </svg>
                          <div style={{ position: "absolute", bottom: "6px", right: "6px", fontSize: "0.5rem", background: "rgba(0,0,0,0.8)", padding: "2px 5px", borderRadius: "3px", fontWeight: "bold", color: "var(--secondary)" }}>
                            {t[language].demoMock.satVectorial}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>{t[language].demoMock.satLotsTitle}</span>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px", height: "170px", overflowY: "auto", paddingRight: "2px" }}>
                          {miniLots.map((lot) => {
                            const isHovered = hoveredLotId === lot.id;
                            const statusNames = {
                              disponible: t[language].demoMock.statusDisponible,
                              reservado: t[language].demoMock.statusReservado,
                              vendido: t[language].demoMock.statusVendido
                            };
                            return (
                              <div
                                key={lot.id}
                                className="mock-card"
                                style={{
                                  padding: "6px 10px",
                                  border: isHovered ? "1px solid var(--primary)" : "1px solid var(--border-color)",
                                  background: isHovered ? "var(--primary-glow)" : "var(--bg-card)",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                  transition: "all 0.15s",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center"
                                }}
                                onMouseEnter={() => setHoveredLotId(lot.id)}
                                onMouseLeave={() => setHoveredLotId(null)}
                              >
                                <div>
                                  <span style={{ fontSize: "0.7rem", fontWeight: "bold", color: "var(--text-heading)", display: "block" }}>{lot.name}</span>
                                  <span style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>{lot.area}</span>
                                </div>
                                <span
                                  style={{
                                    fontSize: "0.55rem",
                                    fontWeight: "bold",
                                    padding: "2px 5px",
                                    borderRadius: "3px",
                                    background: lot.fill,
                                    color: lot.color,
                                    border: `1px solid ${lot.color}30`
                                  }}
                                >
                                  {statusNames[lot.status as keyof typeof statusNames]}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Glowing background */}
            <div style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              right: "10%",
              bottom: "10%",
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
              zIndex: -1,
              filter: "blur(40px)"
            }}></div>
          </div>
        </div>
      </section>

      {/* 3. Comparativa */}
      <section className="section-padding" style={{ background: "rgba(1, 3, 10, 0.4)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          <div className="section-title-wrap text-center">
            <div className="badge">{t[language].table.badge}</div>
            <h2 className="section-title">{t[language].table.title}</h2>
            <p>{t[language].table.subtitle}</p>
          </div>

          <div className="table-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>{t[language].table.headers[0]}</th>
                  <th>{t[language].table.headers[1]}</th>
                  <th>{t[language].table.headers[2]}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>{t[language].table.row1[0]}</strong></td>
                  <td>
                    <span className="tag-fail">{t[language].table.row1[1]}</span>
                  </td>
                  <td>
                    <span className="tag-success">{t[language].table.row1[2]}</span>
                  </td>
                </tr>
                <tr>
                  <td><strong>{t[language].table.row2[0]}</strong></td>
                  <td>
                    <span className="tag-fail">{t[language].table.row2[1]}</span>
                  </td>
                  <td>
                    <span className="tag-success">{t[language].table.row2[2]}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" style={{ padding: "40px 24px" }}>
        <span className="section-divider-text">n-sistemas.com</span>
      </div>

      {/* 4. Módulos Principales */}
      <section className="section-padding" id="modulos">
        <div className="container">
          <div className="section-title-wrap text-center">
            <div className="badge badge-cyan">{t[language].modules.badge}</div>
            <h2 className="section-title">{t[language].modules.title}</h2>
            <p>{t[language].modules.subtitle}</p>
          </div>

          <div className="modules-list">
            {/* Portal Inmobiliario */}
            <div className="module-item">
              <div className="module-item-icon" style={{ background: "rgba(59,130,246,0.12)", color: "var(--primary)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <div className="module-item-content">
                <h3>{t[language].modules.item1.title}</h3>
                <ul>
                  {t[language].modules.item1.bullets.map((bullet, idx) => (
                    <li key={idx}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" opacity=".3"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Integración con WhatsApp */}
            <div className="module-item">
              <div className="module-item-icon" style={{ background: "rgba(6,182,212,0.12)", color: "var(--secondary)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </div>
              <div className="module-item-content">
                <h3>{t[language].modules.item2.title}</h3>
                <ul>
                  {t[language].modules.item2.bullets.map((bullet, idx) => (
                    <li key={idx}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" opacity=".3"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Seguimiento Comercial */}
            <div className="module-item">
              <div className="module-item-icon" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
              </div>
              <div className="module-item-content">
                <h3>{t[language].modules.item3.title}</h3>
                <ul>
                  {t[language].modules.item3.bullets.map((bullet, idx) => (
                    <li key={idx}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" opacity=".3"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Base de Datos Propia */}
            <div className="module-item">
              <div className="module-item-icon" style={{ background: "rgba(168,85,247,0.12)", color: "#a855f7" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
              </div>
              <div className="module-item-content">
                <h3>{t[language].modules.item4.title}</h3>
                <ul>
                  {t[language].modules.item4.bullets.map((bullet, idx) => (
                    <li key={idx}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" opacity=".3"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Planos Interactivos */}
            <div className="module-item">
              <div className="module-item-icon" style={{ background: "rgba(59,130,246,0.12)", color: "var(--primary)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
              </div>
              <div className="module-item-content">
                <h3>{t[language].modules.item5.title}</h3>
                <ul>
                  {t[language].modules.item5.bullets.map((bullet, idx) => (
                    <li key={idx}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" opacity=".3"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Control de Contratos */}
            <div className="module-item">
              <div className="module-item-icon" style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </div>
              <div className="module-item-content">
                <h3>{t[language].modules.item6.title}</h3>
                <ul>
                  {t[language].modules.item6.bullets.map((bullet, idx) => (
                    <li key={idx}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" opacity=".3"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA modulo personalizado */}
            <div className="module-item module-item-cta">
              <div className="module-item-icon" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.2))", color: "var(--primary)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
              </div>
              <div className="module-item-content">
                <h3>{t[language].modules.item7.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "12px", lineHeight: "1.5" }}>
                  {t[language].modules.item7.desc}
                </p>
                <a href="#contacto" className="btn btn-secondary" style={{ fontSize: "0.82rem", padding: "8px 18px", display: "inline-block" }}>
                  {t[language].modules.item7.btn}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Beneficios comerciales */}
      <section className="section-padding" style={{ background: "rgba(1, 3, 10, 0.4)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          <div className="section-title-wrap text-center">
            <div className="badge">{t[language].benefits.badge}</div>
            <h2 className="section-title">{t[language].benefits.title}</h2>
            <p>{t[language].benefits.subtitle}</p>
          </div>

          <div className="benefit-row">
            <div className="glass-card benefit-block">
              <div style={{ padding: "8px 12px", background: "rgba(59,130,246,0.15)", borderRadius: "6px", color: "var(--primary)", fontWeight: "bold", fontSize: "0.85rem" }}>01</div>
              <h3 style={{ fontSize: "1.25rem", color: "white" }}>{t[language].benefits.b1.title}</h3>
              <p style={{ fontSize: "0.95rem" }}>
                {t[language].benefits.b1.desc}
              </p>
            </div>

            <div className="glass-card benefit-block">
              <div style={{ padding: "8px 12px", background: "rgba(6,182,212,0.15)", borderRadius: "6px", color: "var(--secondary)", fontWeight: "bold", fontSize: "0.85rem" }}>02</div>
              <h3 style={{ fontSize: "1.25rem", color: "white" }}>{t[language].benefits.b2.title}</h3>
              <p style={{ fontSize: "0.95rem" }}>
                {t[language].benefits.b2.desc}
              </p>
            </div>

            <div className="glass-card benefit-block">
              <div style={{ padding: "8px 12px", background: "rgba(16,185,129,0.15)", borderRadius: "6px", color: "#10b981", fontWeight: "bold", fontSize: "0.85rem" }}>03</div>
              <h3 style={{ fontSize: "1.25rem", color: "white" }}>{t[language].benefits.b3.title}</h3>
              <p style={{ fontSize: "0.95rem" }}>
                {t[language].benefits.b3.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Proceso de trabajo */}
      {/* Section Divider */}
      <div className="section-divider" style={{ padding: "40px 24px" }}>
        <span className="section-divider-text">n-sistemas.com</span>
      </div>

      <section className="section-padding" id="proceso">
        <div className="container">
          <div className="section-title-wrap text-center">
            <div className="badge badge-cyan">{t[language].timeline.badge}</div>
            <h2 className="section-title">{t[language].timeline.title}</h2>
            <p>{t[language].timeline.subtitle}</p>
          </div>

          <div className="timeline">
            <div className="timeline-step">
              <div className="timeline-number flex-center">1</div>
              <div className="timeline-content">
                <h3 className="timeline-step-title">{t[language].timeline.s1.title}</h3>
                <p style={{ fontSize: "0.9rem" }}>
                  {t[language].timeline.s1.desc}
                </p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="timeline-number flex-center">2</div>
              <div className="timeline-content">
                <h3 className="timeline-step-title">{t[language].timeline.s2.title}</h3>
                <p style={{ fontSize: "0.9rem" }}>
                  {t[language].timeline.s2.desc}
                </p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="timeline-number flex-center">3</div>
              <div className="timeline-content">
                <h3 className="timeline-step-title">{t[language].timeline.s3.title}</h3>
                <p style={{ fontSize: "0.9rem" }}>
                  {t[language].timeline.s3.desc}
                </p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="timeline-number flex-center">4</div>
              <div className="timeline-content">
                <h3 className="timeline-step-title">{t[language].timeline.s4.title}</h3>
                <p style={{ fontSize: "0.9rem" }}>
                  {t[language].timeline.s4.desc}
                </p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="timeline-number flex-center">5</div>
              <div className="timeline-content">
                <h3 className="timeline-step-title">{t[language].timeline.s5.title}</h3>
                <p style={{ fontSize: "0.9rem" }}>
                  {t[language].timeline.s5.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Final */}
      <section className="section-padding" style={{ borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          <div className="glass-card cta-box" style={{ padding: "60px 40px" }}>
            <h2 className="section-title" style={{ fontSize: "2.2rem" }}>
              {t[language].cta.title}
            </h2>
            <p style={{ maxWidth: "700px", margin: "20px auto 0 auto" }}>
              {t[language].cta.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 8. Formulario de contacto */}
      {/* Section Divider */}
      <div className="section-divider" style={{ padding: "40px 24px" }}>
        <span className="section-divider-text">n-sistemas.com</span>
      </div>

      <section className="section-padding" id="contacto" style={{ background: "rgba(1, 3, 10, 0.4)" }}>
        <div className="container">
          <div className="contact-grid">
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div className="badge badge-cyan">{t[language].form.badge}</div>
              <h2 className="section-title" style={{ textAlign: "left", marginBottom: "20px" }}>
                {t[language].form.contactTitle}
              </h2>
              <p style={{ marginBottom: "24px" }}>
                {t[language].form.contactSubtitle}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.95rem" }}>
                  <span style={{ color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </span>
                  <span>{t[language].form.bullet1}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.95rem" }}>
                  <span style={{ color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </span>
                  <span>{t[language].form.bullet2}</span>
                </div>
              </div>
            </div>

            <div className="glass-card">
              {submitted ? (
                <div className="form-success-msg" style={{ display: "flex", flexDirection: "column", padding: "40px 20px", textAlign: "center" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "16px" }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <h3 style={{ color: "white", marginBottom: "8px" }}>{t[language].form.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                    {t[language].form.success}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="nombre">{t[language].form.name}</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        className="form-control"
                        placeholder={t[language].form.namePlaceholder}
                        value={formData.nombre}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="empresa">{t[language].form.company}</label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        className="form-control"
                        placeholder={t[language].form.companyPlaceholder}
                        value={formData.empresa}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">{t[language].form.email}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="form-control"
                        placeholder={t[language].form.emailPlaceholder}
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="whatsapp">{t[language].form.phone}</label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        className="form-control"
                        placeholder={t[language].form.phonePlaceholder}
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary form-btn">
                    {t[language].form.btn}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" style={{ padding: "40px 24px" }}>
        <span className="section-divider-text">n-sistemas.com</span>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-top">
            <Link href="/" className="logo" style={{ textTransform: "lowercase", display: "flex", alignItems: "baseline", gap: "2px", marginBottom: "16px" }}>
              <span style={{ fontWeight: 300, letterSpacing: "-0.03em" }} className="logo-text">n-sistemas</span>
              <span style={{ fontWeight: 400, opacity: 0.8 }} className="logo-dot">.com</span>
            </Link>
            <p style={{ fontSize: "0.95rem" }}>
              {t[language].footer.desc}
            </p>
          </div>

          <div style={{ display: "flex", gap: "60px" }}>
            <div>
              <h4 style={{ fontSize: "0.9rem", color: "white", marginBottom: "16px", textTransform: "uppercase" }}>{t[language].footer.navigation}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem" }}>
                <li><a href="#solucion" style={{ color: "var(--text-muted)" }}>{t[language].nav.solucion}</a></li>
                <li><a href="#modulos" style={{ color: "var(--text-muted)" }}>{t[language].nav.modulos}</a></li>
                <li><a href="#proceso" style={{ color: "var(--text-muted)" }}>{t[language].nav.proceso}</a></li>
                <li><a href="#contacto" style={{ color: "var(--text-muted)" }}>{t[language].nav.contacto}</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: "0.9rem", color: "white", marginBottom: "16px", textTransform: "uppercase" }}>{t[language].footer.demoTitle}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem" }}>
                <li><Link href="/admin" style={{ color: "var(--text-muted)" }}>{t[language].demoMock.titleCrm}</Link></li>
                <li><Link href="/admin" style={{ color: "var(--text-muted)" }}>{t[language].demoMock.titleWa}</Link></li>
                <li><Link href="/admin" style={{ color: "var(--text-muted)" }}>{t[language].demoMock.titleSat}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} {t[language].footer.copyright}</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/admin" style={{ color: "var(--text-muted)" }}>{t[language].footer.demo}</Link>
            <a href="#contacto" style={{ color: "var(--text-muted)" }}>{t[language].footer.support}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
