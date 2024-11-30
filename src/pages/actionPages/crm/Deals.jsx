import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { detailColumn } from 'enum/tableColumnEnum';
import ActionPageMain from 'pages/components/ActionPageMain';
import createFormEnum from 'enum/createFormEnum';
import { dealStageOrder } from 'enum/kanbanEnum';

import { fetchAllDeals, updateDealsCard } from 'redux/slices/actionSlice/dealsSlice';
import { updateDeals, createDeal } from 'api/crmApis';

import KanbanContainer from 'components/kanban/KanbanContainer';
import KanbanProgressiveDetail from 'components/kanban/components/kanbanProgressive/KanbanProgressiveDetail';
import KanbanProgressiveFilters from 'components/kanban/components/kanbanProgressive/KanbanProgressiveFilters';
import DealCard from 'components/kanban/components/KanbanCards/DealCard';

const Deals = () => {
  const dispatch = useDispatch();
  const { deals } = useSelector(state => state.actions);
  const { contactList } = useSelector(state => state.lists);

  useEffect(() => {
    !deals?.length && dispatch(fetchAllDeals());
  }, [deals]);

  return <>
    <KanbanContainer
      boardData={deals}
      updateApi={updateDeals}
      addApi={createDeal}
      fetchApi={fetchAllDeals}
      updateLocalState={data => dispatch(updateDealsCard(data))}
      CardComponent={DealCard}
      ItemDialogComponent={KanbanProgressiveDetail}
      idKey='dealId'
      statusKey='stage'
      listKey='deals'
      label='Deal'
      formKey={createFormEnum.deals}
      FiltersComponent={KanbanProgressiveFilters}
      filters={[
        {
          type: 'inputField',
          name: 'search',
          filterBy: ['dealName', 'dealId', 'probability', 'amount'],
          init: '',
        },
        {
          data: contactList,
          type: 'searchSelect',
          name: 'byContactName',
          filterBy: ['contactName'],
          init: '',
        },
        {
          type: 'date',
          name: 'byClosingDate',
          filterBy: ['closingDate'],
          init: null,
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

export default Deals;
