import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import NotificationBell from '@/components/notification-bell';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { dashboard } from '@/routes';

type Payee = {
    code: string;
    name: string;
    type: 'Individual' | 'Supplier' | 'Government Agency';
    tin: string;
    contact: string;
    address: string;
    status: 'Active' | 'Inactive';
};

const seedPayees: Payee[] = [
    {
        code: 'PAY-0001',
        name: 'Juan Dela Cruz',
        type: 'Individual',
        tin: '123-456-789-000',
        contact: '0917 123 4567',
        address: 'Poblacion, Villanueva',
        status: 'Active',
    },
    {
        code: 'PAY-0002',
        name: 'Northern Mindanao Office Supplies',
        type: 'Supplier',
        tin: '234-567-890-000',
        contact: '(088) 856-1122',
        address: 'Cagayan de Oro City',
        status: 'Active',
    },
    {
        code: 'PAY-0003',
        name: 'Philippine Health Insurance Corporation',
        type: 'Government Agency',
        tin: '000-100-987-000',
        contact: '(088) 857-1780',
        address: 'Cagayan de Oro City',
        status: 'Active',
    },
    {
        code: 'PAY-0004',
        name: 'Maria Santos',
        type: 'Individual',
        tin: '345-678-901-000',
        contact: '0918 234 5678',
        address: 'Balacanas, Villanueva',
        status: 'Active',
    },
    {
        code: 'PAY-0005',
        name: 'Villanueva Hardware and Construction',
        type: 'Supplier',
        tin: '456-789-012-000',
        contact: '0919 345 6789',
        address: 'Katipunan, Villanueva',
        status: 'Active',
    },
    {
        code: 'PAY-0006',
        name: 'Misamis Oriental Water District',
        type: 'Government Agency',
        tin: '567-890-123-000',
        contact: '(088) 856-3300',
        address: 'Misamis Oriental',
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
const emptyDraft = {
    name: '',
    type: 'Individual' as Payee['type'],
    tin: '',
    contact: '',
    email: '',
    address: '',
    bank: '',
    account: '',
    status: 'Active' as Payee['status'],
};

export default function PayeeManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [payees, setPayees] = useState(seedPayees);
    const [query, setQuery] = useState('');
    const [type, setType] = useState('All Types');
    const [status, setStatus] = useState('All Statuses');
    const [modalOpen, setModalOpen] = useState(false);
    const [draft, setDraft] = useState(emptyDraft);
    const filtered = useMemo(
        () =>
            payees
                .filter((payee) => type === 'All Types' || payee.type === type)
                .filter(
                    (payee) =>
                        status === 'All Statuses' || payee.status === status,
                )
                .filter((payee) =>
                    `${payee.code} ${payee.name} ${payee.tin} ${payee.address}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                )
                .sort((a, b) => a.name.localeCompare(b.name)),
        [payees, query, type, status],
    );

    const addPayee = () => {
        if (!draft.name.trim() || !draft.address.trim()) {
            return;
        }

        setPayees((items) => [
            ...items,
            {
                code: `PAY-${String(items.length + 1).padStart(4, '0')}`,
                name: draft.name,
                type: draft.type,
                tin: draft.tin || 'Not provided',
                contact: draft.contact || 'Not provided',
                address: draft.address,
                status: draft.status,
            },
        ]);
        setDraft(emptyDraft);
        setModalOpen(false);
    };

    return (
        <>
            <Head title="Payee Management" />
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
                                    Payee Management
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Maintain individuals, suppliers, and
                                    agencies eligible for municipal payments.
                                </p>
                            </div>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="rounded-lg bg-[#0873e6] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                            >
                                ＋ Add New Payee
                            </button>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                [
                                    '♟',
                                    'Total Payees',
                                    payees.length,
                                    'bg-blue-50 text-blue-600',
                                ],
                                [
                                    '✓',
                                    'Active Payees',
                                    payees.filter(
                                        (item) => item.status === 'Active',
                                    ).length,
                                    'bg-emerald-50 text-emerald-600',
                                ],
                                [
                                    '▣',
                                    'Suppliers',
                                    payees.filter(
                                        (item) => item.type === 'Supplier',
                                    ).length,
                                    'bg-violet-50 text-violet-600',
                                ],
                                [
                                    '⌂',
                                    'Government Agencies',
                                    payees.filter(
                                        (item) =>
                                            item.type === 'Government Agency',
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
                                <label className="relative">
                                    <span className="absolute top-2.5 left-3 text-slate-400">
                                        ⌕
                                    </span>
                                    <input
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        placeholder="Search payee, code, TIN, or address..."
                                        className={`${inputClass} pl-9`}
                                    />
                                </label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className={inputClass}
                                >
                                    <option>All Types</option>
                                    <option>Individual</option>
                                    <option>Supplier</option>
                                    <option>Government Agency</option>
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
                                                Payee Code
                                            </th>
                                            <th className="px-5 py-3">
                                                Payee Name
                                            </th>
                                            <th className="px-5 py-3">Type</th>
                                            <th className="px-5 py-3">TIN</th>
                                            <th className="px-5 py-3">
                                                Contact
                                            </th>
                                            <th className="px-5 py-3">
                                                Address
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
                                        {filtered.map((payee) => (
                                            <tr
                                                key={payee.code}
                                                className="hover:bg-blue-50/40"
                                            >
                                                <td className="px-5 py-4 font-semibold text-blue-600">
                                                    {payee.code}
                                                </td>
                                                <td className="px-5 py-4 font-semibold text-[#092d62]">
                                                    {payee.name}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                                        {payee.type}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {payee.tin}
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {payee.contact}
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {payee.address}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${payee.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}
                                                    >
                                                        {payee.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <button
                                                        className="rounded-md p-2 text-blue-600 hover:bg-blue-50"
                                                        aria-label={`Edit ${payee.name}`}
                                                    >
                                                        ✎
                                                    </button>
                                                    <button
                                                        className="rounded-md p-2 text-red-500 hover:bg-red-50"
                                                        aria-label={`Delete ${payee.name}`}
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
                                                    No payees match the selected
                                                    filters.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between border-t border-slate-200 px-5 py-4 text-xs text-slate-500">
                                <p>
                                    Showing {filtered.length} of {payees.length}{' '}
                                    payees
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
                        aria-labelledby="payee-modal-title"
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                addPayee();
                            }}
                            className="flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                        >
                            <div className="flex items-center justify-between bg-gradient-to-r from-[#063b76] to-[#0873e6] px-6 py-5 text-white">
                                <div className="flex items-center gap-4">
                                    <span className="flex size-11 items-center justify-center rounded-xl bg-white/15 text-2xl">
                                        ♟
                                    </span>
                                    <div>
                                        <h3
                                            id="payee-modal-title"
                                            className="text-xl font-bold"
                                        >
                                            Add New Payee
                                        </h3>
                                        <p className="text-xs text-blue-100">
                                            Register payment recipient
                                            information.
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
                                        Payee / Business Name{' '}
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
                                            placeholder="Enter complete name"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Payee Type{' '}
                                        <b className="text-red-500">*</b>
                                        <select
                                            value={draft.type}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    type: e.target
                                                        .value as Payee['type'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Individual</option>
                                            <option>Supplier</option>
                                            <option>Government Agency</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        TIN
                                        <input
                                            value={draft.tin}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    tin: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="000-000-000-000"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Contact Number
                                        <input
                                            value={draft.contact}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    contact: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="Phone or mobile number"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Email Address
                                        <input
                                            type="email"
                                            value={draft.email}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    email: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="payee@example.com"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f] sm:col-span-2">
                                        Complete Address{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            required
                                            value={draft.address}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    address: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="Street, barangay, city / municipality, province"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Bank Name
                                        <input
                                            value={draft.bank}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    bank: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="Optional"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Account Number
                                        <input
                                            value={draft.account}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    account: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="Optional"
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
                                                        .value as Payee['status'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </select>
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
                                        ＋ Add Payee
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
