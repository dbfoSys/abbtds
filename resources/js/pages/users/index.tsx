import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import NotificationBell from '@/components/notification-bell';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { store as storeUser } from '@/routes/users';

type UserRow = {
    name: string;
    username: string;
    email: string;
    role: string;
    office: string;
    status: string;
    login: string;
    avatar: string;
    createdAt: string;
};

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

const roleColors: Record<string, string> = {
    'System Administrator': 'bg-indigo-100 text-indigo-700',
    'Barangay Treasurer': 'bg-blue-100 text-blue-700',
    'Punong Barangay': 'bg-purple-100 text-purple-700',
    'Barangay Secretary': 'bg-cyan-100 text-cyan-700',
    'Sangguniang Barangay': 'bg-orange-100 text-orange-700',
    Staff: 'bg-blue-50 text-blue-600',
    Viewer: 'bg-slate-200 text-slate-600',
};
const statusColors: Record<string, string> = {
    Active: 'bg-green-100 text-green-700',
    Inactive: 'bg-red-100 text-red-600',
    Pending: 'bg-orange-100 text-orange-600',
    Locked: 'bg-red-100 text-red-600',
};

function Metric({
    icon,
    title,
    value,
    note,
    color,
    background,
}: {
    icon: string;
    title: string;
    value: string;
    note: React.ReactNode;
    color: string;
    background: string;
}) {
    return (
        <section className="flex min-h-25 items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
            <div
                className="flex size-14 shrink-0 items-center justify-center rounded-full text-3xl"
                style={{ color, background }}
            >
                {icon}
            </div>
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

function NewUserModal({
    onClose,
    onCreated,
}: {
    onClose: () => void;
    onCreated: () => void;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [sendCredentials, setSendCredentials] = useState(false);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#061a38]/55 p-4 backdrop-blur-[2px]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-user-title"
        >
            <button
                className="absolute inset-0"
                onClick={onClose}
                aria-label="Close new user dialog"
            />
            <Form
                {...storeUser.form()}
                resetOnSuccess
                onBefore={() =>
                    !sendCredentials ||
                    window.confirm(
                        'Send an account notification by email?\n\nThe user will receive their username and sign-in instructions. Share the temporary password separately.',
                    )
                }
                onSuccess={() => onCreated()}
                className="relative z-10 max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(4,30,68,0.3)]"
            >
                {({ errors, processing }) => (
                    <>
                        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5 sm:px-8">
                            <div className="flex items-center gap-4">
                                <span className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-2xl text-[#0873e6]">
                                    ♟
                                </span>
                                <div>
                                    <h2
                                        id="new-user-title"
                                        className="text-xl font-bold text-[#092d62]"
                                    >
                                        New User Details
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Create an account and assign system
                                        access.
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex size-9 items-center justify-center rounded-full text-2xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-6 px-6 py-6 sm:px-8">
                            {Object.entries(errors).length > 0 && (
                                <div
                                    role="alert"
                                    className="rounded-lg bg-red-50 px-4 py-3 text-xs text-red-700"
                                >
                                    {Object.entries(errors).map(
                                        ([field, message]) => (
                                            <p key={field}>{message}</p>
                                        ),
                                    )}
                                </div>
                            )}
                            <section>
                                <h3 className="flex items-center gap-2 text-sm font-bold text-[#092d62]">
                                    <span className="flex size-7 items-center justify-center rounded-full bg-blue-100 text-[#0873e6]">
                                        1
                                    </span>
                                    Personal Information
                                </h3>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    <label className="text-xs font-semibold text-slate-700">
                                        First Name{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            name="first_name"
                                            required
                                            placeholder="Enter first name"
                                            className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 font-normal outline-none focus:border-[#0873e6] focus:ring-3 focus:ring-blue-100"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-slate-700">
                                        Last Name{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            name="last_name"
                                            required
                                            placeholder="Enter last name"
                                            className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 font-normal outline-none focus:border-[#0873e6] focus:ring-3 focus:ring-blue-100"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-slate-700">
                                        Middle Name
                                        <input
                                            name="middle_name"
                                            placeholder="Enter middle name (optional)"
                                            className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 font-normal outline-none focus:border-[#0873e6]"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-slate-700">
                                        Contact Number
                                        <input
                                            name="contact_number"
                                            placeholder="e.g. 0917 123 4567"
                                            className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 font-normal outline-none focus:border-[#0873e6]"
                                        />
                                    </label>
                                </div>
                            </section>

                            <section className="border-t border-slate-100 pt-5">
                                <h3 className="flex items-center gap-2 text-sm font-bold text-[#092d62]">
                                    <span className="flex size-7 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                                        2
                                    </span>
                                    Account Information
                                </h3>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    <label className="text-xs font-semibold text-slate-700">
                                        Username{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            name="username"
                                            required
                                            placeholder="Enter username"
                                            autoComplete="off"
                                            className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 font-normal outline-none focus:border-[#0873e6] focus:ring-3 focus:ring-blue-100"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-slate-700">
                                        Email Address{' '}
                                        <b className="text-red-500">*</b>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="name@villanueva.gov.ph"
                                            className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 font-normal outline-none focus:border-[#0873e6] focus:ring-3 focus:ring-blue-100"
                                        />
                                    </label>
                                    <label className="text-xs font-semibold text-slate-700 sm:col-span-2">
                                        Temporary Password{' '}
                                        <b className="text-red-500">*</b>
                                        <div className="relative mt-2">
                                            <input
                                                name="password"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                required
                                                minLength={8}
                                                autoComplete="new-password"
                                                className="h-11 w-full rounded-lg border border-slate-300 px-3 pr-20 font-normal outline-none focus:border-[#0873e6] focus:ring-3 focus:ring-blue-100"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        (visible) => !visible,
                                                    )
                                                }
                                                className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-semibold text-[#0873e6]"
                                            >
                                                {showPassword ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                        <span className="mt-1.5 block text-[10px] font-normal text-slate-500">
                                            Minimum of 8 characters. Give this
                                            temporary password to the user
                                            securely.
                                        </span>
                                    </label>
                                </div>
                            </section>

                            <section className="border-t border-slate-100 pt-5">
                                <h3 className="flex items-center gap-2 text-sm font-bold text-[#092d62]">
                                    <span className="flex size-7 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                                        3
                                    </span>
                                    Role and Access
                                </h3>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    <label className="text-xs font-semibold text-slate-700">
                                        User Role{' '}
                                        <b className="text-red-500">*</b>
                                        <select
                                            name="role"
                                            required
                                            defaultValue="System Administrator"
                                            className="mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 font-normal outline-none focus:border-[#0873e6]"
                                        >
                                            <option>
                                                System Administrator
                                            </option>
                                            <option>Punong Barangay</option>
                                            <option>Barangay Treasurer</option>
                                            <option>Barangay Secretary</option>
                                            <option>
                                                Sangguniang Barangay
                                            </option>
                                            <option>Staff</option>
                                            <option>Viewer</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-slate-700">
                                        Barangay / Office{' '}
                                        <b className="text-red-500">*</b>
                                        <select
                                            name="office"
                                            required
                                            defaultValue="Municipal Office"
                                            className="mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 font-normal outline-none focus:border-[#0873e6]"
                                        >
                                            <option>Municipal Office</option>
                                            <option>Barangay Poblacion</option>
                                            <option>Barangay Tagoloan</option>
                                            <option>Barangay Luneta</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-slate-700">
                                        Account Status
                                        <select
                                            name="status"
                                            className="mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 font-normal outline-none focus:border-[#0873e6]"
                                        >
                                            <option>Active</option>
                                            <option>Pending</option>
                                            <option>Inactive</option>
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold text-slate-700">
                                        Access Expiration
                                        <select
                                            name="expiration"
                                            className="mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 font-normal outline-none focus:border-[#0873e6]"
                                        >
                                            <option>No expiration</option>
                                            <option>30 days</option>
                                            <option>90 days</option>
                                            <option>1 year</option>
                                        </select>
                                    </label>
                                </div>
                            </section>

                            <label className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-slate-700">
                                <input
                                    name="send_credentials"
                                    type="checkbox"
                                    value="1"
                                    checked={sendCredentials}
                                    onChange={(event) =>
                                        setSendCredentials(event.target.checked)
                                    }
                                    className="mt-0.5 size-4 accent-[#0873e6]"
                                />
                                <span>
                                    <b className="block text-[#092d62]">
                                        Send account notification by email
                                    </b>
                                    <span className="mt-1 block text-slate-500">
                                        The user will receive their username and
                                        sign-in instructions. Share the
                                        temporary password separately.
                                    </span>
                                </span>
                            </label>
                        </div>

                        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
                            <button
                                type="button"
                                onClick={onClose}
                                className="h-11 rounded-lg border border-slate-300 bg-white px-7 text-sm font-semibold text-slate-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="h-11 rounded-lg bg-[#0873e6] px-7 text-sm font-semibold text-white shadow-md shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing
                                    ? 'Creating Account...'
                                    : '＋  Create User Account'}
                            </button>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
}

function UsersPage({ users }: { users: UserRow[] }) {
    const { auth } = usePage<{
        auth: { user: { name: string; role: string } };
    }>().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [role, setRole] = useState('All Roles');
    const [status, setStatus] = useState('All Statuses');
    const [office, setOffice] = useState('All Barangays / Offices');
    const [showNewUser, setShowNewUser] = useState(false);
    const [created, setCreated] = useState(false);
    const filtered = useMemo(
        () =>
            users
                .filter(
                    (user) =>
                        (role === 'All Roles' || user.role === role) &&
                        (status === 'All Statuses' || user.status === status) &&
                        (office === 'All Barangays / Offices' ||
                            user.office === office) &&
                        `${user.name} ${user.username} ${user.email}`
                            .toLowerCase()
                            .includes(query.toLowerCase()),
                )
                .sort((first, second) => first.name.localeCompare(second.name)),
        [office, query, role, status, users],
    );
    const activeUsers = users.filter((user) => user.status === 'Active').length;
    const inactiveUsers = users.filter(
        (user) => user.status === 'Inactive',
    ).length;
    const administrators = users.filter(
        (user) => user.role === 'System Administrator',
    ).length;
    const treasurersAndStaff = users.filter((user) =>
        ['Barangay Treasurer', 'Staff'].includes(user.role),
    ).length;
    const percentage = (count: number) =>
        users.length === 0
            ? '0%'
            : `${((count / users.length) * 100).toFixed(1)}%`;

    return (
        <>
            <Head title="User Management" />
            <div className="min-h-screen bg-[#f7f9fc] font-sans text-slate-800">
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
                            label === 'User Management' &&
                            auth.user.role !==
                                'System Administrator' ? null : label ===
                              'Master Data' ? (
                                <MasterDataMenu key={label} />
                            ) : label === 'Transaction' ? (
                                <TransactionMenu key={label} />
                            ) : label === 'Reports' ? (
                                <ReportsMenu key={label} />
                            ) : (
                                <Link
                                    key={label}
                                    href={href}
                                    className={`flex items-center gap-4 rounded-lg px-3 py-3 text-sm font-semibold transition ${index === 11 ? 'bg-gradient-to-r from-[#1589f5] to-[#1774e7] shadow-lg' : 'text-white/90 hover:bg-white/10'}`}
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
                                    {auth.user.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {auth.user.role}
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
                        <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
                            <div className="flex items-center gap-4">
                                <span className="flex size-14 items-center justify-center rounded-xl bg-blue-50 text-3xl text-[#0873e6]">
                                    ♟
                                </span>
                                <div>
                                    <h2 className="text-2xl font-bold text-[#092d62]">
                                        User Management
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Manage user accounts, roles,
                                        permissions, and account access.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {auth.user.role === 'System Administrator' && (
                                    <button
                                        onClick={() => setShowNewUser(true)}
                                        className="rounded-lg bg-[#0873e6] px-6 py-2.5 text-sm font-semibold text-white shadow-md"
                                    >
                                        ＋ &nbsp; Add New User
                                    </button>
                                )}
                                <button className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-[#092d62]">
                                    ⇩ &nbsp; Export Users
                                </button>
                                <button className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-[#092d62]">
                                    ♢ &nbsp; Role Permissions
                                </button>
                            </div>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                            <Metric
                                icon="♟"
                                title="Total Users"
                                value={String(users.length)}
                                note="All user accounts"
                                color="#0873e6"
                                background="#e6f1ff"
                            />
                            <Metric
                                icon="♟"
                                title="Active Users"
                                value={String(activeUsers)}
                                note={
                                    <>
                                        <b className="text-green-600">
                                            {percentage(activeUsers)}
                                        </b>{' '}
                                        of total users
                                    </>
                                }
                                color="#139b50"
                                background="#e5f6ea"
                            />
                            <Metric
                                icon="♟"
                                title="Inactive Users"
                                value={String(inactiveUsers)}
                                note={
                                    <>
                                        <b className="text-orange-600">
                                            {percentage(inactiveUsers)}
                                        </b>{' '}
                                        of total users
                                    </>
                                }
                                color="#f58b0b"
                                background="#fff0df"
                            />
                            <Metric
                                icon="♜"
                                title="Administrators"
                                value={String(administrators)}
                                note={
                                    <>
                                        <b className="text-purple-600">
                                            {percentage(administrators)}
                                        </b>{' '}
                                        of total users
                                    </>
                                }
                                color="#7651d4"
                                background="#eee8ff"
                            />
                            <Metric
                                icon="♟"
                                title="Treasurers / Staff"
                                value={String(treasurersAndStaff)}
                                note={
                                    <>
                                        <b className="text-cyan-600">
                                            {percentage(treasurersAndStaff)}
                                        </b>{' '}
                                        of total users
                                    </>
                                }
                                color="#0ba5aa"
                                background="#e0f6f7"
                            />
                        </div>

                        <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_285px]">
                            <div className="min-w-0">
                                <section className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 xl:grid-cols-5">
                                    <label className="text-[11px] font-semibold">
                                        Search User
                                        <div className="relative mt-2">
                                            <span className="absolute top-2 left-3 text-lg text-slate-400">
                                                ⌕
                                            </span>
                                            <input
                                                value={query}
                                                onChange={(event) =>
                                                    setQuery(event.target.value)
                                                }
                                                placeholder="Search by name, username, or email..."
                                                className="h-9 w-full rounded-md border border-slate-300 pl-9 text-[11px] outline-none"
                                            />
                                        </div>
                                    </label>
                                    <label className="text-[11px] font-semibold">
                                        Filter by Role
                                        <select
                                            value={role}
                                            onChange={(event) =>
                                                setRole(event.target.value)
                                            }
                                            className="mt-2 h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-[11px]"
                                        >
                                            <option>All Roles</option>
                                            {[
                                                ...new Set(
                                                    users.map(
                                                        (user) => user.role,
                                                    ),
                                                ),
                                            ].map((value) => (
                                                <option key={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="text-[11px] font-semibold">
                                        Filter by Status
                                        <select
                                            value={status}
                                            onChange={(event) =>
                                                setStatus(event.target.value)
                                            }
                                            className="mt-2 h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-[11px]"
                                        >
                                            <option>All Statuses</option>
                                            {[
                                                'Active',
                                                'Inactive',
                                                'Pending',
                                                'Locked',
                                            ].map((value) => (
                                                <option key={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="text-[11px] font-semibold">
                                        Filter by Barangay / Office
                                        <select
                                            value={office}
                                            onChange={(event) =>
                                                setOffice(event.target.value)
                                            }
                                            className="mt-2 h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-[11px]"
                                        >
                                            <option>
                                                All Barangays / Offices
                                            </option>
                                            {[
                                                ...new Set(
                                                    users.map(
                                                        (user) => user.office,
                                                    ),
                                                ),
                                            ].map((value) => (
                                                <option key={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="text-[11px] font-semibold">
                                        Sort By
                                        <select className="mt-2 h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-[11px]">
                                            <option>Name (A–Z)</option>
                                        </select>
                                    </label>
                                </section>

                                <section className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-235 text-left text-[10px]">
                                            <thead className="bg-[#e9f3ff] text-[#092d62]">
                                                <tr>
                                                    {[
                                                        'Profile / Name',
                                                        'Username / Email',
                                                        'Role',
                                                        'Barangay / Office',
                                                        'Status',
                                                        'Last Login',
                                                        'Actions',
                                                    ].map((heading) => (
                                                        <th
                                                            key={heading}
                                                            className="px-4 py-3 font-bold"
                                                        >
                                                            {heading}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filtered.map((user) => (
                                                    <tr
                                                        key={user.username}
                                                        className="border-b last:border-0"
                                                    >
                                                        <td className="px-4 py-2">
                                                            <div className="flex items-center gap-3">
                                                                <span className="flex size-9 items-center justify-center rounded-full bg-orange-100 text-xl">
                                                                    {
                                                                        user.avatar
                                                                    }
                                                                </span>
                                                                <span>
                                                                    <b className="block text-[11px]">
                                                                        {
                                                                            user.name
                                                                        }
                                                                    </b>
                                                                    <small className="text-slate-500">
                                                                        {
                                                                            user.username
                                                                        }
                                                                    </small>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            <span
                                                                className={`rounded-md px-2 py-1 whitespace-nowrap ${roleColors[user.role]}`}
                                                            >
                                                                {user.role}
                                                            </span>
                                                        </td>
                                                        <td>{user.office}</td>
                                                        <td>
                                                            <span
                                                                className={`rounded-full px-2 py-1 ${statusColors[user.status]}`}
                                                            >
                                                                {user.status}
                                                            </span>
                                                        </td>
                                                        <td className="whitespace-pre-line">
                                                            {user.login}
                                                        </td>
                                                        <td>
                                                            <div className="flex gap-2">
                                                                {[
                                                                    '◉',
                                                                    '✎',
                                                                    '⚿',
                                                                    '⋮',
                                                                ].map(
                                                                    (
                                                                        action,
                                                                        index,
                                                                    ) => (
                                                                        <button
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="flex size-8 items-center justify-center rounded-md border border-slate-200 text-sm text-[#0873e6]"
                                                                        >
                                                                            {
                                                                                action
                                                                            }
                                                                        </button>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex flex-col items-center justify-between gap-3 px-4 py-3 text-[10px] sm:flex-row">
                                        <span>
                                            Showing {filtered.length} of{' '}
                                            {users.length} users
                                        </span>
                                    </div>
                                </section>
                            </div>

                            <aside className="flex flex-col gap-3">
                                <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <h3 className="text-sm font-bold text-[#092d62]">
                                        ⚄ &nbsp; Role Overview
                                    </h3>
                                    <div className="mt-3">
                                        {[
                                            [
                                                '♟',
                                                'System Administrator',
                                                'Full system access',
                                                '#0873e6',
                                            ],
                                            [
                                                '♟',
                                                'Punong Barangay',
                                                'Barangay executive access',
                                                '#7651d4',
                                            ],
                                            [
                                                '♙',
                                                'Barangay Treasurer',
                                                'Financial management access',
                                                '#0ba5aa',
                                            ],
                                            [
                                                '▧',
                                                'Barangay Secretary',
                                                'Records and documents access',
                                                '#15aab1',
                                            ],
                                            [
                                                '♙',
                                                'Sangguniang Barangay',
                                                'Legislative access',
                                                '#f58b0b',
                                            ],
                                            [
                                                '◉',
                                                'Viewer',
                                                'Read-only access',
                                                '#7b8798',
                                            ],
                                        ].map((row) => (
                                            <div
                                                key={row[1]}
                                                className="flex items-center gap-3 border-b py-2.5"
                                            >
                                                <span
                                                    className="flex size-8 items-center justify-center rounded-md text-lg"
                                                    style={{
                                                        color: row[3],
                                                        background: `${row[3]}18`,
                                                    }}
                                                >
                                                    {row[0]}
                                                </span>
                                                <span className="flex-1">
                                                    <b className="block text-[11px]">
                                                        {row[1]}
                                                    </b>
                                                    <small className="text-[9px] text-slate-500">
                                                        {row[2]}
                                                    </small>
                                                </span>
                                                <b className="text-sm">
                                                    {
                                                        users.filter(
                                                            (user) =>
                                                                user.role ===
                                                                row[1],
                                                        ).length
                                                    }
                                                </b>
                                            </div>
                                        ))}
                                        <button className="mt-3 h-9 w-full rounded-md border border-[#0873e6] text-xs font-semibold text-[#0873e6]">
                                            ♢ &nbsp; Manage Roles
                                        </button>
                                    </div>
                                </section>
                                <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <h3 className="text-sm font-bold text-[#092d62]">
                                        ♟ &nbsp; Recently Created Accounts
                                    </h3>
                                    <div className="mt-3">
                                        {users.slice(0, 4).map((user) => (
                                            <div
                                                key={user.username}
                                                className="flex items-center gap-3 border-b py-3"
                                            >
                                                <span className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-[#0873e6]">
                                                    {user.avatar}
                                                </span>
                                                <span className="flex-1">
                                                    <b className="block text-[11px]">
                                                        {user.name}
                                                    </b>
                                                    <small className="text-[9px] text-slate-500">
                                                        {user.username}
                                                    </small>
                                                </span>
                                                <span className="text-right text-[8px] whitespace-pre-line text-slate-500">
                                                    {user.createdAt}
                                                </span>
                                            </div>
                                        ))}
                                        {users.length === 0 && (
                                            <p className="py-3 text-xs text-slate-500">
                                                No user accounts yet.
                                            </p>
                                        )}
                                    </div>
                                </section>
                            </aside>
                        </div>
                    </main>
                    <footer className="mt-3 flex flex-col justify-between gap-2 border-t bg-white px-6 py-5 text-[10px] text-slate-500 sm:flex-row">
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
                </div>
                {created && (
                    <div className="fixed right-5 bottom-5 z-50 flex items-center gap-3 rounded-xl bg-[#159653] px-5 py-4 text-sm font-semibold text-white shadow-xl">
                        <span className="flex size-6 items-center justify-center rounded-full bg-white/20">
                            ✓
                        </span>
                        User account created successfully.
                    </div>
                )}
                {showNewUser && (
                    <NewUserModal
                        onClose={() => setShowNewUser(false)}
                        onCreated={() => {
                            setShowNewUser(false);
                            setCreated(true);
                            setTimeout(() => setCreated(false), 3000);
                        }}
                    />
                )}
            </div>
        </>
    );
}

export default UsersPage;
