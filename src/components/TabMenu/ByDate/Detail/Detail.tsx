import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AMain, AOpen, AIndex } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { ModalLayout } from 'components/Modal/Layout/ModalLayout';
import { Toast } from 'components/Modal/Toast/Toast';
import { Hook } from 'utils';
import styles from './Detail.module.scss';
import classNames from 'classnames';

export const ByDateDetail = () => {
  const isOpenToast = useRecoilValue(AOpen.isOpenToastState);
  const setIsOpenToast = useSetRecoilState(SOpen.toggleToastSelector);
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);
  const transactionList = useRecoilValue(AMain.transactionListState);
  const clickedIndex = useRecoilValue(AIndex.clickedIndexState);
  const clickedItemIndex = useRecoilValue(AIndex.clickedItemIndexState);

  const { lists } = transactionList.find(({ id }) => id === clickedIndex)!;
  const { title, items } = lists.find(({ id }) => id === clickedItemIndex)!;

  return (
    <>
      {isOpenToast && <Toast role='byDateDetail' />}
      <ModalLayout role='byDateDetail'>
        <h2 className={styles.modalTitle}>{title}</h2>

        <div className={styles.mainContainer}>
          {items.map(({ id, name, tag, price }) => (
            <div key={id} className={styles.info}>
              <div className={styles.nameTagGroup}>
                <div className={styles.name}>
                  {name !== '' && '‣'} &nbsp; {name}
                </div>
                {tag && <div className={styles.tag}>{tag}</div>}
              </div>
              <div className={styles.price}>{Hook.formatMoney(price)}</div>
            </div>
          ))}
        </div>
        <div className={styles.totalExpense}>
          <span>Total</span>&nbsp;
          {Hook.formatMoney(
            items.map(({ price }) => price).reduce((acc, cur) => acc + cur, 0)
          )}
        </div>

        <div className={styles.actionButtonContainer}>
          <button
            className={classNames(styles.actionButton, styles.confirmButton)}
            onClick={() => {
              setCloseModal('byDateDetail');
            }}
          >
            확인
          </button>
          <button
            className={classNames(styles.actionButton, styles.deleteButton)}
            onClick={() => setIsOpenToast()}
          >
            삭제
          </button>
        </div>
      </ModalLayout>
    </>
  );
};
