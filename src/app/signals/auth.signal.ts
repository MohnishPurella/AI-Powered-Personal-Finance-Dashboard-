import { signal } from '@angular/core';
import { User } from '../models/user.model';

export const authSignal = signal<User | null>(null);
