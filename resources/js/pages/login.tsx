import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import { store as storeLogin } from '@/routes/login';

function DbfosLogo() {
    return (
        <div className="flex items-center justify-center gap-3 sm:gap-5">
            <svg
                viewBox="0 0 150 170"
                className="h-30 w-27 shrink-0 sm:h-36 sm:w-32"
                aria-label="DBFOS shield"
            >
                <defs>
                    <linearGradient id="shield" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#0876bd" />
                        <stop offset="1" stopColor="#052d75" />
                    </linearGradient>
                    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#f0bd2d" />
                        <stop offset="1" stopColor="#b87705" />
                    </linearGradient>
                </defs>
                <path
                    d="M75 5c19 16 41 25 66 31v50c0 37-23 65-66 79C32 151 9 123 9 86V36C34 30 56 21 75 5Z"
                    fill="#fff"
                    stroke="url(#shield)"
                    strokeWidth="6"
                />
                <path
                    d="M75 16c17 12 35 20 55 26v43c0 29-18 52-55 66-37-14-55-37-55-66V42c20-6 38-14 55-26Z"
                    fill="#e9f5fd"
                />
                <path
                    d="M42 83V60l33-24 34 24v23M51 82V64h48v18M34 86h82"
                    fill="#073579"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinejoin="round"
                />
                <path
                    d="M75 37V24m0 1c9-1 11 7 22 2-3 10-14 9-22 7"
                    fill="#073579"
                    stroke="#073579"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <path d="M55 119h14V98h12v21h12V88h12v31" fill="#119fae" />
                <path
                    d="m45 121 66-42"
                    stroke="url(#gold)"
                    strokeWidth="6"
                    strokeLinecap="round"
                />
                <path d="m107 77 12-4-4 12" fill="url(#gold)" />
                <text
                    x="29"
                    y="112"
                    fill="url(#gold)"
                    fontSize="48"
                    fontWeight="800"
                >
                    ₱
                </text>
                <path
                    d="M38 126c18-7 28 1 38 5 13 5 28 5 43-3-7 12-22 21-44 28-18-6-30-15-37-30Z"
                    fill="#063b86"
                />
                <path
                    d="M67 145v-11c0-10 16-10 16 0v11"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="3"
                />
                <rect
                    x="63"
                    y="141"
                    width="24"
                    height="17"
                    rx="5"
                    fill="#0aa0ae"
                    stroke="#fff"
                    strokeWidth="3"
                />
            </svg>
            <div className="min-w-0">
                <div className="flex items-center text-[3.4rem] leading-none font-black tracking-[-0.07em] text-[#073984] sm:text-[4.6rem]">
                    DBF
                    <span className="relative mx-1 inline-flex size-[0.78em] items-center justify-center rounded-full bg-[conic-gradient(#13aaa9_0_24%,white_24%_26%,#086aa8_26%_62%,white_62%_64%,#062c71_64%)]">
                        <span className="size-[0.46em] rounded-full bg-white" />
                    </span>
                    S
                </div>
                <div className="mt-2 h-0.5 w-full bg-gradient-to-r from-[#0da0aa] via-[#d19a1b] to-[#0da0aa]" />
                <p className="mt-2 max-w-70 text-center text-[9px] leading-tight font-bold text-[#082b66] sm:text-[11px]">
                    Digitalized Barangay Financial Operations System
                    <br />
                    with Analytics-Based Budget Tracking
                    <br />
                    and Decision Support
                </p>
            </div>
        </div>
    );
}

function BackgroundArtwork() {
    return (
        <img
            src="/images/dbfos-login-background.png"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
        />
    );
}

export default function Login({ version }: { version: string }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="Sign in" />
            <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,#ffffff_0%,#f7fbff_50%,#e9f4ff_100%)] px-5 py-12 font-sans text-[#10275a] sm:py-16">
                <BackgroundArtwork />
                <section className="relative z-10 w-full max-w-[720px] rounded-[1.4rem] border border-[#a9c9e7]/70 bg-white/95 px-7 py-8 shadow-[0_15px_45px_rgba(26,84,145,0.22)] sm:px-16 sm:py-10">
                    <DbfosLogo />

                    <Form
                        {...storeLogin.form()}
                        resetOnError={['password']}
                        className="mx-auto mt-7 flex max-w-[560px] flex-col gap-4"
                    >
                        {({ errors, processing }) => (
                            <>
                                <label className="flex flex-col gap-2 text-[15px] font-bold">
                                    Username
                                    <div className="relative">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            className="absolute top-1/2 left-4 size-6 -translate-y-1/2 text-slate-500"
                                        >
                                            <circle cx="12" cy="8" r="4" />
                                            <path d="M4 21a8 8 0 0 1 16 0" />
                                        </svg>
                                        <input
                                            name="username"
                                            autoComplete="username"
                                            placeholder="Enter your username"
                                            autoFocus
                                            className="h-13 w-full rounded-lg border border-slate-300 bg-white pr-4 pl-13 font-normal text-slate-700 transition outline-none placeholder:text-slate-400 focus:border-[#087db3] focus:ring-3 focus:ring-[#087db3]/10"
                                        />
                                    </div>
                                    {errors.username && (
                                        <span className="text-xs font-medium text-red-600">
                                            {errors.username}
                                        </span>
                                    )}
                                </label>

                                <label className="flex flex-col gap-2 text-[15px] font-bold">
                                    Password
                                    <div className="relative">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            className="absolute top-1/2 left-4 size-6 -translate-y-1/2 text-slate-500"
                                        >
                                            <rect
                                                x="4"
                                                y="10"
                                                width="16"
                                                height="11"
                                                rx="2"
                                            />
                                            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                        </svg>
                                        <input
                                            name="password"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                            className="h-13 w-full rounded-lg border border-slate-300 bg-white pr-13 pl-13 font-normal text-slate-700 transition outline-none placeholder:text-slate-400 focus:border-[#087db3] focus:ring-3 focus:ring-[#087db3]/10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    (value) => !value,
                                                )
                                            }
                                            className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-500 transition hover:text-[#0753a0]"
                                            aria-label={
                                                showPassword
                                                    ? 'Hide password'
                                                    : 'Show password'
                                            }
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                className="size-6"
                                            >
                                                <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="2.8"
                                                />
                                                {showPassword && (
                                                    <path d="m4 4 16 16" />
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <span className="text-xs font-medium text-red-600">
                                            {errors.password}
                                        </span>
                                    )}
                                </label>

                                <div className="flex items-center justify-between gap-4 text-sm">
                                    <label className="flex cursor-pointer items-center gap-2 text-slate-600">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            value="1"
                                            className="size-4 rounded border-slate-300 accent-[#0753a0]"
                                        />
                                        Remember Me
                                    </label>
                                    <span className="font-medium text-[#0753a0]">
                                        Forgot Password?
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-1 flex h-13 items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#073f9a] via-[#0879ba] to-[#09aaa9] text-lg font-bold text-white shadow-[0_6px_15px_rgba(3,67,145,0.25)] transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="size-5"
                                    >
                                        <rect
                                            x="5"
                                            y="10"
                                            width="14"
                                            height="11"
                                            rx="2"
                                        />
                                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                    </svg>
                                    {processing ? 'Signing In...' : 'Sign In'}
                                </button>
                            </>
                        )}
                    </Form>

                    <div className="mx-auto mt-7 flex max-w-[560px] items-center gap-4 text-sm text-slate-500 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">
                        <span className="flex flex-col items-center gap-1 whitespace-nowrap">
                            <svg
                                viewBox="0 0 24 24"
                                className="size-7 fill-[#0753a0]"
                            >
                                <path d="M12 1 3 5v6c0 5.6 3.8 10.4 9 12 5.2-1.6 9-6.4 9-12V5l-9-4Zm-1.2 15-4-4 1.5-1.5 2.5 2.5 5-5 1.5 1.5-6.5 6.5Z" />
                            </svg>
                            Authorized Users Only
                        </span>
                    </div>

                    <p className="mt-4 text-center text-xs font-medium tracking-wide text-slate-400">
                        System Version {version}
                    </p>
                </section>

                <div className="absolute bottom-7 z-10 hidden items-center gap-4 text-sm text-white/90 sm:flex">
                    <span>Secure</span>
                    <i className="size-1.5 rounded-full bg-cyan-400" />
                    <span>Transparent</span>
                    <i className="size-1.5 rounded-full bg-cyan-400" />
                    <span>Accountable</span>
                    <i className="size-1.5 rounded-full bg-cyan-400" />
                    <span>Data-Driven Decisions</span>
                </div>
            </main>
        </>
    );
}
