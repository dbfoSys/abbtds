import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import NotificationBell from '@/components/notification-bell';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { dashboard } from '@/routes';

type Center = {
    code: string;
    name: string;
    type: 'Municipal Office' | 'Barangay' | 'Special Unit';
    head: string;
    parent: string;
    fiscalYear: string;
    status: 'Active' | 'Inactive';
};

const seed: Center[] = [
    {
        code: 'RC-101',
        name: 'Office of the Municipal Mayor',
        type: 'Municipal Office',
        head: 'Hon. Jennie Rosalie T. Uy',
        parent: 'Municipality of Villanueva',
        fiscalYear: '2026',
        status: 'Active',
    },
    {
        code: 'RC-102',
        name: "Municipal Treasurer's Office",
        type: 'Municipal Office',
        head: 'Maria Fe S. Dela Cruz',
        parent: 'Office of the Municipal Mayor',
        fiscalYear: '2026',
        status: 'Active',
    },
    {
        code: 'RC-103',
        name: 'Municipal Accounting Office',
        type: 'Municipal Office',
        head: 'Engr. Rexford M. Uy',
        parent: 'Office of the Municipal Mayor',
        fiscalYear: '2026',
        status: 'Active',
    },
    {
        code: 'RC-104',
        name: 'Municipal Budget Office',
        type: 'Municipal Office',
        head: 'Ana Marie P. Santos',
        parent: 'Office of the Municipal Mayor',
        fiscalYear: '2026',
        status: 'Active',
    },
    {
        code: 'RC-201',
        name: 'Barangay Poblacion 1',
        type: 'Barangay',
        head: 'Punong Barangay',
        parent: 'Municipality of Villanueva',
        fiscalYear: '2026',
        status: 'Active',
    },
    {
        code: 'RC-301',
        name: 'Local Disaster Risk Reduction Office',
        type: 'Special Unit',
        head: 'MDRRMO Officer',
        parent: 'Office of the Municipal Mayor',
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
    code: '',
    type: 'Municipal Office' as Center['type'],
    head: '',
    parent: 'Municipality of Villanueva',
    fiscalYear: '2026',
    status: 'Active' as Center['status'],
};

export default function ResponsibilityCenterManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [items, setItems] = useState(seed);
    const [query, setQuery] = useState('');
    const [type, setType] = useState('All Types');
    const [status, setStatus] = useState('All Statuses');
    const [modalOpen, setModalOpen] = useState(false);
    const [draft, setDraft] = useState(blank);
    const filtered = useMemo(
        () =>
            items
                .filter((item) => type === 'All Types' || item.type === type)
                .filter(
                    (item) =>
                        status === 'All Statuses' || item.status === status,
                )
                .filter((item) =>
                    `${item.code} ${item.name} ${item.head} ${item.parent}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                )
                .sort((a, b) => a.name.localeCompare(b.name)),
        [items, query, status, type],
    );

    const addItem = () => {
        if (!draft.name.trim() || !draft.code.trim() || !draft.head.trim()) {
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
            <Head title="Responsibility Center Management" />
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
                                    Responsibility Center Management
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Maintain municipal offices, barangays, and
                                    accountable organizational units.
                                </p>
                            </div>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="rounded-lg bg-[#0873e6] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                            >
                                ＋ Add Responsibility Center
                            </button>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                [
                                    '◎',
                                    'Responsibility Centers',
                                    items.length,
                                    'bg-blue-50 text-blue-600',
                                ],
                                [
                                    '✓',
                                    'Active Centers',
                                    items.filter(
                                        (item) => item.status === 'Active',
                                    ).length,
                                    'bg-emerald-50 text-emerald-600',
                                ],
                                [
                                    '▦',
                                    'Municipal Offices',
                                    items.filter(
                                        (item) =>
                                            item.type === 'Municipal Office',
                                    ).length,
                                    'bg-violet-50 text-violet-600',
                                ],
                                [
                                    '⌂',
                                    'Barangay Centers',
                                    items.filter(
                                        (item) => item.type === 'Barangay',
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
                            <div className="grid gap-3 border-b border-slate-200 p-4 md:grid-cols-[minmax(240px,1fr)_210px_180px_auto]">
                                <input
                                    value={query}
                                    onChange={(event) =>
                                        setQuery(event.target.value)
                                    }
                                    placeholder="Search code, center, head, or parent..."
                                    className={inputClass}
                                />
                                <select
                                    value={type}
                                    onChange={(event) =>
                                        setType(event.target.value)
                                    }
                                    className={inputClass}
                                >
                                    <option>All Types</option>
                                    <option>Municipal Office</option>
                                    <option>Barangay</option>
                                    <option>Special Unit</option>
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
                                        setType('All Types');
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
                                                Center Code
                                            </th>
                                            <th className="px-5 py-3">
                                                Responsibility Center
                                            </th>
                                            <th className="px-5 py-3">Type</th>
                                            <th className="px-5 py-3">
                                                Center Head
                                            </th>
                                            <th className="px-5 py-3">
                                                Parent Center
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
                                                        {item.type}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {item.head}
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {item.parent}
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
                                    No responsibility centers match the selected
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
                        aria-labelledby="center-modal-title"
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
                                        id="center-modal-title"
                                        className="text-xl font-bold"
                                    >
                                        Add Responsibility Center
                                    </h3>
                                    <p className="text-xs text-blue-100">
                                        Register an accountable office or
                                        organizational unit.
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
                                <label className="text-xs font-semibold text-[#17345f]">
                                    Center Code{' '}
                                    <b className="text-red-500">*</b>
                                    <input
                                        required
                                        autoFocus
                                        value={draft.code}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                code: event.target.value,
                                            })
                                        }
                                        className={`${inputClass} mt-1.5 font-mono uppercase`}
                                        placeholder="e.g. RC-105"
                                    />
                                </label>
                                <label className="text-xs font-semibold text-[#17345f]">
                                    Center Type
                                    <select
                                        value={draft.type}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                type: event.target
                                                    .value as Center['type'],
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                    >
                                        <option>Municipal Office</option>
                                        <option>Barangay</option>
                                        <option>Special Unit</option>
                                    </select>
                                </label>
                                <label className="text-xs font-semibold text-[#17345f] sm:col-span-2">
                                    Responsibility Center Name{' '}
                                    <b className="text-red-500">*</b>
                                    <input
                                        required
                                        value={draft.name}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                name: event.target.value,
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                        placeholder="Official office or unit name"
                                    />
                                </label>
                                <label className="text-xs font-semibold text-[#17345f]">
                                    Center Head{' '}
                                    <b className="text-red-500">*</b>
                                    <input
                                        required
                                        value={draft.head}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                head: event.target.value,
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                        placeholder="Name or official designation"
                                    />
                                </label>
                                <label className="text-xs font-semibold text-[#17345f]">
                                    Parent Center
                                    <input
                                        value={draft.parent}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                parent: event.target.value,
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                    />
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
                                    Status
                                    <select
                                        value={draft.status}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                status: event.target
                                                    .value as Center['status'],
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                    >
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
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
                                    ＋ Add Center
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}
