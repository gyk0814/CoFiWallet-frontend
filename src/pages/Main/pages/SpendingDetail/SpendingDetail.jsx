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
          2023년 {month}월 <GrFormDown />
        </div>
        <BiPlus className="headerIcon" />
      </header>

      <main className="detailMainContents">
        <section className="totalAmountSection">
          <p className="sectionTitle">총 지출</p>
          <h3 className="totalAmount">889,920 원</h3>
        </section>
        <section className="breakdownSection">
          <p className="breakdownSummary">
            총 <span className="summaryNumber">3</span> 건
          </p>
          {/* 아래 카드들은 컴포넌트로 분리 후 날짜별.map 안에 카드들.map 돌릴 수 있을 듯 */}
          <div className="cardsByDate">
            <div className="cardByDate">
              <div className="dateAndTotalAmount">
                <div className="cardDate">9일</div>
                <div className="cardTotalAmount">800,000원</div>
              </div>
              <div className="breakdownCards">
                <div className="breakdownCard">
                  <div className="cardLeft">
                    <img
                      className="bankImg"
                      src="https://wp-blog.toss.im/wp-content/uploads/2022/09/logo-toss-blue-1024x576.png"
                      alt="토스뱅크"
                    />
                    <div className="breakdownInfo">
                      <p className="infoTitle">이인재</p>
                      <h4 className="infoAmount">30,000원</h4>
                    </div>
                  </div>
                  <div className="cardRight">토스뱅크 계좌</div>
                </div>
                <div className="breakdownCard">
                  <div className="cardLeft">
                    <img
                      className="bankImg"
                      src="https://wp-blog.toss.im/wp-content/uploads/2022/09/logo-toss-blue-1024x576.png"
                      alt="토스뱅크"
                    />
                    <div className="breakdownInfo">
                      <p className="infoTitle">(주)삼성전자</p>
                      <h4 className="infoAmount">770,000원</h4>
                    </div>
                  </div>
                  <div className="cardRight">토스뱅크 계좌</div>
                </div>
              </div>
            </div>

            <div className="cardByDate">
              <div className="dateAndTotalAmount">
                <div className="cardDate">1일</div>
                <div className="cardTotalAmount">89,920원</div>
              </div>
              <div className="breakdownCards">
                <div className="breakdownCard">
                  <div className="cardLeft">
                    <img
                      className="bankImg"
                      src="https://wp-blog.toss.im/wp-content/uploads/2022/09/logo-toss-blue-1024x576.png"
                      alt="토스뱅크"
                    />
                    <div className="breakdownInfo">
                      <p className="infoTitle">김만규</p>
                      <h4 className="infoAmount">9,920원</h4>
                    </div>
                  </div>
                  <div className="cardRight">토스뱅크 계좌</div>
                </div>
                <div className="breakdownCard">
                  <div className="cardLeft">
                    <img
                      className="bankImg"
                      src="https://wp-blog.toss.im/wp-content/uploads/2022/09/logo-toss-blue-1024x576.png"
                      alt="토스뱅크"
                    />
                    <div className="breakdownInfo">
                      <p className="infoTitle">김민재</p>
                      <h4 className="infoAmount">50,000원</h4>
                    </div>
                  </div>
                  <div className="cardRight">토스뱅크 계좌</div>
                </div>
                <div className="breakdownCard">
                  <div className="cardLeft">
                    <img
                      className="bankImg"
                      src="https://wp-blog.toss.im/wp-content/uploads/2022/09/logo-toss-blue-1024x576.png"
                      alt="토스뱅크"
                    />
                    <div className="breakdownInfo">
                      <p className="infoTitle">최지준</p>
                      <h4 className="infoAmount">30,000원</h4>
                    </div>
                  </div>
                  <div className="cardRight">토스뱅크 계좌</div>
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
