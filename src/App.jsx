import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
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

function currency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function number(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(Number.isFinite(value) ? value : 0);
}

function calculateLoan({ price, downPayment, rate, years, taxes, insurance, hoa, extraPayment, pmiAnnualRate = 0, includePmi = false }) {
  const purchasePrice = Math.max(Number(price) || 0, 0);
  const safeDownPayment = Math.min(Math.max(Number(downPayment) || 0, 0), purchasePrice);
  const principal = Math.max(purchasePrice - safeDownPayment, 0);
  const months = Math.max(Math.round((Number(years) || 0) * 12), 1);
  const monthlyRate = Math.max(Number(rate) || 0, 0) / 100 / 12;
  const originalLtv = purchasePrice > 0 ? principal / purchasePrice : 0;

  const basePayment = principal === 0
    ? 0
    : monthlyRate === 0
      ? principal / months
      : principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

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
  let payoffMonth = principal === 0 ? 0 : months;
  let pmiEndMonth = monthlyPmiEstimate > 0 ? null : 0;

  for (let m = 1; m <= months && balance > 0.01; m += 1) {
    const interest = balance * monthlyRate;
    const currentLtv = purchasePrice > 0 ? balance / purchasePrice : 0;
    const pmiThisMonth = monthlyPmiEstimate > 0 && currentLtv > 0.8 ? monthlyPmiEstimate : 0;

    if (monthlyPmiEstimate > 0 && pmiThisMonth === 0 && pmiEndMonth === null) {
      pmiEndMonth = m;
    }

    const scheduledPrincipal = Math.max(basePayment - interest, 0);
    const principalPaid = Math.min(scheduledPrincipal + optionalExtra, balance);

    balance = Math.max(balance - principalPaid, 0);
    totalInterest += interest;
    totalPrincipal += principalPaid;
    totalPmi += pmiThisMonth;

    if (m % 12 === 0 || balance === 0) {
      schedule.push({
        year: Math.ceil(m / 12),
        balance: Math.round(balance),
        interestPaid: Math.round(totalInterest),
        principalPaid: Math.round(totalPrincipal),
        pmiPaid: Math.round(totalPmi),
      });
    }

    if (balance === 0) {
      payoffMonth = m;
      break;
    }
  }

  if (pmiEndMonth === null) {
    pmiEndMonth = payoffMonth;
  }

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
  const totalFinancedCost = principal + totalInterest + totalPmi;

  return {
    purchasePrice,
    safeDownPayment,
    principal,
    basePayment,
    monthlyTaxes,
    monthlyInsurance,
    monthlyHoaOrAddOns,
    monthlyPmiEstimate,
    totalPmi,
    pmiEndMonth,
    requiredMonthlyPayment,
    monthlyTotal,
    totalInterest,
    totalFinancedCost,
    totalPaidIncludingDownPayment,
    payoffMonth,
    schedule,
    interestSaved: Math.max(noExtraInterest - totalInterest, 0),
  };
}

function Card({ children, className = "" }) {
  return <div className={`rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl ${className}`}>{children}</div>;
}

function Button({ children, onClick, className = "" }) {
  return (
    <button type="button" onClick={onClick} className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 font-semibold transition ${className}`}>
      {children}
    </button>
  );
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

  const pieData = [
    { name: "Principal and Interest", value: result.basePayment },
    { name: isCar ? "Registration and Fees" : "Taxes", value: result.monthlyTaxes },
    { name: "Insurance", value: result.monthlyInsurance },
    { name: isCar ? "Warranty and Add ons" : "HOA", value: hoa },
    { name: "PMI", value: result.monthlyPmiEstimate },
    { name: "Extra Payment", value: extraPayment },
  ].filter((item) => item.value > 0);

  function applyHomeDefaults() {
    setLoanType("home");
    setPrice(450000);
    setDownPayment(90000);
    setRate(6.75);
    setYears(30);
    setTaxes(5200);
    setInsurance(1800);
    setHoa(0);
    setExtraPayment(200);
    setPmiAnnualRate(0.75);
    setGrossIncome(90000);
    setMonthlyDebt(600);
  }

  function applyCarDefaults() {
    setLoanType("car");
    setPrice(38000);
    setDownPayment(5000);
    setRate(7.25);
    setYears(5);
    setTaxes(950);
    setInsurance(1800);
    setHoa(0);
    setExtraPayment(50);
    setPmiAnnualRate(0);
    setGrossIncome(65000);
    setMonthlyDebt(400);
  }

  function resetDefaults() {
    if (isCar) {
      applyCarDefaults();
    } else {
      applyHomeDefaults();
    }
  }

  function downloadCsv() {
    const rows = [
      ["Year", "Balance", "Principal Paid", "Interest Paid", "PMI Paid"],
      ...result.schedule.map((r) => [r.year, r.balance, r.principalPaid, r.interestPaid, r.pmiPaid || 0]),
    ];
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${loanType}-loan-amortization.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const inputs = [
    { label: isCar ? "Vehicle Price" : "Home Price", value: price, set: setPrice, min: isCar ? 5000 : 50000, max: isCar ? 250000 : 2000000, step: isCar ? 500 : 5000, prefix: "$" },
    { label: "Down Payment", value: downPayment, set: setDownPayment, min: 0, max: price, step: isCar ? 250 : 1000, prefix: "$", helper: `${number(downPct)}% down` },
    { label: "Interest Rate", value: rate, set: setRate, min: 0, max: 25, step: 0.05, suffix: "%" },
    { label: "Loan Term", value: years, set: setYears, min: 1, max: isCar ? 8 : 40, step: 1, suffix: " years" },
    { label: isCar ? "Annual Registration and Fees" : "Annual Property Taxes", value: taxes, set: setTaxes, min: 0, max: isCar ? 5000 : 50000, step: 50, prefix: "$" },
    { label: "Annual Insurance", value: insurance, set: setInsurance, min: 0, max: isCar ? 10000 : 20000, step: 100, prefix: "$" },
    { label: isCar ? "Monthly Warranty or Add ons" : "Monthly HOA", value: hoa, set: setHoa, min: 0, max: isCar ? 1000 : 3000, step: 25, prefix: "$" },
    { label: "Extra Monthly Payment", value: extraPayment, set: setExtraPayment, min: 0, max: 5000, step: 25, prefix: "$" },
    ...(!isCar ? [{ label: "PMI Annual Rate", value: pmiAnnualRate, set: setPmiAnnualRate, min: 0, max: 2.5, step: 0.05, suffix: "%", helper: includePmi ? "Estimated until 80% LTV" : "Not needed at 20% down" }] : []),
    { label: "Gross Annual Income", value: grossIncome, set: setGrossIncome, min: 0, max: 500000, step: 1000, prefix: "$" },
    { label: "Other Monthly Debt", value: monthlyDebt, set: setMonthlyDebt, min: 0, max: 20000, step: 50, prefix: "$" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-40 -left-24 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdSlot id="top-banner" label="Future Google AdSense banner" />

        <nav className="mb-10 mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-3 shadow-xl ring-1 ring-white/10 backdrop-blur">
              <Icon name="calculator" className="h-6 w-6 text-cyan-300" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">LoanFlow</p>
              <p className="text-xs text-slate-400">Home and car loan planning, made simple</p>
            </div>
          </div>
          <Button onClick={resetDefaults} className="bg-white/10 text-white hover:bg-white/20">
            <Icon name="refresh" className="mr-2 h-4 w-4" /> Reset
          </Button>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-8 max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-cyan-100 ring-1 ring-white/10 backdrop-blur">
                <Icon name="sparkles" className="h-4 w-4" /> Smart loan calculator with home and auto modes
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                Plan any major loan with clarity, speed, and confidence.
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Compare mortgage and car payments using the standard fixed rate amortization formula, with total interest, payoff date, extra payment savings, taxes, insurance, fees, and full amortization in one beautiful dashboard.
              </p>
            </div>

            <div className="mb-5 grid gap-3 rounded-[2rem] bg-white/10 p-2 ring-1 ring-white/10 backdrop-blur sm:grid-cols-2">
              <button type="button" onClick={applyHomeDefaults} className={`rounded-3xl px-5 py-4 text-left transition ${!isCar ? "bg-cyan-300 text-slate-950 shadow-xl" : "text-slate-300 hover:bg-white/10"}`}>
                <div className="flex items-center gap-3 font-black"><Icon name="home" /> Home Loan</div>
                <p className="mt-1 text-sm opacity-80">Mortgage, taxes, insurance, HOA</p>
              </button>
              <button type="button" onClick={applyCarDefaults} className={`rounded-3xl px-5 py-4 text-left transition ${isCar ? "bg-cyan-300 text-slate-950 shadow-xl" : "text-slate-300 hover:bg-white/10"}`}>
                <div className="flex items-center gap-3 font-black"><Icon name="car" /> Car Loan</div>
                <p className="mt-1 text-sm opacity-80">Auto financing, insurance, fees, add ons</p>
              </button>
            </div>

            <Card>
              <div className="p-5 sm:p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  {inputs.map((item) => (
                    <InputBlock key={item.label} item={item} />
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.aside initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-5">
            <AdSlot id="sidebar-square" label="Future Google AdSense sidebar ad" compact />
            <Card className="border-cyan-200/40 bg-slate-900 ring-1 ring-cyan-300/20">
              <div className="p-7">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-200">Estimated first monthly payment</p>
                <p className="text-5xl font-black tracking-tight text-white drop-shadow-lg">{currency(result.monthlyTotal)}</p>
                <p className="mt-3 text-sm text-slate-200">Required payment: <strong className="text-white">{currency(result.requiredMonthlyPayment)}</strong>. Extra payment: <strong className="text-white">{currency(extraPayment)}</strong>.</p>
                <p className="mt-2 text-xs text-slate-400">Includes principal, interest, {isCar ? "fees, insurance, add ons" : "taxes, insurance, HOA, possible PMI"}, and optional extra payment. PMI may drop off later if applicable.</p>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Metric iconName={isCar ? "car" : "home"} label="Loan Amount" value={currency(result.principal)} />
              <Metric iconName="piggy" label="Interest Saved" value={currency(result.interestSaved)} />
              <Metric iconName="chart" label="Total Interest" value={currency(result.totalInterest)} />
              <Metric iconName="calculator" label="Payoff" value={`${payoffYears}y ${payoffMonths}m`} />
              <Metric iconName="shield" label={isCar ? "Debt Ratio" : "Housing Ratio"} value={`${number(isCar ? totalDebtRatio : housingRatio)}%`} />
              <Metric iconName="clock" label="No Extra Payoff" value={`${payoffYearsNoExtra}y ${payoffMonthsNoExtra}m`} />
            </div>
          </motion.aside>
        </section>

        <section className="mt-8">
          <AdSlot id="in-content" label="Future Google AdSense in content ad" />
          <div className="mt-6 w-full">
            <div className="mb-5 grid w-full max-w-2xl grid-cols-4 rounded-2xl bg-white/10 p-1 text-slate-300">
              {[
                ["charts", "Charts"],
                ["breakdown", "Breakdown"],
                ["compare", "Compare"],
                ["schedule", "Schedule"],
              ].map(([key, label]) => (
                <button key={key} type="button" onClick={() => setActiveTab(key)} className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${activeTab === key ? "bg-white text-slate-950" : "hover:bg-white/10"}`}>
                  {label}
                </button>
              ))}
            </div>

            {activeTab === "charts" && (
              <div className="grid gap-5 lg:grid-cols-2">
                <Card>
                  <div className="p-6">
                    <h2 className="mb-5 text-xl font-bold">Balance over time</h2>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={result.schedule}>
                          <defs><linearGradient id="balance" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="currentColor" stopOpacity={0.45} /><stop offset="95%" stopColor="currentColor" stopOpacity={0} /></linearGradient></defs>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                          <XAxis dataKey="year" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" tickFormatter={(v) => `$${Math.round(v / 1000)}k`} />
                          <Tooltip formatter={(v) => currency(v)} contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16 }} />
                          <Area type="monotone" dataKey="balance" stroke="currentColor" fill="url(#balance)" className="text-cyan-300" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h2 className="mb-5 text-xl font-bold">Monthly payment breakdown</h2>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={4}>
                            {pieData.map((item) => <Cell key={item.name} />)}
                          </Pie>
                          <Tooltip formatter={(v) => currency(v)} contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16 }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid gap-2 text-sm text-slate-300">
                      {pieData.map((item) => <div key={item.name} className="flex justify-between rounded-xl bg-slate-950/40 px-3 py-2"><span>{item.name}</span><strong>{currency(item.value)}</strong></div>)}
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "breakdown" && (
              <Card>
                <div className="grid gap-4 p-6 md:grid-cols-3">
                  <BigStat label="Principal and Interest" value={currency(result.basePayment)} />
                  <BigStat label={isCar ? "Fees and Insurance" : "Taxes and Insurance"} value={currency(result.monthlyTaxes + result.monthlyInsurance)} />
                  <BigStat label="Estimated Total Paid" value={currency(result.totalPaidIncludingDownPayment)} />
                </div>
              </Card>
            )}

            {activeTab === "compare" && (
              <div>
                <Card>
                  <div className="grid gap-4 p-6 md:grid-cols-3">
                    <BigStat label="Current Scenario" value={currency(result.monthlyTotal)} />
                    <BigStat label="No Extra Payment" value={`${currency(noExtraResult.requiredMonthlyPayment)} monthly`} />
                    <BigStat label="Rate plus 0.50%" value={currency(higherRateResult.monthlyTotal)} />
                  </div>
                </Card>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Card><div className="p-6"><h3 className="text-xl font-bold text-white">Affordability check</h3><p className="mt-3 text-sm leading-6 text-slate-300">Housing ratio: <strong className="text-white">{number(housingRatio)}%</strong>. Total debt ratio: <strong className="text-white">{number(totalDebtRatio)}%</strong>. A common planning guideline is to keep housing near 28% of gross income and total debt near 36%, although lenders may use different limits.</p></div></Card>
                  <Card><div className="p-6"><h3 className="text-xl font-bold text-white">Extra payment impact</h3><p className="mt-3 text-sm leading-6 text-slate-300">With your extra payment, estimated interest saved is <strong className="text-white">{currency(result.interestSaved)}</strong>. Estimated payoff changes from <strong className="text-white">{payoffYearsNoExtra}y {payoffMonthsNoExtra}m</strong> to <strong className="text-white">{payoffYears}y {payoffMonths}m</strong>.</p></div></Card>
                </div>
              </div>
            )}

            {activeTab === "schedule" && (
              <Card>
                <div className="p-6">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-xl font-bold">Amortization schedule</h2>
                      <p className="text-sm text-slate-400">Yearly summary of your principal, interest, balance, and PMI if applicable.</p>
                    </div>
                    <Button onClick={downloadCsv} className="bg-cyan-300 text-slate-950 hover:bg-cyan-200">
                      <Icon name="download" className="mr-2 h-4 w-4" /> Download CSV
                    </Button>
                  </div>
                  <div className="overflow-x-auto rounded-2xl ring-1 ring-white/10">
                    <table className="w-full min-w-[720px] text-left text-sm">
                      <thead className="bg-slate-950/70 text-slate-300">
                        <tr><th className="p-4">Year</th><th className="p-4">Balance</th><th className="p-4">Principal Paid</th><th className="p-4">Interest Paid</th><th className="p-4">PMI Paid</th></tr>
                      </thead>
                      <tbody>
                        {result.schedule.map((row) => (
                          <tr key={row.year} className="border-t border-white/10 text-slate-200"><td className="p-4 font-bold">{row.year}</td><td className="p-4">{currency(row.balance)}</td><td className="p-4">{currency(row.principalPaid)}</td><td className="p-4">{currency(row.interestPaid)}</td><td className="p-4">{currency(row.pmiPaid || 0)}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <EducationBlock />
        </section>
      </main>
    </div>
  );
}

function InputBlock({ item }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-semibold text-slate-200">{item.label}</label>
        {item.helper && <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-xs text-cyan-200">{item.helper}</span>}
      </div>
      <div className="flex items-center gap-3 rounded-2xl bg-slate-950/70 px-4 py-3 ring-1 ring-white/10">
        {item.prefix && <span className="text-slate-400">{item.prefix}</span>}
        <input
          type="number"
          value={item.value}
          min={item.min}
          max={item.max}
          step={item.step}
          onChange={(e) => item.set(Number(e.target.value))}
          className="w-full border-0 bg-transparent p-0 text-lg font-bold text-white outline-none"
        />
        {item.suffix && <span className="text-slate-400">{item.suffix}</span>}
      </div>
      <input
        type="range"
        value={Math.min(Math.max(item.value, item.min), item.max)}
        min={item.min}
        max={item.max}
        step={item.step}
        onChange={(e) => item.set(Number(e.target.value))}
        className="w-full accent-cyan-300"
      />
    </div>
  );
}

function AdSlot({ id, label, compact = false }) {
  return (
    <div data-ad-slot={id} className={`flex items-center justify-center rounded-[2rem] border border-dashed border-white/15 bg-white/[0.04] text-center text-xs uppercase tracking-[0.2em] text-slate-500 ${compact ? "min-h-40" : "min-h-24"}`}>
      {label}
    </div>
  );
}

function Metric({ iconName, label, value }) {
  return (
    <Card className="rounded-3xl shadow-xl">
      <div className="p-5">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-cyan-200"><Icon name={iconName} className="h-5 w-5" /></div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="mt-1 text-xl font-black text-white">{value}</p>
      </div>
    </Card>
  );
}

function Icon({ name, className = "h-5 w-5" }) {
  const paths = {
    calculator: <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h2M14 10h2M8 14h2M14 14h2M8 18h2M14 18h2"/></>,
    refresh: <><path d="M21 12a9 9 0 0 1-15.5 6.2"/><path d="M3 12A9 9 0 0 1 18.5 5.8"/><path d="M18 2v4h-4"/><path d="M6 22v-4h4"/></>,
    sparkles: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/></>,
    home: <><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></>,
    piggy: <><path d="M5 11a7 7 0 0 1 7-5h4a5 5 0 0 1 5 5v3a5 5 0 0 1-5 5H8l-2 3v-4a6 6 0 0 1-3-5v-1"/><path d="M16 10h.01"/><path d="M7 7L5 4"/><path d="M9 18v3M17 18v3"/></>,
    chart: <><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-7"/></>,
    car: <><path d="M5 17h14"/><path d="M6 17l1.5-6h9L18 17"/><path d="M8 17v2"/><path d="M16 17v2"/><path d="M8 13h8"/><path d="M7 17a2 2 0 1 0 0 .01"/><path d="M17 17a2 2 0 1 0 0 .01"/></>,
    download: <><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></>,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function BigStat({ label, value }) {
  return (
    <div className="rounded-3xl bg-slate-950/50 p-6 ring-1 ring-white/10">
      <p className="text-sm font-semibold text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
    </div>
  );
}

function EducationBlock() {
  return (
    <div className="mt-8 rounded-[2rem] bg-white/[0.06] p-5 text-sm leading-6 text-slate-300 ring-1 ring-white/10">
      <strong className="text-white">How to use this calculator</strong>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>Enter the price of the home or vehicle.</li>
        <li>Set your down payment in dollars.</li>
        <li>Choose the loan term in years.</li>
        <li>Input your expected interest rate.</li>
        <li>Adjust taxes, insurance, fees, or HOA if applicable.</li>
        <li>Optionally add extra monthly payments to see savings.</li>
      </ul>

      <strong className="mt-5 block text-white">What affects your payment</strong>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li><b>Loan amount:</b> Price minus down payment. Higher amount means higher payment.</li>
        <li><b>Interest rate:</b> Small changes can significantly impact total interest paid.</li>
        <li><b>Loan term:</b> Longer term lowers monthly payment but increases total interest.</li>
        <li><b>Taxes, insurance, fees:</b> These are real monthly costs but do not accrue interest.</li>
        <li><b>PMI:</b> For mortgages with less than 20% down, this calculator can estimate private mortgage insurance until the loan balance reaches about 80% of the home value.</li>
        <li><b>Income and debts:</b> The affordability check estimates housing and total debt ratios so visitors can see whether the payment may be comfortable.</li>
      </ul>

      <strong className="mt-5 block text-white">How calculations work</strong>
      <p className="mt-2">This tool uses the standard fixed rate amortization formula to calculate principal and interest:</p>
      <p className="mt-2 font-mono text-xs text-cyan-300">M = P × [ r(1+r)^n / ((1+r)^n − 1) ]</p>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li><b>P:</b> Loan amount</li>
        <li><b>r:</b> Monthly interest rate</li>
        <li><b>n:</b> Total number of payments</li>
      </ul>

      <strong className="mt-5 block text-white">Understanding your results</strong>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li><b>Monthly payment:</b> What you pay each month including optional extras.</li>
        <li><b>Required payment:</b> Minimum needed to stay on schedule.</li>
        <li><b>Total interest:</b> Cost of borrowing over time.</li>
        <li><b>PMI estimate:</b> Added only when the mortgage down payment is below 20%.</li>
        <li><b>Affordability ratios:</b> Housing cost and total debt compared with gross monthly income.</li>
        <li><b>Payoff time:</b> When the loan will be fully paid off.</li>
      </ul>

      <strong className="mt-5 block text-white">Pro tips</strong>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>Adding even a small extra payment can save thousands in interest.</li>
        <li>Compare different rates to understand sensitivity.</li>
        <li>Test scenarios before committing to a purchase.</li>
      </ul>

      <p className="mt-5 text-xs text-slate-400">Estimates are for planning purposes only. Actual lender quotes may vary because of APR, credit score, closing costs, escrow rules, taxes, insurance, dealer fees, local regulations, loan type, and payment timing.</p>
    </div>
  );
}

export default App;
