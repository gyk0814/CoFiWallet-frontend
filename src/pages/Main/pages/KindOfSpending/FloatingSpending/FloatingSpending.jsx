import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack, BiPlus } from 'react-icons/bi';
import { GrFormDown } from 'react-icons/gr';
import { TEMPORARY_DATA } from '../../../../../utils/constant';
import CalendarModal from '../../../../../components/CalendarModal/CalendarModal';
import './FloatingSpending.scss';

const FloatingSpending = () => {
  const navigate = useNavigate();

  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [dateClick, setDateClick] = useState(true);
  const [categoryClick, setCategoryClick] = useState(false);

  const handleDateClick = () => {
    setDateClick(true);
    setCategoryClick(false);
  };
  const handleCategoryClick = () => {
    setDateClick(false);
    setCategoryClick(true);
  };

  const handleOpenCalendar = () => {
    setIsOpenCalendar(true);
  };
  const handleCloseCalendar = () => {
    setIsOpenCalendar(false);
  };
  const handleDateSelect = date => {
    const selectedMonth = parseInt(date.split('년')[1].trim(), 10);
    setMonth(selectedMonth);
    handleCloseCalendar();
  };

  return (
    <div className="floatingSpending">
      <header className="detailHeader">
        <BiArrowBack
          className="headerIcon"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="headerDate" onClick={handleOpenCalendar}>
          2023년 {month}월 <GrFormDown />
        </div>
        <BiPlus className="headerIcon" />
      </header>

      <main className="mainContents">
        <section className="floatingSpendingSummary">
          <p className="title">총 변동지출</p>
          <h3 className="amount">
            <span>591,110</span>원
          </h3>
          <p className="scheduled">지출 예정 0원</p>
        </section>

        <section className="floatingSpendingBreakdownSection">
          <div className="categories">
            <button
              className={`categoryButton ${dateClick ? 'bold' : ''}`}
              onClick={handleDateClick}
            >
              일자
            </button>
            <button
              className={`categoryButton ${categoryClick ? 'bold' : ''}`}
              onClick={handleCategoryClick}
            >
              카테고리
            </button>
          </div>
          <div className="floatingSpendingBreakdown">
            {TEMPORARY_DATA.map((data, i) => (
              <div key={i} className="breakdownByCategory">
                <div className="dateAndAmount">
                  <h4 className="date">{data.date}</h4>
                  <h4 className="amount">{data.totalAmount}</h4>
                </div>
                {data.breakdown.map((breakdown, i) => (
                  <div key={i} className="breakdownCard">
                    <div className="cardLeft">
                      <img
                        className="bankImg"
                        src="https://wp-blog.toss.im/wp-content/uploads/2022/09/logo-toss-blue-1024x576.png"
                        alt={breakdown.category}
                      />
                      <div className="breakdownInfo">
                        <p className="infoTitle">{breakdown.title}</p>
                        <h4 className="infoAmount">{breakdown.amount}원</h4>
                      </div>
                    </div>
                    <div className="cardRight">{breakdown.info}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>
      {isOpenCalendar && (
        <CalendarModal
          closeModal={handleCloseCalendar}
          onDateSelect={handleDateSelect}
        />
      )}
    </div>
  );
};

export default FloatingSpending;
