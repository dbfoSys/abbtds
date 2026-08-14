import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';

const menu = [
    ['⌂', 'Dashboard', '/dashboard'],
    ['◇', 'Master Data', '#'],
    ['▧', 'Transaction', '#'],
    ['▣', 'Budget Management', '/budgets'],
    ['▤', 'Revenue & Collections', '#'],
    ['▧', 'Obligations', '#'],
    ['⇄', 'Disbursements', '#'],
    ['▣', 'Programs & Projects', '#'],
    ['▰', 'Document Management', '#'],
    ['▥', 'Reports', '#'],
    ['◈', 'Audit Trail', '#'],
    ['♟', 'User Management', '/users'],
    ['⚙', 'System Settings', '/settings'],
];

const inputClass =
    'h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

function Field({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-[#173b72]">
                {label} {required && <b className="text-red-500">*</b>}
            </span>
            {children}
        </label>
    );
}

function Section({
    icon,
    title,
    children,
    className = '',
}: {
    icon: string;
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}
        >
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-[#08337a]">
                <span className="text-xl text-blue-600">{icon}</span>
                {title}
            </h3>
            {children}
        </section>
    );
}

function SummaryRow({
    icon,
    label,
    value,
    valueClass = '',
}: {
    icon: string;
    label: string;
    value: string;
    valueClass?: string;
}) {
    return (
        <div className="flex items-center gap-3 border-b border-dashed border-slate-200 py-2.5 last:border-0">
            <span className="w-5 text-center text-blue-600">{icon}</span>
            <span className="text-xs font-semibold text-[#173b72]">
                {label}
            </span>
            <span
                className={`ml-auto max-w-40 truncate text-right text-xs font-semibold ${valueClass}`}
            >
                {value}
            </span>
        </div>
    );
}

export default function CreateBudgetPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [category, setCategory] = useState('');
    const [budgetType, setBudgetType] = useState('');
    const [status, setStatus] = useState('Draft');
    const [approvalRoute, setApprovalRoute] = useState('');
    const [amount, setAmount] = useState('');
    const [saved, setSaved] = useState(false);
    const totalBudget = 12_450_000;
    const amountNumber = Math.max(0, Number(amount) || 0);
    const remaining = Math.max(0, totalBudget - amountNumber);
    const utilization = Math.min(100, (amountNumber / totalBudget) * 100);
    const currency = useMemo(
        () =>
            new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
            }),
        [],
    );

    function resetForm() {
        setCategory('');
        setBudgetType('');
        setStatus('Draft');
        setApprovalRoute('');
        setAmount('');
        setSaved(false);
        document.querySelector<HTMLFormElement>('#add-budget-form')?.reset();
    }

    function saveBudget(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaved(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <>
            <Head title="Add Budget" />
            <div className="min-h-screen bg-[#f5f7fb] font-sans text-slate-800">
                {sidebarOpen && (
                    <button
                        className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close navigation"
                    />
                )}
                <aside
                    className={`fixed inset-y-0 left-0 z-40 flex w-65 flex-col bg-gradient-to-b from-[#063b76] to-[#06457f] text-white shadow-xl transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <div className="flex h-27 items-center bg-white px-4">
                        <img
                            src="/images/dbfos-logo.png"
                            alt="DBFOS"
                            className="h-23 w-full object-contain"
                        />
                    </div>
                    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                        {menu.map(([icon, label, href], index) =>
                            label === 'Master Data' ? (
                                <MasterDataMenu key={label} />
                            ) : label === 'Transaction' ? (
                                <TransactionMenu key={label} />
                            ) : label === 'Reports' ? (
                                <ReportsMenu key={label} />
                            ) : (
                                <Link
                                    key={label}
                                    href={href}
                                    className={`flex items-center gap-4 rounded-lg px-3 py-3 text-sm font-semibold transition ${index === 3 ? 'bg-gradient-to-r from-[#1589f5] to-[#1774e7] shadow-lg' : 'text-white/90 hover:bg-white/10'}`}
                                >
                                    <span className="w-6 text-center text-xl">
                                        {icon}
                                    </span>
                                    {label}
                                </Link>
                            ),
                        )}
                    </nav>
                    <div className="m-4 rounded-xl bg-white/10 p-4 text-center text-xs font-semibold">
                        ◇ &nbsp; Barangay-Level Financial
                        <br />
                        Transparency & Accountability
                    </div>
                </aside>

                <div className="lg:pl-65">
                    <header className="sticky top-0 z-20 flex h-18 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-7">
                        <div className="flex items-center gap-5">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="text-2xl text-[#092d62] lg:hidden"
                            >
                                ☰
                            </button>
                            <div>
                                <h1 className="text-lg font-bold text-[#092d62] sm:text-xl">
                                    Barangay Financial Operations System
                                </h1>
                                <p className="hidden text-sm text-slate-500 sm:block">
                                    Municipality of Villanueva, Misamis Oriental
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:block">
                                <p className="text-sm font-bold">
                                    Juan Dela Cruz
                                </p>
                                <p className="text-xs text-slate-500">
                                    Barangay Treasurer
                                </p>
                            </div>
                            <Form action="/logout" method="post">
                                <button className="text-xs font-semibold text-slate-500">
                                    Sign out
                                </button>
                            </Form>
                        </div>
                    </header>

                    <main className="p-4 sm:p-6">
                        <div className="mb-4 flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
                            <div>
                                <h2 className="text-2xl font-bold text-[#092d62]">
                                    Add Budget
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Create a new annual or supplemental budget
                                    allocation and assign it to the appropriate
                                    category, funding source, and status.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    form="add-budget-form"
                                    type="submit"
                                    className="rounded-lg bg-[#0765d2] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#0755b1]"
                                >
                                    ▣ &nbsp; Save Budget
                                </button>
                                <Link
                                    href="/budgets"
                                    className="rounded-lg border border-blue-500 bg-white px-5 py-2.5 text-sm font-bold text-blue-700"
                                >
                                    ✕ &nbsp; Cancel
                                </Link>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-lg border border-blue-500 bg-white px-5 py-2.5 text-sm font-bold text-blue-700"
                                >
                                    ↻ &nbsp; Reset Form
                                </button>
                            </div>
                        </div>
                        {saved && (
                            <div
                                role="status"
                                className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700"
                            >
                                Budget details are ready and have been saved as{' '}
                                {status.toLowerCase()}.
                            </div>
                        )}

                        <form
                            id="add-budget-form"
                            onSubmit={saveBudget}
                            className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_350px]"
                        >
                            <div className="space-y-4">
                                <Section icon="▣" title="1. Budget Details">
                                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                        <Field label="Budget No. / Code">
                                            <input
                                                className={inputClass}
                                                value="Auto-generated"
                                                disabled
                                            />
                                        </Field>
                                        <Field label="Date Created">
                                            <input
                                                name="date_created"
                                                type="date"
                                                defaultValue="2025-05-20"
                                                className={inputClass}
                                            />
                                        </Field>
                                        <Field
                                            label="Budget Title / Description"
                                            required
                                        >
                                            <input
                                                required
                                                name="title"
                                                placeholder="Enter budget title or description"
                                                className={inputClass}
                                            />
                                        </Field>
                                        <Field label="Reference No.">
                                            <input
                                                name="reference"
                                                placeholder="Enter reference number"
                                                className={inputClass}
                                            />
                                        </Field>
                                        <Field label="Budget Type" required>
                                            <select
                                                required
                                                value={budgetType}
                                                onChange={(e) =>
                                                    setBudgetType(
                                                        e.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            >
                                                <option value="">
                                                    Select budget type
                                                </option>
                                                <option>Annual Budget</option>
                                                <option>
                                                    Supplemental Budget
                                                </option>
                                                <option>Special Budget</option>
                                            </select>
                                        </Field>
                                        <Field label="Status" required>
                                            <select
                                                required
                                                value={status}
                                                onChange={(e) =>
                                                    setStatus(e.target.value)
                                                }
                                                className={inputClass}
                                            >
                                                <option>Draft</option>
                                                <option>For Approval</option>
                                                <option>Approved</option>
                                            </select>
                                        </Field>
                                    </div>
                                </Section>

                                <Section
                                    icon="♙"
                                    title="2. Allocation and Classification Information"
                                >
                                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                        <Field label="Fiscal Year" required>
                                            <select
                                                required
                                                className={inputClass}
                                                defaultValue=""
                                            >
                                                <option value="">
                                                    Select fiscal year
                                                </option>
                                                <option>FY 2025</option>
                                                <option>FY 2026</option>
                                            </select>
                                        </Field>
                                        <Field
                                            label="Program / Category"
                                            required
                                        >
                                            <select
                                                required
                                                value={category}
                                                onChange={(e) =>
                                                    setCategory(e.target.value)
                                                }
                                                className={inputClass}
                                            >
                                                <option value="">
                                                    Select program or category
                                                </option>
                                                <option>
                                                    General Public Services
                                                </option>
                                                <option>Social Services</option>
                                                <option>
                                                    Economic Services
                                                </option>
                                                <option>
                                                    Infrastructure Services
                                                </option>
                                                <option>Other Purposes</option>
                                            </select>
                                        </Field>
                                        <Field
                                            label="Expense Category"
                                            required
                                        >
                                            <select
                                                required
                                                className={inputClass}
                                                defaultValue=""
                                            >
                                                <option value="">
                                                    Select expense category
                                                </option>
                                                <option>
                                                    Personnel Services
                                                </option>
                                                <option>
                                                    Maintenance and Other
                                                    Operating Expenses
                                                </option>
                                                <option>Capital Outlay</option>
                                            </select>
                                        </Field>
                                        <Field label="Funding Source" required>
                                            <select
                                                required
                                                className={inputClass}
                                                defaultValue=""
                                            >
                                                <option value="">
                                                    Select funding source
                                                </option>
                                                <option>
                                                    Internal Revenue Allotment
                                                    (IRA)
                                                </option>
                                                <option>Local Sources</option>
                                                <option>
                                                    Other Grants & Subsidies
                                                </option>
                                                <option>Other Income</option>
                                            </select>
                                        </Field>
                                        <Field
                                            label="Budget Classification"
                                            required
                                        >
                                            <select
                                                required
                                                className={inputClass}
                                                defaultValue=""
                                            >
                                                <option value="">
                                                    Select classification
                                                </option>
                                                <option>General Fund</option>
                                                <option>
                                                    Special Education Fund
                                                </option>
                                                <option>Trust Fund</option>
                                            </select>
                                        </Field>
                                        <Field
                                            label="Linked Barangay / Office"
                                            required
                                        >
                                            <select
                                                required
                                                className={inputClass}
                                                defaultValue=""
                                            >
                                                <option value="">
                                                    Select barangay or office
                                                </option>
                                                <option>
                                                    Barangay Poblacion
                                                </option>
                                                <option>
                                                    Municipal Office
                                                </option>
                                                <option>
                                                    Barangay Tagoloan
                                                </option>
                                            </select>
                                        </Field>
                                        <Field label="Approved Amount" required>
                                            <div className="relative">
                                                <span className="absolute top-2.5 left-3 text-sm text-slate-500">
                                                    ₱
                                                </span>
                                                <input
                                                    required
                                                    min="0"
                                                    step="0.01"
                                                    type="number"
                                                    value={amount}
                                                    onChange={(e) =>
                                                        setAmount(
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="0.00"
                                                    className={`${inputClass} pl-8`}
                                                />
                                            </div>
                                        </Field>
                                        <div className="rounded-lg border border-green-300 bg-green-50 px-3 py-2">
                                            <p className="text-xs font-bold text-green-700">
                                                Remaining Budget (Preview)
                                            </p>
                                            <p className="mt-1 text-lg font-bold text-green-700">
                                                {currency.format(remaining)}
                                            </p>
                                            <p className="text-xs text-green-600">
                                                Available balance
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Field
                                            label="Allocation Basis / Description"
                                            required
                                        >
                                            <textarea
                                                required
                                                name="allocation_basis"
                                                rows={2}
                                                placeholder="Enter allocation basis or description"
                                                className={`${inputClass} h-auto py-2`}
                                            />
                                        </Field>
                                    </div>
                                </Section>

                                <Section
                                    icon="▣"
                                    title="3. Administrative / Approval Information"
                                >
                                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                        <Field label="Prepared By" required>
                                            <input
                                                required
                                                name="prepared_by"
                                                placeholder="Enter preparer name"
                                                className={inputClass}
                                            />
                                        </Field>
                                        <Field
                                            label="Office / Barangay"
                                            required
                                        >
                                            <select
                                                required
                                                className={inputClass}
                                                defaultValue=""
                                            >
                                                <option value="">
                                                    Select office / barangay
                                                </option>
                                                <option>
                                                    Barangay Poblacion
                                                </option>
                                                <option>
                                                    Municipal Office
                                                </option>
                                            </select>
                                        </Field>
                                        <Field
                                            label="Responsibility Center"
                                            required
                                        >
                                            <select
                                                required
                                                className={inputClass}
                                                defaultValue=""
                                            >
                                                <option value="">
                                                    Select responsibility center
                                                </option>
                                                <option>
                                                    Office of the Punong
                                                    Barangay
                                                </option>
                                                <option>
                                                    Barangay Treasurer's Office
                                                </option>
                                            </select>
                                        </Field>
                                        <Field
                                            label="Approval Route / Level"
                                            required
                                        >
                                            <select
                                                required
                                                value={approvalRoute}
                                                onChange={(e) =>
                                                    setApprovalRoute(
                                                        e.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            >
                                                <option value="">
                                                    Select approval route /
                                                    level
                                                </option>
                                                <option>
                                                    Treasurer → Punong Barangay
                                                </option>
                                                <option>
                                                    Treasurer → Council → Punong
                                                    Barangay
                                                </option>
                                            </select>
                                        </Field>
                                        <Field label="Effective Date" required>
                                            <input
                                                required
                                                type="date"
                                                defaultValue="2025-05-20"
                                                className={inputClass}
                                            />
                                        </Field>
                                        <Field
                                            label="Budget Period (From)"
                                            required
                                        >
                                            <input
                                                required
                                                type="date"
                                                className={inputClass}
                                            />
                                        </Field>
                                        <Field
                                            label="Budget Period (To)"
                                            required
                                        >
                                            <input
                                                required
                                                type="date"
                                                className={inputClass}
                                            />
                                        </Field>
                                    </div>
                                </Section>

                                <div className="grid gap-4 lg:grid-cols-2">
                                    <Section
                                        icon="▧"
                                        title="4. Supporting Documents"
                                    >
                                        <p className="-mt-2 mb-3 text-xs text-slate-500">
                                            Upload supporting documents such as
                                            resolutions, attachments, or
                                            justifications.
                                        </p>
                                        <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-400 bg-blue-50/40 text-center">
                                            <span className="text-3xl text-blue-600">
                                                ☁
                                            </span>
                                            <b className="mt-1 text-xs text-[#173b72]">
                                                Drag and drop files here or
                                                click to browse
                                            </b>
                                            <span className="mt-1 text-xs text-slate-500">
                                                Supports PDF, JPG, PNG, DOCX,
                                                XLSX
                                            </span>
                                            <input
                                                type="file"
                                                multiple
                                                className="sr-only"
                                            />
                                        </label>
                                    </Section>
                                    <Section
                                        icon="▧"
                                        title="5. Notes / Remarks"
                                    >
                                        <p className="-mt-2 mb-3 text-xs text-slate-500">
                                            Add any remarks or notes related to
                                            this budget.
                                        </p>
                                        <textarea
                                            maxLength={1000}
                                            rows={5}
                                            placeholder="Enter notes or remarks related to this budget..."
                                            className={`${inputClass} h-28 py-2`}
                                        />
                                        <p className="mt-1 text-right text-xs text-slate-500">
                                            0 / 1000
                                        </p>
                                    </Section>
                                </div>
                            </div>

                            <aside className="space-y-4">
                                <Section icon="▧" title="A. Budget Summary">
                                    <SummaryRow
                                        icon="▣"
                                        label="Selected Category"
                                        value={category || 'Not selected'}
                                    />
                                    <SummaryRow
                                        icon="▧"
                                        label="Budget Type"
                                        value={budgetType || 'Not selected'}
                                    />
                                    <SummaryRow
                                        icon="▰"
                                        label="Approved Amount"
                                        value={currency.format(amountNumber)}
                                    />
                                    <SummaryRow
                                        icon="◉"
                                        label="Status"
                                        value={status}
                                        valueClass="text-amber-600"
                                    />
                                    <SummaryRow
                                        icon="♙"
                                        label="Approval Route"
                                        value={approvalRoute || 'Not set'}
                                    />
                                </Section>
                                <Section icon="▥" title="B. Budget Preview">
                                    <SummaryRow
                                        icon="◉"
                                        label="Total Approved Budget"
                                        value={currency.format(totalBudget)}
                                    />
                                    <SummaryRow
                                        icon="◷"
                                        label="Allocated Amount"
                                        value={currency.format(amountNumber)}
                                    />
                                    <SummaryRow
                                        icon="♨"
                                        label="Remaining Balance"
                                        value={currency.format(remaining)}
                                        valueClass="text-green-700"
                                    />
                                    <SummaryRow
                                        icon="◉"
                                        label="% Utilization"
                                        value={`${utilization.toFixed(1)}%`}
                                    />
                                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className="h-full rounded-full bg-blue-600 transition-all"
                                            style={{ width: `${utilization}%` }}
                                        />
                                    </div>
                                    <p className="mt-1 text-right text-xs text-slate-500">
                                        {utilization.toFixed(1)}%
                                    </p>
                                </Section>
                                <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
                                    <h3 className="mb-3 flex items-center gap-2 font-bold text-[#173b72]">
                                        <span className="text-2xl text-amber-500">
                                            ☼
                                        </span>
                                        C. Creation Guidelines
                                    </h3>
                                    {[
                                        'Ensure all required fields (*) are completed.',
                                        'Verify that the funding source is correct and available.',
                                        'Review and confirm the approval routing and levels.',
                                        'Attach all necessary supporting documents.',
                                        'Save as Draft if not ready to submit for approval.',
                                    ].map((item) => (
                                        <p
                                            key={item}
                                            className="mb-2 flex gap-2 text-xs text-[#35537d]"
                                        >
                                            <b className="text-amber-500">●</b>
                                            {item}
                                        </p>
                                    ))}
                                </section>
                            </aside>
                        </form>
                        <footer className="mt-5 flex flex-col justify-between gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500 sm:flex-row">
                            <span>
                                © 2025 Municipality of Villanueva. All rights
                                reserved.
                            </span>
                            <span>
                                Version 2.3.1 &nbsp; • &nbsp; Built with{' '}
                                <b className="text-red-500">♥</b> for good
                                governance
                            </span>
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}
