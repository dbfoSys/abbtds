import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import NotificationBell from '@/components/notification-bell';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { dashboard } from '@/routes';

type ApprovalRoute = {
    code: string;
    name: string;
    module: 'Budget' | 'Obligation' | 'Disbursement' | 'Collection';
    level: number;
    approver: string;
    office: string;
    threshold: string;
    requirement: 'Required' | 'Optional';
    status: 'Active' | 'Inactive';
};

const seed: ApprovalRoute[] = [
    {
        code: 'AR-001',
        name: 'Budget Request Review',
        module: 'Budget',
        level: 1,
        approver: 'Municipal Budget Officer',
        office: 'Municipal Budget Office',
        threshold: 'All amounts',
        requirement: 'Required',
        status: 'Active',
    },
    {
        code: 'AR-002',
        name: 'Budget Request Approval',
        module: 'Budget',
        level: 2,
        approver: 'Municipal Mayor',
        office: 'Office of the Municipal Mayor',
        threshold: 'Above ₱50,000',
        requirement: 'Required',
        status: 'Active',
    },
    {
        code: 'AR-003',
        name: 'Obligation Certification',
        module: 'Obligation',
        level: 1,
        approver: 'Municipal Accountant',
        office: 'Municipal Accounting Office',
        threshold: 'All amounts',
        requirement: 'Required',
        status: 'Active',
    },
    {
        code: 'AR-004',
        name: 'Disbursement Verification',
        module: 'Disbursement',
        level: 1,
        approver: 'Municipal Treasurer',
        office: "Municipal Treasurer's Office",
        threshold: 'All amounts',
        requirement: 'Required',
        status: 'Active',
    },
    {
        code: 'AR-005',
        name: 'Executive Disbursement Approval',
        module: 'Disbursement',
        level: 2,
        approver: 'Municipal Mayor',
        office: 'Office of the Municipal Mayor',
        threshold: 'Above ₱100,000',
        requirement: 'Required',
        status: 'Active',
    },
    {
        code: 'AR-006',
        name: 'Collection Supervisor Review',
        module: 'Collection',
        level: 1,
        approver: 'Revenue Collection Supervisor',
        office: "Municipal Treasurer's Office",
        threshold: 'Above ₱25,000',
        requirement: 'Optional',
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
    module: 'Budget' as ApprovalRoute['module'],
    level: '1',
    approver: '',
    office: '',
    threshold: '',
    requirement: 'Required' as ApprovalRoute['requirement'],
    status: 'Active' as ApprovalRoute['status'],
};

export default function ApprovalRouteManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [items, setItems] = useState(seed);
    const [query, setQuery] = useState('');
    const [module, setModule] = useState('All Modules');
    const [status, setStatus] = useState('All Statuses');
    const [modalOpen, setModalOpen] = useState(false);
    const [draft, setDraft] = useState(blank);
    const filtered = useMemo(
        () =>
            items
                .filter(
                    (item) =>
                        module === 'All Modules' || item.module === module,
                )
                .filter(
                    (item) =>
                        status === 'All Statuses' || item.status === status,
                )
                .filter((item) =>
                    `${item.code} ${item.name} ${item.approver} ${item.office}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                )
                .sort(
                    (a, b) =>
                        a.module.localeCompare(b.module) || a.level - b.level,
                ),
        [items, module, query, status],
    );

    const addItem = () => {
        if (
            !draft.name.trim() ||
            !draft.approver.trim() ||
            !draft.office.trim()
        ) {
            return;
        }

        setItems((current) => [
            ...current,
            {
                code: `AR-${String(current.length + 1).padStart(3, '0')}`,
                name: draft.name,
                module: draft.module,
                level: Number(draft.level),
                approver: draft.approver,
                office: draft.office,
                threshold: draft.threshold || 'All amounts',
                requirement: draft.requirement,
                status: draft.status,
            },
        ]);
        setDraft(blank);
        setModalOpen(false);
    };

    return (
        <>
            <Head title="Approval Route/Level Management" />
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
                                    Approval Route/Level Management
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Configure sequential approvals, responsible
                                    officials, and transaction thresholds.
                                </p>
                            </div>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="rounded-lg bg-[#0873e6] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                            >
                                ＋ Add Approval Route
                            </button>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                [
                                    '⇢',
                                    'Approval Routes',
                                    items.length,
                                    'bg-blue-50 text-blue-600',
                                ],
                                [
                                    '✓',
                                    'Active Routes',
                                    items.filter(
                                        (item) => item.status === 'Active',
                                    ).length,
                                    'bg-emerald-50 text-emerald-600',
                                ],
                                [
                                    '▦',
                                    'Transaction Modules',
                                    new Set(items.map((item) => item.module))
                                        .size,
                                    'bg-violet-50 text-violet-600',
                                ],
                                [
                                    '◆',
                                    'Required Approvals',
                                    items.filter(
                                        (item) =>
                                            item.requirement === 'Required',
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
                            <div className="grid gap-3 border-b border-slate-200 p-4 md:grid-cols-[minmax(240px,1fr)_190px_180px_auto]">
                                <input
                                    value={query}
                                    onChange={(event) =>
                                        setQuery(event.target.value)
                                    }
                                    placeholder="Search route, approver, or office..."
                                    className={inputClass}
                                />
                                <select
                                    value={module}
                                    onChange={(event) =>
                                        setModule(event.target.value)
                                    }
                                    className={inputClass}
                                >
                                    <option>All Modules</option>
                                    <option>Budget</option>
                                    <option>Obligation</option>
                                    <option>Disbursement</option>
                                    <option>Collection</option>
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
                                        setModule('All Modules');
                                        setStatus('All Statuses');
                                    }}
                                    className="h-10 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-600"
                                >
                                    Reset
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-250 text-left text-sm">
                                    <thead className="bg-slate-50 text-[11px] font-bold text-[#092d62] uppercase">
                                        <tr>
                                            <th className="px-5 py-3">Code</th>
                                            <th className="px-5 py-3">
                                                Route Name
                                            </th>
                                            <th className="px-5 py-3">
                                                Module
                                            </th>
                                            <th className="px-5 py-3">Level</th>
                                            <th className="px-5 py-3">
                                                Approver / Role
                                            </th>
                                            <th className="px-5 py-3">
                                                Office
                                            </th>
                                            <th className="px-5 py-3">
                                                Threshold
                                            </th>
                                            <th className="px-5 py-3">
                                                Requirement
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
                                                    {item.module}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="flex size-7 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                                                        {item.level}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-slate-700">
                                                    {item.approver}
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {item.office}
                                                </td>
                                                <td className="px-5 py-4 font-semibold">
                                                    {item.threshold}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.requirement === 'Required' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'}`}
                                                    >
                                                        {item.requirement}
                                                    </span>
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
                                    No approval routes match the selected
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
                        aria-labelledby="approval-modal-title"
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
                                        id="approval-modal-title"
                                        className="text-xl font-bold"
                                    >
                                        Add Approval Route/Level
                                    </h3>
                                    <p className="text-xs text-blue-100">
                                        Define a transaction approval step and
                                        responsible role.
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
                                    Route Name <b className="text-red-500">*</b>
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
                                        placeholder="e.g. Purchase Order Final Approval"
                                    />
                                </label>
                                <label className="text-xs font-semibold text-[#17345f]">
                                    Transaction Module
                                    <select
                                        value={draft.module}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                module: event.target
                                                    .value as ApprovalRoute['module'],
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                    >
                                        <option>Budget</option>
                                        <option>Obligation</option>
                                        <option>Disbursement</option>
                                        <option>Collection</option>
                                    </select>
                                </label>
                                <label className="text-xs font-semibold text-[#17345f]">
                                    Approval Level
                                    <input
                                        type="number"
                                        min="1"
                                        value={draft.level}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                level: event.target.value,
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                    />
                                </label>
                                <label className="text-xs font-semibold text-[#17345f]">
                                    Approver / Role{' '}
                                    <b className="text-red-500">*</b>
                                    <input
                                        required
                                        value={draft.approver}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                approver: event.target.value,
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                        placeholder="Official title or assigned role"
                                    />
                                </label>
                                <label className="text-xs font-semibold text-[#17345f]">
                                    Responsible Office{' '}
                                    <b className="text-red-500">*</b>
                                    <input
                                        required
                                        value={draft.office}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                office: event.target.value,
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                        placeholder="Office or responsibility center"
                                    />
                                </label>
                                <label className="text-xs font-semibold text-[#17345f]">
                                    Amount Threshold
                                    <input
                                        value={draft.threshold}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                threshold: event.target.value,
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                        placeholder="e.g. Above ₱50,000"
                                    />
                                </label>
                                <label className="text-xs font-semibold text-[#17345f]">
                                    Requirement
                                    <select
                                        value={draft.requirement}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                requirement: event.target
                                                    .value as ApprovalRoute['requirement'],
                                            })
                                        }
                                        className={`${inputClass} mt-1.5`}
                                    >
                                        <option>Required</option>
                                        <option>Optional</option>
                                    </select>
                                </label>
                                <label className="text-xs font-semibold text-[#17345f] sm:col-span-2">
                                    Status
                                    <select
                                        value={draft.status}
                                        onChange={(event) =>
                                            setDraft({
                                                ...draft,
                                                status: event.target
                                                    .value as ApprovalRoute['status'],
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
                                    ＋ Add Approval Route
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}
