import React from "react";

import { userTableColumns } from "./componenets/tableColumns/userTableColumn";
import { getUsers, createUser, updateUser } from "api/profileApis";
import UserForm from "./componenets/forms/UserForm";
import UserUpdateForm from "./componenets/forms/UserUpdateForm";

import ProfileTable from "./componenets/ProfileTable";

const UserTable = () => {
  return (
    <ProfileTable
      getApi={getUsers}
      createApi={createUser}
      updateApi={updateUser}

      columns={userTableColumns}
      CreateForm={UserForm}
      UpdateForm={UserUpdateForm}

      title='Users'
      buttonLabel='User'

      replaceCreateProperties={(rowData) => {
        console.log(rowData)
        return (
          {
            ...rowData,
            fK_SubscriptionLevelID: 3,
            accountId: 1,
          }
        );
      }}

      filterSelectorEnum={[
        {
          name: "global",
          label: "Search",
          placeholder: "User",
        }
      ]}
      onlyGlobalFilter

      updateReplaceObjectKey='userID'
    />
  );
};
export default UserTable;
