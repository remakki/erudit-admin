import { RequestList } from '@/types/requests';
import { RequestsTable } from '@/components/requests-table';
import { getListRequestsAction } from '@/app/actions/requests';

export default async function RequestsPage() {
  const data = (await getListRequestsAction()) as RequestList;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Заявки</h1>
      </div>

      <RequestsTable requests={data.requests} />
    </div>
  );
}
