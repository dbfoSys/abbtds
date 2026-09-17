import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import NotificationBell from '@/components/notification-bell';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { dashboard } from '@/routes';

type FundingSource = {
    code: string;
    name: string;
    type:
        | 'Local Fund'
        | 'National Transfer'
        | 'Grant'
        | 'Loan'
        | 'Special Purpose Fund';
    agency: string;
    restriction: 'Unrestricted' | 'Restricted';
    allocation: string;
    available: string;
    utilization: number;
    status: 'Active' | 'Inactive';
};
const seed: FundingSource[] = [
    {
        code: 'FS-001',
        name: 'General Fund',
        type: 'Local Fund',
        agency: 'Municipality of Villanueva',
        restriction: 'Unrestricted',
        allocation: '₱285,000,000',
        available: '₱104,500,000',
        utilization: 63,
        status: 'Active',
    },
    {
        code: 'FS-002',
        name: 'National Tax Allotment',
        type: 'National Transfer',
        agency: 'Department of Budget and Management',
        restriction: 'Unrestricted',
        allocation: '₱146,800,000',
        available: '₱61,200,000',
        utilization: 58,
        status: 'Active',
    },
    {
        code: 'FS-003',
        name: '20% Development Fund',
        type: 'Special Purpose Fund',
        agency: 'Municipality of Villanueva',
        restriction: 'Restricted',
        allocation: '₱48,000,000',
        available: '₱19,750,000',
        utilization: 59,
        status: 'Active',
    },
    {
        code: 'FS-004',
        name: 'Special Education Fund',
        type: 'Special Purpose Fund',
        agency: 'Local School Board',
        restriction: 'Restricted',
        allocation: '₱22,500,000',
        available: '₱8,400,000',
        utilization: 63,
        status: 'Active',
    },
    {
        code: 'FS-005',
        name: 'Disaster Risk Reduction Fund',
        type: 'Special Purpose Fund',
        agency: 'MDRRMO',
        restriction: 'Restricted',
        allocation: '₱18,750,000',
        available: '₱12,300,000',
        utilization: 34,
        status: 'Active',
    },
    {
        code: 'FS-006',
        name: 'Regional Infrastructure Grant',
        type: 'Grant',
        agency: 'Department of the Interior and Local Government',
        restriction: 'Restricted',
        allocation: '₱15,000,000',
        available: '₱0',
        utilization: 100,
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
    type: 'Local Fund' as FundingSource['type'],
    agency: '',
    restriction: 'Unrestricted' as FundingSource['restriction'],
    allocation: '',
    description: '',
    status: 'Active' as FundingSource['status'],
};

export default function FundingSourceManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [items, setItems] = useState(seed);
    const [query, setQuery] = useState('');
    const [type, setType] = useState('All Source Types');
    const [status, setStatus] = useState('All Statuses');
    const [modalOpen, setModalOpen] = useState(false);
    const [draft, setDraft] = useState(blank);
    const filtered = useMemo(
        () =>
            items
                .filter((x) => type === 'All Source Types' || x.type === type)
                .filter((x) => status === 'All Statuses' || x.status === status)
                .filter((x) =>
                    `${x.code} ${x.name} ${x.agency}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                )
                .sort((a, b) => a.name.localeCompare(b.name)),
        [items, query, type, status],
    );
    const addItem = () => {
        if (!draft.name.trim() || !draft.agency.trim()) {
            return;
        }

        const amount = Number(draft.allocation) || 0;
        setItems((current) => [
            ...current,
            {
                code: `FS-${String(current.length + 1).padStart(3, '0')}`,
                name: draft.name,
                type: draft.type,
                agency: draft.agency,
                restriction: draft.restriction,
                allocation: `₱${amount.toLocaleString('en-PH')}`,
                available: `₱${amount.toLocaleString('en-PH')}`,
                utilization: 0,
                status: draft.status,
            },
        ]);
        setDraft(blank);
        setModalOpen(false);
    };

    return (
        <>
            <Head title="Funding Source Management" />
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
                                    Funding Source Management
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Maintain municipal funds, transfers, grants,
                                    restrictions, and available balances.
                                </p>
                            </div>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="rounded-lg bg-[#0873e6] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                            >
                                ＋ Add Funding Source
                            </button>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                [
                                    '₱',
                                    'Funding Sources',
                                    items.length,
                                    'bg-blue-50 text-blue-600',
                                ],
                                [
                                    '✓',
                                    'Active Sources',
                                    items.filter((x) => x.status === 'Active')
                                        .length,
                                    'bg-emerald-50 text-emerald-600',
                                ],
                                [
                                    '◆',
                                    'Restricted Funds',
                                    items.filter(
                                        (x) => x.restriction === 'Restricted',
                                    ).length,
                                    'bg-violet-50 text-violet-600',
                                ],
                                [
                                    '▣',
                                    'Total Allocation',
                                    '₱536.05M',
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
                            <div className="grid gap-3 border-b border-slate-200 p-4 md:grid-cols-[minmax(240px,1fr)_220px_180px_auto]">
                                <label className="relative">
                                    <span className="absolute top-2.5 left-3 text-slate-400">
                                        ⌕
                                    </span>
                                    <input
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        placeholder="Search source, code, or agency..."
                                        className={`${inputClass} pl-9`}
                                    />
                                </label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className={inputClass}
                                >
                                    <option>All Source Types</option>
                                    <option>Local Fund</option>
                                    <option>National Transfer</option>
                                    <option>Grant</option>
                                    <option>Loan</option>
                                    <option>Special Purpose Fund</option>
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
                                        setType('All Source Types');
                                        setStatus('All Statuses');
                                    }}
                                    className="h-10 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-600"
                                >
                                    Reset
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-245 text-left text-sm">
                                    <thead className="bg-slate-50 text-[11px] font-bold text-[#092d62] uppercase">
                                        <tr>
                                            <th className="px-5 py-3">Code</th>
                                            <th className="px-5 py-3">
                                                Funding Source
                                            </th>
                                            <th className="px-5 py-3">
                                                Source Type
                                            </th>
                                            <th className="px-5 py-3">
                                                Agency / Owner
                                            </th>
                                            <th className="px-5 py-3">
                                                Restriction
                                            </th>
                                            <th className="px-5 py-3 text-right">
                                                Allocation
                                            </th>
                                            <th className="px-5 py-3 text-right">
                                                Available
                                            </th>
                                            <th className="px-5 py-3">
                                                Utilization
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
                                                <td className="px-5 py-4 font-semibold text-blue-600">
                                                    {item.code}
                                                </td>
                                                <td className="px-5 py-4 font-semibold text-[#092d62]">
                                                    {item.name}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                                        {item.type}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {item.agency}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.restriction === 'Restricted' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}
                                                    >
                                                        {item.restriction}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-right font-semibold text-[#092d62]">
                                                    {item.allocation}
                                                </td>
                                                <td className="px-5 py-4 text-right font-semibold text-emerald-700">
                                                    {item.available}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="w-24">
                                                        <div className="h-1.5 rounded-full bg-slate-200">
                                                            <div
                                                                className="h-full rounded-full bg-blue-500"
                                                                style={{
                                                                    width: `${item.utilization}%`,
                                                                }}
                                                            />
                                                        </div>
                                                        <p className="mt-1 text-[10px] text-slate-500">
                                                            {item.utilization}%
                                                            used
                                                        </p>
                                                    </div>
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
                                                    colSpan={10}
                                                    className="px-5 py-14 text-center text-slate-500"
                                                >
                                                    No funding sources match the
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
                                    funding sources
                                </p>
                                <span>Fiscal Year 2025</span>
                            </div>
                        </section>
                    </main>
                </div>
                {modalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="funding-modal-title"
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
                                        ₱
                                    </span>
                                    <div>
                                        <h3
                                            id="funding-modal-title"
                                            className="text-xl font-bold"
                                        >
                                            Add Funding Source
                                        </h3>
                                        <p className="text-xs text-blue-100">
                                            Register a municipal fund or
                                            external source.
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
                                    <label className="text-xs font-semibold text-[#17345f] sm:col-span-2">
                                        Funding Source Name{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            required
                                            autoFocus
                                            value={draft.name}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    name: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="e.g. Climate Resilience Grant"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Source Type
                                        <select
                                            value={draft.type}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    type: e.target
                                                        .value as FundingSource['type'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Local Fund</option>
                                            <option>National Transfer</option>
                                            <option>Grant</option>
                                            <option>Loan</option>
                                            <option>
                                                Special Purpose Fund
                                            </option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Restriction
                                        <select
                                            value={draft.restriction}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    restriction: e.target
                                                        .value as FundingSource['restriction'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Unrestricted</option>
                                            <option>Restricted</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f] sm:col-span-2">
                                        Funding Agency / Owner{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            required
                                            value={draft.agency}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    agency: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="Agency, LGU, or donor name"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Approved Allocation
                                        <input
                                            type="number"
                                            min="0"
                                            value={draft.allocation}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    allocation: e.target.value,
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
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    status: e.target
                                                        .value as FundingSource['status'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f] sm:col-span-2">
                                        Purpose / Restrictions
                                        <textarea
                                            value={draft.description}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="mt-1.5 min-h-20 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                                            placeholder="Permitted uses, donor conditions, or fund guidance"
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
                                        ＋ Add Funding Source
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
