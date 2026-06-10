const CONTACT_EMAIL = 'loancal@altmail.kr';
const SITE_URL = 'https://www.checkmypayments.com';
const APP_VERSION = '25.1.0';

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
  },
  studentLoan: {
    loanAmount: 15000,
    annualRate: 6.39,
    loanType: 'undergrad-subsidized',
    repaymentYears: 10,
    customYears: 10,
    gracePeriod: 'six',
    interestAccrual: 'subsidized',
    monthsBeforeRepayment: 6,
    extraPayment: 0,
    loanFeePercent: 0
  }
};



const FEDERAL_STUDENT_LOAN_CONFIG = {
  lastChecked: '2026-06-08',
  sourceUrl: 'https://studentaid.gov/understand-aid/types/loans/interest-rates',
  repaymentSourceUrl: 'https://studentaid.gov/manage-loans/repayment/plans',
  loanSimulatorUrl: 'https://studentaid.gov/loan-simulator',
  notes: 'Rates are default educational presets for Direct Loans first disbursed on or after July 1, 2025 and before July 1, 2026. Users should verify current rates at StudentAid.gov.',
  rates: {
    'undergrad-subsidized': { label: 'Undergraduate Direct Subsidized', rate: 6.39, accrual: 'subsidized', fee: 1.057, effectiveStart: '2025-07-01', effectiveEnd: '2026-06-30' },
    'undergrad-unsubsidized': { label: 'Undergraduate Direct Unsubsidized', rate: 6.39, accrual: 'unsubsidized', fee: 1.057, effectiveStart: '2025-07-01', effectiveEnd: '2026-06-30' },
    'grad-unsubsidized': { label: 'Graduate Direct Unsubsidized', rate: 7.94, accrual: 'unsubsidized', fee: 1.057, effectiveStart: '2025-07-01', effectiveEnd: '2026-06-30' },
    'parent-plus': { label: 'Parent PLUS', rate: 8.94, accrual: 'unsubsidized', fee: 4.228, effectiveStart: '2025-07-01', effectiveEnd: '2026-06-30' },
    'other-federal': { label: 'Other federal loan', rate: 6.39, accrual: 'unsubsidized', fee: 0, effectiveStart: '2025-07-01', effectiveEnd: '2026-06-30' }
  }
};

const t = {
  en: {
    brandSub: 'A simple loan calculator to estimate monthly payments before you borrow', calc: 'Calculator', about: 'About', privacy: 'Privacy', terms: 'Terms', contact: 'Contact', reset: 'Reset',
    topAd: 'Future Google AdSense banner', sideAd: 'Future Google AdSense sidebar ad', midAd: 'Future Google AdSense in-content ad',
    kicker: 'Smart calculator for home and auto loans', hero: 'Simple Loan Calculator',
    lead: 'Use Check My Payments to estimate monthly payments, compare loan terms, and understand total cost before you borrow.',
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
    kicker: 'Calculadora inteligente para préstamos de vivienda y autos', hero: 'Calculadora Simple de Préstamos',
    lead: 'Usa Check My Payments para estimar pagos mensuales, comparar plazos y entender el costo total antes de tomar un préstamo.',
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
  "/mortgage-calculator": {
    "en": {
      "title": "Mortgage Calculator | Estimate Your Monthly Home Payment",
      "description": "Estimate a monthly mortgage payment with principal, interest, property taxes, insurance, PMI, HOA, amortization, extra payments and a PDF report.",
      "heading": "Mortgage Calculator",
      "intro": "Use this mortgage calculator to estimate a realistic first monthly home payment before you speak with a lender or make an offer. It includes principal and interest plus common housing costs such as taxes, insurance, HOA and PMI when applicable.",
      "sections": [
        [
          "Who should use it",
          [
            "Home buyers comparing prices, down payments, interest rates and loan terms.",
            "Homeowners considering a refinance or a faster payoff strategy.",
            "Families who want a simple way to see how the monthly payment changes before making a financial decision."
          ]
        ],
        [
          "Inputs that matter most",
          [
            "Home price and down payment determine the loan amount.",
            "Interest rate and loan term determine the principal and interest payment.",
            "Taxes, insurance, HOA and PMI can materially change the real monthly housing cost."
          ]
        ],
        [
          "How to read the result",
          [
            "The first monthly payment combines principal, interest and estimated monthly housing costs.",
            "The amortization schedule shows how the balance falls over time.",
            "The PDF report can be shared with family, advisers or lenders for discussion."
          ]
        ]
      ],
      "faq": [
        [
          "How is a mortgage payment calculated?",
          "The principal and interest payment uses the standard fixed-rate amortization formula. Taxes, insurance, HOA and estimated PMI are added separately so the payment feels closer to a real monthly cost."
        ],
        [
          "Does a longer mortgage term save money?",
          "A longer term usually lowers the monthly payment, but it usually increases total interest over the life of the loan."
        ],
        [
          "Is this mortgage calculator financial advice?",
          "No. It is an educational estimate only. Confirm rates, taxes, insurance, PMI and lender rules with qualified professionals before making decisions."
        ]
      ],
      "related": [
        "/pmi-calculator",
        "/affordability-calculator",
        "/extra-payment-calculator",
        "/amortization-calculator"
      ]
    },
    "es": {
      "title": "Calculadora de Hipoteca | Estima tu Pago Mensual de Vivienda",
      "description": "Estima un pago mensual de hipoteca con principal, interés, impuestos, seguro, PMI, HOA, amortización, pagos extra y reporte PDF.",
      "heading": "Calculadora de Hipoteca",
      "intro": "Usa esta calculadora de hipoteca para estimar un primer pago mensual realista antes de hablar con un prestamista o hacer una oferta. Incluye principal e interés, más costos comunes como impuestos, seguro, HOA y PMI cuando aplica.",
      "sections": [
        [
          "Quién debe usarla",
          [
            "Compradores comparando precios, inicial, tasas y plazos.",
            "Propietarios evaluando refinanciar o pagar más rápido.",
            "Familias que quieren ver cómo cambia el pago mensual antes de decidir."
          ]
        ],
        [
          "Datos más importantes",
          [
            "Precio e inicial determinan el monto del préstamo.",
            "Tasa de interés y plazo determinan principal e interés.",
            "Impuestos, seguro, HOA y PMI pueden cambiar mucho el costo mensual real."
          ]
        ],
        [
          "Cómo interpretar el resultado",
          [
            "El primer pago mensual combina principal, interés y costos estimados de vivienda.",
            "La amortización muestra cómo baja el balance con el tiempo.",
            "El reporte PDF puede compartirse para conversar con familia, asesores o prestamistas."
          ]
        ]
      ],
      "faq": [
        [
          "¿Cómo se calcula el pago hipotecario?",
          "El pago de principal e interés usa la fórmula estándar de amortización fija. Impuestos, seguro, HOA y PMI estimado se agregan por separado."
        ],
        [
          "¿Un plazo más largo ahorra dinero?",
          "Normalmente baja el pago mensual, pero aumenta el interés total durante la vida del préstamo."
        ],
        [
          "¿Esto es asesoría financiera?",
          "No. Es un estimado educativo. Confirma tasas, impuestos, seguro, PMI y reglas del prestamista con profesionales calificados."
        ]
      ],
      "related": [
        "/pmi-calculator",
        "/affordability-calculator",
        "/extra-payment-calculator",
        "/amortization-calculator"
      ]
    }
  },
  "/car-loan-calculator": {
    "en": {
      "title": "Car Loan Calculator | Estimate Your Monthly Auto Payment",
      "description": "Estimate a monthly car loan payment with vehicle price, down payment, interest rate, term, insurance, fees, extra payments and amortization.",
      "heading": "Car Loan Calculator",
      "intro": "Use this car loan calculator to estimate a monthly auto payment before visiting a dealer or comparing financing options. It helps you see how vehicle price, down payment, term, interest rate, insurance and fees affect total cost.",
      "sections": [
        [
          "Who should use it",
          [
            "Car buyers comparing different vehicle prices and loan terms.",
            "Drivers deciding whether a larger down payment makes sense.",
            "Anyone who wants to see the total interest cost before financing a vehicle."
          ]
        ],
        [
          "Inputs that matter most",
          [
            "Vehicle price and down payment determine the amount financed.",
            "Interest rate and term determine the monthly principal and interest payment.",
            "Insurance, registration fees and add ons can make the real monthly cost higher than the loan payment alone."
          ]
        ],
        [
          "How to read the result",
          [
            "The monthly payment estimate includes financing plus optional monthly costs.",
            "The amortization table shows each month of principal and interest.",
            "The comparison tools help evaluate cash flow versus total cost."
          ]
        ]
      ],
      "faq": [
        [
          "How is a car loan payment calculated?",
          "The principal and interest payment uses the same fixed-rate amortization logic as other installment loans. Fees and insurance are shown as separate monthly planning costs."
        ],
        [
          "Does a longer car loan term lower the payment?",
          "Yes, a longer term usually lowers the monthly payment, but it can increase total interest and may keep you in debt longer."
        ],
        [
          "Should I include insurance in a car loan calculation?",
          "Including insurance helps estimate the real monthly cost of owning the vehicle, even though insurance is usually not part of the loan principal."
        ]
      ],
      "related": [
        "/amortization-calculator",
        "/extra-payment-calculator",
        "/",
        "/personal-loan-calculator"
      ]
    },
    "es": {
      "title": "Calculadora de Préstamo de Auto | Estima tu Pago Mensual",
      "description": "Estima un pago mensual de auto con precio, inicial, tasa, plazo, seguro, cargos, pagos extra y amortización.",
      "heading": "Calculadora de Préstamo de Auto",
      "intro": "Usa esta calculadora para estimar un pago mensual de auto antes de visitar un dealer o comparar financiamiento. Ayuda a ver cómo precio, inicial, plazo, tasa, seguro y cargos afectan el costo total.",
      "sections": [
        [
          "Quién debe usarla",
          [
            "Compradores comparando precios y plazos.",
            "Personas evaluando si conviene dar más inicial.",
            "Cualquiera que quiera ver el interés total antes de financiar un vehículo."
          ]
        ],
        [
          "Datos importantes",
          [
            "Precio e inicial determinan el monto financiado.",
            "Tasa y plazo determinan principal e interés mensual.",
            "Seguro, registro y adicionales pueden subir el costo mensual real."
          ]
        ],
        [
          "Cómo interpretar el resultado",
          [
            "El pago mensual incluye financiamiento y costos opcionales.",
            "La tabla de amortización muestra principal e interés cada mes.",
            "La comparación ayuda a evaluar flujo mensual contra costo total."
          ]
        ]
      ],
      "faq": [
        [
          "¿Cómo se calcula el pago de auto?",
          "El pago de principal e interés usa amortización fija. Cargos y seguro se muestran como costos mensuales separados de planificación."
        ],
        [
          "¿Un plazo más largo baja el pago?",
          "Sí, normalmente baja el pago mensual, pero puede aumentar el interés total y alargar la deuda."
        ],
        [
          "¿Debo incluir seguro?",
          "Incluir seguro ayuda a estimar el costo mensual real de tener el vehículo, aunque normalmente no sea parte del principal del préstamo."
        ]
      ],
      "related": [
        "/amortization-calculator",
        "/extra-payment-calculator",
        "/",
        "/personal-loan-calculator"
      ]
    }
  },
  "/amortization-calculator": {
    "en": {
      "title": "Loan Amortization Calculator | Principal and Interest Schedule",
      "description": "View a monthly amortization schedule with starting balance, payment, principal, interest, PMI and ending balance for each month.",
      "heading": "Loan Amortization Calculator",
      "intro": "Use the amortization calculator to see how every monthly payment is divided between interest and principal. This helps explain why early payments often reduce the balance slowly and why extra payments can save interest.",
      "sections": [
        [
          "What amortization shows",
          [
            "Each payment month in the loan schedule.",
            "Starting balance, payment, principal, interest and ending balance.",
            "How interest falls as the principal balance declines."
          ]
        ],
        [
          "Why it matters",
          [
            "It shows the true cost of borrowing over time.",
            "It helps compare a shorter term against a lower monthly payment.",
            "It makes extra payment savings easier to understand."
          ]
        ]
      ],
      "faq": [
        [
          "What is amortization?",
          "Amortization is the process of paying down a loan over time with scheduled payments that include interest and principal."
        ],
        [
          "Why is early interest so high?",
          "Interest is calculated on the remaining balance, so early payments often include more interest because the balance is still high."
        ],
        [
          "Can I download the schedule?",
          "Yes. Check My Payments can export the monthly amortization schedule as a CSV and include it in a PDF report."
        ]
      ],
      "related": [
        "/mortgage-calculator",
        "/car-loan-calculator",
        "/extra-payment-calculator"
      ]
    },
    "es": {
      "title": "Calculadora de Amortización | Calendario de Principal e Interés",
      "description": "Ve un calendario mensual con balance inicial, pago, principal, interés, PMI y balance final para cada mes.",
      "heading": "Calculadora de Amortización",
      "intro": "Usa la calculadora de amortización para ver cómo cada pago mensual se divide entre interés y principal. Esto ayuda a entender por qué al inicio el balance baja lentamente y cómo pagos extra pueden ahorrar interés.",
      "sections": [
        [
          "Qué muestra",
          [
            "Cada mes del calendario del préstamo.",
            "Balance inicial, pago, principal, interés y balance final.",
            "Cómo baja el interés cuando baja el principal."
          ]
        ],
        [
          "Por qué importa",
          [
            "Muestra el costo real de tomar dinero prestado.",
            "Ayuda a comparar un plazo corto contra un pago mensual más bajo.",
            "Hace más fácil entender el ahorro por pagos extra."
          ]
        ]
      ],
      "faq": [
        [
          "¿Qué es amortización?",
          "Es el proceso de pagar un préstamo con pagos programados que incluyen interés y principal."
        ],
        [
          "¿Por qué se paga tanto interés al inicio?",
          "El interés se calcula sobre el balance pendiente, y al inicio el balance todavía es alto."
        ],
        [
          "¿Puedo descargar el calendario?",
          "Sí. Check My Payments puede exportar la amortización mensual en CSV e incluirla en el reporte PDF."
        ]
      ],
      "related": [
        "/mortgage-calculator",
        "/car-loan-calculator",
        "/extra-payment-calculator"
      ]
    }
  },
  "/extra-payment-calculator": {
    "en": {
      "title": "Extra Payment Calculator | See How Much Interest You Can Save",
      "description": "Calculate how extra monthly payments may reduce total interest, shorten payoff time and change your amortization schedule.",
      "heading": "Extra Payment Calculator",
      "intro": "Use the extra payment calculator to test how adding money to your monthly payment can reduce the balance faster. Even small extra payments can make a meaningful difference over a long loan term.",
      "sections": [
        [
          "What to test",
          [
            "Try several extra payment amounts, such as 50, 100 or 200 dollars per month.",
            "Compare the payoff date with and without extra payments.",
            "Review interest saved before choosing a payoff strategy."
          ]
        ],
        [
          "Important limitation",
          [
            "Some lenders have prepayment rules or require extra payments to be marked for principal.",
            "Always confirm how your lender applies extra payments before relying on a payoff plan."
          ]
        ]
      ],
      "faq": [
        [
          "How do extra payments reduce interest?",
          "Extra payments reduce principal faster. Since future interest is calculated on the remaining balance, a lower balance usually means less future interest."
        ],
        [
          "Will every lender apply extra payments to principal?",
          "Not always. Ask your lender how to designate extra payments and whether any prepayment rules apply."
        ],
        [
          "Can extra payments shorten the loan?",
          "Yes. If extra payments are applied to principal, they can shorten the payoff timeline and reduce total interest."
        ]
      ],
      "related": [
        "/mortgage-calculator",
        "/car-loan-calculator",
        "/amortization-calculator"
      ]
    },
    "es": {
      "title": "Calculadora de Pagos Extra | Mira Cuánto Interés Puedes Ahorrar",
      "description": "Calcula cómo pagos extra mensuales pueden reducir interés total, acortar el plazo y cambiar la amortización.",
      "heading": "Calculadora de Pagos Extra",
      "intro": "Usa esta calculadora para probar cómo agregar dinero al pago mensual puede reducir el balance más rápido. Incluso pagos pequeños pueden marcar diferencia en préstamos largos.",
      "sections": [
        [
          "Qué probar",
          [
            "Prueba pagos extra de 50, 100 o 200 dólares al mes.",
            "Compara la fecha final con y sin pagos extra.",
            "Revisa el interés ahorrado antes de elegir una estrategia."
          ]
        ],
        [
          "Limitación importante",
          [
            "Algunos prestamistas tienen reglas de prepago o requieren indicar que el extra va al principal.",
            "Confirma cómo tu prestamista aplica pagos extra antes de depender de un plan."
          ]
        ]
      ],
      "faq": [
        [
          "¿Cómo reducen interés los pagos extra?",
          "Reducen el principal más rápido. Como el interés futuro se calcula sobre el balance, un balance menor normalmente significa menos interés."
        ],
        [
          "¿Todo prestamista aplica extras al principal?",
          "No siempre. Pregunta cómo indicar pagos extra y si existen reglas de prepago."
        ],
        [
          "¿Los pagos extra acortan el préstamo?",
          "Sí. Si se aplican al principal, pueden acortar el plazo y reducir interés total."
        ]
      ],
      "related": [
        "/mortgage-calculator",
        "/car-loan-calculator",
        "/amortization-calculator"
      ]
    }
  },
  "/affordability-calculator": {
    "en": {
      "title": "Loan Affordability Calculator | Estimate How Much You Can Borrow",
      "description": "Estimate whether a loan payment may feel comfortable using income, other debts, housing ratio and total debt ratio planning guides.",
      "heading": "Loan Affordability Calculator",
      "intro": "Use the affordability calculator to compare the estimated payment with income and other monthly debt. The goal is to understand whether the payment may feel comfortable, stretched or risky before you borrow.",
      "sections": [
        [
          "How affordability is estimated",
          [
            "Housing ratio compares the required housing payment with gross monthly income.",
            "Total debt ratio compares the required payment plus other monthly debt with gross monthly income.",
            "The comfort score is an educational guide, not lender approval."
          ]
        ],
        [
          "What to include",
          [
            "Mortgage or auto payment estimates.",
            "Taxes, insurance, HOA, PMI or recurring fees.",
            "Credit cards, student loans, car loans and other recurring debts."
          ]
        ]
      ],
      "faq": [
        [
          "What is the 28/36 guideline?",
          "It is a common planning rule that suggests keeping housing near 28 percent of gross income and total debt near 36 percent. Real lenders may use different rules."
        ],
        [
          "Is the comfort score an approval decision?",
          "No. The score is an educational planning tool and is not a loan approval or underwriting decision."
        ],
        [
          "How can I improve affordability?",
          "A lower price, larger down payment, lower rate, longer term or lower other debts may improve affordability."
        ]
      ],
      "related": [
        "/mortgage-calculator",
        "/pmi-calculator",
        "/",
        "/personal-loan-calculator"
      ]
    },
    "es": {
      "title": "Calculadora de Capacidad de Pago | Estima Cuánto Puedes Pedir",
      "description": "Estima si un pago puede sentirse cómodo usando ingreso, otras deudas y guías de ratio de vivienda y deuda total.",
      "heading": "Calculadora de Capacidad de Pago",
      "intro": "Usa esta calculadora para comparar el pago estimado con tus ingresos y otras deudas mensuales. La meta es entender si el pago se siente cómodo, ajustado o riesgoso antes de pedir prestado.",
      "sections": [
        [
          "Cómo se estima",
          [
            "El ratio de vivienda compara el pago requerido con el ingreso bruto mensual.",
            "El ratio total de deuda compara el pago requerido más otras deudas con el ingreso bruto mensual.",
            "El puntaje de comodidad es educativo, no aprobación de préstamo."
          ]
        ],
        [
          "Qué incluir",
          [
            "Pago estimado de hipoteca o auto.",
            "Impuestos, seguro, HOA, PMI o cargos recurrentes.",
            "Tarjetas, préstamos estudiantiles, autos y otras deudas recurrentes."
          ]
        ]
      ],
      "faq": [
        [
          "¿Qué es la guía 28/36?",
          "Es una regla común que sugiere mantener vivienda cerca de 28% del ingreso bruto y deuda total cerca de 36%. Prestamistas reales pueden usar otras reglas."
        ],
        [
          "¿El puntaje es aprobación?",
          "No. Es una herramienta educativa y no una decisión de aprobación o suscripción."
        ],
        [
          "¿Cómo puedo mejorar la capacidad de pago?",
          "Precio más bajo, mayor inicial, tasa menor, plazo más largo o menos deudas pueden mejorarla."
        ]
      ],
      "related": [
        "/mortgage-calculator",
        "/pmi-calculator",
        "/",
        "/personal-loan-calculator"
      ]
    }
  },
  "/pmi-calculator": {
    "en": {
      "title": "PMI Calculator | Estimate Private Mortgage Insurance",
      "description": "Estimate private mortgage insurance for a home loan with less than 20 percent down and see how it affects the first monthly payment.",
      "heading": "PMI Calculator",
      "intro": "Use the PMI calculator to estimate how private mortgage insurance may affect a home loan when the down payment is below 20 percent. The calculator treats PMI as a monthly cost and removes it when the balance reaches about 80 percent loan to value.",
      "sections": [
        [
          "When PMI may apply",
          [
            "PMI often applies to conventional mortgages with less than 20 percent down.",
            "The actual amount depends on lender rules, loan type, credit profile and mortgage details.",
            "This calculator estimates PMI from the annual rate entered by the user."
          ]
        ],
        [
          "How to interpret PMI",
          [
            "PMI increases the first monthly payment.",
            "A larger down payment may reduce or remove PMI.",
            "PMI may drop off later, so the first monthly payment may be higher than later payments."
          ]
        ]
      ],
      "faq": [
        [
          "What is PMI?",
          "PMI stands for private mortgage insurance. It may protect the lender when a borrower makes a smaller down payment."
        ],
        [
          "When does PMI go away?",
          "This calculator estimates PMI until the loan balance reaches about 80 percent of the original home value. Actual rules vary by loan and lender."
        ],
        [
          "Can I avoid PMI?",
          "A down payment of 20 percent or more may avoid PMI on many conventional loans, but confirm with the lender."
        ]
      ],
      "related": [
        "/mortgage-calculator",
        "/affordability-calculator",
        "/extra-payment-calculator"
      ]
    },
    "es": {
      "title": "Calculadora de PMI | Estima Seguro Hipotecario Privado",
      "description": "Estima seguro hipotecario privado para una hipoteca con menos de 20% inicial y cómo afecta el primer pago mensual.",
      "heading": "Calculadora de PMI",
      "intro": "Usa esta calculadora para estimar cómo el PMI puede afectar una hipoteca cuando el inicial es menor de 20%. La calculadora trata PMI como costo mensual y lo elimina cuando el balance llega cerca de 80% LTV.",
      "sections": [
        [
          "Cuándo puede aplicar",
          [
            "PMI suele aplicar en hipotecas convencionales con menos de 20% inicial.",
            "El monto real depende de reglas del prestamista, tipo de préstamo, crédito y detalles de la hipoteca.",
            "Esta calculadora estima PMI usando la tasa anual que ingresa el usuario."
          ]
        ],
        [
          "Cómo interpretarlo",
          [
            "PMI aumenta el primer pago mensual.",
            "Un inicial mayor puede reducir o eliminar PMI.",
            "PMI puede desaparecer luego, así que el primer pago puede ser mayor que pagos futuros."
          ]
        ]
      ],
      "faq": [
        [
          "¿Qué es PMI?",
          "PMI significa seguro hipotecario privado. Puede proteger al prestamista cuando el prestatario da un inicial menor."
        ],
        [
          "¿Cuándo desaparece PMI?",
          "Esta calculadora estima PMI hasta que el balance llega cerca de 80% del valor original. Las reglas reales varían."
        ],
        [
          "¿Puedo evitar PMI?",
          "Un inicial de 20% o más puede evitar PMI en muchas hipotecas convencionales, pero confirma con el prestamista."
        ]
      ],
      "related": [
        "/mortgage-calculator",
        "/affordability-calculator",
        "/extra-payment-calculator"
      ]
    }
  },
  "/personal-loan-calculator": {
    "en": {
      "title": "Personal Loan Calculator | Estimate Monthly Payments and Interest",
      "description": "Estimate personal loan payments, total interest and payoff timing using loan amount, interest rate, term and optional extra payments.",
      "heading": "Personal Loan Calculator",
      "intro": "Use this personal loan calculator to estimate the monthly payment for a fixed-rate installment loan. It can help compare terms, interest rates and extra payment strategies before you borrow.",
      "sections": [
        [
          "What it can estimate",
          [
            "Monthly principal and interest payment.",
            "Total interest over the life of the loan.",
            "How extra payments may shorten the payoff timeline."
          ]
        ],
        [
          "What to verify",
          [
            "APR, origination fees and lender charges may change the true cost.",
            "Some loans have prepayment rules or late fees.",
            "This calculator is for planning, not a lender quote."
          ]
        ]
      ],
      "faq": [
        [
          "Is a personal loan payment calculated like a car loan?",
          "Many fixed-rate personal loans use the same installment amortization concept: payment depends on amount borrowed, interest rate and term."
        ],
        [
          "Does APR matter?",
          "Yes. APR may include certain fees and can be different from the interest rate. Confirm the lender APR before deciding."
        ],
        [
          "Can I use this for debt consolidation?",
          "You can estimate payment and interest, but compare fees, rates and payoff behavior carefully before consolidating debt."
        ]
      ],
      "related": [
        "/",
        "/amortization-calculator",
        "/extra-payment-calculator",
        "/apr-vs-interest-rate"
      ]
    },
    "es": {
      "title": "Calculadora de Préstamo Personal | Estima Pagos e Interés",
      "description": "Estima pagos de préstamo personal, interés total y plazo usando monto, tasa, término y pagos extra opcionales.",
      "heading": "Calculadora de Préstamo Personal",
      "intro": "Usa esta calculadora para estimar el pago mensual de un préstamo personal de tasa fija. Puede ayudar a comparar plazos, tasas y pagos extra antes de tomar prestado.",
      "sections": [
        [
          "Qué puede estimar",
          [
            "Pago mensual de principal e interés.",
            "Interés total durante el préstamo.",
            "Cómo pagos extra pueden acortar el plazo."
          ]
        ],
        [
          "Qué verificar",
          [
            "APR, cargos de originación y costos del prestamista pueden cambiar el costo real.",
            "Algunos préstamos tienen reglas de prepago o cargos por retraso.",
            "Esta calculadora es de planificación, no cotización de prestamista."
          ]
        ]
      ],
      "faq": [
        [
          "¿Un préstamo personal se calcula como uno de auto?",
          "Muchos préstamos personales de tasa fija usan amortización: el pago depende del monto, tasa y plazo."
        ],
        [
          "¿Importa el APR?",
          "Sí. El APR puede incluir ciertos cargos y ser diferente de la tasa de interés. Confirma el APR del prestamista."
        ],
        [
          "¿Sirve para consolidar deuda?",
          "Puedes estimar pago e interés, pero compara cargos, tasas y comportamiento de pago antes de consolidar."
        ]
      ],
      "related": [
        "/",
        "/amortization-calculator",
        "/extra-payment-calculator",
        "/apr-vs-interest-rate"
      ]
    }
  },
  "/apr-vs-interest-rate": {
    "en": {
      "title": "APR vs Interest Rate | Understand the Difference Before You Borrow",
      "description": "Learn the difference between APR and interest rate, why it matters for loan comparisons and how to use both when estimating payments.",
      "heading": "APR vs Interest Rate",
      "intro": "Interest rate and APR are related, but they are not always the same. This guide explains the difference in plain language so you can compare loan offers more carefully.",
      "sections": [
        [
          "Simple difference",
          [
            "Interest rate is the cost used to calculate interest on the loan balance.",
            "APR may include interest plus certain lender fees expressed as an annual cost.",
            "A loan with a lower interest rate is not always the lowest-cost option if fees are high."
          ]
        ],
        [
          "How to use this with calculators",
          [
            "Use the interest rate to estimate monthly principal and interest.",
            "Use APR to compare total borrowing cost between lender offers.",
            "Ask the lender which fees are included in APR and which costs are separate."
          ]
        ]
      ],
      "faq": [
        [
          "Should I enter APR or interest rate in the calculator?",
          "For the monthly payment formula, enter the interest rate used by the lender to calculate the payment. Use APR separately to compare offer costs."
        ],
        [
          "Can APR be higher than the interest rate?",
          "Yes. APR is often higher when lender fees are included."
        ],
        [
          "Does a lower APR always mean the best loan?",
          "Not always. Consider monthly payment, fees, term, prepayment rules and how long you plan to keep the loan."
        ]
      ],
      "related": [
        "/",
        "/personal-loan-calculator",
        "/mortgage-calculator",
        "/car-loan-calculator"
      ]
    },
    "es": {
      "title": "APR vs Tasa de Interés | Entiende la Diferencia Antes de Pedir Prestado",
      "description": "Aprende la diferencia entre APR y tasa de interés, por qué importa al comparar préstamos y cómo usar ambos conceptos.",
      "heading": "APR vs Tasa de Interés",
      "intro": "La tasa de interés y el APR están relacionados, pero no siempre son iguales. Esta guía explica la diferencia en lenguaje simple para comparar ofertas con más cuidado.",
      "sections": [
        [
          "Diferencia simple",
          [
            "La tasa de interés se usa para calcular interés sobre el balance.",
            "El APR puede incluir interés más ciertos cargos del prestamista expresados como costo anual.",
            "Una tasa menor no siempre significa menor costo total si los cargos son altos."
          ]
        ],
        [
          "Cómo usarlo con calculadoras",
          [
            "Usa la tasa de interés para estimar principal e interés mensual.",
            "Usa APR para comparar costo total entre ofertas.",
            "Pregunta qué cargos están incluidos en el APR y cuáles son separados."
          ]
        ]
      ],
      "faq": [
        [
          "¿Debo poner APR o tasa en la calculadora?",
          "Para la fórmula mensual, ingresa la tasa que el prestamista usa para calcular el pago. Usa APR para comparar costos de ofertas."
        ],
        [
          "¿El APR puede ser mayor que la tasa?",
          "Sí. El APR suele ser mayor cuando incluye cargos."
        ],
        [
          "¿Un APR menor siempre es mejor?",
          "No siempre. Considera pago mensual, cargos, plazo, reglas de prepago y cuánto tiempo conservarás el préstamo."
        ]
      ],
      "related": [
        "/",
        "/personal-loan-calculator",
        "/mortgage-calculator",
        "/car-loan-calculator"
      ]
    }
  },
  "/monthly-payment-calculator": {
    "en": {
      "title": "Monthly Payment Calculator | Estimate Loan Payments Before You Borrow",
      "description": "Estimate monthly payments for fixed-rate loans and understand how loan amount, interest rate and term change the result.",
      "heading": "Monthly Payment Calculator",
      "intro": "Use this monthly payment calculator to estimate what a fixed-rate loan may cost each month. It is designed for simple planning before you compare lender quotes.",
      "sections": [
        [
          "What changes the monthly payment",
          [
            "Borrowing more usually increases the payment.",
            "A higher interest rate usually increases the payment.",
            "A longer term may lower the payment but increase total interest."
          ]
        ],
        [
          "How to use the estimate",
          [
            "Test several prices, rates and terms.",
            "Compare the required payment with your income and other debts.",
            "Download a report or CSV to review the numbers later."
          ]
        ]
      ],
      "faq": [
        [
          "What is a monthly payment calculator?",
          "It estimates the amount due each month based on loan amount, interest rate and term, plus optional planning costs."
        ],
        [
          "Why does term length matter?",
          "Term length spreads repayment over more or fewer months, changing both payment size and total interest."
        ],
        [
          "Are the numbers guaranteed?",
          "No. They are estimates for education and planning only."
        ]
      ],
      "related": [
        "/",
        "/mortgage-calculator",
        "/car-loan-calculator",
        "/amortization-calculator"
      ]
    },
    "es": {
      "title": "Calculadora de Pago Mensual | Estima Pagos Antes de Pedir Prestado",
      "description": "Estima pagos mensuales para préstamos de tasa fija y entiende cómo monto, tasa y plazo cambian el resultado.",
      "heading": "Calculadora de Pago Mensual",
      "intro": "Usa esta calculadora para estimar cuánto puede costar cada mes un préstamo de tasa fija. Está diseñada para planificar antes de comparar cotizaciones.",
      "sections": [
        [
          "Qué cambia el pago",
          [
            "Pedir más dinero normalmente aumenta el pago.",
            "Una tasa más alta normalmente aumenta el pago.",
            "Un plazo más largo puede bajar el pago pero subir el interés total."
          ]
        ],
        [
          "Cómo usar el estimado",
          [
            "Prueba varios precios, tasas y plazos.",
            "Compara el pago requerido con ingreso y otras deudas.",
            "Descarga un reporte o CSV para revisar luego."
          ]
        ]
      ],
      "faq": [
        [
          "¿Qué es una calculadora de pago mensual?",
          "Estima cuánto se paga cada mes según monto, tasa y plazo, más costos opcionales de planificación."
        ],
        [
          "¿Por qué importa el plazo?",
          "El plazo distribuye el pago en más o menos meses, cambiando pago e interés total."
        ],
        [
          "¿Los números están garantizados?",
          "No. Son estimados educativos y de planificación."
        ]
      ],
      "related": [
        "/",
        "/mortgage-calculator",
        "/car-loan-calculator",
        "/amortization-calculator"
      ]
    }
  }
};

const seoExpansionPages = {
  "/how-to-calculate-monthly-loan-payments": {
    "en": {
      "title": "How to Calculate Monthly Loan Payments | Check My Payments",
      "description": "Learn how monthly loan payments are estimated using loan amount, interest rate, loan term and amortization, then use the calculator to test your numbers.",
      "heading": "How to Calculate Monthly Loan Payments",
      "intro": "Monthly loan payments are easier to understand when you separate the loan amount, interest rate, term and optional costs. This guide explains the basic logic in plain language and points you to the calculator for your own estimate.",
      "sections": [
        [
          "What the payment depends on",
          [
            "The loan amount is usually the price minus your down payment.",
            "The interest rate controls how much interest is charged each month.",
            "The term controls how many months you have to repay the balance."
          ]
        ],
        [
          "How to use the calculator",
          [
            "Enter the price, down payment, rate and term first.",
            "Then add taxes, insurance, HOA, fees or extra payments if they apply.",
            "Compare the monthly payment with the total interest so you do not focus only on the lowest payment."
          ]
        ],
        [
          "Important estimate limits",
          [
            "A lender quote may include APR, closing costs, escrow rules or fees not shown here.",
            "Use this as a planning tool, not as approval or a guaranteed loan offer."
          ]
        ]
      ],
      "faq": [
        [
          "What is the basic payment formula?",
          "Fixed-rate installment loans generally use an amortization formula that spreads principal and interest over the loan term."
        ],
        [
          "Why does interest rate matter so much?",
          "A higher rate increases the cost of borrowing and can raise both monthly payment and total interest."
        ],
        [
          "Is this financial advice?",
          "No. This guide and calculator are educational estimates only."
        ]
      ],
      "related": [
        "/monthly-payment-calculator",
        "/amortization-calculator",
        "/mortgage-calculator",
        "/car-loan-calculator"
      ]
    },
    "es": {
      "title": "Cómo Calcular Pagos Mensuales de Préstamo | Check My Payments",
      "description": "Aprende cómo se estiman pagos mensuales con monto, tasa, plazo y amortización, y usa la calculadora para probar tus números.",
      "heading": "Cómo Calcular Pagos Mensuales de Préstamo",
      "intro": "Los pagos mensuales se entienden mejor separando monto del préstamo, tasa, plazo y costos opcionales. Esta guía explica la lógica básica y te lleva a la calculadora.",
      "sections": [
        [
          "De qué depende el pago",
          [
            "El monto suele ser el precio menos la inicial.",
            "La tasa determina cuánto interés se cobra cada mes.",
            "El plazo determina cuántos meses tienes para pagar."
          ]
        ],
        [
          "Cómo usar la calculadora",
          [
            "Ingresa precio, inicial, tasa y plazo primero.",
            "Luego agrega impuestos, seguro, HOA, cargos o pagos extra si aplican.",
            "Compara pago mensual con interés total, no solo el pago más bajo."
          ]
        ],
        [
          "Límites del estimado",
          [
            "Una cotización puede incluir APR, costos de cierre, reglas de escrow o cargos adicionales.",
            "Úsalo para planificación, no como aprobación o oferta garantizada."
          ]
        ]
      ],
      "faq": [
        [
          "¿Cuál es la fórmula básica?",
          "Los préstamos a tasa fija normalmente usan una fórmula de amortización que reparte principal e interés en el plazo."
        ],
        [
          "¿Por qué importa tanto la tasa?",
          "Una tasa más alta aumenta el costo de pedir prestado y puede subir el pago y el interés total."
        ],
        [
          "¿Esto es asesoría financiera?",
          "No. Es un estimado educativo solamente."
        ]
      ],
      "related": [
        "/monthly-payment-calculator",
        "/amortization-calculator",
        "/mortgage-calculator",
        "/car-loan-calculator"
      ]
    }
  },
  "/how-extra-payments-reduce-interest": {
    "en": {
      "title": "How Extra Payments Reduce Loan Interest | Check My Payments",
      "description": "Learn how extra monthly payments can reduce principal faster, lower total interest and shorten loan payoff time.",
      "heading": "How Extra Payments Reduce Interest",
      "intro": "Extra payments can be powerful because they usually go toward reducing the remaining balance. A lower balance means less interest is charged in future months.",
      "sections": [
        [
          "Why extra payments help",
          [
            "Interest is calculated from the remaining balance.",
            "When extra money reduces principal, future interest charges can fall.",
            "Small extra payments can add up over long loan terms."
          ]
        ],
        [
          "What to check first",
          [
            "Confirm that your lender applies extra payments to principal.",
            "Ask whether there are prepayment penalties or special instructions.",
            "Keep emergency savings before committing to aggressive extra payments."
          ]
        ],
        [
          "How to compare",
          [
            "Use the extra payment calculator to compare no extra payment versus a monthly extra payment.",
            "Review both interest saved and payoff time saved."
          ]
        ]
      ],
      "faq": [
        [
          "Do extra payments always save interest?",
          "They usually save interest on amortizing loans when applied to principal, but lender rules matter."
        ],
        [
          "Should I pay extra every month?",
          "It depends on your budget, emergency savings and other debt priorities."
        ],
        [
          "Can this calculator guarantee savings?",
          "No. It provides estimates based on the inputs you enter."
        ]
      ],
      "related": [
        "/extra-payment-calculator",
        "/amortization-calculator",
        "/mortgage-calculator",
        "/car-loan-calculator"
      ]
    },
    "es": {
      "title": "Cómo los Pagos Extra Reducen Intereses | Check My Payments",
      "description": "Aprende cómo pagos extra mensuales pueden reducir principal, bajar interés total y acortar el plazo del préstamo.",
      "heading": "Cómo los Pagos Extra Reducen Intereses",
      "intro": "Los pagos extra pueden ayudar porque normalmente reducen el balance pendiente. Un balance menor significa menos interés en meses futuros.",
      "sections": [
        [
          "Por qué ayudan",
          [
            "El interés se calcula sobre el balance pendiente.",
            "Cuando el extra reduce principal, los intereses futuros pueden bajar.",
            "Pagos pequeños pueden acumularse durante plazos largos."
          ]
        ],
        [
          "Qué confirmar primero",
          [
            "Confirma que el prestamista aplique el extra a principal.",
            "Pregunta si hay penalidades por prepago o instrucciones especiales.",
            "Mantén ahorros de emergencia antes de pagar extra agresivamente."
          ]
        ],
        [
          "Cómo comparar",
          [
            "Compara sin pago extra contra un pago extra mensual.",
            "Revisa interés ahorrado y tiempo reducido."
          ]
        ]
      ],
      "faq": [
        [
          "¿Los pagos extra siempre ahorran interés?",
          "Normalmente sí si se aplican a principal, pero las reglas del prestamista importan."
        ],
        [
          "¿Conviene pagar extra cada mes?",
          "Depende de tu presupuesto, ahorros y otras deudas."
        ],
        [
          "¿La calculadora garantiza ahorros?",
          "No. Da estimados según los datos ingresados."
        ]
      ],
      "related": [
        "/extra-payment-calculator",
        "/amortization-calculator",
        "/mortgage-calculator",
        "/car-loan-calculator"
      ]
    }
  },
  "/how-amortization-works": {
    "en": {
      "title": "How Amortization Works | Principal and Interest Explained",
      "description": "Understand how amortization schedules split payments between interest and principal over time.",
      "heading": "How Amortization Works",
      "intro": "Amortization is the process of paying down a loan through scheduled payments. Each payment usually includes interest plus principal, but the mix changes over time.",
      "sections": [
        [
          "Early payments",
          [
            "Early in a loan, more of the payment often goes to interest.",
            "This happens because the balance is still high."
          ]
        ],
        [
          "Later payments",
          [
            "As the balance falls, more of each payment can reduce principal.",
            "This is why payoff accelerates later in the schedule."
          ]
        ],
        [
          "How to use a schedule",
          [
            "Look at starting balance, interest, principal and ending balance month by month.",
            "Use the schedule to understand total cost and payoff timing."
          ]
        ]
      ],
      "faq": [
        [
          "What is an amortization schedule?",
          "It is a table showing how each payment affects balance, principal and interest."
        ],
        [
          "Why is early principal low?",
          "Interest is based on the remaining balance, which is largest early in the loan."
        ],
        [
          "Can extra payments change amortization?",
          "Yes. Extra principal payments can reduce future interest and shorten the schedule."
        ]
      ],
      "related": [
        "/amortization-calculator",
        "/extra-payment-calculator",
        "/principal-vs-interest",
        "/how-to-calculate-monthly-loan-payments"
      ]
    },
    "es": {
      "title": "Cómo Funciona la Amortización | Principal e Interés",
      "description": "Entiende cómo una tabla de amortización divide los pagos entre interés y principal a través del tiempo.",
      "heading": "Cómo Funciona la Amortización",
      "intro": "La amortización es el proceso de pagar un préstamo con pagos programados. Cada pago suele incluir interés y principal, pero la mezcla cambia con el tiempo.",
      "sections": [
        [
          "Pagos iniciales",
          [
            "Al inicio, más del pago suele ir a interés.",
            "Esto ocurre porque el balance todavía es alto."
          ]
        ],
        [
          "Pagos posteriores",
          [
            "A medida que baja el balance, más del pago reduce principal.",
            "Por eso el pago del balance acelera con el tiempo."
          ]
        ],
        [
          "Cómo leer la tabla",
          [
            "Revisa balance inicial, interés, principal y balance final cada mes.",
            "Úsala para entender costo total y fecha de pago final."
          ]
        ]
      ],
      "faq": [
        [
          "¿Qué es una tabla de amortización?",
          "Una tabla que muestra cómo cada pago afecta balance, principal e interés."
        ],
        [
          "¿Por qué el principal es bajo al inicio?",
          "Porque el interés se basa en el balance pendiente, que es mayor al inicio."
        ],
        [
          "¿Los pagos extra cambian la amortización?",
          "Sí. Pueden reducir interés futuro y acortar el calendario."
        ]
      ],
      "related": [
        "/amortization-calculator",
        "/extra-payment-calculator",
        "/principal-vs-interest",
        "/how-to-calculate-monthly-loan-payments"
      ]
    }
  },
  "/how-interest-rates-affect-payments": {
    "en": {
      "title": "How Interest Rates Affect Monthly Payments | Check My Payments",
      "description": "See why a higher interest rate can raise monthly payments and total interest, even when the loan amount stays the same.",
      "heading": "How Interest Rates Affect Monthly Payments",
      "intro": "Interest rate is one of the biggest drivers of loan cost. Even a small rate change can affect the payment and the total interest paid over the loan term.",
      "sections": [
        [
          "Monthly payment effect",
          [
            "A higher rate increases the interest charged each month.",
            "This usually raises the required payment for the same loan amount and term."
          ]
        ],
        [
          "Total cost effect",
          [
            "The longer the term, the more time interest has to accumulate.",
            "Rate changes can be especially important on long mortgages."
          ]
        ],
        [
          "What to test",
          [
            "Compare your loan at the current rate, plus 0.50%, and minus 0.50%.",
            "Review both monthly payment and total interest."
          ]
        ]
      ],
      "faq": [
        [
          "Does a lower rate always save money?",
          "Usually it lowers interest, but fees and APR should also be reviewed."
        ],
        [
          "Should I use APR or interest rate?",
          "Use the payment interest rate for the calculator and APR to compare broader offer costs."
        ],
        [
          "Can rates change after a quote?",
          "Yes. Confirm terms directly with a lender."
        ]
      ],
      "related": [
        "/apr-vs-interest-rate",
        "/monthly-payment-calculator",
        "/mortgage-calculator",
        "/car-loan-calculator"
      ]
    },
    "es": {
      "title": "Cómo las Tasas Afectan los Pagos Mensuales | Check My Payments",
      "description": "Mira por qué una tasa más alta puede subir pagos mensuales e interés total aunque el monto sea igual.",
      "heading": "Cómo las Tasas Afectan los Pagos Mensuales",
      "intro": "La tasa de interés es uno de los factores principales del costo de un préstamo. Un cambio pequeño puede afectar pago mensual e interés total.",
      "sections": [
        [
          "Efecto en el pago",
          [
            "Una tasa más alta aumenta el interés mensual.",
            "Esto normalmente sube el pago requerido para el mismo monto y plazo."
          ]
        ],
        [
          "Efecto en costo total",
          [
            "Mientras más largo el plazo, más tiempo se acumula interés.",
            "Los cambios de tasa son muy importantes en hipotecas largas."
          ]
        ],
        [
          "Qué probar",
          [
            "Compara tu préstamo con la tasa actual, +0.50% y -0.50%.",
            "Revisa pago mensual e interés total."
          ]
        ]
      ],
      "faq": [
        [
          "¿Una tasa menor siempre ahorra dinero?",
          "Normalmente reduce interés, pero también debes revisar cargos y APR."
        ],
        [
          "¿Uso APR o tasa?",
          "Usa la tasa para calcular el pago y APR para comparar costos generales."
        ],
        [
          "¿La tasa puede cambiar?",
          "Sí. Confirma términos con el prestamista."
        ]
      ],
      "related": [
        "/apr-vs-interest-rate",
        "/monthly-payment-calculator",
        "/mortgage-calculator",
        "/car-loan-calculator"
      ]
    }
  },
  "/30-year-vs-15-year-mortgage": {
    "en": {
      "title": "30-Year vs 15-Year Mortgage | Payment and Interest Tradeoffs",
      "description": "Compare how 30-year and 15-year mortgages affect monthly payment, total interest and payoff speed.",
      "heading": "30-Year vs 15-Year Mortgage",
      "intro": "A 30-year mortgage usually offers a lower monthly payment, while a 15-year mortgage usually costs more each month but can reduce total interest and payoff time.",
      "sections": [
        [
          "30-year mortgage",
          [
            "Usually lower monthly payment.",
            "More flexibility for monthly cash flow.",
            "Often more total interest because the loan lasts longer."
          ]
        ],
        [
          "15-year mortgage",
          [
            "Usually higher monthly payment.",
            "Faster payoff and often much less total interest.",
            "May feel tight if the payment leaves little budget room."
          ]
        ],
        [
          "How to decide",
          [
            "Compare both monthly payment and total interest.",
            "Consider emergency savings, income stability and other debt."
          ]
        ]
      ],
      "faq": [
        [
          "Is a 15-year mortgage always better?",
          "Not always. It can save interest but may create a higher monthly burden."
        ],
        [
          "Can extra payments make a 30-year loan act like a shorter loan?",
          "Extra payments can shorten payoff while keeping the required payment lower, but discipline is required."
        ],
        [
          "Should I compare both options?",
          "Yes. Use the calculator to compare cash flow and total cost."
        ]
      ],
      "related": [
        "/mortgage-calculator",
        "/extra-payment-calculator",
        "/affordability-calculator",
        "/loan-term-vs-monthly-payment"
      ]
    },
    "es": {
      "title": "Hipoteca a 30 Años vs 15 Años | Pago e Interés",
      "description": "Compara cómo hipotecas de 30 y 15 años afectan pago mensual, interés total y velocidad de pago.",
      "heading": "Hipoteca a 30 Años vs 15 Años",
      "intro": "Una hipoteca a 30 años suele tener pago mensual menor. Una a 15 años suele costar más al mes, pero puede reducir interés total y tiempo de pago.",
      "sections": [
        [
          "Hipoteca a 30 años",
          [
            "Pago mensual normalmente menor.",
            "Más flexibilidad mensual.",
            "Suele tener más interés total por durar más."
          ]
        ],
        [
          "Hipoteca a 15 años",
          [
            "Pago mensual normalmente más alto.",
            "Pago final más rápido y menos interés total.",
            "Puede ser apretada si deja poco margen en el presupuesto."
          ]
        ],
        [
          "Cómo decidir",
          [
            "Compara pago mensual e interés total.",
            "Considera ahorros, estabilidad de ingresos y otras deudas."
          ]
        ]
      ],
      "faq": [
        [
          "¿Siempre es mejor 15 años?",
          "No siempre. Puede ahorrar interés, pero sube el pago mensual."
        ],
        [
          "¿Pagos extra pueden acortar una hipoteca de 30 años?",
          "Sí. Pueden reducir el plazo manteniendo un pago requerido más bajo, pero requiere disciplina."
        ],
        [
          "¿Debo comparar ambas?",
          "Sí. Compara flujo mensual y costo total."
        ]
      ],
      "related": [
        "/mortgage-calculator",
        "/extra-payment-calculator",
        "/affordability-calculator",
        "/loan-term-vs-monthly-payment"
      ]
    }
  },
  "/how-much-car-loan-can-i-afford": {
    "en": {
      "title": "How Much Car Loan Can I Afford? | Check My Payments",
      "description": "Estimate a comfortable car payment by considering income, other debt, insurance, fees and total loan cost.",
      "heading": "How Much Car Loan Can I Afford?",
      "intro": "A car payment should be viewed alongside insurance, fees, maintenance, fuel and other debts. This guide helps you think beyond the advertised monthly payment.",
      "sections": [
        [
          "Start with income and debt",
          [
            "Compare the payment to your monthly income.",
            "Include other monthly debts before deciding if the payment is comfortable."
          ]
        ],
        [
          "Remember ownership costs",
          [
            "Insurance, registration, repairs and fuel can change affordability.",
            "A lower payment with a long term may still cost more interest."
          ]
        ],
        [
          "Use a comfort margin",
          [
            "Leave room for emergencies and income changes.",
            "Test a higher interest rate or shorter term before deciding."
          ]
        ]
      ],
      "faq": [
        [
          "Should I include insurance?",
          "Yes, including insurance gives a better view of the real monthly cost."
        ],
        [
          "Is the lowest monthly payment always best?",
          "No. A longer term can lower payment but increase total interest."
        ],
        [
          "Can this tell me what a lender will approve?",
          "No. It is a planning estimate, not an approval tool."
        ]
      ],
      "related": [
        "/car-loan-calculator",
        "/affordability-calculator",
        "/extra-payment-calculator",
        "/loan-term-vs-monthly-payment"
      ]
    },
    "es": {
      "title": "¿Cuánto Préstamo de Auto Puedo Pagar? | Check My Payments",
      "description": "Estima un pago de auto cómodo considerando ingresos, deudas, seguro, cargos y costo total.",
      "heading": "¿Cuánto Préstamo de Auto Puedo Pagar?",
      "intro": "Un pago de auto debe verse junto con seguro, cargos, mantenimiento, combustible y otras deudas. Esta guía ayuda a pensar más allá del pago anunciado.",
      "sections": [
        [
          "Empieza con ingresos y deudas",
          [
            "Compara el pago con tu ingreso mensual.",
            "Incluye otras deudas mensuales antes de decidir si es cómodo."
          ]
        ],
        [
          "Recuerda costos de uso",
          [
            "Seguro, registro, reparaciones y combustible cambian la capacidad de pago.",
            "Un pago bajo con plazo largo puede costar más interés."
          ]
        ],
        [
          "Deja margen",
          [
            "Deja espacio para emergencias y cambios de ingreso.",
            "Prueba una tasa más alta o plazo más corto antes de decidir."
          ]
        ]
      ],
      "faq": [
        [
          "¿Debo incluir seguro?",
          "Sí. Da una visión más real del costo mensual."
        ],
        [
          "¿El pago más bajo siempre es mejor?",
          "No. Un plazo largo baja el pago pero puede subir interés total."
        ],
        [
          "¿Esto dice si me aprobarán?",
          "No. Es planificación, no aprobación."
        ]
      ],
      "related": [
        "/car-loan-calculator",
        "/affordability-calculator",
        "/extra-payment-calculator",
        "/loan-term-vs-monthly-payment"
      ]
    }
  },
  "/what-is-pmi": {
    "en": {
      "title": "What Is PMI? | Private Mortgage Insurance Explained",
      "description": "Learn what PMI is, when it may apply, how it affects monthly mortgage payments and why it may drop off later.",
      "heading": "What Is PMI?",
      "intro": "Private mortgage insurance, or PMI, is often required on conventional home loans when the down payment is less than 20 percent. It protects the lender, but the borrower usually pays for it.",
      "sections": [
        [
          "When PMI may apply",
          [
            "PMI is common when the loan-to-value ratio is above 80%.",
            "A larger down payment may reduce or avoid PMI."
          ]
        ],
        [
          "How PMI affects payments",
          [
            "PMI is added to the monthly housing cost.",
            "It does not reduce principal or interest."
          ]
        ],
        [
          "When PMI may stop",
          [
            "PMI may drop off when the balance reaches around 80% of the original value, depending on loan rules.",
            "Confirm rules with your lender or servicer."
          ]
        ]
      ],
      "faq": [
        [
          "Is PMI the same as homeowners insurance?",
          "No. Homeowners insurance protects the property and owner. PMI protects the lender."
        ],
        [
          "Can PMI be avoided?",
          "Often, a 20% down payment can avoid PMI on many conventional loans."
        ],
        [
          "Is PMI included in the calculator?",
          "The home loan calculator estimates PMI when down payment is under 20%."
        ]
      ],
      "related": [
        "/pmi-calculator",
        "/mortgage-calculator",
        "/affordability-calculator",
        "/extra-payment-calculator"
      ]
    },
    "es": {
      "title": "¿Qué es PMI? | Seguro Hipotecario Privado Explicado",
      "description": "Aprende qué es PMI, cuándo aplica, cómo afecta el pago mensual y por qué puede eliminarse más adelante.",
      "heading": "¿Qué es PMI?",
      "intro": "El seguro hipotecario privado, o PMI, suele requerirse en préstamos convencionales cuando la inicial es menor al 20%. Protege al prestamista, pero normalmente lo paga el prestatario.",
      "sections": [
        [
          "Cuándo aplica",
          [
            "Es común cuando la relación préstamo-valor supera 80%.",
            "Una inicial mayor puede reducir o evitar PMI."
          ]
        ],
        [
          "Cómo afecta el pago",
          [
            "El PMI se suma al costo mensual de vivienda.",
            "No reduce principal ni interés."
          ]
        ],
        [
          "Cuándo puede terminar",
          [
            "Puede eliminarse cuando el balance llega cerca del 80% del valor original, según reglas del préstamo.",
            "Confirma con el prestamista o administrador."
          ]
        ]
      ],
      "faq": [
        [
          "¿PMI es lo mismo que seguro de vivienda?",
          "No. El seguro protege la propiedad y dueño. PMI protege al prestamista."
        ],
        [
          "¿Se puede evitar PMI?",
          "Muchas veces una inicial de 20% evita PMI en préstamos convencionales."
        ],
        [
          "¿La calculadora incluye PMI?",
          "La calculadora de vivienda estima PMI cuando la inicial es menor al 20%."
        ]
      ],
      "related": [
        "/pmi-calculator",
        "/mortgage-calculator",
        "/affordability-calculator",
        "/extra-payment-calculator"
      ]
    }
  },
  "/loan-term-vs-monthly-payment": {
    "en": {
      "title": "Loan Term vs Monthly Payment | Understand the Tradeoff",
      "description": "Learn how a longer or shorter loan term changes monthly payment, total interest and payoff time.",
      "heading": "Loan Term vs Monthly Payment",
      "intro": "Loan term is the number of months or years used to repay the loan. It can make the monthly payment look easier, but it also changes the total cost.",
      "sections": [
        [
          "Longer term",
          [
            "Usually lowers the monthly payment.",
            "Often increases total interest because the loan lasts longer."
          ]
        ],
        [
          "Shorter term",
          [
            "Usually raises the monthly payment.",
            "Often lowers total interest and pays the loan off faster."
          ]
        ],
        [
          "How to compare",
          [
            "Compare monthly payment, total interest and total paid.",
            "Choose a payment that leaves room for other obligations."
          ]
        ]
      ],
      "faq": [
        [
          "Does a longer term save money?",
          "Usually no. It may lower monthly payment but can increase total interest."
        ],
        [
          "Is a shorter term always better?",
          "Not always if the higher payment creates budget stress."
        ],
        [
          "What should I compare?",
          "Compare payment, interest, payoff time and budget comfort together."
        ]
      ],
      "related": [
        "/monthly-payment-calculator",
        "/extra-payment-calculator",
        "/30-year-vs-15-year-mortgage",
        "/car-loan-calculator"
      ]
    },
    "es": {
      "title": "Plazo del Préstamo vs Pago Mensual | Entiende el Intercambio",
      "description": "Aprende cómo un plazo más largo o corto cambia el pago mensual, interés total y fecha final.",
      "heading": "Plazo del Préstamo vs Pago Mensual",
      "intro": "El plazo es la cantidad de meses o años para pagar el préstamo. Puede hacer que el pago parezca más fácil, pero cambia el costo total.",
      "sections": [
        [
          "Plazo largo",
          [
            "Normalmente baja el pago mensual.",
            "Suele aumentar el interés total porque dura más."
          ]
        ],
        [
          "Plazo corto",
          [
            "Normalmente sube el pago mensual.",
            "Suele bajar el interés total y pagar más rápido."
          ]
        ],
        [
          "Cómo comparar",
          [
            "Compara pago mensual, interés total y total pagado.",
            "Elige un pago que deje espacio para otras obligaciones."
          ]
        ]
      ],
      "faq": [
        [
          "¿Un plazo largo ahorra dinero?",
          "Normalmente no. Puede bajar el pago, pero subir el interés total."
        ],
        [
          "¿Un plazo corto siempre es mejor?",
          "No si el pago más alto aprieta el presupuesto."
        ],
        [
          "¿Qué debo comparar?",
          "Pago, interés, fecha de pago final y comodidad del presupuesto juntos."
        ]
      ],
      "related": [
        "/monthly-payment-calculator",
        "/extra-payment-calculator",
        "/30-year-vs-15-year-mortgage",
        "/car-loan-calculator"
      ]
    }
  },
  "/principal-vs-interest": {
    "en": {
      "title": "Principal vs Interest | Loan Payment Basics",
      "description": "Understand the difference between principal and interest and why your payment mix changes over time.",
      "heading": "Principal vs Interest",
      "intro": "Principal is the money you borrowed. Interest is the cost of borrowing. In an amortizing loan, each payment usually includes both.",
      "sections": [
        [
          "Principal",
          [
            "Principal is the loan balance that must be repaid.",
            "Payments that reduce principal lower the future balance."
          ]
        ],
        [
          "Interest",
          [
            "Interest is the lender's charge for borrowing money.",
            "Interest is generally based on the remaining balance and rate."
          ]
        ],
        [
          "Why the mix changes",
          [
            "Early payments often include more interest.",
            "Later payments often reduce more principal as the balance gets smaller."
          ]
        ]
      ],
      "faq": [
        [
          "Is principal the same as payment?",
          "No. Payment includes principal plus interest and sometimes other costs."
        ],
        [
          "Does paying principal save interest?",
          "Extra principal payments can reduce future interest on many amortizing loans."
        ],
        [
          "Where can I see the split?",
          "Use the amortization calculator to see each month."
        ]
      ],
      "related": [
        "/amortization-calculator",
        "/how-amortization-works",
        "/extra-payment-calculator",
        "/monthly-payment-calculator"
      ]
    },
    "es": {
      "title": "Principal vs Interés | Conceptos Básicos del Préstamo",
      "description": "Entiende la diferencia entre principal e interés y por qué la mezcla del pago cambia con el tiempo.",
      "heading": "Principal vs Interés",
      "intro": "Principal es el dinero prestado. Interés es el costo de pedir prestado. En un préstamo amortizado, cada pago suele incluir ambos.",
      "sections": [
        [
          "Principal",
          [
            "Principal es el balance que debe pagarse.",
            "Pagos que reducen principal bajan el balance futuro."
          ]
        ],
        [
          "Interés",
          [
            "Interés es el cargo por pedir dinero prestado.",
            "Generalmente se calcula sobre el balance pendiente y la tasa."
          ]
        ],
        [
          "Por qué cambia la mezcla",
          [
            "Al inicio suele haber más interés.",
            "Luego más del pago reduce principal porque el balance baja."
          ]
        ]
      ],
      "faq": [
        [
          "¿Principal es igual al pago?",
          "No. El pago incluye principal, interés y a veces otros costos."
        ],
        [
          "¿Pagar principal ahorra interés?",
          "Pagos extra a principal pueden reducir interés futuro en muchos préstamos amortizados."
        ],
        [
          "¿Dónde veo la división?",
          "Usa la calculadora de amortización para ver cada mes."
        ]
      ],
      "related": [
        "/amortization-calculator",
        "/how-amortization-works",
        "/extra-payment-calculator",
        "/monthly-payment-calculator"
      ]
    }
  },
  "/how-to-compare-loan-offers": {
    "en": {
      "title": "How to Compare Loan Offers | Payment, APR and Total Cost",
      "description": "Learn what to compare before choosing a loan offer, including monthly payment, APR, fees, total interest and payoff flexibility.",
      "heading": "How to Compare Loan Offers",
      "intro": "Comparing loan offers is not only about choosing the lowest monthly payment. You should also review rate, APR, fees, term, total interest and prepayment rules.",
      "sections": [
        [
          "Compare the payment",
          [
            "Make sure each offer uses the same loan amount and term.",
            "Include taxes, insurance or fees when they affect monthly budget."
          ]
        ],
        [
          "Compare total cost",
          [
            "APR and fees can change which offer is actually cheaper.",
            "Total interest helps reveal long-term cost."
          ]
        ],
        [
          "Compare flexibility",
          [
            "Ask about prepayment penalties and extra payment rules.",
            "Consider whether the payment still feels comfortable if income changes."
          ]
        ]
      ],
      "faq": [
        [
          "Is the lowest payment best?",
          "Not always. It can mean a longer term and more total interest."
        ],
        [
          "Why compare APR?",
          "APR can include certain fees and may help compare offers more completely."
        ],
        [
          "Should I ask questions before signing?",
          "Yes. Confirm fees, payment rules and total cost with the lender."
        ]
      ],
      "related": [
        "/apr-vs-interest-rate",
        "/monthly-payment-calculator",
        "/how-to-estimate-total-loan-cost",
        "/loan-term-vs-monthly-payment"
      ]
    },
    "es": {
      "title": "Cómo Comparar Ofertas de Préstamo | Pago, APR y Costo Total",
      "description": "Aprende qué comparar antes de elegir un préstamo: pago, APR, cargos, interés total y flexibilidad de pago.",
      "heading": "Cómo Comparar Ofertas de Préstamo",
      "intro": "Comparar préstamos no es solo elegir el pago mensual más bajo. También revisa tasa, APR, cargos, plazo, interés total y reglas de prepago.",
      "sections": [
        [
          "Compara el pago",
          [
            "Asegúrate de usar el mismo monto y plazo.",
            "Incluye impuestos, seguro o cargos si afectan el presupuesto mensual."
          ]
        ],
        [
          "Compara costo total",
          [
            "APR y cargos pueden cambiar cuál oferta es más barata.",
            "El interés total revela el costo a largo plazo."
          ]
        ],
        [
          "Compara flexibilidad",
          [
            "Pregunta por penalidades y reglas de pagos extra.",
            "Evalúa si el pago sigue siendo cómodo si cambia el ingreso."
          ]
        ]
      ],
      "faq": [
        [
          "¿El pago más bajo es mejor?",
          "No siempre. Puede significar plazo más largo y más interés total."
        ],
        [
          "¿Por qué comparar APR?",
          "APR puede incluir ciertos cargos y ayuda a comparar mejor."
        ],
        [
          "¿Debo preguntar antes de firmar?",
          "Sí. Confirma cargos, reglas de pago y costo total."
        ]
      ],
      "related": [
        "/apr-vs-interest-rate",
        "/monthly-payment-calculator",
        "/how-to-estimate-total-loan-cost",
        "/loan-term-vs-monthly-payment"
      ]
    }
  },
  "/how-to-estimate-total-loan-cost": {
    "en": {
      "title": "How to Estimate Total Loan Cost | Check My Payments",
      "description": "Learn how to estimate total loan cost by combining principal, interest, fees, insurance, PMI and other monthly costs.",
      "heading": "How to Estimate Total Loan Cost",
      "intro": "The monthly payment is important, but total loan cost shows the bigger picture. It helps you understand how much interest and optional costs may be paid over time.",
      "sections": [
        [
          "Start with principal",
          [
            "Principal is the loan amount that must be repaid.",
            "Down payment lowers the principal on many loans."
          ]
        ],
        [
          "Add interest",
          [
            "Total interest depends on rate, term and payoff speed.",
            "Extra payments can reduce total interest when applied to principal."
          ]
        ],
        [
          "Remember other costs",
          [
            "Taxes, insurance, PMI, fees and add ons may affect monthly budget.",
            "Some of these costs do not reduce loan balance."
          ]
        ]
      ],
      "faq": [
        [
          "Is total paid the same as loan amount?",
          "No. Total paid can include principal, interest and other costs."
        ],
        [
          "Why does a longer term cost more?",
          "A longer term gives interest more time to accumulate."
        ],
        [
          "Can the calculator estimate total cost?",
          "Yes, it estimates total interest and total paid based on your inputs."
        ]
      ],
      "related": [
        "/monthly-payment-calculator",
        "/amortization-calculator",
        "/extra-payment-calculator",
        "/how-to-compare-loan-offers"
      ]
    },
    "es": {
      "title": "Cómo Estimar el Costo Total del Préstamo | Check My Payments",
      "description": "Aprende a estimar costo total combinando principal, interés, cargos, seguro, PMI y otros costos mensuales.",
      "heading": "Cómo Estimar el Costo Total del Préstamo",
      "intro": "El pago mensual importa, pero el costo total muestra la imagen completa. Ayuda a entender cuánto interés y costos opcionales pueden pagarse.",
      "sections": [
        [
          "Empieza con principal",
          [
            "Principal es el monto que debe pagarse.",
            "La inicial reduce el principal en muchos préstamos."
          ]
        ],
        [
          "Agrega interés",
          [
            "El interés total depende de tasa, plazo y velocidad de pago.",
            "Pagos extra pueden reducir interés si se aplican a principal."
          ]
        ],
        [
          "Recuerda otros costos",
          [
            "Impuestos, seguro, PMI, cargos y adicionales afectan el presupuesto mensual.",
            "Algunos costos no reducen el balance."
          ]
        ]
      ],
      "faq": [
        [
          "¿Total pagado es igual al monto?",
          "No. Puede incluir principal, interés y otros costos."
        ],
        [
          "¿Por qué un plazo largo cuesta más?",
          "Da más tiempo para acumular interés."
        ],
        [
          "¿La calculadora estima costo total?",
          "Sí, estima interés total y total pagado según tus datos."
        ]
      ],
      "related": [
        "/monthly-payment-calculator",
        "/amortization-calculator",
        "/extra-payment-calculator",
        "/how-to-compare-loan-offers"
      ]
    }
  }
};
Object.assign(seoPages, seoExpansionPages);

seoPages['/student-loan-calculator'] = {
  en: {
    title: 'Federal Student Loan Calculator | Check My Payments',
    description: 'Estimate federal student loan monthly payments, daily interest, total interest, and total repayment cost with Check My Payments. Educational estimates only.',
    heading: 'Federal Student Loan Calculator',
    intro: 'Estimate what a federal student loan could cost over time. This Version 1 calculator focuses on standard repayment estimates, daily interest, interest before repayment, total interest, and total repayment cost. It is not an official Department of Education calculator.',
    sections: [
      ['How federal student loan interest works', ['Federal student loans often use simple daily interest.', 'Daily interest is estimated as current principal balance times the annual interest rate divided by 365.25.', 'Unsubsidized and PLUS loans can accrue interest before repayment begins. Subsidized loans may not accrue interest during eligible in-school or grace periods.']],
      ['What this calculator does not include', ['This Version 1 calculator does not estimate SAVE, IBR, PAYE, ICR, PSLF, forgiveness, deferment, forbearance, or income-driven repayment payments.', 'Actual payments may vary by servicer, repayment plan, loan type, fees, capitalization rules, deferment, forbearance, and federal law changes.']],
      ['Official federal resources', ['For official repayment plan comparisons, use the Federal Student Aid Loan Simulator at StudentAid.gov.', 'Verify current interest rates and fees at the Federal Student Aid interest rates and fees page.']]
    ],
    faq: [
      ['Is this an official federal student loan calculator?', 'No. This is an educational estimate from Check My Payments. For official repayment options, use the Federal Student Aid Loan Simulator at StudentAid.gov.'],
      ['How is daily interest estimated?', 'Daily interest is estimated as current principal balance times the annual interest rate divided by 365.25.'],
      ['Does this include income-driven repayment?', 'No. Version 1 focuses on standard repayment estimates. Income-driven repayment can depend on income, family size, loan type and current federal rules.'],
      ['Why might my servicer quote be different?', 'Actual payments may vary because of servicer rules, repayment plan, interest capitalization, loan fees, deferment, forbearance, timing and federal law changes.']
    ],
    related: ['/monthly-payment-calculator','/amortization-calculator','/extra-payment-calculator','/personal-loan-calculator','/how-to-calculate-monthly-loan-payments']
  },
  es: {
    title: 'Calculadora Federal de Préstamos Estudiantiles | Check My Payments',
    description: 'Estima pagos mensuales, interés diario, interés total y costo total de préstamos estudiantiles federales con Check My Payments. Solo estimados educativos.',
    heading: 'Calculadora Federal de Préstamos Estudiantiles',
    intro: 'Estima cuánto podría costar un préstamo estudiantil federal con el tiempo. Esta Versión 1 se enfoca en pago estándar, interés diario, interés antes de comenzar el repago, interés total y costo total. No es una calculadora oficial del Departamento de Educación.',
    sections: [
      ['Cómo funciona el interés de préstamos estudiantiles federales', ['Los préstamos estudiantiles federales suelen usar interés diario simple.', 'El interés diario se estima como balance principal actual por tasa anual dividido entre 365.25.', 'Préstamos no subsidiados y PLUS pueden acumular interés antes de comenzar el repago. Los subsidiados pueden no acumular interés durante períodos elegibles de estudio o gracia.']],
      ['Qué no incluye esta calculadora', ['Esta Versión 1 no estima SAVE, IBR, PAYE, ICR, PSLF, perdón, aplazamiento, indulgencia ni pagos basados en ingresos.', 'Los pagos reales pueden variar por administrador, plan de repago, tipo de préstamo, cargos, reglas de capitalización y cambios de ley federal.']],
      ['Recursos oficiales federales', ['Para comparar opciones oficiales de repago, usa el Federal Student Aid Loan Simulator en StudentAid.gov.', 'Verifica tasas y cargos actuales en la página oficial de Federal Student Aid.']]
    ],
    faq: [
      ['¿Es esta una calculadora oficial federal?', 'No. Es un estimado educativo de Check My Payments. Para opciones oficiales, usa el Federal Student Aid Loan Simulator en StudentAid.gov.'],
      ['¿Cómo se estima el interés diario?', 'El interés diario se estima como balance principal actual por tasa anual dividido entre 365.25.'],
      ['¿Incluye pagos basados en ingresos?', 'No. La Versión 1 se enfoca en repago estándar. Los planes basados en ingresos dependen de ingresos, familia, tipo de préstamo y reglas federales actuales.'],
      ['¿Por qué puede ser diferente la cotización del administrador?', 'Los pagos reales pueden variar por reglas del administrador, plan de repago, capitalización de interés, cargos, aplazamiento, indulgencia, fechas y cambios de ley federal.']
    ],
    related: ['/monthly-payment-calculator','/amortization-calculator','/extra-payment-calculator','/personal-loan-calculator','/how-to-calculate-monthly-loan-payments']
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



function studentLoanCalc(inputs) {
  const principal = Math.max(Number(inputs.loanAmount) || 0, 0);
  const annualRate = Math.max(Number(inputs.annualRate) || 0, 0) / 100;
  const termYears = inputs.repaymentYears === 'custom' ? Math.max(Number(inputs.customYears) || 1, 1) : Math.max(Number(inputs.repaymentYears) || 10, 1);
  const termMonths = Math.max(Math.round(termYears * 12), 1);
  const monthlyRate = annualRate / 12;
  const dailyInterest = principal * annualRate / 365.25;
  const monthsBefore = Math.max(Number(inputs.monthsBeforeRepayment) || 0, 0);
  const accruesBeforeRepayment = inputs.interestAccrual !== 'subsidized';
  const interestBeforeRepayment = accruesBeforeRepayment ? dailyInterest * monthsBefore * 30.4375 : 0;
  const estimatedFee = principal * (Math.max(Number(inputs.loanFeePercent) || 0, 0) / 100);
  const repaymentPrincipal = principal + interestBeforeRepayment;
  const basePayment = monthlyRate > 0 ? repaymentPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1) : repaymentPrincipal / termMonths;
  const extra = Math.max(Number(inputs.extraPayment) || 0, 0);
  const schedule = [];
  let balance = repaymentPrincipal;
  let totalInterest = 0;
  let payoffMonth = 0;
  const maxMonths = termMonths + 1200;
  while (balance > 0.005 && payoffMonth < maxMonths) {
    payoffMonth += 1;
    const interest = monthlyRate > 0 ? balance * monthlyRate : 0;
    let payment = Math.min(basePayment + extra, balance + interest);
    let principalPaid = Math.max(payment - interest, 0);
    balance = Math.max(balance - principalPaid, 0);
    totalInterest += interest;
    schedule.push({ month: payoffMonth, startBalance: balance + principalPaid, payment, principalPaid, interest, endingBalance: balance });
  }
  const noExtraInterest = (() => {
    let b = repaymentPrincipal, interestTotal = 0, m = 0;
    while (b > 0.005 && m < maxMonths) {
      m += 1;
      const interest = monthlyRate > 0 ? b * monthlyRate : 0;
      const pmt = Math.min(basePayment, b + interest);
      b = Math.max(b - Math.max(pmt - interest, 0), 0);
      interestTotal += interest;
    }
    return interestTotal;
  })();
  return {
    principal, annualRate: annualRate * 100, termYears, termMonths, dailyInterest, interestBeforeRepayment, estimatedFee,
    repaymentPrincipal, basePayment, requiredMonthlyPayment: basePayment, monthlyTotal: basePayment + extra, extraPayment: extra,
    totalInterest, totalRepaid: repaymentPrincipal + totalInterest + estimatedFee, numberOfPayments: payoffMonth,
    interestSaved: Math.max(noExtraInterest - totalInterest, 0), payoffTime: payoffMonth, schedule
  };
}

function studentLoanPage() {
  const data = seoPages['/student-loan-calculator']?.[state.lang] || seoPages['/student-loan-calculator'].en;
  const s = state.studentLoan;
  const result = studentLoanCalc(s);
  const source = FEDERAL_STUDENT_LOAN_CONFIG.sourceUrl;
  const sim = FEDERAL_STUDENT_LOAN_CONFIG.loanSimulatorUrl;
  const L = state.lang === 'es' ? studentLoanTextEs() : studentLoanTextEn();
  return `<main class="student-loan-page">
    <section class="card page seo-page student-hero">
      <nav class="breadcrumbs"><a href="/" data-nav="/">${state.lang === 'es' ? 'Inicio' : 'Home'}</a><span>›</span><span>${data.heading}</span></nav>
      <div class="kicker">${icon('spark')} ${L.kicker}</div>
      <h1>${data.heading}</h1>
      <p class="page-intro">${data.intro}</p>
      <div class="student-disclaimer"><strong>${L.disclaimerTitle}</strong><span>${L.disclaimer}</span></div>
    </section>
    <section class="student-grid">
      <section class="card student-inputs">
        <div class="student-form-heading"><h2>${L.estimateTitle}</h2><p class="copy">${L.estimateIntro}</p></div>
        <div class="student-input-group"><h3>${L.groupLoanDetails}</h3>
          ${studentField('loanAmount', L.loanAmount, '$', '', 1000, 250000, 500)}
          ${studentSelect('loanType', L.loanType, studentLoanTypeOptions())}
          ${studentField('annualRate', L.annualRate, '', '%', 0, 15, .01, L.rateHelp)}
          ${studentField('loanFeePercent', L.loanFee, '', '%', 0, 6, .001, L.feeHelp)}
        </div>
        <div class="student-input-group"><h3>${L.groupRepayment}</h3>
          ${studentSelect('repaymentYears', L.term, repaymentTermOptions())}
          ${s.repaymentYears === 'custom' ? studentField('customYears', L.customYears, '', state.lang === 'es' ? 'años' : 'years', 1, 30, 1) : ''}
          ${studentSelect('gracePeriod', L.gracePeriod, [['none', L.noGrace], ['six', L.sixGrace]])}
          ${studentSelect('interestAccrual', L.accrual, [['subsidized', L.subsidized], ['unsubsidized', L.unsubsidized]])}
          ${studentField('monthsBeforeRepayment', L.monthsBefore, '', state.lang === 'es' ? 'meses' : 'months', 0, 72, 1)}
        </div>
        <div class="student-input-group"><h3>${L.groupPayoff}</h3>
          ${studentField('extraPayment', L.extraPayment, '$', '', 0, 5000, 25)}
        </div>
        <div class="rate-note"><strong>${L.ratesLastChecked}</strong><span>${FEDERAL_STUDENT_LOAN_CONFIG.lastChecked}</span><a href="${source}" target="_blank" rel="noopener">${L.verifyRates}</a></div>
      </section>
      <aside class="student-results">
        <div class="card payment student-payment"><small>${L.monthlyPayment}</small><div class="amount">${money(result.monthlyTotal)}</div><p>${L.requiredPayment}: <strong>${money(result.requiredMonthlyPayment)}</strong>. ${L.extraPayment}: <strong>${money(result.extraPayment)}</strong>.</p></div>
        <div class="student-metrics priority">
          ${metric('piggy', L.totalRepaid, money(result.totalRepaid))}
          ${metric('chart', L.totalInterest, money(result.totalInterest))}
          ${metric('clock', L.dailyInterest, money2(result.dailyInterest))}
          ${metric('shield', L.numberPayments, String(result.numberOfPayments))}
        </div>
        <div class="student-metrics secondary">
          ${metric('chart', L.beforeRepaymentInterest, money(result.interestBeforeRepayment))}
          ${metric('home', L.interestSaved, money(result.interestSaved))}
        </div>
        <div class="student-actions"><button class="primary-btn" id="studentPdfBtn">${L.pdfReport}</button></div>
      </aside>
    </section>
    <section class="card education student-education">
      <h2>${L.howInterestTitle}</h2><p>${L.howInterestText}</p>
      <div class="formula-box"><strong>${L.dailyFormula}</strong><span>${L.dailyFormulaText}</span></div>
      <h2>${L.standardTitle}</h2><p>${L.standardText}</p>
      <h2>${L.notIncludedTitle}</h2><p>${L.notIncludedText}</p>
      <h2>${L.officialTitle}</h2><p>${L.officialText} <a href="${sim}" target="_blank" rel="noopener">Federal Student Aid Loan Simulator</a>.</p>
      ${visibleFaq(data.faq)}
      ${relatedLinks(data.related)}
    </section>
  </main>`;
}

function studentLoanTextEn() {
  return {
    kicker: 'Federal student loan estimate', estimateTitle: 'Estimate Your Federal Student Loan Payments', estimateIntro: 'Enter a loan amount, interest rate, repayment term and grace period assumption to estimate standard repayment costs.',
    loanAmount: 'Loan amount', loanType: 'Loan type', annualRate: 'Annual interest rate', rateHelp: 'Use a preset rate or enter your own.', term: 'Repayment term', customYears: 'Custom term', gracePeriod: 'Grace period option', noGrace: 'No grace period', sixGrace: '6 month grace period', accrual: 'Interest during school or grace period', subsidized: 'Subsidized, no interest accrues during eligible periods', unsubsidized: 'Unsubsidized or PLUS, interest accrues before repayment', monthsBefore: 'Months before repayment begins', extraPayment: 'Extra monthly payment', loanFee: 'Optional loan fee', feeHelp: 'Educational estimate only; fees may be deducted before disbursement.', ratesLastChecked: 'Rates last checked', verifyRates: 'Verify at StudentAid.gov', monthlyPayment: 'Estimated monthly payment', requiredPayment: 'Required payment', dailyInterest: 'Daily interest accrual', beforeRepaymentInterest: 'Interest before repayment', totalInterest: 'Total repayment interest', totalRepaid: 'Total amount repaid', numberPayments: 'Number of payments', interestSaved: 'Interest saved from extra payments', disclaimerTitle: 'Educational estimate only.', disclaimer: 'This is not an official Department of Education tool, not financial advice, and not a loan quote. Federal loan rules, repayment plans, rates, fees, capitalization and forgiveness programs may change.', howInterestTitle: 'How Federal Student Loan Interest Works', howInterestText: 'Many federal student loans use simple daily interest. Interest can accrue each day based on the current principal balance and annual interest rate.', dailyFormula: 'Daily interest formula', dailyFormulaText: 'Current principal balance × annual interest rate ÷ 365.25', standardTitle: 'Standard Repayment Estimate', standardText: 'This calculator uses standard fixed-payment amortization over the selected term. It does not calculate income-driven payments.', notIncludedTitle: 'What This Calculator Does Not Include', notIncludedText: 'Version 1 does not calculate SAVE, IBR, PAYE, ICR, forgiveness, PSLF, deferment, forbearance or official servicer-specific rules.', officialTitle: 'Official Federal Student Loan Resources', officialText: 'For official repayment plan comparisons, use the', groupLoanDetails: 'Loan details', groupRepayment: 'Repayment setup', groupPayoff: 'Payoff strategy', pdfReport: 'Download PDF Report'
  };
}
function studentLoanTextEs() {
  return {
    kicker: 'Estimado de préstamo estudiantil federal', estimateTitle: 'Estima tus pagos de préstamos estudiantiles federales', estimateIntro: 'Ingresa monto, tasa, plazo y período de gracia para estimar costos bajo repago estándar.',
    loanAmount: 'Monto del préstamo', loanType: 'Tipo de préstamo', annualRate: 'Tasa de interés anual', rateHelp: 'Usa una tasa preset o escribe la tuya.', term: 'Plazo de repago', customYears: 'Plazo personalizado', gracePeriod: 'Opción de período de gracia', noGrace: 'Sin período de gracia', sixGrace: 'Período de gracia de 6 meses', accrual: 'Interés durante estudio o gracia', subsidized: 'Subsidiado, no acumula interés en períodos elegibles', unsubsidized: 'No subsidiado o PLUS, acumula interés antes del repago', monthsBefore: 'Meses antes de comenzar repago', extraPayment: 'Pago extra mensual', loanFee: 'Cargo opcional del préstamo', feeHelp: 'Estimado educativo; cargos pueden descontarse antes del desembolso.', ratesLastChecked: 'Tasas revisadas por última vez', verifyRates: 'Verificar en StudentAid.gov', monthlyPayment: 'Pago mensual estimado', requiredPayment: 'Pago requerido', dailyInterest: 'Interés diario', beforeRepaymentInterest: 'Interés antes del repago', totalInterest: 'Interés total de repago', totalRepaid: 'Monto total pagado', numberPayments: 'Número de pagos', interestSaved: 'Interés ahorrado por pagos extra', disclaimerTitle: 'Estimado educativo solamente.', disclaimer: 'No es una herramienta oficial del Departamento de Educación, no es asesoría financiera y no es una cotización. Las reglas, planes, tasas, cargos, capitalización y programas federales pueden cambiar.', howInterestTitle: 'Cómo funciona el interés federal estudiantil', howInterestText: 'Muchos préstamos estudiantiles federales usan interés diario simple. El interés puede acumularse cada día según el balance principal y la tasa anual.', dailyFormula: 'Fórmula de interés diario', dailyFormulaText: 'Balance principal actual × tasa anual ÷ 365.25', standardTitle: 'Estimado de repago estándar', standardText: 'Esta calculadora usa amortización de pago fijo estándar durante el plazo seleccionado. No calcula pagos basados en ingresos.', notIncludedTitle: 'Qué no incluye esta calculadora', notIncludedText: 'La Versión 1 no calcula SAVE, IBR, PAYE, ICR, perdón, PSLF, aplazamiento, indulgencia ni reglas específicas del administrador.', officialTitle: 'Recursos oficiales federales', officialText: 'Para comparaciones oficiales de planes de repago, usa el', groupLoanDetails: 'Detalles del préstamo', groupRepayment: 'Configuración de repago', groupPayoff: 'Estrategia de pago', pdfReport: 'Descargar reporte PDF'
  };
}
function studentLoanTypeOptions() {
  const labels = FEDERAL_STUDENT_LOAN_CONFIG.rates;
  return Object.keys(labels).map(key => [key, labels[key].label]);
}
function repaymentTermOptions() {
  const y = state.lang === 'es' ? 'años' : 'years';
  return [['10', `10 ${y}`], ['15', `15 ${y}`], ['20', `20 ${y}`], ['25', `25 ${y}`], ['custom', state.lang === 'es' ? 'Personalizado' : 'Custom number of years']];
}
function studentField(key, label, prefix = '', suffix = '', min = 0, max = 100000, step = 1, help = '') {
  const value = state.studentLoan[key];
  return `<div class="field student-field"><label>${label}${help ? `<span class="help">${help}</span>` : ''}</label><div class="input-wrap">${prefix ? `<span>${prefix}</span>` : ''}<input type="number" inputmode="decimal" autocomplete="off" data-student-input="${key}" value="${value}" min="${min}" max="${max}" step="${step}">${suffix ? `<span>${suffix}</span>` : ''}</div></div>`;
}
function studentSelect(key, label, options) {
  const value = state.studentLoan[key];
  return `<label class="student-select"><span>${label}</span><select data-student-select="${key}">${options.map(([v,l]) => `<option value="${v}" ${String(value) === String(v) ? 'selected' : ''}>${l}</option>`).join('')}</select></label>`;
}
function setStudentValue(key, value, shouldRender = true) {
  if (['loanType','repaymentYears','gracePeriod','interestAccrual'].includes(key)) {
    state.studentLoan[key] = value;
    if (key === 'loanType') {
      const preset = FEDERAL_STUDENT_LOAN_CONFIG.rates[value];
      if (preset) {
        state.studentLoan.annualRate = preset.rate;
        state.studentLoan.loanFeePercent = 0;
        state.studentLoan.interestAccrual = preset.accrual === 'subsidized' ? 'subsidized' : 'unsubsidized';
        if (value === 'parent-plus') { state.studentLoan.gracePeriod = 'none'; state.studentLoan.monthsBeforeRepayment = 0; }
      }
    }
    if (key === 'gracePeriod') state.studentLoan.monthsBeforeRepayment = value === 'six' ? 6 : 0;
  } else {
    const n = Number(value);
    state.studentLoan[key] = Number.isFinite(n) ? Math.max(n, 0) : 0;
  }
  if (shouldRender) render();
}

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
    ['/monthly-payment-calculator', state.lang === 'es' ? 'Pago Mensual' : 'Monthly Payment'],
    ['/mortgage-calculator', state.lang === 'es' ? 'Hipoteca' : 'Mortgage'],
    ['/car-loan-calculator', state.lang === 'es' ? 'Auto' : 'Car Loan'],
    ['/amortization-calculator', state.lang === 'es' ? 'Amortización' : 'Amortization'],
    ['/extra-payment-calculator', state.lang === 'es' ? 'Pagos Extra' : 'Extra Payments'],
    ['/affordability-calculator', state.lang === 'es' ? 'Capacidad de Pago' : 'Affordability'],
    ['/pmi-calculator', 'PMI'],
    ['/personal-loan-calculator', state.lang === 'es' ? 'Préstamo Personal' : 'Personal Loan'],
    ['/student-loan-calculator', state.lang === 'es' ? 'Préstamo Estudiantil Federal' : 'Federal Student Loan'],
    ['/apr-vs-interest-rate', state.lang === 'es' ? 'APR vs Tasa' : 'APR vs Rate'],
    ['/how-to-calculate-monthly-loan-payments', state.lang === 'es' ? 'Cómo calcular pagos' : 'How to Calculate Payments'],
    ['/how-extra-payments-reduce-interest', state.lang === 'es' ? 'Pagos extra e interés' : 'Extra Payments and Interest'],
    ['/how-amortization-works', state.lang === 'es' ? 'Cómo funciona amortización' : 'How Amortization Works'],
    ['/how-interest-rates-affect-payments', state.lang === 'es' ? 'Tasas y pagos' : 'Interest Rates and Payments'],
    ['/30-year-vs-15-year-mortgage', state.lang === 'es' ? '30 vs 15 años' : '30 vs 15 Year Mortgage'],
    ['/what-is-pmi', state.lang === 'es' ? 'Qué es PMI' : 'What Is PMI'],
    ['/how-to-compare-loan-offers', state.lang === 'es' ? 'Comparar ofertas' : 'Compare Loan Offers']
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
        <div class="mode-toggle calculator-choice-grid">
          <button class="mode-btn ${state.loanType === 'home' ? 'active' : ''}" data-mode="home"><strong>${icon('home')} ${L.homeLoan}</strong><span>${L.homeSub}</span></button>
          <button class="mode-btn ${state.loanType === 'car' ? 'active' : ''}" data-mode="car"><strong>${icon('car')} ${L.carLoan}</strong><span>${L.carSub}</span></button>
          <a class="mode-btn student-mode-link" href="/student-loan-calculator" data-nav="/student-loan-calculator"><strong>${icon('calc')} ${state.lang === 'es' ? 'Préstamo Estudiantil' : 'Student Loan'}</strong><span>${state.lang === 'es' ? 'Federal, interés diario y costo de repago' : 'Federal loans, daily interest and repayment cost'}</span></a>
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
    ${calculatorDirectory()}
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
function education(L) { const faqs = homeFaq(); return `<section class="card education"><h2>${L.eduTitle}</h2><ul>${L.edu.map(x=>`<li>${x}</li>`).join('')}</ul><h2>${L.factorsTitle}</h2><ul>${L.factors.map(x=>`<li>${x}</li>`).join('')}</ul><h2>${L.formulaTitle}</h2><p>${L.formulaText}</p><p><strong>${L.disclaimer}</strong></p>${visibleFaq(faqs)}</section>`; }
function homeFaq() { return state.lang === 'es' ? [["¿Cómo se calcula el pago mensual?","El pago de principal e interés usa la fórmula estándar de amortización fija. Costos como impuestos, seguro, PMI y HOA se agregan como estimados separados."],["¿Los resultados son una cotización?","No. Los resultados son estimados educativos y no sustituyen una cotización de un prestamista."],["¿Puedo compartir mi cálculo?","Sí. Puedes copiar un enlace del cálculo, descargar CSV o generar un reporte PDF."]] : [["How is the monthly payment calculated?","The principal and interest payment uses the standard fixed-rate amortization formula. Costs such as taxes, insurance, PMI and HOA are added as separate estimates."],["Are the results a lender quote?","No. Results are educational estimates and do not replace a lender quote."],["Can I share my calculation?","Yes. You can copy a calculation link, download CSV or generate a PDF report."]]; }

function calculatorDirectory() {
  const title = state.lang === 'es' ? 'Explora más calculadoras y guías' : 'Explore more calculators and guides';
  const intro = state.lang === 'es'
    ? 'Encuentra páginas específicas para diferentes preguntas: hipoteca, auto, amortización, pagos extra, PMI, capacidad de pago, APR y guías educativas.'
    : 'Find focused pages for different questions: mortgage, car loans, amortization, extra payments, PMI, affordability, APR and loan education guides.';
  return `<section class="card education calculator-directory"><h2>${title}</h2><p>${intro}</p><div class="directory-grid">${guideLinks()}</div></section>`;
}
function relatedLinks(paths) {
  if (!paths || !paths.length) return '';
  const title = state.lang === 'es' ? 'Calculadoras relacionadas' : 'Related calculators and guides';
  return `<section class="internal-links"><h2>${title}</h2><div class="directory-grid">${paths.map(path => `<a href="${path}" data-nav="${path}">${pageLabel(path)}</a>`).join('')}</div></section>`;
}
function pageLabel(path) {
  const labels = {
    '/': state.lang === 'es' ? 'Calculadora Simple de Préstamos' : 'Simple Loan Calculator',
    '/monthly-payment-calculator': state.lang === 'es' ? 'Calculadora de Pago Mensual' : 'Monthly Payment Calculator',
    '/mortgage-calculator': state.lang === 'es' ? 'Calculadora de Hipoteca' : 'Mortgage Calculator',
    '/car-loan-calculator': state.lang === 'es' ? 'Calculadora de Auto' : 'Car Loan Calculator',
    '/amortization-calculator': state.lang === 'es' ? 'Calculadora de Amortización' : 'Amortization Calculator',
    '/extra-payment-calculator': state.lang === 'es' ? 'Calculadora de Pagos Extra' : 'Extra Payment Calculator',
    '/affordability-calculator': state.lang === 'es' ? 'Calculadora de Capacidad de Pago' : 'Affordability Calculator',
    '/pmi-calculator': state.lang === 'es' ? 'Calculadora de PMI' : 'PMI Calculator',
    '/personal-loan-calculator': state.lang === 'es' ? 'Calculadora de Préstamo Personal' : 'Personal Loan Calculator',
    '/student-loan-calculator': state.lang === 'es' ? 'Calculadora Federal de Préstamos Estudiantiles' : 'Federal Student Loan Calculator',
    '/apr-vs-interest-rate': state.lang === 'es' ? 'APR vs Tasa de Interés' : 'APR vs Interest Rate',
    '/how-to-calculate-monthly-loan-payments': state.lang === 'es' ? 'Cómo calcular pagos mensuales' : 'How to Calculate Monthly Payments',
    '/how-extra-payments-reduce-interest': state.lang === 'es' ? 'Cómo pagos extra reducen interés' : 'How Extra Payments Reduce Interest',
    '/how-amortization-works': state.lang === 'es' ? 'Cómo funciona la amortización' : 'How Amortization Works',
    '/how-interest-rates-affect-payments': state.lang === 'es' ? 'Cómo las tasas afectan pagos' : 'How Interest Rates Affect Payments',
    '/30-year-vs-15-year-mortgage': state.lang === 'es' ? 'Hipoteca 30 vs 15 años' : '30-Year vs 15-Year Mortgage',
    '/how-much-car-loan-can-i-afford': state.lang === 'es' ? 'Cuánto auto puedo pagar' : 'How Much Car Loan Can I Afford?',
    '/what-is-pmi': state.lang === 'es' ? 'Qué es PMI' : 'What Is PMI?',
    '/loan-term-vs-monthly-payment': state.lang === 'es' ? 'Plazo vs pago mensual' : 'Loan Term vs Monthly Payment',
    '/principal-vs-interest': state.lang === 'es' ? 'Principal vs interés' : 'Principal vs Interest',
    '/how-to-compare-loan-offers': state.lang === 'es' ? 'Cómo comparar ofertas' : 'How to Compare Loan Offers',
    '/how-to-estimate-total-loan-cost': state.lang === 'es' ? 'Cómo estimar costo total' : 'How to Estimate Total Loan Cost',
  };
  return labels[path] || path;
}
function visibleFaq(faq) {
  if (!faq || !faq.length) return '';
  const title = state.lang === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions';
  return `<section class="faq-section"><h2>${title}</h2>${faq.map(([q,a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>`;
}

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
    <nav class="breadcrumbs"><a href="/" data-nav="/">${state.lang === 'es' ? 'Inicio' : 'Home'}</a><span>›</span><span>${data.heading}</span></nav>
    <div class="kicker">${icon('spark')} ${state.lang === 'es' ? 'Guía de Calculadora' : 'Calculator Guide'}</div>
    <h1>${data.heading}</h1>
    <p class="page-intro">${data.intro}</p>
    <a class="inline-cta" href="/" data-nav="/">${state.lang === 'es' ? 'Abrir calculadora' : 'Open calculator'}</a>
    ${data.sections.map(([title, items]) => `<section><h2>${title}</h2><ul>${items.map(item => `<li>${item}</li>`).join('')}</ul></section>`).join('')}
    <section class="trust-box"><h2>${state.lang === 'es' ? 'Transparencia de cálculo' : 'Calculation transparency'}</h2><p>${currentText().formulaText}</p><p>${currentText().disclaimer}</p></section>
    ${visibleFaq(data.faq)}
    ${relatedLinks(data.related)}
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


function studentReportHtml(L, result) {
  const s = state.studentLoan;
  const loanLabel = (FEDERAL_STUDENT_LOAN_CONFIG.rates[s.loanType]?.label || s.loanType);
  const generated = state.lang === 'es' ? 'Generado por Check My Payments' : 'Generated by Check My Payments';
  const title = state.lang === 'es' ? 'Reporte de Préstamo Estudiantil Federal' : 'Federal Student Loan Estimate Report';
  const subtitle = state.lang === 'es'
    ? 'Estimado educativo de pago mensual, interés diario y costo total de repago.'
    : 'Educational estimate of monthly payment, daily interest, and total repayment cost.';
  const promo = state.lang === 'es' ? `Crea tu propio reporte gratis en ${SITE_URL}` : `Create your own free student loan report at ${SITE_URL}`;
  const rows = result.schedule.slice(0, 360).map(row => `<tr><td>${row.month}</td><td>${money2(row.startBalance)}</td><td>${money2(row.payment)}</td><td>${money2(row.principalPaid)}</td><td>${money2(row.interest)}</td><td>${money2(row.endingBalance)}</td></tr>`).join('');
  const assumptionsTitle = state.lang === 'es' ? 'Supuestos usados' : 'Assumptions used';
  const costTitle = state.lang === 'es' ? 'Resumen de costo estimado' : 'Estimated cost summary';
  const scheduleTitle = state.lang === 'es' ? 'Calendario mensual estimado' : 'Estimated monthly schedule';
  const nextTitle = state.lang === 'es' ? 'Notas importantes' : 'Important notes';
  const disclaimer = state.lang === 'es'
    ? 'Este reporte es un estimado educativo. No es una herramienta oficial del Departamento de Educación, no es asesoría financiera y no determina tu pago real. Verifica siempre las tasas, cargos y opciones oficiales en StudentAid.gov.'
    : 'This report is an educational estimate. It is not an official Department of Education tool, not financial advice, and does not determine your actual payment. Always verify official rates, fees, and repayment options at StudentAid.gov.';
  return `<section class="report-cover"><div><small>${generated}</small><h1>${title}</h1><p>${subtitle}</p></div><div class="report-cover-box"><strong>${money(result.monthlyTotal)}</strong><span>${L.monthlyPayment}</span></div></section>
    <p class="report-disclaimer">${disclaimer}</p>
    <h2>${costTitle}</h2>
    <div class="report-grid">
      ${bigStat(L.monthlyPayment, money(result.monthlyTotal))}
      ${bigStat(L.dailyInterest, money2(result.dailyInterest))}
      ${bigStat(L.totalInterest, money(result.totalInterest))}
      ${bigStat(L.totalRepaid, money(result.totalRepaid))}
      ${bigStat(L.beforeRepaymentInterest, money(result.interestBeforeRepayment))}
      ${bigStat(L.interestSaved, money(result.interestSaved))}
    </div>
    <h2>${assumptionsTitle}</h2>
    <table class="report-mini-table"><tbody>
      <tr><th>${L.loanAmount}</th><td>${money(Number(s.loanAmount) || 0)}</td></tr>
      <tr><th>${L.loanType}</th><td>${loanLabel}</td></tr>
      <tr><th>${L.annualRate}</th><td>${num(Number(s.annualRate) || 0)}%</td></tr>
      <tr><th>${L.term}</th><td>${result.termYears} ${state.lang === 'es' ? 'años' : 'years'}</td></tr>
      <tr><th>${L.monthsBefore}</th><td>${Number(s.monthsBeforeRepayment) || 0}</td></tr>
      <tr><th>${L.extraPayment}</th><td>${money(Number(s.extraPayment) || 0)}</td></tr>
      <tr><th>${L.ratesLastChecked}</th><td>${FEDERAL_STUDENT_LOAN_CONFIG.lastChecked}</td></tr>
    </tbody></table>
    <h2>${nextTitle}</h2>
    <ol><li>${state.lang === 'es' ? 'Confirma la tasa actual y los cargos en StudentAid.gov.' : 'Confirm the current rate and fees at StudentAid.gov.'}</li><li>${state.lang === 'es' ? 'Usa el Federal Student Aid Loan Simulator para comparar planes oficiales.' : 'Use the Federal Student Aid Loan Simulator to compare official repayment plans.'}</li><li>${state.lang === 'es' ? 'Recuerda que planes basados en ingresos pueden calcular pagos de forma diferente.' : 'Remember that income-driven plans can calculate payments differently.'}</li></ol>
    <h2>${scheduleTitle}</h2>
    <table><thead><tr><th>${state.lang === 'es' ? 'Mes' : 'Month'}</th><th>${state.lang === 'es' ? 'Balance inicial' : 'Starting balance'}</th><th>${state.lang === 'es' ? 'Pago' : 'Payment'}</th><th>${state.lang === 'es' ? 'Principal' : 'Principal'}</th><th>${state.lang === 'es' ? 'Interés' : 'Interest'}</th><th>${state.lang === 'es' ? 'Balance final' : 'Ending balance'}</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="report-note"><strong>${promo}</strong><br>${SITE_URL} | ${CONTACT_EMAIL}</p>`;
}

function printStudentPdf() {
  const L = state.lang === 'es' ? studentLoanTextEs() : studentLoanTextEn();
  const result = studentLoanCalc(state.studentLoan);
  const reportHtml = studentReportHtml(L, result);
  const win = window.open('', '_blank');
  if (!win) {
    alert(state.lang === 'es' ? 'Permite ventanas emergentes para generar el reporte PDF.' : 'Please allow pop-ups to generate the PDF report.');
    return;
  }
  win.document.write(`<!doctype html><html lang="${state.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Check My Payments Student Loan Report</title><style>${reportStyles()}</style></head><body><div class="report-shell"><div class="print-actions"><button class="secondary" onclick="window.close()">Close</button><button class="primary" onclick="window.print()">Save / Print PDF</button></div><div class="report-header"><div><div class="report-logo">Check My Payments</div><div class="report-sub">${state.lang === 'es' ? 'Reporte educativo de préstamo estudiantil federal' : 'Educational federal student loan report'}</div></div><div class="report-url">${SITE_URL}<br>${CONTACT_EMAIL}</div></div>${reportHtml}</div><script>setTimeout(function(){ window.focus(); window.print(); }, 350);<\/script></body></html>`);
  win.document.close();
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

  document.querySelectorAll('[data-student-input]').forEach(input => {
    input.addEventListener('input', () => setStudentValue(input.dataset.studentInput, input.value, false));
    input.addEventListener('change', () => setStudentValue(input.dataset.studentInput, input.value, true));
    input.addEventListener('blur', () => setStudentValue(input.dataset.studentInput, input.value, true));
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { input.blur(); setStudentValue(input.dataset.studentInput, input.value, true); } });
  });
  document.querySelectorAll('[data-student-select]').forEach(select => select.addEventListener('change', () => setStudentValue(select.dataset.studentSelect, select.value, true)));

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
  document.getElementById('studentPdfBtn')?.addEventListener('click', printStudentPdf);
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
  if (path === '/student-loan-calculator') body = studentLoanPage();
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
  if (page) { title = page.title; description = page.description; }
  if (path === '/about') { title = state.lang === 'es' ? 'Acerca de Check My Payments | Herramientas de Préstamos' : 'About Check My Payments | Simple Loan and Payment Tools'; description = state.lang === 'es' ? 'Conoce Check My Payments, una calculadora educativa para estimar pagos, amortización, PMI, capacidad de pago y costos de préstamos.' : 'Learn about Check My Payments, a simple educational calculator for estimating payments, amortization, PMI, affordability and loan costs.'; }
  if (path === '/privacy') { title = state.lang === 'es' ? 'Política de Privacidad | Check My Payments' : 'Privacy Policy | Check My Payments'; description = state.lang === 'es' ? 'Lee cómo Check My Payments trata datos de cálculo, analíticas y privacidad para esta herramienta educativa.' : 'Read how Check My Payments handles calculator inputs, analytics and privacy for this educational loan planning tool.'; }
  if (path === '/terms') { title = state.lang === 'es' ? 'Términos de Uso | Check My Payments' : 'Terms of Use | Check My Payments'; description = state.lang === 'es' ? 'Revisa los términos de uso de Check My Payments, incluyendo que los resultados son estimados educativos y no asesoría financiera.' : 'Review the terms for using Check My Payments, including that results are educational estimates and not financial advice.'; }
  if (path === '/contact') { title = state.lang === 'es' ? 'Contacto | Check My Payments' : 'Contact Check My Payments'; description = state.lang === 'es' ? 'Contacta a Check My Payments para preguntas, sugerencias o correcciones sobre la calculadora.' : 'Contact Check My Payments with questions, suggestions or corrections about the calculator.'; }
  document.title = title;
  setMeta('description', description);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:url', SITE_URL + path, true);
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:url', SITE_URL + path);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
  canonical.href = SITE_URL + path;
  updateSchema(path, title, description);
}
function updateSchema(path, title, description) {
  document.querySelectorAll('script[data-schema="checkmypayments"]').forEach(el => el.remove());
  const pageData = seoPages[path]?.[state.lang] || seoPages[path]?.en;
  const graph = [
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'Check My Payments', url: SITE_URL, inLanguage: state.lang, potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/?q={search_term_string}`, 'query-input': 'required name=search_term_string' } },
    { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Check My Payments', url: SITE_URL, email: CONTACT_EMAIL },
    { '@type': 'WebPage', '@id': `${SITE_URL}${path}#webpage`, url: `${SITE_URL}${path}`, name: title, description, isPartOf: { '@id': `${SITE_URL}/#website` }, inLanguage: state.lang },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: state.lang === 'es' ? 'Inicio' : 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: path === '/' ? (state.lang === 'es' ? 'Calculadora' : 'Calculator') : (pageData?.heading || title), item: `${SITE_URL}${path}` }
    ] }
  ];
  if (path === '/' || path.includes('calculator')) {
    graph.push({ '@type': 'SoftwareApplication', name: 'Check My Payments', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, url: `${SITE_URL}${path}` });
  }
  const faq = pageData?.faq || (path === '/' ? homeFaq() : null);
  if (faq && faq.length) {
    graph.push({ '@type': 'FAQPage', mainEntity: faq.map(([q,a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
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
