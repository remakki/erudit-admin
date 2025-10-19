import { Event } from '@/types/events';
import { ApplicationList } from '@/types/applications';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { ApplicationsTable } from '@/components/applications-table';
import { formatDateTime } from '@/lib/utils';
import { getEventAction } from '@/app/actions/events';
import { getListApplicationsAction } from '@/app/actions/applications';

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = (await getEventAction(parseInt(id))) as Event;
  const applicationsData = (await getListApplicationsAction()) as ApplicationList;

  const eventApplications = applicationsData.applications.filter(
    (app) => app.event_id === event.id
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <Link href={`/events/${event.id}/edit`}>
          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            Редактировать
          </Button>
        </Link>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">Номер события</h3>
            <p className="text-lg">#{event.number}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">Формат</h3>
            <p className="text-lg capitalize">{event.format || 'Неопределен'}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">Дата и время</h3>
            <p className="text-lg">{formatDateTime(event.datetime_event)}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">
              Продолжительность (мин)
            </h3>
            <p className="text-lg">{event.duration}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">Место проведения</h3>
            <p className="text-lg">{event.location}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">Цена</h3>
            <p className="text-lg">{event.price} ₽</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">
              Максимальное число команд
            </h3>
            <p className="text-lg">{event.max_teams}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">Заявки</h3>
            <p className="text-lg">
              {eventApplications.length} / {event.max_teams}
            </p>
          </div>

          {event.theme && (
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-1">Тема события</h3>
              <p className="text-lg">{event.theme}</p>
            </div>
          )}

          <div className="md:col-span-2">
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">
              Период регистрации на событие
            </h3>
            <p className="text-lg">
              {formatDateTime(event.registration_start)} - {formatDateTime(event.registration_end)}
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">Описание</h3>
            <p className="text-lg whitespace-pre-wrap">{event.description}</p>
          </div>

          {event.image_url && (
            <div className="md:col-span-2">
              <h3 className="font-semibold text-sm text-muted-foreground mb-1">Изображение</h3>
              <img src={event.image_url} alt={event.title} className="rounded-lg max-w-md mt-2" />
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">
          Заявки на событие ({eventApplications.length})
        </h2>
        <ApplicationsTable applications={eventApplications} />
      </div>
    </div>
  );
}
