import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import createFormEnum from 'enum/createFormEnum';

import { fetchAllQuotes, updateQuotesCard } from 'redux/slices/actionSlice/quotesSlice';
import { updateQuote, createQuote, updateQuoteStatus,  } from 'api/crmApis';

import KanbanContainer from 'components/kanban/KanbanContainer';
import KanbanProgressiveDetail from 'components/kanban/components/kanbanProgressive/KanbanProgressiveDetail';
import KanbanProgressiveFilters from 'components/kanban/components/kanbanProgressive/KanbanProgressiveFilters';
import QuoteCard from 'components/kanban/components/KanbanCards/QuoteCard';

import ExportXlsx from 'pages/components/common/ExportXlsx';

import { keys } from 'lodash';

const Quotes = () => {
  const dispatch = useDispatch();
  const [listData, setListData] = useState([]);
  const { quotes } = useSelector((state) => state.actions);
  const { contactList } = useSelector(state => state.lists);

  useEffect(() => {
    !quotes?.length && dispatch(fetchAllQuotes());
  }, [quotes]);

  return <>
    <KanbanContainer
      boardData={quotes}
      updateApi={updateQuote}
      updateStatusApi={updateQuoteStatus}
      addApi={createQuote}
      fetchApi={fetchAllQuotes}
      updateLocalState={data => dispatch(updateQuotesCard(data))}
      CardComponent={QuoteCard}
      ItemDialogComponent={KanbanProgressiveDetail}
      createDialogProps={{ disableFormFooter: true }}
      idKey='quoteID'
      statusKey='quoteStatus'
      statusIdKey='quoteStatusId'
      listKey='quotes'
      label='Quote'
      columnMinWidth='180px'
      formKey={createFormEnum.quotes}
      FiltersComponent={KanbanProgressiveFilters}
      getListData={setListData}
      filters={[
        {
          type: 'inputField',
          name: 'search',
          filterBy: [
            'customerContactPersonName',
            'quoteNO',
            'totalAmount',
            'taxes',
            'contactName',
            'salesPerson',
            'quoteExpiryDate',
          ],
          init: '',
        },
        {
          type: 'date',
          name: 'byExpiryDate',
          filterBy: ['quoteExpiryDate'],
          init: null,
        },
        {
          data: contactList,
          type: 'searchSelect',
          name: 'byContactName',
          filterBy: ['customerContactPersonName'],
          init: '',
        },
      ]}
      isProgressive
      toolbarItems={
        <ExportXlsx
          isButton
          columns={keys(listData.length ? listData?.[0] : [])}
          rows={listData}
        />
      }
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

export default Quotes;
