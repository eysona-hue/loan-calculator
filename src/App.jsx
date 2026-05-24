import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CONTACT_EMAIL = "loancal@altmail.kr";

const copy = {
  en: {
    langName: "English",
    nav: { calculator: "Calculator", about: "About", privacy: "Privacy", terms: "Terms", contact: "Contact" },
    reset: "Reset",
    brandTag: "Home and car loan planning, made simple",
    adTop: "Future Google AdSense banner",
    adSide: "Future Google AdSense sidebar ad",
    adContent: "Future Google AdSense in-content ad",
    badge: "Smart loan calculator with home and auto modes",
    heroTitle: "Plan any major loan with clarity, speed, and confidence.",
    heroText: "Compare mortgage and car payments using the standard fixed rate amortization formula, with total interest, payoff date, extra payment savings, taxes, insurance, fees, PMI estimates, affordability ratios, and full amortization in one dashboard.",
    homeLoan: "Home Loan",
    homeLoanSub: "Mortgage, taxes, insurance, HOA",
    carLoan: "Car Loan",
    carLoanSub: "Auto financing, insurance, fees, add ons",
    fields: {
      homePrice: "Home Price",
      vehiclePrice: "Vehicle Price",
      downPayment: "Down Payment",
      interestRate: "Interest Rate",
      loanTerm: "Loan Term",
      annualTaxes: "Annual Property Taxes",
      annualFees: "Annual Registration / Fees",
      annualInsurance: "Annual Insurance",
      hoa: "Monthly HOA",
      warranty: "Monthly Warranty / Add ons",
      extra: "Extra Monthly Payment",
      pmiRate: "PMI Annual Rate",
      income: "Gross Annual Income",
      debt: "Other Monthly Debt",
      years: "years",
      estimated80: "Estimated until 80% LTV",
      notNeeded: "Not needed at 20% down",
    },
    results: {
      firstPayment: "Estimated first monthly payment",
      required: "Required payment",
      extra: "Extra payment",
      includesHome: "Includes principal, interest, taxes, insurance, HOA, possible PMI, and optional extra payment. PMI may drop off later if applicable.",
      includesCar: "Includes principal, interest, fees, insurance, add ons, and optional extra payment.",
      loanAmount: "Loan Amount",
      interestSaved: "Interest Saved",
      totalInterest: "Total Interest",
      payoff: "Payoff",
      housingRatio: "Housing Ratio",
      debtRatio: "Debt Ratio",
      noExtraPayoff: "No Extra Payoff",
    },
    tabs: { charts: "Charts", breakdown: "Breakdown", compare: "Compare", schedule: "Schedule" },
    charts: { balance: "Balance over time", breakdown: "Monthly payment breakdown" },
    stat: { principalInterest: "Principal and Interest", feesInsurance: "Fees + Insurance", taxesInsurance: "Taxes + Insurance", totalPaid: "Estimated Total Paid" },
    compare: {
      current: "Current Scenario",
      noExtra: "No Extra Payment",
      higherRate: "Rate + 0.50%",
      monthly: "monthly",
      affordability: "Affordability check",
      affordabilityText: "Housing ratio: {housing}%. Total debt ratio: {debt}%. A common planning guideline is to keep housing near 28% of gross income and total debt near 36%, although lenders may use different limits.",
      extraImpact: "Extra payment impact",
      extraImpactText: "With your extra payment, estimated interest saved is {saved}. Estimated payoff changes from {oldPayoff} to {newPayoff}.",
    },
    schedule: { title: "Amortization schedule", text: "Yearly summary of your principal, interest, PMI, and balance.", download: "Download CSV", downloadPdf: "Download PDF Report", year: "Year", month: "Month", balance: "Balance", principalPaid: "Principal Paid", interestPaid: "Interest Paid", pmiPaid: "PMI Paid" },
    pdf: { title: "LoanFlow Loan Report", subtitle: "Professional loan calculation report", loanType: "Loan Type", generated: "Generated", visit: "Create your own loan report at", inputs: "Inputs", results: "Results", yearly: "Yearly Amortization", note: "This report is an estimate for planning purposes only and is not a loan offer or financial advice." },
    education: {
      title: "How to use this calculator",
      steps: ["Enter the price of the home or vehicle.", "Set your down payment in dollars.", "Choose the loan term in years.", "Input your expected interest rate.", "Adjust taxes, insurance, fees, PMI, or HOA if applicable.", "Add optional extra monthly payments to see potential savings."],
      factorsTitle: "What affects your payment",
      factors: ["Loan amount: Price minus down payment. Higher amount means higher payment.", "Interest rate: Small changes can significantly impact total interest paid.", "Loan term: Longer terms lower monthly payments but increase total interest.", "Taxes, insurance, fees: These are real monthly costs but do not accrue interest.", "PMI: For mortgages with less than 20% down, this calculator estimates private mortgage insurance until the loan balance reaches about 80% of the home value.", "Income and debts: The affordability check estimates housing and total debt ratios so visitors can judge comfort level."],
      formulaTitle: "How calculations work",
      formulaIntro: "This tool uses the standard fixed rate amortization formula to calculate principal and interest:",
      formulaNotes: ["P: Loan amount", "r: Monthly interest rate", "n: Total number of payments"],
      understandTitle: "Understanding your results",
      understand: ["Monthly payment: What you pay each month including optional extras.", "Required payment: Minimum estimated payment to stay on schedule.", "Total interest: Cost of borrowing over time.", "PMI estimate: Added only when the mortgage down payment is below 20%.", "Affordability ratios: Housing cost and total debt compared with gross monthly income.", "Payoff time: When the loan is estimated to be fully paid off."],
      tipsTitle: "Pro tips",
      tips: ["Adding even a small extra payment can save thousands in interest.", "Compare different rates to understand sensitivity.", "Test scenarios before committing to a purchase."],
      disclaimer: "Estimates are for planning purposes only. Actual lender quotes may vary because of APR, credit score, closing costs, escrow rules, taxes, insurance, dealer fees, local regulations, loan type, and payment timing.",
    },
    footer: { rights: "All rights reserved.", disclaimer: "LoanFlow provides estimates for planning only and is not financial, legal, or lending advice." },
    pages: {
      aboutTitle: "About LoanFlow",
      aboutBody: ["LoanFlow is a modern loan calculator designed to help visitors understand home loan and car loan payments in a simple, visual way.", "The calculator estimates principal and interest using a standard fixed rate amortization formula. It also includes optional taxes, insurance, HOA or add on costs, PMI estimates, extra payments, comparison scenarios, and affordability ratios.", "Our goal is to make loan planning easier to understand before visitors speak with a lender, dealer, real estate professional, or financial advisor."],
      privacyTitle: "Privacy Policy",
      privacyBody: ["LoanFlow is designed to be used without requiring visitors to create an account or submit personal information.", "The calculator runs in your browser. Numbers entered into the calculator are used to display estimates on the page and are not intentionally collected by LoanFlow.", "If advertising, analytics, or third party services are added in the future, those providers may use cookies or similar technologies according to their own policies.", `Visitors can contact us at ${CONTACT_EMAIL} with privacy related questions.`],
      termsTitle: "Terms of Use",
      termsBody: ["LoanFlow provides educational estimates only. It does not provide financial, legal, tax, real estate, insurance, or lending advice.", "Calculator results may differ from actual lender, bank, dealer, insurer, or tax authority numbers. Real terms can vary by APR, credit profile, fees, taxes, insurance, escrow rules, local regulations, and payment timing.", "By using this website, you agree that you are responsible for verifying all numbers with qualified professionals before making financial decisions."],
      contactTitle: "Contact",
      contactBody: ["Questions, suggestions, corrections, or business inquiries are welcome.", `Email: ${CONTACT_EMAIL}`, "We especially welcome reports about calculation issues, translation improvements, accessibility problems, or features that would make the tool more useful."],
    },
  },
  es: {
    langName: "Español",
    nav: { calculator: "Calculadora", about: "Acerca de", privacy: "Privacidad", terms: "Términos", contact: "Contacto" },
    reset: "Reiniciar",
    brandTag: "Planificación de préstamos de vivienda y autos, simple y clara",
    adTop: "Espacio futuro para banner de Google AdSense",
    adSide: "Espacio futuro para anuncio lateral de Google AdSense",
    adContent: "Espacio futuro para anuncio dentro del contenido",
    badge: "Calculadora inteligente para préstamos de vivienda y autos",
    heroTitle: "Planifica cualquier préstamo importante con claridad, rapidez y confianza.",
    heroText: "Compara pagos de hipoteca y préstamos de auto usando la fórmula estándar de amortización a tasa fija, con interés total, fecha de pago, ahorro por pagos extra, impuestos, seguro, cargos, estimado de PMI, ratios de capacidad de pago y amortización completa en un solo panel.",
    homeLoan: "Préstamo de Vivienda",
    homeLoanSub: "Hipoteca, impuestos, seguro, HOA",
    carLoan: "Préstamo de Auto",
    carLoanSub: "Financiamiento, seguro, cargos, adicionales",
    fields: {
      homePrice: "Precio de la Vivienda",
      vehiclePrice: "Precio del Vehículo",
      downPayment: "Inicial",
      interestRate: "Tasa de Interés",
      loanTerm: "Plazo del Préstamo",
      annualTaxes: "Impuestos Anuales de Propiedad",
      annualFees: "Registro / Cargos Anuales",
      annualInsurance: "Seguro Anual",
      hoa: "HOA Mensual",
      warranty: "Garantía / Adicionales Mensuales",
      extra: "Pago Extra Mensual",
      pmiRate: "Tasa Anual de PMI",
      income: "Ingreso Bruto Anual",
      debt: "Otras Deudas Mensuales",
      years: "años",
      estimated80: "Estimado hasta 80% LTV",
      notNeeded: "No se necesita con 20% inicial",
    },
    results: {
      firstPayment: "Primer pago mensual estimado",
      required: "Pago requerido",
      extra: "Pago extra",
      includesHome: "Incluye principal, interés, impuestos, seguro, HOA, posible PMI y pago extra opcional. El PMI puede desaparecer más adelante si aplica.",
      includesCar: "Incluye principal, interés, cargos, seguro, adicionales y pago extra opcional.",
      loanAmount: "Monto del Préstamo",
      interestSaved: "Interés Ahorrado",
      totalInterest: "Interés Total",
      payoff: "Pago Final",
      housingRatio: "Ratio de Vivienda",
      debtRatio: "Ratio de Deuda",
      noExtraPayoff: "Sin Pago Extra",
    },
    tabs: { charts: "Gráficos", breakdown: "Desglose", compare: "Comparar", schedule: "Amortización" },
    charts: { balance: "Balance en el tiempo", breakdown: "Desglose del pago mensual" },
    stat: { principalInterest: "Principal e Interés", feesInsurance: "Cargos + Seguro", taxesInsurance: "Impuestos + Seguro", totalPaid: "Total Estimado Pagado" },
    compare: {
      current: "Escenario Actual",
      noExtra: "Sin Pago Extra",
      higherRate: "Tasa + 0.50%",
      monthly: "mensual",
      affordability: "Revisión de capacidad de pago",
      affordabilityText: "Ratio de vivienda: {housing}%. Ratio total de deuda: {debt}%. Una guía común es mantener vivienda cerca del 28% del ingreso bruto y deuda total cerca del 36%, aunque cada prestamista puede usar límites distintos.",
      extraImpact: "Impacto del pago extra",
      extraImpactText: "Con tu pago extra, el interés ahorrado estimado es {saved}. El pago final cambia de {oldPayoff} a {newPayoff}.",
    },
    schedule: { title: "Tabla de amortización", text: "Resumen anual de principal, interés, PMI y balance.", download: "Descargar CSV", downloadPdf: "Descargar Reporte PDF", year: "Año", month: "Mes", balance: "Balance", principalPaid: "Principal Pagado", interestPaid: "Interés Pagado", pmiPaid: "PMI Pagado" },
    pdf: { title: "Reporte de Préstamo LoanFlow", subtitle: "Reporte profesional de cálculo de préstamo", loanType: "Tipo de préstamo", generated: "Generado", visit: "Crea tu propio reporte en", inputs: "Datos", results: "Resultados", yearly: "Amortización Anual", note: "Este reporte es un estimado para planificación únicamente y no es una oferta de préstamo ni asesoría financiera." },
    education: {
      title: "Cómo usar esta calculadora",
      steps: ["Ingresa el precio de la vivienda o vehículo.", "Indica tu inicial en dólares.", "Selecciona el plazo del préstamo en años.", "Ingresa la tasa de interés esperada.", "Ajusta impuestos, seguro, cargos, PMI u HOA si aplica.", "Agrega pagos mensuales extra opcionales para ver posibles ahorros."],
      factorsTitle: "Qué afecta tu pago",
      factors: ["Monto del préstamo: Precio menos inicial. Mientras mayor sea el monto, mayor será el pago.", "Tasa de interés: Cambios pequeños pueden afectar mucho el interés total pagado.", "Plazo del préstamo: Plazos más largos reducen el pago mensual, pero aumentan el interés total.", "Impuestos, seguro y cargos: Son costos mensuales reales, pero no generan interés.", "PMI: En hipotecas con menos de 20% de inicial, esta calculadora estima el seguro hipotecario privado hasta que el balance llegue aproximadamente al 80% del valor de la vivienda.", "Ingreso y deudas: La revisión de capacidad de pago estima ratios de vivienda y deuda total para ayudar al visitante a evaluar comodidad."],
      formulaTitle: "Cómo funcionan los cálculos",
      formulaIntro: "Esta herramienta usa la fórmula estándar de amortización a tasa fija para calcular principal e interés:",
      formulaNotes: ["P: Monto del préstamo", "r: Tasa de interés mensual", "n: Número total de pagos"],
      understandTitle: "Cómo entender tus resultados",
      understand: ["Pago mensual: Lo que pagarías cada mes incluyendo extras opcionales.", "Pago requerido: Pago mínimo estimado para mantener el calendario.", "Interés total: Costo de pedir dinero prestado durante el tiempo.", "Estimado de PMI: Se agrega solo cuando la inicial de la hipoteca es menor de 20%.", "Ratios de capacidad: Costo de vivienda y deuda total comparados con el ingreso bruto mensual.", "Tiempo de pago: Cuándo se estima que el préstamo quedará totalmente pagado."],
      tipsTitle: "Consejos prácticos",
      tips: ["Incluso un pequeño pago extra puede ahorrar miles en intereses.", "Compara distintas tasas para entender la sensibilidad del préstamo.", "Prueba varios escenarios antes de comprometerte con una compra."],
      disclaimer: "Estos resultados son solo estimados para planificación. Las cotizaciones reales pueden variar por APR, crédito, costos de cierre, reglas de escrow, impuestos, seguro, cargos del dealer, regulaciones locales, tipo de préstamo y fecha de pago.",
    },
    footer: { rights: "Todos los derechos reservados.", disclaimer: "LoanFlow ofrece estimados para planificación y no constituye asesoría financiera, legal ni crediticia." },
    pages: {
      aboutTitle: "Acerca de LoanFlow",
      aboutBody: ["LoanFlow es una calculadora moderna diseñada para ayudar a entender pagos de préstamos de vivienda y autos de una forma simple y visual.", "La calculadora estima principal e interés con una fórmula estándar de amortización a tasa fija. También incluye impuestos, seguro, HOA o costos adicionales, estimados de PMI, pagos extra, escenarios de comparación y ratios de capacidad de pago.", "Nuestro objetivo es facilitar la planificación antes de hablar con un banco, prestamista, dealer, asesor inmobiliario o asesor financiero."],
      privacyTitle: "Política de Privacidad",
      privacyBody: ["LoanFlow está diseñado para usarse sin crear cuenta ni enviar información personal.", "La calculadora funciona en tu navegador. Los números ingresados se usan para mostrar estimados en la página y LoanFlow no los recopila intencionalmente.", "Si en el futuro se agregan anuncios, analítica o servicios de terceros, esos proveedores pueden usar cookies o tecnologías similares según sus propias políticas.", `Puedes escribirnos a ${CONTACT_EMAIL} con preguntas de privacidad.`],
      termsTitle: "Términos de Uso",
      termsBody: ["LoanFlow ofrece estimados educativos únicamente. No ofrece asesoría financiera, legal, fiscal, inmobiliaria, de seguros ni de préstamos.", "Los resultados pueden diferir de los números reales de bancos, prestamistas, dealers, aseguradoras o autoridades fiscales. Los términos reales pueden variar por APR, crédito, cargos, impuestos, seguro, escrow, regulaciones locales y fecha de pago.", "Al usar este sitio, aceptas que eres responsable de verificar todos los números con profesionales calificados antes de tomar decisiones financieras."],
      contactTitle: "Contacto",
      contactBody: ["Recibimos preguntas, sugerencias, correcciones o consultas comerciales.", `Email: ${CONTACT_EMAIL}`, "Agradecemos reportes sobre errores de cálculo, mejoras de traducción, problemas de accesibilidad o funciones que hagan la herramienta más útil."],
    },
  },
};

function currency(value, lang = "en") {
  return new Intl.NumberFormat(lang === "es" ? "es-US" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function number(value, lang = "en") {
  return new Intl.NumberFormat(lang === "es" ? "es-US" : "en-US", { maximumFractionDigits: 2 }).format(Number.isFinite(value) ? value : 0);
}

function calculateLoan({ price, downPayment, rate, years, taxes, insurance, hoa, extraPayment, pmiAnnualRate = 0, includePmi = false }) {
  const purchasePrice = Math.max(Number(price) || 0, 0);
  const safeDownPayment = Math.min(Math.max(Number(downPayment) || 0, 0), purchasePrice);
  const principal = Math.max(purchasePrice - safeDownPayment, 0);
  const months = Math.max(Math.round((Number(years) || 0) * 12), 1);
  const monthlyRate = Math.max(Number(rate) || 0, 0) / 100 / 12;
  const originalLtv = purchasePrice > 0 ? principal / purchasePrice : 0;
  const basePayment = principal === 0 ? 0 : monthlyRate === 0 ? principal / months : principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const monthlyTaxes = Math.max(Number(taxes) || 0, 0) / 12;
  const monthlyInsurance = Math.max(Number(insurance) || 0, 0) / 12;
  const monthlyHoaOrAddOns = Math.max(Number(hoa) || 0, 0);
  const optionalExtra = Math.max(Number(extraPayment) || 0, 0);
  const monthlyPmiEstimate = includePmi && originalLtv > 0.8 ? principal * (Math.max(Number(pmiAnnualRate) || 0, 0) / 100) / 12 : 0;
  let balance = principal;
  let totalInterest = 0;
  let totalPrincipal = 0;
  let totalPmi = 0;
  const schedule = [];
  const balanceData = principal > 0 ? [{ month: 0, label: "0", balance: Math.round(principal), interestPaid: 0, principalPaid: 0, pmiPaid: 0 }] : [];
  let payoffMonth = principal === 0 ? 0 : months;
  let pmiEndMonth = monthlyPmiEstimate > 0 ? null : 0;
  for (let m = 1; m <= months && balance > 0.01; m += 1) {
    const interest = balance * monthlyRate;
    const currentLtv = purchasePrice > 0 ? balance / purchasePrice : 0;
    const pmiThisMonth = monthlyPmiEstimate > 0 && currentLtv > 0.8 ? monthlyPmiEstimate : 0;
    if (monthlyPmiEstimate > 0 && pmiThisMonth === 0 && pmiEndMonth === null) pmiEndMonth = m;
    const scheduledPrincipal = Math.max(basePayment - interest, 0);
    const principalPaid = Math.min(scheduledPrincipal + optionalExtra, balance);
    balance = Math.max(balance - principalPaid, 0);
    totalInterest += interest;
    totalPrincipal += principalPaid;
    totalPmi += pmiThisMonth;
    balanceData.push({ month: m, label: m % 12 === 0 ? String(Math.round(m / 12)) : "", balance: Math.round(balance), interestPaid: Math.round(totalInterest), principalPaid: Math.round(totalPrincipal), pmiPaid: Math.round(totalPmi) });
    if (m % 12 === 0 || balance === 0) {
      schedule.push({ year: Math.ceil(m / 12), balance: Math.round(balance), interestPaid: Math.round(totalInterest), principalPaid: Math.round(totalPrincipal), pmiPaid: Math.round(totalPmi) });
    }
    if (balance === 0) {
      payoffMonth = m;
      break;
    }
  }
  if (pmiEndMonth === null) pmiEndMonth = payoffMonth;
  const noExtraInterest = (() => {
    let b = principal;
    let i = 0;
    for (let m = 1; m <= months && b > 0.01; m += 1) {
      const interest = b * monthlyRate;
      const principalPaid = Math.min(Math.max(basePayment - interest, 0), b);
      b = Math.max(b - principalPaid, 0);
      i += interest;
    }
    return i;
  })();
  const firstMonthPmi = monthlyPmiEstimate;
  const requiredMonthlyPayment = basePayment + monthlyTaxes + monthlyInsurance + monthlyHoaOrAddOns + firstMonthPmi;
  const monthlyTotal = requiredMonthlyPayment + optionalExtra;
  const totalNonLoanCostsPaid = (monthlyTaxes + monthlyInsurance + monthlyHoaOrAddOns) * payoffMonth;
  const totalPaidIncludingDownPayment = safeDownPayment + principal + totalInterest + totalNonLoanCostsPaid + totalPmi;
  return { purchasePrice, safeDownPayment, principal, basePayment, monthlyTaxes, monthlyInsurance, monthlyHoaOrAddOns, monthlyPmiEstimate, totalPmi, pmiEndMonth, requiredMonthlyPayment, monthlyTotal, totalInterest, totalPaidIncludingDownPayment, payoffMonth, schedule, balanceData, interestSaved: Math.max(noExtraInterest - totalInterest, 0) };
}

function Card({ children, className = "" }) {
  return <div className={`rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl ${className}`}>{children}</div>;
}

function Button({ children, onClick, className = "" }) {
  return <button type="button" onClick={onClick} className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 font-semibold transition ${className}`}>{children}</button>;
}

function AdSlot({ id, label, compact = false }) {
  return <div data-ad-slot={id} className={`flex items-center justify-center rounded-[2rem] border border-dashed border-white/15 bg-white/[0.04] text-center text-xs uppercase tracking-[0.2em] text-slate-500 ${compact ? "min-h-40" : "min-h-24"}`}>{label}</div>;
}

function App() {
  const [loanType, setLoanType] = useState("home");
  const [price, setPrice] = useState(450000);
  const [downPayment, setDownPayment] = useState(90000);
  const [rate, setRate] = useState(6.75);
  const [years, setYears] = useState(30);
  const [taxes, setTaxes] = useState(5200);
  const [insurance, setInsurance] = useState(1800);
  const [hoa, setHoa] = useState(0);
  const [extraPayment, setExtraPayment] = useState(200);
  const [pmiAnnualRate, setPmiAnnualRate] = useState(0.75);
  const [grossIncome, setGrossIncome] = useState(90000);
  const [monthlyDebt, setMonthlyDebt] = useState(600);
  const [activeTab, setActiveTab] = useState("charts");
  const [path, setPath] = useState(window.location.pathname);
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem("loanflow_lang");
    if (savedLang === "en" || savedLang === "es") return savedLang;
    return (navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en";
  });
  const t = copy[lang];
  const isCar = loanType === "car";
  const safeDownPayment = Math.min(Math.max(Number(downPayment) || 0, 0), Math.max(Number(price) || 0, 0));
  const includePmi = loanType === "home" && price > 0 && safeDownPayment / price < 0.2;
  const result = useMemo(() => calculateLoan({ price, downPayment, rate, years, taxes, insurance, hoa, extraPayment, pmiAnnualRate, includePmi }), [price, downPayment, rate, years, taxes, insurance, hoa, extraPayment, pmiAnnualRate, includePmi]);
  const noExtraResult = useMemo(() => calculateLoan({ price, downPayment, rate, years, taxes, insurance, hoa, extraPayment: 0, pmiAnnualRate, includePmi }), [price, downPayment, rate, years, taxes, insurance, hoa, pmiAnnualRate, includePmi]);
  const higherRateResult = useMemo(() => calculateLoan({ price, downPayment, rate: rate + 0.5, years, taxes, insurance, hoa, extraPayment, pmiAnnualRate, includePmi }), [price, downPayment, rate, years, taxes, insurance, hoa, extraPayment, pmiAnnualRate, includePmi]);
  const downPct = price > 0 ? (safeDownPayment / price) * 100 : 0;
  const payoffYears = Math.floor(result.payoffMonth / 12);
  const payoffMonths = result.payoffMonth % 12;
  const monthlyIncome = Math.max(Number(grossIncome), 0) / 12;
  const housingRatio = monthlyIncome > 0 ? (result.requiredMonthlyPayment / monthlyIncome) * 100 : 0;
  const totalDebtRatio = monthlyIncome > 0 ? ((result.requiredMonthlyPayment + Math.max(Number(monthlyDebt), 0)) / monthlyIncome) * 100 : 0;
  const payoffYearsNoExtra = Math.floor(noExtraResult.payoffMonth / 12);
  const payoffMonthsNoExtra = noExtraResult.payoffMonth % 12;

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    localStorage.setItem("loanflow_lang", lang);
    document.documentElement.lang = lang;
    document.title = lang === "es" ? "LoanFlow Calculadora de préstamos" : "LoanFlow Loan Calculator";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", lang === "es" ? "Calculadora moderna de préstamos de vivienda y autos con amortización, PMI, pagos extra y capacidad de pago." : "Modern home and car loan calculator with amortization, PMI, extra payments, and affordability checks.");
  }, [lang]);

  const pieData = [
    { name: t.stat.principalInterest, value: result.basePayment, color: "#22d3ee" },
    { name: isCar ? t.fields.annualFees : "Taxes", value: result.monthlyTaxes, color: "#a78bfa" },
    { name: t.fields.annualInsurance, value: result.monthlyInsurance, color: "#34d399" },
    { name: isCar ? t.fields.warranty : "HOA", value: hoa, color: "#fbbf24" },
    { name: "PMI", value: result.monthlyPmiEstimate, color: "#fb7185" },
    { name: t.fields.extra, value: extraPayment, color: "#60a5fa" },
  ].filter((item) => item.value > 0.005);

  function navigate(nextPath) {
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function applyHomeDefaults() {
    setLoanType("home"); setPrice(450000); setDownPayment(90000); setRate(6.75); setYears(30); setTaxes(5200); setInsurance(1800); setHoa(0); setExtraPayment(200); setPmiAnnualRate(0.75); setGrossIncome(90000); setMonthlyDebt(600);
  }
  function applyCarDefaults() {
    setLoanType("car"); setPrice(38000); setDownPayment(5000); setRate(7.25); setYears(5); setTaxes(950); setInsurance(1800); setHoa(0); setExtraPayment(50); setPmiAnnualRate(0); setGrossIncome(65000); setMonthlyDebt(400);
  }
  function resetDefaults() { isCar ? applyCarDefaults() : applyHomeDefaults(); }
  function downloadCsv() {
    const rows = [[t.schedule.year, t.schedule.balance, t.schedule.principalPaid, t.schedule.interestPaid, t.schedule.pmiPaid], ...result.schedule.map((r) => [r.year, r.balance, r.principalPaid, r.interestPaid, r.pmiPaid || 0])];
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${loanType}-loan-amortization.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function downloadPdf() {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });
    const siteUrl = "https://loan-calculator-neon-two.vercel.app/";
    const now = new Date().toLocaleDateString(lang === "es" ? "es-US" : "en-US", { year: "numeric", month: "short", day: "numeric" });
    const loanName = isCar ? t.carLoan : t.homeLoan;

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 612, 100, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(t.pdf.title, 42, 42);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(t.pdf.subtitle, 42, 62);
    doc.setTextColor(103, 232, 249);
    doc.text(`${t.pdf.visit} ${siteUrl}`, 42, 80);

    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(currency(result.monthlyTotal, lang), 42, 140);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(t.results.firstPayment, 42, 156);
    doc.text(`${t.pdf.loanType}: ${loanName}`, 42, 174);
    doc.text(`${t.pdf.generated}: ${now}`, 42, 190);

    autoTable(doc, {
      startY: 220,
      head: [[t.pdf.inputs, ""]],
      body: [
        [isCar ? t.fields.vehiclePrice : t.fields.homePrice, currency(price, lang)],
        [t.fields.downPayment, currency(safeDownPayment, lang)],
        [t.fields.interestRate, `${number(rate, lang)}%`],
        [t.fields.loanTerm, `${years} ${t.fields.years}`],
        [isCar ? t.fields.annualFees : t.fields.annualTaxes, currency(taxes, lang)],
        [t.fields.annualInsurance, currency(insurance, lang)],
        [isCar ? t.fields.warranty : t.fields.hoa, currency(hoa, lang)],
        [t.fields.extra, currency(extraPayment, lang)],
      ],
      theme: "grid",
      headStyles: { fillColor: [8, 145, 178], textColor: 255 },
      styles: { fontSize: 9, cellPadding: 6 },
      margin: { left: 42, right: 42 },
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 18,
      head: [[t.pdf.results, ""]],
      body: [
        [t.results.required, currency(result.requiredMonthlyPayment, lang)],
        [t.results.totalInterest, currency(result.totalInterest, lang)],
        [t.results.interestSaved, currency(result.interestSaved, lang)],
        [t.results.payoff, `${payoffYears}y ${payoffMonths}m`],
        [t.stat.totalPaid, currency(result.totalPaidIncludingDownPayment, lang)],
        [isCar ? t.results.debtRatio : t.results.housingRatio, `${number(isCar ? totalDebtRatio : housingRatio, lang)}%`],
      ],
      theme: "grid",
      headStyles: { fillColor: [14, 165, 233], textColor: 255 },
      styles: { fontSize: 9, cellPadding: 6 },
      margin: { left: 42, right: 42 },
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 18,
      head: [[t.schedule.year, t.schedule.balance, t.schedule.principalPaid, t.schedule.interestPaid, t.schedule.pmiPaid]],
      body: result.schedule.slice(0, 35).map((r) => [r.year, currency(r.balance, lang), currency(r.principalPaid, lang), currency(r.interestPaid, lang), currency(r.pmiPaid || 0, lang)]),
      theme: "striped",
      headStyles: { fillColor: [15, 23, 42], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 5 },
      margin: { left: 42, right: 42 },
    });

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i += 1) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(t.pdf.note, 42, 760, { maxWidth: 420 });
      doc.setTextColor(8, 145, 178);
      doc.text("LoanFlow", 500, 760);
      doc.text(siteUrl, 430, 774);
    }

    doc.save(`${loanType}-loanflow-report.pdf`);
  }

  const inputs = [
    { label: isCar ? t.fields.vehiclePrice : t.fields.homePrice, value: price, set: setPrice, min: isCar ? 5000 : 50000, max: isCar ? 250000 : 2000000, step: isCar ? 500 : 5000, prefix: "$" },
    { label: t.fields.downPayment, value: downPayment, set: setDownPayment, min: 0, max: price, step: isCar ? 250 : 1000, prefix: "$", helper: `${number(downPct, lang)}% down` },
    { label: t.fields.interestRate, value: rate, set: setRate, min: 0, max: 25, step: 0.05, suffix: "%" },
    { label: t.fields.loanTerm, value: years, set: setYears, min: 1, max: isCar ? 8 : 40, step: 1, suffix: ` ${t.fields.years}` },
    { label: isCar ? t.fields.annualFees : t.fields.annualTaxes, value: taxes, set: setTaxes, min: 0, max: isCar ? 5000 : 50000, step: 50, prefix: "$" },
    { label: t.fields.annualInsurance, value: insurance, set: setInsurance, min: 0, max: isCar ? 10000 : 20000, step: 100, prefix: "$" },
    { label: isCar ? t.fields.warranty : t.fields.hoa, value: hoa, set: setHoa, min: 0, max: isCar ? 1000 : 3000, step: 25, prefix: "$" },
    { label: t.fields.extra, value: extraPayment, set: setExtraPayment, min: 0, max: 5000, step: 25, prefix: "$" },
    ...(!isCar ? [{ label: t.fields.pmiRate, value: pmiAnnualRate, set: setPmiAnnualRate, min: 0, max: 2.5, step: 0.05, suffix: "%", helper: includePmi ? t.fields.estimated80 : t.fields.notNeeded }] : []),
    { label: t.fields.income, value: grossIncome, set: setGrossIncome, min: 0, max: 500000, step: 1000, prefix: "$" },
    { label: t.fields.debt, value: monthlyDebt, set: setMonthlyDebt, min: 0, max: 20000, step: 50, prefix: "$" },
  ];

  const pageKey = path.replace("/", "") || "calculator";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden"><div className="absolute -top-40 left-1/2 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" /><div className="absolute top-40 -left-24 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" /><div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" /></div>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdSlot id="top-banner" label={t.adTop} />
        <nav className="mb-10 mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <button type="button" onClick={() => navigate("/")} className="flex items-center gap-3 text-left"><div className="rounded-2xl bg-white/10 p-3 shadow-xl ring-1 ring-white/10 backdrop-blur"><Icon name="calculator" className="h-6 w-6 text-cyan-300" /></div><div><p className="text-lg font-bold tracking-tight">LoanFlow</p><p className="text-xs text-slate-400">{t.brandTag}</p></div></button>
          <div className="flex flex-wrap items-center gap-2">
            <NavButton active={pageKey === "calculator"} onClick={() => navigate("/")}>{t.nav.calculator}</NavButton>
            <NavButton active={pageKey === "about"} onClick={() => navigate("/about")}>{t.nav.about}</NavButton>
            <NavButton active={pageKey === "privacy"} onClick={() => navigate("/privacy")}>{t.nav.privacy}</NavButton>
            <NavButton active={pageKey === "terms"} onClick={() => navigate("/terms")}>{t.nav.terms}</NavButton>
            <NavButton active={pageKey === "contact"} onClick={() => navigate("/contact")}>{t.nav.contact}</NavButton>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="rounded-2xl border border-white/10 bg-slate-900 px-3 py-2 text-sm font-semibold text-white outline-none"><option value="en">English</option><option value="es">Español</option></select>
            {pageKey === "calculator" && <Button onClick={resetDefaults} className="bg-white/10 text-white hover:bg-white/20"><Icon name="refresh" className="mr-2 h-4 w-4" />{t.reset}</Button>}
          </div>
        </nav>
        {pageKey === "calculator" ? renderCalculator() : <InfoPage pageKey={pageKey} t={t} navigate={navigate} />}
        <Footer t={t} navigate={navigate} />
      </main>
    </div>
  );

  function renderCalculator() {
    return <>
      <section className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8 max-w-3xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-cyan-100 ring-1 ring-white/10 backdrop-blur"><Icon name="sparkles" className="h-4 w-4" />{t.badge}</div><h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">{t.heroTitle}</h1><p className="mt-5 text-lg leading-8 text-slate-300">{t.heroText}</p></div>
          <div className="mb-5 grid gap-3 rounded-[2rem] bg-white/10 p-2 ring-1 ring-white/10 backdrop-blur sm:grid-cols-2"><button type="button" onClick={applyHomeDefaults} className={`rounded-3xl px-5 py-4 text-left transition ${!isCar ? "bg-cyan-300 text-slate-950 shadow-xl" : "text-slate-300 hover:bg-white/10"}`}><div className="flex items-center gap-3 font-black"><Icon name="home" />{t.homeLoan}</div><p className="mt-1 text-sm opacity-80">{t.homeLoanSub}</p></button><button type="button" onClick={applyCarDefaults} className={`rounded-3xl px-5 py-4 text-left transition ${isCar ? "bg-cyan-300 text-slate-950 shadow-xl" : "text-slate-300 hover:bg-white/10"}`}><div className="flex items-center gap-3 font-black"><Icon name="car" />{t.carLoan}</div><p className="mt-1 text-sm opacity-80">{t.carLoanSub}</p></button></div>
          <Card><div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-8">{inputs.map((item) => <InputControl key={item.label} item={item} />)}</div></Card>
        </motion.div>
        <motion.aside initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-5"><AdSlot id="sidebar-square" label={t.adSide} compact /><Card className="border-cyan-200/40 bg-slate-900 ring-1 ring-cyan-300/20"><div className="p-7"><p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-200">{t.results.firstPayment}</p><p className="text-5xl font-black tracking-tight text-white drop-shadow-lg">{currency(result.monthlyTotal, lang)}</p><p className="mt-3 text-sm text-slate-200">{t.results.required}: <strong className="text-white">{currency(result.requiredMonthlyPayment, lang)}</strong>. {t.results.extra}: <strong className="text-white">{currency(extraPayment, lang)}</strong>.</p><p className="mt-2 text-xs text-slate-400">{isCar ? t.results.includesCar : t.results.includesHome}</p></div></Card><div className="grid grid-cols-2 gap-4"><Metric iconName={isCar ? "car" : "home"} label={t.results.loanAmount} value={currency(result.principal, lang)} /><Metric iconName="piggy" label={t.results.interestSaved} value={currency(result.interestSaved, lang)} /><Metric iconName="chart" label={t.results.totalInterest} value={currency(result.totalInterest, lang)} /><Metric iconName="calculator" label={t.results.payoff} value={`${payoffYears}y ${payoffMonths}m`} /><Metric iconName="shield" label={isCar ? t.results.debtRatio : t.results.housingRatio} value={`${number(isCar ? totalDebtRatio : housingRatio, lang)}%`} /><Metric iconName="clock" label={t.results.noExtraPayoff} value={`${payoffYearsNoExtra}y ${payoffMonthsNoExtra}m`} /></div></motion.aside>
      </section>
      <section className="mt-8"><AdSlot id="in-content" label={t.adContent} /><div className="mt-6"><TabButtons activeTab={activeTab} setActiveTab={setActiveTab} t={t} /></div>{activeTab === "charts" && <Charts t={t} result={result} pieData={pieData} lang={lang} />}{activeTab === "breakdown" && <Card><div className="grid gap-4 p-6 md:grid-cols-3"><BigStat label={t.stat.principalInterest} value={currency(result.basePayment, lang)} /><BigStat label={isCar ? t.stat.feesInsurance : t.stat.taxesInsurance} value={currency(result.monthlyTaxes + result.monthlyInsurance, lang)} /><BigStat label={t.stat.totalPaid} value={currency(result.totalPaidIncludingDownPayment, lang)} /></div></Card>}{activeTab === "compare" && <Compare t={t} lang={lang} result={result} noExtraResult={noExtraResult} higherRateResult={higherRateResult} housingRatio={housingRatio} totalDebtRatio={totalDebtRatio} payoffYears={payoffYears} payoffMonths={payoffMonths} payoffYearsNoExtra={payoffYearsNoExtra} payoffMonthsNoExtra={payoffMonthsNoExtra} />}{activeTab === "schedule" && <Schedule t={t} lang={lang} result={result} downloadCsv={downloadCsv} downloadPdf={downloadPdf} />}<Education t={t} /></section>
    </>;
  }
}

function NavButton({ children, active, onClick }) { return <button type="button" onClick={onClick} className={`rounded-2xl px-3 py-2 text-sm font-semibold transition ${active ? "bg-cyan-300 text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>{children}</button>; }
function InputControl({ item }) { return <div className="space-y-3"><div className="flex items-center justify-between gap-3"><label className="text-sm font-semibold text-slate-200">{item.label}</label>{item.helper && <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-xs text-cyan-200">{item.helper}</span>}</div><div className="flex items-center gap-3 rounded-2xl bg-slate-950/70 px-4 py-3 ring-1 ring-white/10">{item.prefix && <span className="text-slate-400">{item.prefix}</span>}<input type="number" value={item.value} onChange={(e) => item.set(Number(e.target.value))} className="w-full border-0 bg-transparent p-0 text-lg font-bold text-white outline-none" />{item.suffix && <span className="text-slate-400">{item.suffix}</span>}</div><input type="range" value={item.value} min={item.min} max={item.max} step={item.step} onChange={(e) => item.set(Number(e.target.value))} className="w-full accent-cyan-300" /></div>; }
function TabButtons({ activeTab, setActiveTab, t }) { return <div className="mb-5 grid w-full max-w-2xl grid-cols-4 rounded-2xl bg-white/10 p-1 text-slate-300">{Object.entries(t.tabs).map(([key, label]) => <button type="button" key={key} onClick={() => setActiveTab(key)} className={`rounded-xl px-3 py-2 text-sm font-semibold ${activeTab === key ? "bg-cyan-300 text-slate-950" : "hover:bg-white/10"}`}>{label}</button>)}</div>; }
function Charts({ t, result, pieData, lang }) {
  const totalPayment = pieData.reduce((sum, item) => sum + item.value, 0);
  return <div className="grid gap-5 lg:grid-cols-2"><Card><div className="p-6"><h2 className="mb-5 text-xl font-bold">{t.charts.balance}</h2><div className="h-80"><ResponsiveContainer width="100%" height="100%"><AreaChart data={result.balanceData}><defs><linearGradient id="balance" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22d3ee" stopOpacity={0.45} /><stop offset="95%" stopColor="#22d3ee" stopOpacity={0.02} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" opacity={0.15} /><XAxis dataKey="month" stroke="#94a3b8" tickFormatter={(v) => v % 12 === 0 ? `${Math.round(v / 12)}y` : ""} minTickGap={18} /><YAxis stroke="#94a3b8" tickFormatter={(v) => `$${Math.round(v / 1000)}k`} /><Tooltip formatter={(v) => currency(v, lang)} labelFormatter={(v) => `${t.schedule.month} ${v}`} contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16 }} /><Area type="monotone" dataKey="balance" stroke="#22d3ee" strokeWidth={3} fill="url(#balance)" /></AreaChart></ResponsiveContainer></div></div></Card><Card><div className="p-6"><div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><h2 className="text-xl font-bold">{t.charts.breakdown}</h2><p className="text-sm text-slate-400">{currency(totalPayment, lang)}</p></div><div className="h-80"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={72} outerRadius={116} paddingAngle={3} stroke="#0f172a" strokeWidth={3}>{pieData.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip formatter={(v) => currency(v, lang)} contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16 }} /></PieChart></ResponsiveContainer></div><div className="grid gap-2 text-sm text-slate-300">{pieData.map((item) => <div key={item.name} className="flex items-center justify-between rounded-xl bg-slate-950/40 px-3 py-2"><span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span><strong>{currency(item.value, lang)}</strong></div>)}</div></div></Card></div>;
}
function Compare({ t, lang, result, noExtraResult, higherRateResult, housingRatio, totalDebtRatio, payoffYears, payoffMonths, payoffYearsNoExtra, payoffMonthsNoExtra }) { const afford = t.compare.affordabilityText.replace("{housing}", number(housingRatio, lang)).replace("{debt}", number(totalDebtRatio, lang)); const impact = t.compare.extraImpactText.replace("{saved}", currency(result.interestSaved, lang)).replace("{oldPayoff}", `${payoffYearsNoExtra}y ${payoffMonthsNoExtra}m`).replace("{newPayoff}", `${payoffYears}y ${payoffMonths}m`); return <><Card><div className="grid gap-4 p-6 md:grid-cols-3"><BigStat label={t.compare.current} value={currency(result.monthlyTotal, lang)} /><BigStat label={t.compare.noExtra} value={`${currency(noExtraResult.requiredMonthlyPayment, lang)} ${t.compare.monthly}`} /><BigStat label={t.compare.higherRate} value={currency(higherRateResult.monthlyTotal, lang)} /></div></Card><div className="mt-5 grid gap-5 md:grid-cols-2"><Card><div className="p-6"><h3 className="text-xl font-bold text-white">{t.compare.affordability}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{afford}</p></div></Card><Card><div className="p-6"><h3 className="text-xl font-bold text-white">{t.compare.extraImpact}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{impact}</p></div></Card></div></>; }
function Schedule({ t, lang, result, downloadCsv, downloadPdf }) { return <Card><div className="p-6"><div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-bold">{t.schedule.title}</h2><p className="text-sm text-slate-400">{t.schedule.text}</p></div><div className="flex flex-col gap-2 sm:flex-row"><Button onClick={downloadPdf} className="bg-white text-slate-950 hover:bg-slate-200"><Icon name="download" className="mr-2 h-4 w-4" />{t.schedule.downloadPdf}</Button><Button onClick={downloadCsv} className="bg-cyan-300 text-slate-950 hover:bg-cyan-200"><Icon name="download" className="mr-2 h-4 w-4" />{t.schedule.download}</Button></div></div><div className="overflow-x-auto rounded-2xl ring-1 ring-white/10"><table className="w-full text-left text-sm"><thead className="bg-slate-950/70 text-slate-300"><tr><th className="p-4">{t.schedule.year}</th><th className="p-4">{t.schedule.balance}</th><th className="p-4">{t.schedule.principalPaid}</th><th className="p-4">{t.schedule.interestPaid}</th><th className="p-4">{t.schedule.pmiPaid}</th></tr></thead><tbody>{result.schedule.map((row) => <tr key={row.year} className="border-t border-white/10 text-slate-200"><td className="p-4 font-bold">{row.year}</td><td className="p-4">{currency(row.balance, lang)}</td><td className="p-4">{currency(row.principalPaid, lang)}</td><td className="p-4">{currency(row.interestPaid, lang)}</td><td className="p-4">{currency(row.pmiPaid || 0, lang)}</td></tr>)}</tbody></table></div></div></Card>; }
function Education({ t }) { return <div className="mt-8 rounded-[2rem] bg-white/[0.06] p-5 text-sm leading-6 text-slate-300 ring-1 ring-white/10"><Section title={t.education.title} items={t.education.steps} /><Section title={t.education.factorsTitle} items={t.education.factors} /><strong className="mt-5 block text-white">{t.education.formulaTitle}</strong><p className="mt-2">{t.education.formulaIntro}</p><p className="mt-2 font-mono text-xs text-cyan-300">M = P × [ r(1+r)^n / ((1+r)^n − 1) ]</p><ul className="mt-3 list-disc space-y-2 pl-5">{t.education.formulaNotes.map((x) => <li key={x}>{x}</li>)}</ul><Section title={t.education.understandTitle} items={t.education.understand} /><Section title={t.education.tipsTitle} items={t.education.tips} /><p className="mt-5 text-xs text-slate-400">{t.education.disclaimer}</p></div>; }
function Section({ title, items }) { return <><strong className="mt-5 block text-white first:mt-0">{title}</strong><ul className="mt-3 list-disc space-y-2 pl-5">{items.map((item) => <li key={item}>{item}</li>)}</ul></>; }
function InfoPage({ pageKey, t }) { const map = { about: [t.pages.aboutTitle, t.pages.aboutBody], privacy: [t.pages.privacyTitle, t.pages.privacyBody], terms: [t.pages.termsTitle, t.pages.termsBody], contact: [t.pages.contactTitle, t.pages.contactBody] }; const [title, body] = map[pageKey] || map.about; return <section className="mx-auto max-w-4xl"><Card><div className="p-7 sm:p-10"><h1 className="text-4xl font-black tracking-tight text-white">{title}</h1><div className="mt-6 space-y-4 text-lg leading-8 text-slate-300">{body.map((p) => <p key={p}>{p.includes(CONTACT_EMAIL) ? <>{p.replace(CONTACT_EMAIL, "")}<a className="text-cyan-300 underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></> : p}</p>)}</div></div></Card></section>; }
function Footer({ t, navigate }) { return <footer className="mt-10 border-t border-white/10 py-8 text-sm text-slate-400"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><p>© {new Date().getFullYear()} LoanFlow. {t.footer.rights}</p><div className="flex flex-wrap gap-3"><button onClick={() => navigate("/privacy")} className="hover:text-white">{t.nav.privacy}</button><button onClick={() => navigate("/terms")} className="hover:text-white">{t.nav.terms}</button><button onClick={() => navigate("/about")} className="hover:text-white">{t.nav.about}</button><button onClick={() => navigate("/contact")} className="hover:text-white">{t.nav.contact}</button><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">{CONTACT_EMAIL}</a></div></div><p className="mt-4 max-w-3xl text-xs leading-5">{t.footer.disclaimer}</p></footer>; }
function Metric({ iconName, label, value }) { return <Card className="rounded-3xl shadow-xl"><div className="p-5"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-cyan-200"><Icon name={iconName} className="h-5 w-5" /></div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 text-xl font-black text-white">{value}</p></div></Card>; }
function BigStat({ label, value }) { return <div className="rounded-3xl bg-slate-950/50 p-6 ring-1 ring-white/10"><p className="text-sm font-semibold text-slate-400">{label}</p><p className="mt-2 text-3xl font-black text-white">{value}</p></div>; }
function Icon({ name, className = "h-5 w-5" }) { const paths = { calculator: <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h2M14 10h2M8 14h2M14 14h2M8 18h2M14 18h2"/></>, refresh: <><path d="M21 12a9 9 0 0 1-15.5 6.2"/><path d="M3 12A9 9 0 0 1 18.5 5.8"/><path d="M18 2v4h-4"/><path d="M6 22v-4h4"/></>, sparkles: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/></>, home: <><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></>, piggy: <><path d="M5 11a7 7 0 0 1 7-5h4a5 5 0 0 1 5 5v3a5 5 0 0 1-5 5H8l-2 3v-4a6 6 0 0 1-3-5v-1"/><path d="M16 10h.01"/><path d="M7 7L5 4"/><path d="M9 18v3M17 18v3"/></>, chart: <><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-7"/></>, car: <><path d="M5 17h14"/><path d="M6 17l1.5-6h9L18 17"/><path d="M8 17v2"/><path d="M16 17v2"/><path d="M8 13h8"/><path d="M7 17a2 2 0 1 0 0 .01"/><path d="M17 17a2 2 0 1 0 0 .01"/></>, download: <><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></>, shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-5"/></>, clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></> }; return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>; }

export default App;
