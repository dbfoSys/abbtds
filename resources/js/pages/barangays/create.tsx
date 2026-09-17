import { Form, Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import MasterDataMenu from '@/components/master-data-menu';
import NotificationBell from '@/components/notification-bell';
import ReportsMenu from '@/components/reports-menu';
import TransactionMenu from '@/components/transaction-menu';
import { postalCode as postalCodeRoute } from '@/routes/psgc';

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

const inputClass =
    'h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

const psgcApi = '/psgc';

type PsgcItem = {
    code: string;
    name: string;
    regionName?: string;
    psgc10DigitCode?: string;
};

type PostalCodeResponse = {
    zip_code?: string;
    message?: string;
};

const sortByName = (items: PsgcItem[]) =>
    [...items].sort((first, second) =>
        first.name.localeCompare(second.name, 'en', { sensitivity: 'base' }),
    );

const sortByCode = (items: PsgcItem[]) =>
    [...items].sort((first, second) => first.code.localeCompare(second.code));

function regionLabel(region: PsgcItem) {
    const romanNumeralsByCode: Record<string, string> = {
        '01': 'I',
        '02': 'II',
        '03': 'III',
        '04': 'IV-A',
        '17': 'IV-B',
        '05': 'V',
        '06': 'VI',
        '07': 'VII',
        '08': 'VIII',
        '09': 'IX',
        '10': 'X',
        '11': 'XI',
        '12': 'XII',
        '16': 'XIII',
    };
    const romanNumeral = romanNumeralsByCode[region.code.slice(0, 2)];

    return romanNumeral
        ? `Region ${romanNumeral} - ${region.name}`
        : region.name;
}

async function loadPsgcItems(
    path: string,
    signal: AbortSignal,
    sort: (items: PsgcItem[]) => PsgcItem[] = sortByName,
) {
    const response = await fetch(`${psgcApi}${path}`, { signal });

    if (!response.ok) {
        throw new Error(`PSGC request failed (${response.status})`);
    }

    return sort((await response.json()) as PsgcItem[]);
}

function Field({
    label,
    children,
    required = false,
}: {
    label: string;
    children: ReactNode;
    required?: boolean;
}) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-[#173b72]">
                {label} {required && <b className="text-red-500">*</b>}
            </span>
            {children}
        </label>
    );
}

function Section({
    icon,
    title,
    children,
}: {
    icon: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-bold text-[#08337a]">
                <span className="text-xl text-blue-600">{icon}</span>
                {title}
            </h3>
            {children}
        </section>
    );
}

function MapPanel({
    large = false,
    query = 'Villanueva, Misamis Oriental, Philippines',
}: {
    large?: boolean;
    query?: string;
}) {
    if (large) {
        return (
            <div className="h-96 overflow-hidden rounded-lg border border-slate-300 bg-slate-100 lg:h-full lg:min-h-160">
                <iframe
                    title="Google Map of Villanueva, Misamis Oriental"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <div className="relative h-42 overflow-hidden rounded-lg bg-[linear-gradient(35deg,#d8eddc_25%,transparent_25%),linear-gradient(145deg,#dceaf7_25%,transparent_25%),linear-gradient(45deg,transparent_70%,#b9ddc5_70%)] bg-size-[90px_90px]">
            <div className="absolute inset-0 bg-blue-50/35" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-4xl text-blue-600 drop-shadow">
                ●
            </span>
            <b className="absolute top-[58%] left-1/2 -translate-x-1/2 text-sm text-slate-800">
                Villanueva
            </b>
            <span className="absolute top-2 right-2 rounded bg-white px-2 py-1 text-blue-700 shadow">
                ⛶
            </span>
        </div>
    );
}

export default function CreateBarangay() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [regions, setRegions] = useState<PsgcItem[]>([]);
    const [provinces, setProvinces] = useState<PsgcItem[]>([]);
    const [citiesMunicipalities, setCitiesMunicipalities] = useState<
        PsgcItem[]
    >([]);
    const [barangayOptions, setBarangayOptions] = useState<PsgcItem[]>([]);
    const [regionCode, setRegionCode] = useState('');
    const [provinceCode, setProvinceCode] = useState('');
    const [cityMunicipalityCode, setCityMunicipalityCode] = useState('');
    const [barangayCode, setBarangayCode] = useState('');
    const [loadingLevel, setLoadingLevel] = useState<string | null>('regions');
    const [psgcError, setPsgcError] = useState('');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [streetPurok, setStreetPurok] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [zipCodeLoading, setZipCodeLoading] = useState(false);
    const [zipCodeError, setZipCodeError] = useState('');
    const [latitude, setLatitude] = useState('8.696245');
    const [longitude, setLongitude] = useState('124.824301');
    const [sealPreview, setSealPreview] = useState('');
    const [sealError, setSealError] = useState('');
    const [type, setType] = useState('Urban');
    const [captain, setCaptain] = useState('Hon. Maria Santos');
    const [population, setPopulation] = useState('4512');
    const [active, setActive] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        loadPsgcItems('/regions', controller.signal, sortByCode)
            .then(setRegions)
            .catch((error: unknown) => {
                if ((error as Error).name !== 'AbortError') {
                    setPsgcError(
                        'Unable to load PSGC regions. Please try again.',
                    );
                }
            })
            .finally(() => setLoadingLevel(null));

        return () => controller.abort();
    }, []);

    async function selectRegion(selectedCode: string) {
        setRegionCode(selectedCode);
        setProvinceCode('');
        setCityMunicipalityCode('');
        setBarangayCode('');
        setProvinces([]);
        setCitiesMunicipalities([]);
        setBarangayOptions([]);
        setName('');
        setCode('');
        setZipCode('');
        setZipCodeError('');

        if (!selectedCode) {
            return;
        }

        const controller = new AbortController();
        setLoadingLevel('provinces');
        setPsgcError('');

        try {
            const items = await loadPsgcItems(
                `/regions/${selectedCode}/provinces`,
                controller.signal,
            );
            setProvinces(items);

            if (items.length === 0) {
                setLoadingLevel('cities');
                setCitiesMunicipalities(
                    await loadPsgcItems(
                        `/regions/${selectedCode}/cities-municipalities`,
                        controller.signal,
                    ),
                );
            }
        } catch {
            setPsgcError('Unable to load provinces for the selected region.');
        } finally {
            setLoadingLevel(null);
        }
    }

    async function selectProvince(selectedCode: string) {
        setProvinceCode(selectedCode);
        setCityMunicipalityCode('');
        setBarangayCode('');
        setCitiesMunicipalities([]);
        setBarangayOptions([]);
        setName('');
        setCode('');
        setZipCode('');
        setZipCodeError('');

        if (!selectedCode) {
            return;
        }

        const controller = new AbortController();
        setLoadingLevel('cities');
        setPsgcError('');

        try {
            setCitiesMunicipalities(
                await loadPsgcItems(
                    `/provinces/${selectedCode}/cities-municipalities`,
                    controller.signal,
                ),
            );
        } catch {
            setPsgcError('Unable to load cities and municipalities.');
        } finally {
            setLoadingLevel(null);
        }
    }

    async function selectCityMunicipality(selectedCode: string) {
        setCityMunicipalityCode(selectedCode);
        setBarangayCode('');
        setBarangayOptions([]);
        setName('');
        setCode('');
        setZipCode('');
        setZipCodeError('');

        if (!selectedCode) {
            return;
        }

        const controller = new AbortController();
        setLoadingLevel('barangays');
        setPsgcError('');

        try {
            setBarangayOptions(
                await loadPsgcItems(
                    `/cities-municipalities/${selectedCode}/barangays`,
                    controller.signal,
                ),
            );

            const selectedLocation = citiesMunicipalities.find(
                (item) => item.code === selectedCode,
            );

            if (selectedLocation) {
                await loadPostalCode(
                    selectedLocation.name,
                    provinces.find((item) => item.code === provinceCode)?.name,
                    selectedLocation.code,
                );
            }
        } catch {
            setPsgcError('Unable to load barangays for the selected location.');
        } finally {
            setLoadingLevel(null);
        }
    }

    async function loadPostalCode(
        city: string,
        province?: string,
        psgcCode?: string,
    ) {
        setZipCodeLoading(true);
        setZipCodeError('');

        try {
            const response = await fetch(
                postalCodeRoute.url({
                    query: {
                        city,
                        ...(province ? { province } : {}),
                        ...(psgcCode ? { psgc_code: psgcCode } : {}),
                    },
                }),
            );
            const result = (await response.json()) as PostalCodeResponse;

            if (!response.ok || !result.zip_code) {
                throw new Error(result.message || 'ZIP code lookup failed.');
            }

            setZipCode(result.zip_code);
        } catch (error) {
            setZipCode('');
            setZipCodeError(
                error instanceof Error
                    ? error.message
                    : 'Unable to load the ZIP code.',
            );
        } finally {
            setZipCodeLoading(false);
        }
    }

    const selectedRegion = regions.find((item) => item.code === regionCode);
    const selectedProvince = provinces.find(
        (item) => item.code === provinceCode,
    );
    const selectedCityMunicipality = citiesMunicipalities.find(
        (item) => item.code === cityMunicipalityCode,
    );
    const completeAddress = [
        streetPurok,
        name,
        selectedCityMunicipality?.name,
        selectedProvince?.name,
        selectedRegion ? regionLabel(selectedRegion) : '',
        zipCode,
        'Philippines',
    ]
        .filter(Boolean)
        .join(', ');

    function resetForm() {
        document.querySelector<HTMLFormElement>('#barangay-form')?.reset();
        setName('');
        setCode('');
        setStreetPurok('');
        setZipCode('');
        setZipCodeLoading(false);
        setZipCodeError('');
        setLatitude('8.696245');
        setLongitude('124.824301');
        setSealPreview('');
        setSealError('');
        setRegionCode('');
        setProvinceCode('');
        setCityMunicipalityCode('');
        setBarangayCode('');
        setProvinces([]);
        setCitiesMunicipalities([]);
        setBarangayOptions([]);
        setPsgcError('');
        setType('');
        setCaptain('');
        setPopulation('');
        setActive(true);
        setSaved(false);
    }

    function selectSeal(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) {
            setSealPreview('');
            setSealError('');

            return;
        }

        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            event.target.value = '';
            setSealPreview('');
            setSealError('Please select a JPG or PNG image.');

            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            event.target.value = '';
            setSealPreview('');
            setSealError('The image must not exceed 10 MB.');

            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setSealPreview(String(reader.result));
            setSealError('');
        };
        reader.readAsDataURL(file);
    }
    function save(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaved(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <>
            <Head title="Add New Barangay" />
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
                                        Add New Barangay
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Create a new barangay profile and
                                        register its administrative, geographic,
                                        and contact details.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    form="barangay-form"
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md"
                                >
                                    ✓ &nbsp; Save Barangay
                                </button>
                                <Link
                                    href="/barangays"
                                    className="rounded-lg border border-blue-300 bg-white px-6 py-2.5 text-sm font-bold text-blue-700"
                                >
                                    ✕ &nbsp; Cancel
                                </Link>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-lg border border-blue-300 bg-white px-6 py-2.5 text-sm font-bold text-blue-700"
                                >
                                    ↻ &nbsp; Reset Form
                                </button>
                            </div>
                        </div>
                        {saved && (
                            <div
                                role="status"
                                className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700"
                            >
                                Barangay profile details have been saved
                                successfully.
                            </div>
                        )}
                        <form
                            id="barangay-form"
                            onSubmit={save}
                            className="block"
                        >
                            <div className="space-y-4">
                                <Section
                                    icon="⌖"
                                    title="1. Location and Address"
                                >
                                    <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
                                        <div className="space-y-4">
                                            <Field label="Region" required>
                                                <select
                                                    required
                                                    value={regionCode}
                                                    onChange={(event) =>
                                                        void selectRegion(
                                                            event.target.value,
                                                        )
                                                    }
                                                    disabled={
                                                        loadingLevel ===
                                                        'regions'
                                                    }
                                                    className={inputClass}
                                                >
                                                    <option value="">
                                                        {loadingLevel ===
                                                        'regions'
                                                            ? 'Loading regions...'
                                                            : 'Select region'}
                                                    </option>
                                                    {regions.map((region) => (
                                                        <option
                                                            key={region.code}
                                                            value={region.code}
                                                        >
                                                            {regionLabel(
                                                                region,
                                                            )}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Field>
                                            <Field label="Province" required>
                                                <select
                                                    required={
                                                        provinces.length > 0
                                                    }
                                                    value={provinceCode}
                                                    onChange={(event) =>
                                                        void selectProvince(
                                                            event.target.value,
                                                        )
                                                    }
                                                    disabled={
                                                        !regionCode ||
                                                        loadingLevel ===
                                                            'provinces' ||
                                                        provinces.length === 0
                                                    }
                                                    className={inputClass}
                                                >
                                                    <option value="">
                                                        {loadingLevel ===
                                                        'provinces'
                                                            ? 'Loading provinces...'
                                                            : regionCode &&
                                                                provinces.length ===
                                                                    0 &&
                                                                loadingLevel !==
                                                                    'provinces'
                                                              ? 'Not applicable for this region'
                                                              : 'Select province'}
                                                    </option>
                                                    {provinces.map(
                                                        (province) => (
                                                            <option
                                                                key={
                                                                    province.code
                                                                }
                                                                value={
                                                                    province.code
                                                                }
                                                            >
                                                                {province.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </Field>
                                            <div className="grid grid-cols-[minmax(0,1fr)_110px] gap-3">
                                                <Field
                                                    label="City / Municipality"
                                                    required
                                                >
                                                    <select
                                                        required
                                                        value={
                                                            cityMunicipalityCode
                                                        }
                                                        onChange={(event) =>
                                                            void selectCityMunicipality(
                                                                event.target
                                                                    .value,
                                                            )
                                                        }
                                                        disabled={
                                                            !regionCode ||
                                                            loadingLevel ===
                                                                'cities' ||
                                                            citiesMunicipalities.length ===
                                                                0
                                                        }
                                                        className={inputClass}
                                                    >
                                                        <option value="">
                                                            {loadingLevel ===
                                                            'cities'
                                                                ? 'Loading cities/municipalities...'
                                                                : 'Select city or municipality'}
                                                        </option>
                                                        {citiesMunicipalities.map(
                                                            (location) => (
                                                                <option
                                                                    key={
                                                                        location.code
                                                                    }
                                                                    value={
                                                                        location.code
                                                                    }
                                                                >
                                                                    {
                                                                        location.name
                                                                    }
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                </Field>
                                                <Field
                                                    label="Zip Code"
                                                    required
                                                >
                                                    <input
                                                        name="zip_code"
                                                        required
                                                        inputMode="numeric"
                                                        value={zipCode}
                                                        placeholder={
                                                            zipCodeLoading
                                                                ? 'Loading...'
                                                                : 'Auto-filled'
                                                        }
                                                        readOnly
                                                        className={`${inputClass} bg-slate-50`}
                                                    />
                                                    {zipCodeError && (
                                                        <span className="mt-1 block text-[10px] font-semibold text-red-600">
                                                            {zipCodeError}
                                                        </span>
                                                    )}
                                                </Field>
                                            </div>
                                            <Field
                                                label="Barangay Name"
                                                required
                                            >
                                                <select
                                                    required
                                                    value={barangayCode}
                                                    onChange={(event) => {
                                                        const selected =
                                                            barangayOptions.find(
                                                                (item) =>
                                                                    item.code ===
                                                                    event.target
                                                                        .value,
                                                            );
                                                        setBarangayCode(
                                                            event.target.value,
                                                        );
                                                        setName(
                                                            selected
                                                                ? `Barangay ${selected.name}`
                                                                : '',
                                                        );
                                                        setCode(
                                                            selected?.psgc10DigitCode ||
                                                                selected?.code ||
                                                                '',
                                                        );
                                                    }}
                                                    disabled={
                                                        !cityMunicipalityCode ||
                                                        loadingLevel ===
                                                            'barangays'
                                                    }
                                                    className={inputClass}
                                                >
                                                    <option value="">
                                                        {loadingLevel ===
                                                        'barangays'
                                                            ? 'Loading barangays...'
                                                            : 'Select barangay'}
                                                    </option>
                                                    {barangayOptions.map(
                                                        (barangay) => (
                                                            <option
                                                                key={
                                                                    barangay.code
                                                                }
                                                                value={
                                                                    barangay.code
                                                                }
                                                            >
                                                                {barangay.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </Field>
                                            <Field
                                                label="Barangay Code / PSGC Code"
                                                required
                                            >
                                                <input
                                                    name="barangay_code"
                                                    required
                                                    value={code}
                                                    readOnly
                                                    className={inputClass}
                                                />
                                            </Field>
                                            <Field
                                                label="Street/Purok"
                                                required
                                            >
                                                <input
                                                    name="street_purok"
                                                    required
                                                    value={streetPurok}
                                                    onChange={(event) =>
                                                        setStreetPurok(
                                                            event.target.value,
                                                        )
                                                    }
                                                    className={inputClass}
                                                />
                                            </Field>
                                            <Field label="Latitude" required>
                                                <input
                                                    name="latitude"
                                                    required
                                                    type="number"
                                                    step="any"
                                                    value={latitude}
                                                    onChange={(event) =>
                                                        setLatitude(
                                                            event.target.value,
                                                        )
                                                    }
                                                    className={inputClass}
                                                />
                                            </Field>
                                            <Field label="Longitude" required>
                                                <input
                                                    name="longitude"
                                                    required
                                                    type="number"
                                                    step="any"
                                                    value={longitude}
                                                    onChange={(event) =>
                                                        setLongitude(
                                                            event.target.value,
                                                        )
                                                    }
                                                    className={inputClass}
                                                />
                                            </Field>
                                            {psgcError && (
                                                <p
                                                    className="text-xs font-semibold text-red-600"
                                                    role="alert"
                                                >
                                                    {psgcError}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <span className="mb-1.5 block text-xs font-bold text-[#173b72]">
                                                Google Map
                                            </span>
                                            <MapPanel
                                                large
                                                query={completeAddress}
                                            />
                                        </div>
                                    </div>
                                </Section>
                                <Section
                                    icon="🏛"
                                    title="2. Basic Barangay Information"
                                >
                                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                        <Field
                                            label="Barangay Type / Classification"
                                            required
                                        >
                                            <select
                                                required
                                                value={type}
                                                onChange={(e) =>
                                                    setType(e.target.value)
                                                }
                                                className={inputClass}
                                            >
                                                <option value="">
                                                    Select type
                                                </option>
                                                <option>Urban</option>
                                                <option>Rural</option>
                                            </select>
                                        </Field>
                                        <div className="sm:col-span-2 xl:col-span-3">
                                            <Field
                                                label="Complete Address"
                                                required
                                            >
                                                <input
                                                    name="complete_address"
                                                    required
                                                    value={completeAddress}
                                                    readOnly
                                                    className={`${inputClass} bg-slate-50`}
                                                />
                                            </Field>
                                        </div>
                                        <Field label="Barangay Seal / Photo">
                                            <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-2 text-center text-xs font-semibold text-blue-700 transition hover:border-blue-400 hover:bg-blue-50">
                                                {sealPreview ? (
                                                    <>
                                                        <img
                                                            src={sealPreview}
                                                            alt="Barangay seal preview"
                                                            className="h-20 w-20 rounded-lg object-cover shadow-sm"
                                                        />
                                                        <span className="mt-2">
                                                            Change image
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        ☁ &nbsp; Upload Seal /
                                                        Photo
                                                        <span className="mt-1 text-[10px] text-slate-500">
                                                            JPG, PNG, max 10 MB
                                                        </span>
                                                    </>
                                                )}
                                                <input
                                                    name="barangay_seal"
                                                    type="file"
                                                    accept="image/png,image/jpeg"
                                                    onChange={selectSeal}
                                                    className="sr-only"
                                                />
                                            </label>
                                            {sealError && (
                                                <p
                                                    className="mt-1.5 text-xs font-semibold text-red-600"
                                                    role="alert"
                                                >
                                                    {sealError}
                                                </p>
                                            )}
                                        </Field>
                                        <Field label="Status" required>
                                            <div className="flex h-10 items-center gap-3">
                                                <button
                                                    type="button"
                                                    role="switch"
                                                    aria-checked={active}
                                                    onClick={() =>
                                                        setActive(!active)
                                                    }
                                                    className={`relative h-5 w-10 rounded-full transition ${active ? 'bg-blue-600' : 'bg-slate-300'}`}
                                                >
                                                    <span
                                                        className={`absolute top-0.5 size-4 rounded-full bg-white transition ${active ? 'left-5.5' : 'left-0.5'}`}
                                                    />
                                                </button>
                                                <span className="text-xs font-semibold">
                                                    {active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                            </div>
                                        </Field>
                                    </div>
                                </Section>
                                <Section
                                    icon="♧"
                                    title="3. Administrative Information"
                                >
                                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                                        <Field
                                            label="Barangay Captain"
                                            required
                                        >
                                            <input
                                                required
                                                value={captain}
                                                onChange={(e) =>
                                                    setCaptain(e.target.value)
                                                }
                                                className={inputClass}
                                            />
                                        </Field>
                                        <Field
                                            label="Barangay Secretary"
                                            required
                                        >
                                            <input
                                                required
                                                defaultValue="Juan Miguel Reyes"
                                                className={inputClass}
                                            />
                                        </Field>
                                        <Field
                                            label="Barangay Treasurer"
                                            required
                                        >
                                            <input
                                                required
                                                defaultValue="Maria Lourdes Cruz"
                                                className={inputClass}
                                            />
                                        </Field>
                                        <Field label="Contact Number" required>
                                            <input
                                                required
                                                defaultValue="0917 234 5678"
                                                className={inputClass}
                                            />
                                        </Field>
                                        <Field label="Official Email" required>
                                            <input
                                                required
                                                type="email"
                                                defaultValue="poblacion@villanueva.gov.ph"
                                                className={inputClass}
                                            />
                                        </Field>
                                    </div>
                                </Section>
                                <Section
                                    icon="♧"
                                    title="4. Demographic and Profile Details"
                                >
                                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                                        <Field label="Population" required>
                                            <input
                                                required
                                                type="number"
                                                min="0"
                                                value={population}
                                                onChange={(e) =>
                                                    setPopulation(
                                                        e.target.value,
                                                    )
                                                }
                                                className={inputClass}
                                            />
                                        </Field>
                                        <Field
                                            label="Number of Households"
                                            required
                                        >
                                            <input
                                                required
                                                type="number"
                                                min="0"
                                                defaultValue="1187"
                                                className={inputClass}
                                            />
                                        </Field>
                                        <Field
                                            label="Land Area (hectares)"
                                            required
                                        >
                                            <input
                                                required
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                defaultValue="215.60"
                                                className={inputClass}
                                            />
                                        </Field>
                                        <Field
                                            label="Date Established"
                                            required
                                        >
                                            <input
                                                required
                                                type="date"
                                                defaultValue="1960-01-15"
                                                className={inputClass}
                                            />
                                        </Field>
                                    </div>
                                </Section>
                                <Section icon="▧" title="5. Notes / Remarks">
                                    <Field label="Remarks / Profile Notes">
                                        <textarea
                                            maxLength={500}
                                            rows={3}
                                            defaultValue="Barangay Poblacion is the center of governance, commerce, and public services in Villanueva. It hosts major municipal facilities including the Municipal Hall, public market, and central school."
                                            className={`${inputClass} h-auto py-2`}
                                        />
                                    </Field>
                                    <p className="mt-1 text-right text-[10px] text-slate-500">
                                        182 / 500
                                    </p>
                                </Section>
                            </div>
                        </form>
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
