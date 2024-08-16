export type PermissionSchema = {
  create: boolean;
  view: boolean;
  edit: boolean;
};

export type Profile = {
  _id?: string;
  profileName: string;
  status: boolean;
  permission: {
    leads: PermissionSchema;
    users: PermissionSchema;
    calls: PermissionSchema;
    profile: PermissionSchema;
    Complaint:PermissionSchema;
  };
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
};
