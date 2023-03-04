import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AMain, AOpen, ADate } from 'recoil/atom';
import { SMain, SOpen, SDate } from 'recoil/selector';
import { MiniCalendar } from 'components/MiniCalendar/MiniCalendar';
import { CalendarIcon } from 'components/Icons/Calendar/Calendar';
import { Hook } from 'utils';
import styles from './Header.module.scss';

export const Header = () => {
  const [isSelectSomeDate, setIsSelectSomeDate] = useState(true);
  const isOpenCalender = useRecoilValue(AOpen.isOpenByDateCalendarState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);

  const selectedDate = useRecoilValue(ADate.byDateSelectedDateState);
  const setSelectDate = useSetRecoilState(SDate.selectedMiniDateSelector);

  const totalExpense = useRecoilValue(AMain.totalPerDateState);
  const setTotalExpense = useSetRecoilState(SMain.getTotalPerDateSelector);

  useEffect(() => {
    setTotalExpense('byDate');
  }, [selectedDate]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isOpenCalender && <MiniCalendar />}

        <div className={styles.period}>
          <CalendarIcon />
          <div
            className={styles.selectedDate}
            onClick={() => {
              setToggleCalendar('byDate');
              setSelectDate(selectedDate);
              setTotalExpense('byDate');
              setIsSelectSomeDate(false);
            }}
          >
            {Hook.formatDate(selectedDate)}
          </div>
        </div>

        <div className={styles.totalExpense}>
          <span>Total</span>&nbsp;
          {Hook.formatMoney(totalExpense)}
        </div>
      </div>
      {isSelectSomeDate && <p className={styles.guide}>날짜를 선택하세요</p>}
    </div>
  );
};
