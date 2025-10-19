import { api } from '@/lib/api-client';
import { EventList } from '@/types/events';
import { RequestList } from '@/types/requests';
import { ApplicationList } from '@/types/applications';
import { Calendar, Mail, Users } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const [eventsData, requestsData, applicationsData] = await Promise.all([
    api.events.list().catch(() => ({ events: [] })) as Promise<EventList>,
    api.requests.list().catch(() => ({ requests: [] })) as Promise<RequestList>,
    api.applications.list().catch(() => ({ applications: [] })) as Promise<ApplicationList>,
  ]);

  const stats = [
    {
      title: 'Количество событий',
      value: eventsData.events.length,
      icon: Calendar,
      href: '/events',
      color: 'bg-blue-500',
    },
    {
      title: 'Количество заявок на игры',
      value: applicationsData.applications.length,
      icon: Users,
      href: '/events',
      color: 'bg-green-500',
    },
    {
      title: 'Количество запросов',
      value: requestsData.requests.length,
      icon: Mail,
      href: '/requests',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Активность</h2>
        <p className="text-muted-foreground">
          Добро пожаловать в Админ Панель ЭрудитПати. Используйте навигационное меня слево для
          перехода между разделами.
        </p>
      </div>
    </div>
  );
}
