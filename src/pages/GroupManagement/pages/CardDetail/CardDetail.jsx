import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import CalendarModal from '../../../../components/CalendarModal/CalendarModal';
import { useGetGroupCardDetail } from '../../../../hooks/api/group/useGetCardDetail';
import Loading from '../../../../components/Loading/Loading';
import { formatPrice } from '../../../../utils/constant';
import './CardDetail.scss';

const CardDetail = () => {
  const navigate = useNavigate();
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const financeId = searchParams.get('financeId');
  const yearValue = searchParams.get('yearValue');
  const monthValue = searchParams.get('monthValue');

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year] = useState(new Date().getFullYear());

  const percentBar = Math.min(25, 100);
  const monthFormatted = month < 10 ? `0${month}` : month;

  const { data: spendingData, isLoading } = useGetGroupCardDetail(
    financeId,
    year,
    month,
  );

  useEffect(() => {
    setSearchParams({ financeId, yearValue, monthValue });
  }, [setSearchParams, financeId, yearValue, monthValue]);

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

  const groupedData = groupTransactionsByDay(spendingData.transactions);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="cardDetailContainer">
        <div className="cardDetailHeader">
          <div className="cardListTitleBox">
            <BiArrowBack
              size={20}
              className="arrowBack"
              onClick={() => navigate(-1)}
            />
            <h1 className="title" onClick={handleOpenCalendar}>
              <p>Year 2023 - {monthFormatted}</p>
              <IoIosArrowDown size={18} />
            </h1>
          </div>
          <div className="contentContainer">
            <div className="contentHeader">
              <p className="cardName">{spendingData.commonInfo.provider}</p>
              <p className="accountNumber">
                {spendingData.commonInfo.financeNumber}
              </p>
              <p className="price">
                {formatPrice(Number(spendingData.totalAmount))}KRW
              </p>
            </div>
            <div className="comparison">
              <div className="percentBar" style={{ width: `${percentBar}%` }} />
              <p className="percentText">{percentBar}%</p>
            </div>
            <div className="priceGoal">
              <p>Spending Goals</p>
              <p className="price">
                {formatPrice(Number(spendingData.totalAmount))}KRW &gt;
              </p>
            </div>
          </div>
        </div>

        {Object.keys(groupedData).map((day, index) => (
          <div className="cardUsingList" key={index}>
            <div className="header">
              <p>{day}</p>
              <p>{formatPrice(Number(spendingData?.transactions.amount))}KRW</p>
            </div>
            {groupedData[day].map((transaction, i) => (
              <div className="content" key={i}>
                <img
                  src={spendingData.commonInfo.categoryImage}
                  alt="Categories"
                  className="category"
                />
                <div className="detailContent">
                  <p className="title">{transaction.note}</p>
                  <p>{formatPrice(Number(transaction.amount))}KRW</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {isOpenCalendar && (
        <CalendarModal
          closeModal={handleCloseCalendar}
          onDateSelect={handleDateSelect}
        />
      )}
    </>
  );
};

const groupTransactionsByDay = transactions => {
  const groupedData = {};

  transactions.forEach(transaction => {
    const dayKey = ` ${transaction.tDay}일`;

    if (!groupedData[dayKey]) {
      groupedData[dayKey] = [];
    }

    groupedData[dayKey].push(transaction);
  });

  return groupedData;
};

export default CardDetail;
