import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack, BiPlus } from 'react-icons/bi';
import { GrFormDown, GrFormPrevious, GrFormNext } from 'react-icons/gr';
import CalendarModal from '../../../../components/CalendarModal/CalendarModal';
import { formatDate } from '../../../../utils/constant';
import Chart from '../../components/Chart';
import './MyReport.scss';

const MyReport = () => {
  const navigate = useNavigate();
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formatDate);
  const [monthData, setMonthData] = useState([
    {
      month: 'Jan',
      income: 90,
      expense: 20,
    },
    {
      month: 'Feb',
      income: 90,
      expense: 70,
    },
    {
      month: 'Mar',
      income: 10,
      expense: 90,
    },
    {
      month: 'Apr',
      income: 200,
      expense: 100,
    },
    {
      month: 'May',
      income: 30,
      expense: 90,
    },
    {
      month: 'Jun',
      income: 20,
      expense: 110,
    },
    {
      month: 'Jul',
      income: 100,
      expense: 60,
    },
    {
      month: 'Aug',
      income: 380,
      expense: 10,
    },
    {
      month: 'Sep',
      income: 200,
      expense: 30,
    },
    {
      month: 'Oct',
      income: 90,
      expense: 100,
    },
    {
      month: 'Nov',
      income: 490,
      expense: 130,
    },
    {
      month: 'Dec',
      income: 280,
      expense: 160,
    },
  ]);

  const [expenseDataRange, setExpenseDataRange] = useState({
    start: 0,
    end: 4,
  });

  const [gapDataRange, setGapDataRange] = useState({
    start: 0,
    end: 4,
  });

  const isPrevExpenseButtonDisabled = expenseDataRange.start === 0;
  const isNextExpenseButtonDisabled =
    expenseDataRange.end >= monthData.length - 1;

  const isPrevGapButtonDisabled = gapDataRange.start === 0;
  const isNextGapButtonDisabled = gapDataRange.end >= monthData.length - 1;

  const percentBar = Math.min(12, 100);

  const handleOpenCalendar = () => {
    setIsOpenCalendar(true);
  };

  const handleCloseCalendar = () => {
    setIsOpenCalendar(false);
  };

  const handleExpenseArrowClick = direction => {
    if (direction === 'next' && !isNextExpenseButtonDisabled) {
      const newStart = expenseDataRange.start + 4;
      const newEnd = expenseDataRange.end + 4;
      setExpenseDataRange({ start: newStart, end: newEnd });
      // TODO: 다음 5달 데이터 가져오는 비동기 로직을 처리
    } else if (direction === 'prev' && !isPrevExpenseButtonDisabled) {
      const newStart = expenseDataRange.start - 4;
      const newEnd = expenseDataRange.end - 4;
      setExpenseDataRange({ start: newStart, end: newEnd });
      // TODO: 이전 5달 데이터 가져오는 비동기 로직을 처리
    }
  };

  const handleGapArrowClick = direction => {
    if (direction === 'next' && !isNextGapButtonDisabled) {
      const newStart = gapDataRange.start + 4;
      const newEnd = gapDataRange.end + 4;
      setGapDataRange({ start: newStart, end: newEnd });
      // TODO: 다음 5달 데이터 가져오는 비동기 로직을 처리
    } else if (direction === 'prev' && !isPrevGapButtonDisabled) {
      const newStart = gapDataRange.start - 4;
      const newEnd = gapDataRange.end - 4;
      setGapDataRange({ start: newStart, end: newEnd });
      // TODO: 이전 5달 데이터 가져오는 비동기 로직을 처리
    }
  };

  const currentExpenseVisibleData = monthData
    .slice(expenseDataRange.start, expenseDataRange.end + 1)
    .slice(0, 4);

  const currentGapVisibleData = monthData
    .slice(gapDataRange.start, gapDataRange.end + 1)
    .slice(0, 4);

  const expenseData = currentExpenseVisibleData.map(data => ({
    month: data.month,
    value: data.expense,
  }));

  const gapData = currentGapVisibleData.map(data => ({
    month: data.month,
    value: data.income - data.expense,
  }));

  return (
    <>
      <div className="myReport">
        <header className="detailHeader">
          <BiArrowBack
            className="headerIcon"
            onClick={() => {
              navigate(-1);
            }}
          />
          <div className="headerDate" onClick={handleOpenCalendar}>
            {selectedDate} <GrFormDown />
          </div>
          <BiPlus className="headerPlus" />
        </header>

        <main className="reportMain">
          <section className="reportSummary">
            <div className="summaryMessageBox">
              <h1 className="summaryMessage">
                Hi Young, Compared to last month,
              </h1>
              <h1 className="summaryMessage">
                <span className="messageHighlight">
                  you spent 654,488 KRW less.
                </span>
              </h1>
            </div>
            <div className="comparison">
              <div className="percentBar" style={{ width: `${percentBar}%` }} />
              <p className="percentText">{percentBar}%</p>
            </div>
            <div className="lastMonthSpending">
              <h3>Last Month's Expenses</h3>
              <h3>743,948KRW</h3>
            </div>
          </section>

          <section className="spendingReport">
            <div className="totalSpending">
              <h4 className="totalSpendingTitle">Expenses</h4>
              <h4 className="totalSpendingAmount">89,460KRW</h4>
            </div>
            <div className="kindOfSpending">
              <p className="titleByKind">Regular Expenses</p>
              <h5 className="amountByKind">0KRW</h5>
            </div>
            <div className="kindOfSpending">
              <p className="titleByKind">Installment Spending</p>
              <h5 className="amountByKind">0 KRW</h5>
            </div>
            <div className="kindOfSpending">
              <p className="titleByKind">Variable Spending</p>
              <h5 className="amountByKind">89,460 KRW</h5>
            </div>
            <button className="budgetingButton">Set Expense Budget</button>
          </section>

          <section className="spendingTrends">
            <div className="spendingTitle">
              <h4>Expense Trend</h4>
              <p>(Unit: 10K KRW)</p>
            </div>
            <div className="spendingGraph">
              <Chart monthData={expenseData} />
            </div>
            <div className="rangeOfDate">
              <GrFormPrevious
                className="rangeOfDateButton"
                onClick={() => handleExpenseArrowClick('prev')}
              />
              {`Year 2023 ${currentExpenseVisibleData[0]?.month} - ${
                currentExpenseVisibleData[currentExpenseVisibleData.length - 1]
                  ?.month
              }`}
              <GrFormNext
                className="rangeOfDateButton"
                onClick={() => handleExpenseArrowClick('next')}
              />
            </div>
          </section>

          <section className="incomeReport">
            <div className="incomeInfo">
              <h3>Incomes</h3>
              <h3>14,718KRW</h3>
            </div>
            <div className="incomeInfo">
              <h3>Income-Expense</h3>
              <h3>-74,742KRW</h3>
            </div>
          </section>

          <section className="incomeGraph">
            <div className="incomeGraphSummary">
              <h1 className="summaryMessage">{`From ${
                currentGapVisibleData[0]?.month
              } to ${
                currentGapVisibleData[currentGapVisibleData.length - 1]?.month
              }`}</h1>
              <h1 className="summaryMessage">
                <span className="messageHighlight">
                  Your remaining balance{' '}
                </span>
                is -310k KRW.
              </h1>
            </div>
            <div className="spendingGraph">
              <Chart monthData={gapData} />
            </div>
            <div className="rangeOfDate">
              <GrFormPrevious
                className="rangeOfDateButton"
                onClick={() => handleGapArrowClick('prev')}
              />
              {`Year 2023 ${currentGapVisibleData[0]?.month} - ${
                currentGapVisibleData[currentGapVisibleData.length - 1]?.month
              }`}
              <GrFormNext
                className="rangeOfDateButton"
                onClick={() => handleGapArrowClick('next')}
              />
            </div>
          </section>
        </main>
      </div>
      {isOpenCalendar && (
        <CalendarModal
          closeModal={handleCloseCalendar}
          onDateSelect={newDate => setSelectedDate(newDate)}
        />
      )}
    </>
  );
};

export default MyReport;
