import fs from 'node:fs';

const readmePath = 'README.md';
let readme = fs.readFileSync(readmePath, 'utf8');

const stackBlock = `
<!-- STACK_SECTION -->
<br/>

<div align="center">

### Tech Stack & Languages

![Python](https://img.shields.io/badge/Python-181818?style=flat-square&logo=python&logoColor=ffd400)
![TypeScript](https://img.shields.io/badge/TypeScript-181818?style=flat-square&logo=typescript&logoColor=ffd400)
![JavaScript](https://img.shields.io/badge/JavaScript-181818?style=flat-square&logo=javascript&logoColor=ffd400)
![C++](https://img.shields.io/badge/C++-181818?style=flat-square&logo=cplusplus&logoColor=ffd400)
![SQL](https://img.shields.io/badge/SQL-181818?style=flat-square&logo=postgresql&logoColor=ffd400)
<br/>
![React](https://img.shields.io/badge/React-202020?style=flat-square&logo=react&logoColor=f2f2f2)
![Next.js](https://img.shields.io/badge/Next.js-202020?style=flat-square&logo=nextdotjs&logoColor=f2f2f2)
![Node.js](https://img.shields.io/badge/Node.js-202020?style=flat-square&logo=nodedotjs&logoColor=f2f2f2)
![FastAPI](https://img.shields.io/badge/FastAPI-202020?style=flat-square&logo=fastapi&logoColor=f2f2f2)
![AWS](https://img.shields.io/badge/AWS-202020?style=flat-square&logo=amazonaws&logoColor=ffd400)
![Docker](https://img.shields.io/badge/Docker-202020?style=flat-square&logo=docker&logoColor=f2f2f2)
![MongoDB](https://img.shields.io/badge/MongoDB-202020?style=flat-square&logo=mongodb&logoColor=f2f2f2)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-202020?style=flat-square&logo=postgresql&logoColor=f2f2f2)
![LangChain](https://img.shields.io/badge/LangChain_/_RAG-202020?style=flat-square&logo=langchain&logoColor=ffd400)
![MCP](https://img.shields.io/badge/MCP_Agents-202020?style=flat-square&logo=anthropic&logoColor=ffd400)

<br/>

<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=NCG77&layout=compact&bg_color=181818&title_color=ffd400&text_color=c7c7c7&border_color=343434&langs_count=8" alt="Top Languages" />

</div>
`;

if (!readme.includes('<!-- STACK_SECTION -->')) {
  fs.writeFileSync(readmePath, readme.trimEnd() + '\n' + stackBlock, 'utf8');
}