import { useRecoilState, useSetRecoilState } from 'recoil';
import { DateFn } from 'utils';
import { AMain } from 'recoil/atom';
import { SDate, SOpen } from 'recoil/selector';
import { TMain } from 'types';
import styles from './DateCells.module.scss';

type DateCellType = {
  currentMonth: Date;
};

export const DateCells = ({ currentMonth }: DateCellType) => {
  const [expenseTransaction, setExpenseTransaction] =
    useRecoilState<TMain.TransactionType>(AMain.transactionState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);
  const setSelectedDate = useSetRecoilState(SDate.selectedMiniDateSelector);

  const monthStart = DateFn.startOfMonth(currentMonth);
  const monthEnd = DateFn.endOfMonth(currentMonth);
  const startDate = DateFn.startOfWeek(monthStart);
  const endDate = DateFn.endOfWeek(monthEnd);

  const rows: JSX.Element[] = [];
  let dates: JSX.Element[] = [];
  let date = startDate;
  let formatDate = '';

  while (date <= endDate) {
    for (let i = 0; i < 7; i++) {
      formatDate = DateFn.format(date, 'd');
      const cloneDay = date;

      dates.push(
        <div
          className={styles.date}
          key={date.toString()}
          onClick={() => {
            setSelectedDate(() => cloneDay);

            setExpenseTransaction({
              ...expenseTransaction,
              date: cloneDay,
            });

            setToggleCalendar('byDate');
          }}
        >
          <span
            className={
              !DateFn.isSameMonth(date, monthStart)
                ? styles.disabled
                : DateFn.isSameDay(date, new Date())
                ? styles.today
                : DateFn.isSameDay(date, currentMonth)
                ? styles.current
                : ''
            }
          >
            {formatDate}
          </span>
        </div>
      );

      date = DateFn.addDays(date, 1);
    }

    rows.push(
      <div id={date.toString()} key={date.toString()} className={styles.week}>
        {dates}
      </div>
    );

    dates = [];
  }

  return <div className={styles.month}>{rows}</div>;
};
