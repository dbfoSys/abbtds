import { Form, Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { dashboard } from '@/routes';

type Drawer = 'Assets' | 'Liabilities' | 'Equity' | 'Revenue' | 'Expenses';
type AccountKind = 'title' | 'active';
type Tab = 'General' | 'Properties' | 'Details' | 'Position';

type Account = {
    id: number;
    code: string;
    name: string;
    drawer: Drawer;
    parentId: number | null;
    level: number;
    kind: AccountKind;
    balance: number;
    currency: string;
    accountType: string;
    controlAccount: boolean;
    blockManualPosting: boolean;
    cashFlow: string;
    financialClassification: string;
    active: boolean;
};

type Draft = Omit<Account, 'id' | 'balance'>;

const drawers: Drawer[] = [
    'Assets',
    'Liabilities',
    'Equity',
    'Revenue',
    'Expenses',
];

const seed: Account[] = [
    {
        id: 1,
        code: '1.00.00',
        name: 'Current Assets',
        drawer: 'Assets',
        parentId: null,
        level: 2,
        kind: 'title',
        balance: 0,
        currency: 'PHP',
        accountType: 'Other',
        controlAccount: false,
        blockManualPosting: true,
        cashFlow: 'Not Relevant',
        financialClassification: 'Current Asset',
        active: true,
    },
    {
        id: 2,
        code: '1.01.00',
        name: 'Cash and Cash Equivalents',
        drawer: 'Assets',
        parentId: 1,
        level: 3,
        kind: 'title',
        balance: 0,
        currency: 'PHP',
        accountType: 'Other',
        controlAccount: false,
        blockManualPosting: true,
        cashFlow: 'Operating Activities',
        financialClassification: 'Current Asset',
        active: true,
    },
    {
        id: 3,
        code: '1.01.01',
        name: 'Cash on Hand - Local Fund',
        drawer: 'Assets',
        parentId: 2,
        level: 4,
        kind: 'active',
        balance: 120000,
        currency: 'PHP',
        accountType: 'Other',
        controlAccount: false,
        blockManualPosting: false,
        cashFlow: 'Operating Activities',
        financialClassification: 'Current Asset',
        active: true,
    },
    {
        id: 4,
        code: '1.01.02',
        name: 'Cash in Bank - Local Fund',
        drawer: 'Assets',
        parentId: 2,
        level: 4,
        kind: 'active',
        balance: 450750,
        currency: 'PHP',
        accountType: 'Other',
        controlAccount: false,
        blockManualPosting: false,
        cashFlow: 'Operating Activities',
        financialClassification: 'Current Asset',
        active: true,
    },
    {
        id: 5,
        code: '1.02.00',
        name: 'Receivables',
        drawer: 'Assets',
        parentId: 1,
        level: 3,
        kind: 'title',
        balance: 0,
        currency: 'PHP',
        accountType: 'Other',
        controlAccount: false,
        blockManualPosting: true,
        cashFlow: 'Not Relevant',
        financialClassification: 'Current Asset',
        active: true,
    },
    {
        id: 6,
        code: '1.02.01',
        name: 'Receivables - Real Property Tax',
        drawer: 'Assets',
        parentId: 5,
        level: 4,
        kind: 'active',
        balance: 85230,
        currency: 'PHP',
        accountType: 'Other',
        controlAccount: true,
        blockManualPosting: true,
        cashFlow: 'Operating Activities',
        financialClassification: 'Current Asset',
        active: true,
    },
    {
        id: 7,
        code: '2.00.00',
        name: 'Current Liabilities',
        drawer: 'Liabilities',
        parentId: null,
        level: 2,
        kind: 'title',
        balance: 0,
        currency: 'PHP',
        accountType: 'Other',
        controlAccount: false,
        blockManualPosting: true,
        cashFlow: 'Not Relevant',
        financialClassification: 'Current Liability',
        active: true,
    },
    {
        id: 8,
        code: '2.01.00',
        name: 'Accounts Payable',
        drawer: 'Liabilities',
        parentId: 7,
        level: 3,
        kind: 'active',
        balance: 210300,
        currency: 'PHP',
        accountType: 'Other',
        controlAccount: true,
        blockManualPosting: false,
        cashFlow: 'Operating Activities',
        financialClassification: 'Current Liability',
        active: true,
    },
    {
        id: 9,
        code: '3.00.00',
        name: 'Fund Balance',
        drawer: 'Equity',
        parentId: null,
        level: 2,
        kind: 'title',
        balance: 0,
        currency: 'PHP',
        accountType: 'Other',
        controlAccount: false,
        blockManualPosting: true,
        cashFlow: 'Not Relevant',
        financialClassification: 'Equity',
        active: true,
    },
    {
        id: 10,
        code: '3.01.00',
        name: 'Fund Balance - Unappropriated',
        drawer: 'Equity',
        parentId: 9,
        level: 3,
        kind: 'active',
        balance: 980600,
        currency: 'PHP',
        accountType: 'Other',
        controlAccount: false,
        blockManualPosting: false,
        cashFlow: 'Financing Activities',
        financialClassification: 'Equity',
        active: true,
    },
    {
        id: 11,
        code: '4.00.00',
        name: 'Tax Revenue',
        drawer: 'Revenue',
        parentId: null,
        level: 2,
        kind: 'title',
        balance: 0,
        currency: 'PHP',
        accountType: 'Revenue',
        controlAccount: false,
        blockManualPosting: true,
        cashFlow: 'Not Relevant',
        financialClassification: 'Revenue',
        active: true,
    },
    {
        id: 12,
        code: '5.00.00',
        name: 'Personnel Services',
        drawer: 'Expenses',
        parentId: null,
        level: 2,
        kind: 'title',
        balance: 0,
        currency: 'PHP',
        accountType: 'Expense',
        controlAccount: false,
        blockManualPosting: true,
        cashFlow: 'Not Relevant',
        financialClassification: 'Expense',
        active: true,
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

const control =
    'h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 disabled:text-slate-500';

function draftFrom(account: Account): Draft {
    return {
        code: account.code,
        name: account.name,
        drawer: account.drawer,
        parentId: account.parentId,
        level: account.level,
        kind: account.kind,
        currency: account.currency,
        accountType: account.accountType,
        controlAccount: account.controlAccount,
        blockManualPosting: account.blockManualPosting,
        cashFlow: account.cashFlow,
        financialClassification: account.financialClassification,
        active: account.active,
    };
}

function Field({
    label,
    children,
    hint,
}: {
    label: string;
    children: React.ReactNode;
    hint?: string;
}) {
    return (
        <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
            {label}
            {children}
            {hint && <span className="font-normal text-slate-400">{hint}</span>}
        </label>
    );
}

export default function ChartOfAccounts() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [accounts, setAccounts] = useState(seed);
    const [selectedId, setSelectedId] = useState(3);
    const [draft, setDraft] = useState<Draft>(draftFrom(seed[2]));
    const [mode, setMode] = useState<'view' | 'create' | 'edit'>('view');
    const [activeTab, setActiveTab] = useState<Tab>('General');
    const [activeDrawer, setActiveDrawer] = useState<Drawer>('Assets');
    const [query, setQuery] = useState('');
    const [createMenuOpen, setCreateMenuOpen] = useState(false);
    const [expanded, setExpanded] = useState<Set<number>>(new Set([1, 2, 5]));
    const [notice, setNotice] = useState('');

    const selected =
        accounts.find((account) => account.id === selectedId) ?? null;
    const drawerAccounts = useMemo(
        () => accounts.filter((account) => account.drawer === activeDrawer),
        [accounts, activeDrawer],
    );
    const parentOptions = drawerAccounts.filter(
        (account) => account.kind === 'title' && account.level < 9,
    );
    const filteredIds = useMemo(() => {
        if (!query.trim()) {
            return null;
        }

        const matches = accounts.filter((account) =>
            `${account.code} ${account.name}`
                .toLowerCase()
                .includes(query.toLowerCase()),
        );
        const ids = new Set(matches.map((account) => account.id));
        matches.forEach((account) => {
            let parent = accounts.find((item) => item.id === account.parentId);

            while (parent) {
                ids.add(parent.id);
                parent = accounts.find((item) => item.id === parent?.parentId);
            }
        });

        return ids;
    }, [accounts, query]);

    const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
        setDraft((current) => ({ ...current, [key]: value }));
    const selectAccount = (account: Account) => {
        setSelectedId(account.id);
        setDraft(draftFrom(account));
        setMode('view');
        setActiveTab('General');
        setNotice('');
    };
    const startCreate = (relationship: 'same' | 'sub') => {
        if (!selected) {
            return;
        }

        const parent =
            relationship === 'sub'
                ? selected
                : (accounts.find(
                      (account) => account.id === selected.parentId,
                  ) ?? null);
        const nextLevel =
            relationship === 'sub' ? selected.level + 1 : selected.level;

        if (relationship === 'sub' && selected.kind !== 'title') {
            setNotice('Select a title account to add a sublevel account.');

            return;
        }

        setDraft({
            code: '',
            name: '',
            drawer: selected.drawer,
            parentId: parent?.id ?? null,
            level: Math.min(nextLevel, 10),
            kind: nextLevel >= 10 ? 'active' : 'active',
            currency: 'PHP',
            accountType:
                selected.drawer === 'Revenue'
                    ? 'Revenue'
                    : selected.drawer === 'Expenses'
                      ? 'Expense'
                      : 'Other',
            controlAccount: false,
            blockManualPosting: false,
            cashFlow: 'Not Relevant',
            financialClassification: selected.financialClassification,
            active: true,
        });
        setMode('create');
        setActiveTab('General');
        setCreateMenuOpen(false);
        setNotice('New account position inherited from your selection.');
    };
    const save = (after: 'view' | 'new' | 'back') => {
        if (!draft.code.trim() || !draft.name.trim()) {
            setNotice('Account code and account name are required.');

            return;
        }

        if (
            accounts.some(
                (account) =>
                    account.code.toLowerCase() ===
                        draft.code.trim().toLowerCase() &&
                    (mode === 'create' || account.id !== selectedId),
            )
        ) {
            setNotice('Account code must be unique.');

            return;
        }

        if (draft.kind === 'title' && draft.level === 10) {
            setNotice('Level 10 is reserved for active accounts.');

            return;
        }

        const nextId =
            Math.max(0, ...accounts.map((account) => account.id)) + 1;
        const saved: Account = {
            ...draft,
            id: mode === 'edit' && selected ? selected.id : nextId,
            balance: selected?.balance ?? 0,
        };
        setAccounts((current) =>
            mode === 'edit'
                ? current.map((account) =>
                      account.id === selectedId ? saved : account,
                  )
                : [...current, saved],
        );
        setNotice(
            `${draft.kind === 'title' ? 'Title' : 'Active'} account ${draft.code} added successfully.`,
        );

        if (after === 'new') {
            setSelectedId(saved.id);
            setDraft({ ...draft, code: '', name: '' });
            setMode('create');
        } else if (after === 'back') {
            setMode('view');
        } else {
            setSelectedId(saved.id);
            setDraft(draftFrom(saved));
            setMode('view');
        }
    };
    const toggle = (id: number) =>
        setExpanded((current) => {
            const next = new Set(current);

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            return next;
        });

    const renderBranch = (
        parentId: number | null,
        level = 2,
    ): React.ReactNode =>
        drawerAccounts
            .filter(
                (account) =>
                    account.parentId === parentId &&
                    (!filteredIds || filteredIds.has(account.id)),
            )
            .sort((a, b) => a.code.localeCompare(b.code))
            .map((account) => {
                const children = drawerAccounts.some(
                    (item) => item.parentId === account.id,
                );
                const open = expanded.has(account.id) || Boolean(filteredIds);

                return (
                    <div key={account.id}>
                        <button
                            onClick={() => selectAccount(account)}
                            className={`group flex w-full items-center gap-2 border-l-3 px-3 py-2.5 text-left transition ${selectedId === account.id ? 'border-blue-600 bg-blue-50' : 'border-transparent hover:bg-slate-50'}`}
                            style={{
                                paddingLeft: `${12 + (level - 2) * 18}px`,
                            }}
                        >
                            <span
                                onClick={(event) => {
                                    event.stopPropagation();

                                    if (children) {
                                        toggle(account.id);
                                    }
                                }}
                                className={`flex size-4 shrink-0 items-center justify-center text-[10px] ${children ? 'text-slate-500' : 'text-slate-300'}`}
                            >
                                {children ? (open ? '▼' : '▶') : '•'}
                            </span>
                            <span
                                className={`min-w-17 font-mono text-xs font-semibold ${account.kind === 'title' ? 'text-blue-700' : account.controlAccount ? 'text-emerald-700' : 'text-slate-700'}`}
                            >
                                {account.code}
                            </span>
                            <span
                                className={`truncate text-xs ${account.kind === 'title' ? 'font-bold text-blue-800' : 'text-slate-700'}`}
                            >
                                {account.name}
                            </span>
                        </button>
                        {children &&
                            open &&
                            renderBranch(account.id, level + 1)}
                    </div>
                );
            });

    const readOnly = mode === 'view';

    return (
        <>
            <Head title="Chart of Accounts" />
            <div className="min-h-screen bg-[#f3f6fa] font-sans text-slate-800">
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
                        <Form action="/logout" method="post">
                            <button className="text-xs font-semibold text-slate-500">
                                Sign out
                            </button>
                        </Form>
                    </header>
                    <main className="p-4 sm:p-6">
                        <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="flex size-11 items-center justify-center rounded-lg bg-[#063b76] text-xl text-white">
                                        ▤
                                    </span>
                                    <div>
                                        <p className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
                                            Financials
                                        </p>
                                        <h2 className="text-2xl font-bold text-[#092d62]">
                                            Chart of Accounts
                                        </h2>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-slate-500">
                                    Organize G/L accounts by drawer, title, and
                                    posting level.
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {mode === 'view' ? (
                                    <>
                                        <div className="relative">
                                            <button
                                                onClick={() =>
                                                    setCreateMenuOpen(
                                                        (open) => !open,
                                                    )
                                                }
                                                className="rounded-md bg-[#0b5cab] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#084c8f]"
                                            >
                                                ＋ Create{' '}
                                                <span className="ml-2">▾</span>
                                            </button>
                                            {createMenuOpen && (
                                                <div className="absolute right-0 z-20 mt-2 w-55 rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl">
                                                    <button
                                                        onClick={() =>
                                                            startCreate('same')
                                                        }
                                                        className="w-full rounded-md px-3 py-2.5 text-left text-sm hover:bg-blue-50"
                                                    >
                                                        <strong className="block text-slate-800">
                                                            Same-level account
                                                        </strong>
                                                        <span className="text-xs text-slate-500">
                                                            Add beside the
                                                            selected account
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            startCreate('sub')
                                                        }
                                                        className="w-full rounded-md px-3 py-2.5 text-left text-sm hover:bg-blue-50"
                                                    >
                                                        <strong className="block text-slate-800">
                                                            Sublevel account
                                                        </strong>
                                                        <span className="text-xs text-slate-500">
                                                            Add below the
                                                            selected title
                                                        </span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            disabled={!selected}
                                            onClick={() => setMode('edit')}
                                            className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-50"
                                        >
                                            Edit
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => save('view')}
                                            className="rounded-md bg-[#0b5cab] px-4 py-2.5 text-sm font-semibold text-white"
                                        >
                                            {mode === 'edit'
                                                ? 'Update'
                                                : 'Add & View'}
                                        </button>
                                        {mode === 'create' && (
                                            <>
                                                <button
                                                    onClick={() => save('new')}
                                                    className="rounded-md border border-blue-600 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700"
                                                >
                                                    Add & New
                                                </button>
                                                <button
                                                    onClick={() => save('back')}
                                                    className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
                                                >
                                                    Add & Back
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() =>
                                                selected
                                                    ? selectAccount(selected)
                                                    : setMode('view')
                                            }
                                            className="px-3 py-2 text-sm font-semibold text-slate-500"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        {notice && (
                            <div
                                className={`mt-4 flex items-center justify-between rounded-md border px-4 py-3 text-sm ${notice.includes('required') || notice.includes('unique') || notice.includes('Select') || notice.includes('reserved') ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-blue-200 bg-blue-50 text-blue-800'}`}
                            >
                                <span>{notice}</span>
                                <button
                                    onClick={() => setNotice('')}
                                    aria-label="Dismiss"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                        <section className="mt-5 grid min-h-160 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:grid-cols-[390px_1fr]">
                            <div className="border-b border-slate-200 xl:border-r xl:border-b-0">
                                <div className="border-b border-slate-200 p-4">
                                    <div className="relative">
                                        <span className="pointer-events-none absolute top-2.5 left-3 text-slate-400">
                                            ⌕
                                        </span>
                                        <input
                                            value={query}
                                            onChange={(event) =>
                                                setQuery(event.target.value)
                                            }
                                            className={`${control} pl-9`}
                                            placeholder="Find account code or name"
                                        />
                                    </div>
                                </div>
                                <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 px-2 pt-2">
                                    {drawers.map((drawer) => (
                                        <button
                                            key={drawer}
                                            onClick={() => {
                                                setActiveDrawer(drawer);
                                                setQuery('');
                                            }}
                                            className={`border-b-2 px-3 py-2.5 text-xs font-bold whitespace-nowrap ${activeDrawer === drawer ? 'border-blue-600 bg-white text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                                        >
                                            {drawer}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">
                                            {activeDrawer}
                                        </p>
                                        <p className="text-[11px] text-slate-500">
                                            Level 1 drawer ·{' '}
                                            {drawerAccounts.length} accounts
                                        </p>
                                    </div>
                                    <div className="flex gap-2 text-[11px]">
                                        <span className="text-blue-700">
                                            ■ Title
                                        </span>
                                        <span className="text-slate-700">
                                            ● Active
                                        </span>
                                    </div>
                                </div>
                                <div className="max-h-119 overflow-y-auto py-1">
                                    {renderBranch(null)}
                                    {drawerAccounts.length === 0 && (
                                        <p className="p-8 text-center text-sm text-slate-400">
                                            No accounts in this drawer.
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex min-w-0 flex-col">
                                <div className="border-b border-slate-200 px-5 pt-5 sm:px-7">
                                    <div className="flex flex-col justify-between gap-3 pb-5 sm:flex-row sm:items-start">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`rounded px-2 py-1 text-[10px] font-bold uppercase ${draft.kind === 'title' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}
                                                >
                                                    {draft.kind === 'title'
                                                        ? 'Title account'
                                                        : 'Active account'}
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    Level {draft.level}
                                                </span>
                                            </div>
                                            <h3 className="mt-2 text-xl font-bold text-slate-900">
                                                {mode === 'create'
                                                    ? 'Create G/L Account'
                                                    : draft.name}
                                            </h3>
                                            <p className="mt-1 font-mono text-sm text-slate-500">
                                                {draft.code ||
                                                    'Account code not yet assigned'}
                                            </p>
                                        </div>
                                        {mode === 'view' && selected && (
                                            <div className="text-left sm:text-right">
                                                <p className="text-xs text-slate-500">
                                                    Account balance
                                                </p>
                                                <p className="mt-1 text-xl font-bold text-slate-900">
                                                    {new Intl.NumberFormat(
                                                        'en-PH',
                                                        {
                                                            style: 'currency',
                                                            currency: 'PHP',
                                                        },
                                                    ).format(selected.balance)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-6 overflow-x-auto">
                                        {(
                                            [
                                                'General',
                                                'Properties',
                                                'Details',
                                                'Position',
                                            ] as Tab[]
                                        ).map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() =>
                                                    setActiveTab(tab)
                                                }
                                                className={`border-b-2 pb-3 text-sm font-semibold ${activeTab === tab ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500'}`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-1 p-5 sm:p-7">
                                    {activeTab === 'General' && (
                                        <div className="max-w-3xl">
                                            <h4 className="text-sm font-bold text-slate-900">
                                                General account information
                                            </h4>
                                            <p className="mt-1 text-xs text-slate-500">
                                                Define the account identity and
                                                posting behavior.
                                            </p>
                                            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                                <Field label="Account code *">
                                                    <input
                                                        disabled={readOnly}
                                                        value={draft.code}
                                                        onChange={(e) =>
                                                            set(
                                                                'code',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={control}
                                                        placeholder="e.g. 1.01.03"
                                                    />
                                                </Field>
                                                <Field label="Account name *">
                                                    <input
                                                        disabled={readOnly}
                                                        value={draft.name}
                                                        onChange={(e) =>
                                                            set(
                                                                'name',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={control}
                                                        placeholder="Enter account name"
                                                    />
                                                </Field>
                                                <Field label="Account classification">
                                                    <select
                                                        disabled={readOnly}
                                                        value={draft.kind}
                                                        onChange={(e) =>
                                                            set(
                                                                'kind',
                                                                e.target
                                                                    .value as AccountKind,
                                                            )
                                                        }
                                                        className={control}
                                                    >
                                                        <option value="title">
                                                            Title (grouping)
                                                        </option>
                                                        <option value="active">
                                                            Active (posting)
                                                        </option>
                                                    </select>
                                                </Field>
                                                <Field label="Account currency">
                                                    <select
                                                        disabled={readOnly}
                                                        value={draft.currency}
                                                        onChange={(e) =>
                                                            set(
                                                                'currency',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={control}
                                                    >
                                                        <option>PHP</option>
                                                        <option>
                                                            All Currencies
                                                        </option>
                                                        <option>USD</option>
                                                    </select>
                                                </Field>
                                                <Field label="Account type">
                                                    <select
                                                        disabled={readOnly}
                                                        value={
                                                            draft.accountType
                                                        }
                                                        onChange={(e) =>
                                                            set(
                                                                'accountType',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={control}
                                                    >
                                                        <option>Other</option>
                                                        <option>Revenue</option>
                                                        <option>Expense</option>
                                                    </select>
                                                </Field>
                                                <Field label="Financial statement classification">
                                                    <select
                                                        disabled={readOnly}
                                                        value={
                                                            draft.financialClassification
                                                        }
                                                        onChange={(e) =>
                                                            set(
                                                                'financialClassification',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={control}
                                                    >
                                                        {[
                                                            'Current Asset',
                                                            'Non-Current Asset',
                                                            'Current Liability',
                                                            'Non-Current Liability',
                                                            'Equity',
                                                            'Revenue',
                                                            'Expense',
                                                        ].map((value) => (
                                                            <option key={value}>
                                                                {value}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </Field>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'Properties' && (
                                        <div className="max-w-3xl">
                                            <h4 className="text-sm font-bold text-slate-900">
                                                Posting properties
                                            </h4>
                                            <p className="mt-1 text-xs text-slate-500">
                                                Control how the account can be
                                                used in transactions.
                                            </p>
                                            <div className="mt-6 grid gap-3">
                                                {[
                                                    [
                                                        'controlAccount',
                                                        'Control account',
                                                        'Link business partner activity to this G/L account.',
                                                    ],
                                                    [
                                                        'blockManualPosting',
                                                        'Block manual posting',
                                                        'Prevent use in manual journal entries and recurring postings.',
                                                    ],
                                                    [
                                                        'active',
                                                        'Active',
                                                        'Allow this account to remain available for financial processing.',
                                                    ],
                                                ].map(([key, label, hint]) => (
                                                    <label
                                                        key={key}
                                                        className="flex items-start gap-3 rounded-lg border border-slate-200 p-4"
                                                    >
                                                        <input
                                                            disabled={
                                                                readOnly ||
                                                                draft.kind ===
                                                                    'title'
                                                            }
                                                            type="checkbox"
                                                            checked={Boolean(
                                                                draft[
                                                                    key as keyof Draft
                                                                ],
                                                            )}
                                                            onChange={(e) =>
                                                                set(
                                                                    key as keyof Draft,
                                                                    e.target
                                                                        .checked as never,
                                                                )
                                                            }
                                                            className="mt-0.5 size-4 accent-blue-600"
                                                        />
                                                        <span>
                                                            <strong className="block text-sm text-slate-800">
                                                                {label}
                                                            </strong>
                                                            <span className="mt-1 block text-xs text-slate-500">
                                                                {hint}
                                                            </span>
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'Details' && (
                                        <div className="max-w-3xl">
                                            <h4 className="text-sm font-bold text-slate-900">
                                                Reporting details
                                            </h4>
                                            <p className="mt-1 text-xs text-slate-500">
                                                Assign supporting
                                                classifications used by
                                                financial reports.
                                            </p>
                                            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                                <Field label="Cash flow classification">
                                                    <select
                                                        disabled={
                                                            readOnly ||
                                                            draft.kind ===
                                                                'title'
                                                        }
                                                        value={draft.cashFlow}
                                                        onChange={(e) =>
                                                            set(
                                                                'cashFlow',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={control}
                                                    >
                                                        <option>
                                                            Not Relevant
                                                        </option>
                                                        <option>
                                                            Operating Activities
                                                        </option>
                                                        <option>
                                                            Investing Activities
                                                        </option>
                                                        <option>
                                                            Financing Activities
                                                        </option>
                                                    </select>
                                                </Field>
                                                <Field label="Current / Non-current">
                                                    <select
                                                        disabled={
                                                            readOnly ||
                                                            draft.kind ===
                                                                'title'
                                                        }
                                                        value={
                                                            draft.financialClassification
                                                        }
                                                        onChange={(e) =>
                                                            set(
                                                                'financialClassification',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={control}
                                                    >
                                                        {[
                                                            'Current Asset',
                                                            'Non-Current Asset',
                                                            'Current Liability',
                                                            'Non-Current Liability',
                                                            'Equity',
                                                            'Revenue',
                                                            'Expense',
                                                        ].map((value) => (
                                                            <option key={value}>
                                                                {value}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </Field>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'Position' && (
                                        <div className="max-w-3xl">
                                            <h4 className="text-sm font-bold text-slate-900">
                                                Position in Chart of Accounts
                                            </h4>
                                            <p className="mt-1 text-xs text-slate-500">
                                                The drawer, parent title, and
                                                level determine where this
                                                account appears.
                                            </p>
                                            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                                <Field
                                                    label="Drawer"
                                                    hint="Level 1 is reserved for drawers."
                                                >
                                                    <select
                                                        disabled={readOnly}
                                                        value={draft.drawer}
                                                        onChange={(e) => {
                                                            const drawer = e
                                                                .target
                                                                .value as Drawer;
                                                            set(
                                                                'drawer',
                                                                drawer,
                                                            );
                                                            set(
                                                                'parentId',
                                                                null,
                                                            );
                                                            set('level', 2);
                                                        }}
                                                        className={control}
                                                    >
                                                        {drawers.map(
                                                            (drawer) => (
                                                                <option
                                                                    key={drawer}
                                                                >
                                                                    {drawer}
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                </Field>
                                                <Field label="Parent title">
                                                    <select
                                                        disabled={readOnly}
                                                        value={
                                                            draft.parentId ?? ''
                                                        }
                                                        onChange={(e) => {
                                                            const parentId = e
                                                                .target.value
                                                                ? Number(
                                                                      e.target
                                                                          .value,
                                                                  )
                                                                : null;
                                                            const parent =
                                                                accounts.find(
                                                                    (account) =>
                                                                        account.id ===
                                                                        parentId,
                                                                );
                                                            set(
                                                                'parentId',
                                                                parentId,
                                                            );
                                                            set(
                                                                'level',
                                                                parent
                                                                    ? parent.level +
                                                                          1
                                                                    : 2,
                                                            );
                                                        }}
                                                        className={control}
                                                    >
                                                        <option value="">
                                                            Drawer root
                                                        </option>
                                                        {parentOptions
                                                            .filter(
                                                                (account) =>
                                                                    account.id !==
                                                                    selectedId,
                                                            )
                                                            .map((account) => (
                                                                <option
                                                                    key={
                                                                        account.id
                                                                    }
                                                                    value={
                                                                        account.id
                                                                    }
                                                                >
                                                                    {
                                                                        account.code
                                                                    }{' '}
                                                                    —{' '}
                                                                    {
                                                                        account.name
                                                                    }
                                                                </option>
                                                            ))}
                                                    </select>
                                                </Field>
                                                <Field label="Level">
                                                    <input
                                                        disabled
                                                        value={draft.level}
                                                        className={control}
                                                    />
                                                </Field>
                                                <Field label="Location">
                                                    <input
                                                        disabled
                                                        value={
                                                            draft.parentId
                                                                ? 'Below selected parent title'
                                                                : `First level in ${draft.drawer}`
                                                        }
                                                        className={control}
                                                    />
                                                </Field>
                                            </div>
                                            <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4 text-xs leading-5 text-blue-800">
                                                <strong className="block">
                                                    Hierarchy rule
                                                </strong>
                                                Title accounts summarize the
                                                active accounts beneath them.
                                                Only active accounts receive
                                                transaction postings; level 10
                                                can contain active accounts
                                                only.
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}
