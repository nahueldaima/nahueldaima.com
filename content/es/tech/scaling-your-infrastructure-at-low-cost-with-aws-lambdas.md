---
title: 'AWS Lambdas y Microservicios: El Primer Paso para Escalar tu Infraestructura a Bajo Costo'
date: '2024-06-18'
description: Empezamos hace 4 años a trabajar con microservicios. Hoy tenemos más de 200 Lambdas que realizan diferentes tareas, pero el camino tuvo muchos desafíos.
image: /the-first-step-to-scaling-your-infrastructure-at-low-cost-nahuel-daima.jpg 
alt: El Primer Paso para Escalar tu Infraestructura a Bajo Costo con AWS Lambda
ogImage: /the-first-step-to-scaling-your-infrastructure-at-low-cost-nahuel-daima.jpg 
tags: ['devops', 'aws']
equivalent: scaling-your-infrastructure-at-low-cost-with-aws-lambdas
published: true
---

Aquí te cuento nuestra experiencia en [Tookane](https://tookane.com/) de cómo pasamos de un monolito a múltiples [Lambdas](https://aws.amazon.com/es/pm/lambda) en AWS y escalamos hasta millones de entregas sin despeinarnos.

### Transición a Microservicios
Empezamos hace 4 años a trabajar con microservicios. Hoy tenemos más de 200 Lambdas que realizan diferentes tareas críticas de los procesos de negocio y nos han permitido atender una demanda creciente a bajo coste.

Antes de contarte cada paso, comencemos por los bloques fundamentales:

## Fundamentos de los microservicios
Los microservicios son una forma de construir aplicaciones de software dividiéndolas en pequeñas partes independientes que se comunican entre sí. En lugar de tener una gran aplicación monolítica donde todo el código está junto, cada microservicio se encarga de una función específica del negocio y puede desarrollarse, desplegarse y escalar por separado.

Imagina que estás construyendo una app, pero en lugar de tener todo el código en un solo lugar, lo divides en pequeñas piezas. Podrías tener un microservicio para la autenticación de usuarios, otro para las exportaciones de datos, y otro para comunicaciones con APIs de terceros. Cada uno de estos servicios puede ser desarrollado en diferentes lenguajes o tecnologías, y si necesitas mejorar o desplegar un cambio en uno de ellos, puedes hacerlo sin tener que tocar el resto de la aplicación.

Otra ventaja es que si un microservicio falla, no tira abajo toda la app, y puedes darle más recursos de hardware sólo a las partes que lo necesiten, lo que hace que sea más eficiente. Esto es fundamental para no tener que contratar servidores más potentes (escalado vertical) o más cantidad de servidores (escalado horizontal) a medida que más usuarios consumen la aplicación.

### Caso de Uso: Generación de PDFs
Por ejemplo, nuestro primer microservicio fue una función que genera PDFs a partir de una plantilla en HTML, y devolvía el documento listo para enviar al usuario. Esta funcionalidad estaba incorporada a nuestro monolito pero no podía atender a múltiples ejecuciones en simultáneo; bastaba con solo un par de usuarios imprimiendo PDFs a la vez para que el servidor agotara sus recursos. Tras migrar esto a un microservicio, ahora podemos generar miles de documentos en simultáneo y solo pagar por el tiempo que esos servicios estén prendidos.


## AWS Lambda - Functions as a service
Lambda es un servicio de Amazon Web Services que permite ejecutar código como servicio. Es decir, podemos mover un trozo del código de la aplicación, como una función específica o un servicio completo, y ponerlo dentro de una Lambda. Luego podemos ejecutarla bajo demanda, y AWS solo nos cobrará por el tiempo en el que estuvo funcionando.

AWS Lambda es perfecta para una arquitectura de microservicios, porque ofrece varias ventajas técnicas:

- **Capacidad de Escalado Automático:** Escala automáticamente en función de la demanda hasta decenas de miles de ejecuciones en simultáneo. A medida que los eventos que activan las funciones Lambda aumentan, el servicio maneja automáticamente la creación de nuevas instancias de la función para satisfacerla, sin tener que aprovisionar servidores ni intervenir manualmente.

- **Simplicidad en el Despliegue y Gestión de Código:** Con AWS Lambda, los desarrolladores solo necesitamos enfocarnos en el código de la función, el cual puede estar programado en C#, Go, Java, Node.js, PowerShell, Python y Ruby. Cuando queremos publicar un cambio, solo desplegamos el código en cuestión, sin necesidad de complejos pipelines o procesos manuales.

- **Tolerancia a Fallos:** AWS Lambda utiliza una infraestructura gestionada para ejecutar funciones de manera eficiente. Cuando se invoca una función, AWS Lambda descarga el código de la función, aprovisiona los recursos necesarios (como contenedores) para ejecutar el código y luego la ejecuta. Cualquier fallo potencial que podría venir por la infraestructura es abordado por el servicio de forma automática y transparente, ya sea realizando reintentos automáticos, gestionando los contenedores y su ciclo de vida, o distribuyendo la infraestructura a nivel global para asegurar la máxima disponibilidad.


## ¿Podría una aplicación ser 100% Lambdas y no tener servidores?

La respuesta corta es: “Si, pero…”

Aprendimos cómo hacerlo pero también que no era lo más adecuado para nosotros.
Luego de que migramos las funciones más pesadas de nuestro monolito, empezamos a imaginar un mundo ideal en el que toda la aplicación esté en microservicios y solo paguemos por el uso que cada cliente haga. Simplificadamente, una aplicación de software maneja:

- Rutas (distintos endpoints)
- Autenticación, permisos y control de acceso
- Una base de datos con información del negocio
- Archivos
- Seguridad
- Y todas las funciones/servicios que nos permiten resolver las necesidades de nuestros usuarios.

### Implementación Inicial y Prueba Piloto
Exploramos [API Gateway](https://aws.amazon.com/es/api-gateway/) para gestionar rutas, IAM y [Cognito](https://aws.amazon.com/es/cognito/) para control de permisos y usuarios, y S3 para alojar archivos. Antes de implementarlo en funcionalidades productivas, realicé un piloto durante un fin de semana para validar que la idea era viable y podíamos efectivamente crear una aplicación 100% con microservicios. 

 [***Aquí te dejo un link al proyecto en GitHub***](https://github.com/nahueldaima/aws-microservices-demo-personal-finances/) para que veas la prueba piloto que hice para el backend de una aplicación de finanzas personales.

## Principales aprendizajes y desafíos

Tras el piloto exitoso, al día siguiente comenzamos a trasladar partes del monolito, como rutas, manejo de archivos, autenticación, entre otros, a microservicios.

Luego de algunos días, todo estaba en su lugar y lanzamos a producción.

Los primeros problemas no tardaron en aparecer:

### Cold both, o inicialización en frío
Las Lambdas no son servidores con la aplicación encendida; son literalmente un trozo de código que debe insertarse en algún lado para ejecutarse. AWS recupera ese código de un repositorio, inicializa un contenedor virtual, lo aprovisiona de recursos, inserta el código y lo ejecuta. 

Todo eso toma MUCHO tiempo. 

Un usuario que hace un request para actualizar su información de perfil, pasó de 300 ms en nuestro monolito a 2.5 segundos en la nueva arquitectura. 

Un PDF de una etiqueta logística de una página que antes se generaba en 450 ms, pasamos a devolverla desde 1,5 segundos hasta 4 segundos, sin ser consistentes con el tiempo de respuesta.

AWS ejecuta algunas optimizaciones si invocamos la misma Lambda en un periodo corto de tiempo, reutilizando el contenedor ya inicializado. 

Esto quiere decir que el primer usuario que solicitó el servicio tuvo que esperar algunos segundos y los siguientes ya no, pero luego si por algún tiempo nadie lo ejecuta, entonces el siguiente usuario nuevamente tendrá que esperar un cold both.

AWS ofrece como alternativa para compensar esto, pagar por una Lambda aprovisionada de forma permanente, pero a un costo aún superior a tener una instancia de EC2 que contenga toda la aplicación.
<br><br>

### Lambdas ejecutándose todo el tiempo
Lambdas están pensadas para encenderse, resolver una función y luego apagarse. Usarlas para funciones que se ejecutan constantemente puede agotar rápidamente los beneficios y aumentar los costos.

Nuestro primer error aquí fue utilizar este servicio para procesar una cola de mensajes que contenía logs que queríamos insertar en Cloudwatch y en una base de datos. 

Como toda nuestra aplicación genera información para ser logueada, esa cola de mensajes llegaba rápidamente a cientos de miles de mensajes, y comenzamos a ver como la Lambda que resolvía este proceso, estaba todo el tiempo ejecutándose. 

Rápidamente agotamos el free tier de AWS y la factura de ese mes fue dura, muy dura.

Lo resolvimos migrando esta función a un servidor pequeño, que se encarga de ejecutar microservicios livianos, que necesitan estar encendidos todo el tiempo. Pagamos lo mínimo de lo mínimo que podemos de una EC2.
<br>

### El timeout, una forma de quemar euros
Lambda permite configurar memoria ram, y un tiempo máximo de ejecución del microservicio, que en el caso de no finalizar, corta la ejecución y sale por error.

Un viernes, desde un aeropuerto en Bruselas, minutos antes de comenzar un viaje en avión de 14 horas a Japón, desplegué una Lambda que tenía que procesar una serie de mensajes que recibimos de nuestras integraciones con operadores logísticos, para traducirlos, clasificarlos y anexarlos a cada expedición. 
Esta función iba a recibir una gran cantidad de mensajes en simultáneo, y el procesamiento podía ser lento.

Para estar seguro que iba a terminar en todos los casos, configure un timeout de 15 minutos (el máximo que admite AWS para una Lambda).

El código se veía bien, las pruebas eran correctas, desplegué el código, y salí de viaje.

El lunes por la mañana en Asia, (aun de noche en Europa), revisando el rendimiento me encontré con que había un fallo en las ejecuciones, y que la forma en que había implementado mi código, nunca finalizaba la ejecución de la Lambda. 

Es decir, cada vez que se llamaba este microservicio, una Lambda quedaba encendida por 15 minutos. 

**Un desastre, dos días a ese ritmo, costaron miles de euros.**

Aprendí dos cosas:

> No despleguar los viernes (menos antes de subirte a un avión)

> Si un microservicio requiere más de 3 o 4 minutos para resolver la función, probablemente Lambda no es la mejor alternativa.

<br>

### Los payloads no son infinitos
Me refiero a payload como la información que le enviamos a una Lambda para ejecutarla y la que ésta devuelve como respuesta.

Esto no es ilimitado, a la fecha el máximo es 20 MB.

Algunas de nuestras funciones estuvieron rindiendo adecuadamente cuando teníamos una escala pequeña, pero cuando más y más usuarios comenzaron a consumir nuestros microservicios, nos encontramos con arquitecturas que terminaban intentando enviar varios megabytes a Lambda o éstas intentando responder con payloads gigantes. 

Un ejemplo de esto fue cuando intentamos recuperar unos documentos logísticos de un transportista que los almacena en un FTP. 

Las primeras versiones que enviaban a la Lambda algunas decenas de números de expediciones para juntar con los ficheros y recuperar los documentos, funcionaron perfecto, cuando devolvemos unos 15 o 20 pdfs de algunos KBs.

Cuando escaló nuestra aplicación y de pronto enviabamos cientos o miles de expediciones, ya no podíamos devolver los archivos en la respuesta sin violar el límite de los payloads.

Nuestra solución a esto, tuvo 2 partes:
- Invocar más Lambdas en simultáneo pero con payloads más pequeños.
- Cuando por la naturaleza del microservicio esto no es viable, subimos la información a un archivo temporal a S3 y nos intercambiamos la URI de acceso.

<br>

### ¿Copiar y pegar las mismas utils en cada Lambda?
En cualquier caso que programes múltiples microservicios, vas a encontrarte con pequeñas funciones que necesitas en más de una Lambda.

Un desarrollador novato, copiará esa función a cada Lambda en que lo necesite, pero eso no es una práctica recomendada.

Lambda provee una forma de compartir código entre diferentes microservicios, una especie de librería con funciones que puedes anexar a cada Lambda y utilizar, sin necesidad de repetir código.

Esto se llama “capas”. Consiste en crear un repositorio en AWS Lambda, subir un conjunto de funciones, y luego en la configuración de cada Lambda que vayamos a necesitarlas, solo referenciarlas en la sección de “capas”.

Lo que hace AWS por detrás al momento de aprovisionar una Lambda, es que aparte de recuperar el código del microservicio, busca todas las capas que estén vinculadas, recupera ese código y pone todo en el runtime antes de ejecutar la función. 

Una ventaja añadida de estas capas, es que mantienen su propio versionado. Cuando las referenciamos en Lambda siempre especificamos qué versión, y de esta forma nos aseguramos que aun si actualizamos una capa, no afectamos al microservicio que este utilizando una versión “estable” anterior.

Este enfoque nos resultó eficiente los primeros dos años, pero luego las capas fueron creciendo en cantidad de código. Primero separamos algunas funciones por afinidad y creamos más de una capa, pero con el tiempo nos encontramos con otra limitación de AWS.

Resulta que el tamaño del código del microservicio, más cualquier librería adicional, más la capa genérica, no puede superar los 250MB. Entonces si tienes una capa genérica con librerías de terceros, más otras que puedes necesitar específicamente para tu microservicio, rápidamente puedes llegar al límite.

Resolvimos esto, migrando nuestras capas a repositorios propios, y solo instalamos en las Lambdas las funciones y paquetes que necesitamos, sin tener que inyectar toda la capa con su código, ni todas las librerías en cada ejecución.

<br><br>

### La factura de AWS y sus ítems desconocidos

Ya en el tercer año, luego de cada optimización, aprendizaje y re diseño de la arquitectura, terminamos con un hermoso enjambre de microservicios que resuelven los principales problemas de nuestra aplicación.

**Pero AWS tenía una carta más bajo la manga. En nuestra factura apareció un cargo extraño: “EC2-Other”**

Mes a mes, mientras escalamos la cantidad de expediciones en [Tookane](https://tookane.com/), este ítem de la factura iba creciendo y creciendo. Y resulta que AWS junta varios ítems transversales a los servicios que consumimos y los pone en esa categoría.

Tras algunos llamados con AWS para solicitar aclaraciones con este punto, e investigando en la documentación, no dimos con una respuesta clara de qué estaba generando este incremento.

Contratamos al [Pelado Nerd](https://peladonerd.com/), un consultor en Sys Admins, y nos ayudó a entender de qué iba la cuestión. 

Resulta que AWS cobra por todo el tráfico de internet que utiliza la infraestructura, y enviar datos a un microservicio, descargar librerías en cada invocación, y devolver grandes cantidades de datos procesadas, son terabytes de tráfico cada mes. 

Si, AWS cobra por el internet que consumís. 🙁

Solucionamos parcialmente esto metiendo todas las lambdas dentro de una red privada, e intentando minimizar el tráfico externo, pero este es el único punto que quedó pendiente para lograr tener una infraestructura de microservicios 100% de coste variable.

### Como continuar
Si estás considerando usar AWS Lambdas y microservicios, espero que nuestra experiencia te sea útil. Los beneficios son grandes, pero hay desafíos que deben manejarse con cuidado. 

Si tienes dudas o necesitas ejemplos, escríbeme. ¡Intentaré ayudarte en lo que pueda!
