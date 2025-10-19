'use server';

import { api } from '@/lib/api-client';
import { revalidatePath } from 'next/cache';
import { RequestPartialUpdate } from '@/types/requests';

export async function getListRequestsAction() {
  try {
    return await api.requests.list();
  } catch (error) {
    return [];
  }
}

export async function updateRequestAction(id: number, data: RequestPartialUpdate) {
  try {
    await api.requests.update(id, data);
    revalidatePath('/requests');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update request',
    };
  }
}

export async function deleteRequestAction(id: number) {
  try {
    await api.requests.delete(id);
    revalidatePath('/requests');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete request',
    };
  }
}
