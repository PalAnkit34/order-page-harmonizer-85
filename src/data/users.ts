
import { User } from '@/types/auth';

export const USERS: Record<string, { password: string; user: User }> = {
  'admin': {
    password: '5360',
    user: {
      id: 'admin',
      role: 'admin',
      name: 'Administrator'
    }
  },
  'print': {
    password: '5360',
    user: {
      id: 'print',
      role: 'printing',
      name: 'Printing Manager'
    }
  },
  'cutting': {
    password: '5360',
    user: {
      id: 'cutting',
      role: 'cutting',
      name: 'Cutting Manager'
    }
  }
};
