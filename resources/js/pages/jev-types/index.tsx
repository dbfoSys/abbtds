import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import NotificationBell from '@/components/notification-bell';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { dashboard } from '@/routes';

type JevType = {
    code: string;
    name: string;
    category: 'Regular' | 'Adjusting' | 'Closing' | 'Opening';
    source: string;
    balance: 'Debit' | 'Credit' | 'Balanced';
    description: string;
    status: 'Active' | 'Inactive';
};
const seed: JevType[] = [
    {
        code: 'GJV',
        name: 'General Journal Voucher',
        category: 'Regular',
        source: 'General Accounting',
        balance: 'Balanced',
        description: 'General journal entries and corrections',
        status: 'Active',
    },
    {
        code: 'CRJ',
        name: 'Cash Receipts Journal',
        category: 'Regular',
        source: 'Revenue & Collections',
        balance: 'Debit',
        description: 'Cash and collection transactions',
        status: 'Active',
    },
    {
        code: 'CDJ',
        name: 'Cash Disbursements Journal',
        category: 'Regular',
        source: 'Disbursements',
        balance: 'Credit',
        description: 'Cash and check disbursement transactions',
        status: 'Active',
    },
    {
        code: 'AJE',
        name: 'Adjusting Journal Entry',
        category: 'Adjusting',
        source: 'General Accounting',
        balance: 'Balanced',
        description: 'Period-end adjustments and accruals',
        status: 'Active',
    },
    {
        code: 'CJE',
        name: 'Closing Journal Entry',
        category: 'Closing',
        source: 'Year-End Closing',
        balance: 'Balanced',
        description: 'Closing temporary account balances',
        status: 'Active',
    },
    {
        code: 'OJE',
        name: 'Opening Journal Entry',
        category: 'Opening',
        source: 'Beginning Balances',
        balance: 'Balanced',
        description: 'Opening balances for a fiscal year',
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
    code: '',
    name: '',
    category: 'Regular' as JevType['category'],
    source: 'General Accounting',
    balance: 'Balanced' as JevType['balance'],
    description: '',
    status: 'Active' as JevType['status'],
};

export default function JevTypeManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [items, setItems] = useState(seed);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [status, setStatus] = useState('All Statuses');
    const [modalOpen, setModalOpen] = useState(false);
    const [draft, setDraft] = useState(blank);
    const filtered = useMemo(
        () =>
            items
                .filter(
                    (x) =>
                        category === 'All Categories' ||
                        x.category === category,
                )
                .filter((x) => status === 'All Statuses' || x.status === status)
                .filter((x) =>
                    `${x.code} ${x.name} ${x.source} ${x.description}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                )
                .sort((a, b) => a.name.localeCompare(b.name)),
        [items, query, category, status],
    );
    const addItem = () => {
        if (!draft.code.trim() || !draft.name.trim()) {
            return;
        }

        setItems((current) => [
            ...current,
            { ...draft, code: draft.code.toUpperCase() },
        ]);
        setDraft(blank);
        setModalOpen(false);
    };

    return (
        <>
            <Head title="JEV Type Management" />
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
                                    JEV Type Management
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Configure journal entry voucher
                                    classifications and accounting sources.
                                </p>
                            </div>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="rounded-lg bg-[#0873e6] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                            >
                                ＋ Add New JEV Type
                            </button>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                [
                                    '▤',
                                    'JEV Types',
                                    items.length,
                                    'bg-blue-50 text-blue-600',
                                ],
                                [
                                    '✓',
                                    'Active Types',
                                    items.filter((x) => x.status === 'Active')
                                        .length,
                                    'bg-emerald-50 text-emerald-600',
                                ],
                                [
                                    '↔',
                                    'Balanced Entries',
                                    items.filter(
                                        (x) => x.balance === 'Balanced',
                                    ).length,
                                    'bg-violet-50 text-violet-600',
                                ],
                                [
                                    '▦',
                                    'Source Modules',
                                    new Set(items.map((x) => x.source)).size,
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
                            <div className="grid gap-3 border-b border-slate-200 p-4 md:grid-cols-[minmax(240px,1fr)_210px_180px_auto]">
                                <label className="relative">
                                    <span className="absolute top-2.5 left-3 text-slate-400">
                                        ⌕
                                    </span>
                                    <input
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        placeholder="Search JEV type, code, source, or description..."
                                        className={`${inputClass} pl-9`}
                                    />
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className={inputClass}
                                >
                                    <option>All Categories</option>
                                    <option>Regular</option>
                                    <option>Adjusting</option>
                                    <option>Closing</option>
                                    <option>Opening</option>
                                </select>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className={inputClass}
                                >
                                    <option>All Statuses</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                                <button
                                    onClick={() => {
                                        setQuery('');
                                        setCategory('All Categories');
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
                                            <th className="px-5 py-3">
                                                JEV Code
                                            </th>
                                            <th className="px-5 py-3">
                                                JEV Type
                                            </th>
                                            <th className="px-5 py-3">
                                                Category
                                            </th>
                                            <th className="px-5 py-3">
                                                Source Module
                                            </th>
                                            <th className="px-5 py-3">
                                                Normal Balance
                                            </th>
                                            <th className="px-5 py-3">
                                                Description
                                            </th>
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
                                                key={item.code}
                                                className="hover:bg-blue-50/40"
                                            >
                                                <td className="px-5 py-4">
                                                    <span className="rounded bg-blue-50 px-2 py-1 font-mono font-bold text-blue-700">
                                                        {item.code}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 font-semibold text-[#092d62]">
                                                    {item.name}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {item.source}
                                                </td>
                                                <td className="px-5 py-4 font-semibold text-slate-600">
                                                    {item.balance}
                                                </td>
                                                <td className="max-w-70 px-5 py-4 text-slate-600">
                                                    {item.description}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <button
                                                        className="rounded-md p-2 text-blue-600 hover:bg-blue-50"
                                                        aria-label={`Edit ${item.name}`}
                                                    >
                                                        ✎
                                                    </button>
                                                    <button
                                                        className="rounded-md p-2 text-red-500 hover:bg-red-50"
                                                        aria-label={`Delete ${item.name}`}
                                                    >
                                                        ♲
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {filtered.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={8}
                                                    className="px-5 py-14 text-center text-slate-500"
                                                >
                                                    No JEV types match the
                                                    selected filters.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between border-t border-slate-200 px-5 py-4 text-xs text-slate-500">
                                <p>
                                    Showing {filtered.length} of {items.length}{' '}
                                    JEV types
                                </p>
                                <span>Page 1 of 1</span>
                            </div>
                        </section>
                    </main>
                </div>
                {modalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="jev-modal-title"
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                addItem();
                            }}
                            className="flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                        >
                            <div className="flex items-center justify-between bg-gradient-to-r from-[#063b76] to-[#0873e6] px-6 py-5 text-white">
                                <div className="flex items-center gap-4">
                                    <span className="flex size-11 items-center justify-center rounded-xl bg-white/15 text-2xl">
                                        ▤
                                    </span>
                                    <div>
                                        <h3
                                            id="jev-modal-title"
                                            className="text-xl font-bold"
                                        >
                                            Add New JEV Type
                                        </h3>
                                        <p className="text-xs text-blue-100">
                                            Define a journal entry
                                            classification.
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
                                        JEV Code{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            required
                                            autoFocus
                                            maxLength={10}
                                            value={draft.code}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    code: e.target.value.toUpperCase(),
                                                })
                                            }
                                            className={`${inputClass} mt-1.5 font-mono uppercase`}
                                            placeholder="e.g. BJE"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        JEV Type Name{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            required
                                            value={draft.name}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    name: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="Enter journal type name"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Category
                                        <select
                                            value={draft.category}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    category: e.target
                                                        .value as JevType['category'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Regular</option>
                                            <option>Adjusting</option>
                                            <option>Closing</option>
                                            <option>Opening</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Source Module
                                        <select
                                            value={draft.source}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    source: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>General Accounting</option>
                                            <option>
                                                Revenue & Collections
                                            </option>
                                            <option>Disbursements</option>
                                            <option>Year-End Closing</option>
                                            <option>Beginning Balances</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Normal Balance
                                        <select
                                            value={draft.balance}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    balance: e.target
                                                        .value as JevType['balance'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Balanced</option>
                                            <option>Debit</option>
                                            <option>Credit</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Status
                                        <select
                                            value={draft.status}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    status: e.target
                                                        .value as JevType['status'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f] sm:col-span-2">
                                        Description
                                        <textarea
                                            required
                                            value={draft.description}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="mt-1.5 min-h-20 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                                            placeholder="Describe when this JEV type is used"
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
                                        ＋ Add JEV Type
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
