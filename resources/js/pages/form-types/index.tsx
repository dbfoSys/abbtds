import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { dashboard } from '@/routes';

type FormType = {
    code: string;
    name: string;
    category: 'Accounting' | 'Budget' | 'Procurement' | 'Revenue' | 'Treasury';
    module: string;
    prefix: string;
    nextNumber: number;
    status: 'Active' | 'Inactive';
};
const seedForms: FormType[] = [
    {
        code: 'FT-001',
        name: 'Disbursement Voucher',
        category: 'Accounting',
        module: 'Disbursements',
        prefix: 'DV',
        nextNumber: 1251,
        status: 'Active',
    },
    {
        code: 'FT-002',
        name: 'Official Receipt',
        category: 'Revenue',
        module: 'Revenue & Collections',
        prefix: 'OR',
        nextNumber: 3482,
        status: 'Active',
    },
    {
        code: 'FT-003',
        name: 'Journal Entry Voucher',
        category: 'Accounting',
        module: 'Accounting',
        prefix: 'JEV',
        nextNumber: 877,
        status: 'Active',
    },
    {
        code: 'FT-004',
        name: 'Purchase Order',
        category: 'Procurement',
        module: 'Procurement',
        prefix: 'PO',
        nextNumber: 426,
        status: 'Active',
    },
    {
        code: 'FT-005',
        name: 'Obligation Request and Status',
        category: 'Budget',
        module: 'Obligations',
        prefix: 'OBR',
        nextNumber: 914,
        status: 'Active',
    },
    {
        code: 'FT-006',
        name: 'Check Disbursement Record',
        category: 'Treasury',
        module: 'Disbursements',
        prefix: 'CDR',
        nextNumber: 105,
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
    category: 'Accounting' as FormType['category'],
    module: 'Accounting',
    prefix: '',
    nextNumber: '1',
    status: 'Active' as FormType['status'],
};

export default function FormTypeManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [forms, setForms] = useState(seedForms);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [status, setStatus] = useState('All Statuses');
    const [modalOpen, setModalOpen] = useState(false);
    const [draft, setDraft] = useState(emptyDraft);
    const filtered = useMemo(
        () =>
            forms
                .filter(
                    (item) =>
                        category === 'All Categories' ||
                        item.category === category,
                )
                .filter(
                    (item) =>
                        status === 'All Statuses' || item.status === status,
                )
                .filter((item) =>
                    `${item.code} ${item.name} ${item.prefix} ${item.module}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                )
                .sort((a, b) => a.name.localeCompare(b.name)),
        [forms, query, category, status],
    );
    const addFormType = () => {
        if (!draft.name.trim() || !draft.prefix.trim()) {
            return;
        }

        setForms((items) => [
            ...items,
            {
                code: `FT-${String(items.length + 1).padStart(3, '0')}`,
                name: draft.name,
                category: draft.category,
                module: draft.module,
                prefix: draft.prefix.toUpperCase(),
                nextNumber: Number(draft.nextNumber) || 1,
                status: draft.status,
            },
        ]);
        setDraft(emptyDraft);
        setModalOpen(false);
    };

    return (
        <>
            <Head title="Form Type Management" />
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
                                    Form Type Management
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Configure document types, numbering
                                    prefixes, modules, and sequence controls.
                                </p>
                            </div>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="rounded-lg bg-[#0873e6] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                            >
                                ＋ Add New Form Type
                            </button>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                [
                                    '▤',
                                    'Total Form Types',
                                    forms.length,
                                    'bg-blue-50 text-blue-600',
                                ],
                                [
                                    '✓',
                                    'Active Forms',
                                    forms.filter((x) => x.status === 'Active')
                                        .length,
                                    'bg-emerald-50 text-emerald-600',
                                ],
                                [
                                    '▦',
                                    'Categories',
                                    new Set(forms.map((x) => x.category)).size,
                                    'bg-violet-50 text-violet-600',
                                ],
                                [
                                    '#',
                                    'Numbering Sequences',
                                    forms.filter((x) => x.status === 'Active')
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
                                        placeholder="Search form, code, prefix, or module..."
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
                                    <option>Accounting</option>
                                    <option>Budget</option>
                                    <option>Procurement</option>
                                    <option>Revenue</option>
                                    <option>Treasury</option>
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
                                <table className="w-full min-w-210 text-left text-sm">
                                    <thead className="bg-slate-50 text-[11px] font-bold text-[#092d62] uppercase">
                                        <tr>
                                            <th className="px-5 py-3">Code</th>
                                            <th className="px-5 py-3">
                                                Form Type
                                            </th>
                                            <th className="px-5 py-3">
                                                Category
                                            </th>
                                            <th className="px-5 py-3">
                                                Module / Usage
                                            </th>
                                            <th className="px-5 py-3">
                                                Prefix
                                            </th>
                                            <th className="px-5 py-3 text-center">
                                                Next Number
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
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {item.module}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="rounded bg-blue-50 px-2 py-1 font-mono font-bold text-blue-700">
                                                        {item.prefix}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-center font-semibold">
                                                    {String(
                                                        item.nextNumber,
                                                    ).padStart(6, '0')}
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
                                                    No form types match the
                                                    selected filters.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between border-t border-slate-200 px-5 py-4 text-xs text-slate-500">
                                <p>
                                    Showing {filtered.length} of {forms.length}{' '}
                                    form types
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
                        aria-labelledby="form-type-modal-title"
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                addFormType();
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
                                            id="form-type-modal-title"
                                            className="text-xl font-bold"
                                        >
                                            Add New Form Type
                                        </h3>
                                        <p className="text-xs text-blue-100">
                                            Configure document identity and
                                            numbering.
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
                                        Form Type Name{' '}
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
                                            placeholder="e.g. General Journal Voucher"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Category{' '}
                                        <b className="text-red-500">*</b>
                                        <select
                                            value={draft.category}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    category: e.target
                                                        .value as FormType['category'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Accounting</option>
                                            <option>Budget</option>
                                            <option>Procurement</option>
                                            <option>Revenue</option>
                                            <option>Treasury</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Module / Usage{' '}
                                        <b className="text-red-500">*</b>
                                        <select
                                            value={draft.module}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    module: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Accounting</option>
                                            <option>Budget Management</option>
                                            <option>Disbursements</option>
                                            <option>Obligations</option>
                                            <option>Procurement</option>
                                            <option>
                                                Revenue & Collections
                                            </option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Document Prefix{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            required
                                            maxLength={10}
                                            value={draft.prefix}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    prefix: e.target.value.toUpperCase(),
                                                })
                                            }
                                            className={`${inputClass} mt-1.5 font-mono uppercase`}
                                            placeholder="e.g. GJV"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Starting / Next Number
                                        <input
                                            type="number"
                                            min="1"
                                            value={draft.nextNumber}
                                            onChange={(e) =>
                                                setDraft({
                                                    ...draft,
                                                    nextNumber: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
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
                                                        .value as FormType['status'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </select>
                                    </label>
                                    <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-blue-700 sm:self-end">
                                        <b>Number preview</b>
                                        <br />
                                        <span className="font-mono">
                                            {draft.prefix || 'PREFIX'}-
                                            {String(
                                                Number(draft.nextNumber) || 1,
                                            ).padStart(6, '0')}
                                        </span>
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
                                        ＋ Add Form Type
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
