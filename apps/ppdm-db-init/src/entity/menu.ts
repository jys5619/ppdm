import { fakerKO as faker } from '@faker-js/faker';

interface IMenu {
  id?: string;
  name?: string;
  url?: string;
  parentName?: string;
  parentId?: string;
  sequence?: number;
}

export function Menu() {
  const menus = [];
  const result: string[] = [];

  // MAIN
  let mainMenus: IMenu[] = [
    { name: 'Work', url: `/work`, sequence: 1 },
    { name: 'Project', url: `/project`, sequence: 2 },
    { name: 'Program', url: `/program`, sequence: 3 },
    { name: 'Data', url: `/data`, sequence: 4 },
    { name: 'Admin', url: `/admin`, sequence: 5 },
    { name: 'Sample', url: `/sample`, sequence: 6 },
    // Work
    {
      parentName: 'Work',
      name: 'Todo',
      url: `/work/todo`,
      sequence: 1,
    },
    {
      parentName: 'Work',
      name: 'Monitor',
      url: `/work/monitor`,
      sequence: 2,
    },
    // Project
    {
      parentName: 'Project',
      name: 'Project',
      url: `/project/info`,
      sequence: 1,
    },
    // Program
    {
      parentName: 'Program',
      name: 'App',
      url: `/program/info`,
      sequence: 1,
    },
    // Data
    {
      parentName: 'Data',
      name: 'Database Info',
      url: `/data/database/info`,
      sequence: 1,
    },
    {
      parentName: 'Data',
      name: 'Query Form',
      url: `/data/query-form`,
      sequence: 2,
    },
    // Admin
    {
      parentName: 'Admin',
      name: 'Project',
      url: `/admin/project`,
      sequence: 1,
    },
    {
      parentName: 'Admin',
      name: 'Program',
      url: `/admin/program`,
      sequence: 2,
    },
    {
      parentName: 'Admin',
      name: 'Database',
      url: `/admin/database/edit`,
      sequence: 3,
    },
    // Sample
    { parentName: 'Sample', name: 'Link', url: `/sample/ui/link`, sequence: 2 },
    {
      parentName: 'Sample',
      name: 'Button',
      url: `/sample/ui/button`,
      sequence: 3,
    },
    {
      parentName: 'Sample',
      name: 'Table ',
      url: `/sample/ui/table`,
      sequence: 4,
    },
    {
      parentName: 'Sample',
      name: 'Input ',
      url: `/sample/ui/input`,
      sequence: 5,
    },
    {
      parentName: 'Sample',
      name: 'Input ',
      url: `/sample/ui/input`,
      sequence: 5,
    },
    {
      parentName: 'Sample',
      name: 'Connection',
      url: `/sample/db/connection`,
      sequence: 1,
    },
    {
      parentName: 'Sample',
      name: 'Query Form',
      url: `/sample/db/query-form`,
      sequence: 1,
    },
  ];

  mainMenus = mainMenus.map((m) => {
    return { ...m, id: faker.string.uuid() };
  });

  mainMenus = mainMenus.map((m) => {
    const findMenu =
      m.parentName && mainMenus.find((mm) => mm.name === m.parentName);
    return {
      ...m,
      parentId: findMenu ? findMenu.id : '',
    };
  });

  for (const menu of mainMenus) {
    const id = menu.id;
    const name = menu.name;
    const url = menu.url;
    const parentId = menu.parentId || '';
    const sequence = menu.sequence || 0;
    const createdAt = faker.date
      .past()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    const updatedAt = faker.date
      .recent()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    menus.push({ id, name, url, parentId, sequence, createdAt, updatedAt });
  }

  menus.forEach((data) => {
    result.push(
      `INSERT INTO TB_MENU (ID, NAME, URL, STATE, PARENT_ID, SEQUENCE, CREATED_AT, UPDATED_AT) VALUES ('${data.id}','${data.name}', '${data.url}', 'Active', '${data.parentId}', ${data.sequence}, '${data.createdAt}', '${data.updatedAt}');`,
    );
  });

  console.log('CREATE TB_MENU'.padEnd(80, '-') + `(${result.length})`);
  return { menus, result };
}
