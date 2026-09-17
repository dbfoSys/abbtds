import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import NotificationBell from '@/components/notification-bell';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { dashboard } from '@/routes';

type FiscalYear = {
    year: string;
    start: string;
    end: string;
    budget: string;
    status: 'Preparation' | 'Open' | 'Closed';
    current: boolean;
    transactions: string;
    notes: string;
};
const seed: FiscalYear[] = [
    {
        year: '2026',
        start: 'Jan 1, 2026',
        end: 'Dec 31, 2026',
        budget: '₱485,000,000.00',
        status: 'Preparation',
        current: false,
        transactions: '0',
        notes: 'Budget preparation in progress',
    },
    {
        year: '2025',
        start: 'Jan 1, 2025',
        end: 'Dec 31, 2025',
        budget: '₱452,750,000.00',
        status: 'Open',
        current: true,
        transactions: '3,248',
        notes: 'Current operating fiscal year',
    },
    {
        year: '2024',
        start: 'Jan 1, 2024',
        end: 'Dec 31, 2024',
        budget: '₱421,300,000.00',
        status: 'Closed',
        current: false,
        transactions: '8,976',
        notes: 'Year-end closing completed',
    },
    {
        year: '2023',
        start: 'Jan 1, 2023',
        end: 'Dec 31, 2023',
        budget: '₱398,500,000.00',
        status: 'Closed',
        current: false,
        transactions: '8,214',
        notes: 'Archived fiscal records',
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
    year: '',
    start: '',
    end: '',
    budget: '',
    status: 'Preparation' as FiscalYear['status'],
    current: false,
    notes: '',
};

export default function FiscalYearManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [years, setYears] = useState(seed);
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('All Statuses');
    const [modalOpen, setModalOpen] = useState(false);
    const [draft, setDraft] = useState(blank);
    const filtered = useMemo(
        () =>
            years
                .filter(
                    (item) =>
                        status === 'All Statuses' || item.status === status,
                )
                .filter((item) =>
                    `${item.year} ${item.notes}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                )
                .sort((a, b) => Number(b.year) - Number(a.year)),
        [years, query, status],
    );
    const addYear = () => {
        if (!draft.year || !draft.start || !draft.end) {
            return;
        }

        setYears((items) => [
            ...items.map((item) =>
                draft.current ? { ...item, current: false } : item,
            ),
            {
                year: draft.year,
                start: new Date(`${draft.start}T00:00:00`).toLocaleDateString(
                    'en-US',
                    { month: 'short', day: 'numeric', year: 'numeric' },
                ),
                end: new Date(`${draft.end}T00:00:00`).toLocaleDateString(
                    'en-US',
                    { month: 'short', day: 'numeric', year: 'numeric' },
                ),
                budget: draft.budget
                    ? `₱${Number(draft.budget).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`
                    : '₱0.00',
                status: draft.status,
                current: draft.current,
                transactions: '0',
                notes: draft.notes || 'New fiscal year',
            },
        ]);
        setDraft(blank);
        setModalOpen(false);
    };

    return (
        <>
            <Head title="Fiscal Year Management" />
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
                            <NotificationBell />
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
                                    Fiscal Year Management
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Configure fiscal periods, operating status,
                                    appropriations, and transaction access.
                                </p>
                            </div>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="rounded-lg bg-[#0873e6] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                            >
                                ＋ Add New Fiscal Year
                            </button>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                [
                                    '▣',
                                    'Fiscal Years',
                                    years.length,
                                    'bg-blue-50 text-blue-600',
                                ],
                                [
                                    '●',
                                    'Current Year',
                                    years.find((x) => x.current)?.year ?? '—',
                                    'bg-emerald-50 text-emerald-600',
                                ],
                                [
                                    '↻',
                                    'Open Periods',
                                    years.filter((x) => x.status === 'Open')
                                        .length,
                                    'bg-violet-50 text-violet-600',
                                ],
                                [
                                    '✓',
                                    'Closed Years',
                                    years.filter((x) => x.status === 'Closed')
                                        .length,
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
                            <div className="grid gap-3 border-b border-slate-200 p-4 sm:grid-cols-[minmax(240px,1fr)_200px_auto]">
                                <label className="relative">
                                    <span className="absolute top-2.5 left-3 text-slate-400">
                                        ⌕
                                    </span>
                                    <input
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        placeholder="Search fiscal year or notes..."
                                        className={`${inputClass} pl-9`}
                                    />
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className={inputClass}
                                >
                                    <option>All Statuses</option>
                                    <option>Preparation</option>
                                    <option>Open</option>
                                    <option>Closed</option>
                                </select>
                                <button
                                    onClick={() => {
                                        setQuery('');
                                        setStatus('All Statuses');
                                    }}
                                    className="h-10 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-600"
                                >
                                    Reset
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-210 text-left text-sm">
                                    <thead className="bg-slate-50 text-[11px] font-bold text-[#092d62] uppercase">
                                        <tr>
                                            <th className="px-5 py-3">
                                                Fiscal Year
                                            </th>
                                            <th className="px-5 py-3">
                                                Period
                                            </th>
                                            <th className="px-5 py-3 text-right">
                                                Approved Budget
                                            </th>
                                            <th className="px-5 py-3 text-center">
                                                Transactions
                                            </th>
                                            <th className="px-5 py-3">Notes</th>
                                            <th className="px-5 py-3">
                                                Status
                                            </th>
                                            <th className="px-5 py-3 text-center">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filtered.map((item) => (
                                            <tr
                                                key={item.year}
                                                className="hover:bg-blue-50/40"
                                            >
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xl font-bold text-[#092d62]">
                                                            {item.year}
                                                        </span>
                                                        {item.current && (
                                                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                                                                CURRENT
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {item.start} – {item.end}
                                                </td>
                                                <td className="px-5 py-4 text-right font-semibold text-[#092d62]">
                                                    {item.budget}
                                                </td>
                                                <td className="px-5 py-4 text-center text-slate-600">
                                                    {item.transactions}
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {item.notes}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === 'Open' ? 'bg-emerald-100 text-emerald-700' : item.status === 'Preparation' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'}`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <button
                                                        className="rounded-md p-2 text-blue-600 hover:bg-blue-50"
                                                        aria-label={`Edit fiscal year ${item.year}`}
                                                    >
                                                        ✎
                                                    </button>
                                                    <button
                                                        className="rounded-md p-2 text-slate-500 hover:bg-slate-100"
                                                        aria-label={`View fiscal year ${item.year}`}
                                                    >
                                                        ◉
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {filtered.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={7}
                                                    className="px-5 py-14 text-center text-slate-500"
                                                >
                                                    No fiscal years match the
                                                    selected filters.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between border-t border-slate-200 px-5 py-4 text-xs text-slate-500">
                                <p>
                                    Showing {filtered.length} of {years.length}{' '}
                                    fiscal years
                                </p>
                                <span>
                                    Closed years are locked from new
                                    transactions
                                </span>
                            </div>
                        </section>
                    </main>
                </div>
                {modalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="fiscal-modal-title"
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                addYear();
                            }}
                            className="flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                        >
                            <div className="flex items-center justify-between bg-gradient-to-r from-[#063b76] to-[#0873e6] px-6 py-5 text-white">
                                <div className="flex items-center gap-4">
                                    <span className="flex size-11 items-center justify-center rounded-xl bg-white/15 text-2xl">
                                        ▣
                                    </span>
                                    <div>
                                        <h3
                                            id="fiscal-modal-title"
                                            className="text-xl font-bold"
                                        >
                                            Add New Fiscal Year
                                        </h3>
                                        <p className="text-xs text-blue-100">
                                            Define the operating and budget
                                            period.
                                        </p>
                                    </div>
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
                            <div className="overflow-y-auto bg-slate-50/70 p-5 sm:p-7">
                                <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2">
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Fiscal Year{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            required
                                            autoFocus
                                            type="number"
                                            min="2000"
                                            max="2100"
                                            value={draft.year}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    year: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="e.g. 2027"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Status
                                        <select
                                            value={draft.status}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    status: e.target
                                                        .value as FiscalYear['status'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Preparation</option>
                                            <option>Open</option>
                                            <option>Closed</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Start Date{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            required
                                            type="date"
                                            value={draft.start}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    start: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        End Date{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            required
                                            type="date"
                                            min={draft.start}
                                            value={draft.end}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    end: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f] sm:col-span-2">
                                        Approved Budget / Appropriation
                                        <input
                                            type="number"
                                            min="0"
                                            value={draft.budget}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    budget: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="0.00"
                                        />
                                    </label>
                                    <label className="flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs font-semibold text-blue-800 sm:col-span-2">
                                        <input
                                            type="checkbox"
                                            checked={draft.current}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    current: e.target.checked,
                                                })
                                            }
                                            className="size-4 accent-blue-600"
                                        />
                                        Set as the current fiscal year
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f] sm:col-span-2">
                                        Notes
                                        <textarea
                                            value={draft.notes}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    notes: e.target.value,
                                                })
                                            }
                                            className="mt-1.5 min-h-20 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                                            placeholder="Optional fiscal-year notes"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col-reverse justify-between gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center">
                                <p className="text-[11px] text-slate-400">
                                    <b className="text-red-500">*</b> Required
                                    fields
                                </p>
                                <div className="flex justify-end gap-3">
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
                                        ＋ Add Fiscal Year
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}
