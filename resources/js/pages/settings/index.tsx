import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';

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

function Toggle({
    enabled,
    onChange,
}: {
    enabled: boolean;
    onChange: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onChange}
            className={`relative h-6 w-11 rounded-full transition ${enabled ? 'bg-[#0873e6]' : 'bg-slate-300'}`}
            role="switch"
            aria-checked={enabled}
        >
            <span
                className={`absolute top-0.75 size-4.5 rounded-full bg-white shadow transition ${enabled ? 'left-5.75' : 'left-0.75'}`}
            />
        </button>
    );
}

function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <label className="grid items-center gap-2 text-[11px] font-semibold text-[#17345f] sm:grid-cols-[1fr_1.65fr]">
            {label}
            {children}
        </label>
    );
}

function Select({ value }: { value: string }) {
    return (
        <select
            defaultValue={value}
            className="h-9 min-w-0 rounded-md border border-slate-300 bg-white px-3 text-[11px] font-normal text-slate-700 outline-none focus:border-blue-500"
        >
            <option>{value}</option>
        </select>
    );
}

function TextInput({ value }: { value: string }) {
    return (
        <input
            defaultValue={value}
            className="h-9 min-w-0 rounded-md border border-slate-300 px-3 text-[11px] font-normal text-slate-700 outline-none focus:border-blue-500"
        />
    );
}

function SettingPanel({
    icon,
    number,
    title,
    children,
}: {
    icon: string;
    number: number;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="flex items-center gap-3 text-sm font-bold text-[#092d62]">
                <span className="flex size-7 items-center justify-center rounded-full bg-blue-50 text-lg text-[#0873e6]">
                    {icon}
                </span>
                {number}. {title}
            </h3>
            <div className="mt-5 flex flex-col gap-4">{children}</div>
        </section>
    );
}

function SettingsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [saved, setSaved] = useState(false);
    const [toggles, setToggles] = useState({
        autoBalance: true,
        posted: false,
        email: true,
        inApp: true,
        submission: true,
        backup: true,
        audit: true,
        maintenance: false,
        twoFactor: true,
        lockout: true,
    });
    const toggle = (key: keyof typeof toggles) =>
        setToggles((current) => ({ ...current, [key]: !current[key] }));

    return (
        <>
            <Head title="System Settings" />
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
                                    className={`flex items-center gap-4 rounded-lg px-3 py-3 text-sm font-semibold transition ${index === 12 ? 'bg-gradient-to-r from-[#1589f5] to-[#1774e7] shadow-lg' : 'text-white/90 hover:bg-white/10'}`}
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
                        <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
                            <div className="flex items-center gap-4">
                                <span className="flex size-14 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-3xl text-[#0873e6] shadow-[inset_0_-4px_0_#0873e6]">
                                    ⚙
                                </span>
                                <div>
                                    <h2 className="text-2xl font-bold text-[#092d62]">
                                        System Settings
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Manage system configuration,
                                        preferences, security, and maintenance
                                        settings.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="rounded-lg border border-[#0873e6] bg-white px-5 py-2.5 text-sm font-semibold text-[#092d62]"
                                >
                                    ↻ &nbsp; Reset to Default
                                </button>
                                <Link
                                    href="/dashboard"
                                    className="rounded-lg border border-slate-300 bg-white px-7 py-2.5 text-sm font-semibold text-slate-700"
                                >
                                    Cancel
                                </Link>
                                <button
                                    onClick={() => {
                                        setSaved(true);
                                        setTimeout(() => setSaved(false), 2200);
                                    }}
                                    className="rounded-lg bg-[#0873e6] px-7 py-2.5 text-sm font-semibold text-white shadow-md"
                                >
                                    ✓ &nbsp;{' '}
                                    {saved ? 'Changes Saved' : 'Save Changes'}
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
                            <SettingPanel
                                icon="⚙"
                                number={1}
                                title="General Settings"
                            >
                                <Field label="System Name">
                                    <TextInput value="Barangay Financial Operations System" />
                                </Field>
                                <Field label="Municipality/Office Name">
                                    <TextInput value="Municipality of Villanueva" />
                                </Field>
                                <Field label="Time Zone">
                                    <Select value="(GMT +08:00) Asia/Manila" />
                                </Field>
                                <Field label="Date Format">
                                    <Select value="May 20, 2025 (MMMM D, YYYY)" />
                                </Field>
                                <Field label="Language">
                                    <Select value="English" />
                                </Field>
                                <Field label="Fiscal Year">
                                    <Select value="Calendar Year" />
                                </Field>
                                <Field label="Contact Email">
                                    <TextInput value="bfarms.villanueva@gmail.com" />
                                </Field>
                                <Field label="Office Address">
                                    <textarea
                                        defaultValue="Municipal Hall, Poblacion, Villanueva, Misamis Oriental, Philippines 9024"
                                        className="min-h-14 rounded-md border border-slate-300 px-3 py-2 text-[11px] font-normal"
                                    />
                                </Field>
                            </SettingPanel>

                            <SettingPanel
                                icon="♟"
                                number={2}
                                title="User and Access Settings"
                            >
                                <Field label="Role Management">
                                    <button className="h-9 rounded-md border border-[#0873e6] font-semibold text-[#0873e6]">
                                        Manage Roles
                                    </button>
                                </Field>
                                <Field label="Default User Permissions">
                                    <Select value="View Only" />
                                </Field>
                                <Field label="Session Timeout">
                                    <Select value="30 minutes" />
                                </Field>
                                <Field label="Password Policy">
                                    <button className="h-9 rounded-md border border-[#0873e6] font-semibold text-[#0873e6]">
                                        Configure Policy
                                    </button>
                                </Field>
                                <Field label="Two-Factor Authentication">
                                    <span className="flex items-center gap-2">
                                        <Toggle
                                            enabled={toggles.twoFactor}
                                            onChange={() => toggle('twoFactor')}
                                        />
                                        <small>Enabled</small>
                                    </span>
                                </Field>
                                <Field label="Account Lockout">
                                    <span className="flex items-center gap-2">
                                        <Toggle
                                            enabled={toggles.lockout}
                                            onChange={() => toggle('lockout')}
                                        />
                                        <small>Enabled</small>
                                    </span>
                                </Field>
                            </SettingPanel>

                            <SettingPanel
                                icon="₱"
                                number={3}
                                title="Financial Settings"
                            >
                                <Field label="Default Currency">
                                    <Select value="PHP - Philippine Peso (₱)" />
                                </Field>
                                <Field label="Budget Threshold Alerts">
                                    <div className="relative">
                                        <input
                                            defaultValue="80"
                                            className="h-9 w-full rounded-md border border-slate-300 px-3 text-[11px]"
                                        />
                                        <span className="absolute top-2 right-3">
                                            %
                                        </span>
                                    </div>
                                </Field>
                                <Field label="Automatic Balance Computation">
                                    <span className="flex items-center gap-2">
                                        <Toggle
                                            enabled={toggles.autoBalance}
                                            onChange={() =>
                                                toggle('autoBalance')
                                            }
                                        />
                                        <small>Enabled</small>
                                    </span>
                                </Field>
                                <Field label="Report Numbering Format">
                                    <TextInput value="RPT-{YYYY}-{MM}-{0000}" />
                                </Field>
                                <Field label="Financial Year Start">
                                    <Select value="January" />
                                </Field>
                                <Field label="Financial Year End">
                                    <Select value="December" />
                                </Field>
                                <Field label="Allow Editing of Posted Records">
                                    <span className="flex items-center gap-2">
                                        <Toggle
                                            enabled={toggles.posted}
                                            onChange={() => toggle('posted')}
                                        />
                                        <small>Disabled</small>
                                    </span>
                                </Field>
                            </SettingPanel>

                            <SettingPanel
                                icon="♟"
                                number={4}
                                title="Notification Settings"
                            >
                                <Field label="Email Notifications">
                                    <span className="flex items-center gap-2">
                                        <Toggle
                                            enabled={toggles.email}
                                            onChange={() => toggle('email')}
                                        />
                                        <small>Enabled</small>
                                    </span>
                                </Field>
                                <Field label="In-app Alerts">
                                    <span className="flex items-center gap-2">
                                        <Toggle
                                            enabled={toggles.inApp}
                                            onChange={() => toggle('inApp')}
                                        />
                                        <small>Enabled</small>
                                    </span>
                                </Field>
                                <Field label="Reminder Frequency">
                                    <Select value="Daily" />
                                </Field>
                                <Field label="Upcoming Submission Alerts">
                                    <span className="flex items-center gap-2">
                                        <Toggle
                                            enabled={toggles.submission}
                                            onChange={() =>
                                                toggle('submission')
                                            }
                                        />
                                        <small>Enabled</small>
                                    </span>
                                </Field>
                            </SettingPanel>

                            <SettingPanel
                                icon="☁"
                                number={5}
                                title="Backup and Recovery"
                            >
                                <Field label="Automatic Backup">
                                    <span className="flex items-center gap-2">
                                        <Toggle
                                            enabled={toggles.backup}
                                            onChange={() => toggle('backup')}
                                        />
                                        <small>Enabled</small>
                                    </span>
                                </Field>
                                <Field label="Backup Frequency">
                                    <Select value="Daily" />
                                </Field>
                                <Field label="Last Backup Status">
                                    <span>
                                        <b className="rounded-full bg-green-100 px-3 py-1 text-[10px] text-green-700">
                                            Successful
                                        </b>
                                        <small className="mt-2 block text-slate-500">
                                            May 20, 2025 02:15 AM
                                        </small>
                                    </span>
                                </Field>
                                <button className="h-10 rounded-md border border-[#0873e6] font-semibold text-[#0873e6]">
                                    ↻ &nbsp; Restore Backup
                                </button>
                                <button className="h-10 rounded-md border border-[#0873e6] font-semibold text-[#0873e6]">
                                    ↥ &nbsp; Export Data
                                </button>
                            </SettingPanel>

                            <SettingPanel
                                icon="◈"
                                number={6}
                                title="Audit and Logs"
                            >
                                <Field label="Enable Audit Trail">
                                    <span className="flex items-center gap-2">
                                        <Toggle
                                            enabled={toggles.audit}
                                            onChange={() => toggle('audit')}
                                        />
                                        <small>Enabled</small>
                                    </span>
                                </Field>
                                <Field label="Log Retention Period">
                                    <Select value="2 Years" />
                                </Field>
                                <button className="mt-10 h-10 rounded-md border border-[#0873e6] font-semibold text-[#0873e6]">
                                    ▧ &nbsp; View Logs
                                </button>
                            </SettingPanel>

                            <SettingPanel
                                icon="◉"
                                number={7}
                                title="Appearance and Preferences"
                            >
                                <Field label="Theme Color">
                                    <Select value="🔵  Blue (Default)" />
                                </Field>
                                <Field label="Dashboard Default View">
                                    <Select value="Dashboard Overview" />
                                </Field>
                                <Field label="Table Row Density">
                                    <Select value="Comfortable" />
                                </Field>
                                <Field label="Logo Upload">
                                    <div className="flex min-h-23 items-center gap-3 rounded-md border border-dashed border-slate-400 p-2">
                                        <img
                                            src="/images/dbfos-logo.png"
                                            alt="Current DBFOS logo"
                                            className="size-15 object-contain"
                                        />
                                        <span className="text-center text-[10px] font-normal">
                                            Drag and drop or click to upload
                                            <br />
                                            <small className="text-slate-500">
                                                PNG, JPG (Max. 2MB)
                                            </small>
                                            <b className="mt-2 block text-[#0873e6]">
                                                Change Logo
                                            </b>
                                        </span>
                                    </div>
                                </Field>
                            </SettingPanel>

                            <SettingPanel
                                icon="⚒"
                                number={8}
                                title="Maintenance"
                            >
                                <Field label="Database Health Status">
                                    <b className="w-fit rounded-full bg-green-100 px-3 py-1 text-[10px] text-green-700">
                                        Healthy ✓
                                    </b>
                                </Field>
                                <Field label="Clear Cache">
                                    <button className="h-9 rounded-md border border-[#0873e6] font-semibold text-[#0873e6]">
                                        ♨ &nbsp; Clear Cache
                                    </button>
                                </Field>
                                <Field label="System Update">
                                    <span className="text-[10px] font-normal text-slate-600">
                                        Current Version: v2.3.1
                                        <b className="mt-2 block text-green-600">
                                            Up to date ✓
                                        </b>
                                    </span>
                                </Field>
                                <Field label="Maintenance Mode">
                                    <span className="flex items-center gap-2">
                                        <Toggle
                                            enabled={toggles.maintenance}
                                            onChange={() =>
                                                toggle('maintenance')
                                            }
                                        />
                                        <small>Disabled</small>
                                    </span>
                                </Field>
                                <p className="text-[10px] text-slate-500">
                                    System will be accessible to administrators
                                    only.
                                </p>
                            </SettingPanel>
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
            </div>
        </>
    );
}

export default SettingsPage;
