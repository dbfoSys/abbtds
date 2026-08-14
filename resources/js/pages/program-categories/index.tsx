import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { dashboard } from '@/routes';

type Program = {
    code: string;
    name: string;
    type: 'Program' | 'Project' | 'Activity';
    sector:
        | 'General Public Services'
        | 'Social Services'
        | 'Economic Services'
        | 'Environmental Management';
    office: string;
    fund: string;
    allocation: string;
    utilization: number;
    status: 'Active' | 'Inactive';
};
const seed: Program[] = [
    {
        code: 'PPA-001',
        name: 'Local Governance and Administration',
        type: 'Program',
        sector: 'General Public Services',
        office: 'Office of the Mayor',
        fund: 'General Fund',
        allocation: '₱48,500,000',
        utilization: 64,
        status: 'Active',
    },
    {
        code: 'PPA-002',
        name: 'Public Health and Nutrition Services',
        type: 'Program',
        sector: 'Social Services',
        office: 'Municipal Health Office',
        fund: 'General Fund',
        allocation: '₱36,750,000',
        utilization: 71,
        status: 'Active',
    },
    {
        code: 'PPA-003',
        name: 'Farm-to-Market Road Development',
        type: 'Project',
        sector: 'Economic Services',
        office: 'Municipal Engineering Office',
        fund: '20% Development Fund',
        allocation: '₱28,000,000',
        utilization: 42,
        status: 'Active',
    },
    {
        code: 'PPA-004',
        name: 'Solid Waste Management',
        type: 'Program',
        sector: 'Environmental Management',
        office: 'MENRO',
        fund: 'General Fund',
        allocation: '₱12,400,000',
        utilization: 58,
        status: 'Active',
    },
    {
        code: 'PPA-005',
        name: 'Scholarship Assistance',
        type: 'Activity',
        sector: 'Social Services',
        office: 'MSWDO',
        fund: 'Special Education Fund',
        allocation: '₱8,500,000',
        utilization: 83,
        status: 'Active',
    },
    {
        code: 'PPA-006',
        name: 'Legacy Market Rehabilitation',
        type: 'Project',
        sector: 'Economic Services',
        office: 'Municipal Engineering Office',
        fund: 'Development Fund',
        allocation: '₱6,200,000',
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
    type: 'Program' as Program['type'],
    sector: 'General Public Services' as Program['sector'],
    office: '',
    fund: 'General Fund',
    allocation: '',
    description: '',
    status: 'Active' as Program['status'],
};

export default function ProgramCategoryManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [items, setItems] = useState(seed);
    const [query, setQuery] = useState('');
    const [sector, setSector] = useState('All Sectors');
    const [status, setStatus] = useState('All Statuses');
    const [modalOpen, setModalOpen] = useState(false);
    const [draft, setDraft] = useState(blank);
    const filtered = useMemo(
        () =>
            items
                .filter((x) => sector === 'All Sectors' || x.sector === sector)
                .filter((x) => status === 'All Statuses' || x.status === status)
                .filter((x) =>
                    `${x.code} ${x.name} ${x.office} ${x.fund}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                )
                .sort((a, b) => a.name.localeCompare(b.name)),
        [items, query, sector, status],
    );
    const addItem = () => {
        if (!draft.name.trim() || !draft.office.trim()) {
            return;
        }

        setItems((current) => [
            ...current,
            {
                code: `PPA-${String(current.length + 1).padStart(3, '0')}`,
                name: draft.name,
                type: draft.type,
                sector: draft.sector,
                office: draft.office,
                fund: draft.fund,
                allocation: draft.allocation
                    ? `₱${Number(draft.allocation).toLocaleString('en-PH')}`
                    : '₱0',
                utilization: 0,
                status: draft.status,
            },
        ]);
        setDraft(blank);
        setModalOpen(false);
    };

    return (
        <>
            <Head title="Program / Category Management" />
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
                            <span className="relative text-2xl">
                                ♧
                                <b className="absolute -top-1 -right-2 flex size-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white">
                                    3
                                </b>
                            </span>
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
                                    Program / Category Management
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Maintain programs, projects, activities,
                                    sector assignments, and budget allocations.
                                </p>
                            </div>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="rounded-lg bg-[#0873e6] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                            >
                                ＋ Add Program / Category
                            </button>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                [
                                    '▣',
                                    'Programs / Categories',
                                    items.length,
                                    'bg-blue-50 text-blue-600',
                                ],
                                [
                                    '✓',
                                    'Active Records',
                                    items.filter((x) => x.status === 'Active')
                                        .length,
                                    'bg-emerald-50 text-emerald-600',
                                ],
                                [
                                    '▦',
                                    'Service Sectors',
                                    new Set(items.map((x) => x.sector)).size,
                                    'bg-violet-50 text-violet-600',
                                ],
                                [
                                    '₱',
                                    'Total Allocation',
                                    '₱140.35M',
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
                            <div className="grid gap-3 border-b border-slate-200 p-4 md:grid-cols-[minmax(240px,1fr)_230px_180px_auto]">
                                <label className="relative">
                                    <span className="absolute top-2.5 left-3 text-slate-400">
                                        ⌕
                                    </span>
                                    <input
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        placeholder="Search code, program, office, or fund..."
                                        className={`${inputClass} pl-9`}
                                    />
                                </label>
                                <select
                                    value={sector}
                                    onChange={(e) => setSector(e.target.value)}
                                    className={inputClass}
                                >
                                    <option>All Sectors</option>
                                    <option>General Public Services</option>
                                    <option>Social Services</option>
                                    <option>Economic Services</option>
                                    <option>Environmental Management</option>
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
                                        setSector('All Sectors');
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
                                                Program / Category
                                            </th>
                                            <th className="px-5 py-3">Type</th>
                                            <th className="px-5 py-3">
                                                Sector
                                            </th>
                                            <th className="px-5 py-3">
                                                Responsible Office
                                            </th>
                                            <th className="px-5 py-3">Fund</th>
                                            <th className="px-5 py-3 text-right">
                                                Allocation
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
                                                    {item.sector}
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {item.office}
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {item.fund}
                                                </td>
                                                <td className="px-5 py-4 text-right font-semibold text-[#092d62]">
                                                    {item.allocation}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="w-24">
                                                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                                                            <div
                                                                className="h-full rounded-full bg-blue-500"
                                                                style={{
                                                                    width: `${item.utilization}%`,
                                                                }}
                                                            />
                                                        </div>
                                                        <p className="mt-1 text-[10px] text-slate-500">
                                                            {item.utilization}%
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
                                                    No programs or categories
                                                    match the selected filters.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between border-t border-slate-200 px-5 py-4 text-xs text-slate-500">
                                <p>
                                    Showing {filtered.length} of {items.length}{' '}
                                    records
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
                        aria-labelledby="program-modal-title"
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
                                        ▣
                                    </span>
                                    <div>
                                        <h3
                                            id="program-modal-title"
                                            className="text-xl font-bold"
                                        >
                                            Add Program / Category
                                        </h3>
                                        <p className="text-xs text-blue-100">
                                            Register a program, project, or
                                            activity.
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
                                        Name <b className="text-red-500">*</b>
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
                                            placeholder="Enter program, project, or activity name"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Record Type
                                        <select
                                            value={draft.type}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    type: e.target
                                                        .value as Program['type'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Program</option>
                                            <option>Project</option>
                                            <option>Activity</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Service Sector
                                        <select
                                            value={draft.sector}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    sector: e.target
                                                        .value as Program['sector'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>
                                                General Public Services
                                            </option>
                                            <option>Social Services</option>
                                            <option>Economic Services</option>
                                            <option>
                                                Environmental Management
                                            </option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Responsible Office{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            required
                                            value={draft.office}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    office: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="Office / department"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Funding Source
                                        <select
                                            value={draft.fund}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    fund: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>General Fund</option>
                                            <option>
                                                20% Development Fund
                                            </option>
                                            <option>
                                                Special Education Fund
                                            </option>
                                            <option>Trust Fund</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Annual Allocation
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
                                                        .value as Program['status'],
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
                                            value={draft.description}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="mt-1.5 min-h-20 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                                            placeholder="Purpose, scope, or implementation notes"
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
                                        ＋ Add Program / Category
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
