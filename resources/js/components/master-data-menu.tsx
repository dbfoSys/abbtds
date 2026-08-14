import { Link } from '@inertiajs/react';
import { index as approvalRoutesIndex } from '@/routes/approval-routes';
import { index as banksIndex } from '@/routes/banks';
import { index as barangaysIndex } from '@/routes/barangays';
import { index as budgetClassificationsIndex } from '@/routes/budget-classifications';
import { index as chartOfAccountsIndex } from '@/routes/chart-of-accounts';
import { index as expenseCategoriesIndex } from '@/routes/expense-categories';
import { index as fiscalYearsIndex } from '@/routes/fiscal-years';
import { index as formTypesIndex } from '@/routes/form-types';
import { index as fundingSourcesIndex } from '@/routes/funding-sources';
import { index as jevTypesIndex } from '@/routes/jev-types';
import { index as municipalInformationIndex } from '@/routes/municipal-information';
import { index as natureOfCollectionsIndex } from '@/routes/nature-of-collections';
import { index as payeesIndex } from '@/routes/payees';
import { index as payorsIndex } from '@/routes/payors';
import { index as positionsIndex } from '@/routes/positions';
import { index as programCategoriesIndex } from '@/routes/program-categories';
import { index as responsibilityCentersIndex } from '@/routes/responsibility-centers';

const masterDataItems = [
    'Municipal Information',
    'Barangay',
    'Position',
    'Payee',
    'Chart of Accounts',
    'Form Type',
    'Bank',
    'Payor',
    'Nature of Collection',
    'JEV Type',
    'Fiscal Year',
    'Program / Category',
    'Expense Category',
    'Funding Source',
    'Budget Classification',
    'Linked Barangay / Office',
    'Office / Barangay',
    'Responsibility Center',
    'Approval Route / Level',
];

export default function MasterDataMenu() {
    return (
        <details className="group">
            <summary className="flex cursor-pointer list-none items-center gap-4 rounded-lg px-3 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 [&::-webkit-details-marker]:hidden">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="size-5.5 shrink-0"
                    aria-hidden="true"
                >
                    <ellipse cx="12" cy="5" rx="8" ry="3" />
                    <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
                </svg>
                <span className="flex-1">Master Data</span>
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
                {masterDataItems.map((item) =>
                    item === 'Municipal Information' ||
                    item === 'Barangay' ||
                    item === 'Position' ||
                    item === 'Payee' ||
                    item === 'Chart of Accounts' ||
                    item === 'Form Type' ||
                    item === 'Bank' ||
                    item === 'Payor' ||
                    item === 'Nature of Collection' ||
                    item === 'JEV Type' ||
                    item === 'Fiscal Year' ||
                    item === 'Program / Category' ||
                    item === 'Expense Category' ||
                    item === 'Funding Source' ||
                    item === 'Budget Classification' ||
                    item === 'Responsibility Center' ||
                    item === 'Approval Route / Level' ? (
                        <Link
                            key={item}
                            href={
                                item === 'Municipal Information'
                                    ? municipalInformationIndex()
                                    : item === 'Position'
                                      ? positionsIndex()
                                      : item === 'Payee'
                                        ? payeesIndex()
                                        : item === 'Chart of Accounts'
                                          ? chartOfAccountsIndex()
                                          : item === 'Form Type'
                                            ? formTypesIndex()
                                            : item === 'Bank'
                                              ? banksIndex()
                                              : item === 'Payor'
                                                ? payorsIndex()
                                                : item ===
                                                    'Nature of Collection'
                                                  ? natureOfCollectionsIndex()
                                                  : item === 'JEV Type'
                                                    ? jevTypesIndex()
                                                    : item === 'Fiscal Year'
                                                      ? fiscalYearsIndex()
                                                      : item ===
                                                          'Program / Category'
                                                        ? programCategoriesIndex()
                                                        : item ===
                                                            'Expense Category'
                                                          ? expenseCategoriesIndex()
                                                          : item ===
                                                              'Funding Source'
                                                            ? fundingSourcesIndex()
                                                            : item ===
                                                                'Budget Classification'
                                                              ? budgetClassificationsIndex()
                                                              : item ===
                                                                  'Responsibility Center'
                                                                ? responsibilityCentersIndex()
                                                                : item ===
                                                                    'Approval Route / Level'
                                                                  ? approvalRoutesIndex()
                                                                  : barangaysIndex()
                            }
                            className="rounded-md px-3 py-2 text-left text-xs font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                        >
                            {item}
                        </Link>
                    ) : (
                        <button
                            key={item}
                            type="button"
                            className="rounded-md px-3 py-2 text-left text-xs font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                        >
                            {item}
                        </button>
                    ),
                )}
            </div>
        </details>
    );
}
