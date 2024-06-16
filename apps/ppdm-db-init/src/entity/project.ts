import { fakerKO as faker } from '@faker-js/faker';

export function Project() {
  const project = [];

  const id = 'project01';
  const name = 'NPDM SM Project';
  const description = 'NPDM SM 프로젝트';
  const state = 'Active';
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

  project.push({
    id,
    name,
    description,
    state,
    createdAt,
    updatedAt,
  });

  const result: string[] = [];

  project.forEach((data) => {
    result.push(
      `INSERT INTO TB_PROJECT (ID, NAME, DESCRIPTION, STATE, CREATED_AT, UPDATED_AT) 
       VALUES ('${data.id}','${data.name}','${data.description}','${data.state}','${data.createdAt}','${data.updatedAt}');`,
    );
  });

  console.log('CREATE TB_PROJECT'.padEnd(80, '-') + `(${result.length})`);
  return { project, result };
}
