import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';

type IconName =
    | 'home'
    | 'wallet'
    | 'money'
    | 'clipboard'
    | 'swap'
    | 'briefcase'
    | 'chart'
    | 'folder'
    | 'shield'
    | 'users'
    | 'settings'
    | 'bell'
    | 'menu'
    | 'calendar'
    | 'plus'
    | 'file';

function Icon({
    name,
    className = 'size-5',
}: {
    name: IconName;
    className?: string;
}) {
    const paths: Record<IconName, React.ReactNode> = {
        home: (
            <>
                <path d="m3 11 9-8 9 8" />
                <path d="M5 10v11h14V10M9 21v-7h6v7" />
            </>
        ),
        wallet: (
            <>
                <path d="M3 6h15a3 3 0 0 1 3 3v10H3V6Z" />
                <path d="M3 6V5a2 2 0 0 1 2-2h12v3m1 6h3" />
            </>
        ),
        money: (
            <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <circle cx="12" cy="12" r="3" />
                <path d="M7 8H6v1m11-1h1v1M7 16H6v-1m11 1h1v-1" />
            </>
        ),
        clipboard: (
            <>
                <rect x="5" y="4" width="14" height="17" rx="2" />
                <path d="M9 4V2h6v2m-6 6h6m-6 4h6" />
            </>
        ),
        swap: (
            <>
                <path d="M4 8h15l-3-3m3 11H4l3 3" />
            </>
        ),
        briefcase: (
            <>
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M8 7V4h8v3m-13 5h18m-11 0v3h4v-3" />
            </>
        ),
        chart: <path d="M4 20V10m6 10V4m6 16v-7m5 7H2" />,
        folder: <path d="M3 6h7l2 2h9v11H3V6Z" />,
        shield: (
            <>
                <path d="M12 2 4 5v6c0 5 3.4 9.1 8 11 4.6-1.9 8-6 8-11V5l-8-3Z" />
                <path d="m9 12 2 2 4-5" />
            </>
        ),
        users: (
            <>
                <circle cx="9" cy="8" r="3" />
                <circle cx="17" cy="9" r="2" />
                <path d="M3 20a6 6 0 0 1 12 0m0-5a5 5 0 0 1 6 5" />
            </>
        ),
        settings: (
            <>
                <circle cx="12" cy="12" r="3" />
                <path d="M19 13.5v-3l-2-.6-.6-1.4 1-1.8-2.1-2.1-1.8 1-1.5-.6-.5-2h-3l-.6 2-1.4.6-1.8-1-2.1 2.1 1 1.8-.6 1.4-2 .6v3l2 .6.6 1.4-1 1.8 2.1 2.1 1.8-1 1.4.6.6 2h3l.5-2 1.5-.6 1.8 1 2.1-2.1-1-1.8.6-1.4 2-.6Z" />
            </>
        ),
        bell: (
            <>
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
            </>
        ),
        menu: <path d="M4 6h16M4 12h16M4 18h16" />,
        calendar: (
            <>
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M7 3v4m10-4v4M3 10h18" />
            </>
        ),
        plus: <path d="M12 5v14M5 12h14" />,
        file: (
            <>
                <path d="M6 2h8l4 4v16H6V2Z" />
                <path d="M14 2v5h5m-9 5h4m-4 4h4" />
            </>
        ),
    };

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {paths[name]}
        </svg>
    );
}

const navItems: Array<[IconName, string, string]> = [
    ['home', 'Dashboard', '/dashboard'],
    ['folder', 'Master Data', '#'],
    ['clipboard', 'Transaction', '#'],
    ['wallet', 'Budget Management', '/budgets'],
    ['money', 'Revenue & Collections', '#'],
    ['clipboard', 'Obligations', '#'],
    ['swap', 'Disbursements', '#'],
    ['briefcase', 'Programs & Projects', '#'],
    ['folder', 'Document Management', '#'],
    ['chart', 'Reports', '#'],
    ['shield', 'Audit Trail', '#'],
    ['users', 'User Management', '/users'],
    ['settings', 'System Settings', '/settings'],
];

const metrics = [
    {
        icon: 'wallet' as IconName,
        title: 'Total Budget',
        value: '₱12,500,000.00',
        note: 'Approved Budget',
        color: '#1268d4',
        bg: '#e6f1ff',
    },
    {
        icon: 'chart' as IconName,
        title: 'Total Revenue',
        value: '₱6,842,350.50',
        note: 'Year-to-Date Collection',
        color: '#199653',
        bg: '#e7f7ee',
    },
    {
        icon: 'clipboard' as IconName,
        title: 'Total Obligations',
        value: '₱3,245,780.75',
        note: 'Total Obligations',
        color: '#f08a15',
        bg: '#fff0df',
    },
    {
        icon: 'swap' as IconName,
        title: 'Total Disbursements',
        value: '₱2,987,430.20',
        note: 'Year-to-Date Disbursements',
        color: '#8058d0',
        bg: '#f0eafd',
    },
    {
        icon: 'wallet' as IconName,
        title: 'Remaining Balance',
        value: '₱3,567,569.80',
        note: 'Available Balance',
        color: '#0898a6',
        bg: '#e1f6f7',
    },
];

const Card = ({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <section
        className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
        {children}
    </section>
);
const CardTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-between px-4 pt-4">
        <h2 className="text-sm font-bold text-[#092d62]">{children}</h2>
        <button className="text-lg leading-none text-slate-500">⋮</button>
    </div>
);

function MonthlyChart() {
    const revenue = [42, 38, 64, 51, 82, 43, 57, 68, 48, 36, 58, 71];
    const spend = [21, 27, 43, 49, 57, 31, 25, 55, 34, 29, 32, 38];

    return (
        <div className="mt-4 flex h-43 items-end gap-2 border-b border-l border-slate-200 px-3 pt-4">
            {revenue.map((height, index) => (
                <div
                    key={index}
                    className="flex h-full flex-1 items-end justify-center gap-0.5"
                >
                    <span
                        className="w-2 rounded-t-sm bg-[#159653]"
                        style={{ height: `${height}%` }}
                    />
                    <span
                        className="w-2 rounded-t-sm bg-[#0870d4]"
                        style={{ height: `${spend[index]}%` }}
                    />
                </div>
            ))}
        </div>
    );
}

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Head title="Dashboard" />
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
                        {navItems.map(([icon, label, href], index) =>
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
                                    className={`flex items-center gap-4 rounded-lg px-3 py-3 text-left text-sm font-semibold transition ${index === 0 ? 'bg-gradient-to-r from-[#1589f5] to-[#1774e7] shadow-lg shadow-blue-950/20' : 'text-white/90 hover:bg-white/10'}`}
                                >
                                    <Icon
                                        name={icon}
                                        className="size-5.5 shrink-0"
                                    />
                                    {label}
                                </Link>
                            ),
                        )}
                    </nav>
                    <div className="m-4 flex items-center gap-3 rounded-xl bg-white/10 p-4 text-xs font-semibold">
                        <Icon name="shield" className="size-8" />
                        <span>
                            Barangay-Level Financial
                            <br />
                            Transparency & Accountability
                        </span>
                    </div>
                </aside>

                <div className="lg:pl-65">
                    <header className="sticky top-0 z-20 flex h-18 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-7">
                        <div className="flex items-center gap-5">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="text-[#092d62] lg:hidden"
                            >
                                <Icon name="menu" className="size-7" />
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
                            <div className="relative border-r border-slate-200 pr-4">
                                <Icon
                                    name="bell"
                                    className="size-6 text-slate-600"
                                />
                                <span className="absolute -top-2 right-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                    3
                                </span>
                            </div>
                            <div className="hidden items-center gap-3 sm:flex">
                                <div className="flex size-10 items-center justify-center rounded-full bg-[#fde1c6] text-xl">
                                    👨🏻
                                </div>
                                <div>
                                    <p className="text-sm font-bold">
                                        Juan Dela Cruz
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Barangay Treasurer
                                    </p>
                                </div>
                            </div>
                            <Form action="/logout" method="post">
                                <button className="text-xs font-semibold text-slate-500 hover:text-red-600">
                                    Sign out
                                </button>
                            </Form>
                        </div>
                    </header>

                    <main className="p-3 sm:p-4">
                        <Card className="flex items-center justify-between gap-4 px-5 py-3">
                            <div className="flex items-center gap-4">
                                <div className="flex size-12 items-center justify-center rounded-full bg-[#ddf6f6] text-[#0797a4]">
                                    <Icon name="home" className="size-7" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-[#092d62]">
                                        Welcome, Barangay Officials!
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        Here's what's happening with your
                                        barangay finances today.
                                    </p>
                                </div>
                            </div>
                            <div className="hidden items-center gap-2 text-sm text-slate-500 md:flex">
                                <Icon name="calendar" />
                                May 20, 2025 (Tuesday)
                            </div>
                        </Card>

                        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
                            {metrics.map((metric) => (
                                <Card
                                    key={metric.title}
                                    className="flex min-h-28 items-center gap-3 p-3"
                                >
                                    <div
                                        className="flex size-12 shrink-0 items-center justify-center rounded-full"
                                        style={{
                                            color: metric.color,
                                            background: metric.bg,
                                        }}
                                    >
                                        <Icon
                                            name={metric.icon}
                                            className="size-7"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-bold uppercase">
                                            {metric.title}
                                        </p>
                                        <p className="mt-3 text-[15px] font-bold whitespace-nowrap">
                                            {metric.value}
                                        </p>
                                        <p className="mt-2 text-[10px] text-slate-500">
                                            {metric.note}
                                        </p>
                                    </div>
                                </Card>
                            ))}
                            <Card className="flex min-h-28 items-center gap-3 p-3">
                                <div
                                    className="relative flex size-12 shrink-0 items-center justify-center rounded-full"
                                    style={{
                                        background:
                                            'conic-gradient(#0871d4 0 24%,#e5eef9 24%)',
                                    }}
                                >
                                    <div className="size-7 rounded-full bg-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase">
                                        Budget Utilization Rate
                                    </p>
                                    <p className="mt-2 text-lg font-bold">
                                        23.90%
                                    </p>
                                    <p className="text-[10px] text-slate-500">
                                        Of Approved Budget
                                    </p>
                                    <div className="mt-2 h-2 w-30 rounded-full bg-slate-200">
                                        <div className="h-full w-1/4 rounded-full bg-[#0871d4]" />
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="mt-3 grid gap-3 xl:grid-cols-12">
                            <Card className="xl:col-span-3">
                                <CardTitle>
                                    Monthly Revenue vs Disbursements
                                </CardTitle>
                                <div className="px-4">
                                    <div className="mt-3 flex gap-5 text-[10px]">
                                        <span>
                                            <i className="mr-1 inline-block size-3 bg-[#159653]" />
                                            Revenue
                                        </span>
                                        <span>
                                            <i className="mr-1 inline-block size-3 bg-[#0870d4]" />
                                            Disbursements
                                        </span>
                                    </div>
                                    <MonthlyChart />
                                    <div className="mt-2 flex justify-between px-1 text-[9px] text-slate-500">
                                        {'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'
                                            .split(' ')
                                            .map((m) => (
                                                <span key={m}>{m}</span>
                                            ))}
                                    </div>
                                    <button className="my-3 rounded-md border px-3 py-1.5 text-xs">
                                        Year 2025⌄
                                    </button>
                                </div>
                            </Card>
                            <Card className="xl:col-span-3">
                                <CardTitle>
                                    Budget Utilization by Category
                                </CardTitle>
                                <div className="mt-7 flex flex-col gap-5 px-4">
                                    {[
                                        [
                                            'General Administration',
                                            70,
                                            '#0870d4',
                                            '56.40%',
                                        ],
                                        [
                                            'Social Services',
                                            46,
                                            '#159653',
                                            '32.10%',
                                        ],
                                        [
                                            'Economic Services',
                                            35,
                                            '#069da6',
                                            '24.80%',
                                        ],
                                        [
                                            'Other Services',
                                            28,
                                            '#f29b0b',
                                            '18.70%',
                                        ],
                                        [
                                            'Debt Service',
                                            18,
                                            '#8758d1',
                                            '12.50%',
                                        ],
                                    ].map(([label, width, color, value]) => (
                                        <div
                                            key={String(label)}
                                            className="grid grid-cols-[105px_1fr_45px] items-center gap-2 text-[9px]"
                                        >
                                            <span className="text-right">
                                                {label}
                                            </span>
                                            <div className="h-5 bg-slate-100">
                                                <div
                                                    className="h-full"
                                                    style={{
                                                        width: `${width}%`,
                                                        background:
                                                            String(color),
                                                    }}
                                                />
                                            </div>
                                            <b>{value}</b>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                            <Card className="xl:col-span-3">
                                <CardTitle>
                                    Funding Source Distribution
                                </CardTitle>
                                <div className="flex h-59 items-center justify-center gap-6 px-4">
                                    <div
                                        className="relative size-36 shrink-0 rounded-full"
                                        style={{
                                            background:
                                                'conic-gradient(#0870d4 0 53%,#159653 53% 70%,#f29b0b 70% 80%,#8758d1 80% 88%,#079ba8 88%)',
                                        }}
                                    >
                                        <div className="absolute inset-9 flex items-center justify-center rounded-full bg-white text-center text-[9px] font-bold">
                                            ₱6,842,350.50
                                            <br />
                                            <span className="font-normal">
                                                Total Revenue
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 text-[9px]">
                                        {[
                                            [
                                                '#0870d4',
                                                'Internal Revenue Allotment',
                                                '56.2%',
                                            ],
                                            [
                                                '#159653',
                                                'Real Property Tax',
                                                '16.8%',
                                            ],
                                            ['#f29b0b', 'Business Tax', '8.7%'],
                                            [
                                                '#8758d1',
                                                'Fees & Charges',
                                                '6.5%',
                                            ],
                                            [
                                                '#079ba8',
                                                'Other Sources',
                                                '11.8%',
                                            ],
                                        ].map((row) => (
                                            <div
                                                key={row[1]}
                                                className="grid grid-cols-[8px_1fr_auto] gap-2"
                                            >
                                                <i
                                                    className="size-2 rounded-full"
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
                                <p className="px-4 pb-3 text-[10px] text-slate-500">
                                    Year-to-Date
                                </p>
                            </Card>
                            <Card className="xl:col-span-3">
                                <CardTitle>
                                    Programs / Projects Status
                                </CardTitle>
                                <div className="mt-2 px-4">
                                    {[
                                        ['Total Projects', '18', '#0870d4'],
                                        ['On Going', '9', '#72ae26'],
                                        ['Completed', '6', '#55a71d'],
                                        ['On Hold', '2', '#f29b0b'],
                                        ['Not Started', '1', '#7d8188'],
                                    ].map(([label, value, color], index) => (
                                        <div
                                            key={label}
                                            className="flex items-center gap-3 border-b py-2.5"
                                        >
                                            <span
                                                className="flex size-7 items-center justify-center rounded-full text-sm font-bold text-white"
                                                style={{ background: color }}
                                            >
                                                {index === 0
                                                    ? '▣'
                                                    : index === 1
                                                      ? '▶'
                                                      : index === 2
                                                        ? '✓'
                                                        : index === 3
                                                          ? 'Ⅱ'
                                                          : '●'}
                                            </span>
                                            <span className="flex-1 text-sm">
                                                {label}
                                            </span>
                                            <b>{value}</b>
                                        </div>
                                    ))}
                                    <button className="w-full py-3 text-xs font-semibold text-[#0870d4]">
                                        View all projects →
                                    </button>
                                </div>
                            </Card>
                        </div>

                        <div className="mt-3 grid gap-3 xl:grid-cols-12">
                            <Card className="overflow-hidden xl:col-span-6">
                                <CardTitle>Recent Transactions</CardTitle>
                                <div className="overflow-x-auto p-3">
                                    <table className="w-full min-w-155 text-left text-[10px]">
                                        <thead className="bg-[#e8f2ff] text-[#092d62]">
                                            <tr>
                                                {[
                                                    'Date',
                                                    'Transaction',
                                                    'Category',
                                                    'Amount',
                                                    'Status',
                                                ].map((h) => (
                                                    <th
                                                        key={h}
                                                        className="px-3 py-2"
                                                    >
                                                        {h}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                [
                                                    'May 20, 2025',
                                                    'Collection: Barangay Clearance Fee',
                                                    'Revenue',
                                                    '₱5,250.00',
                                                    'Posted',
                                                ],
                                                [
                                                    'May 19, 2025',
                                                    'Disbursement: Office Supplies',
                                                    'Disbursement',
                                                    '₱8,450.00',
                                                    'Posted',
                                                ],
                                                [
                                                    'May 19, 2025',
                                                    'Payment: Electric Bill (Barangay Hall)',
                                                    'Disbursement',
                                                    '₱6,780.00',
                                                    'Posted',
                                                ],
                                                [
                                                    'May 18, 2025',
                                                    'Collection: Business Tax',
                                                    'Revenue',
                                                    '₱12,500.00',
                                                    'Posted',
                                                ],
                                                [
                                                    'May 16, 2025',
                                                    'Obligation: Repair of Water System',
                                                    'Obligation',
                                                    '₱45,000.00',
                                                    'Approved',
                                                ],
                                            ].map((row) => (
                                                <tr
                                                    key={row[1]}
                                                    className="border-b"
                                                >
                                                    <td className="px-3 py-2.5">
                                                        {row[0]}
                                                    </td>
                                                    <td>{row[1]}</td>
                                                    <td>
                                                        <span className="rounded-md bg-blue-50 px-2 py-1 text-blue-700">
                                                            {row[2]}
                                                        </span>
                                                    </td>
                                                    <td className="font-semibold">
                                                        {row[3]}
                                                    </td>
                                                    <td>
                                                        <span className="rounded-md bg-green-100 px-2 py-1 text-green-700">
                                                            {row[4]}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button className="w-full pt-3 text-xs font-semibold text-[#0870d4]">
                                        View all transactions →
                                    </button>
                                </div>
                            </Card>
                            <Card className="xl:col-span-3">
                                <div className="flex items-center gap-2 px-4 pt-4">
                                    <Icon
                                        name="bell"
                                        className="size-5 text-slate-500"
                                    />
                                    <h2 className="text-sm font-bold text-[#092d62]">
                                        Alerts / Notifications
                                    </h2>
                                </div>
                                <div className="mt-3 px-4">
                                    {[
                                        [
                                            '!',
                                            'Low Remaining Budget',
                                            'Economic Services has only 12.5% remaining budget.',
                                            'May 20, 2025',
                                            '#e53935',
                                        ],
                                        [
                                            '▤',
                                            'Pending Report',
                                            'The 1st Quarter Financial Report is still pending.',
                                            'May 19, 2025',
                                            '#f29b0b',
                                        ],
                                        [
                                            '▦',
                                            'Upcoming Submission',
                                            'Annual Budget Proposal is due on May 31, 2025.',
                                            'May 18, 2025',
                                            '#0870d4',
                                        ],
                                    ].map((row) => (
                                        <div
                                            key={row[1]}
                                            className="flex gap-3 border-b py-3"
                                        >
                                            <span
                                                className="flex size-9 shrink-0 items-center justify-center rounded-full font-bold text-white"
                                                style={{ background: row[4] }}
                                            >
                                                {row[0]}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex justify-between gap-2">
                                                    <b className="text-xs">
                                                        {row[1]}
                                                    </b>
                                                    <span className="text-[9px] text-slate-500">
                                                        {row[3]}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-[9px]">
                                                    {row[2]}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="w-full py-3 text-xs font-semibold text-[#0870d4]">
                                        View all alerts →
                                    </button>
                                </div>
                            </Card>
                            <Card className="xl:col-span-3">
                                <div className="flex items-center gap-2 px-4 pt-4">
                                    <span className="text-xl">ϟ</span>
                                    <h2 className="text-sm font-bold text-[#092d62]">
                                        Quick Actions
                                    </h2>
                                </div>
                                <div className="flex flex-col gap-1 p-3">
                                    {[
                                        [
                                            'plus',
                                            'Add Budget',
                                            'Create a new budget item',
                                            '#169b57',
                                        ],
                                        [
                                            'money',
                                            'Record Revenue',
                                            'Record a new collection',
                                            '#0870d4',
                                        ],
                                        [
                                            'swap',
                                            'Add Disbursement',
                                            'Create a new disbursement',
                                            '#8758d1',
                                        ],
                                        [
                                            'file',
                                            'Generate Report',
                                            'Generate financial reports',
                                            '#079ba8',
                                        ],
                                    ].map(([icon, title, note, color]) => (
                                        <button
                                            key={title}
                                            className="flex items-center gap-3 rounded-lg border p-2 text-left shadow-sm hover:bg-slate-50"
                                        >
                                            <span
                                                className="flex size-10 items-center justify-center rounded-md text-white"
                                                style={{ background: color }}
                                            >
                                                <Icon name={icon as IconName} />
                                            </span>
                                            <span className="flex-1">
                                                <b className="block text-xs">
                                                    {title}
                                                </b>
                                                <small className="text-[9px] text-slate-500">
                                                    {note}
                                                </small>
                                            </span>
                                            <span>›</span>
                                        </button>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
