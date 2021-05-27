import React, {useState} from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ko from 'date-fns/locale/ko';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    width: 120,
    display: 'flex',
    flexDirection: 'row',
    border: '2px solid black',
    borderRadius: 20,
    marginTop: 12,
    marginBottom: 12,
  },
  datePickerButton: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  range: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
}));

const DatePickerComponentJustOne = ({setSpecificDate, specificDate}) => {
  registerLocale('ko', ko);
  const classes = useStyles();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const CustomInput = ({value, onClick}) => (
    <div className={classes.datePickerButton} onClick={onClick}>
      {value}
      {isCalendarOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
    </div>
  );

  const onCalendarOpen = () => {
    setIsCalendarOpen(true);
  };

  const onCalendarClose = () => {
    setIsCalendarOpen(false);
  };

  return (
    <>
      <div className={classes.container}>
        <div>
          <DatePicker
            locale="ko"
            selected={specificDate}
            selectsStart
            maxDate={new Date()}
            dateFormat="yyyy-MM-dd"
            onChange={date => setSpecificDate(date)}
            onCalendarOpen={onCalendarOpen}
            onCalendarClose={onCalendarClose}
            customInput={<CustomInput />}
          />
        </div>
      </div>
    </>
  );
};

export default DatePickerComponentJustOne;
