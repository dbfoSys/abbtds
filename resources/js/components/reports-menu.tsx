const reportItems = [
    'Statement of Financial',
    'Statement of Cash Flows',
    'Statement of Changes in Net Assets',
    'Pre-Closing Trial Balance',
    'Post-Closing Trial Balance',
    'Statement of Responsibility',
    'General Journal Annex 2',
    'General Ledger Annex 3',
    'G/L Accounts Ledger',
];

export default function ReportsMenu() {
    return (
        <details className="group">
            <summary className="flex cursor-pointer list-none items-center gap-4 rounded-lg px-3 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 [&::-webkit-details-marker]:hidden">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5.5 shrink-0"
                    aria-hidden="true"
                >
                    <path d="M6 2h9l4 4v16H6zM14 2v5h5M9 12h6M9 16h6M9 8h2" />
                </svg>
                <span className="flex-1">Reports</span>
                <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="size-4 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                >
                    <path d="m5 7 5 5 5-5" />
                </svg>
            </summary>
            <div className="mt-1 ml-5 flex flex-col gap-0.5 border-l border-white/20 pl-4">
                {reportItems.map((item) => (
                    <button
                        key={item}
                        type="button"
                        className="rounded-md px-3 py-2 text-left text-xs leading-4 font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                    >
                        {item}
                    </button>
                ))}
            </div>
        </details>
    );
}
