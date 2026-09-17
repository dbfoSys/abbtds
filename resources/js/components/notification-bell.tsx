type NotificationBellProps = {
    count?: number;
};

export default function NotificationBell({ count = 3 }: NotificationBellProps) {
    return (
        <button
            type="button"
            className="relative flex size-9 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-[#092d62] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
            aria-label={`${count} unread notifications`}
            title="Notifications"
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="size-6"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17H9m9-2V11a6 6 0 0 0-12 0v4l-2 2h16l-2-2Zm-8 5h4"
                />
            </svg>
            {count > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">
                    {count > 9 ? '9+' : count}
                </span>
            ) : null}
        </button>
    );
}
