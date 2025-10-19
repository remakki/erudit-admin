'use server';

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api-client';

export async function deleteApplicationAction(id: number) {
  try {
    await api.applications.delete(id);
    revalidatePath('/events');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete application',
    };
  }
}

export async function getListApplicationsAction() {
  try {
    return await api.applications.list();
  } catch (error) {
    return [];
  }
}
