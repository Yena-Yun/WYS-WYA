import { selector, DefaultValue } from 'recoil';
import {
  clickedTabState,
  expenseListState,
  isOpenCalendarState,
  isOpenModalState,
  isOpenTagPopupState,
  selectedDateState,
  transactionListState,
  transactionState,
  clickedTagPopupIndexState,
  isOpenDetailModalState,
  clickedExpenseIndexState,
  listState,
} from './atom';

export const toggleModalSelector = selector({
  key: 'toggleModal',
  get: () => {
    return '';
  },
  set: ({ get, set }, flag) => {
    const isOpenModal = get(isOpenModalState);
    const isOpenDetailModal = get(isOpenDetailModalState);

    if (flag === 'add' && isOpenModal) {
      set(isOpenModalState, false);
    } else if (flag === 'add' && !isOpenModal) {
      set(isOpenModalState, true);
    } else if (flag === 'detail' && isOpenDetailModal) {
      set(isOpenDetailModalState, false);
    } else {
      set(isOpenDetailModalState, true);
    }
  },
});

export const toggleCalendarSelector = selector({
  key: 'toggleCalendar',
  get: () => {},
  set: ({ get, set }) => {
    const isOpenCalendar = get(isOpenCalendarState);

    if (isOpenCalendar) {
      set(isOpenCalendarState, false);
    } else {
      set(isOpenCalendarState, true);
    }
  },
});

export const toggleTagPopupSelector = selector({
  key: 'toggleTagPopup',
  get: () => {},
  set: ({ get, set }) => {
    const isOpenTagPopup = get(isOpenTagPopupState);

    if (isOpenTagPopup) {
      set(isOpenTagPopupState, false);
    } else {
      set(isOpenTagPopupState, true);
    }
  },
});

export const tabClickSelector = selector({
  key: 'handleTabClick',
  get: ({ get }) => {
    return get(clickedTabState);
  },
  set: ({ set }, newTab) => {
    set(clickedTabState, newTab);
  },
});

export const selectedDateSelector = selector({
  key: 'handleSelectDate',
  get: () => {
    return new Date(); // void 피하기 -> get에 원형값 입력
  },
  set: ({ set }, newDate) => {
    // DefaultValue 임포트
    if (newDate instanceof DefaultValue) {
      return newDate;
    } else set(selectedDateState, newDate);
  },
});

export const addTagToExpenseListSelector = selector({
  key: 'addTagToExpenseList',
  get: () => {
    return '';
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return newValue;
    } else {
      const expenseItemList = get(expenseListState);
      const clickedTagPopupIndex = get(clickedTagPopupIndexState);

      const result = expenseItemList.map((item) => {
        return item.id === clickedTagPopupIndex
          ? { ...item, tag: newValue }
          : item;
      });

      set(expenseListState, result);
    }
  },
});

export const addListSelector = selector({
  key: 'addList',
  get: () => {},
  set: ({ get, set }) => {
    const list = get(listState);
    const transaction = get(transactionState);

    if (list instanceof DefaultValue) {
      return list;
    } else {
      set(transactionState, {
        ...transaction,
        list: [...transaction.list, list],
      });
    }
  },
});

export const addTransactionListSelector = selector({
  key: 'addTransactionList',
  get: () => {},
  set: ({ get, set }) => {
    const transaction = get(transactionState);
    const transactionList = get(transactionListState);

    if (
      transactionList.find(
        ({ date }) =>
          date.toString().slice(0, 15) ===
          transaction.date.toString().slice(0, 15)
      )
    ) {
      const addedList = transactionList.map((listItem) => {
        if (
          listItem.date.toString().slice(0, 15) ===
          transaction.date.toString().slice(0, 15)
        ) {
          listItem.list.map((item) => {
            return {
              ...item,
              title: item.title,
              items: item.items,
            };
          });
        }

        return listItem;
      });
    } else {
      set(transactionListState, [...transactionList, transaction]);
    }
  },
});

export const deleteTransactionListSelector = selector({
  key: 'deleteTransactionList',
  get: () => {},
  set: ({ get, set }) => {
    const list = get(transactionListState);
    const index = get(clickedExpenseIndexState);

    const deletedList = list.filter(({ id }) => id !== index);

    set(transactionListState, deletedList);
  },
});
