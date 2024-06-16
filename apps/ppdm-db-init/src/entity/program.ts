import { fakerKO as faker } from '@faker-js/faker';

export function Program() {
  const program = [];

  const id = 'program01';
  const name = 'NPDM';
  const description = 'NPDM 프로그램';
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

  program.push({
    id,
    name,
    description,
    state,
    createdAt,
    updatedAt,
  });

  const result: string[] = [];

  program.forEach((data) => {
    result.push(
      `INSERT INTO TB_PROGRAM (ID, NAME, DESCRIPTION, STATE, CREATED_AT, UPDATED_AT) 
       VALUES ('${data.id}','${data.name}','${data.description}','${data.state}','${data.createdAt}','${data.updatedAt}');`,
    );
  });

  console.log('CREATE TB_PROGRAM'.padEnd(80, '-') + `(${result.length})`);
  return { program, result };
}
