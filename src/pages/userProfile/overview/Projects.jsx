import React from 'react';

import ProfileTable from '../componenets/ProfileTable'

import {
  createProject,
  getProjects,
} from 'api/profileApis'

import { projectTableColumns } from '../componenets/tableColumns/projectTableColumns'

import ProjectForm from '../componenets/forms/project/ProjectForm'

const Projects = () => {
  return (
    <ProfileTable
      getApi={getProjects}
      createApi={createProject}
      updateApi={() => {}}
      columns={projectTableColumns}

      title='Projects'
      buttonLabel='Project'

      CreateForm={ProjectForm}

      filterSelectorEnum={[
        {
          name: "global",
          label: "Search Projects",
          placeholder: "Search here...",
        }
      ]}
      onlyGlobalFilter
      disableCheckboxSelection
      updateReplaceObjectKey='projectId'
    />
  );
}

export default Projects;
