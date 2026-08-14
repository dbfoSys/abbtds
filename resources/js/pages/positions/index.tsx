import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { dashboard } from '@/routes';

type Position = {
    code: string;
    title: string;
    category: 'Elective' | 'Appointive' | 'Administrative';
    office: string;
    salaryGrade: string;
    status: 'Active' | 'Inactive';
};

const initialPositions: Position[] = [
    {
        code: 'POS-001',
        title: 'Municipal Mayor',
        category: 'Elective',
        office: 'Office of the Mayor',
        salaryGrade: '30',
        status: 'Active',
    },
    {
        code: 'POS-002',
        title: 'Municipal Vice Mayor',
        category: 'Elective',
        office: 'Sangguniang Bayan',
        salaryGrade: '28',
        status: 'Active',
    },
    {
        code: 'POS-003',
        title: 'Municipal Administrator',
        category: 'Appointive',
        office: 'Office of the Mayor',
        salaryGrade: '24',
        status: 'Active',
    },
    {
        code: 'POS-004',
        title: 'Municipal Treasurer',
        category: 'Appointive',
        office: "Municipal Treasurer's Office",
        salaryGrade: '24',
        status: 'Active',
    },
    {
        code: 'POS-005',
        title: 'Municipal Accountant',
        category: 'Appointive',
        office: "Municipal Accountant's Office",
        salaryGrade: '24',
        status: 'Active',
    },
    {
        code: 'POS-006',
        title: 'Budget Officer',
        category: 'Appointive',
        office: 'Municipal Budget Office',
        salaryGrade: '24',
        status: 'Active',
    },
    {
        code: 'POS-007',
        title: 'Administrative Assistant',
        category: 'Administrative',
        office: 'Office of the Mayor',
        salaryGrade: '8',
        status: 'Active',
    },
    {
        code: 'POS-008',
        title: 'Records Officer',
        category: 'Administrative',
        office: 'General Services Office',
        salaryGrade: '11',
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

export default function PositionManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [status, setStatus] = useState('All Statuses');
    const [modalOpen, setModalOpen] = useState(false);
    const [positions, setPositions] = useState(initialPositions);
    const [draft, setDraft] = useState({
        title: '',
        category: 'Appointive' as Position['category'],
        office: '',
        salaryGrade: '',
        status: 'Active' as Position['status'],
    });

    const filtered = useMemo(
        () =>
            positions
                .filter(
                    (position) =>
                        category === 'All Categories' ||
                        position.category === category,
                )
                .filter(
                    (position) =>
                        status === 'All Statuses' || position.status === status,
                )
                .filter((position) =>
                    `${position.code} ${position.title} ${position.office}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                )
                .sort((first, second) =>
                    first.title.localeCompare(second.title),
                ),
        [positions, query, category, status],
    );

    const addPosition = () => {
        if (!draft.title.trim() || !draft.office.trim()) {
            return;
        }

        setPositions((items) => [
            ...items,
            {
                ...draft,
                code: `POS-${String(items.length + 1).padStart(3, '0')}`,
            },
        ]);
        setDraft({
            title: '',
            category: 'Appointive',
            office: '',
            salaryGrade: '',
            status: 'Active',
        });
        setModalOpen(false);
    };

    return (
        <>
            <Head title="Position Management" />
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
                                    Position Management
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Manage municipal positions, classifications,
                                    offices, and status.
                                </p>
                            </div>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="rounded-lg bg-[#0873e6] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                            >
                                ＋ Add New Position
                            </button>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                [
                                    '♟',
                                    'Total Positions',
                                    String(positions.length),
                                    'bg-blue-50 text-blue-600',
                                ],
                                [
                                    '✓',
                                    'Active Positions',
                                    String(
                                        positions.filter(
                                            (item) => item.status === 'Active',
                                        ).length,
                                    ),
                                    'bg-emerald-50 text-emerald-600',
                                ],
                                [
                                    '◆',
                                    'Elective Positions',
                                    String(
                                        positions.filter(
                                            (item) =>
                                                item.category === 'Elective',
                                        ).length,
                                    ),
                                    'bg-violet-50 text-violet-600',
                                ],
                                [
                                    '▦',
                                    'Offices Represented',
                                    String(
                                        new Set(
                                            positions.map(
                                                (item) => item.office,
                                            ),
                                        ).size,
                                    ),
                                    'bg-amber-50 text-amber-600',
                                ],
                            ].map(([icon, label, value, color]) => (
                                <section
                                    key={label}
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
                                        onChange={(event) =>
                                            setQuery(event.target.value)
                                        }
                                        placeholder="Search code, position, or office..."
                                        className={`${inputClass} pl-9`}
                                    />
                                </label>
                                <select
                                    value={category}
                                    onChange={(event) =>
                                        setCategory(event.target.value)
                                    }
                                    className={inputClass}
                                >
                                    <option>All Categories</option>
                                    <option>Elective</option>
                                    <option>Appointive</option>
                                    <option>Administrative</option>
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
                                        setCategory('All Categories');
                                        setStatus('All Statuses');
                                    }}
                                    className="h-10 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-600"
                                >
                                    Reset
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-205 text-left text-sm">
                                    <thead className="bg-slate-50 text-[11px] font-bold text-[#092d62] uppercase">
                                        <tr>
                                            <th className="px-5 py-3">
                                                Position Code
                                            </th>
                                            <th className="px-5 py-3">
                                                Position Title
                                            </th>
                                            <th className="px-5 py-3">
                                                Category
                                            </th>
                                            <th className="px-5 py-3">
                                                Office / Department
                                            </th>
                                            <th className="px-5 py-3 text-center">
                                                Salary Grade
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
                                        {filtered.map((position) => (
                                            <tr
                                                key={position.code}
                                                className="transition hover:bg-blue-50/40"
                                            >
                                                <td className="px-5 py-4 font-semibold text-blue-600">
                                                    {position.code}
                                                </td>
                                                <td className="px-5 py-4 font-semibold text-[#092d62]">
                                                    {position.title}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                                        {position.category}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">
                                                    {position.office}
                                                </td>
                                                <td className="px-5 py-4 text-center font-semibold">
                                                    SG {position.salaryGrade}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${position.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}
                                                    >
                                                        {position.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <button
                                                        className="rounded-md p-2 text-blue-600 hover:bg-blue-50"
                                                        aria-label={`Edit ${position.title}`}
                                                    >
                                                        ✎
                                                    </button>
                                                    <button
                                                        className="rounded-md p-2 text-red-500 hover:bg-red-50"
                                                        aria-label={`Delete ${position.title}`}
                                                    >
                                                        ♲
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
                                                    No positions match the
                                                    selected filters.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex flex-col justify-between gap-3 border-t border-slate-200 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center">
                                <p>
                                    Showing {filtered.length} of{' '}
                                    {positions.length} positions
                                </p>
                                <div className="flex gap-2">
                                    <button className="rounded-md border border-slate-300 px-3 py-1.5">
                                        Previous
                                    </button>
                                    <button className="rounded-md bg-blue-600 px-3 py-1.5 text-white">
                                        1
                                    </button>
                                    <button className="rounded-md border border-slate-300 px-3 py-1.5">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>

                {modalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="position-modal-title"
                    >
                        <div className="flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/50 bg-white shadow-2xl">
                            <div className="flex items-center justify-between bg-gradient-to-r from-[#063b76] to-[#0873e6] px-6 py-5 text-white sm:px-7">
                                <div className="flex items-center gap-4">
                                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl ring-1 ring-white/25">
                                        ♟
                                    </span>
                                    <div>
                                        <h3
                                            id="position-modal-title"
                                            className="text-lg font-bold sm:text-xl"
                                        >
                                            Add New Position
                                        </h3>
                                        <p className="mt-0.5 text-xs text-blue-100">
                                            Create a position for the municipal
                                            staffing directory.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="flex size-9 items-center justify-center rounded-full text-2xl text-white/80 transition hover:bg-white/15 hover:text-white"
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="overflow-y-auto bg-slate-50/70 p-5 sm:p-7">
                                <div className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                                    <div>
                                        <p className="text-xs font-bold text-[#092d62]">
                                            Position Details
                                        </p>
                                        <p className="mt-0.5 text-[10px] text-slate-500">
                                            Fields marked with * are required.
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-blue-600 shadow-sm">
                                        Code auto-generated
                                    </span>
                                </div>
                                <div className="grid gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2">
                                    <label className="text-xs font-semibold text-[#17345f] sm:col-span-2">
                                        Position Title{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            required
                                            autoFocus
                                            value={draft.title}
                                            onChange={(event) =>
                                                setDraft({
                                                    ...draft,
                                                    title: event.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="e.g. Municipal Planning Officer"
                                        />
                                        <span className="mt-1 block text-[10px] font-normal text-slate-400">
                                            Use the official title from the
                                            approved staffing pattern.
                                        </span>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Category{' '}
                                        <b className="text-red-500">*</b>
                                        <select
                                            value={draft.category}
                                            onChange={(event) =>
                                                setDraft({
                                                    ...draft,
                                                    category: event.target
                                                        .value as Position['category'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Elective</option>
                                            <option>Appointive</option>
                                            <option>Administrative</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f]">
                                        Salary Grade
                                        <input
                                            type="number"
                                            min="1"
                                            max="33"
                                            value={draft.salaryGrade}
                                            onChange={(event) =>
                                                setDraft({
                                                    ...draft,
                                                    salaryGrade:
                                                        event.target.value,
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                            placeholder="Salary grade 1–33"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-[#17345f] sm:col-span-2">
                                        Office / Department{' '}
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
                                            placeholder="Select or enter office / department"
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
                                                        .value as Position['status'],
                                                })
                                            }
                                            className={`${inputClass} mt-1.5`}
                                        >
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </select>
                                    </label>
                                    <div
                                        className={`rounded-lg border p-3 text-[11px] leading-5 sm:self-end ${draft.status === 'Active' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}
                                    >
                                        <b>{draft.status} record</b>
                                        <br />
                                        {draft.status === 'Active'
                                            ? 'Available in active position lists.'
                                            : 'Hidden from active position lists.'}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col-reverse justify-between gap-3 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center">
                                <p className="text-[11px] text-slate-400">
                                    <b className="text-red-500">*</b> Required
                                    fields
                                </p>
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(false)}
                                        className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={addPosition}
                                        className="rounded-lg bg-[#0873e6] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0667cf]"
                                    >
                                        ＋ Add Position
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
