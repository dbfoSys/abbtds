import { Form, Head, Link } from '@inertiajs/react';
import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { dashboard } from '@/routes';

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

const overview = [
    [
        '♜',
        'Municipality Name',
        'Villanueva',
        'Official Name',
        'bg-blue-50 text-blue-600',
    ],
    [
        '●',
        'Province',
        'Misamis Oriental',
        'Province',
        'bg-cyan-50 text-cyan-600',
    ],
    [
        '↗',
        'Region',
        'Region X',
        'Northern Mindanao',
        'bg-emerald-50 text-emerald-600',
    ],
    ['♟', 'Number of Barangays', '18', 'Barangays', 'bg-blue-50 text-blue-600'],
    [
        '↗',
        'Income Class',
        '2nd Class',
        'Income Classification',
        'bg-emerald-50 text-emerald-600',
    ],
    [
        '♣',
        'Population',
        '72,358',
        'Latest Population',
        'bg-teal-50 text-teal-600',
    ],
];

function Field({
    label,
    required = false,
    children,
}: {
    label: string;
    required?: boolean;
    children: ReactNode;
}) {
    return (
        <label className="flex min-w-0 flex-col gap-1.5 text-[11px] font-semibold text-[#17345f]">
            <span>
                {label}
                {required && <b className="text-red-500"> *</b>}
            </span>
            {children}
        </label>
    );
}

const inputClass =
    'h-9 min-w-0 w-full rounded-md border border-slate-300 bg-white px-3 text-xs font-normal text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

function Panel({
    icon,
    title,
    children,
    className = '',
}: {
    icon: string;
    title: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}
        >
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#092d62]">
                <span className="flex size-6 items-center justify-center rounded-full bg-blue-50 text-[#0873e6]">
                    {icon}
                </span>
                {title}
            </h3>
            {children}
        </section>
    );
}

export default function MunicipalInformation() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [saved, setSaved] = useState(false);
    const [seal, setSeal] = useState<string | null>(null);
    const sealInput = useRef<HTMLInputElement>(null);

    const selectSeal = (file?: File) => {
        if (!file || !file.type.startsWith('image/')) {
            return;
        }

        setSeal(URL.createObjectURL(file));
    };

    return (
        <>
            <Head title="Municipal Information" />
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
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold text-[#092d62]">
                                Municipal Information
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Manage and maintain the official profile of the
                                municipality.
                            </p>
                        </div>

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                setSaved(true);
                                setTimeout(() => setSaved(false), 2200);
                            }}
                        >
                            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_290px]">
                                <div className="min-w-0 space-y-4">
                                    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                        <h3 className="mb-3 text-sm font-bold text-[#092d62]">
                                            Municipal Profile Overview
                                        </h3>
                                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
                                            {overview.map(
                                                ([
                                                    icon,
                                                    title,
                                                    value,
                                                    note,
                                                    color,
                                                ]) => (
                                                    <div
                                                        key={title}
                                                        className="flex min-h-28 items-start gap-3 rounded-lg border border-slate-200 p-3"
                                                    >
                                                        <span
                                                            className={`flex size-9 shrink-0 items-center justify-center rounded-full text-lg ${color}`}
                                                        >
                                                            {icon}
                                                        </span>
                                                        <div className="min-w-0">
                                                            <p className="text-[9px] font-semibold text-slate-500">
                                                                {title}
                                                            </p>
                                                            <p className="mt-1 text-xs font-bold text-[#092d62]">
                                                                {value}
                                                            </p>
                                                            <p className="mt-5 text-[9px] text-slate-400">
                                                                {note}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </section>

                                    <div className="grid gap-4 lg:grid-cols-2">
                                        <Panel
                                            icon="●"
                                            title="Basic Municipal Information"
                                        >
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                <Field
                                                    label="Municipality Name"
                                                    required
                                                >
                                                    <input
                                                        className={inputClass}
                                                        defaultValue="Villanueva"
                                                    />
                                                </Field>
                                                <Field
                                                    label="Province"
                                                    required
                                                >
                                                    <select
                                                        className={inputClass}
                                                        defaultValue="Misamis Oriental"
                                                    >
                                                        <option>
                                                            Misamis Oriental
                                                        </option>
                                                    </select>
                                                </Field>
                                                <Field label="Region" required>
                                                    <select
                                                        className={inputClass}
                                                        defaultValue="Region X - Northern Mindanao"
                                                    >
                                                        <option>
                                                            Region X - Northern
                                                            Mindanao
                                                        </option>
                                                    </select>
                                                </Field>
                                                <Field
                                                    label="ZIP Code"
                                                    required
                                                >
                                                    <input
                                                        className={inputClass}
                                                        defaultValue="9011"
                                                    />
                                                </Field>
                                                <Field
                                                    label="PSGC Code"
                                                    required
                                                >
                                                    <input
                                                        className={inputClass}
                                                        defaultValue="104411000"
                                                    />
                                                </Field>
                                                <Field
                                                    label="Income Classification"
                                                    required
                                                >
                                                    <select
                                                        className={inputClass}
                                                        defaultValue="2nd Class"
                                                    >
                                                        <option>
                                                            2nd Class
                                                        </option>
                                                    </select>
                                                </Field>
                                                <Field
                                                    label="Date Established"
                                                    required
                                                >
                                                    <input
                                                        type="date"
                                                        className={inputClass}
                                                        defaultValue="1948-06-21"
                                                    />
                                                </Field>
                                            </div>
                                        </Panel>

                                        <Panel
                                            icon="◆"
                                            title="Location and Address"
                                        >
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                <Field
                                                    label="Municipal Hall Address"
                                                    required
                                                >
                                                    <input
                                                        className={inputClass}
                                                        defaultValue="Poblacion, Villanueva, Misamis Oriental"
                                                    />
                                                </Field>
                                                <Field
                                                    label="District"
                                                    required
                                                >
                                                    <select
                                                        className={inputClass}
                                                        defaultValue="1st District"
                                                    >
                                                        <option>
                                                            1st District
                                                        </option>
                                                        <option>
                                                            2nd District
                                                        </option>
                                                    </select>
                                                </Field>
                                                <Field
                                                    label="Latitude"
                                                    required
                                                >
                                                    <input
                                                        className={inputClass}
                                                        defaultValue="8.7681° N"
                                                    />
                                                </Field>
                                                <Field
                                                    label="Longitude"
                                                    required
                                                >
                                                    <input
                                                        className={inputClass}
                                                        defaultValue="124.9052° E"
                                                    />
                                                </Field>
                                            </div>
                                            <p className="mt-3 text-[11px] font-semibold text-[#17345f]">
                                                Map Preview
                                            </p>
                                            <div className="mt-1.5 h-36 overflow-hidden rounded-lg border border-slate-200">
                                                <iframe
                                                    title="Villanueva Municipal Hall map"
                                                    className="h-full w-full"
                                                    loading="lazy"
                                                    src="https://www.openstreetmap.org/export/embed.html?bbox=124.88%2C8.74%2C124.93%2C8.79&layer=mapnik&marker=8.7681%2C124.9052"
                                                />
                                            </div>
                                        </Panel>

                                        <Panel
                                            icon="♟"
                                            title="Administrative Information"
                                        >
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                <Field
                                                    label="Municipal Mayor"
                                                    required
                                                >
                                                    <input
                                                        className={inputClass}
                                                        defaultValue="Hon. Leo Rafael V. Acsillio"
                                                    />
                                                </Field>
                                                <Field
                                                    label="Municipal Treasurer"
                                                    required
                                                >
                                                    <input
                                                        className={inputClass}
                                                        defaultValue="Maria Fe S. Dela Cruz"
                                                    />
                                                </Field>
                                                <Field
                                                    label="Municipal Accountant"
                                                    required
                                                >
                                                    <input
                                                        className={inputClass}
                                                        defaultValue="John Carlo B. Lagaros"
                                                    />
                                                </Field>
                                                <Field
                                                    label="Municipal Administrator"
                                                    required
                                                >
                                                    <input
                                                        className={inputClass}
                                                        defaultValue="Engr. Rexford M. Uy"
                                                    />
                                                </Field>
                                                <Field
                                                    label="Contact Number"
                                                    required
                                                >
                                                    <input
                                                        className={inputClass}
                                                        defaultValue="(088) 856-1234"
                                                    />
                                                </Field>
                                                <Field
                                                    label="Official Email"
                                                    required
                                                >
                                                    <input
                                                        type="email"
                                                        className={inputClass}
                                                        defaultValue="mayorsoffice@villanueva.gov.ph"
                                                    />
                                                </Field>
                                                <Field
                                                    label="Office Hours"
                                                    required
                                                >
                                                    <input
                                                        className={inputClass}
                                                        defaultValue="8:00 AM - 5:00 PM (Mon - Fri)"
                                                    />
                                                </Field>
                                            </div>
                                        </Panel>

                                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                            <Panel
                                                icon="♣"
                                                title="Demographic and Profile Details"
                                            >
                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    <Field
                                                        label="Population (Latest)"
                                                        required
                                                    >
                                                        <input
                                                            className={
                                                                inputClass
                                                            }
                                                            defaultValue="72,358"
                                                        />
                                                    </Field>
                                                    <Field
                                                        label="Land Area"
                                                        required
                                                    >
                                                        <div className="flex">
                                                            <input
                                                                className={`${inputClass} rounded-r-none`}
                                                                defaultValue="20,450.00"
                                                            />
                                                            <span className="flex h-9 items-center rounded-r-md border border-l-0 border-slate-300 bg-slate-50 px-3 text-[10px]">
                                                                hectares
                                                            </span>
                                                        </div>
                                                    </Field>
                                                    <div className="sm:col-span-2">
                                                        <Field
                                                            label="Number of Barangays"
                                                            required
                                                        >
                                                            <input
                                                                className={
                                                                    inputClass
                                                                }
                                                                defaultValue="18"
                                                            />
                                                        </Field>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <Field
                                                            label="Urban/Rural Classification"
                                                            required
                                                        >
                                                            <select
                                                                className={
                                                                    inputClass
                                                                }
                                                                defaultValue="Rural"
                                                            >
                                                                <option>
                                                                    Rural
                                                                </option>
                                                                <option>
                                                                    Urban
                                                                </option>
                                                            </select>
                                                        </Field>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <Field label="Major Economic Activity">
                                                            <textarea
                                                                className={`${inputClass} h-17 py-2`}
                                                                defaultValue="Agriculture, Forestry, Fishing, and Local Trade"
                                                            />
                                                        </Field>
                                                    </div>
                                                </div>
                                            </Panel>
                                            <Panel
                                                icon="▤"
                                                title="Notes / Remarks"
                                            >
                                                <Field label="Additional Notes or Remarks">
                                                    <textarea
                                                        className={`${inputClass} h-48 resize-none py-2`}
                                                        maxLength={1000}
                                                        defaultValue="Villanueva is an agricultural municipality with steady growth in agri-based enterprises. The LGU continues to promote good governance, transparency, and inclusive development for all constituents."
                                                    />
                                                </Field>
                                                <p className="mt-2 text-right text-[10px] text-slate-400">
                                                    247 / 1000 characters
                                                </p>
                                            </Panel>
                                        </div>
                                    </div>
                                </div>

                                <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:sticky xl:top-22">
                                    <h3 className="text-sm font-bold text-[#092d62]">
                                        Municipality Seal
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            sealInput.current?.click()
                                        }
                                        className="mx-auto mt-5 flex size-36 items-center justify-center overflow-hidden rounded-full border-4 border-[#092d62] bg-blue-50 text-center text-xs font-bold text-[#092d62] shadow-inner"
                                    >
                                        {seal ? (
                                            <img
                                                src={seal}
                                                alt="Municipality seal preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span>
                                                🏛️
                                                <br />
                                                MUNICIPALITY OF
                                                <br />
                                                VILLANUEVA
                                                <br />
                                                <small>
                                                    Click to upload seal
                                                </small>
                                            </span>
                                        )}
                                    </button>
                                    <input
                                        ref={sealInput}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(event) =>
                                            selectSeal(event.target.files?.[0])
                                        }
                                    />
                                    <div className="mt-4 text-center">
                                        <p className="font-bold text-[#092d62]">
                                            Municipality of Villanueva
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Misamis Oriental
                                        </p>
                                    </div>
                                    <div className="my-5 border-t border-slate-200" />
                                    <h4 className="text-sm font-bold text-[#092d62]">
                                        Quick Information
                                    </h4>
                                    <dl className="mt-3 space-y-3 text-xs">
                                        {[
                                            ['PSGC Code', '104411000'],
                                            ['ZIP Code', '9011'],
                                            ['Income Class', '2nd Class'],
                                            [
                                                'Date Established',
                                                'June 21, 1948',
                                            ],
                                            ['Time Zone', 'PHT (UTC+8)'],
                                        ].map(([label, value]) => (
                                            <div
                                                key={label}
                                                className="flex justify-between gap-3 border-b border-slate-100 pb-2"
                                            >
                                                <dt className="text-slate-500">
                                                    {label}
                                                </dt>
                                                <dd className="text-right font-semibold text-[#092d62]">
                                                    {value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </aside>
                            </div>

                            <div className="mt-4 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-4">
                                <Link
                                    href={dashboard()}
                                    className="rounded-md border border-slate-300 bg-white px-7 py-2.5 text-sm font-semibold text-slate-700"
                                >
                                    × &nbsp; Cancel
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSaved(true);
                                        setTimeout(() => setSaved(false), 2200);
                                    }}
                                    className="rounded-md border border-blue-500 bg-white px-7 py-2.5 text-sm font-semibold text-blue-600"
                                >
                                    ▣ &nbsp; Save Draft
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-[#0873e6] px-8 py-2.5 text-sm font-semibold text-white shadow-sm"
                                >
                                    ✓ &nbsp;{' '}
                                    {saved
                                        ? 'Information Saved'
                                        : 'Update Information'}
                                </button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </>
    );
}
