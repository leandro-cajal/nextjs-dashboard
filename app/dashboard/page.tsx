import { Card } from './cards';
import RevenueChart from './revenue-chart';
import LatestInvoices from './latest-invoices';
import { fetchLatestInvoices, fetchCardData, fetchRevenue } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '../ui/skeletons';
import CardWrapper from './cards';

export default async function Page() {
    const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices();
    const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
    } = await fetchCardData();

    return (
        <main>
            <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <CardWrapper
                    totalPaidInvoices={totalPaidInvoices}
                    totalPendingInvoices={totalPendingInvoices}
                    numberOfInvoices={numberOfInvoices}
                    numberOfCustomers={numberOfCustomers}
                />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart revenue={revenue} />
                </Suspense>
                <LatestInvoices latestInvoices={latestInvoices} />
            </div>
        </main>
    );
}
