/* libros.js – modal de pago + descarga tras verificación */
(() => {
  const modal       = document.getElementById('payModal');
  const modalTitle  = document.getElementById('modalBookTitle');
  const spanClose   = document.querySelector('.close');
  const mobileBtn   = document.getElementById('mobileBtn');
  /*const confirmBtn  = document.getElementById('confirmPayBtn');*/

  let currentBook   = {}; // {title, price, file}

/* Mapeo exacto: texto del H3 → archivo PDF */
const pdfMap = {
  'DIOS Y EL PROFETA una conexión entre cielo y tierra': 'diosyelprofeta.pdf',
  'ESTRATEGIAS SATÁNICAS conociendo a tu enemigo': 'estrategiassatanicas.pdf'
};

  /* Abrir modal al pulsar cualquier botón Comprar */
  document.addEventListener('click', e => {
    if (!e.target.matches('.buy-button')) return;
    const card   = e.target.closest('.book-card');
    const title  = card.querySelector('h3').textContent.trim();
    const price  = card.querySelector('.price').textContent.trim();

    currentBook = { title, price, file: pdfMap[title] };
    modalTitle.textContent = `${title} – ${price}`;
    modal.classList.add('active');

    renderPayPalButton(price); // renderiza botones PayPal
  });

  /* Cerrar modal */
  spanClose.onclick = () => modal.classList.remove('active');
  window.onclick    = e => { if (e.target === modal) modal.classList.remove('active'); };

  /* Pago Móvil – WhatsApp */
  mobileBtn.onclick = () => {
    const msg = `Hola, quiero adquirir el libro "${currentBook.title}" con un valor de ${currentBook.price}.`;
    const url = `https://wa.me/584242997324?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  /* Simulación: verificar pago y descargar PDF */
  /*confirmBtn.onclick = () => {
    if (!currentBook.file) return alert('No se encontró el archivo.');
    const link = document.createElement('a');
    link.href  = `/files/${currentBook.file}`;
    link.download = currentBook.file;
    document.body.appendChild(link);
    link.click();
    link.remove();
    modal.classList.remove('active');
  };*/


  /* Renderiza botones de PayPal (sandbox) */
  function renderPayPalButton(amount) {
  const container = document.getElementById('paypal-button-container');
  container.innerHTML = ''; // limpia si ya se había renderizado

  window.paypal.Buttons({
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: { value: amount.replace('$', '') }
        }]
      });
    },
    onApprove: (data, actions) => {
      return actions.order.capture().then(details => {
        alert(`Pago aprobado por ${details.payer.name.given_name}`);
        downloadPDF(currentBook.file); // ⬅ descarga real
      });
    },
    onError: err => {
      console.error(err);
      alert('Ocurrió un error con PayPal.');
    }
  }).render('#paypal-button-container');
}

/* ⬇ Descarga real del PDF */
function downloadPDF(fileName) {
  const link = document.createElement('a');
  link.href = `./uploads/files/${fileName}`;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  modal.classList.remove('active'); // cierra modal
}
})();


/* ===== MODAL RESEÑA ===== */
(() => {
  const reviews = {
    'DIOS Y EL PROFETA una conexión entre cielo y tierra':  `
                                          Contenido

Dedicatoria.
Sobre el autor.
Introducción.
Importancia del ministerio Profético.
Que es un profeta o vidente.
     ¿Qué es un profeta?
     ¿Qué es ser profeta según el termino hebreo?
     Tipos de profetas.
Que es Profecía.
     Pensamiento del judaísmo sobre la profecía.
     Para quien era la profecía.
     Las parábolas como medios para los mensajes proféticos.
     Características generales de la profecía.
     Juzgar la profecía.
     Principios para responder apropiadamente a la palabra profética.
Que es lo profético.
     Interpretación y aplicación profética.
     Propósito profético.
     Destino profético.
     Identidad profética.
     Adoración profética.
     Decreto profético.
     Intercesión profética.
     Enseñanza profética.
Inicios (historia) de los profetas o profetismo y su importancia.
     Parte 1 – de Abrahán a Moisés.
     Parte 2 – Samuel.
     Parte 3 – De Amos hasta Malaquías.
     Los puntos proféticos de la historia
     Los Profetas y el Exilio
     ¿Quiénes eran estos profetas?
Llamado profético.
Escuela de profetas.
La palabra profética más segura (LA BIBLIA).
Don profético y oficio del profeta.
     Don de profecía.
     Oficio del Profeta.
     Los límites del oficio profético: vivir bajo autoridad.
Oposición a los profetas.
Sabiduría vs profecía.
Características de los profetas de Dios.
     Requisitos que distinguen a los verdaderos profetas.
     Que significa ser un profeta de Dios.
     Profetas verdaderos y engaños satánicos.
La profecía y los estados de ánimo.
Profetas mayores y profetas menores.
Como el profeta recibe la palabra profética de parte del padre.
     Fuentes de impresiones.
     Medios de la revelación.
Diferencias entre Don de Ciencia y Don de Profecía.
Tiempos proféticos.
     Los tiempos Kairós y Cronos.
     El verdadero tiempo de Dios.
     Los diferentes tipos de cumplimientos.
     Problemas con el tiempo.
La ley del doble cumplimiento.
Profecías condicionales.
     ¿Podría decirse que todas las declaraciones proféticas son condicionales?
     La relación entre los aspectos condicionales e incondicionales.
Los falsos profetas.
     La fuente de los problemas en lo profético.
     El origen de todos los problemas relacionados con la profecía.
     Perfil de un falso profeta.
     Como reconocer a un falso profeta.
     Tipos de falsos profetas.
     Otras características de los falsos profetas.
     Falsa autoridad espiritual.
     La adivinación.
     Profecías sin inspiración.
     Falsos profetas y los gobiernos.
¿hay o no hay profetas hoy en día?
El Mashiaj y su rol profético.
Conclusión.
Bibliografía.


                                          Dedicatoria

    Dedicado a mi padre Luis Marrero que ha sido un brazo de apoyo en estos tiempos tan difíciles; a la memoria de mi madre Leída Molina que en vida lo dio todo por mí y mis hermanos; a la pastora Belkis Diaz que durante sus años de vida me ayudo en mi camino espiritual y sobre todo dedicado a mi padre celestial YHWH, padre de nuestro señor Jesucristo y Dios sobre todas las cosas.


                                          Introducción

    29 y Moisés le respondió: ¿Tienes tú celos por mí? Ojalá todo el pueblo de Jehová fuese profeta, y que Jehová pusiera su espíritu sobre ellos. (Numero 11:29. NVI).

    En este nuevo estudio realizado por el deseo de Dios generado en mi corazón, estudiaremos lo que son los profetas, las profecías y el cumplimiento de esta.

    Para nadie es un secreto lo que actualmente está sucediendo en el mundo hoy en día, donde las personas cada día desconfían más de las santas escrituras, de los ministros de Dios y sobre todo de los que son llamados profetas. Debido a tantos desaciertos en los dichos de la boca de muchos, que no se ajusta a su carácter de vida y que es evidente ante el mundo que los rodea, las palabras y los hechos se vuelven inciertos por la desconfianza que estos mismos generan. También la falta de buena información y verdadera a la luz de las escrituras nos lleva por un túnel vacío y oscuro en el que muchas veces no encontramos una salida.

    El objetivo principal es que el lector tenga buena información con respecto a lo es un profeta. Así mismo estaremos aclarando preguntas tales como: ¿cómo operan? ¿cómo es que dicho hombre llego hacer profeta? ¿cómo reconocer que lo que dice es verdad? y ¿cómo comprobarlo por las escrituras? ¿qué pasaría si lo que dice no se cumple, será que no es profeta o fui yo que no entendió e hice las cosas mal? Preguntas como estas nos hacemos todos, ante tanta confusión e información que hay en el mundo y a muchos de nosotros no nos queda claro.

    Este material le servirá al lector de apoyo para que conozca, entienda y comprenda como Dios trabaja con los profetas en el mundo y, también nos servirá para reconocer en nosotros mismos si hay un Don o Ministerio profético.

    Otro de los objetivos, es que, se busca de abarcar todos los puntos posibles para que todas las preguntas y dudas sean respondidas a medida que usted vaya leyendo, porque si mis hermanos, las preguntas son demasiadas y las respuestas que muchas veces obtenemos no son las que esperamos. Pero damos gracias a Dios, por qué, él es, el que pone tanto el querer como el hacer en nosotros de su buena voluntad y usted, querido lector, tiene en sus manos tanta información cómo se necesita para responder a todas las preguntas que guardamos en nuestro corazón, pero, que no hacemos por temor a hacer juzgados por el sistema el cual muchas veces presta más atención a las emociones del momento que a las palabras del padre plasmadas en las escrituras; o por pena hacer burlados, porque, muchas veces llegamos a pensar que la pregunta que haríamos sería muy tonta y no queremos ser el hazmerreír del momento; y, podrían ser muchas las razones por las cuales nos quedamos callados ante tanta confusión, con demasiadas preguntas y pocas respuestas.
    
    
                            Importancia del ministerio Profético

    29 y Moisés le respondió: ¿Tienes tú celos por mí? Ojalá todo el pueblo de Jehová fuese profeta, y que Jehová pusiera su espíritu sobre ellos. NVI.
Numero 11:29.

    Uno de los ministerios más importantes que ha operado de una forma continua intrínsecamente dentro del plan del reino de Dios para su pueblo, es el ministerio del profeta.  En el libro de hebreos capítulo 1:1 declara que Dios hablo muchas veces y de muchas maneras a los padres a través de la boca de los profetas que el levanto en las diferentes generaciones.

    Dios coloco su mensaje para su pueblo Israel en la boca de los profetas y estos transmitieron el Davar del Eterno con su respaldo divino. Las escrituras son el resultado de esa revelación profética de Dios, su palabra fue catalogada como la palabra profética más segura por el Apóstol Pedro a la hora de alumbrar nuestro camino y destino. Así que lo que usted lee dentro de ese libro llamado biblia es de carácter profético.

    En estos tiempos es importante que el pueblo de Dios pueda tener un mayor entendimiento sobre lo profético desde la perspectiva del Reino de Dios, para ello debemos recurrir a la palabra de Dios donde tenemos la fuente más fidedigna, fehaciente y segura sobre este tema.

    Desde el año 80 aproximadamente el ministerio profético ha tomado un auge dentro de las comunidades cristianas, siendo hoy por hoy uno de los ministerios más buscado para grandes eventos como; congresos, aniversarios y seminarios.

    En la carta del Apóstol Pablo a los Efesios (4:11), les indica sobre los dones ministeriales que operan dentro del cuerpo de Cristo para capacitar y edificar a los santos para la obra del ministerio, entre ellos les hace mención del ministerio profético. Así que desde este punto podemos decir que el ministerio profético está vigente y es fundamental como los otros ministerios para el crecimiento del cuerpo de Cristo.

    Todos los dones ministeriales fueron dados por soberanía y gracia de Jesucristo, fue nuestro Señor y Salvador el que escogió e impartió a los hombres estos dones espirituales para cumplir una función específica dentro del pueblo de Dios.  De esto podemos decir que, para cumplir el ministerio profético como cualquiera de los otros ministerios, tiene que haber sido elegido y autorizado por Dios en pleno ejercicio de su soberanía.

    Una conexión entre cielo y tierra, algo que no ha dejado de asombrarnos, la conexión entre Dios y el ministerio profético aquí en la tierra. Pero más que una conexión se ha vuelto un “amor eterno”. La importancia del Don, el ministerio y los hombres que lo ejercen es tan grande que el libro de amos 3: 7 nos revela que Dios no hace nada en la tierra sin antes anunciárselo a sus siervos los profetas. Y le digo otra cosa querido lector; antes de que se conociesen los ministerios, los dones o cualquier otra cosa que se conozca hoy día, los profetas ya se mencionaban, ya Dios les comunicaba sus palabras y les revelaba su voluntad. Esto ha sido una conexión entre el cielo y la tierra; un amor eterno; Dios y los profetas, un solo espíritu. me atrevo a decir que el ministerio más importante en las escrituras es, sin duda alguna, el ministerio profético. Fue antes de que hubiera ley, ha sido durante la ley, pero, sobre todo, sigue siendo, durante la gracia.

    Ha sido de tanta importancia a la humanidad que, también se ha vuelto uno de los ministerios más atacados y conflictivos debido a que; cuando Dios les revela sus pecados a las personas, están aquellos que se molestan porque no están dispuestos a cambiar y tampoco quieren entender que es Dios mostrándoles su amor por muy duro que parezca.

    La importancia del ministerio profético es de tal grado, que es mi pensar, que no hay un área de la vida y evento sucedido en la tierra en donde el ministerio profético no haya tenido participación; todo ha sido anunciado y la biblia que es de carácter profético habla de cada hecho importante de la vida. Así que, a estas alturas negar el ministerio profético como algunos lo hacen, sería como negar que el sol no genera calor, aunque lo sientas todos los días.
    `,


    'ESTRATEGIAS SATÁNICAS conociendo a tu enemigo': `
                                        Contenido

Dedicatoria.
Sobre el autor.

PARTE 1: INTRODUCCIÓN A LAS ESTRATEGIAS.

Introducción.
¿Qué son las estrategias satánicas?
El pecado, una trampa del diablo.
     Que es pecado.
     Hagamos un análisis del pecado, su origen y consecuencias.
     León rugiente.
¿Porque satanás odia tanto a la humanidad?

PARTE 2: LAS ESTRATEGIAS.

Tentaciones.
     Dinero.
     Pasiones y deseos.
     Hambre y sed.
Artes Mágicas (Brujería - Ocultismo).
     Adulterio Espiritual.
     ¿Un cristiano puede estar embrujado o endemoniado?
     Después de haberlo conocido.
Espionaje.
La ignorancia.
Dardos (ataques a la mente).
Distracciones.
Autoconfianza.
Mentiras, Engaños, Calumnias, Chismes y Rumores.
Contención.
División.
Desánimo.
Depresión.
Señales Milagrosas.
Espíritu de estupor (Velo espiritual).
Quinta columna (Judas).
Caballo de troya.
Análisis de Genesis capítulo 3.
Análisis de Josué capítulo 9.
Análisis de Nehemías capítulo 6.
Como trabajan las maldiciones generacionales.
     Hábitos.
     Inocentes culpables (pecados heredados).
     Todo nuevo.
Resístelo hasta que huya.
Conclusión.


                                      Dedicatoria

    Dedicado a todas aquellas personas, que en algún momento de su vida han sido víctimas del diablo para ser destruidos, pero gracias a nuestro señor Jesucristo fueron liberados y saben perfectamente que satanás es un estratega del mal. Dedicados a todos y cada una de las personas que desean conocer las verdades del reino y que sin cesar lo buscan como a un tesoro escondido.


                                    Sobre el autor

    Por gracia y Misericordia ministro del Reino de Dios, llevo ya 4 años ejerciendo como Maestro de la palabra. Pero desde el año 2010 cuando mi señor Jesucristo me llamo para formar parte de sus guerreros y hasta el día de hoy, agosto del 2025, he estado sirviendo al señor con ese fuego interno que él puso dentro de mí.

    Tengo 32 años y actualmente resido en Venezuela, y asisto en la “Comunidad Cristiana Jehová Nissi” en el estado portuguesa, en un pueblo llamado Boconoito. Aquí he estado estos últimos 15 años de mi vida sirviéndole al Señor. Mantengo un estudio bíblico todas las semanas en donde enseñamos las verdades del reino de los cielos y respondemos a cada pregunta inquietante por parte de los oyentes.


                                      Introducción

“Para que Satanás no tome ventaja sobre nosotros, pues no ignoramos sus planes.” (2 Corintios 2:11). NVI.

    La ignorancia ha sido y sigue siendo una de las armas más letales del enemigo. Las cuales usa contra la iglesia de Dios. En este nuevo estudio generado por Dios en mi corazón, estudiaremos lo que son las “ESTRATEGIAS SATANICAS” nada más y nada menos que las tácticas que el Diablo usa para atacar a los hermanos de las congregaciones, los pastores y demás ministros y a la iglesia de cristo en general. Con las cuales ha hecho que muchos caigan en todo tipo de pecado, hundiéndolos en el dolor, en el sufrimiento, en depresión, en angustia, en pobreza, haciéndolos entrar en un terreno de maldición e incluso llevando a muchos a la muerte física y espiritual.

    Debemos tener claro las palabras de Jesús, cuando dijo que el diablo anda como un león rugiente buscando a quien devorar, pero, eso no significa que se pueda comer a todos los que él quiera, ejemplo: al igual que un león hambriento que observa a todos los animales a su alrededor y sabe que no todos son presas fáciles porque son astutos y que muchos otros le darán pelea sea que se encuentren solos o en manadas, porque, hay animales que se escapan (se salvan de ser devorados) no solo por su fuerza, si no por su velocidad; otros no solo por su velocidad, porque pueden ser incluso hasta más lentos que el león, pero son más inteligentes que él; otros por que vuelan. Así mismo hay otros que se convierten en presas siendo más rápidos, pero no astutos; otros siendo más fuertes, pero no inteligentes.

    Cada palabra y advertencia por parte de nuestro señor Jesucristo, es un claro indicativo de que el enemigo no anda jugando y que hay que tomarlo muy enserio y no hacer caso omiso a las advertencias divinas, ya que, podríamos ser presa fáciles listos para ser devorados.

    Así mismo, en las escrituras se nos revelan todas estrategias del enemigo, las cuales han sido siempre las mismas y la única diferencia de hoy día es que muchos las ignoran; eso se debe a que ignoran las escrituras. Pero Dios en su palabra también nos dejó las armas para combatirlo. Entonces la única manera de hacer frente a nuestro enemigo el Diablo y sus demonios, es: conociendo las escrituras. Porque la ignorancia de ella se convertirá en la peor de las trampas que el enemigo pueda usar en contra de los creyentes.

    Cuando Dios pone el deseo de escribir un libro en el corazón de un hombre, es para que la persona pueda entender y comprender de una forma explicativa lo que dice su palabra. Por lo tanto, querido lector, este libro tiene como objetivo su aprendizaje y practica en el mundo real, para que no te conviertas en esa presa fácil de atrapar y devorar, si no, para que ágil mente escapes con la sabiduría que Dios ya te dio por medio del Espíritu Santo.


                          ¿Qué son las estrategias satánicas?

¿Qué es una estrategia?

    Es un plan o método por ejecutar, para un fin especifico, el cual lleva una planificación cuidadosa y detallada de cada paso a realizar para alcanzar dicho objetivo. El objetivo puede ser militar, social, económico, familiar, estudios o de índole espiritual.

    Satanás, de igual manera, planifica sus estrategias desde su reino, para destruir a los que están en cristo, a la iglesia, a todo aquel que no le pertenece, en fin, a toda la humanidad. Porque si mis hermanos, él nos odia a todos, aunque a muchos pareciera no importarles; como aquellos que lo adoran y le sirven y de paso lo defienden, claro está, que esas personas están ciegas espiritualmente y siendo engañados. 

    Recordemos lo que dice las escrituras: que este mundo fue hecho del que no se veía (hebreos 11:3) y así como es arriba es abajo, por lo tanto, eso quiere decir que de la misma manera que uno puede planificar en este plano físico, en el mundo espiritual es igual. Por lo que analicemos un poco como es desarrollar un plan, pero desde el mundo espiritual hacia el físico.

•	Análisis del entorno interno y externo de la organización.

En este caso el entorno es el mundo (plano físico) en que todos vivimos y que aplica para creyentes y no creyentes, pero independientemente también puede ser la iglesia en general, la casa en donde vives, el lugar donde trabajamos y así cada sitio que frecuentamos. Porque, para poder desarrollar bien una estrategia se tiene que conocer todo sobre el enemigo, en este caso nosotros somos los enemigos de satanás. Así que el evaluará todos los sitios posibles para poder desarrollar mejor sus estrategias; porque de esa manera sabrá que te gusta, que no y el porqué. Buscará todos los puntos débiles de cada lugar, pero también sus fortalezas.

•	Identificación de oportunidades y amenazas.

Las oportunidades son las debilidades que el lugar representa para el enemigo y las amenazas son las fortalezas que tiene las cuales representan un obstáculo para él. Pero también están las fortalezas y debilidades de cada uno; las cuales son identificadas por el enemigo, debido a, el análisis como resultados de la vigilancia y observación constante por parte de sus servidores los demonios y de aquellos que estando ciegos espiritualmente son objetos de usos directa e indirectamente por los demonios y principados, los cuales les rinden cuenta a satanás.

El enemigo tiene su propio laboratorio de “Ingeniería Social” y sus propios centros de datos espirituales; en donde tiene toda la información del hombre, desde el día en que hablo con el primer hombre en el huerto del edén.

•	Asignación de recursos.

El enemigo no escatima en gastos con tal de lograr sus objetivos, primero: los demonios no se cansan; segundo: no tienen mala memoria, como para no recordar lo que tienen que hacer y como tienen que hacerlo y a quienes pueden usar en este mundo para sus propósitos.
En este caso, el mayor recurso que ellos tienen, son aquellos que se prestan para sus propósitos. Los humanos son el recurso más importante, porque, son los recipientes perfectos para ellos poder habitar; los demás recursos como: el dinero, los metales y demás bienes materiales, para ellos quedan en segundo lugar. Porque, como seres espirituales que son, las riquezas de este mundo carecen de sentido e importancia para ellos, pero no para los que ellos quieren destruir que es a la humanidad. Por eso es por lo que, el recurso más importante para los seres espirituales son las personas y el segundo lugar quedan las riquezas.

•	Planificación

A medida de lo que ellos quieran hacer, es que planifican parar lograr sus objetivos. La forma de realizar sus planes es como cualquier otra planificación que se pueda hacer en este mundo físico. Con la diferencia que satanás y sus demonios, tienen una capacidad de pensamiento, análisis y memorización mucho mayor que la de nosotros los humanos.

•	Implementación

La implementación de sus planes va acorde el mundo le dé cabida, ya que, si por el enemigo fuera, acabaría con todos de un solo golpe, pero no lo puede hacer. Es por eso por lo que la mayoría de los planes del enemigo, empiezan con:

1.	Manipulación y control.
2.	Ganar terreno.
3.	Distorsión de la realidad (hacer ver lo anormal, normal).
4.	Invasión total.

•	Evaluación

No todo el tiempo ganan las batallas. Gracias a una iglesia que constantemente está en oración, clamando por todos. Es ahí donde los planes del diablo se caen. Claro está, él no se cansa. Algunos de sus ataques son para probarnos, para saber cómo sería una repuesta en cierta situación y lo haría una y otra vez. No todas las personas son iguales, no todas las culturas son iguales, no todos tienen el mismo entendimiento de las cosas o el mundo en general y las palabras o hechos no se interpretan igual en todos lados. Por eso, es que las estrategias son distintas. Entonces el enemigo, constantemente está evaluándonos, según sus planes y creando nuevas estrategias; por lo que debemos estar constantemente en oración y ayuno para que sus planes no se cumplan en nosotros, sino, que sean echados por tierra en el gran poder del Señor Todopoderoso.
    `
  };

  const modal   = document.createElement('div');
  modal.id      = 'reviewModal';
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content review-box">
      <span class="close">&times;</span>
      <h3 id="reviewTitle"></h3>
      <pre id="reviewText"></pre>
    </div>
  `;
  document.body.appendChild(modal);

  /* abrir */
  document.addEventListener('click', e => {
    if (!e.target.matches('.btn-review')) return;
    const title = e.target.closest('.book-card').querySelector('h3').textContent.trim();
    document.getElementById('reviewTitle').textContent = title;
    document.getElementById('reviewText').textContent  = reviews[title] || 'Reseña no disponible.';
    modal.classList.add('active');
  });

  /* cerrar */
  modal.querySelector('.close').onclick = () => modal.classList.remove('active');
  window.onclick = e => { if (e.target === modal) modal.classList.remove('active'); };
  /* cerrar al hacer click fuera del contenido */
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('active');
});
})();



