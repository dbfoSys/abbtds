import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import NotificationBell from '@/components/notification-bell';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { dashboard } from '@/routes';

type Bank = {
    code: string;
    bank: string;
    branch: string;
    accountName: string;
    accountNumber: string;
    type: 'Current' | 'Savings' | 'Trust';
    fund: string;
    status: 'Active' | 'Inactive';
};
const seedBanks: Bank[] = [
    {
        code: 'BNK-001',
        bank: 'Land Bank of the Philippines',
        branch: 'Villanueva Branch',
        accountName: 'Municipality of Villanueva - General Fund',
        accountNumber: '•••• •••• 4821',
        type: 'Current',
        fund: 'General Fund',
        status: 'Active',
    },
    {
        code: 'BNK-002',
        bank: 'Development Bank of the Philippines',
        branch: 'Cagayan de Oro Branch',
        accountName: 'Municipality of Villanueva - Trust Fund',
        accountNumber: '•••• •••• 1976',
        type: 'Trust',
        fund: 'Trust Fund',
        status: 'Active',
    },
    {
        code: 'BNK-003',
        bank: 'Land Bank of the Philippines',
        branch: 'Villanueva Branch',
        accountName: 'Municipality of Villanueva - Special Education Fund',
        accountNumber: '•••• •••• 6304',
        type: 'Current',
        fund: 'Special Education Fund',
        status: 'Active',
    },
    {
        code: 'BNK-004',
        bank: 'Philippine National Bank',
        branch: 'Tagoloan Branch',
        accountName: 'Municipality of Villanueva - Development Fund',
        accountNumber: '•••• •••• 2510',
        type: 'Savings',
        fund: 'Development Fund',
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
    bank: '',
    branch: '',
    accountName: '',
    accountNumber: '',
    type: 'Current' as Bank['type'],
    fund: 'General Fund',
    swift: '',
    status: 'Active' as Bank['status'],
};

export default function BankDetailsManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [banks, setBanks] = useState(seedBanks);
    const [query, setQuery] = useState('');
    const [type, setType] = useState('All Account Types');
    const [status, setStatus] = useState('All Statuses');
    const [modalOpen, setModalOpen] = useState(false);
    const [draft, setDraft] = useState(blank);
    const filtered = useMemo(
        () =>
            banks
                .filter((x) => type === 'All Account Types' || x.type === type)
                .filter((x) => status === 'All Statuses' || x.status === status)
                .filter((x) =>
                    `${x.code} ${x.bank} ${x.branch} ${x.accountName} ${x.fund}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                )
                .sort(
                    (a, b) =>
                        a.bank.localeCompare(b.bank) ||
                        a.accountName.localeCompare(b.accountName),
                ),
        [banks, query, type, status],
    );
    const addBank = () => {
        if (
            !draft.bank.trim() ||
            !draft.accountName.trim() ||
            !draft.accountNumber.trim()
        ) {
            return;
        }

        setBanks((items) => [
            ...items,
            {
                code: `BNK-${String(items.length + 1).padStart(3, '0')}`,
                bank: draft.bank,
                branch: draft.branch || 'Main Branch',
                accountName: draft.accountName,
                accountNumber: `•••• •••• ${draft.accountNumber.slice(-4)}`,
                type: draft.type,
                fund: draft.fund,
                status: draft.status,
            },
        ]);
        setDraft(blank);
        setModalOpen(false);
    };

    return (
        <>
            <Head title="Bank Details Management" />
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
                                    Bank Details Management
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Maintain municipal bank accounts, branches,
                                    account types, and linked funds.
                                </p>
                            </div>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="rounded-lg bg-[#0873e6] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                            >
                                ＋ Add Bank Details
                            </button>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                [
                                    '▣',
                                    'Bank Accounts',
                                    banks.length,
                                    'bg-blue-50 text-blue-600',
                                ],
                                [
                                    '✓',
                                    'Active Accounts',
                                    banks.filter((x) => x.status === 'Active')
                                        .length,
                                    'bg-emerald-50 text-emerald-600',
                                ],
                                [
                                    '⌂',
                                    'Banking Institutions',
                                    new Set(banks.map((x) => x.bank)).size,
                                    'bg-violet-50 text-violet-600',
                                ],
                                [
                                    '◇',
                                    'Linked Funds',
                                    new Set(banks.map((x) => x.fund)).size,
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
                                        placeholder="Search bank, account, branch, or fund..."
                                        className={`${inputClass} pl-9`}
                                    />
                                </label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className={inputClass}
                                >
                                    <option>All Account Types</option>
                                    <option>Current</option>
                                    <option>Savings</option>
                                    <option>Trust</option>
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
                                        setType('All Account Types');
                                        setStatus('All Statuses');
                                    }}
                                    className="h-10 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-600"
                                >
                                    Reset
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-230 text-left text-sm">
                                    <thead className="bg-slate-50 text-[11px] font-bold text-[#092d62] uppercase">
                                        <tr>
                                            <th className="px-5 py-3">Code</th>
                                            <th className="px-5 py-3">
                                                Bank / Branch
                                            </th>
                                            <th className="px-5 py-3">
                                                Account Name
                                            </th>
                                            <th className="px-5 py-3">
                                                Account Number
                                            </th>
                                            <th className="px-5 py-3">Type</th>
                                            <th className="px-5 py-3">
                                                Linked Fund
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
                                                <td className="px-5 py-4">
                                                    <p className="font-semibold text-[#092d62]">
                                                        {item.bank}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {item.branch}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {item.accountName}
                                                </td>
                                                <td className="px-5 py-4 font-mono font-semibold text-slate-700">
                                                    {item.accountNumber}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                                        {item.type}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {item.fund}
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
                                                        aria-label={`Edit ${item.accountName}`}
                                                    >
                                                        ✎
                                                    </button>
                                                    <button
                                                        className="rounded-md p-2 text-red-500 hover:bg-red-50"
                                                        aria-label={`Delete ${item.accountName}`}
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
                                                    No bank details match the
                                                    selected filters.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between border-t border-slate-200 px-5 py-4 text-xs text-slate-500">
                                <p>
                                    Showing {filtered.length} of {banks.length}{' '}
                                    bank accounts
                                </p>
                                <span>
                                    Account numbers are masked for security
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
                        aria-labelledby="bank-modal-title"
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                addBank();
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
                                            id="bank-modal-title"
                                            className="text-xl font-bold"
                                        >
                                            Add Bank Details
                                        </h3>
                                        <p className="text-xs text-blue-100">
                                            Register a municipal depository
                                            account.
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
                                        Bank Name{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            required
                                            autoFocus
                                            value={draft.bank}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    bank: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="Enter bank name"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Branch
                                        <input
                                            value={draft.branch}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    branch: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="Branch name / location"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f] sm:col-span-2">
                                        Account Name{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            required
                                            value={draft.accountName}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    accountName: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="Official account name"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Account Number{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            required
                                            value={draft.accountNumber}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    accountNumber:
                                                        e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5 font-mono`}
                                            placeholder="Enter account number"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Account Type{' '}
                                        <b className="text-red-500">*</b>
                                        <select
                                            value={draft.type}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    type: e.target
                                                        .value as Bank['type'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Current</option>
                                            <option>Savings</option>
                                            <option>Trust</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Linked Fund
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
                                            <option>Trust Fund</option>
                                            <option>
                                                Special Education Fund
                                            </option>
                                            <option>Development Fund</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        SWIFT / Bank Code
                                        <input
                                            value={draft.swift}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    swift: e.target.value.toUpperCase(),
                                                })
                                            }
                                            className={`${inputClass} mt-1.5 uppercase`}
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
                                                        .value as Bank['status'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </select>
                                    </label>
                                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-[11px] leading-5 text-amber-700 sm:self-end">
                                        <b>Security notice</b>
                                        <br />
                                        Account numbers are masked in the
                                        directory.
                                    </div>
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
                                        ＋ Add Bank Details
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
