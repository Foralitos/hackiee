# PREP Copilot

**Asistencia computacional con control humano para el Programa de Resultados Electorales Preliminares.**

Proyecto desarrollado para el **Hackathon IEE Chihuahua 2026 — Eje 7: PREP con IA**.

---

## El problema

La noche electoral es la cadena más vulnerable del proceso. Cuando cierra la casilla a las 6pm, los funcionarios cuentan las boletas y llenan a mano un **acta de escrutinio y cómputo**: un papel oficial con los totales. Esa acta viaja al consejo distrital del IEE, donde un operador captura los números en el sistema para que se publiquen en el portal público del PREP.

En cada eslabón humano pueden ocurrir errores:

- **Entre el 10 y 20 por ciento** de las actas presentan al menos una inconsistencia matemática interna (la suma de votos por partido no cuadra con el total declarado, las boletas no se conservan, etc.).
- Esos errores se capturan, se publican al público, y solo se detectan días después en el cómputo oficial.
- Para entonces, el dato erróneo ya circuló y dañó la confianza en los resultados preliminares.

A esto se suman los cuellos de botella operativos cuando llegan muchas actas al mismo tiempo, y la tensión permanente entre **acelerar el proceso** y **mantener el control humano** que la ley electoral exige.

---

## Qué es PREP Copilot

Una **herramienta interna para operadores del PREP** que asiste el proceso de captura sin reemplazar el control humano. Es una consola web que se usa en el consejo distrital del IEE durante la noche electoral.

**Para quién es:**
- **Usuario primario:** operadores del PREP en los consejos distritales.
- **Usuario secundario:** supervisores y consejeros del IEE que necesitan monitorear el proceso global en tiempo real.

**Para quién NO es:**
- No es una herramienta para ciudadanos.
- No publica resultados al público (eso lo sigue haciendo el portal oficial del PREP).
- No reemplaza al operador.

---

## Cómo funciona

Cuando llega un acta al sistema, atraviesa cuatro etapas. Al final de cada acta, **un operador toma la decisión**.

### 1. Captura

El operador sube la fotografía del acta al sistema. Opcionalmente la asocia a una casilla previamente registrada (con su lista nominal), para activar una validación adicional.

### 2. Lectura asistida (OCR)

Un modelo de IA lee la imagen y extrae los campos numéricos del acta: votos por partido, candidaturas no registradas, votos nulos, total, boletas. Por **cada celda** reporta un nivel de confianza: qué tan legible es el manuscrito.

### 3. Validación matemática

El sistema corre **cuatro reglas aritméticas deterministas** (sin IA, 100% explicables):

- La suma de votos por partido más no registrados más nulos debe coincidir con el total declarado.
- Las boletas sobrantes más las usadas deben sumar el total de boletas recibidas.
- El total de votos debe coincidir con las personas que votaron de la lista nominal.
- El total de votos no puede exceder la lista nominal de la casilla.

### 4. Clasificación en una de tres colas

| Cola | Significado | Acción del operador |
|---|---|---|
| 🟢 **Verde** | Lectura clara y matemática consistente | Valida con un click |
| 🟡 **Amarilla** | Algún campo con confianza baja | Revisa los campos marcados |
| 🔴 **Roja** | Inconsistencia matemática detectada | Corrige los números o devuelve el acta |

### 5. Decisión humana

El operador siempre tiene tres opciones:

- **Validar**: el acta queda firme.
- **Corregir**: el operador edita los números mal leídos directamente en pantalla. Esto dispara **doble captura ciega** (ver abajo).
- **Devolver a casilla**: con nota obligatoria explicando por qué.

Cada decisión queda registrada con operador, hora exacta y motivo. Auditable hacia adelante.

### 6. Doble captura ciega (cumplimiento INE)

Cuando un operador corrige un acta, esta no se valida automáticamente. Pasa a un estado de **"esperando verificación"**. Un segundo operador, sin ver los números que escribió el primero, recaptura los datos desde cero leyendo la imagen.

- Si las dos capturas coinciden exactamente → el acta se valida.
- Si difieren → el acta queda como **discrepancia** y la revisa un supervisor.

Esto cumple el lineamiento INE de "no validar con un solo par de ojos" y reduce drásticamente el riesgo de error humano.

### 7. Monitor operativo

En paralelo, los supervisores y consejeros del IEE acceden a un **dashboard agregado** que muestra en tiempo real:

- Total de actas procesadas y su distribución por cola.
- Tiempo promedio de decisión.
- Cuellos de botella por distrito.
- Operadores más activos.

---

## Lo que el sistema **NO** hace

Por diseño y por mandato del track del IEE:

- No reemplaza al operador humano.
- No hace validaciones automáticas vinculantes.
- No publica resultados directamente al público.
- No corrige números por su cuenta. **La máquina propone, el humano decide.**
- No depende de datos en vivo del PREP. *Es* la herramienta que ayuda a construir el PREP.

---

## Cumplimiento normativo

PREP Copilot está diseñado **dentro** del marco regulatorio del PREP, no alrededor de él.

- ✅ **Principios constitucionales**: certeza, legalidad y máxima transparencia en cada operación registrada.
- ✅ **Doble captura (lineamiento INE)**: toda corrección numérica requiere verificación independiente.
- ✅ **Minimización de datos personales**: el sistema no almacena más información que la estrictamente necesaria.
- ✅ **Validaciones no vinculantes**: ninguna acción sobre el acta se ejecuta sin confirmación del operador.
- ✅ **Explicabilidad obligatoria**: las validaciones aritméticas son 100% deterministas. Cada decisión del sistema es trazable a una regla legible en español.
- ✅ **Trazabilidad y auditoría**: cada decisión queda registrada con operador, timestamp, datos antes/después y nota cuando aplica.

---

## Cómo encaja con el Eje 7

El track del hackathon propone **tres prototipos** y sugiere que cada equipo elija uno. PREP Copilot integra los **tres en una sola herramienta**, evitando que el operador alterne entre sistemas durante la noche electoral:

| Prototipo del track | Pieza en PREP Copilot |
|---|---|
| OCR Asistido con Priorización Humana | Lectura del acta + sistema de colas V/A/R |
| Detector de Inconsistencias Lógicas | Validador determinista + alertas explicables |
| Monitor Operativo del PREP | Dashboard del supervisor con KPIs en tiempo real |

---

## Diferenciación

La mayoría de las soluciones a este tipo de problema prometen "foto → OCR → resultado correcto". PREP Copilot se diferencia por:

- **Asume que el OCR no es perfecto** y diseña el sistema *alrededor* de esa imperfección, con priorización humana, en lugar de prometer una precisión irreal.
- **Detecta errores que la comparación con el PREP no puede detectar**: inconsistencias internas del acta misma, no diferencias contra resultados oficiales.
- **Habla el lenguaje del IEE**: "asistencia con control humano", no "automatización total".
- **Combina los tres prototipos del track** en lugar de elegir uno.

---

## Decisiones explícitas del MVP

- **Sin blockchain** (descartado por scope del hackathon; mencionable como roadmap).
- **Usuario institucional, no ciudadano**. Toda la UX se diseña para un operador del PREP en su consola de trabajo.
- **OCR imperfecto**. El diseño se basa en clasificación por confianza, no en perseguir 100% de accuracy.
- **Validación matemática 100% determinista**, sin IA, para garantizar la explicabilidad que el track exige.

---

## Estructura del proyecto

El sistema vive en dos capas visibles para el usuario:

**Pública** (`/`)
- Landing institucional que explica qué es la herramienta antes de pedir login.
- Cualquier persona puede leerla, ningún dato sensible se muestra.

**Privada** (`/dashboard`)
- Acceso solo con cuenta institucional (Google OAuth).
- Roles diferenciados: operador / supervisor / consejero / admin.
- Secciones:
  - **Procesar acta**: subir foto, ver clasificación, decidir.
  - **Bandeja**: historial de actas decididas con filtros por cola y estado.
  - **Supervisor**: dashboard agregado con KPIs (acceso pensado para supervisores y consejeros).
  - **Casillas**: alta y consulta de casillas con su lista nominal, para activar el cross-check.

---

## Créditos

- **Organizador del hackathon**: Instituto Estatal Electoral de Chihuahua (IEE).
- **Track**: Eje 7 — PREP con Inteligencia Artificial.
- **Periodo de implementación**: hackathon 2026.
