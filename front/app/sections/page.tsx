'use client';

import { useState } from 'react';
import Image from 'next/image';

const sections = [
  {
    id: 1,
    title: 'Portada',
    description: 'El cambio empieza con equilibrio',
    color: 'from-purple-500 to-purple-700',
    icon: '🎯',
    content: `
### Gender Quest: El Cambio Empieza con Equilibrio

Este proyecto tiene como objetivo explorar, cuestionar y transformar los roles de género tradicionales que moldean nuestra sociedad. A través de un enfoque académico riguroso y una metodología interactiva, buscamos contribuir a la construcción de relaciones más equitativas y justas.

**Objetivo del Proyecto**

Dar una idea clara sobre el propósito del proyecto y servir como una primera sección "abrebocas" que invite a la reflexión sobre los roles de género y las construcciones culturales que los sustentan.

**¿Por qué es importante?**

Los roles de género no son neutrales; moldean oportunidades, limitan potencial humano y perpetúan desigualdades estructurales. Este proyecto es un llamado a la acción para repensar y reconstruir nuestras relaciones, espacios y comunidades desde la equidad.

---

**Imagen destacada:** gender-quest.jpg  
**Slogan:** "El cambio empieza con equilibrio."
    `,
    showImage: true,
  },
  {
    id: 2,
    title: 'Introducción',
    description: 'Roles de Género y Construcciones Culturales',
    color: 'from-purple-600 to-purple-800',
    icon: '📖',
    content: `
### Introducción: Roles de Género y Construcciones Culturales

#### Importancia y comprensión del tema

El propósito de este documento es ofrecer una exploración crítica y reflexiva sobre los roles de género y cómo se han construido y perpetuado a lo largo del tiempo. Los roles de género son patrones de conducta, expectativas y normas sociales que se asignan a las personas en función de su sexo biológico, influyendo profundamente en la manera en que interactúan, se perciben a sí mismas y son percibidas por los demás. Desde la infancia, estos roles son transmitidos y reforzados por instituciones como la familia, la educación, los medios de comunicación y las estructuras económicas y políticas, lo que hace que parezcan "naturales" cuando, en realidad, son construcciones sociales.

La importancia de abordar este tema radica en que los roles de género no son neutrales; tienen consecuencias reales en la vida de las personas, afectando su bienestar psicológico, su acceso a oportunidades educativas y laborales, su participación en la vida pública y, en muchos casos, su seguridad física. Entender cómo estos roles se han formado, quiénes se benefician de ellos y cómo se pueden transformar es esencial para construir sociedades más justas e igualitarias. Al cuestionar y deconstruir estos roles, no solo se benefician las mujeres, sino todas las personas, independientemente de su identidad de género, ya que se abre la posibilidad de desarrollar todo su potencial sin las limitaciones impuestas por expectativas rígidas y estereotipadas.

#### Razón de los roles y evolución del tema

Los roles de género tienen sus raíces en estructuras sociales y económicas que, históricamente, asignaron funciones específicas a hombres y mujeres basándose en diferencias biológicas como la capacidad reproductiva. En sociedades preindustriales, la división del trabajo entre lo público (predominantemente masculino) y lo privado o doméstico (predominantemente femenino) respondía, en parte, a necesidades de supervivencia y organización comunitaria. Sin embargo, con el tiempo, estas divisiones se naturalizaron y se justificaron a través de discursos religiosos, filosóficos y científicos que presentaban a los hombres como más aptos para el liderazgo, la razón y el espacio público, mientras que a las mujeres se les asociaba con la emocionalidad, el cuidado y el ámbito privado.

Con la llegada de movimientos sociales y políticos, como el feminismo y los movimientos por los derechos civiles, estas estructuras comenzaron a cuestionarse de manera más sistemática. A lo largo del siglo XX y XXI, se ha evidenciado que los roles de género no son inmutables ni universales; varían significativamente entre culturas, épocas históricas y contextos socioeconómicos. Esto demuestra que son construcciones sociales y no hechos biológicos inevitables. En la actualidad, existe un creciente reconocimiento de que los roles de género pueden y deben evolucionar para reflejar los valores de equidad, respeto a la diversidad y dignidad humana.

---

**Revisado Por:** María Ignacia Castañeda  
**Fecha:** Octubre 23 de 2025
    `,
  },
  {
    id: 3,
    title: 'Marco Conceptual',
    description: 'Fundamentos teóricos y conceptos clave',
    color: 'from-pink-500 to-pink-700',
    icon: '🧠',
    content: `
### Marco Conceptual

**Esta sección está en desarrollo.**

El marco conceptual incluirá definiciones, teorías y modelos fundamentales para comprender los roles de género desde la Psicología Social.

**Temas por desarrollar:**
- Definición de género vs sexo biológico
- Teorías de socialización de género
- Construccionismo social
- Estereotipos y prejuicios de género
- Identidad de género y expresión de género
- Interseccionalidad

---

**Estado:** PENDIENTE  
**Próximamente:** Contenido completo con fundamentos teóricos rigurosos.
    `,
  },
  {
    id: 4,
    title: 'Análisis Cultural',
    description: 'Análisis de roles de género en diferentes contextos',
    color: 'from-pink-600 to-pink-800',
    icon: '🌍',
    content: `
**Realizado por: María Ignacia Castañeda G.**

Los roles de género son los papeles, conductas y actitudes que una persona asume en la sociedad según el género. El grupo social al que se pertenece determina cómo debe comportarse y relacionarse de acuerdo con las expectativas que se tengan para hombres y mujeres.

Estos roles no son naturales ni biológicos, sino construidos socialmente y, por lo tanto, pueden cambiar con el tiempo y variar entre culturas y épocas.

---

## 🏠 CONTEXTO: FAMILIA / HOGAR

A continuación, se presentan algunos roles que históricamente han desempeñado hombres y mujeres:

### Roles Asignados Tradicionalmente

**👩 MUJERES:**
- Encargada de los niños
- Sustento emocional
- Realizar el aseo general
- Preparar alimentos

**👨 HOMBRES:**
- Responsable del soporte económico
- Sustento de protección
- Toma de decisiones importantes
- Realizar trabajos de mantenimiento y reparación

---

## 🎓 CONTEXTO: UNIVERSIDAD

### Estereotipos en el Ámbito Académico

**👩 MUJERES:**
- Presentar trabajos más organizados
- Más sociables
- Más puntuales
- Rol de acompañamiento, no de liderazgo
- Apoyo emocional y mediadoras en conflictos
- Superación más rápida (Ej: Perder un parcial)

**👨 HOMBRES:**
- Desentenderse de tareas de "orden" o "detalle"
- Evitar mostrar cansancio, estrés o emociones

---

## 🧬 CONTEXTO: BIOLÓGICO

### Características Biológicas

**👩 MUJERES:**
- Cromosomas XX
- Órganos reproductivos femeninos (ovarios, útero, vagina)
- Capacidad de gestación y lactancia
- Ciclo menstrual
- Mayor proporción de grasa corporal
- Menor masa muscular promedio

**👨 HOMBRES:**
- Cromosomas XY
- Órganos reproductivos masculinos (testículos, pene, próstata)
- Producción de espermatozoides
- Mayor masa muscular promedio
- Mayor cantidad de vello corporal y facial
- Voz más grave debido a la laringe de mayor tamaño

---

**Conclusión del Análisis:**
Los roles de género no son determinaciones biológicas inevitables, sino construcciones sociales y culturales que se refuerzan a través de instituciones, expectativas y normas. Reconocer esta distinción es fundamental para promover relaciones más equitativas y liberar el potencial humano de las limitaciones impuestas por estereotipos.
    `,
  },
  {
    id: 5,
    title: 'Discusión/Reflexión',
    description: '¿Tradición o Igualdad? Un debate sobre los roles de género',
    color: 'from-cyan-500 to-cyan-700',
    icon: '💭',
    content: `
**Autores:**  
Ingrid Alexandra Garcia, Laura Juanita Mesa, David Santiago Charry, José Miguel Vargas, Juan Nicolas Vasquez

---

Los **roles de género** y las **construcciones culturales** que los sustentan son producto de procesos históricos, sociales y psicológicos complejos. Desde la niñez, las personas son socializadas en función de su sexo biológico, aprendiendo qué comportamientos, actitudes y emociones son considerados "apropiados" para hombres y mujeres. Estas expectativas no son neutrales; están cargadas de valores, jerarquías y relaciones de poder que han servido para perpetuar desigualdades estructurales entre los géneros.

Las **construcciones culturales** de género se refuerzan a través de instituciones como la familia, la educación, los medios de comunicación y las estructuras laborales y políticas. Por ejemplo, la idea de que las mujeres son "naturalmente" más empáticas o que los hombres deben ser "fuertes y racionales" no tiene base biológica sólida, sino que responde a siglos de narrativas culturales que han asignado características y roles específicos a cada género. Estos estereotipos no solo limitan el potencial humano, sino que también generan consecuencias reales en términos de acceso a oportunidades, distribución del trabajo doméstico, participación política y bienestar psicológico.

Históricamente, la **división entre tradición e igualdad** ha sido un punto de tensión central en el debate sobre género. Por un lado, las perspectivas tradicionalistas argumentan que ciertos roles de género han funcionado durante milenios y que intentar cambiarlos puede generar inestabilidad social o confusión de identidades. Por otro lado, las perspectivas igualitarias sostienen que muchos de esos roles fueron producto de contextos de opresión y que perpetuarlos significa continuar con injusticias estructurales. La pregunta clave es: ¿debemos preservar roles que históricamente han limitado la libertad y el desarrollo humano en nombre de la "tradición", o debemos evolucionar hacia modelos más equitativos que reconozcan la diversidad y el potencial de todas las personas?

Es crucial entender que las **diferencias emocionales y conductuales** entre hombres y mujeres que observamos en la sociedad no son puramente biológicas. Si bien existen diferencias sexuales en términos de hormonas y características físicas, la mayoría de las diferencias psicológicas y conductuales que asociamos con el género son producto de la socialización. Estudios en psicología del desarrollo y neurociencia han demostrado que el cerebro es altamente plástico y que las experiencias tempranas, los modelos a seguir y las expectativas sociales moldean profundamente la personalidad, las habilidades y las preferencias. Por ejemplo, las niñas no son biológicamente menos capaces en matemáticas; si existe una brecha en el desempeño, es resultado de estereotipos y falta de estímulo, no de incapacidad innata.

Finalmente, el desarrollo de la **inteligencia emocional, la empatía y la expresión de sentimientos** no debe ser exclusivo de un género. Tanto hombres como mujeres tienen la capacidad biológica y psicológica de desarrollar estas habilidades. Sin embargo, la socialización tradicional ha alentado a las mujeres a ser más expresivas emocionalmente, mientras que a los hombres se les ha enseñado a reprimir sus emociones, lo que ha tenido consecuencias negativas en su salud mental, en sus relaciones interpersonales y en su capacidad para ejercer una paternidad activa y afectiva. Promover modelos de género más flexibles y equitativos no solo es un asunto de justicia, sino también de bienestar psicológico y social para toda la comunidad.

---

**Referencias:**

- Berger, P. L., & Luckmann, T. (1968). *La construcción social de la realidad*. Amorrortu.
- Butler, J. (2007). *El género en disputa: El feminismo y la subversión de la identidad*. Paidós.
- Giddens, A. (2006). *Sociología* (5ª ed.). Alianza Editorial.
- Scott, J. W. (1990). *Gender and the Politics of History*. Columbia University Press.
- Bourdieu, P. (2000). *La dominación masculina*. Anagrama.
    `,
  },
  {
    id: 6,
    title: 'Propuesta de Cambio',
    description: 'Metodología del Quiz Interactivo',
    color: 'from-cyan-600 to-cyan-800',
    icon: '🎮',
    content: `
### Propuesta de Cambio: Metodología del Quiz Interactivo

**Autores:**  
Juan Ángel Ramírez Quinche, Maikol Pulido, John Martinez, Óscar López

---

Como propuesta de cambio se implementó un **quiz interactivo de roles genéricos** que tiene como objetivo invitar a los participantes a reflexionar sobre los estereotipos y expectativas de género presentes en nuestra sociedad. A través de preguntas situacionales relacionadas con el hogar, la sociedad y el ámbito profesional, se busca cuestionar las normas tradicionales y promover una visión más equitativa e inclusiva.

**Categorías del Quiz:**

#### **Categoría: HOGAR (3 preguntas)**

**Pregunta 1:** ¿Quién debería tomar las decisiones importantes en el hogar?  
- A) Hombre  
- B) Mujer  
- C) Ambos  

**Respuesta Correcta:** C) Ambos  
**Retroalimentación:** Las decisiones importantes deben ser compartidas y consensuadas, reflejando una relación equitativa.  
**Intención:** Desafiar la idea de que el hombre es el único líder del hogar.

---

**Pregunta 7:** ¿Quién debe asumir el rol de proveedor económico en la familia?  
- A) Hombre  
- B) Mujer  
- C) Ambos  

**Respuesta Correcta:** C) Ambos  
**Retroalimentación:** La responsabilidad económica debe ser compartida, permitiendo que ambas partes contribuyan según sus posibilidades.  
**Intención:** Cuestionar el estereotipo del hombre como único proveedor.

---

**Pregunta 10:** ¿Quién debería responsabilizarse del cuidado de los hijos?  
- A) Hombre  
- B) Mujer  
- C) Ambos  

**Respuesta Correcta:** C) Ambos  
**Retroalimentación:** El cuidado de los hijos es una responsabilidad compartida que fortalece los lazos familiares.  
**Intención:** Desafiar el estereotipo de la mujer como única cuidadora.

---

#### **Categoría: SOCIEDAD (4 preguntas)**

**Pregunta 2:** En situaciones sociales, ¿quién enfrenta mayor presión para ocultar sus emociones?  
- A) Hombre  
- B) Mujer  
- C) Ambos  

**Respuesta Correcta:** A) Hombre  
**Retroalimentación:** Los hombres enfrentan expectativas de "fortaleza emocional" que limitan su capacidad de expresar sentimientos libremente.  
**Intención:** Visibilizar la presión social sobre los hombres para reprimir emociones.

---

**Pregunta 3:** ¿Quién debe preocuparse más por su apariencia física y cuidado personal?  
- A) Hombre  
- B) Mujer  
- C) Ambos  

**Respuesta Correcta:** B) Mujer (según estereotipos sociales actuales)  
**Retroalimentación:** Aunque la sociedad presiona más a las mujeres, el autocuidado debe ser valorado en todas las personas.  
**Intención:** Evidenciar la presión estética desproporcionada sobre las mujeres.

---

**Pregunta 4:** ¿Quién es más frecuentemente juzgado por no tener hijos?  
- A) Hombre  
- B) Mujer  
- C) Ambos  

**Respuesta Correcta:** B) Mujer  
**Retroalimentación:** Las mujeres enfrentan mayor presión social para cumplir roles reproductivos y de cuidado.  
**Intención:** Cuestionar la presión sobre las mujeres respecto a la maternidad.

---

**Pregunta 9:** ¿A quién se le permite expresar vulnerabilidad sin ser estigmatizado?  
- A) Hombre  
- B) Mujer  
- C) Ambos  

**Respuesta Correcta:** B) Mujer  
**Retroalimentación:** A los hombres se les dificulta más expresar vulnerabilidad por normas de masculinidad tóxica.  
**Intención:** Reflexionar sobre cómo las normas de género afectan la expresión emocional.

---

#### **Categoría: PROFESIONAL (3 preguntas)**

**Pregunta 5:** En reuniones profesionales, ¿quién es más frecuentemente interrumpido al hablar?  
- A) Hombre  
- B) Mujer  
- C) Ambos  

**Respuesta Correcta:** B) Mujer  
**Retroalimentación:** Estudios muestran que las mujeres son interrumpidas con mayor frecuencia en espacios profesionales, reflejando dinámicas de poder.  
**Intención:** Visibilizar sesgos de género en la comunicación laboral.

---

**Pregunta 6:** ¿Quién es más cuestionado cuando llega tarde al trabajo por responsabilidades familiares?  
- A) Hombre  
- B) Mujer  
- C) Ambos  

**Respuesta Correcta:** B) Mujer  
**Retroalimentación:** Las mujeres enfrentan mayor escrutinio porque se asume que deben equilibrar familia y trabajo, mientras que los hombres reciben más comprensión.  
**Intención:** Evidenciar el doble estándar en responsabilidades laborales y familiares.

---

**Pregunta 8:** ¿Quién enfrenta más dudas sobre su capacidad de liderazgo?  
- A) Hombre  
- B) Mujer  
- C) Ambos  

**Respuesta Correcta:** B) Mujer  
**Retroalimentación:** Las mujeres líderes son frecuentemente cuestionadas en su autoridad, mientras que en hombres se asume competencia de forma automática.  
**Intención:** Cuestionar sesgos de género en el liderazgo.

---

**Conclusión de la Metodología:**

Este quiz busca generar reflexión a través de la experiencia personal, invitando a los participantes a reconocer y cuestionar los estereotipos de género presentes en su vida cotidiana. Al finalizar, se proporciona retroalimentación educativa que promueve valores de equidad, respeto y diversidad.
    `,
  },
  {
    id: 7,
    title: 'Conclusiones',
    description: 'Reflexiones finales y llamado a la acción',
    color: 'from-yellow-500 to-yellow-700',
    icon: '✨',
    content: `
Los **roles de género** moldean profundamente la estructura social, desde el hogar hasta las instituciones públicas, y su impacto trasciende lo individual para convertirse en un asunto de justicia social y desarrollo humano. A lo largo de este proyecto, hemos explorado cómo estos roles, lejos de ser naturales o inevitables, son **construcciones culturales** que pueden y deben ser transformadas para construir sociedades más equitativas, inclusivas y justas.

La transformación de los roles de género no puede ser únicamente un cambio en las leyes o en las políticas públicas; debe comenzar en los espacios más cercanos: **la familia y la comunidad**. Es en el hogar donde se transmiten los primeros mensajes sobre lo que significa ser hombre o mujer, y es allí donde las nuevas generaciones deben aprender que el respeto, la empatía, la responsabilidad compartida y la autonomía no tienen género. Las familias que adoptan modelos de crianza igualitarios, donde tanto padres como madres comparten las tareas de cuidado y provisión, están sembrando las semillas de una sociedad futura más justa.

En el **ámbito laboral y educativo**, la equidad de género no puede quedarse solo en el discurso. Es necesario implementar políticas concretas que garanticen igualdad salarial, acceso equitativo a oportunidades de liderazgo y la eliminación de sesgos en la contratación y promoción profesional. Del mismo modo, las instituciones educativas deben trabajar activamente para desmantelar estereotipos, promoviendo que todas las personas, independientemente de su género, tengan acceso pleno a todas las áreas del conocimiento y del desarrollo profesional.

La **igualdad de género no es solo un derecho humano fundamental**, sino también un pilar esencial de la democracia y del desarrollo sostenible. Las sociedades que valoran y promueven la participación equitativa de todos sus miembros en la vida política, económica y social son más prósperas, innovadoras y resilientes. La inclusión de perspectivas diversas en la toma de decisiones mejora la calidad de las políticas públicas y fortalece la cohesión social.

Es importante reconocer el **efecto multiplicador** del cambio individual y colectivo. Cada vez que una persona cuestiona un estereotipo, desafía un comentario sexista o apoya la equidad en su entorno, está contribuyendo a una transformación cultural más amplia. Estos pequeños actos de resistencia y solidaridad se acumulan y generan cambios significativos a largo plazo. Por ello, es fundamental que cada individuo se reconozca como agente de cambio, capaz de influir positivamente en su entorno.

En el contexto universitario, proyectos como este son fundamentales para visibilizar, analizar y cuestionar las normas de género. A través de iniciativas como **charlas, murales, campañas de sensibilización y actividades interactivas**, se puede generar conciencia crítica en la comunidad universitaria y motivar a estudiantes, docentes y personal administrativo a involucrarse activamente en la construcción de espacios más inclusivos y respetuosos. La universidad no es solo un lugar de formación profesional, sino también un espacio clave para el desarrollo de ciudadanía crítica y compromiso social.

Finalmente, es importante destacar que este proyecto **se hizo de manera conjunta con aportes de ingenieros de todas las ramas junto con la orientación de un psicólogo profesional**. Esta colaboración interdisciplinaria enriquece la propuesta, demostrando que la equidad de género es un tema que concierne a todas las disciplinas y que requiere del diálogo entre diversas áreas del conocimiento. Solo a través de esfuerzos colaborativos, informados y comprometidos podremos avanzar hacia una sociedad verdaderamente igualitaria.

**El cambio es posible, y comienza con cada uno de nosotros.**

---

**Llamado a la acción:** Reflexiona sobre tus propias creencias, cuestiona los estereotipos que encuentres y comprométete a construir relaciones, espacios y comunidades más equitativas. El equilibrio no es solo un ideal; es una práctica diaria que transforma vidas.
    `,
  },
  {
    id: 8,
    title: 'Referencias Bibliográficas',
    description: 'Fuentes académicas consultadas',
    color: 'from-yellow-600 to-yellow-800',
    icon: '📚',
    content: `
### Referencias Bibliográficas

**Formato APA 7ª Edición**

---

Berger, P. L., & Luckmann, T. (1968). *La construcción social de la realidad*. Amorrortu Editores.

Bourdieu, P. (2000). *La dominación masculina*. Anagrama.

Butler, J. (2007). *El género en disputa: El feminismo y la subversión de la identidad*. Paidós.

Giddens, A. (2006). *Sociología* (5ª ed.). Alianza Editorial.

Scott, J. W. (1990). *Gender and the Politics of History*. Columbia University Press.

---

**Nota:** Esta lista será ampliada con las referencias específicas de cada sección según se complete el desarrollo del proyecto. Se recomienda incluir fuentes actualizadas sobre psicología social, estudios de género, neurociencia y educación para fortalecer la base teórica del trabajo.

---

**Para consultar más recursos:**

- American Psychological Association (APA): https://www.apa.org/topics/gender
- ONU Mujeres: https://www.unwomen.org/es
- UNESCO - Género e Igualdad: https://es.unesco.org/themes/educacion-igualdad-genero

---

**Revisión y actualización continua:** Este documento será actualizado conforme se completen las secciones pendientes y se integren nuevas fuentes académicas relevantes.
    `,
  },
];

export default function SectionsPage() {
  const [selectedSection, setSelectedSection] = useState<number | null>(null);

  const section = sections.find(s => s.id === selectedSection);

  return (
    <div className="container mx-auto px-4 py-12">
      {!selectedSection ? (
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
              � Secciones Educativas
            </h1>
            <p className="text-2xl text-purple-300 font-semibold">
              Explora las 8 secciones académicas del proyecto Gender Quest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg hover:shadow-purple-500/50 hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105 border border-purple-500/30"
              >
                <div className={`h-32 bg-gradient-to-br ${section.color} flex items-center justify-center relative`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <span className="text-6xl group-hover:scale-110 transition-transform relative z-10">
                    {section.icon}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {section.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setSelectedSection(null)}
            className="mb-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ← Volver a Secciones
          </button>

          <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            <div className={`h-48 bg-gradient-to-br ${section?.color} flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="text-center text-white relative z-10">
                <div className="text-8xl mb-4 animate-bounce">{section?.icon}</div>
                <h1 className="text-4xl font-bold drop-shadow-lg">{section?.title}</h1>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
              {/* Mostrar imagen solo en la portada (sección 1) */}
              {section?.id === 1 && (
                <div className="mb-8 flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                    <Image 
                      src="/gender-quest.jpg" 
                      alt="Gender Quest - El cambio empieza con equilibrio" 
                      width={800}
                      height={400}
                      className="relative rounded-xl shadow-2xl object-cover"
                      priority
                    />
                  </div>
                </div>
              )}
              
              {/* Renderizado especial por sección */}
              {section?.id === 1 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold mb-4 flex items-center">
                      <span className="text-4xl mr-3">🎯</span>
                      Gender Quest: El Cambio Empieza con Equilibrio
                    </h2>
                    <p className="text-lg leading-relaxed">
                      Este proyecto tiene como objetivo explorar, cuestionar y transformar los roles de género tradicionales que moldean nuestra sociedad. A través de un enfoque académico riguroso y una metodología interactiva, buscamos contribuir a la construcción de relaciones más equitativas y justas.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
                      <h3 className="text-2xl font-bold text-purple-700 mb-3 flex items-center">
                        <span className="text-3xl mr-2">🎯</span>
                        Objetivo del Proyecto
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Dar una idea clara sobre el propósito del proyecto y servir como una primera sección "abrebocas" que invite a la reflexión sobre los roles de género y las construcciones culturales que los sustentan.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-pink-500">
                      <h3 className="text-2xl font-bold text-pink-700 mb-3 flex items-center">
                        <span className="text-3xl mr-2">❓</span>
                        ¿Por qué es importante?
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Los roles de género no son neutrales; moldean oportunidades, limitan potencial humano y perpetúan desigualdades estructurales. Este proyecto es un llamado a la acción para repensar y reconstruir nuestras relaciones, espacios y comunidades desde la equidad.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-xl shadow-lg text-center">
                    <p className="text-3xl font-bold mb-2">💫 Slogan del Proyecto</p>
                    <p className="text-5xl font-black italic">"El cambio empieza con equilibrio"</p>
                  </div>
                </div>
              )}

              {section?.id === 2 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">📖 Introducción: Roles de Género y Construcciones Culturales</h2>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-purple-500">
                    <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center">
                      <span className="text-3xl mr-3">🎓</span>
                      Importancia y comprensión del tema
                    </h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        El propósito de este documento es ofrecer una <strong className="text-purple-700">exploración crítica y reflexiva</strong> sobre los roles de género y cómo se han construido y perpetuado a lo largo del tiempo. Los roles de género son patrones de conducta, expectativas y normas sociales que se asignan a las personas en función de su sexo biológico, influyendo profundamente en la manera en que interactúan, se perciben a sí mismas y son percibidas por los demás.
                      </p>
                      <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                        <p className="text-purple-900">
                          <strong>Dato clave:</strong> Desde la infancia, estos roles son transmitidos y reforzados por instituciones como la familia, la educación, los medios de comunicación y las estructuras económicas y políticas, lo que hace que parezcan "naturales" cuando, en realidad, son construcciones sociales.
                        </p>
                      </div>
                      <p>
                        La importancia de abordar este tema radica en que los roles de género <strong className="text-purple-700">no son neutrales</strong>; tienen consecuencias reales en la vida de las personas, afectando su bienestar psicológico, su acceso a oportunidades educativas y laborales, su participación en la vida pública y, en muchos casos, su seguridad física.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-pink-500">
                    <h3 className="text-2xl font-bold text-pink-700 mb-4 flex items-center">
                      <span className="text-3xl mr-3">🔄</span>
                      Razón de los roles y evolución del tema
                    </h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Los roles de género tienen sus raíces en <strong className="text-pink-700">estructuras sociales y económicas</strong> que, históricamente, asignaron funciones específicas a hombres y mujeres basándose en diferencias biológicas como la capacidad reproductiva.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 my-4">
                        <div className="bg-pink-50 p-4 rounded-lg">
                          <p className="font-bold text-pink-800 mb-2">🏛️ División Histórica</p>
                          <p className="text-sm">Público (masculino) vs Privado (femenino)</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="font-bold text-purple-800 mb-2">🌊 Movimientos Sociales</p>
                          <p className="text-sm">Feminismo y derechos civiles cuestionaron estructuras</p>
                        </div>
                      </div>
                      <p>
                        En la actualidad, existe un creciente reconocimiento de que los roles de género <strong className="text-pink-700">pueden y deben evolucionar</strong> para reflejar los valores de equidad, respeto a la diversidad y dignidad humana.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {section?.id === 3 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-xl shadow-lg text-center">
                    <div className="text-6xl mb-4">🚧</div>
                    <h2 className="text-3xl font-bold mb-2">{section?.title}</h2>
                    <p className="text-xl opacity-90">{section?.description}</p>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-lg border-4 border-dashed border-yellow-400">
                    <h3 className="text-2xl font-bold text-orange-700 mb-4 text-center">
                      ⏳ Esta sección está en desarrollo
                    </h3>
                    <p className="text-gray-700 text-center mb-6">
                      Próximamente encontrarás aquí contenido completo con fundamentos teóricos rigurosos y análisis profundo.
                    </p>
                    
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
                      <p className="font-bold text-orange-800 mb-3">📋 Temas por desarrollar:</p>
                      <div className="space-y-2 text-gray-700">
                        <div className="flex items-center"><span className="mr-2">✓</span> Definición de género vs sexo biológico</div>
                        <div className="flex items-center"><span className="mr-2">✓</span> Teorías de socialización de género</div>
                        <div className="flex items-center"><span className="mr-2">✓</span> Construccionismo social</div>
                        <div className="flex items-center"><span className="mr-2">✓</span> Estereotipos y prejuicios de género</div>
                        <div className="flex items-center"><span className="mr-2">✓</span> Identidad y expresión de género</div>
                        <div className="flex items-center"><span className="mr-2">✓</span> Interseccionalidad</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {section?.id === 4 && (
                <div className="space-y-8">
                  {/* Introducción */}
                  <div className="bg-gradient-to-r from-pink-600 to-pink-800 text-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">🌍 Análisis Cultural de los Roles de Género</h2>
                    <p className="text-lg leading-relaxed mb-4">
                      Los roles de género son los papeles, conductas y actitudes que una persona asume en la sociedad según el género. El grupo social al que se pertenece determina cómo debe comportarse y relacionarse de acuerdo con las expectativas que se tengan para hombres y mujeres.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Estos roles no son naturales ni biológicos, sino construidos socialmente y, por lo tanto, pueden cambiar con el tiempo y variar entre culturas y épocas.
                    </p>
                  </div>

                  {/* Contexto: FAMILIA/HOGAR */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl shadow-xl border-l-4 border-orange-500">
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold text-orange-700 mb-4 flex items-center">
                        <span className="text-4xl mr-3">🏠</span>
                        CONTEXTO: FAMILIA / HOGAR
                      </h3>
                      <p className="text-gray-700 text-lg">
                        A continuación, se presentan algunos roles que históricamente han desempeñado hombres y mujeres:
                      </p>
                    </div>

                    <h4 className="text-2xl font-bold text-orange-800 mb-4">Roles Asignados Tradicionalmente</h4>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Mujeres */}
                      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-pink-500">
                        <h4 className="text-2xl font-bold text-pink-700 mb-4 flex items-center">
                          <span className="text-3xl mr-2">👩</span>
                          MUJERES
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start"><span className="text-pink-500 mr-2">•</span> Encargada de los niños</li>
                          <li className="flex items-start"><span className="text-pink-500 mr-2">•</span> Sustento emocional</li>
                          <li className="flex items-start"><span className="text-pink-500 mr-2">•</span> Realizar el aseo general</li>
                          <li className="flex items-start"><span className="text-pink-500 mr-2">•</span> Preparar alimentos</li>
                        </ul>
                      </div>

                      {/* Hombres */}
                      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
                        <h4 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
                          <span className="text-3xl mr-2">👨</span>
                          HOMBRES
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start"><span className="text-blue-500 mr-2">•</span> Responsable del soporte económico</li>
                          <li className="flex items-start"><span className="text-blue-500 mr-2">•</span> Sustento de protección</li>
                          <li className="flex items-start"><span className="text-blue-500 mr-2">•</span> Toma de decisiones importantes</li>
                          <li className="flex items-start"><span className="text-blue-500 mr-2">•</span> Realizar trabajos de mantenimiento y reparación</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Contexto: UNIVERSIDAD */}
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl shadow-xl border-l-4 border-purple-500">
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold text-purple-700 mb-4 flex items-center">
                        <span className="text-4xl mr-3">🎓</span>
                        CONTEXTO: UNIVERSIDAD
                      </h3>
                    </div>

                    <h4 className="text-2xl font-bold text-purple-800 mb-4">Estereotipos en el Ámbito Académico</h4>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Mujeres */}
                      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-pink-500">
                        <h4 className="text-2xl font-bold text-pink-700 mb-4 flex items-center">
                          <span className="text-3xl mr-2">👩</span>
                          MUJERES
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start"><span className="text-pink-500 mr-2">•</span> Presentar trabajos más organizados</li>
                          <li className="flex items-start"><span className="text-pink-500 mr-2">•</span> Más sociables</li>
                          <li className="flex items-start"><span className="text-pink-500 mr-2">•</span> Más puntuales</li>
                          <li className="flex items-start"><span className="text-pink-500 mr-2">•</span> Rol de acompañamiento, no de liderazgo</li>
                          <li className="flex items-start"><span className="text-pink-500 mr-2">•</span> Apoyo emocional y mediadoras en conflictos</li>
                          <li className="flex items-start"><span className="text-pink-500 mr-2">•</span> Superación más rápida (Ej: Perder un parcial)</li>
                        </ul>
                      </div>

                      {/* Hombres */}
                      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
                        <h4 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
                          <span className="text-3xl mr-2">👨</span>
                          HOMBRES
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start"><span className="text-blue-500 mr-2">•</span> Desentenderse de tareas de "orden" o "detalle"</li>
                          <li className="flex items-start"><span className="text-blue-500 mr-2">•</span> Evitar mostrar cansancio, estrés o emociones</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Contexto: BIOLÓGICO */}
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl shadow-xl border-l-4 border-green-500">
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold text-green-700 mb-4 flex items-center">
                        <span className="text-4xl mr-3">🧬</span>
                        CONTEXTO: BIOLÓGICO
                      </h3>
                    </div>

                    <h4 className="text-2xl font-bold text-green-800 mb-4">Características Biológicas</h4>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Mujeres */}
                      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-pink-500">
                        <h4 className="text-2xl font-bold text-pink-700 mb-4 flex items-center">
                          <span className="text-3xl mr-2">👩</span>
                          MUJERES
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start"><span className="text-pink-400 mr-2">◦</span> Cromosomas XX</li>
                          <li className="flex items-start"><span className="text-pink-400 mr-2">◦</span> Órganos reproductivos femeninos (ovarios, útero, vagina)</li>
                          <li className="flex items-start"><span className="text-pink-400 mr-2">◦</span> Capacidad de gestación y lactancia</li>
                          <li className="flex items-start"><span className="text-pink-400 mr-2">◦</span> Ciclo menstrual</li>
                          <li className="flex items-start"><span className="text-pink-400 mr-2">◦</span> Mayor proporción de grasa corporal</li>
                          <li className="flex items-start"><span className="text-pink-400 mr-2">◦</span> Menor masa muscular promedio</li>
                        </ul>
                      </div>

                      {/* Hombres */}
                      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
                        <h4 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
                          <span className="text-3xl mr-2">👨</span>
                          HOMBRES
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start"><span className="text-blue-400 mr-2">◦</span> Cromosomas XY</li>
                          <li className="flex items-start"><span className="text-blue-400 mr-2">◦</span> Órganos reproductivos masculinos (testículos, pene, próstata)</li>
                          <li className="flex items-start"><span className="text-blue-400 mr-2">◦</span> Producción de espermatozoides</li>
                          <li className="flex items-start"><span className="text-blue-400 mr-2">◦</span> Mayor masa muscular promedio</li>
                          <li className="flex items-start"><span className="text-blue-400 mr-2">◦</span> Mayor cantidad de vello corporal y facial</li>
                          <li className="flex items-start"><span className="text-blue-400 mr-2">◦</span> Voz más grave debido a la laringe de mayor tamaño</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Conclusión */}
                  <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold mb-4 flex items-center">
                      <span className="text-3xl mr-2">💡</span>
                      Conclusión del Análisis
                    </h3>
                    <p className="text-lg leading-relaxed">
                      Los roles de género <strong>no son determinaciones biológicas inevitables</strong>, sino construcciones sociales y culturales que se refuerzan a través de instituciones, expectativas y normas. Reconocer esta distinción es fundamental para promover relaciones más equitativas y liberar el potencial humano de las limitaciones impuestas por estereotipos.
                    </p>
                  </div>
                </div>
              )}

              {section?.id === 5 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">💭 Discusión/Reflexión</h2>
                    <p className="text-2xl font-semibold italic">¿Tradición o Igualdad? Un debate sobre los roles de género</p>
                  </div>

                  {section?.content.split('\n\n').filter(p => p.trim() && !p.includes('Autores:') && !p.includes('Referencias:') && !p.includes('Berger') && !p.startsWith('###')).map((paragraph, index) => {
                    if (!paragraph.includes('---')) {
                      return (
                        <div key={index} className="bg-gradient-to-r from-white to-cyan-50 p-6 rounded-xl shadow-lg border-l-4 border-cyan-500">
                          <p className="text-gray-800 leading-relaxed text-lg">{paragraph.split('**').map((part, i) => 
                            i % 2 === 1 ? <strong key={i} className="text-cyan-700">{part}</strong> : part
                          )}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

              {section?.id === 6 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold mb-2 flex items-center">
                      <span className="text-4xl mr-3">🎮</span>
                      Propuesta de Cambio: Metodología del Quiz Interactivo
                    </h2>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
                    <p className="text-gray-800 leading-relaxed text-lg">
                      Como propuesta de cambio se implementó un <strong className="text-purple-700">quiz interactivo de roles genéricos</strong> que tiene como objetivo invitar a los participantes a reflexionar sobre los estereotipos y expectativas de género presentes en nuestra sociedad.
                    </p>
                  </div>

                  {/* Categorías del Quiz */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition">
                      <div className="text-5xl mb-3">🏠</div>
                      <h3 className="text-2xl font-bold mb-2">HOGAR</h3>
                      <p className="text-3xl font-black">3 preguntas</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-400 to-purple-500 text-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition">
                      <div className="text-5xl mb-3">👥</div>
                      <h3 className="text-2xl font-bold mb-2">SOCIEDAD</h3>
                      <p className="text-3xl font-black">4 preguntas</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-400 to-cyan-500 text-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition">
                      <div className="text-5xl mb-3">💼</div>
                      <h3 className="text-2xl font-bold mb-2">PROFESIONAL</h3>
                      <p className="text-3xl font-black">3 preguntas</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-lg text-center">
                    <p className="text-xl font-bold">
                      🎯 Total: 10 preguntas diseñadas para cuestionar estereotipos y promover equidad
                    </p>
                  </div>

                  {/* Ejemplo de pregunta */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-xl border-4 border-purple-400">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg mb-4">
                      <p className="text-sm font-bold mb-1">Ejemplo de Pregunta - Categoría PROFESIONAL</p>
                      <p className="text-lg">❓ ¿Quién enfrenta más dudas sobre su capacidad de liderazgo?</p>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="bg-gray-700 text-white p-3 rounded-lg font-semibold">A) Hombre</div>
                      <div className="bg-green-500 text-white p-3 rounded-lg border-2 border-green-300 font-bold">✓ B) Mujer (Correcta)</div>
                      <div className="bg-gray-700 text-white p-3 rounded-lg font-semibold">C) Ambos</div>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
                      <p className="text-sm text-gray-800">
                        <strong className="text-purple-700">💡 Retroalimentación:</strong> Las mujeres líderes son frecuentemente cuestionadas en su autoridad, mientras que en hombres se asume competencia de forma automática.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {section?.id === 7 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold flex items-center">
                      <span className="text-4xl mr-3">✨</span>
                      Conclusiones
                    </h2>
                  </div>

                  {section?.content.split('\n\n').filter(p => p.trim() && !p.startsWith('#')).map((paragraph, index) => {
                    const colors = ['border-purple-500', 'border-pink-500', 'border-cyan-500', 'border-yellow-500', 'border-orange-500', 'border-red-500', 'border-green-500'];
                    const bgColors = ['from-purple-50', 'from-pink-50', 'from-cyan-50', 'from-yellow-50', 'from-orange-50', 'from-red-50', 'from-green-50'];
                    
                    if (paragraph.includes('El cambio es posible')) {
                      return (
                        <div key={index} className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-8 rounded-xl shadow-2xl text-center transform hover:scale-105 transition">
                          <p className="text-3xl font-black mb-4">🌟 {paragraph.trim().replace(/\*\*/g, '')} 🌟</p>
                          <p className="text-xl">Reflexiona sobre tus propias creencias y comprométete con la equidad</p>
                        </div>
                      );
                    }
                    
                    if (paragraph.includes('Llamado a la acción') || paragraph.includes('---')) {
                      return null;
                    }

                    return (
                      <div key={index} className={`bg-gradient-to-r ${bgColors[index % bgColors.length]} to-white p-6 rounded-xl shadow-lg border-l-4 ${colors[index % colors.length]}`}>
                        <p className="text-gray-700 leading-relaxed">
                          {paragraph.split('**').map((part, i) => 
                            i % 2 === 1 ? <strong key={i} className="text-purple-700 text-lg">{part}</strong> : part
                          )}
                        </p>
                      </div>
                    );
                  })}

                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-lg">
                    <p className="text-center text-lg">
                      <strong>🤝 Colaboración Interdisciplinaria:</strong><br/>
                      Este proyecto se hizo con aportes de ingenieros de todas las ramas junto con orientación de un psicólogo profesional
                    </p>
                  </div>
                </div>
              )}

              {section?.id === 8 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-yellow-600 to-orange-700 text-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold flex items-center">
                      <span className="text-4xl mr-3">📚</span>
                      Referencias Bibliográficas
                    </h2>
                    <p className="text-lg mt-2 opacity-90">Formato APA 7ª Edición</p>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-xl border-l-4 border-yellow-500">
                    <h3 className="text-xl font-bold text-yellow-700 mb-4">📖 Referencias Principales</h3>
                    <div className="space-y-4 text-gray-700">
                      <div className="bg-yellow-50 p-4 rounded-lg hover:bg-yellow-100 transition">
                        <p className="leading-relaxed">Berger, P. L., & Luckmann, T. (1968). <em>La construcción social de la realidad</em>. Amorrortu Editores.</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg hover:bg-orange-100 transition">
                        <p className="leading-relaxed">Bourdieu, P. (2000). <em>La dominación masculina</em>. Anagrama.</p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg hover:bg-yellow-100 transition">
                        <p className="leading-relaxed">Butler, J. (2007). <em>El género en disputa: El feminismo y la subversión de la identidad</em>. Paidós.</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg hover:bg-orange-100 transition">
                        <p className="leading-relaxed">Giddens, A. (2006). <em>Sociología</em> (5ª ed.). Alianza Editorial.</p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg hover:bg-yellow-100 transition">
                        <p className="leading-relaxed">Scott, J. W. (1990). <em>Gender and the Politics of History</em>. Columbia University Press.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                    <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center">
                      <span className="text-2xl mr-2">📝</span>
                      Nota sobre las Referencias
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Esta lista será ampliada con las referencias específicas de cada sección según se complete el desarrollo del proyecto. Se recomienda incluir fuentes actualizadas sobre psicología social, estudios de género, neurociencia y educación.
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong className="text-blue-700">Para consultar más recursos:</strong>
                      </p>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li>• American Psychological Association (APA)</li>
                        <li>• ONU Mujeres</li>
                        <li>• UNESCO - Género e Igualdad</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-lg text-center">
                    <p className="text-lg font-bold">
                      📅 Revisión y actualización continua
                    </p>
                    <p className="mt-2 opacity-90">
                      Este documento será actualizado conforme se completen las secciones pendientes
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 gap-4">
            {selectedSection > 1 && (
              <button
                onClick={() => setSelectedSection(selectedSection - 1)}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-lg hover:from-purple-700 hover:to-pink-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                ← Sección Anterior
              </button>
            )}
            {selectedSection < 8 && (
              <button
                onClick={() => setSelectedSection(selectedSection + 1)}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-lg hover:from-purple-700 hover:to-pink-700 transition shadow-lg hover:shadow-xl transform hover:scale-105 ml-auto"
              >
                Siguiente Sección →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
