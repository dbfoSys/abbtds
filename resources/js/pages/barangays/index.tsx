import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import NotificationBell from '@/components/notification-bell';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { create as createBarangay } from '@/routes/barangays';

type Barangay = {
    name: string;
    captain: string;
    contact: string;
    population: string;
    status: 'Active' | 'For Review' | 'Inactive' | 'Incomplete';
    updated: string;
};

const barangays: Barangay[] = [
    {
        name: 'Poblacion',
        captain: 'Hon. Pedro Gomez',
        contact: '0917 123 4567',
        population: '4,512',
        status: 'Active',
        updated: 'May 20, 2025\n09:15 AM',
    },
    {
        name: 'Balacanas',
        captain: 'Hon. Maria Santos',
        contact: '0917 234 5678',
        population: '3,120',
        status: 'Active',
        updated: 'May 19, 2025\n08:42 AM',
    },
    {
        name: 'Dayawan',
        captain: 'Hon. Robert Lim',
        contact: '0917 345 6789',
        population: '2,845',
        status: 'Active',
        updated: 'May 18, 2025\n02:05 PM',
    },
    {
        name: 'Katipunan',
        captain: 'Hon. Anna Reyes',
        contact: '0917 456 7890',
        population: '2,301',
        status: 'For Review',
        updated: 'May 17, 2025\n11:32 AM',
    },
    {
        name: 'Kimaya',
        captain: 'Hon. Michael Tan',
        contact: '0917 567 8901',
        population: '1,987',
        status: 'Active',
        updated: 'May 16, 2025\n04:21 PM',
    },
    {
        name: 'Looc',
        captain: 'Hon. Liza Fernandez',
        contact: '0917 678 9012',
        population: '1,654',
        status: 'Active',
        updated: 'May 15, 2025\n09:45 AM',
    },
    {
        name: 'Tambobong',
        captain: 'Hon. Grace Villanueva',
        contact: '0917 789 0123',
        population: '1,432',
        status: 'Inactive',
        updated: 'May 14, 2025\n01:20 PM',
    },
    {
        name: 'Tagoloan',
        captain: 'Hon. Jun Dela Cruz',
        contact: '0917 890 1234',
        population: '2,112',
        status: 'Active',
        updated: 'May 13, 2025\n10:10 AM',
    },
    {
        name: 'San Martin',
        captain: 'Hon. Mark Roque',
        contact: '0917 901 2345',
        population: '1,876',
        status: 'For Review',
        updated: 'May 12, 2025\n03:30 PM',
    },
    {
        name: 'Imelda',
        captain: 'Hon. Rosalinda Cruz',
        contact: '0917 012 3456',
        population: '1,295',
        status: 'Incomplete',
        updated: 'May 11, 2025\n08:05 AM',
    },
];

const menu = [
    ['⌂', 'Dashboard', '/dashboard'],
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

const statusColors: Record<Barangay['status'], string> = {
    Active: 'bg-green-100 text-green-700',
    'For Review': 'bg-amber-100 text-amber-700',
    Inactive: 'bg-red-100 text-red-600',
    Incomplete: 'bg-orange-100 text-orange-700',
};

function Metric({
    icon,
    title,
    value,
    note,
    color,
}: {
    icon: string;
    title: string;
    value: string;
    note: React.ReactNode;
    color: string;
}) {
    return (
        <section className="flex min-h-26 items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
            <span
                className={`flex size-14 shrink-0 items-center justify-center rounded-full text-3xl ${color}`}
            >
                {icon}
            </span>
            <div>
                <p className="text-[10px] font-bold text-[#092d62] uppercase">
                    {title}
                </p>
                <p className="mt-1 text-xl font-bold text-[#0b1e43]">{value}</p>
                <p className="text-[11px] text-slate-500">{note}</p>
            </div>
        </section>
    );
}

export default function BarangayManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('All Statuses');
    const filtered = useMemo(
        () =>
            barangays
                .filter(
                    (item) =>
                        (status === 'All Statuses' || item.status === status) &&
                        `${item.name} ${item.captain}`
                            .toLowerCase()
                            .includes(query.toLowerCase()),
                )
                .sort((first, second) =>
                    first.name.localeCompare(second.name, 'en', {
                        sensitivity: 'base',
                    }),
                ),
        [query, status],
    );

    return (
        <>
            <Head title="Barangay Management" />
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
                        <div className="mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
                            <div className="flex gap-4">
                                <span className="flex size-13 items-center justify-center rounded-xl bg-blue-50 text-3xl text-blue-600">
                                    🏛
                                </span>
                                <div>
                                    <h2 className="text-2xl font-bold text-[#092d62]">
                                        Barangay Management
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Manage barangay profiles, officials,
                                        status, and operational details.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href={createBarangay()}
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-blue-700"
                                >
                                    ＋ &nbsp; Add New Barangay
                                </Link>
                                <button className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-blue-700">
                                    ⇩ &nbsp; Export List
                                </button>
                                <button className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-blue-700">
                                    ⌖ &nbsp; View Map
                                </button>
                            </div>
                        </div>
                        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_250px]">
                            <div className="space-y-4">
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                    <Metric
                                        icon="🏛"
                                        title="Total Barangays"
                                        value="18"
                                        note="All barangays in Villanueva"
                                        color="bg-blue-50 text-blue-600"
                                    />
                                    <Metric
                                        icon="✓"
                                        title="Active Barangays"
                                        value="15"
                                        note={
                                            <>
                                                <b className="text-green-600">
                                                    83.3%
                                                </b>{' '}
                                                of total barangays
                                            </>
                                        }
                                        color="bg-green-100 text-green-700"
                                    />
                                    <Metric
                                        icon="▧"
                                        title="With Complete Profiles"
                                        value="12"
                                        note={
                                            <>
                                                <b className="text-blue-600">
                                                    66.7%
                                                </b>{' '}
                                                of total barangays
                                            </>
                                        }
                                        color="bg-blue-50 text-blue-600"
                                    />
                                    <Metric
                                        icon="!"
                                        title="Needs Update"
                                        value="6"
                                        note={
                                            <>
                                                <b className="text-orange-500">
                                                    33.3%
                                                </b>{' '}
                                                of total barangays
                                            </>
                                        }
                                        color="bg-orange-100 text-orange-500"
                                    />
                                </div>
                                <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <label>
                                            <b className="mb-1.5 block text-xs text-[#092d62]">
                                                Search Barangay
                                            </b>
                                            <input
                                                value={query}
                                                onChange={(e) =>
                                                    setQuery(e.target.value)
                                                }
                                                placeholder="⌕  Search by name or captain..."
                                                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                                            />
                                        </label>
                                        <label>
                                            <b className="mb-1.5 block text-xs text-[#092d62]">
                                                Filter by Status
                                            </b>
                                            <select
                                                value={status}
                                                onChange={(e) =>
                                                    setStatus(e.target.value)
                                                }
                                                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm"
                                            >
                                                <option>All Statuses</option>
                                                <option>Active</option>
                                                <option>For Review</option>
                                                <option>Incomplete</option>
                                                <option>Inactive</option>
                                            </select>
                                        </label>
                                        <label>
                                            <b className="mb-1.5 block text-xs text-[#092d62]">
                                                Sort By
                                            </b>
                                            <select className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm">
                                                <option>
                                                    Barangay Name (A–Z)
                                                </option>
                                                <option>Population</option>
                                                <option>Last Updated</option>
                                            </select>
                                        </label>
                                    </div>
                                </section>
                                <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-240 text-left text-xs">
                                            <thead className="bg-blue-50 text-[#092d62]">
                                                <tr>
                                                    {[
                                                        'Barangay Name',
                                                        'Barangay Captain',
                                                        'Contact Number',
                                                        'Address / Location',
                                                        'Population',
                                                        'Status',
                                                        'Last Updated',
                                                        'Actions',
                                                    ].map((h) => (
                                                        <th
                                                            key={h}
                                                            className="px-4 py-3 font-bold"
                                                        >
                                                            {h}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filtered.map((item) => (
                                                    <tr
                                                        key={item.name}
                                                        className="border-t border-slate-200 hover:bg-slate-50"
                                                    >
                                                        <td className="px-4 py-3 font-bold text-[#0b3978]">
                                                            ⌖ &nbsp; {item.name}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {item.captain}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {item.contact}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {item.name},
                                                            Villanueva, M.O.
                                                        </td>
                                                        <td className="px-4 py-3 font-semibold">
                                                            {item.population}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span
                                                                className={`rounded-md px-2 py-1 font-semibold ${statusColors[item.status]}`}
                                                            >
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 whitespace-pre-line">
                                                            {item.updated}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex gap-2">
                                                                <button
                                                                    aria-label={`View ${item.name}`}
                                                                    className="size-8 rounded-md border border-slate-200 text-blue-600"
                                                                >
                                                                    ◉
                                                                </button>
                                                                <button
                                                                    aria-label={`Edit ${item.name}`}
                                                                    className="size-8 rounded-md border border-slate-200 text-blue-600"
                                                                >
                                                                    ✎
                                                                </button>
                                                                <button
                                                                    aria-label={`More actions for ${item.name}`}
                                                                    className="size-8 rounded-md border border-slate-200 text-blue-600"
                                                                >
                                                                    ⋮
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex flex-col justify-between gap-3 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center">
                                        <span>
                                            Showing 1 to {filtered.length} of 18
                                            barangays
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <select className="rounded-md border border-slate-300 px-3 py-2">
                                                <option>10 per page</option>
                                            </select>
                                            <button className="size-8 rounded border border-slate-300">
                                                «
                                            </button>
                                            <button className="size-8 rounded bg-blue-600 text-white">
                                                1
                                            </button>
                                            <button className="size-8 rounded border border-slate-300">
                                                2
                                            </button>
                                            <button className="size-8 rounded border border-slate-300">
                                                »
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <aside className="space-y-4">
                                <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <h3 className="mb-3 font-bold text-[#092d62]">
                                        ♣ &nbsp; Barangay Overview
                                    </h3>
                                    {[
                                        ['bg-green-500', 'Active', '15'],
                                        ['bg-amber-400', 'For Review', '2'],
                                        ['bg-orange-500', 'Incomplete', '1'],
                                        ['bg-red-500', 'Inactive', '0'],
                                    ].map(([dot, label, value]) => (
                                        <div
                                            key={label}
                                            className="flex items-center gap-3 py-2 text-xs"
                                        >
                                            <span
                                                className={`size-3 rounded-full ${dot}`}
                                            />
                                            <span>{label}</span>
                                            <b className="ml-auto">{value}</b>
                                        </div>
                                    ))}
                                    <div className="mt-2 flex justify-between border-t border-slate-200 pt-3 text-xs font-bold">
                                        <span>Total Barangays</span>
                                        <span>18</span>
                                    </div>
                                </section>
                                <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                                    <h3 className="mb-3 px-1 font-bold text-[#092d62]">
                                        ⌘ &nbsp; Barangay Locations
                                    </h3>
                                    <div className="relative h-46 overflow-hidden rounded-lg bg-[linear-gradient(35deg,#d8eddc_25%,transparent_25%),linear-gradient(145deg,#dceaf7_25%,transparent_25%),linear-gradient(45deg,transparent_70%,#b9ddc5_70%)] bg-size-[80px_80px]">
                                        <div className="absolute inset-0 bg-blue-50/40" />
                                        {[
                                            'left-1/4 top-8',
                                            'left-1/2 top-5',
                                            'left-2/3 top-16',
                                            'left-1/3 top-25',
                                            'left-3/4 top-30',
                                            'left-1/2 top-33',
                                            'left-[15%] top-19',
                                        ].map((position) => (
                                            <span
                                                key={position}
                                                className={`absolute ${position} text-xl text-blue-600`}
                                            >
                                                ●
                                            </span>
                                        ))}
                                        <b className="absolute bottom-7 left-1/2 -translate-x-1/2 text-sm">
                                            Villanueva
                                        </b>
                                    </div>
                                </section>
                                <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <h3 className="mb-4 font-bold text-[#092d62]">
                                        ◷ &nbsp; Recent Updates
                                    </h3>
                                    {[
                                        [
                                            '✓',
                                            'Poblacion profile updated',
                                            'Juan Dela Cruz · May 20, 2025 09:15 AM',
                                            'bg-green-600',
                                        ],
                                        [
                                            '✎',
                                            'Katipunan profile for review',
                                            'Maria Santos · May 17, 2025 11:32 AM',
                                            'bg-blue-500',
                                        ],
                                        [
                                            '▧',
                                            'Imelda profile incomplete',
                                            'Robert Lim · May 11, 2025 08:05 AM',
                                            'bg-orange-500',
                                        ],
                                    ].map(([icon, title, note, color]) => (
                                        <div
                                            key={title}
                                            className="mb-4 flex gap-3"
                                        >
                                            <span
                                                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs text-white ${color}`}
                                            >
                                                {icon}
                                            </span>
                                            <div>
                                                <b className="text-xs text-[#092d62]">
                                                    {title}
                                                </b>
                                                <p className="mt-1 text-[9px] text-slate-500">
                                                    By {note}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="w-full text-xs font-bold text-blue-600">
                                        View all activity &nbsp; →
                                    </button>
                                </section>
                            </aside>
                        </div>
                        <footer className="mt-5 flex flex-col justify-between gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500 sm:flex-row">
                            <span>
                                © 2025 Municipality of Villanueva. All rights
                                reserved.
                            </span>
                            <span>
                                Version 2.3.1 &nbsp; • &nbsp; Built with{' '}
                                <b className="text-red-500">♥</b> for good
                                governance
                            </span>
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}
