import * as migration_20260614_193724_initial from './20260614_193724_initial';

export const migrations = [
  {
    up: migration_20260614_193724_initial.up,
    down: migration_20260614_193724_initial.down,
    name: '20260614_193724_initial'
  },
];
