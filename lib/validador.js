// Deterministic arithmetic checks on an acta extraction.
// No AI here — every rule is auditable and reproducible, as the track requires.
//
// Returns: { ok: boolean, errores: Array<{ regla, esperado, recibido, diferencia }> }

function num(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === "object" && "votos" in v) return num(v.votos);
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function suma(arr) {
  let total = 0;
  let allKnown = true;
  for (const v of arr) {
    const n = num(v);
    if (n === null) {
      allKnown = false;
      continue;
    }
    total += n;
  }
  return { total, allKnown };
}

// Regla 1: Σ votos_partido + no_registrados + nulos == totalVotos
function checkSumaVotos(extraccion) {
  const partidos = (extraccion.votosPorPartido || []).map((p) => num(p.votos));
  const noReg = num(extraccion.noRegistrados);
  const nulos = num(extraccion.nulos);
  const total = num(extraccion.totalVotos);

  const { total: sumaPartidos, allKnown } = suma([...partidos, noReg, nulos]);

  if (!allKnown || total === null) {
    return {
      regla: "suma_votos",
      ok: null,
      mensaje: "Faltan datos para verificar la suma",
      sumaCalculada: sumaPartidos,
      totalDeclarado: total,
    };
  }

  return {
    regla: "suma_votos",
    ok: sumaPartidos === total,
    sumaCalculada: sumaPartidos,
    totalDeclarado: total,
    diferencia: total - sumaPartidos,
  };
}

// Regla 2: boletas_sobrantes + boletas_usadas == boletas_recibidas
// Aproximación: boletas_usadas = personasQueVotaron + repsPartidos
function checkBoletas(extraccion) {
  const b = extraccion.boletas || {};
  const recibidas = num(b.recibidas);
  const sobrantes = num(b.sobrantes);
  const personas = num(b.personasQueVotaron);
  const reps = num(b.repsPartidos);

  if ([recibidas, sobrantes, personas].some((v) => v === null)) {
    return {
      regla: "conservacion_boletas",
      ok: null,
      mensaje: "Faltan datos para verificar conservación de boletas",
    };
  }

  const usadas = personas + (reps || 0);
  const calculado = sobrantes + usadas;

  return {
    regla: "conservacion_boletas",
    ok: calculado === recibidas,
    sobrantes,
    usadas,
    recibidas,
    diferencia: recibidas - calculado,
  };
}

// Regla 3: totalVotos ≈ personasQueVotaron + repsPartidos (tolerancia ±5 por errores admisibles)
function checkVotosVsPersonas(extraccion, { tolerancia = 5 } = {}) {
  const total = num(extraccion.totalVotos);
  const b = extraccion.boletas || {};
  const personas = num(b.personasQueVotaron);
  const reps = num(b.repsPartidos);

  if (total === null || personas === null) {
    return {
      regla: "votos_vs_personas",
      ok: null,
      mensaje: "Faltan datos para comparar votos con personas que votaron",
    };
  }

  const esperado = personas + (reps || 0);
  const diff = Math.abs(total - esperado);

  return {
    regla: "votos_vs_personas",
    ok: diff <= tolerancia,
    totalVotos: total,
    personasYReps: esperado,
    diferencia: total - esperado,
    tolerancia,
  };
}

// Regla 4 (cross-check externo): totalVotos ≤ listaNominal de la casilla
function checkListaNominal(extraccion, listaNominalCasilla) {
  if (listaNominalCasilla == null) {
    return {
      regla: "lista_nominal",
      ok: null,
      mensaje: "Sin lista nominal de referencia para esta casilla",
    };
  }
  const total = num(extraccion.totalVotos);
  if (total === null) {
    return {
      regla: "lista_nominal",
      ok: null,
      mensaje: "totalVotos ilegible",
    };
  }
  return {
    regla: "lista_nominal",
    ok: total <= listaNominalCasilla,
    totalVotos: total,
    listaNominal: listaNominalCasilla,
    excedente: total - listaNominalCasilla,
  };
}

export function validarActa(extraccion, { listaNominalCasilla = null } = {}) {
  const checks = [
    checkSumaVotos(extraccion),
    checkBoletas(extraccion),
    checkVotosVsPersonas(extraccion),
    checkListaNominal(extraccion, listaNominalCasilla),
  ];

  const errores = checks.filter((c) => c.ok === false);
  const indeterminados = checks.filter((c) => c.ok === null);

  return {
    ok: errores.length === 0,
    errores,
    indeterminados,
    checks,
  };
}
