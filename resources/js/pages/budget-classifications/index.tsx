import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { dashboard } from '@/routes';

type Classification = {
    code: string;
    name: string;
    level: 'Operating' | 'Capital' | 'Special Purpose';
    scope: string;
    ceiling: string;
    fiscalYear: string;
    status: 'Active' | 'Inactive';
};

const seed: Classification[] = [
    {
        code: 'BC-001',
        name: 'Personnel Services',
        level: 'Operating',
        scope: 'Salaries, wages, and employee benefits',
        ceiling: '₱96,500,000',
        fiscalYear: '2026',
        status: 'Active',
    },
    {
        code: 'BC-002',
        name: 'Maintenance and Other Operating Expenses',
        level: 'Operating',
        scope: 'Day-to-day government operations',
        ceiling: '₱82,750,000',
        fiscalYear: '2026',
        status: 'Active',
    },
    {
        code: 'BC-003',
        name: 'Capital Outlay',
        level: 'Capital',
        scope: 'Property, equipment, and infrastructure',
        ceiling: '₱48,000,000',
        fiscalYear: '2026',
        status: 'Active',
    },
    {
        code: 'BC-004',
        name: 'Development Programs',
        level: 'Special Purpose',
        scope: '20% local development projects',
        ceiling: '₱32,000,000',
        fiscalYear: '2026',
        status: 'Active',
    },
    {
        code: 'BC-005',
        name: 'Disaster Risk Reduction',
        level: 'Special Purpose',
        scope: 'Preparedness, response, and recovery',
        ceiling: '₱18,750,000',
        fiscalYear: '2026',
        status: 'Active',
    },
    {
        code: 'BC-006',
        name: 'Prior-Year Continuing Appropriations',
        level: 'Capital',
        scope: 'Uncompleted prior-year capital projects',
        ceiling: '₱6,400,000',
        fiscalYear: '2025',
        status: 'Inactive',
    },
];

const menu: string[][] = [
    ['⌂', 'Dashboard', dashboard.url()],
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
const blank = {
    name: '',
    level: 'Operating' as Classification['level'],
    scope: '',
    ceiling: '',
    fiscalYear: '2026',
    status: 'Active' as Classification['status'],
};

export default function BudgetClassificationManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [items, setItems] = useState(seed);
    const [query, setQuery] = useState('');
    const [level, setLevel] = useState('All Levels');
    const [status, setStatus] = useState('All Statuses');
    const [modalOpen, setModalOpen] = useState(false);
    const [draft, setDraft] = useState(blank);
    const filtered = useMemo(
        () =>
            items
                .filter(
                    (item) => level === 'All Levels' || item.level === level,
                )
                .filter(
                    (item) =>
                        status === 'All Statuses' || item.status === status,
                )
                .filter((item) =>
                    `${item.code} ${item.name} ${item.scope} ${item.fiscalYear}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                )
                .sort((a, b) => a.name.localeCompare(b.name)),
        [items, level, query, status],
    );

    const addItem = () => {
        if (!draft.name.trim() || !draft.scope.trim()) {
            return;
        }

        setItems((current) => [
            ...current,
            {
                code: `BC-${String(current.length + 1).padStart(3, '0')}`,
                name: draft.name,
                level: draft.level,
                scope: draft.scope,
                ceiling: draft.ceiling
                    ? `₱${Number(draft.ceiling).toLocaleString('en-PH')}`
                    : '₱0',
                fiscalYear: draft.fiscalYear,
                status: draft.status,
            },
        ]);
        setDraft(blank);
        setModalOpen(false);
    };

    return (
        <>
            <Head title="Budget Classification Management" />
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
                        {menu.map(([icon, label, href]) =>
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
                                    className="flex items-center gap-4 rounded-lg px-3 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
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
                                aria-label="Open navigation"
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
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-[#092d62]">
                                    Budget Classification Management
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Define and maintain budget groups,
                                    appropriation levels, and spending ceilings.
                                </p>
                            </div>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="rounded-lg bg-[#0873e6] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                            >
                                ＋ Add Budget Classification
                            </button>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                [
                                    '▦',
                                    'Total Classifications',
                                    items.length,
                                    'bg-blue-50 text-blue-600',
                                ],
                                [
                                    '✓',
                                    'Active Classifications',
                                    items.filter(
                                        (item) => item.status === 'Active',
                                    ).length,
                                    'bg-emerald-50 text-emerald-600',
                                ],
                                [
                                    '◇',
                                    'Classification Levels',
                                    new Set(items.map((item) => item.level))
                                        .size,
                                    'bg-violet-50 text-violet-600',
                                ],
                                [
                                    '▣',
                                    'Current Fiscal Year',
                                    items.filter(
                                        (item) => item.fiscalYear === '2026',
                                    ).length,
                                    'bg-amber-50 text-amber-600',
                                ],
                            ].map(([icon, label, value, color]) => (
                                <section
                                    key={String(label)}
                                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                                >
                                    <span
                                        className={`flex size-12 items-center justify-center rounded-full text-xl ${color}`}
                                    >
                                        {icon}
                                    </span>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500">
                                            {label}
                                        </p>
                                        <p className="mt-1 text-2xl font-bold text-[#092d62]">
                                            {value}
                                        </p>
                                    </div>
                                </section>
                            ))}
                        </div>
                        <section className="mt-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="grid gap-3 border-b border-slate-200 p-4 md:grid-cols-[minmax(240px,1fr)_200px_180px_auto]">
                                <input
                                    value={query}
                                    onChange={(event) =>
                                        setQuery(event.target.value)
                                    }
                                    placeholder="Search code, classification, scope, or year..."
                                    className={inputClass}
                                />
                                <select
                                    value={level}
                                    onChange={(event) =>
                                        setLevel(event.target.value)
                                    }
                                    className={inputClass}
                                >
                                    <option>All Levels</option>
                                    <option>Operating</option>
                                    <option>Capital</option>
                                    <option>Special Purpose</option>
                                </select>
                                <select
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(event.target.value)
                                    }
                                    className={inputClass}
                                >
                                    <option>All Statuses</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                                <button
                                    onClick={() => {
                                        setQuery('');
                                        setLevel('All Levels');
                                        setStatus('All Statuses');
                                    }}
                                    className="h-10 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-600"
                                >
                                    Reset
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-220 text-left text-sm">
                                    <thead className="bg-slate-50 text-[11px] font-bold text-[#092d62] uppercase">
                                        <tr>
                                            <th className="px-5 py-3">Code</th>
                                            <th className="px-5 py-3">
                                                Budget Classification
                                            </th>
                                            <th className="px-5 py-3">Level</th>
                                            <th className="px-5 py-3">
                                                Coverage / Scope
                                            </th>
                                            <th className="px-5 py-3">
                                                Ceiling
                                            </th>
                                            <th className="px-5 py-3">
                                                Fiscal Year
                                            </th>
                                            <th className="px-5 py-3">
                                                Status
                                            </th>
                                            <th className="px-5 py-3">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filtered.map((item) => (
                                            <tr
                                                key={item.code}
                                                className="hover:bg-blue-50/40"
                                            >
                                                <td className="px-5 py-4 font-mono text-xs font-bold text-blue-600">
                                                    {item.code}
                                                </td>
                                                <td className="px-5 py-4 font-semibold text-[#17345f]">
                                                    {item.name}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                                                        {item.level}
                                                    </span>
                                                </td>
                                                <td className="max-w-70 px-5 py-4 text-slate-600">
                                                    {item.scope}
                                                </td>
                                                <td className="px-5 py-4 font-semibold">
                                                    {item.ceiling}
                                                </td>
                                                <td className="px-5 py-4">
                                                    {item.fiscalYear}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <button className="font-semibold text-blue-600">
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {filtered.length === 0 && (
                                <p className="p-10 text-center text-sm text-slate-500">
                                    No budget classifications match the selected
                                    filters.
                                </p>
                            )}
                        </section>
                    </main>
                </div>
                {modalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="classification-modal-title"
                    >
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                addItem();
                            }}
                            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                        >
                            <div className="flex items-center justify-between bg-[#073d78] px-6 py-5 text-white">
                                <div>
                                    <h3
                                        id="classification-modal-title"
                                        className="text-xl font-bold"
                                    >
                                        Add Budget Classification
                                    </h3>
                                    <p className="text-xs text-blue-100">
                                        Create a budget grouping and define its
                                        coverage.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="text-2xl text-white/80"
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="grid gap-4 bg-slate-50/70 p-6 sm:grid-cols-2">
                                <label className="text-xs font-semibold text-[#17345f] sm:col-span-2">
                                    Classification Name{' '}
                                    <b className="text-red-500">*</b>
                                    <input
                                        required
                                        autoFocus
                                        value={draft.name}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                name: event.target.value,
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                        placeholder="e.g. Gender and Development"
                                    />
                                </label>
                                <label className="text-xs font-semibold text-[#17345f]">
                                    Classification Level
                                    <select
                                        value={draft.level}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                level: event.target
                                                    .value as Classification['level'],
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                    >
                                        <option>Operating</option>
                                        <option>Capital</option>
                                        <option>Special Purpose</option>
                                    </select>
                                </label>
                                <label className="text-xs font-semibold text-[#17345f]">
                                    Fiscal Year
                                    <input
                                        type="number"
                                        min="2000"
                                        value={draft.fiscalYear}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                fiscalYear: event.target.value,
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                    />
                                </label>
                                <label className="text-xs font-semibold text-[#17345f]">
                                    Budget Ceiling
                                    <input
                                        type="number"
                                        min="0"
                                        value={draft.ceiling}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                ceiling: event.target.value,
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                        placeholder="0.00"
                                    />
                                </label>
                                <label className="text-xs font-semibold text-[#17345f]">
                                    Status
                                    <select
                                        value={draft.status}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                status: event.target
                                                    .value as Classification['status'],
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                    >
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </label>
                                <label className="text-xs font-semibold text-[#17345f] sm:col-span-2">
                                    Coverage / Scope{' '}
                                    <b className="text-red-500">*</b>
                                    <textarea
                                        required
                                        value={draft.scope}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                scope: event.target.value,
                                            })
                                        }
                                        className="mt-1.5 min-h-24 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                                        placeholder="Describe expenses or appropriations covered by this classification"
                                    />
                                </label>
                            </div>
                            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-lg bg-[#0873e6] px-6 py-2.5 text-sm font-semibold text-white"
                                >
                                    ＋ Add Classification
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}
