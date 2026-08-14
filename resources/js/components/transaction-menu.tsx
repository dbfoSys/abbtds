const transactionItems = [
    'Journal Entry',
    'Statement of Financial',
    'Statement of Cash Flows',
    'Net Asset',
    'Pre-Closing',
    'Post-Closing',
];

export default function TransactionMenu() {
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
                    <path d="M7 3h10v4H7zM5 7h14v14H5zM8 11h8M8 15h5M8 19h8" />
                </svg>
                <span className="flex-1">Transaction</span>
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
                {transactionItems.map((item) => (
                    <button
                        key={item}
                        type="button"
                        className="rounded-md px-3 py-2 text-left text-xs font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                    >
                        {item}
                    </button>
                ))}
            </div>
        </details>
    );
}
