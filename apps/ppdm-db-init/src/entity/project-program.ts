export function ProjectProgram() {
  const projectProgram = [];

  const projectId = 'project01';
  const programId = 'program01';

  projectProgram.push({
    projectId,
    programId,
  });

  const result: string[] = [];

  projectProgram.forEach((data) => {
    result.push(
      `INSERT INTO TB_PROJECT_PROGRAM (PROJECT_ID, PROGRAM_ID) 
       VALUES ('${data.projectId}','${data.programId}');`,
    );
  });

  console.log(
    'CREATE TB_PROJECT_PROGRAM'.padEnd(80, '-') + `(${result.length})`,
  );
  return { projectProgram, result };
}
