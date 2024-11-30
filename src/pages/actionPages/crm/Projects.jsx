
// import React from "react";
// import { useSelector } from "react-redux";
// import { detailColumn } from 'enum/tableColumnEnum';
// import ActionPageMain from 'pages/components/ActionPageMain';
// import createFormEnum from 'enum/createFormEnum';
// import { fetchAllProjects } from "redux/slices/actionSlice/projectsSlice";
// import { projectColumns } from "components/tableColumns/projectColumn";

// const Projects = () => {
//   const { projects } = useSelector(state => state.actions);
//   const columns = projectColumns();

//   return (
//     <ActionPageMain
//       formKey={createFormEnum.projects}
//       rows={projects}
//       columns={columns}
//       label='Projects'
//       createLabel='Create Projects'
//       fetchApi={fetchAllProjects}
//       isMiniTable={false}
//       createFormProps={{
//         maxWidth: 'md',
//         disableSubmitNew: true,
//       }}
//     />
//   );
// }
// export default Projects;
