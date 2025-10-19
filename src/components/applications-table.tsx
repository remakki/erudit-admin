'use client';

import { Application } from '@/types/applications';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { deleteApplicationAction } from '@/app/actions/applications';
import { formatDateTimeShort } from '@/lib/utils';

export function ApplicationsTable({ applications }: { applications: Application[] }) {
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      const result = await deleteApplicationAction(id);
      if (result.success) {
        toast.success('Application deleted successfully');
      } else {
        toast.error(result.error || 'Failed to delete application');
      }
    } catch (error) {
      toast.error('Failed to delete application');
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название команды</TableHead>
            <TableHead>Капитан</TableHead>
            <TableHead>Контакты</TableHead>
            <TableHead>Участников</TableHead>
            <TableHead>Создано</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                Заявок не найдено
              </TableCell>
            </TableRow>
          ) : (
            applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.team_name}</TableCell>
                <TableCell>{app.captain_name}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <a
                      href={`mailto:${app.captain_email}`}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    >
                      <Mail className="h-3 w-3" />
                      {app.captain_email}
                    </a>
                    <a
                      href={`tel:${app.captain_phone}`}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    >
                      <Phone className="h-3 w-3" />
                      {app.captain_phone}
                    </a>
                  </div>
                </TableCell>
                <TableCell>{app.team_participants_number}</TableCell>
                <TableCell>{formatDateTimeShort(app.created_at)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(app.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
