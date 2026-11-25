---
title: "IA: Se trata de saber qué hacer"
date: '2026-11-25'
description: A medida que los agentes aceleran la ingeniería, el nuevo cuello de botella es saber con precisión qué hacer y eliminar la ambigüedad de las peticiones antes de construirlas.
tags: ['ai', 'product', 'software-engineering']
published: true
---

Hoy en día todos usamos agentes para escribir código. Seamos sinceros: no hacerlo debería considerarse negligente.

A medida que la tecnología evoluciona rápidamente, delegamos cada vez más pasos del flujo de trabajo de ingeniería en agentes y herramientas.

Hay una doble motivación: aumentar la velocidad y la productividad, SÍ, pero quizá también cierto grado de "pereza" — evitar el tiempo y el esfuerzo mental que requiere resolver los problemas nosotros mismos y centrarnos en redactar el prompt adecuado.

El nuevo cuello de botella es saber con precisión qué hacer. Quizá siempre lo fue, pero a medida que aumenta la velocidad, esto se convierte en la piedra angular de un buen resultado.

En mi caso, reviso las solicitudes de funcionalidades, errores o configuraciones que llegan a diario al equipo de Producto, y juzgo si están bien definidas y listas para avanzar o si necesitan más refinamiento.

El único objetivo es eliminar la ambigüedad. Estoy traduciendo galimatías y pensamiento ilusorio en una especificación inequívoca y accionable que mi equipo, junto con decenas de agentes, pueda ejecutar y probar.

En SpaceX, los ingenieros también han conectado agentes a este paso del proceso. Yo estoy trabajando para lograr lo mismo. Empecé desglosando los principios fundamentales que hacen que este rol de guardián funcione bien para nosotros:

* ¿Hay suficiente información para justificar la solicitud y ejecutarla? (Correos, adjuntos, documentación, gráficos, logs, evidencias...)
* ¿Está bien expuesto el proceso de negocio subyacente de nuestro cliente que justifica esta solicitud? (Un mal ejemplo sería "Necesitan una pantalla nueva para hacer X." Un buen ejemplo sería "Nuestro usuario necesita empaquetar mercancías en cajas y, al sellarlas, debería poder generar un documento que contenga Y.")
* ¿Romperá esto un flujo de información existente, y se ha dado cuenta el autor de ello y ha aportado una justificación de por qué este cambio es necesario? No espero que nuestros clientes sepan cómo otros usuarios utilizan nuestra plataforma, pero sí espero que mi equipo lo considere, formatee y filtre de antemano.
* ¿Se ha analizado los recursos necesarios para atender la solicitud? ¿Requiere la intervención del departamento comercial?
* ¿Cómo podemos medir si la solución propuesta es exitosa?

Hoy fue el primer día que un agente de IA de mi equipo empezó a ayudarme con esto. Junto con otros agentes que tienen acceso al código, a parte de la documentación y a skills, en cuanto recibo una nueva solicitud en mi puerta, un agente lanza un enjambre de colegas virtuales que intenta llegar a un veredicto: Sí, cumple los estándares, o No, "Hazle al autor todas estas preguntas antes de avanzar."

Al fin y al cabo, no se trata de modelos de IA más inteligentes; se trata de pensar y de buena ingeniería de toda la vida.
