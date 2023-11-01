import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack, BiPlus } from 'react-icons/bi';
import { GrFormDown } from 'react-icons/gr';
import { useSpendingData } from '../../../../hooks/api/breakdown/useSpendingData';
import Loading from '../../../../components/Loading/Loading';
import CalendarModal from '../../../../components/CalendarModal/CalendarModal';
import './SpendingDetail.scss';

const baseUrl = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem('accessToken');

const SpendingDetail = () => {
  const navigate = useNavigate();

  const [formattedData, setFormattedData] = useState([]);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const { spendingData, isError, isLoading, error } = useSpendingData(
    baseUrl,
    accessToken,
    month,
  );

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

  // const transformData = data => {
  //   const resultMap = new Map();

  //   data.forEach(item => {
  //     const { transactionDay, transactionNote, amount, imageUrl, financeNumber } =
  //       item;

  //     const breakdownItem = { transactionNote, amount, imageUrl, financeNumber };

  //     if (resultMap.has(transactionDay)) {
  //       resultMap.get(transactionDay).breakDown.push(breakdownItem);
  //     } else {
  //       resultMap.set(transactionDay, {
  //         transactionDay,
  //         breakDown: [breakdownItem],
  //       });
  //     }
  //   });

  //   return Array.from(resultMap.values());
  // };

  // console.log(transformData(spendingData));

  // useEffect(()=>{
  //   setFormattedData(transformData(spendingData))
  // },[spendingData])

  // if (isLoading) {
  //   return <Loading />;
  // }
  // if (isError) {
  //   console.log(error);
  // }
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <div className="spendingDetail">
      <header className="detailHeader">
        <BiArrowBack
          className="headerIcon"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="headerDate" onClick={handleOpenCalendar}>
          {months[month - 1]}, 2023 <GrFormDown />
        </div>
        <BiPlus className="headerIcon" />
      </header>

      <main className="detailMainContents">
        <section className="totalAmountSection">
          <p className="sectionTitle">Total Expenses</p>
          <h3 className="totalAmount">1,004,920KRW</h3>
        </section>
        <section className="breakdownSection">
          <p className="breakdownSummary">
            Total <span className="summaryNumber">8</span> items
          </p>
          {/* 아래 카드들은 컴포넌트로 분리 후 날짜별.map 안에 카드들.map 돌릴 수 있을 듯 */}
          <div className="cardsByDate">
            <div className="cardByDate">
              <div className="dateAndTotalAmount">
                <div className="cardDate">11th</div>
                <div className="cardTotalAmount">115,000KRW</div>
              </div>
              <div className="breakdownCards">
                <div className="breakdownCard">
                  <div className="cardLeft">
                    <div className="categoryImgBox">
                      <img
                        className="categoryImg"
                        src="https://dagh2xqzh7jgv.cloudfront.net/category/shopping_6.png"
                        alt="shopping"
                      />
                    </div>
                    <div className="breakdownInfo">
                      <p className="infoTitle">ZARA</p>
                      <h4 className="infoAmount">₩ 93,000</h4>
                    </div>
                  </div>
                  <div className="cardRight">
                    {' '}
                    BoA <br />
                    004-4747
                  </div>
                </div>
                <div className="breakdownCard">
                  <div className="cardLeft">
                    <div className="categoryImgBox">
                      <img
                        className="categoryImg"
                        src="https://dagh2xqzh7jgv.cloudfront.net/category/subScription_2.png"
                        alt="TossBank"
                      />
                    </div>
                    <div className="breakdownInfo">
                      <p className="infoTitle">NETFLIX</p>
                      <h4 className="infoAmount">₩ 8,000</h4>
                    </div>
                  </div>
                  <div className="cardRight">
                    {' '}
                    Chase <br /> 006-3233
                  </div>
                </div>
                <div className="breakdownCard">
                  <div className="cardLeft">
                    <div className="categoryImgBox">
                      <img
                        className="categoryImg"
                        src="https://dagh2xqzh7jgv.cloudfront.net/category/restaurant_4.png"
                        alt="dining"
                      />
                    </div>
                    <div className="breakdownInfo">
                      <p className="infoTitle">McDonald's</p>
                      <h4 className="infoAmount">₩ 14,000</h4>
                    </div>
                  </div>
                  <div className="cardRight">
                    {' '}
                    BoA <br />
                    004-4747
                  </div>
                </div>
              </div>
            </div>

            <div className="cardByDate">
              <div className="dateAndTotalAmount">
                <div className="cardDate">9th</div>
                <div className="cardTotalAmount">800,000KRW</div>
              </div>
              <div className="breakdownCards">
                <div className="breakdownCard">
                  <div className="cardLeft">
                    <div className="categoryImgBox">
                      <img
                        className="categoryImg"
                        src="https://dagh2xqzh7jgv.cloudfront.net/category/transfer_9.png"
                        alt="TossBank"
                      />
                    </div>
                    <div className="breakdownInfo">
                      <p className="infoTitle">Mark</p>
                      <h4 className="infoAmount">₩ 30,000</h4>
                    </div>
                  </div>
                  <div className="cardRight">
                    {' '}
                    Chase <br /> 006-3233
                  </div>
                </div>
                <div className="breakdownCard">
                  <div className="cardLeft">
                    <div className="categoryImgBox">
                      <img
                        className="categoryImg"
                        src="https://dagh2xqzh7jgv.cloudfront.net/category/shopping_6.png"
                        alt="TossBank"
                      />
                    </div>
                    <div className="breakdownInfo">
                      <p className="infoTitle">Apple</p>
                      <h4 className="infoAmount">₩ 770,000</h4>
                    </div>
                  </div>
                  <div className="cardRight">
                    Chase <br /> 006-3233
                  </div>
                </div>
              </div>
            </div>

            <div className="cardByDate">
              <div className="dateAndTotalAmount">
                <div className="cardDate">1st</div>
                <div className="cardTotalAmount">89,920KRW</div>
              </div>
              <div className="breakdownCards">
                <div className="breakdownCard">
                  <div className="cardLeft">
                    <div className="categoryImgBox">
                      <img
                        className="categoryImg"
                        src="https://dagh2xqzh7jgv.cloudfront.net/category/subScription_2.png"
                        alt="subscription"
                      />
                    </div>
                    <div className="breakdownInfo">
                      <p className="infoTitle">Spotify</p>
                      <h4 className="infoAmount">₩ 9,920</h4>
                    </div>
                  </div>
                  <div className="cardRight">
                    Chase <br /> 006-3233
                  </div>
                </div>
                <div className="breakdownCard">
                  <div className="cardLeft">
                    <div className="categoryImgBox">
                      <img
                        className="categoryImg"
                        src="https://dagh2xqzh7jgv.cloudfront.net/category/mart_3.png"
                        alt="grocery"
                      />
                    </div>
                    <div className="breakdownInfo">
                      <p className="infoTitle">Target</p>
                      <h4 className="infoAmount">₩ 50,000</h4>
                    </div>
                  </div>
                  <div className="cardRight">
                    {' '}
                    BoA <br />
                    004-4747
                  </div>
                </div>
                <div className="breakdownCard">
                  <div className="cardLeft">
                    <div className="categoryImgBox">
                      <img
                        className="categoryImg"
                        src="https://dagh2xqzh7jgv.cloudfront.net/category/restaurant_4.png"
                        alt="dining"
                      />
                    </div>
                    <div className="breakdownInfo">
                      <p className="infoTitle">Apple Bees</p>
                      <h4 className="infoAmount">₩ 30,000</h4>
                    </div>
                  </div>
                  <div className="cardRight">
                    {' '}
                    BoA <br />
                    004-4747
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 여기까지 */}
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

export default SpendingDetail;
