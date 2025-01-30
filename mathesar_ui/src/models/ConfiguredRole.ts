import { api } from '@mathesar/api/rpc';
import type { RawConfiguredRole } from '@mathesar/api/rpc/roles';

import type { Database } from './Database';

export class ConfiguredRole {
  readonly id: number;

  readonly name: string;

  readonly database: Database;

  constructor(props: {
    database: Database;
    rawConfiguredRole: RawConfiguredRole;
  }) {
    this.id = props.rawConfiguredRole.id;
    this.name = props.rawConfiguredRole.name;
    this.database = props.database;
  }

  setPassword(password: string) {
    return api.roles.configured
      .set_password({
        configured_role_id: this.id,
        password,
      })
      .run();
  }

  delete() {
    return api.roles.configured.delete({ configured_role_id: this.id }).run();
  }
}
