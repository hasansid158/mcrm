import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import createFormEnum from 'enum/createFormEnum';

import { fetchAllLeads, updateLeadsCard } from 'redux/slices/actionSlice/leadsSlice';
import { updateLead, createNewLead } from 'api/crmApis';

import KanbanContainer from 'components/kanban/KanbanContainer';
import KanbanProgressiveDetail from 'components/kanban/components/kanbanProgressive/KanbanProgressiveDetail';
import KanbanProgressiveFilters from 'components/kanban/components/kanbanProgressive/KanbanProgressiveFilters';
import LeadCard from 'components/kanban/components/KanbanCards/LeadCard';
import { fetchLeadTypes } from 'redux/slices/listSlice/listSlice';
import { isEmpty } from 'lodash';

const Leads = () => {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.actions);

  const {
    leadTypes
  } = useSelector(state => state.lists)

  useEffect(() => {
    if (!isEmpty(leadTypes)) return

    dispatch(fetchLeadTypes());
  }, []);


  useEffect(() => {
    !leads?.length && dispatch(fetchAllLeads());
  }, [leads]);

  return <>
    <KanbanContainer
      boardData={leads}
      updateApi={updateLead}
      addApi={createNewLead}
      fetchApi={fetchAllLeads}
      updateLocalState={data => dispatch(updateLeadsCard(data))}
      CardComponent={LeadCard}
      ItemDialogComponent={KanbanProgressiveDetail}
      idKey='leadId'
      statusKey='leadStatus'
      statusIdKey='leadStatusId'
      listKey='leads'
      label='Lead'
      columnMinWidth='180px'
      formKey={createFormEnum.leads}
      FiltersComponent={KanbanProgressiveFilters}
      filters={[
        {
          type: 'inputField',
          name: 'leadOwner',
          filterBy: ['leadOwner'],
          init: '',
        },
        {
          data: leadTypes,
          type: 'searchSelect',
          name: 'leadType',
          filterBy: ['leadtype'],
          init: '',
        },
        {
          type: 'inputField',
          name: 'company',
          filterBy: ['company'],
          init: '',
        },
        {
          type: 'inputField',
          name: 'search',
          filterBy: ['company', 'email', 'firstName', 'lastName', 'leadTitle'],
          init: '',
        },
      ]}
      isProgressive
    />
  </>

  // return (
  //   <ActionPageMain
  //     formKey={createFormEnum.deals}
  //     rows={deals}
  //     columns={detailColumn().deals}
  //     label='Deals'
  //     createLabel='Create Deals'
  //     fetchApi={fetchAllDeals}
  //   />
  // );
}

export default Leads;
