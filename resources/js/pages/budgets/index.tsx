import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import NotificationBell from '@/components/notification-bell';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';

type Budget = {
    code: string;
    category: string;
    source: string;
    approved: string;
    utilized: string;
    remaining: string;
    status: 'On Going' | 'Delayed' | 'Pending';
};

const budgets: Budget[] = [
    {
        code: '1000-01-01',
        category: 'General Public Services',
        source: 'Internal Revenue Allotment (IRA)',
        approved: '₱ 5,620,000.00',
        utilized: '₱ 2,848,435.20',
        remaining: '₱ 2,771,564.80',
        status: 'On Going',
    },
    {
        code: '2000-01-01',
        category: 'Social Services',
        source: 'Local Sources',
        approved: '₱ 2,380,000.00',
        utilized: '₱ 1,142,860.50',
        remaining: '₱ 1,237,139.50',
        status: 'On Going',
    },
    {
        code: '3000-01-01',
        category: 'Economic Services',
        source: 'Other Grants & Subsidies',
        approved: '₱ 1,820,000.00',
        utilized: '₱ 946,215.30',
        remaining: '₱ 873,784.70',
        status: 'On Going',
    },
    {
        code: '4000-01-01',
        category: 'Infrastructure Services',
        source: 'Internal Revenue Allotment (IRA)',
        approved: '₱ 2,150,000.00',
        utilized: '₱ 1,012,450.75',
        remaining: '₱ 1,137,549.25',
        status: 'On Going',
    },
    {
        code: '9000-01-01',
        category: 'Other Purposes',
        source: 'Other Income',
        approved: '₱ 480,000.00',
        utilized: '₱ 170,950.60',
        remaining: '₱ 309,049.40',
        status: 'Delayed',
    },
    {
        code: 'SUP-2025-01',
        category: 'Supplemental Budget',
        source: 'Local Sources',
        approved: '₱ 730,000.00',
        utilized: '₱ 125,867.00',
        remaining: '₱ 604,133.00',
        status: 'Pending',
    },
];

const menu = [
    ['⌂', 'Dashboard', '/dashboard'],
    ['▦', 'Master Data', '#'],
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

function StatCard({
    icon,
    title,
    value,
    note,
    color,
    border,
}: {
    icon: string;
    title: string;
    value: string;
    note: string;
    color: string;
    border: string;
}) {
    return (
        <section
            className="relative flex min-h-29 items-center gap-5 overflow-hidden rounded-xl border border-slate-200 bg-white px-5 shadow-sm after:absolute after:inset-x-0 after:bottom-0 after:h-1"
            style={
                {
                    '--tw-bg-opacity': 1,
                    borderBottomColor: border,
                } as React.CSSProperties
            }
        >
            <div
                className="flex size-15 shrink-0 items-center justify-center rounded-full text-3xl font-bold text-white"
                style={{ background: color }}
            >
                {icon}
            </div>
            <div>
                <p className="text-xs font-bold text-[#092d62]">{title}</p>
                <p className="mt-2 text-xl font-bold text-[#0b1e43]">{value}</p>
                <p className="mt-2 text-xs text-slate-500">{note}</p>
            </div>
            <span
                className="absolute inset-x-0 bottom-0 h-0.75"
                style={{ background: border }}
            />
        </section>
    );
}

function BudgetPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [query, setQuery] = useState('');
    const filteredBudgets = useMemo(
        () =>
            budgets.filter((budget) =>
                Object.values(budget).some((value) =>
                    value.toLowerCase().includes(query.toLowerCase()),
                ),
            ),
        [query],
    );
    const approved = [5.62, 2.38, 1.82, 2.15, 0.48];
    const used = [2.85, 1.14, 0.95, 1.01, 0.17];

    return (
        <>
            <Head title="Budget Management" />
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
                        {menu.map(([icon, label, href], index) =>
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
                                    className={`flex items-center gap-4 rounded-lg px-3 py-3 text-sm font-semibold transition ${index === 3 ? 'bg-gradient-to-r from-[#1589f5] to-[#1774e7] shadow-lg' : 'text-white/90 hover:bg-white/10'}`}
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
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                            <div>
                                <h2 className="text-2xl font-bold text-[#092d62]">
                                    Budget Management
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Manage annual and supplemental budgets,
                                    allocations, and balances.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Link
                                    href="/budgets/create"
                                    className="rounded-lg bg-[#0765c8] px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#0755aa]"
                                >
                                    ＋ Add Budget
                                </Link>
                                <button className="rounded-lg border border-[#0765c8] bg-white px-4 py-2.5 text-sm font-bold text-[#0765c8]">
                                    ⇩ &nbsp; Export Budget
                                </button>
                                <button className="rounded-lg border border-[#0765c8] bg-white px-4 py-2.5 text-sm font-bold text-[#0765c8]">
                                    ▧ &nbsp; Generate Summary
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <StatCard
                                icon="▰"
                                title="Total Approved Budget"
                                value="₱ 12,450,000.00"
                                note="FY 2025 Approved Budget"
                                color="#0968d4"
                                border="#0968d4"
                            />
                            <StatCard
                                icon="◔"
                                title="Total Utilized"
                                value="₱ 6,245,780.35"
                                note="50.18% of Approved Budget"
                                color="#2cb866"
                                border="#2cb866"
                            />
                            <StatCard
                                icon="▰"
                                title="Remaining Balance"
                                value="₱ 6,204,219.65"
                                note="49.82% of Approved Budget"
                                color="#18b6b6"
                                border="#18b6b6"
                            />
                            <StatCard
                                icon="⌛"
                                title="Pending Approval"
                                value="₱ 845,320.00"
                                note="6.79% of Approved Budget"
                                color="#ff9b0b"
                                border="#ff9b0b"
                            />
                        </div>

                        <section className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="flex flex-col gap-4 border-b p-4 xl:flex-row xl:items-end xl:justify-between">
                                <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    {[
                                        ['Fiscal Year', 'FY 2025'],
                                        ['Budget Type', 'All'],
                                        ['Funding Source', 'All'],
                                        ['Status', 'All'],
                                    ].map(([label, value]) => (
                                        <label
                                            key={label}
                                            className="text-xs font-semibold text-slate-600"
                                        >
                                            {label}
                                            <select className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-normal outline-none focus:border-blue-500">
                                                <option>{value}</option>
                                            </select>
                                        </label>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <input
                                            value={query}
                                            onChange={(e) =>
                                                setQuery(e.target.value)
                                            }
                                            placeholder="Search budget item..."
                                            className="h-10 w-full rounded-md border border-slate-300 px-3 pr-9 text-sm outline-none sm:w-62"
                                        />
                                        <span className="absolute top-2 right-3 text-lg">
                                            ⌕
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setQuery('')}
                                        className="h-10 rounded-md border border-slate-300 px-4 text-sm font-semibold text-[#092d62]"
                                    >
                                        ↻ &nbsp; Reset
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-270 text-left text-xs">
                                    <thead className="bg-[#f5f8fd] text-[#092d62]">
                                        <tr>
                                            {[
                                                'Budget Code',
                                                'Program / Category',
                                                'Funding Source',
                                                'Approved Amount',
                                                'Utilized Amount',
                                                'Remaining Balance',
                                                'Fiscal Year',
                                                'Status',
                                                'Actions',
                                            ].map((heading) => (
                                                <th
                                                    key={heading}
                                                    className="border-b px-5 py-3 font-bold whitespace-nowrap"
                                                >
                                                    {heading}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredBudgets.map((budget) => (
                                            <tr
                                                key={budget.code}
                                                className="border-b last:border-0 hover:bg-blue-50/30"
                                            >
                                                <td className="px-5 py-3 font-bold text-[#0765c8]">
                                                    {budget.code}
                                                </td>
                                                <td className="font-medium">
                                                    {budget.category}
                                                </td>
                                                <td>{budget.source}</td>
                                                <td className="font-semibold">
                                                    {budget.approved}
                                                </td>
                                                <td className="font-semibold">
                                                    {budget.utilized}
                                                </td>
                                                <td className="font-semibold">
                                                    {budget.remaining}
                                                </td>
                                                <td>FY 2025</td>
                                                <td>
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-[10px] font-semibold ${budget.status === 'On Going' ? 'bg-blue-100 text-blue-700' : budget.status === 'Delayed' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}
                                                    >
                                                        {budget.status}
                                                    </span>
                                                </td>
                                                <td className="text-center text-xl font-bold text-[#0765c8]">
                                                    ⋮
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 text-xs">
                                <span>
                                    Showing 1 to {filteredBudgets.length} of{' '}
                                    {filteredBudgets.length} entries
                                </span>
                                <div className="flex gap-1">
                                    <button className="size-8 rounded border">
                                        ‹
                                    </button>
                                    <button className="size-8 rounded bg-[#0765c8] font-bold text-white">
                                        1
                                    </button>
                                    <button className="size-8 rounded border">
                                        ›
                                    </button>
                                </div>
                            </div>
                        </section>

                        <div className="mt-4 grid gap-4 xl:grid-cols-3">
                            <section className="rounded-xl border bg-white p-4 shadow-sm">
                                <div className="flex justify-between">
                                    <h3 className="text-sm font-bold text-[#092d62]">
                                        Budget Utilization by Category &nbsp;ⓘ
                                    </h3>
                                    <button className="rounded border px-3 py-1 text-xs">
                                        FY 2025⌄
                                    </button>
                                </div>
                                <div className="mt-5 flex h-46 items-end justify-around border-b border-l border-slate-200 px-3">
                                    {approved.map((amount, index) => (
                                        <div
                                            key={amount}
                                            className="flex h-full items-end gap-1"
                                        >
                                            <div
                                                className="relative w-7 rounded-t bg-[#0968d4]"
                                                style={{
                                                    height: `${(amount / 6) * 100}%`,
                                                }}
                                            >
                                                <span className="absolute -top-5 text-[9px] font-bold">
                                                    {amount}M
                                                </span>
                                            </div>
                                            <div
                                                className="relative w-7 rounded-t bg-[#2cb866]"
                                                style={{
                                                    height: `${(used[index] / 6) * 100}%`,
                                                }}
                                            >
                                                <span className="absolute -top-5 text-[9px] font-bold">
                                                    {used[index]}M
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2 grid grid-cols-5 text-center text-[9px] font-semibold">
                                    {[
                                        'General Public Services',
                                        'Social Services',
                                        'Economic Services',
                                        'Infrastructure Services',
                                        'Other Purposes',
                                    ].map((x) => (
                                        <span key={x}>{x}</span>
                                    ))}
                                </div>
                                <p className="mt-5 text-[10px] text-slate-500">
                                    Values are in Philippine Peso (₱)
                                </p>
                            </section>
                            <section className="rounded-xl border bg-white p-4 shadow-sm">
                                <h3 className="text-sm font-bold text-[#092d62]">
                                    Funding Source Distribution &nbsp;ⓘ
                                </h3>
                                <div className="mt-7 flex items-center justify-center gap-6">
                                    <div
                                        className="relative size-41 rounded-full"
                                        style={{
                                            background:
                                                'conic-gradient(#0968d4 0 57%,#2cb866 57% 76%,#ff9b0b 76% 91%,#7650cc 91%)',
                                        }}
                                    >
                                        <div className="absolute inset-10 flex items-center justify-center rounded-full bg-white text-center text-xs font-bold">
                                            ₱ 12,450,000.00
                                            <br />
                                            <span className="font-normal text-slate-500">
                                                Total Budget
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 text-[10px]">
                                        {[
                                            [
                                                '#0968d4',
                                                'Internal Revenue Allotment (IRA)',
                                                '57.01%',
                                            ],
                                            [
                                                '#2cb866',
                                                'Local Sources',
                                                '19.11%',
                                            ],
                                            [
                                                '#ff9b0b',
                                                'Other Grants & Subsidies',
                                                '14.62%',
                                            ],
                                            [
                                                '#7650cc',
                                                'Other Income',
                                                '9.26%',
                                            ],
                                        ].map((row) => (
                                            <div
                                                key={row[1]}
                                                className="grid grid-cols-[8px_1fr_auto] gap-2"
                                            >
                                                <i
                                                    className="mt-0.5 size-2 rounded-full"
                                                    style={{
                                                        background: row[0],
                                                    }}
                                                />
                                                <span>{row[1]}</span>
                                                <b>{row[2]}</b>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className="mt-5 text-[10px] text-slate-500">
                                    Based on approved budget
                                </p>
                            </section>
                            <section className="rounded-xl border bg-white shadow-sm">
                                <div className="flex justify-between px-4 pt-4">
                                    <h3 className="text-sm font-bold text-[#092d62]">
                                        Recent Budget Updates / Alerts
                                    </h3>
                                    <button className="text-xs font-semibold text-[#0765c8]">
                                        View All
                                    </button>
                                </div>
                                <div className="mt-3 px-4">
                                    {[
                                        [
                                            '✓',
                                            'Supplemental Budget SUP-2025-01 has been approved.',
                                            'May 20, 2025',
                                            '#2cb866',
                                        ],
                                        [
                                            'i',
                                            'Utilization for Infrastructure Services reached 47.10%.',
                                            'May 19, 2025',
                                            '#0968d4',
                                        ],
                                        [
                                            '▲',
                                            'Budget item ‘Other Purposes’ is delayed.',
                                            'May 18, 2025',
                                            '#ff9b0b',
                                        ],
                                        [
                                            '▧',
                                            'Payment - Office Supplies (₱45,320.00) recorded.',
                                            'May 17, 2025',
                                            '#7650cc',
                                        ],
                                        [
                                            'i',
                                            'Monthly budget summary for April 2025 generated.',
                                            'May 16, 2025',
                                            '#0968d4',
                                        ],
                                    ].map((row) => (
                                        <div
                                            key={row[1]}
                                            className="flex items-center gap-3 border-b py-3 last:border-0"
                                        >
                                            <span
                                                className="flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                                                style={{ background: row[3] }}
                                            >
                                                {row[0]}
                                            </span>
                                            <span className="flex-1 text-[10px]">
                                                {row[1]}
                                            </span>
                                            <span className="text-[9px] text-slate-500">
                                                {row[2]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default BudgetPage;
