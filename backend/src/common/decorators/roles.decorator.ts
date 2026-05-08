import { SetMetadata } from '@nestjs/common';

export type JameaRole = 'parent' | 'student' | 'teacher' | 'admin';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: JameaRole[]) => SetMetadata(ROLES_KEY, roles);
