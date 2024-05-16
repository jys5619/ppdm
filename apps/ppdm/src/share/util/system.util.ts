interface IEnv {
  nodeEnv: string;
  project: {
    name: string;
    description: string;
    version: string;
  };
  db: {
    database: string;
    entityPath: string;
  };
  jwt: {
    secritKey: string;
    siteAccessUserRole: string;
  };
}

class PrivateSystemUtil {
  public path: {
    projectRoot: string;
    appsRoot: string;
  };
  public env: IEnv;

  constructor() {}

  init() {
    const root = __dirname.substring(0, __dirname.indexOf('dist') + 4);
    this.path = {
      projectRoot: root,
      appsRoot: root + '/apps/ppdm',
    };

    this.env = {
      nodeEnv: process.env.NODE_ENV,
      project: {
        name: process.env.PROJECT_NAME,
        description: process.env.PROJECT_DESCRIPTION,
        version: process.env.PROJECT_VERSION,
      },
      db: {
        database: process.env.DB_DATABASE,
        entityPath: process.env.DB_ENTITY_PATH,
      },
      jwt: {
        secritKey: process.env.JWT_SECRIT_KEY,
        siteAccessUserRole: process.env.SITE_ACCESS_USER_ROLE,
      },
    };
  }
}

export default class SystemUtil {
  static instance: PrivateSystemUtil;
  static getInstance() {
    if (!SystemUtil.instance) {
      SystemUtil.instance = new PrivateSystemUtil();
    }
    SystemUtil.instance.init();
    return SystemUtil.instance;
  }
}
