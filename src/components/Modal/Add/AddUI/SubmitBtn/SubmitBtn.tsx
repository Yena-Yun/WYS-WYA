import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { AMain } from 'recoil/atom';
import { SMain, SOpen } from 'recoil/selector';
import { Hook, Const } from 'utils';
import { TMain } from 'types';
import styles from './SubmitBtn.module.scss';

export const SubmitBtn = () => {
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);
  const list = useRecoilValue(AMain.listState);
  const items = useRecoilValue<TMain.ItemType[]>(AMain.itemState);
  const resetItems = useResetRecoilState(AMain.itemState);
  const resetList = useResetRecoilState(AMain.listState);
  const resetTransaction = useResetRecoilState(AMain.transactionState);
  const setItemToList = useSetRecoilState(SMain.setItemToListSelector);
  const setListToTransaction = useSetRecoilState(
    SMain.setListToTransactionSelector
  );
  const setTransactionToTransactionList = useSetRecoilState(
    SMain.setTransactionListSelector
  );
  const setTotalExpense = useSetRecoilState(SMain.getTotalPerDateSelector);
  const setCurrentDateToAddModal = useSetRecoilState(
    SMain.setCurrentDateToAddModalSelector
  );

  const validateList = () => {
    const noNameItem = items.some((item) => !item.name);
    const noPriceItem = items.some((item) => !item.price);

    if (!list.title) {
      Hook.popupToast('제목을 입력해주세요!', Const.TOAST_ID.TITLE);
    } else if (noNameItem && noPriceItem) {
      Hook.popupToast(
        '항목명과 가격을 하나 이상 입력해주세요!',
        Const.TOAST_ID.ITEM
      );
    } else if (noNameItem) {
      Hook.popupToast('항목명을 입력해주세요!', Const.TOAST_ID.NAME);
    } else if (noPriceItem) {
      Hook.popupToast('가격을 입력해주세요!', Const.TOAST_ID.PRICE);
    } else if (!noNameItem && !noPriceItem) {
      return true;
    }
  };

  const submitTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateList()) {
      setItemToList();
      setListToTransaction();
      setTransactionToTransactionList();
      setTotalExpense('all');
      setTotalExpense('byDate');
      resetItems();
      resetList();
      resetTransaction();
      setCurrentDateToAddModal();
      setCloseModal('addModal');
    }
  };

  return (
    <form className={styles.submitButtonWrap} onSubmit={submitTransaction}>
      <button className={styles.submitButton}>등록</button>
    </form>
  );
};
