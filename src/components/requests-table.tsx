'use client';

import { Request, StatusRequest } from '@/types/requests';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Mail, Phone, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-toastify';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { deleteRequestAction, updateRequestAction } from '@/app/actions/requests';
import { formatDateTimeShort } from '@/lib/utils';

const statusColors: Record<StatusRequest, string> = {
  new: 'bg-blue-500',
  viewed: 'bg-yellow-500',
  processed: 'bg-green-500',
};

const typeLabels: Record<string, string> = {
  consultation: 'Консультация',
  partnership: 'Партнерство',
  event_game_order: 'Заказ игры',
};

export function RequestsTable({ requests }: { requests: Request[] }) {
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this request?')) return;

    try {
      const result = await deleteRequestAction(id);
      if (result.success) {
        toast.success('Request deleted successfully');
      } else {
        toast.error(result.error || 'Failed to delete request');
      }
    } catch (error) {
      toast.error('Failed to delete request');
    }
  };

  const handleStatusChange = async (id: number, status: StatusRequest) => {
    try {
      const result = await updateRequestAction(id, status);
      if (result.success) {
        toast.success('Status updated successfully');
      } else {
        toast.error(result.error || 'Failed to update status');
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>Контакт</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Создано</TableHead>
            <TableHead>Сообщение</TableHead>
            <TableHead className="text-right">Действие</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                Заявок не найдено
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {request.email && (
                      <a
                        href={`mailto:${request.email}`}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                      >
                        <Mail className="h-3 w-3" />
                        {request.email}
                      </a>
                    )}
                    {request.phone && (
                      <a
                        href={`tel:${request.phone}`}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                      >
                        <Phone className="h-3 w-3" />
                        {request.phone}
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{request.type ? typeLabels[request.type] : 'N/A'}</Badge>
                </TableCell>
                <TableCell>
                  <Select
                    value={request.status}
                    onValueChange={(value) =>
                      handleStatusChange(request.id, value as StatusRequest)
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue>
                        <Badge className={statusColors[request.status]}>{request.status}</Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="viewed">Viewed</SelectItem>
                      <SelectItem value="processed">Processed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{formatDateTimeShort(request.created_at)}</TableCell>
                <TableCell className="max-w-[200px]">
                  <div className="truncate" title={request.message || ''}>
                    {request.message || '-'}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        alert(`Message: ${request.message || 'No message'}`);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(request.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
