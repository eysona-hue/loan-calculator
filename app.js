const CONTACT_EMAIL = 'loancal@altmail.kr';
const SITE_URL = 'https://www.checkmypayments.com';
const APP_VERSION = '24.2.0';

const palette = ['#66e4f2', '#a78bfa', '#fbbf24', '#34d399', '#fb7185', '#60a5fa'];
const state = {
  lang: localStorage.getItem('check_my_payments_lang') || 'en',
  route: window.location.pathname,
  loanType: 'home',
  activeTab: 'charts',
  selectedSlice: 0,
  inputs: {
    price: 450000,
    downPayment: 90000,
    rate: 6.75,
    years: 30,
    taxes: 5200,
    insurance: 1800,
    hoa: 0,
    extraPayment: 200,
    pmiAnnualRate: 0.75,
    grossIncome: 90000,
    monthlyDebt: 600
  },
  compareB: {
    price: 450000,
    downPayment: 90000,
    rate: 6.25,
    years: 15,
    taxes: 5200,
    insurance: 1800,
    hoa: 0,
    extraPayment: 0,
    pmiAnnualRate: 0.75,
    grossIncome: 90000,
    monthlyDebt: 600
  }
};

const t = {
  en: {
    brandSub: 'A simple loan calculator to estimate monthly payments before you borrow', calc: 'Calculator', about: 'About', privacy: 'Privacy', terms: 'Terms', contact: 'Contact', reset: 'Reset',
    topAd: 'Future Google AdSense banner', sideAd: 'Future Google AdSense sidebar ad', midAd: 'Future Google AdSense in-content ad',
    kicker: 'Smart calculator for home and auto loans', hero: 'Check My Payments',
    lead: 'A simple loan calculator to help you estimate monthly payments, compare loan terms, and understand total cost before you borrow.',
    startNote: 'Start here: enter your loan details below, then review the payment, charts, CSV, and PDF report.',
    homeLoan: 'Home Loan', homeSub: 'Mortgage, taxes, insurance, HOA', carLoan: 'Car Loan', carSub: 'Financing, insurance, fees, add ons',
    labels: { priceHome: 'Home Price', priceCar: 'Vehicle Price', downPayment: 'Down Payment', rate: 'Interest Rate', years: 'Loan Term', taxesHome: 'Annual Property Taxes', taxesCar: 'Annual Registration / Fees', insurance: 'Annual Insurance', hoaHome: 'Monthly HOA', hoaCar: 'Monthly Warranty / Add Ons', extra: 'Extra Monthly Payment', pmi: 'PMI Annual Rate', income: 'Gross Annual Income', debt: 'Other Monthly Debt' },
    noPmi: 'Not needed at 20% down', pmiNeeded: 'Estimated until 80% LTV', down: 'down', yearsUnit: 'years',
    firstPayment: 'Estimated first monthly payment', required: 'Required payment', extra: 'Extra payment', paymentNote: 'Includes principal, interest, taxes or fees, insurance, possible PMI and optional extra payment. PMI may drop off later if applicable.',
    metrics: { amount: 'Loan Amount', saved: 'Interest Saved', interest: 'Total Interest', payoff: 'Final Payment', ratioHome: 'Housing Ratio', ratioCar: 'Debt Ratio', noExtra: 'No Extra Payoff' },
    buttons: { csv: 'Download CSV', pdf: 'Download PDF Report' },
    tabs: { charts: 'Charts', breakdown: 'Breakdown', compare: 'Compare', schedule: 'Schedule' },
    balance: 'Balance over time', breakdown: 'Monthly payment breakdown', breakdownTotal: 'Total estimated first monthly payment', breakdownNote: 'The chart total matches the payment card above. Category amounts are rounded for display.', pi: 'Principal and Interest', taxes: 'Taxes', fees: 'Registration / Fees', insurance: 'Insurance', hoa: 'HOA', addons: 'Add Ons', pmi: 'PMI', extraPayment: 'Extra Monthly Payment',
    bigStats: { pi: 'Principal and Interest', ti: 'Taxes and Insurance', fi: 'Fees and Insurance', totalPaid: 'Estimated Total Paid' },
    compareTitle1: 'Affordability check', compareText: 'Housing ratio: {housing}%. Total debt ratio: {debt}%. A common planning guideline is to keep housing near 28% of gross income and total debt near 36%, although lenders may use different limits.',
    compareTitle2: 'Extra payment impact', compareExtra: 'With your extra payment, estimated interest saved is {saved}. Estimated payoff changes from {old} to {now}.',
    current: 'Current Scenario', noExtraPay: 'No Extra Payment', rateUp: 'Rate + 0.50%', monthly: 'monthly',
    scheduleTitle: 'Monthly amortization schedule', scheduleSub: 'Every payment month, including principal, interest, PMI, and remaining balance.',
    table: ['Month', 'Year', 'Starting Balance', 'Payment', 'Principal', 'Interest', 'PMI', 'Ending Balance'],
    eduTitle: 'How to use this calculator', edu: ['Enter the price of the home or vehicle.', 'Set your down payment in dollars.', 'Choose the loan term in years.', 'Input your expected interest rate.', 'Adjust taxes, insurance, fees, HOA, or add ons if applicable.', 'Optionally add extra monthly payments to see savings.'],
    factorsTitle: 'What affects your payment', factors: ['Loan amount is the price minus the down payment.', 'Interest rate is the cost of borrowing money.', 'Loan term controls how quickly the balance is repaid.', 'Taxes, insurance, fees, and HOA are monthly costs but do not accrue interest.', 'PMI is estimated for home loans with less than 20% down and is removed when the balance reaches about 80% of the original home value.'],
    formulaTitle: 'How calculations work', formulaText: 'The loan payment uses the standard fixed rate amortization formula: M = P × [ r(1+r)^n / ((1+r)^n − 1) ]. Taxes, insurance, HOA, fees and add ons are added separately as monthly costs.',
    disclaimer: 'Estimates are for planning purposes only. Actual lender quotes may vary because of APR, credit score, closing costs, escrow rules, taxes, insurance, dealer fees, local regulations, loan type, and payment timing.',
    pageAboutTitle: 'About Check My Payments', pageAbout: 'Check My Payments is a simple bilingual loan calculator and educational tool. It helps visitors estimate monthly payments, compare scenarios, understand amortization, download a monthly schedule, and print a professional report. It is not a lender and does not offer loans.',
    pagePrivacyTitle: 'Privacy Policy', pagePrivacy: 'Check My Payments does not require an account and does not ask visitors to enter personal identifying information. Calculator inputs are processed in the browser. If advertising, analytics, or contact features are added later, this policy should be updated to describe those services.',
    pageTermsTitle: 'Terms of Use', pageTerms: 'Check My Payments provides estimates for educational and planning purposes only. It is not a lender, does not offer loans, and does not provide financial, legal, tax, mortgage, or lending advice. Visitors should confirm loan terms directly with a qualified lender or financial professional before making decisions.',
    pageContactTitle: 'Contact', pageContact: 'For questions, suggestions, or corrections, contact us at', footerNote: '© 2026 Check My Payments. All rights reserved. Planning estimates only.'
  },
  es: {
    brandSub: 'Calculadora simple para estimar pagos mensuales antes de tomar un préstamo', calc: 'Calculadora', about: 'Acerca de', privacy: 'Privacidad', terms: 'Términos', contact: 'Contacto', reset: 'Reiniciar',
    topAd: 'Espacio futuro para anuncio superior de Google AdSense', sideAd: 'Espacio futuro para anuncio lateral de Google AdSense', midAd: 'Espacio futuro para anuncio interno de Google AdSense',
    kicker: 'Calculadora inteligente para préstamos de vivienda y autos', hero: 'Check My Payments',
    lead: 'Una calculadora simple para estimar pagos mensuales, comparar plazos y entender el costo total antes de tomar un préstamo.',
    startNote: 'Empieza aquí: ingresa los datos de tu préstamo abajo, luego revisa el pago, las gráficas, el CSV y el reporte PDF.',
    homeLoan: 'Préstamo de Vivienda', homeSub: 'Hipoteca, impuestos, seguro, HOA', carLoan: 'Préstamo de Auto', carSub: 'Financiamiento, seguro, cargos, adicionales',
    labels: { priceHome: 'Precio de la Vivienda', priceCar: 'Precio del Vehículo', downPayment: 'Inicial', rate: 'Tasa de Interés', years: 'Plazo del Préstamo', taxesHome: 'Impuestos Anuales de Propiedad', taxesCar: 'Registro / Cargos Anuales', insurance: 'Seguro Anual', hoaHome: 'HOA Mensual', hoaCar: 'Garantía / Adicionales Mensuales', extra: 'Pago Extra Mensual', pmi: 'Tasa Anual de PMI', income: 'Ingreso Bruto Anual', debt: 'Otras Deudas Mensuales' },
    noPmi: 'No se necesita con 20% inicial', pmiNeeded: 'Estimado hasta 80% LTV', down: 'inicial', yearsUnit: 'años',
    firstPayment: 'Primer pago mensual estimado', required: 'Pago requerido', extra: 'Pago extra', paymentNote: 'Incluye principal, interés, impuestos o cargos, seguro, posible PMI y pago extra opcional. El PMI puede desaparecer más adelante si aplica.',
    metrics: { amount: 'Monto del Préstamo', saved: 'Interés Ahorrado', interest: 'Interés Total', payoff: 'Pago Final', ratioHome: 'Ratio de Vivienda', ratioCar: 'Ratio de Deuda', noExtra: 'Sin Pago Extra' },
    buttons: { csv: 'Descargar CSV', pdf: 'Descargar Reporte PDF' },
    tabs: { charts: 'Gráficas', breakdown: 'Desglose', compare: 'Comparar', schedule: 'Calendario' },
    balance: 'Balance a través del tiempo', breakdown: 'Desglose del pago mensual', breakdownTotal: 'Primer pago mensual estimado total', breakdownNote: 'El total de la gráfica coincide con la tarjeta de pago de arriba. Los montos por categoría se redondean para mostrar.', pi: 'Principal e Interés', taxes: 'Impuestos', fees: 'Registro / Cargos', insurance: 'Seguro', hoa: 'HOA', addons: 'Adicionales', pmi: 'PMI', extraPayment: 'Pago Extra Mensual',
    bigStats: { pi: 'Principal e Interés', ti: 'Impuestos y Seguro', fi: 'Cargos y Seguro', totalPaid: 'Total Estimado Pagado' },
    compareTitle1: 'Revisión de capacidad de pago', compareText: 'Ratio de vivienda: {housing}%. Ratio total de deuda: {debt}%. Una guía común es mantener vivienda cerca del 28% del ingreso bruto y deuda total cerca del 36%, aunque los prestamistas pueden usar límites diferentes.',
    compareTitle2: 'Impacto del pago extra', compareExtra: 'Con tu pago extra, el interés ahorrado estimado es {saved}. El pago final estimado cambia de {old} a {now}.',
    current: 'Escenario Actual', noExtraPay: 'Sin Pago Extra', rateUp: 'Tasa + 0.50%', monthly: 'mensual',
    scheduleTitle: 'Calendario mensual de amortización', scheduleSub: 'Cada mes de pago, incluyendo principal, interés, PMI y balance restante.',
    table: ['Mes', 'Año', 'Balance Inicial', 'Pago', 'Principal', 'Interés', 'PMI', 'Balance Final'],
    eduTitle: 'Cómo usar esta calculadora', edu: ['Ingresa el precio de la vivienda o vehículo.', 'Coloca el inicial en dólares.', 'Escoge el plazo del préstamo en años.', 'Ingresa la tasa de interés esperada.', 'Ajusta impuestos, seguro, cargos, HOA o adicionales si aplica.', 'Agrega pagos extra mensuales para ver el ahorro.'],
    factorsTitle: 'Qué afecta tu pago', factors: ['El monto del préstamo es el precio menos el inicial.', 'La tasa de interés es el costo de tomar dinero prestado.', 'El plazo determina la velocidad con que se paga el balance.', 'Impuestos, seguro, cargos y HOA son costos mensuales, pero no generan interés.', 'El PMI se estima en préstamos de vivienda con menos de 20% inicial y se elimina cuando el balance llega aproximadamente al 80% del valor original.'],
    formulaTitle: 'Cómo funcionan los cálculos', formulaText: 'El pago del préstamo usa la fórmula estándar de amortización a tasa fija: M = P × [ r(1+r)^n / ((1+r)^n − 1) ]. Impuestos, seguro, HOA, cargos y adicionales se suman aparte como costos mensuales.',
    disclaimer: 'Los estimados son solo para planificación. Las ofertas reales de prestamistas pueden variar por APR, crédito, costos de cierre, escrow, impuestos, seguro, cargos del dealer, regulaciones locales, tipo de préstamo y fecha de pago.',
    pageAboutTitle: 'Acerca de Check My Payments', pageAbout: 'Check My Payments es una calculadora bilingüe y herramienta educativa para préstamos de vivienda y auto. Ayuda a estimar pagos mensuales, comparar escenarios, entender la amortización, descargar un calendario mensual y generar un reporte profesional. No es un prestamista y no ofrece préstamos.',
    pagePrivacyTitle: 'Política de Privacidad', pagePrivacy: 'Check My Payments no requiere cuenta y no pide información personal identificable. Los datos de la calculadora se procesan en el navegador. Si más adelante se agregan anuncios, analíticas o formularios, esta política debe actualizarse.',
    pageTermsTitle: 'Términos de Uso', pageTerms: 'Check My Payments ofrece estimados para educación y planificación solamente. No es prestamista, no ofrece préstamos y no brinda asesoría financiera, legal, fiscal, hipotecaria ni de préstamo. Los visitantes deben confirmar términos con un prestamista o profesional calificado.',
    pageContactTitle: 'Contacto', pageContact: 'Para preguntas, sugerencias o correcciones, contáctanos en', footerNote: '© 2026 Check My Payments. Todos los derechos reservados. Estimados de planificación solamente.'
  }
};


const seoPages = {
  '/mortgage-calculator': {
    en: {
      title: 'Mortgage Calculator with Taxes, PMI and Amortization',
      description: 'Estimate a home loan payment with principal, interest, property taxes, insurance, PMI, HOA, extra payments and a monthly amortization schedule.',
      heading: 'Mortgage Calculator',
      intro: 'Use Check My Payments to estimate the real monthly cost of a home loan, not just principal and interest. The calculator can include property taxes, homeowners insurance, HOA dues, PMI, extra payments and a full monthly amortization schedule.',
      sections: [
        ['What this mortgage calculator includes', ['Principal and interest payment using the standard fixed rate amortization formula.', 'Property taxes and homeowners insurance as monthly estimated costs.', 'PMI estimate when the down payment is below 20 percent.', 'HOA dues when applicable.', 'Extra monthly payments to estimate interest savings and faster payoff.']],
        ['How to use it well', ['Start with a realistic home price and down payment.', 'Use an interest rate close to what a lender has quoted or test several rates.', 'Enter taxes, insurance and HOA instead of leaving them out.', 'Review the payment breakdown and amortization schedule before making a decision.']],
        ['Important note', ['This tool provides estimates only. A real lender quote may include APR, closing costs, escrow rules, discount points, mortgage insurance rules and local taxes that change the final payment.']]
      ]
    },
    es: {
      title: 'Calculadora de Hipoteca con Impuestos, PMI y Amortización',
      description: 'Estima el pago de una hipoteca con principal, interés, impuestos, seguro, PMI, HOA, pagos extra y calendario mensual de amortización.',
      heading: 'Calculadora de Hipoteca',
      intro: 'Usa Check My Payments para estimar el costo mensual real de una hipoteca, no solo principal e interés. La calculadora puede incluir impuestos, seguro, HOA, PMI, pagos extra y amortización mensual completa.',
      sections: [
        ['Qué incluye esta calculadora', ['Pago de principal e interés con la fórmula estándar de amortización a tasa fija.', 'Impuestos y seguro como costos mensuales estimados.', 'PMI estimado cuando el inicial es menor de 20 por ciento.', 'HOA si aplica.', 'Pagos extra para estimar ahorro de interés y pago más rápido.']],
        ['Cómo usarla bien', ['Empieza con un precio de vivienda y un inicial realistas.', 'Usa una tasa cercana a la cotización de un prestamista o prueba varias tasas.', 'Incluye impuestos, seguro y HOA en vez de dejarlos fuera.', 'Revisa el desglose del pago y el calendario de amortización antes de decidir.']],
        ['Nota importante', ['Esta herramienta ofrece estimados solamente. Una cotización real puede incluir APR, costos de cierre, reglas de escrow, puntos, seguro hipotecario e impuestos locales que cambien el pago final.']]
      ]
    }
  },
  '/car-loan-calculator': {
    en: {
      title: 'Car Loan Calculator with Fees, Insurance and Amortization',
      description: 'Estimate auto loan payments, interest, fees, insurance, extra payments, payoff timing and a monthly amortization schedule.',
      heading: 'Car Loan Calculator',
      intro: 'Use Check My Payments to estimate an auto loan with the vehicle price, down payment, interest rate, loan term, registration fees, insurance and optional add ons.',
      sections: [
        ['What this car loan calculator helps you see', ['Estimated first monthly payment.', 'Total interest over the life of the loan.', 'How extra payments can shorten payoff time.', 'The monthly schedule showing interest, principal and remaining balance.']],
        ['Smart car loan tips', ['Compare shorter and longer terms before accepting a loan.', 'A lower monthly payment can cost more in total interest.', 'Separate optional add ons from the vehicle price when possible so you can see the true cost.', 'Check whether insurance and registration fees fit your monthly budget.']]
      ]
    },
    es: {
      title: 'Calculadora de Préstamo de Auto con Cargos, Seguro y Amortización',
      description: 'Estima pagos de auto, interés, cargos, seguro, pagos extra, fecha final y amortización mensual.',
      heading: 'Calculadora de Préstamo de Auto',
      intro: 'Usa Check My Payments para estimar un préstamo de auto con precio del vehículo, inicial, tasa, plazo, registro, seguro y adicionales opcionales.',
      sections: [
        ['Qué te ayuda a ver', ['Primer pago mensual estimado.', 'Interés total durante la vida del préstamo.', 'Cómo los pagos extra pueden reducir el plazo.', 'Calendario mensual con interés, principal y balance restante.']],
        ['Consejos útiles', ['Compara plazos cortos y largos antes de aceptar un préstamo.', 'Un pago mensual más bajo puede costar más en interés total.', 'Separa adicionales opcionales del precio del vehículo cuando sea posible.', 'Verifica si el seguro y los cargos caben en tu presupuesto mensual.']]
      ]
    }
  },
  '/amortization-calculator': {
    en: { title: 'Loan Amortization Calculator', description: 'View a monthly amortization schedule showing payment, principal, interest, PMI and remaining balance.', heading: 'Loan Amortization Calculator', intro: 'Amortization shows how each loan payment is divided between interest and principal. Early payments usually go more toward interest. Later payments go more toward reducing the balance.', sections: [['Why amortization matters', ['It helps you see the true cost of borrowing.', 'It shows how extra payments reduce interest.', 'It helps you compare loan terms and payoff dates.']], ['What Check My Payments shows', ['Every payment month.', 'Starting and ending balance.', 'Principal paid, interest paid and PMI if applicable.', 'CSV and PDF export options.']]] },
    es: { title: 'Calculadora de Amortización de Préstamos', description: 'Ve un calendario mensual con pago, principal, interés, PMI y balance restante.', heading: 'Calculadora de Amortización', intro: 'La amortización muestra cómo cada pago se divide entre interés y principal. Al inicio, normalmente se paga más interés. Más adelante, más del pago reduce el balance.', sections: [['Por qué importa', ['Ayuda a ver el costo real de tomar dinero prestado.', 'Muestra cómo los pagos extra reducen interés.', 'Ayuda a comparar plazos y fechas de pago final.']], ['Qué muestra Check My Payments', ['Cada mes de pago.', 'Balance inicial y final.', 'Principal, interés y PMI si aplica.', 'Exportación en CSV y PDF.']]] }
  },
  '/extra-payment-calculator': {
    en: { title: 'Extra Payment Calculator', description: 'Calculate how extra monthly payments can reduce interest and shorten the loan payoff timeline.', heading: 'Extra Payment Calculator', intro: 'Even a small extra payment can reduce interest and shorten the payoff timeline because extra money goes directly toward principal in the calculator.', sections: [['What to test', ['Try an extra monthly payment of 50, 100 or 200 dollars.', 'Compare the payoff time with and without extra payments.', 'Look at total interest saved before deciding.']], ['Important note', ['Some lenders have rules about prepayment or how extra payments are applied. Confirm with your lender before relying on extra payments as a payoff strategy.']]] },
    es: { title: 'Calculadora de Pagos Extra', description: 'Calcula cómo pagos extra mensuales pueden reducir interés y acortar el tiempo de pago.', heading: 'Calculadora de Pagos Extra', intro: 'Incluso un pago extra pequeño puede reducir interés y acortar el plazo porque el dinero extra se aplica directamente al principal en la calculadora.', sections: [['Qué probar', ['Prueba pagos extra de 50, 100 o 200 dólares mensuales.', 'Compara el plazo con y sin pagos extra.', 'Revisa el interés ahorrado antes de decidir.']], ['Nota importante', ['Algunos prestamistas tienen reglas sobre prepago o cómo se aplican pagos extra. Confirma con tu prestamista antes de depender de esta estrategia.']]] }
  },
  '/affordability-calculator': {
    en: { title: 'Loan Affordability Calculator', description: 'Estimate housing ratio, total debt ratio and whether a loan payment may feel comfortable, stretched or risky.', heading: 'Affordability Calculator', intro: 'Affordability is about more than the monthly payment. Check My Payments compares the estimated payment with gross income and other monthly debt to show whether the loan appears comfortable, stretched or risky.', sections: [['The 28 and 36 guideline', ['A common rule of thumb is to keep housing near 28 percent of gross income.', 'Another common rule is to keep total debt near 36 percent of gross income.', 'Real lender limits can be different, so this is only a planning guide.']], ['What to include', ['Mortgage or auto payment.', 'Taxes, insurance, HOA or fees.', 'Credit cards, student loans, car loans and other recurring debts.']]] },
    es: { title: 'Calculadora de Capacidad de Pago', description: 'Estima ratio de vivienda, ratio total de deuda y si el préstamo parece cómodo, estirado o riesgoso.', heading: 'Calculadora de Capacidad de Pago', intro: 'La capacidad de pago es más que el pago mensual. Check My Payments compara el pago estimado con el ingreso bruto y otras deudas mensuales para indicar si el préstamo parece cómodo, estirado o riesgoso.', sections: [['Guía 28 y 36', ['Una guía común es mantener vivienda cerca del 28 por ciento del ingreso bruto.', 'Otra guía común es mantener deuda total cerca del 36 por ciento.', 'Los límites reales de prestamistas pueden ser diferentes. Esto es solo una guía de planificación.']], ['Qué incluir', ['Pago de hipoteca o auto.', 'Impuestos, seguro, HOA o cargos.', 'Tarjetas, préstamos estudiantiles, autos y otras deudas recurrentes.']]] }
  },
  '/pmi-calculator': {
    en: { title: 'PMI Calculator for Mortgages', description: 'Estimate private mortgage insurance for home loans below 20 percent down and see when it may drop off.', heading: 'PMI Calculator', intro: 'Private mortgage insurance, often called PMI, may apply when a home buyer puts less than 20 percent down. Check My Payments estimates PMI as a monthly cost and removes it around 80 percent loan to value.', sections: [['How PMI is estimated', ['Check My Payments uses the annual PMI rate entered by the user.', 'The annual estimate is divided by 12 to estimate monthly PMI.', 'PMI is shown only while the balance is above about 80 percent of the original home value.']], ['Why PMI matters', ['PMI can materially change the first monthly payment.', 'A larger down payment may reduce or remove PMI.', 'Actual PMI depends on lender rules, credit profile and loan type.']]] },
    es: { title: 'Calculadora de PMI para Hipotecas', description: 'Estima seguro hipotecario privado para hipotecas con menos de 20 por ciento inicial y cuándo puede desaparecer.', heading: 'Calculadora de PMI', intro: 'El seguro hipotecario privado, conocido como PMI, puede aplicar cuando el comprador aporta menos de 20 por ciento inicial. Check My Payments estima el PMI como costo mensual y lo elimina cerca de 80 por ciento LTV.', sections: [['Cómo se estima', ['Check My Payments usa la tasa anual de PMI indicada por el usuario.', 'El estimado anual se divide entre 12 para estimar el PMI mensual.', 'El PMI aparece solo mientras el balance esté por encima de aproximadamente 80 por ciento del valor original.']], ['Por qué importa', ['El PMI puede cambiar mucho el primer pago mensual.', 'Un inicial mayor puede reducir o eliminar PMI.', 'El PMI real depende de reglas del prestamista, crédito y tipo de préstamo.']]] }
  }
};

function money(value) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0); }
function money2(value) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number.isFinite(value) ? value : 0); }
function num(value) { return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(Number.isFinite(value) ? value : 0); }
function csvNum(value) { return (Number.isFinite(value) ? value : 0).toFixed(2); }

function loanCalc(inputs, loanType, extraOverride = null, rateOverride = null) {
  const price = Math.max(Number(inputs.price) || 0, 0);
  const down = Math.min(Math.max(Number(inputs.downPayment) || 0, 0), price);
  const principal = Math.max(price - down, 0);
  const years = Math.max(Number(inputs.years) || 0, 0.01);
  const months = Math.max(Math.round(years * 12), 1);
  const rate = Math.max(rateOverride ?? (Number(inputs.rate) || 0), 0);
  const monthlyRate = rate / 100 / 12;
  const extra = Math.max(extraOverride ?? (Number(inputs.extraPayment) || 0), 0);
  const taxesMonthly = Math.max(Number(inputs.taxes) || 0, 0) / 12;
  const insuranceMonthly = Math.max(Number(inputs.insurance) || 0, 0) / 12;
  const hoaMonthly = Math.max(Number(inputs.hoa) || 0, 0);
  const originalLtv = price > 0 ? principal / price : 0;
  const includePmi = loanType === 'home' && originalLtv > 0.8;
  const monthlyPmiEstimate = includePmi ? principal * (Math.max(Number(inputs.pmiAnnualRate) || 0, 0) / 100) / 12 : 0;
  const basePayment = principal === 0 ? 0 : monthlyRate === 0 ? principal / months : principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  let balance = principal;
  let totalInterest = 0;
  let totalPrincipal = 0;
  let totalPmi = 0;
  const schedule = [];
  for (let month = 1; month <= months && balance > 0.005; month++) {
    const startBalance = balance;
    const interest = startBalance * monthlyRate;
    const currentLtv = price > 0 ? startBalance / price : 0;
    const pmi = monthlyPmiEstimate > 0 && currentLtv > 0.8 ? monthlyPmiEstimate : 0;
    const scheduledPrincipal = Math.max(basePayment - interest, 0);
    const principalPaid = Math.min(scheduledPrincipal + extra, startBalance);
    const loanPayment = Math.min(basePayment + extra, interest + principalPaid);
    balance = Math.max(startBalance - principalPaid, 0);
    totalInterest += interest;
    totalPrincipal += principalPaid;
    totalPmi += pmi;
    schedule.push({
      month,
      year: Math.ceil(month / 12),
      startBalance,
      loanPayment,
      totalPayment: loanPayment + taxesMonthly + insuranceMonthly + hoaMonthly + pmi,
      principalPaid,
      interestPaid: interest,
      pmiPaid: pmi,
      endingBalance: balance,
      totalInterest,
      totalPrincipal,
      totalPmi
    });
  }
  const payoffMonth = schedule.length;
  const firstPmi = schedule[0]?.pmiPaid || 0;
  const requiredMonthlyPayment = basePayment + taxesMonthly + insuranceMonthly + hoaMonthly + firstPmi;
  const monthlyTotal = requiredMonthlyPayment + extra;
  const noExtraInterest = extraOverride === 0 ? totalInterest : loanCalc(inputs, loanType, 0, rate).totalInterest;
  const totalRecurring = (taxesMonthly + insuranceMonthly + hoaMonthly) * payoffMonth;
  return {
    price, down, principal, rate, years, months, basePayment, taxesMonthly, insuranceMonthly, hoaMonthly, monthlyPmiEstimate, requiredMonthlyPayment, monthlyTotal,
    totalInterest, totalPrincipal, totalPmi, totalFinancedCost: principal + totalInterest + totalPmi, totalPaidIncludingDownPayment: down + principal + totalInterest + totalPmi + totalRecurring,
    payoffMonth, schedule, interestSaved: Math.max(noExtraInterest - totalInterest, 0)
  };
}

function currentText() { return t[state.lang]; }
function icon(name) {
  const paths = {
    calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h2M14 10h2M8 14h2M14 14h2M8 18h2M14 18h2"/>',
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
    car: '<path d="M5 17h14"/><path d="M6 17l1.5-6h9L18 17"/><path d="M8 17v2M16 17v2M8 13h8"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-7"/>',
    piggy: '<path d="M5 11a7 7 0 0 1 7-5h4a5 5 0 0 1 5 5v3a5 5 0 0 1-5 5H8l-2 3v-4a6 6 0 0 1-3-5v-1"/><path d="M16 10h.01"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/>',
    refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.2"/><path d="M3 12A9 9 0 0 1 18.5 5.8"/><path d="M18 2v4h-4"/><path d="M6 22v-4h4"/>'
  };
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.calc}</svg>`;
}

function navigate(path) { history.pushState({}, '', path); state.route = path; render(); window.scrollTo(0,0); }
window.addEventListener('popstate', () => { state.route = window.location.pathname; render(); });

function layout(content) {
  const L = currentText();
  return `
    <div class="container">
      <div class="top-ad">${L.topAd}</div>
      <nav class="nav">
        <a class="brand" href="/" data-nav="/">
          <span class="logo">${icon('calc')}</span>
          <span><strong>Check My Payments</strong><span>${L.brandSub}</span></span>
        </a>
        <div class="navlinks">
          ${navLink('/', L.calc)} ${navLink('/about', L.about)} ${navLink('/privacy', L.privacy)} ${navLink('/terms', L.terms)} ${navLink('/contact', L.contact)}
          <button class="lang" id="langBtn">${state.lang === 'en' ? 'English' : 'Español'} ▾</button>
          <button class="reset" id="resetBtn">${icon('refresh')} ${L.reset}</button>
        </div>
      </nav>
      ${content}
      <footer class="footer">
        <div><strong>Check My Payments</strong><br>${L.footerNote}</div>
        <div class="footer-links">${navLink('/about', L.about)} ${navLink('/privacy', L.privacy)} ${navLink('/terms', L.terms)} ${navLink('/contact', L.contact)}</div><div class="footer-guides">${guideLinks()}</div>
      </footer>
    </div>`;
}
function guideLinks() {
  const links = [
    ['/mortgage-calculator', state.lang === 'es' ? 'Calculadora de Hipoteca' : 'Mortgage Calculator'],
    ['/car-loan-calculator', state.lang === 'es' ? 'Calculadora de Auto' : 'Car Loan Calculator'],
    ['/amortization-calculator', state.lang === 'es' ? 'Amortización' : 'Amortization'],
    ['/extra-payment-calculator', state.lang === 'es' ? 'Pagos Extra' : 'Extra Payments'],
    ['/affordability-calculator', state.lang === 'es' ? 'Capacidad de Pago' : 'Affordability'],
    ['/pmi-calculator', 'PMI']
  ];
  return links.map(([path, label]) => `<a href="${path}" data-nav="${path}">${label}</a>`).join('');
}
function navLink(path, label) { return `<a href="${path}" data-nav="${path}" class="navlink ${state.route === path ? 'active' : ''}">${label}</a>`; }

function calcPage() {
  const L = currentText();
  const r = loanCalc(state.inputs, state.loanType);
  const noExtra = loanCalc(state.inputs, state.loanType, 0);
  const rateUp = loanCalc(state.inputs, state.loanType, state.inputs.extraPayment, (Number(state.inputs.rate) || 0) + .5);
  const monthlyIncome = Math.max(Number(state.inputs.grossIncome) || 0, 0) / 12;
  const housingRatio = monthlyIncome ? (r.requiredMonthlyPayment / monthlyIncome) * 100 : 0;
  const totalDebtRatio = monthlyIncome ? ((r.requiredMonthlyPayment + Math.max(Number(state.inputs.monthlyDebt) || 0, 0)) / monthlyIncome) * 100 : 0;
  const downPct = r.price ? (r.down / r.price) * 100 : 0;
  const payoff = formatMonths(r.payoffMonth);
  const noExtraPayoff = formatMonths(noExtra.payoffMonth);
  const inputs = inputList(L, downPct);
  return `
    <main class="hero-grid">
      <section>
        <div class="kicker">${icon('spark')} ${L.kicker}</div>
        <h1>${L.hero}</h1>
        <p class="lead">${L.lead}</p>
        <div class="mobile-start-note">${L.startNote}</div>
        <div class="mode-toggle">
          <button class="mode-btn ${state.loanType === 'home' ? 'active' : ''}" data-mode="home"><strong>${icon('home')} ${L.homeLoan}</strong><span>${L.homeSub}</span></button>
          <button class="mode-btn ${state.loanType === 'car' ? 'active' : ''}" data-mode="car"><strong>${icon('car')} ${L.carLoan}</strong><span>${L.carSub}</span></button>
        </div>
        <div class="card inputs">${inputs.map(field).join('')}</div>
      </section>
      <aside class="results">
        <div class="side-ad">${L.sideAd}</div>
        <div class="card payment"><small>${L.firstPayment}</small><div class="amount">${money(r.monthlyTotal)}</div><p>${L.required}: <strong>${money(r.requiredMonthlyPayment)}</strong>. ${L.extra}: <strong>${money(Number(state.inputs.extraPayment) || 0)}</strong>.</p><p>${L.paymentNote}</p></div>
        <div class="metrics">
          ${metric('home', L.metrics.amount, money(r.principal))}
          ${metric('piggy', L.metrics.saved, money(r.interestSaved))}
          ${metric('chart', L.metrics.interest, money(r.totalInterest))}
          ${metric('calc', L.metrics.payoff, payoff)}
          ${metric('shield', state.loanType === 'home' ? L.metrics.ratioHome : L.metrics.ratioCar, `${num(state.loanType === 'home' ? housingRatio : totalDebtRatio)}%`)}
          ${metric('clock', L.metrics.noExtra, noExtraPayoff)}
        </div>
        ${smartSummaryCard(L, r, noExtra, housingRatio, totalDebtRatio, downPct)}
        <div class="actions"><button class="primary-btn" id="pdfBtn">${L.buttons.pdf}</button><button class="secondary-btn" id="csvBtn">${L.buttons.csv}</button></div>
      </aside>
    </main>
    <section class="mid-ad">${L.midAd}</section>
    ${tabs(L)}
    <section id="tabContent">${tabContent(L, r, noExtra, rateUp, housingRatio, totalDebtRatio)}</section>
    ${education(L)}
    <div class="print-report" id="printReport">${printReport(L, r, housingRatio, totalDebtRatio)}</div>
  `;
}

function inputList(L, downPct) {
  const isCar = state.loanType === 'car';
  const labels = L.labels;
  const list = [
    { key:'price', label:isCar ? labels.priceCar : labels.priceHome, prefix:'$', min:isCar?5000:50000, max:isCar?250000:2000000, step:isCar?500:5000 },
    { key:'downPayment', label:labels.downPayment, prefix:'$', min:0, max:state.inputs.price, step:isCar?250:1000, help:`${num(downPct)}% ${L.down}` },
    { key:'rate', label:labels.rate, suffix:'%', min:0, max:25, step:.05 },
    { key:'years', label:labels.years, suffix:L.yearsUnit, min:1, max:isCar?8:40, step:1 },
    { key:'taxes', label:isCar ? labels.taxesCar : labels.taxesHome, prefix:'$', min:0, max:isCar?5000:50000, step:50 },
    { key:'insurance', label:labels.insurance, prefix:'$', min:0, max:isCar?10000:20000, step:100 },
    { key:'hoa', label:isCar ? labels.hoaCar : labels.hoaHome, prefix:'$', min:0, max:isCar?1000:3000, step:25 },
    { key:'extraPayment', label:labels.extra, prefix:'$', min:0, max:5000, step:25 }
  ];
  if (!isCar) list.push({ key:'pmiAnnualRate', label:labels.pmi, suffix:'%', min:0, max:2.5, step:.05, help: downPct < 20 ? L.pmiNeeded : L.noPmi });
  list.push({ key:'grossIncome', label:labels.income, prefix:'$', min:0, max:500000, step:1000 }, { key:'monthlyDebt', label:labels.debt, prefix:'$', min:0, max:20000, step:50 });
  return list;
}
function field(f) {
  const current = Number(state.inputs[f.key]) || 0;
  const min = Number(f.min) || 0;
  const max = Number(f.max) || 0;
  const pct = max > min ? Math.min(Math.max(((current - min) / (max - min)) * 100, 0), 100) : 0;
  return `<div class="field"><label>${f.label}${f.help ? `<span class="help">${f.help}</span>` : ''}</label><div class="input-wrap">${f.prefix ? `<span>${f.prefix}</span>` : ''}<input type="number" inputmode="decimal" autocomplete="off" data-input="${f.key}" value="${state.inputs[f.key]}" step="${f.step}">${f.suffix ? `<span>${f.suffix}</span>` : ''}</div><div class="custom-slider" data-slider="${f.key}" data-min="${f.min}" data-max="${f.max}" data-step="${f.step}" aria-hidden="false"><div class="custom-slider-track"><div class="custom-slider-fill" data-slider-fill="${f.key}" style="width:${pct}%"></div></div><button type="button" class="custom-slider-thumb" data-range="${f.key}" aria-label="${f.label}" aria-valuemin="${f.min}" aria-valuemax="${f.max}" aria-valuenow="${state.inputs[f.key]}" style="left:${pct}%"></button></div></div>`;
}
function metric(i, label, value) { return `<div class="card metric"><span class="icon">${icon(i)}</span><small>${label}</small><strong>${value}</strong></div>`; }
function tabs(L) { return `<div class="tabs">${['charts','breakdown','compare','schedule'].map(k => `<button class="tab ${state.activeTab === k ? 'active' : ''}" data-tab="${k}">${L.tabs[k]}</button>`).join('')}</div>`; }
function tabContent(L, r, noExtra, rateUp, housingRatio, totalDebtRatio) {
  if (state.activeTab === 'breakdown') return `<div class="card panel"><div class="stat-grid">${bigStat(L.bigStats.pi, money(r.basePayment))}${bigStat(state.loanType === 'home' ? L.bigStats.ti : L.bigStats.fi, money(r.taxesMonthly + r.insuranceMonthly))}${bigStat(L.bigStats.totalPaid, money(r.totalPaidIncludingDownPayment))}</div></div>`;
  if (state.activeTab === 'compare') return comparisonPanel(L, r, noExtra, rateUp, housingRatio, totalDebtRatio);
  if (state.activeTab === 'schedule') return scheduleTable(L, r, true);
  return `<div class="panel-grid"><div class="card panel"><h2>${L.balance}</h2>${lineChart(r)}</div><div class="card panel"><h2>${L.breakdown}</h2>${donutChart(L, r)}</div></div>`;
}
function bigStat(label, value) { return `<div class="big-stat"><small>${label}</small><strong>${value}</strong></div>`; }

function comparisonPanel(L, r, noExtra, rateUp, housingRatio, totalDebtRatio) {
  const shortYears = state.loanType === 'home'
    ? Math.min(Math.max(15, 1), Math.max(Number(state.inputs.years) || 30, 1))
    : Math.max(1, Math.min((Number(state.inputs.years) || 5) - 1, Number(state.inputs.years) || 5));
  const shortScenarioInputs = { ...state.inputs, years: shortYears };
  const shorter = loanCalc(shortScenarioInputs, state.loanType, Number(state.inputs.extraPayment) || 0, Number(state.inputs.rate) || 0);
  const scenarios = [
    { label: state.lang === 'es' ? 'Actual' : 'Current', result: r, note: state.lang === 'es' ? 'Tus datos actuales' : 'Your current inputs' },
    { label: state.lang === 'es' ? 'Sin pago extra' : 'No extra payment', result: noExtra, note: state.lang === 'es' ? 'Mide el valor real del pago extra' : 'Shows the true value of extra payments' },
    { label: state.lang === 'es' ? 'Tasa +0.50%' : 'Rate +0.50%', result: rateUp, note: state.lang === 'es' ? 'Prueba sensibilidad a tasas' : 'Tests rate sensitivity' },
    { label: state.lang === 'es' ? `Plazo ${shortYears} años` : `${shortYears}-year term`, result: shorter, note: state.lang === 'es' ? 'Menos interés, mayor pago' : 'Less interest, higher payment' }
  ];
  const bestMonthly = Math.min(...scenarios.map(s => s.result.monthlyTotal));
  const bestInterest = Math.min(...scenarios.map(s => s.result.totalInterest));
  const score = affordabilityStatus(housingRatio, totalDebtRatio, state.lang);
  const monthlyIncome = Math.max(Number(state.inputs.grossIncome) || 0, 0) / 12;
  const safeHousingPayment = monthlyIncome * 0.28;
  const safeTotalDebtPayment = Math.max(monthlyIncome * 0.36 - Math.max(Number(state.inputs.monthlyDebt) || 0, 0), 0);
  const targetPayment = Math.min(safeHousingPayment || Infinity, safeTotalDebtPayment || Infinity);
  const estimatedRoom = Number.isFinite(targetPayment) ? targetPayment - r.requiredMonthlyPayment : 0;
  return `<div class="card panel compare-panel">
    <div class="compare-header">
      <div><h2>${state.lang === 'es' ? 'Comparador de escenarios' : 'Scenario comparison'}</h2><p class="copy">${state.lang === 'es' ? 'Compara el pago mensual, interés total, pago final y costo total para tomar una mejor decisión.' : 'Compare monthly payment, total interest, payoff timing, and total paid so visitors can make a clearer decision.'}</p></div>
      <div class="confidence-badge">${state.lang === 'es' ? 'Auditoría interna activa' : 'Internal calculation audit active'}</div>
    </div>
    <div class="scenario-grid">
      ${scenarios.map(s => scenarioCard(s, bestMonthly, bestInterest)).join('')}
    </div>
    <div class="affordability-card ${score.className}">
      <div>
        <small>${state.lang === 'es' ? 'Lectura de capacidad de pago' : 'Affordability reading'}</small>
        <h3>${score.title}</h3>
        <p>${score.message}</p>
      </div>
      <div class="ratio-bars">
        ${ratioBar(state.lang === 'es' ? 'Vivienda' : 'Housing', housingRatio, 28)}
        ${ratioBar(state.lang === 'es' ? 'Deuda total' : 'Total debt', totalDebtRatio, 36)}
      </div>
      <div class="affordability-note">
        <strong>${state.lang === 'es' ? 'Espacio estimado frente a guía 28/36:' : 'Estimated room vs 28/36 guide:'}</strong> ${money(estimatedRoom)} ${state.lang === 'es' ? 'mensual' : 'per month'}
      </div>
    </div>
    ${manualLoanComparisonPanel()}
  </div>`;
}
function scenarioCard(item, bestMonthly, bestInterest) {
  const r = item.result;
  const tags = [];
  if (Math.abs(r.monthlyTotal - bestMonthly) < 0.5) tags.push(state.lang === 'es' ? 'Pago más bajo' : 'Lowest payment');
  if (Math.abs(r.totalInterest - bestInterest) < 0.5) tags.push(state.lang === 'es' ? 'Menor interés' : 'Lowest interest');
  return `<article class="scenario-card">
    <div class="scenario-title"><strong>${item.label}</strong>${tags.map(t => `<span>${t}</span>`).join('')}</div>
    <p>${item.note}</p>
    <div class="scenario-numbers">
      <div><small>${state.lang === 'es' ? 'Pago mensual' : 'Monthly payment'}</small><b>${money(r.monthlyTotal)}</b></div>
      <div><small>${state.lang === 'es' ? 'Interés total' : 'Total interest'}</small><b>${money(r.totalInterest)}</b></div>
      <div><small>${state.lang === 'es' ? 'Pago final' : 'Payoff'}</small><b>${formatMonths(r.payoffMonth)}</b></div>
      <div><small>${state.lang === 'es' ? 'Total pagado' : 'Total paid'}</small><b>${money(r.totalPaidIncludingDownPayment)}</b></div>
    </div>
  </article>`;
}

function manualLoanComparisonPanel() {
  const L = currentText();
  const aInputs = { ...state.inputs };
  const bInputs = normalizeCompareB();
  const a = loanCalc(aInputs, state.loanType);
  const b = loanCalc(bInputs, state.loanType);
  const monthlyDiff = b.monthlyTotal - a.monthlyTotal;
  const interestDiff = b.totalInterest - a.totalInterest;
  const payoffDiff = b.payoffMonth - a.payoffMonth;
  const totalDiff = b.totalPaidIncludingDownPayment - a.totalPaidIncludingDownPayment;
  const monthlyWinner = a.monthlyTotal <= b.monthlyTotal ? 'A' : 'B';
  const interestWinner = a.totalInterest <= b.totalInterest ? 'A' : 'B';
  const payoffWinner = a.payoffMonth <= b.payoffMonth ? 'A' : 'B';
  return `<section class="loan-ab-compare">
    <div class="compare-header compact">
      <div>
        <h2>${state.lang === 'es' ? 'Comparar dos préstamos' : 'Compare two loans'}</h2>
        <p class="copy">${state.lang === 'es' ? 'El préstamo A usa los valores principales de arriba. Puedes ajustar el préstamo B para comparar dos opciones reales lado a lado.' : 'Loan A uses the main values above. Adjust Loan B to compare two real options side by side.'}</p>
      </div>
      <button type="button" class="secondary-btn mini" data-copy-to-b>${state.lang === 'es' ? 'Copiar A a B' : 'Copy A to B'}</button>
    </div>
    <div class="ab-grid">
      ${loanSummaryCard('A', state.lang === 'es' ? 'Préstamo A' : 'Loan A', a, state.lang === 'es' ? 'Tus valores principales' : 'Main calculator values')}
      <div class="scenario-card loan-b-editor">
        <div class="scenario-title"><strong>${state.lang === 'es' ? 'Préstamo B' : 'Loan B'}</strong><span>${state.lang === 'es' ? 'Editable' : 'Editable'}</span></div>
        <div class="compare-input-grid">
          ${compareInput('price', state.loanType === 'home' ? L.labels.priceHome : L.labels.priceCar, '$')}
          ${compareInput('downPayment', L.labels.downPayment, '$')}
          ${compareInput('rate', L.labels.rate, '', '%')}
          ${compareInput('years', L.labels.years, '', L.yearsUnit)}
          ${compareInput('taxes', state.loanType === 'home' ? L.labels.taxesHome : L.labels.taxesCar, '$')}
          ${compareInput('insurance', L.labels.insurance, '$')}
          ${compareInput('hoa', state.loanType === 'home' ? L.labels.hoaHome : L.labels.hoaCar, '$')}
          ${compareInput('extraPayment', L.labels.extra, '$')}
          ${state.loanType === 'home' ? compareInput('pmiAnnualRate', L.labels.pmi, '', '%') : ''}
        </div>
      </div>
      ${loanSummaryCard('B', state.lang === 'es' ? 'Resultado B' : 'Loan B result', b, state.lang === 'es' ? 'Resultado editable' : 'Editable result')}
    </div>
    <div class="ab-winner-grid">
      ${winnerTile(state.lang === 'es' ? 'Pago mensual más bajo' : 'Lower monthly payment', monthlyWinner, Math.abs(monthlyDiff), state.lang === 'es' ? 'diferencia mensual' : 'monthly difference')}
      ${winnerTile(state.lang === 'es' ? 'Menor interés total' : 'Lower total interest', interestWinner, Math.abs(interestDiff), state.lang === 'es' ? 'diferencia de interés' : 'interest difference')}
      ${winnerTile(state.lang === 'es' ? 'Pago final más rápido' : 'Faster payoff', payoffWinner, Math.abs(payoffDiff), state.lang === 'es' ? 'meses de diferencia' : 'months difference', true)}
      ${winnerTile(state.lang === 'es' ? 'Menor total pagado' : 'Lower total paid', totalDiff <= 0 ? 'B' : 'A', Math.abs(totalDiff), state.lang === 'es' ? 'diferencia total' : 'total difference')}
    </div>
    <p class="compare-explainer">${comparisonPlainLanguage(a, b)}</p>
  </section>`;
}

function normalizeCompareB() {
  const base = { ...state.inputs, ...state.compareB };
  base.price = Math.max(Number(base.price) || 0, 0);
  base.downPayment = Math.min(Math.max(Number(base.downPayment) || 0, 0), base.price);
  ['rate','years','taxes','insurance','hoa','extraPayment','pmiAnnualRate','grossIncome','monthlyDebt'].forEach(k => { base[k] = Math.max(Number(base[k]) || 0, 0); });
  if (base.years <= 0) base.years = 1;
  state.compareB = { ...state.compareB, ...base };
  return base;
}

function compareInput(key, label, prefix = '', suffix = '') {
  const value = Number(state.compareB[key] ?? state.inputs[key] ?? 0);
  return `<label class="compare-field"><span>${label}</span><div>${prefix ? `<em>${prefix}</em>` : ''}<input type="number" inputmode="decimal" autocomplete="off" data-compare-input="${key}" value="${value}">${suffix ? `<em>${suffix}</em>` : ''}</div></label>`;
}

function loanSummaryCard(letter, title, r, note) {
  return `<article class="scenario-card loan-summary-card">
    <div class="scenario-title"><strong>${title}</strong><span>${letter}</span></div>
    <p>${note}</p>
    <div class="scenario-numbers">
      <div><small>${state.lang === 'es' ? 'Pago mensual' : 'Monthly payment'}</small><b>${money(r.monthlyTotal)}</b></div>
      <div><small>${state.lang === 'es' ? 'Monto del préstamo' : 'Loan amount'}</small><b>${money(r.principal)}</b></div>
      <div><small>${state.lang === 'es' ? 'Interés total' : 'Total interest'}</small><b>${money(r.totalInterest)}</b></div>
      <div><small>${state.lang === 'es' ? 'Pago final' : 'Payoff'}</small><b>${formatMonths(r.payoffMonth)}</b></div>
      <div><small>${state.lang === 'es' ? 'Total pagado' : 'Total paid'}</small><b>${money(r.totalPaidIncludingDownPayment)}</b></div>
    </div>
  </article>`;
}

function winnerTile(title, winner, amount, note, months = false) {
  const value = months ? `${Math.round(amount)} ${state.lang === 'es' ? 'meses' : 'months'}` : money(amount);
  return `<div class="winner-tile"><small>${title}</small><strong>${state.lang === 'es' ? 'Gana' : 'Winner'} ${winner}</strong><span>${value} ${note}</span></div>`;
}

function comparisonPlainLanguage(a, b) {
  const monthlyDiff = Math.abs(b.monthlyTotal - a.monthlyTotal);
  const interestDiff = Math.abs(b.totalInterest - a.totalInterest);
  const lowerMonthly = a.monthlyTotal <= b.monthlyTotal ? 'A' : 'B';
  const lowerInterest = a.totalInterest <= b.totalInterest ? 'A' : 'B';
  if (state.lang === 'es') {
    return `Lectura rápida: el préstamo ${lowerMonthly} tiene el pago mensual más bajo por aproximadamente ${money(monthlyDiff)}, mientras que el préstamo ${lowerInterest} genera menos interés total por aproximadamente ${money(interestDiff)}. Usa esta comparación para equilibrar flujo de caja mensual contra costo total.`;
  }
  return `Quick read: Loan ${lowerMonthly} has the lower monthly payment by about ${money(monthlyDiff)}, while Loan ${lowerInterest} produces less total interest by about ${money(interestDiff)}. Use this comparison to balance monthly cash flow against total cost.`;
}

function setCompareBValue(key, value, shouldRender = true) {
  const numeric = Number(value);
  state.compareB[key] = Number.isFinite(numeric) ? numeric : 0;
  if (key === 'price') {
    state.compareB.price = Math.max(state.compareB.price, 0);
    if (state.compareB.downPayment > state.compareB.price) state.compareB.downPayment = state.compareB.price;
  }
  if (key === 'downPayment') state.compareB.downPayment = Math.min(Math.max(state.compareB.downPayment, 0), Math.max(Number(state.compareB.price) || 0, 0));
  if (['rate','years','taxes','insurance','hoa','extraPayment','pmiAnnualRate','grossIncome','monthlyDebt'].includes(key)) state.compareB[key] = Math.max(state.compareB[key], 0);
  if (shouldRender) render();
}

function copyCurrentToCompareB() {
  state.compareB = { ...state.inputs };
  render();
}
function affordabilityStatus(housingRatio, totalDebtRatio, lang) {
  if (housingRatio <= 28 && totalDebtRatio <= 36) return { className: 'safe', title: lang === 'es' ? 'Zona cómoda' : 'Comfort zone', message: lang === 'es' ? 'Según la guía 28/36, este escenario parece relativamente cómodo. Confirma siempre con un prestamista.' : 'Using the 28/36 guide, this scenario appears relatively comfortable. Always confirm with a lender.' };
  if (housingRatio <= 33 && totalDebtRatio <= 43) return { className: 'stretch', title: lang === 'es' ? 'Zona de cuidado' : 'Stretch zone', message: lang === 'es' ? 'El pago puede ser posible, pero deja menos margen para ahorro, emergencias y gastos variables.' : 'The payment may be possible, but it leaves less room for savings, emergencies, and variable expenses.' };
  return { className: 'risk', title: lang === 'es' ? 'Zona riesgosa' : 'Risk zone', message: lang === 'es' ? 'Este escenario luce pesado frente al ingreso indicado. Considera bajar el precio, aumentar inicial o extender plazo.' : 'This scenario looks heavy compared with the income entered. Consider a lower price, larger down payment, or longer term.' };
}

function comfortScore(r, housingRatio, totalDebtRatio, downPct) {
  const es = state.lang === 'es';
  const safeHousing = Number.isFinite(housingRatio) ? Math.max(housingRatio, 0) : 999;
  const safeDebt = Number.isFinite(totalDebtRatio) ? Math.max(totalDebtRatio, 0) : 999;
  const safeDown = Number.isFinite(downPct) ? Math.max(downPct, 0) : 0;
  let score = 100;

  // Main affordability factors. These intentionally use smooth deductions so
  // the score changes consistently as users move inputs up or down.
  const housingOver = Math.max(0, safeHousing - 28);
  const debtOver = Math.max(0, safeDebt - 36);
  score -= Math.min(housingOver * 2.4, 34);
  score -= Math.min(debtOver * 2.1, 34);

  // Extra pressure once ratios move beyond the looser 33/43 stretch area.
  score -= Math.min(Math.max(0, safeHousing - 33) * 1.2, 10);
  score -= Math.min(Math.max(0, safeDebt - 43) * 1.1, 10);

  // Down payment strength, mostly for mortgages where PMI and lower equity matter.
  if (state.loanType === 'home' && safeDown < 20) score -= Math.min((20 - safeDown) * 0.65, 13);

  // Long term interest burden. This is capped so it informs the score without
  // overwhelming the more important monthly affordability ratios.
  if (r.principal > 0) {
    const interestLoad = (r.totalInterest / r.principal) * 100;
    score -= Math.min(Math.max(0, interestLoad - 75) * 0.05, 9);
  }

  score = Math.round(Math.max(0, Math.min(100, score)));
  if (score >= 85) return { score, className: 'strong', color: '#34d399', title: es ? 'Excelente' : 'Excellent', message: es ? 'El escenario luce muy cómodo según las guías usadas.' : 'This scenario looks very comfortable using the planning guides.' };
  if (score >= 70) return { score, className: 'steady', color: '#84cc16', title: es ? 'Fuerte' : 'Strong', message: es ? 'El escenario luce cómodo, pero confirma costos reales.' : 'This scenario looks comfortable, but real costs should be verified.' };
  if (score >= 55) return { score, className: 'watch', color: '#fbbf24', title: es ? 'Manejable' : 'Manageable', message: es ? 'El escenario parece posible, pero deja menos margen.' : 'This scenario appears possible, but leaves less room.' };
  if (score >= 40) return { score, className: 'tight', color: '#fb923c', title: es ? 'Ajustado' : 'Tight', message: es ? 'El pago puede sentirse pesado si cambian gastos o ingresos.' : 'The payment may feel tight if expenses or income change.' };
  return { score, className: 'caution', color: '#fb7185', title: es ? 'Alto riesgo' : 'High caution', message: es ? 'Este escenario necesita revisión cuidadosa antes de decidir.' : 'This scenario needs careful review before deciding.' };
}

function smartSummaryText(L, r, noExtra, housingRatio, totalDebtRatio, downPct) {
  const score = comfortScore(r, housingRatio, totalDebtRatio, downPct);
  const extra = Math.max(Number(state.inputs.extraPayment) || 0, 0);
  const monthsSaved = Math.max(noExtra.payoffMonth - r.payoffMonth, 0);
  if (state.lang === 'es') {
    const extraPart = extra > 0
      ? `Con el pago extra de ${money(extra)}, podrías ahorrar cerca de ${money(r.interestSaved)} en interés y terminar aproximadamente ${formatMonths(monthsSaved)} antes.`
      : 'No se incluye pago extra en este escenario.';
    return `Tu primer pago mensual estimado es ${money(r.monthlyTotal)}. El pago requerido es ${money(r.requiredMonthlyPayment)}. ${extraPart} La lectura de capacidad de pago es ${score.title.toLowerCase()} con un ratio de vivienda de ${num(housingRatio)}% y un ratio total de deuda de ${num(totalDebtRatio)}%.`;
  }
  const extraPart = extra > 0
    ? `With the extra payment of ${money(extra)}, you could save about ${money(r.interestSaved)} in interest and finish about ${formatMonths(monthsSaved)} sooner.`
    : 'No extra payment is included in this scenario.';
  return `Your estimated first monthly payment is ${money(r.monthlyTotal)}. The required payment is ${money(r.requiredMonthlyPayment)}. ${extraPart} The affordability reading is ${score.title.toLowerCase()} with a housing ratio of ${num(housingRatio)}% and a total debt ratio of ${num(totalDebtRatio)}%.`;
}

function smartSummaryCard(L, r, noExtra, housingRatio, totalDebtRatio, downPct) {
  const score = comfortScore(r, housingRatio, totalDebtRatio, downPct);
  const text = smartSummaryText(L, r, noExtra, housingRatio, totalDebtRatio, downPct);
  const title = state.lang === 'es' ? 'Resumen inteligente' : 'Smart summary';
  const scoreLabel = state.lang === 'es' ? 'Puntaje de comodidad' : 'Comfort score';
  const scoreNote = state.lang === 'es' ? 'Más alto es mejor' : 'Higher is better';
  const share = state.lang === 'es' ? 'Copiar enlace del cálculo' : 'Copy calculation link';
  const note = state.lang === 'es' ? 'Guía educativa. No es aprobación ni cotización de préstamo.' : 'Educational guide only. Not a loan approval or lender quote.';
  return `<div class="card smart-summary ${score.className}">
    <div class="summary-main">
      <div><small>${title}</small><p>${text}</p><em>${note}</em></div>
      <div class="score-wrap">
        <div class="score-orb" style="--score:${score.score};--score-color:${score.color}"><strong>${score.score}</strong><span>${scoreLabel}</span></div>
        <b>${score.title}</b>
        <em>${scoreNote}</em>
      </div>
    </div>
    <button class="secondary-btn share-btn" id="shareBtn" type="button">${share}</button>
  </div>`;
}

function buildShareUrl() {
  const params = new URLSearchParams();
  params.set('type', state.loanType);
  params.set('lang', state.lang);
  ['price','downPayment','rate','years','taxes','insurance','hoa','extraPayment','pmiAnnualRate','grossIncome','monthlyDebt'].forEach(key => params.set(key, String(state.inputs[key])));
  return `${SITE_URL}/?${params.toString()}`;
}

async function copyShareLink() {
  const url = buildShareUrl();
  try {
    await navigator.clipboard.writeText(url);
    alert(state.lang === 'es' ? 'Enlace del cálculo copiado.' : 'Calculation link copied.');
  } catch (_) {
    window.prompt(state.lang === 'es' ? 'Copia este enlace:' : 'Copy this link:', url);
  }
}

function applyUrlParams() {
  const params = new URLSearchParams(window.location.search);
  if (![...params.keys()].length) return;
  const type = params.get('type');
  if (type === 'home' || type === 'car') state.loanType = type;
  const lang = params.get('lang');
  if (lang === 'en' || lang === 'es') { state.lang = lang; localStorage.setItem('check_my_payments_lang', lang); }
  ['price','downPayment','rate','years','taxes','insurance','hoa','extraPayment','pmiAnnualRate','grossIncome','monthlyDebt'].forEach(key => {
    if (params.has(key)) {
      const value = Number(params.get(key));
      if (Number.isFinite(value)) state.inputs[key] = Math.max(value, 0);
    }
  });
  if (state.inputs.downPayment > state.inputs.price) state.inputs.downPayment = state.inputs.price;
}

function ratioBar(label, value, guide) {
  const width = Math.min(value, 80) / 80 * 100;
  return `<div class="ratio-row"><div><span>${label}</span><strong>${num(value)}%</strong></div><div class="ratio-track"><i style="width:${width}%"></i><em style="left:${Math.min(guide/80*100,100)}%"></em></div><small>${state.lang === 'es' ? 'Guía' : 'Guide'}: ${guide}%</small></div>`;
}


function lineChart(r) {
  const data = r.schedule;
  if (!data.length) return '<p class="copy">No data</p>';
  const w = 760, h = 330, p = 52;
  const max = Math.max(r.principal, ...data.map(d => d.endingBalance), 1);
  const x = i => p + (i / Math.max(data.length - 1, 1)) * (w - p * 1.4);
  const y = v => h - p - (v / max) * (h - p * 1.6);
  const points = data.map((d, i) => `${x(i)},${y(d.endingBalance)}`).join(' ');
  const area = `${p},${h-p} ${points} ${x(data.length-1)},${h-p}`;
  const ticks = [0, .25, .5, .75, 1];
  const monthTicks = data.length > 80 ? data.filter((_,i)=>i%60===0 || i===data.length-1) : data.filter((_,i)=>i%12===0 || i===data.length-1);
  return `<div class="chart-wrap"><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Balance over time"><defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#66e4f2" stop-opacity=".35"/><stop offset="1" stop-color="#66e4f2" stop-opacity="0"/></linearGradient></defs>
  ${ticks.map(tick => `<line class="grid" x1="${p}" x2="${w-p/2}" y1="${y(max*tick)}" y2="${y(max*tick)}"/><text class="tick" x="10" y="${y(max*tick)+5}">${money(max*tick)}</text>`).join('')}
  ${monthTicks.map(d => `<line class="grid" y1="${p/2}" y2="${h-p}" x1="${x(d.month-1)}" x2="${x(d.month-1)}"/><text class="tick" text-anchor="middle" x="${x(d.month-1)}" y="${h-14}">${d.month}</text>`).join('')}
  <line class="axis" x1="${p}" y1="${p/2}" x2="${p}" y2="${h-p}"/><line class="axis" x1="${p}" y1="${h-p}" x2="${w-p/2}" y2="${h-p}"/><polygon class="chart-area" points="${area}"/><polyline class="chart-line" points="${points}"/></svg></div>`;
}

function breakdownItems(L, r) {
  return [
    { name: L.pi, value: r.basePayment },
    { name: state.loanType === 'home' ? L.taxes : L.fees, value: r.taxesMonthly },
    { name: L.insurance, value: r.insuranceMonthly },
    { name: state.loanType === 'home' ? L.hoa : L.addons, value: r.hoaMonthly },
    { name: L.pmi, value: r.schedule[0]?.pmiPaid || 0 },
    { name: L.extraPayment, value: Number(state.inputs.extraPayment) || 0 }
  ].filter(x => x.value > 0.005);
}
function donutChart(L, r) {
  const items = breakdownItems(L, r);
  const total = r.monthlyTotal;
  if (!items.length || total <= 0) return `<p class="copy">${money(0)}</p>`;

  // The donut is based on the exact first-month payment components.
  // Center total uses r.monthlyTotal, the same value shown in the main payment card.
  let cumulative = -90;
  const segs = items.map((it, idx) => {
    const angle = Math.max((it.value / total) * 360, 0.001);
    const start = cumulative;
    const end = cumulative + angle;
    cumulative = end;
    return `<path class="donut-seg" d="${arcPath(150,150,98,58,start,end)}" fill="${palette[idx % palette.length]}"></path>`;
  }).join('');

  const legendRows = items.map((it, idx) => {
    const pct = total ? (it.value / total) * 100 : 0;
    return `<div class="legend-row"><span class="legend-left"><span class="dot" style="background:${palette[idx % palette.length]}"></span><span>${it.name}<em>${num(pct)}%</em></span></span><strong>${money(it.value)}</strong></div>`;
  }).join('');

  return `<div class="breakdown-summary"><span>${L.breakdownTotal}</span><strong>${money(total)}</strong></div><div class="donut-area"><div><div class="donut"><svg viewBox="0 0 300 300" role="img" aria-label="${L.breakdown}"><circle cx="150" cy="150" r="98" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="40"/>${segs}</svg></div><div class="donut-center"><div><strong>${money(total)}</strong><span>${L.breakdownTotal}</span></div></div></div><div class="legend">${legendRows}</div></div><p class="chart-note">${L.breakdownNote}</p>`;
}
function arcPath(cx, cy, rOuter, rInner, startAngle, endAngle) {
  const startOuter = polar(cx, cy, rOuter, endAngle);
  const endOuter = polar(cx, cy, rOuter, startAngle);
  const startInner = polar(cx, cy, rInner, startAngle);
  const endInner = polar(cx, cy, rInner, endAngle);
  const large = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${startOuter.x} ${startOuter.y} A ${rOuter} ${rOuter} 0 ${large} 0 ${endOuter.x} ${endOuter.y} L ${startInner.x} ${startInner.y} A ${rInner} ${rInner} 0 ${large} 1 ${endInner.x} ${endInner.y} Z`;
}
function polar(cx, cy, r, angle) { const rad = (angle - 90) * Math.PI / 180; return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }; }

function scheduleTable(L, r, full = false) {
  const rows = full ? r.schedule : r.schedule.slice(0, 24);
  return `<div class="card panel"><h2>${L.scheduleTitle}</h2><p class="copy">${L.scheduleSub}</p><div class="table-wrap"><table><thead><tr>${L.table.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr><td>${row.month}</td><td>${row.year}</td><td>${money2(row.startBalance)}</td><td>${money2(row.totalPayment)}</td><td>${money2(row.principalPaid)}</td><td>${money2(row.interestPaid)}</td><td>${money2(row.pmiPaid)}</td><td>${money2(row.endingBalance)}</td></tr>`).join('')}</tbody></table></div></div>`;
}
function education(L) { return `<section class="card education"><h2>${L.eduTitle}</h2><ul>${L.edu.map(x=>`<li>${x}</li>`).join('')}</ul><h2>${L.factorsTitle}</h2><ul>${L.factors.map(x=>`<li>${x}</li>`).join('')}</ul><h2>${L.formulaTitle}</h2><p>${L.formulaText}</p><p><strong>${L.disclaimer}</strong></p></section>`; }
function page(kind) {
  const L = currentText();
  const map = {
    about: [L.pageAboutTitle, L.pageAbout, aboutExtra()],
    privacy: [L.pagePrivacyTitle, L.pagePrivacy, privacyExtra()],
    terms: [L.pageTermsTitle, L.pageTerms, termsExtra()],
    contact: [L.pageContactTitle, `${L.pageContact} <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`, contactExtra()]
  };
  const [title, body, extra] = map[kind] || map.about;
  return `<main class="card page"><h1>${title}</h1><p>${body}</p>${extra}<p class="fine-print">${L.disclaimer}</p></main>`;
}
function aboutExtra() {
  const versionNote = state.lang === 'es'
    ? `<div class="version-note"><strong>Versión del sitio</strong><span>v${APP_VERSION}</span></div>`
    : `<div class="version-note"><strong>Site version</strong><span>v${APP_VERSION}</span></div>`;
  const body = state.lang === 'es'
    ? `<h2>Qué hace esta herramienta</h2><ul><li>Calcula pagos de préstamos de vivienda y auto.</li><li>Muestra amortización mensual completa.</li><li>Compara escenarios y capacidad de pago.</li><li>Genera CSV y reportes PDF para compartir.</li><li>No ofrece préstamos ni aprobación de crédito.</li></ul>`
    : `<h2>What this tool does</h2><ul><li>Calculates home and auto loan payments.</li><li>Shows a complete monthly amortization schedule.</li><li>Compares scenarios and affordability.</li><li>Generates CSV and PDF reports to share.</li><li>Does not offer loans or credit approvals.</li></ul>`;
  return body + versionNote;
}
function privacyExtra() {
  return state.lang === 'es'
    ? `<h2>Privacidad de los cálculos</h2><p>Los cálculos se realizan en tu navegador. No necesitas crear cuenta para usar la calculadora.</p>`
    : `<h2>Calculation privacy</h2><p>Calculations run in your browser. You do not need to create an account to use the calculator.</p>`;
}
function termsExtra() {
  return state.lang === 'es'
    ? `<h2>Uso responsable</h2><p>Los resultados pueden ayudarte a planificar, pero no sustituyen una cotización formal de un prestamista.</p>`
    : `<h2>Responsible use</h2><p>Results can help with planning, but they do not replace a formal lender quote.</p>`;
}
function contactExtra() {
  return state.lang === 'es'
    ? `<h2>Correcciones y sugerencias</h2><p>Si encuentras un error o quieres sugerir una mejora, escríbenos. Revisamos la precisión de los cálculos con cuidado.</p>`
    : `<h2>Corrections and suggestions</h2><p>If you find an error or want to suggest an improvement, contact us. We review calculation accuracy carefully.</p>`;
}
function seoPage(path) {
  const page = seoPages[path];
  if (!page) return null;
  const data = page[state.lang] || page.en;
  return `<main class="card page seo-page">
    <div class="kicker">${icon('spark')} ${state.lang === 'es' ? 'Guía de Calculadora' : 'Calculator Guide'}</div>
    <h1>${data.heading}</h1>
    <p class="page-intro">${data.intro}</p>
    <a class="inline-cta" href="/" data-nav="/">${state.lang === 'es' ? 'Abrir calculadora' : 'Open calculator'}</a>
    ${data.sections.map(([title, items]) => `<section><h2>${title}</h2><ul>${items.map(item => `<li>${item}</li>`).join('')}</ul></section>`).join('')}
    <section class="trust-box"><h2>${state.lang === 'es' ? 'Transparencia de cálculo' : 'Calculation transparency'}</h2><p>${currentText().formulaText}</p><p>${currentText().disclaimer}</p></section>
  </main>`;
}


function reportScenarios() {
  const r = loanCalc(state.inputs, state.loanType);
  const noExtra = loanCalc(state.inputs, state.loanType, 0);
  const rateUp = loanCalc(state.inputs, state.loanType, state.inputs.extraPayment, (Number(state.inputs.rate) || 0) + 0.5);
  const shortYears = state.loanType === 'home'
    ? Math.min(Math.max(15, 1), Math.max(Number(state.inputs.years) || 30, 1))
    : Math.max(1, Math.min((Number(state.inputs.years) || 5) - 1, Number(state.inputs.years) || 5));
  const shorter = loanCalc({ ...state.inputs, years: shortYears }, state.loanType, Number(state.inputs.extraPayment) || 0, Number(state.inputs.rate) || 0);
  return [
    { label: state.lang === 'es' ? 'Escenario actual' : 'Current scenario', result: r },
    { label: state.lang === 'es' ? 'Sin pago extra' : 'No extra payment', result: noExtra },
    { label: state.lang === 'es' ? 'Tasa +0.50%' : 'Rate +0.50%', result: rateUp },
    { label: state.lang === 'es' ? `Plazo ${shortYears} años` : `${shortYears} year term`, result: shorter }
  ];
}

function reportPaymentRows(L, r) {
  return breakdownItems(L, r).map(item => {
    const pct = r.monthlyTotal ? (item.value / r.monthlyTotal) * 100 : 0;
    return `<tr><td>${item.name}</td><td>${money2(item.value)}</td><td>${num(pct)}%</td></tr>`;
  }).join('');
}

function reportScenarioRows() {
  return reportScenarios().map(item => `<tr><td>${item.label}</td><td>${money2(item.result.monthlyTotal)}</td><td>${money2(item.result.totalInterest)}</td><td>${formatMonths(item.result.payoffMonth)}</td><td>${money2(item.result.totalPaidIncludingDownPayment)}</td></tr>`).join('');
}
function reportManualComparisonRows() {
  const a = loanCalc(state.inputs, state.loanType);
  const b = loanCalc(normalizeCompareB(), state.loanType);
  const labels = state.lang === 'es' ? ['Préstamo A', 'Préstamo B'] : ['Loan A', 'Loan B'];
  return [a,b].map((result, index) => `<tr><td>${labels[index]}</td><td>${money2(result.monthlyTotal)}</td><td>${money2(result.totalInterest)}</td><td>${formatMonths(result.payoffMonth)}</td><td>${money2(result.totalPaidIncludingDownPayment)}</td></tr>`).join('');
}

function reportNextSteps(score) {
  if (state.lang === 'es') {
    return `<ol><li>Compara este escenario contra una tasa más alta y un plazo más corto.</li><li>Confirma impuestos, seguro, PMI, cargos y reglas de pago extra con el prestamista.</li><li>Guarda este reporte y compártelo con tu familia, asesor o prestamista antes de decidir.</li></ol>`;
  }
  return `<ol><li>Compare this scenario against a higher rate and a shorter term.</li><li>Confirm taxes, insurance, PMI, fees, and extra payment rules with the lender.</li><li>Save this report and share it with your family, adviser, or lender before deciding.</li></ol>`;
}

function printReport(L, r, housingRatio, totalDebtRatio) {
  const rows = r.schedule.slice(0, 360).map(row => `<tr><td>${row.month}</td><td>${money2(row.startBalance)}</td><td>${money2(row.totalPayment)}</td><td>${money2(row.principalPaid)}</td><td>${money2(row.interestPaid)}</td><td>${money2(row.pmiPaid)}</td><td>${money2(row.endingBalance)}</td></tr>`).join('');
  const score = affordabilityStatus(housingRatio, totalDebtRatio, state.lang);
  const title = state.lang === 'es' ? 'Reporte Profesional de Préstamo' : 'Professional Loan Report';
  const generated = state.lang === 'es' ? 'Generado por Check My Payments' : 'Generated by Check My Payments';
  const summaryTitle = state.lang === 'es' ? 'Resumen ejecutivo' : 'Executive summary';
  const paymentTitle = state.lang === 'es' ? 'Desglose del primer pago mensual' : 'First monthly payment breakdown';
  const scenarioTitle = state.lang === 'es' ? 'Comparación de escenarios' : 'Scenario comparison';
  const nextTitle = state.lang === 'es' ? 'Próximos pasos recomendados' : 'Recommended next steps';
  const scheduleTitle = state.lang === 'es' ? 'Calendario mensual de amortización' : 'Monthly amortization schedule';
  const promo = state.lang === 'es' ? `Crea tu propio reporte gratis en https://www.checkmypayments.com` : `Create your own free loan report at https://www.checkmypayments.com`;
  return `<section class="report-cover"><div><small>${generated}</small><h1>${title}</h1><p>${state.lang === 'es' ? 'Un resumen claro para comparar pagos, interés, capacidad de pago y amortización mensual.' : 'A clear summary for comparing payments, interest, affordability, and monthly amortization.'}</p></div><div class="report-cover-box"><strong>${money(r.monthlyTotal)}</strong><span>${L.firstPayment}</span></div></section><p class="report-disclaimer">${L.disclaimer}</p><h2>${state.lang === 'es' ? 'Resumen inteligente' : 'Smart summary'}</h2><p class="report-smart">${smartSummaryText(L, r, loanCalc(state.inputs, state.loanType, 0), housingRatio, totalDebtRatio, r.price ? (r.down / r.price) * 100 : 0)}</p><h2>${summaryTitle}</h2><div class="report-grid">${bigStat(state.lang === 'es' ? 'Tipo' : 'Loan Type', state.loanType === 'home' ? L.homeLoan : L.carLoan)}${bigStat(L.metrics.amount, money(r.principal))}${bigStat(L.metrics.interest, money(r.totalInterest))}${bigStat(L.metrics.saved, money(r.interestSaved))}${bigStat(L.metrics.payoff, formatMonths(r.payoffMonth))}${bigStat(L.bigStats.totalPaid, money(r.totalPaidIncludingDownPayment))}</div><h2>${paymentTitle}</h2><table class="report-mini-table"><thead><tr><th>${state.lang === 'es' ? 'Categoría' : 'Category'}</th><th>${state.lang === 'es' ? 'Monto' : 'Amount'}</th><th>%</th></tr></thead><tbody>${reportPaymentRows(L, r)}</tbody></table><h2>${state.lang === 'es' ? 'Lectura de capacidad de pago' : 'Affordability reading'}</h2><p><strong>${score.title}.</strong> ${score.message} ${state.lang === 'es' ? 'Ratio de vivienda' : 'Housing ratio'}: ${num(housingRatio)}%. ${state.lang === 'es' ? 'Ratio total de deuda' : 'Total debt ratio'}: ${num(totalDebtRatio)}%.</p><h2>${scenarioTitle}</h2><table class="report-mini-table"><thead><tr><th>${state.lang === 'es' ? 'Escenario' : 'Scenario'}</th><th>${state.lang === 'es' ? 'Pago mensual' : 'Monthly payment'}</th><th>${state.lang === 'es' ? 'Interés total' : 'Total interest'}</th><th>${state.lang === 'es' ? 'Pago final' : 'Payoff'}</th><th>${state.lang === 'es' ? 'Total pagado' : 'Total paid'}</th></tr></thead><tbody>${reportScenarioRows()}</tbody></table><h2>${state.lang === 'es' ? 'Comparación préstamo A vs B' : 'Loan A vs Loan B comparison'}</h2><table class="report-mini-table"><thead><tr><th>${state.lang === 'es' ? 'Escenario' : 'Scenario'}</th><th>${state.lang === 'es' ? 'Pago mensual' : 'Monthly payment'}</th><th>${state.lang === 'es' ? 'Interés total' : 'Total interest'}</th><th>${state.lang === 'es' ? 'Pago final' : 'Payoff'}</th><th>${state.lang === 'es' ? 'Total pagado' : 'Total paid'}</th></tr></thead><tbody>${reportManualComparisonRows()}</tbody></table><h2>${nextTitle}</h2>${reportNextSteps(score)}<h2>${scheduleTitle}</h2><table><thead><tr><th>Month</th><th>Starting Balance</th><th>Payment</th><th>Principal</th><th>Interest</th><th>PMI</th><th>Ending Balance</th></tr></thead><tbody>${rows}</tbody></table><p class="report-note"><strong>${promo}</strong><br>${SITE_URL} | ${CONTACT_EMAIL}</p>`;
}
function formatMonths(m) { const L = currentText(); const y = Math.floor(m / 12); const mo = m % 12; return state.lang === 'es' ? `${y}a ${mo}m` : `${y}y ${mo}m`; }

function exportCsv() {
  const L = currentText();
  const r = loanCalc(state.inputs, state.loanType);
  const header = state.lang === 'es' ? ['Mes','Año','Balance Inicial','Pago Total','Principal Pagado','Interés Pagado','PMI Pagado','Balance Final'] : ['Month','Year','Starting Balance','Total Payment','Principal Paid','Interest Paid','PMI Paid','Ending Balance'];
  const summary = state.lang === 'es' ? [
    ['Reporte Check My Payments'], ['Sitio web', SITE_URL], ['Tipo de préstamo', state.loanType === 'home' ? L.homeLoan : L.carLoan], ['Precio', csvNum(r.price)], ['Inicial', csvNum(r.down)], ['Monto del préstamo', csvNum(r.principal)], ['Tasa', csvNum(r.rate)], ['Plazo en años', csvNum(r.years)], ['Primer pago mensual estimado', csvNum(r.monthlyTotal)], ['Interés total', csvNum(r.totalInterest)], [''], header
  ] : [
    ['Check My Payments Report'], ['Website', SITE_URL], ['Loan type', state.loanType === 'home' ? L.homeLoan : L.carLoan], ['Price', csvNum(r.price)], ['Down payment', csvNum(r.down)], ['Loan amount', csvNum(r.principal)], ['Rate', csvNum(r.rate)], ['Term in years', csvNum(r.years)], ['Estimated first monthly payment', csvNum(r.monthlyTotal)], ['Total interest', csvNum(r.totalInterest)], [''], header
  ];
  const rows = r.schedule.map(row => [row.month, row.year, csvNum(row.startBalance), csvNum(row.totalPayment), csvNum(row.principalPaid), csvNum(row.interestPaid), csvNum(row.pmiPaid), csvNum(row.endingBalance)]);
  const csv = '\ufeffsep=,\r\n' + [...summary, ...rows].map(row => row.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(',')).join('\r\n');
  downloadBlob(csv, `check-my-payments-${state.loanType}-monthly-amortization.csv`, 'text/csv;charset=utf-8;');
}
function downloadBlob(content, filename, type) { const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }
function reportStyles() {
  return `
    @page { margin: 14mm; }
    * { box-sizing: border-box; }
    body { margin: 0; background: #ffffff; color: #172033; font-family: Arial, Helvetica, sans-serif; }
    .report-shell { max-width: 980px; margin: 0 auto; padding: 24px; }
    .report-header { display: flex; justify-content: space-between; gap: 20px; align-items: flex-start; border-bottom: 3px solid #5de4f2; padding-bottom: 14px; margin-bottom: 18px; }
    .report-logo { font-size: 30px; font-weight: 900; color: #0b1225; letter-spacing: -0.03em; }
    .report-sub { margin-top: 4px; color: #475569; font-size: 13px; line-height: 1.5; }
    .report-url { text-align: right; font-size: 12px; color: #3b5875; line-height: 1.5; }
    .report-cover { display: grid; grid-template-columns: 1fr 260px; gap: 18px; align-items: center; padding: 22px; border-radius: 18px; background: linear-gradient(135deg,#0b1225,#143349); color: #fff; margin-bottom: 18px; break-inside: avoid; }
    .report-cover small { color: #7ee7f2; text-transform: uppercase; letter-spacing: .14em; font-weight: 800; }
    .report-cover h1 { color: #fff; font-size: 32px; margin: 8px 0; }
    .report-cover p { color: #dbeafe; margin: 0; }
    .report-cover-box { border: 1px solid rgba(126,231,242,.55); border-radius: 16px; padding: 18px; background: rgba(255,255,255,.08); text-align: center; }
    .report-cover-box strong { display: block; color: #fff; font-size: 34px; }
    .report-cover-box span { display: block; color: #cbd5e1; font-size: 12px; text-transform: uppercase; letter-spacing: .1em; }
    h1 { color: #0b1225; font-size: 26px; margin: 0 0 8px; }
    h2 { color: #0b1225; font-size: 18px; margin: 24px 0 10px; break-after: avoid; }
    p, li { color: #334155; line-height: 1.55; }
    .report-disclaimer { background: #fff7ed; border: 1px solid #fed7aa; padding: 10px 12px; border-radius: 12px; font-size: 12px; color: #7c2d12; }
    .report-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 18px 0; }
    .report-card { border: 1px solid #cbd5e1; border-radius: 12px; padding: 12px; background: #f8fafc; break-inside: avoid; }
    .report-card small { display: block; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: .08em; }
    .report-card strong { display: block; color: #0f172a; font-size: 20px; margin-top: 5px; }
    table { width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 10px; }
    .report-mini-table { font-size: 11px; break-inside: avoid; }
    th, td { color: #0f172a; border-bottom: 1px solid #d7dee8; padding: 5px; text-align: right; }
    th:first-child, td:first-child { text-align: left; }
    th { background: #eef4fb; font-weight: 800; }
    tr { break-inside: avoid; }
    ol { margin-top: 8px; }
    .report-note { margin-top: 18px; color: #475569; font-size: 12px; border-top: 1px solid #d7dee8; padding-top: 12px; text-align: center; }
    .print-actions { position: sticky; top: 0; display: flex; justify-content: flex-end; gap: 10px; padding: 12px 0; background: #ffffff; border-bottom: 1px solid #e2e8f0; margin-bottom: 18px; }
    .print-actions button { border: 0; border-radius: 999px; padding: 10px 16px; font-weight: 800; cursor: pointer; }
    .print-actions .primary { background: #5de4f2; color: #061021; }
    .print-actions .secondary { background: #e2e8f0; color: #0f172a; }
    @media print { .print-actions { display: none; } .report-shell { padding: 0; } .report-cover { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
  `;
}

function printPdf() {
  const L = currentText();
  const r = loanCalc(state.inputs, state.loanType);
  const monthlyIncome = Math.max(Number(state.inputs.grossIncome) || 0, 0) / 12;
  const housingRatio = monthlyIncome ? (r.requiredMonthlyPayment / monthlyIncome) * 100 : 0;
  const totalDebtRatio = monthlyIncome ? ((r.requiredMonthlyPayment + Math.max(Number(state.inputs.monthlyDebt) || 0, 0)) / monthlyIncome) * 100 : 0;
  const reportHtml = printReport(L, r, housingRatio, totalDebtRatio);
  const win = window.open('', '_blank');
  if (!win) {
    alert(state.lang === 'es' ? 'Permite ventanas emergentes para generar el reporte PDF.' : 'Please allow pop-ups to generate the PDF report.');
    return;
  }
  win.document.open();
  win.document.write(`<!doctype html><html lang="${state.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Check My Payments Loan Report</title><style>${reportStyles()}</style></head><body><div class="report-shell"><div class="print-actions"><button class="secondary" onclick="window.close()">Close</button><button class="primary" onclick="window.print()">Save / Print PDF</button></div><div class="report-header"><div><div class="report-logo">Check My Payments</div><div class="report-sub">${state.lang === 'es' ? 'Reporte profesional de cálculo de préstamo' : 'Professional loan calculation report'}</div></div><div class="report-url">${SITE_URL}<br>${CONTACT_EMAIL}</div></div>${reportHtml}</div><script>setTimeout(function(){ window.focus(); window.print(); }, 350);<\/script></body></html>`);
  win.document.close();
}

function attachEvents() {
  document.querySelectorAll('[data-nav]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); navigate(a.getAttribute('data-nav')); }));
  document.getElementById('langBtn')?.addEventListener('click', () => { state.lang = state.lang === 'en' ? 'es' : 'en'; localStorage.setItem('check_my_payments_lang', state.lang); document.documentElement.lang = state.lang; render(); });
  document.getElementById('resetBtn')?.addEventListener('click', reset);
  document.querySelectorAll('[data-mode]').forEach(btn => btn.addEventListener('click', () => { setMode(btn.dataset.mode); }));

  document.querySelectorAll('[data-input]').forEach(input => {
    input.addEventListener('focus', () => { state.isTyping = true; });
    input.addEventListener('input', () => {
      // Important mobile fix: do not re-render while a user is typing.
      // Re-rendering destroys and recreates the input, which closes the phone keyboard
      // and makes values appear to disappear. Store the value, sync the matching slider,
      // and recalculate only when the user finishes editing.
      setInputValue(input.dataset.input, input.value, false);
      syncMatchingRangeOnly(input.dataset.input);
    });
    input.addEventListener('change', () => { state.isTyping = false; setInputValue(input.dataset.input, input.value, true); });
    input.addEventListener('blur', () => { state.isTyping = false; setInputValue(input.dataset.input, input.value, true); });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        state.isTyping = false;
        input.blur();
        setInputValue(input.dataset.input, input.value, true);
      }
    });
  });

  document.querySelectorAll('[data-compare-input]').forEach(input => {
    input.addEventListener('focus', () => { state.isTyping = true; });
    input.addEventListener('input', () => { setCompareBValue(input.dataset.compareInput, input.value, false); });
    input.addEventListener('change', () => { state.isTyping = false; setCompareBValue(input.dataset.compareInput, input.value, true); });
    input.addEventListener('blur', () => { state.isTyping = false; setCompareBValue(input.dataset.compareInput, input.value, true); });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { state.isTyping = false; input.blur(); setCompareBValue(input.dataset.compareInput, input.value, true); }
    });
  });
  document.querySelector('[data-copy-to-b]')?.addEventListener('click', copyCurrentToCompareB);

  document.querySelectorAll('.custom-slider-track').forEach(track => {
    // Intentional mobile safety: touching the line/track does nothing.
    // Only the circular thumb can change the value, preventing accidental changes while scrolling.
    track.addEventListener('pointerdown', e => e.preventDefault());
    track.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
  });

  document.querySelectorAll('.custom-slider-thumb[data-range]').forEach(thumb => {
    const key = thumb.dataset.range;
    const slider = thumb.closest('.custom-slider');
    if (!slider) return;
    const min = Number(slider.dataset.min) || 0;
    const max = Number(slider.dataset.max) || 0;
    const step = Number(slider.dataset.step) || 1;
    let dragging = false;
    let raf = null;

    const valueFromPointer = (clientX) => {
      const rect = slider.getBoundingClientRect();
      const ratio = rect.width ? Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1) : 0;
      const raw = min + ratio * (max - min);
      const snapped = min + Math.round((raw - min) / step) * step;
      const decimals = String(step).includes('.') ? String(step).split('.')[1].length : 0;
      return Number(Math.min(Math.max(snapped, min), max).toFixed(decimals));
    };

    const updateFromClientX = (clientX, shouldRender) => {
      const value = valueFromPointer(clientX);
      setInputValue(key, value, shouldRender);
      syncVisibleControl(key);
    };

    const move = (e) => {
      if (!dragging) return;
      e.preventDefault();
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => updateFromClientX(e.clientX, false));
    };

    const finish = (e) => {
      if (!dragging) return;
      dragging = false;
      state.isSliding = false;
      if (raf) cancelAnimationFrame(raf);
      updateFromClientX(e.clientX ?? 0, true);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', finish);
      window.removeEventListener('pointercancel', finish);
    };

    thumb.addEventListener('pointerdown', e => {
      e.preventDefault();
      dragging = true;
      state.isSliding = true;
      thumb.focus({ preventScroll: true });
      try { thumb.setPointerCapture(e.pointerId); } catch (_) {}
      updateFromClientX(e.clientX, false);
      window.addEventListener('pointermove', move, { passive: false });
      window.addEventListener('pointerup', finish);
      window.addEventListener('pointercancel', finish);
    });

    thumb.addEventListener('keydown', e => {
      const current = Number(state.inputs[key]) || 0;
      let next = current;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = current - step;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = current + step;
      if (e.key === 'Home') next = min;
      if (e.key === 'End') next = max;
      if (next !== current) {
        e.preventDefault();
        setInputValue(key, Math.min(Math.max(next, min), max), true);
      }
    });
  });

  document.querySelectorAll('[data-tab]').forEach(tab => tab.addEventListener('click', () => { state.activeTab = tab.dataset.tab; render(); }));
  document.querySelectorAll('[data-slice]').forEach(slice => slice.addEventListener('click', () => { state.selectedSlice = Number(slice.dataset.slice); }));
  document.getElementById('csvBtn')?.addEventListener('click', exportCsv);
  document.getElementById('pdfBtn')?.addEventListener('click', printPdf);
  document.getElementById('shareBtn')?.addEventListener('click', copyShareLink);
}

function sliderPercent(key) {
  const slider = document.querySelector(`[data-slider="${key}"]`);
  if (!slider) return 0;
  const min = Number(slider.dataset.min) || 0;
  const max = Number(slider.dataset.max) || 0;
  const value = Number(state.inputs[key]) || 0;
  return max > min ? Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100) : 0;
}
function syncSliderOnly(key) {
  const value = state.inputs[key];
  const pct = sliderPercent(key);
  document.querySelectorAll(`[data-range="${key}"]`).forEach(el => {
    el.setAttribute('aria-valuenow', value);
    el.style.left = `${pct}%`;
  });
  document.querySelectorAll(`[data-slider-fill="${key}"]`).forEach(el => { el.style.width = `${pct}%`; });
}
function syncVisibleControl(key) {
  const value = state.inputs[key];
  document.querySelectorAll(`[data-input="${key}"]`).forEach(el => { el.value = value; });
  syncSliderOnly(key);
}
function syncMatchingRangeOnly(key) {
  syncSliderOnly(key);
}

function setInputValue(key, value, shouldRender = true) {
  const numeric = Number(value);
  state.inputs[key] = Number.isFinite(numeric) ? numeric : 0;
  if (key === 'price') {
    state.inputs.price = Math.max(state.inputs.price, 0);
    if (state.inputs.downPayment > state.inputs.price) state.inputs.downPayment = state.inputs.price;
  }
  if (key === 'downPayment') {
    state.inputs.downPayment = Math.min(Math.max(state.inputs.downPayment, 0), Math.max(Number(state.inputs.price) || 0, 0));
  }
  if (['rate','years','taxes','insurance','hoa','extraPayment','pmiAnnualRate','grossIncome','monthlyDebt'].includes(key)) {
    state.inputs[key] = Math.max(state.inputs[key], 0);
  }
  if (shouldRender) render();
}

function setMode(mode) {
  state.loanType = mode;
  state.selectedSlice = 0;
  if (mode === 'home') {
    Object.assign(state.inputs, { price:450000, downPayment:90000, rate:6.75, years:30, taxes:5200, insurance:1800, hoa:0, extraPayment:200, pmiAnnualRate:.75, grossIncome:90000, monthlyDebt:600 });
    Object.assign(state.compareB, { price:450000, downPayment:90000, rate:6.25, years:15, taxes:5200, insurance:1800, hoa:0, extraPayment:0, pmiAnnualRate:.75, grossIncome:90000, monthlyDebt:600 });
  } else {
    Object.assign(state.inputs, { price:38000, downPayment:5000, rate:7.25, years:5, taxes:950, insurance:1800, hoa:0, extraPayment:50, pmiAnnualRate:0, grossIncome:65000, monthlyDebt:400 });
    Object.assign(state.compareB, { price:38000, downPayment:5000, rate:6.95, years:4, taxes:950, insurance:1800, hoa:0, extraPayment:0, pmiAnnualRate:0, grossIncome:65000, monthlyDebt:400 });
  }
  render();
}
function reset() { setMode(state.loanType); }
function render() {
  const path = window.location.pathname;
  state.route = path;
  let body = calcPage();
  const seoBody = seoPage(path);
  if (seoBody) body = seoBody;
  if (path === '/about') body = page('about');
  if (path === '/privacy') body = page('privacy');
  if (path === '/terms') body = page('terms');
  if (path === '/contact') body = page('contact');
  document.getElementById('app').innerHTML = layout(body);
  updateSeo(path);
  document.documentElement.lang = state.lang;
  attachEvents();
}
function setMeta(name, value, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    if (property) el.setAttribute('property', name); else el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}
function updateSeo(path) {
  const page = seoPages[path]?.[state.lang] || seoPages[path]?.en;
  let title = state.lang === 'es' ? 'Check My Payments | Calculadora Simple de Préstamos' : 'Check My Payments | Simple Loan Calculator';
  let description = state.lang === 'es' ? 'Calcula préstamos de vivienda y auto con amortización mensual, PMI, capacidad de pago, CSV y reporte PDF.' : 'Plan home and car loans with monthly payments, amortization, PMI estimates, affordability ratios, CSV export and printable PDF reports.';
  if (page) { title = `Check My Payments | ${page.title}`; description = page.description; }
  if (path === '/about') { title = state.lang === 'es' ? 'Check My Payments | Acerca de' : 'Check My Payments | About'; description = state.lang === 'es' ? 'Conoce Check My Payments, una herramienta bilingüe para planificar préstamos de vivienda y auto.' : 'Learn about Check My Payments, a bilingual planning tool for home and auto loans.'; }
  if (path === '/privacy') { title = state.lang === 'es' ? 'Check My Payments | Privacidad' : 'Check My Payments | Privacy Policy'; description = state.lang === 'es' ? 'Política de privacidad de Check My Payments.' : 'Check My Payments privacy policy.'; }
  if (path === '/terms') { title = state.lang === 'es' ? 'Check My Payments | Términos' : 'Check My Payments | Terms of Use'; description = state.lang === 'es' ? 'Términos de uso de Check My Payments.' : 'Check My Payments terms of use.'; }
  if (path === '/contact') { title = state.lang === 'es' ? 'Check My Payments | Contacto' : 'Check My Payments | Contact'; description = state.lang === 'es' ? 'Contacta a Check My Payments para preguntas o correcciones.' : 'Contact Check My Payments for questions or corrections.'; }
  document.title = title;
  setMeta('description', description);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:url', SITE_URL + path, true);
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
  canonical.href = SITE_URL + path;
  updateSchema(path, title, description);
}
function updateSchema(path, title, description) {
  document.querySelectorAll('script[data-schema="checkmypayments"]').forEach(el => el.remove());
  const graph = [
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'Check My Payments', url: SITE_URL, inLanguage: state.lang },
    { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Check My Payments', url: SITE_URL, email: CONTACT_EMAIL },
    { '@type': 'WebPage', '@id': `${SITE_URL}${path}#webpage`, url: `${SITE_URL}${path}`, name: title, description, isPartOf: { '@id': `${SITE_URL}/#website` }, inLanguage: state.lang }
  ];
  if (path === '/' || path.includes('calculator')) {
    graph.push({ '@type': 'SoftwareApplication', name: 'Check My Payments', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, url: `${SITE_URL}${path}` });
    graph.push({ '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: state.lang === 'es' ? '¿Cómo calcula Check My Payments el pago mensual?' : 'How does Check My Payments calculate the monthly payment?', acceptedAnswer: { '@type': 'Answer', text: currentText().formulaText } },
      { '@type': 'Question', name: state.lang === 'es' ? '¿Los resultados son una cotización de préstamo?' : 'Are the results a lender quote?', acceptedAnswer: { '@type': 'Answer', text: currentText().disclaimer } }
    ]});
  }
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.dataset.schema = 'checkmypayments';
  script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  document.head.appendChild(script);
}

function runInternalCalculationAudit() {
  const cases = [
    { loanType: 'home', inputs: { price: 450000, downPayment: 90000, rate: 6.75, years: 30, taxes: 5200, insurance: 1800, hoa: 0, extraPayment: 200, pmiAnnualRate: 0.75, grossIncome: 90000, monthlyDebt: 600 } },
    { loanType: 'car', inputs: { price: 38000, downPayment: 5000, rate: 7.25, years: 5, taxes: 950, insurance: 1800, hoa: 0, extraPayment: 50, pmiAnnualRate: 0, grossIncome: 65000, monthlyDebt: 400 } },
    { loanType: 'home', inputs: { price: 300000, downPayment: 0, rate: 0, years: 30, taxes: 0, insurance: 0, hoa: 0, extraPayment: 0, pmiAnnualRate: 0, grossIncome: 0, monthlyDebt: 0 } }
  ];
  for (const test of cases) {
    const r = loanCalc(test.inputs, test.loanType);
    const last = r.schedule[r.schedule.length - 1];
    const principalPaid = r.schedule.reduce((sum, row) => sum + row.principalPaid, 0);
    const componentDiff = Math.abs(r.monthlyTotal - (r.basePayment + r.taxesMonthly + r.insuranceMonthly + r.hoaMonthly + (r.schedule[0]?.pmiPaid || 0) + (Number(test.inputs.extraPayment) || 0)));
    if (r.principal < -0.01 || r.totalInterest < -0.01 || (last && Math.abs(last.endingBalance) > 0.02) || Math.abs(principalPaid - r.principal) > 0.05 || componentDiff > 0.05) {
      console.warn('Check My Payments calculation audit warning', test, r);
    }
  }
}
applyUrlParams();
runInternalCalculationAudit();
render();
