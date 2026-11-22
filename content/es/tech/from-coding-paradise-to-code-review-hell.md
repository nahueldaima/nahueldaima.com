---
title: 'Del Paraíso del Código al Infierno del Code Review'
date: '2026-11-22'
description: Descubre cómo los agentes de programación con IA están transformando la ingeniería de software, acelerando la generación de código mientras crean nuevos cuellos de botella en la revisión de código.
tags: ['ai', 'code-review', 'software-engineering']
published: true
---

Nuestro rol como ingenieros de software está mutando rápidamente. Nos están echando de las verdes praderas del desarrollo de software hacia un profundo pozo rocoso de revisión de código.

Me gusta pensar que el oficio del desarrollo de software siempre se trató de traducir requerimientos ambiguos en soluciones deterministas, usando el código y la infraestructura como las herramientas básicas de nuestro cinturón.

Lo que empezó como un divertido autocompletado por IA hace apenas dos años, evolucionó rápidamente a enjambres de agentes que toman los requerimientos directamente del software interno de gestión de proyectos, redactan un plan, escriben el código, crean los tests y envían un PR.

La velocidad es tentadora. Gran parte del código generado parece plausible a primera vista, pero los errores que se cuelan pueden afectar a producción y a la calidad del servicio.

Últimamente, parece que el pensamiento escasea, e incluso leer en profundidad lo que los agentes están entendiendo, planificando y testeando parece una empresa titánica.

Así que ahora el cuello de botella se movió del desarrollador a la revisión de código, recibiendo toneladas de pull requests por semana y teniendo que hacer todo el proceso de nuevo:

* entender el requerimiento
* descifrar la intención detrás de lo que mi equipo intentó hacer
* revisar la calidad del código
* navegar por todos los resultados de los tests enviados para validar la cobertura
* cruzar todo esto con la lógica de negocio y asegurarme de que nada rompa los contratos actuales

Lucho constantemente entre el tiempo invertido en este proceso y hacer todo desde cero por mi cuenta, porque se volvió más lento comprobar lo que otro colega hizo con IA que simplemente construirlo bien desde cero.

Por supuesto que también uso agentes para aumentar mi capacidad en estos pasos, pero cuando los agentes escriben el diff, la revisión de código deja de ser el lugar donde se decide la calidad: si nadie deja por escrito los contratos entre componentes de un cambio antes de que el agente empiece, ni un revisor humano ni uno de IA pueden detectar lo que se rompe, porque ese bug no está en el diff.

Así que el desafío se vuelve el doble de difícil, porque no se trata solo de revisar lo que llegó en el PR, sino de rastrear toda la cadena de razonamiento y construir la confianza suficiente de que desplegar esto logrará lo que se pretendía.

Y no termina ahí: el objetivo es automatizar por completo todo este ciclo, sacando a los humanos del circuito, con agentes que revisan PRs y los rechazan o mergean automáticamente, para lograr ventajas competitivas frente al mercado.

El desafío es enorme, y requerirá cambios profundos en nuestros equipos, en la cultura de ingeniería y en nuestros codebases. Necesitamos que las reglas de negocio y los contratos entre componentes sean explícitos, accesibles y verificables tanto por humanos como por agentes de IA. Nuestros codebases deberían evolucionar para soportar esto, con límites arquitectónicos más claros, interfaces mejor definidas, y lenguajes de programación y prácticas que reduzcan la ambigüedad, como el tipado fuerte.

Un agente puede explicar cada línea que escribió. ¿Puede decirte qué servicio podría romperse cuando esa línea cambie?
