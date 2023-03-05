import { useRecoilState, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { ADate } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { DateCells } from './DateCells/DateCells';
import { CalendarArrow } from 'components/Icons';
import { Const, DateFn } from 'utils';
import styles from './Calendar.module.scss';

type CalendarType = {
  mini?: boolean;
  tabName: string;
};

export const Calendar = ({ mini, tabName }: CalendarType) => {
  const [currentMonth, setCurrentMonth] = useRecoilState(
    tabName === 'byDate'
      ? ADate.byDateSelectedDateState
      : ADate.addModalDateState
  );
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);

  return (
    <>
      <div
        className={classNames(styles.background, mini && styles.mini)}
        onClick={() => setToggleCalendar(tabName === 'add' ? 'add' : 'byDate')}
      ></div>

      <div className={classNames(styles.container, mini && styles.mini)}>
        <div className={classNames(styles.innerContainer, mini && styles.mini)}>
          <div className={classNames(styles.header, mini && styles.mini)}>
            <CalendarArrow
              direction='left'
              month={{ currentMonth, setCurrentMonth }}
            />

            <div className={classNames(styles.title, mini && styles.mini)}>
              {DateFn.format(currentMonth, 'yyyy')}년{' '}
              {DateFn.format(currentMonth, 'M')}월
            </div>

            <CalendarArrow
              direction='right'
              month={{ currentMonth, setCurrentMonth }}
            />
          </div>

          <div className={classNames(styles.days, mini && styles.mini)}>
            {Const.DAYS.map((day, id) => (
              <div key={id}>{day}</div>
            ))}
          </div>

          <DateCells currentMonth={currentMonth} tabName={tabName} />
        </div>
      </div>
    </>
  );
};
