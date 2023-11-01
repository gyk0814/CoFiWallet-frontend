import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack, BiPlus } from 'react-icons/bi';
import { GrFormDown } from 'react-icons/gr';
import { useIncomeData } from '../../../../hooks/api/breakdown/useIncomeData';
import Loading from '../../../../components/Loading/Loading';
import CalendarModal from '../../../../components/CalendarModal/CalendarModal';
import './IncomeDetail.scss';

// const newData = [
//   {
//     transactionDay: '1',
//     transactionNote: '이디야',
//     amount: '12,000',
//     imageUrl:
//       'https://dagh2xqzh7jgv.cloudfront.net/category/subScription_2.png',
//     financeNumber: '003-3883-8989-22',
//   },
//   {
//     transactionDay: '1',
//     transactionNote: '스타벅스',
//     amount: '17,000',
//     imageUrl:
//       'https://dagh2xqzh7jgv.cloudfront.net/category/subScription_2.png',
//     financeNumber: '003-3883-8989-22',
//   },
//   {
//     transactionDay: '2',
//     transactionNote: '홈플러스',
//     amount: '12,000',
//     imageUrl:
//       'https://dagh2xqzh7jgv.cloudfront.net/category/subScription_2.png',
//     financeNumber: '003-3883-8989-22',
//   },
//   {
//     transactionDay: '3',
//     transactionNote: 'gs24',
//     amount: '33,000',
//     imageUrl:
//       'https://dagh2xqzh7jgv.cloudfront.net/category/subScription_2.png',
//     financeNumber: '003-3883-8989-22',
//   },
//   {
//     transactionDay: '3',
//     transactionNote: '위코드',
//     amount: '120,000',
//     imageUrl:
//       'https://dagh2xqzh7jgv.cloudfront.net/category/subScription_2.png',
//     financeNumber: '003-3883-8989-22',
//   },
//   {
//     transactionDay: '3',
//     transactionNote: '위워크',
//     amount: '127,000',
//     imageUrl:
//       'https://dagh2xqzh7jgv.cloudfront.net/category/subScription_2.png',
//     financeNumber: '003-3883-8989-22',
//   },
// ];

const baseUrl = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem('accessToken');

const IncomeDetail = () => {
  const navigate = useNavigate();

  const [formattedData, setFormattedData] = useState([]);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const { incomeData, isError, isLoading, error } = useIncomeData(
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

  // console.log(transformData(incomeData));

  // useEffect(()=>{
  //   setFormattedData(transformData(incomeData))
  // },[incomeData])

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
    <>
      <div className="incomeDetail">
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
            <p className="sectionTitle">Total Income</p>
            <h3 className="totalAmount">4,154,718 KRW</h3>
          </section>
          <section className="breakdownSection">
            <p className="breakdownSummary">
              Total <span className="summaryNumber">7</span> itmes
            </p>
            {/* 아래 카드들은 컴포넌트로 분리 후 날짜별.map 안에 카드들.map 돌릴 수 있을 듯 */}
            <div className="cardsByDate">
              {/* {formattedData.map((elem, i) => (
                <div className="cardByDate" key={i}>
                  <div className="dateAndTotalAmount">
                  <div className="cardDate">{elem.transactionDay}</div>
                  <div className="cardTotalAmount">3,220,000원</div>
                </div>
                <div className="breakdownCards">
                  {elem.breakDown.map((breakdown,i)=>(
                    <div className="breakdownCard">
                    <div className="cardLeft">
                      <img
                        className="bankImg"
                        src="https://wp-blog.toss.im/wp-content/uploads/2022/09/logo-toss-blue-1024x576.png"
                        alt="토스뱅크"
                      />
                      <div className="breakdownInfo">
                        <p className="infoTitle">이인재</p>
                        <h4 className="infoAmount">220,000원</h4>
                      </div>
                    </div>
                    <div className="cardRight">토스뱅크 계좌</div>
                  </div>
                  ))}
                </div>
                </div>
              ))} */}
              <div className="cardByDate">
                <div className="dateAndTotalAmount">
                  <div className="cardDate">13th</div>
                  <div className="cardTotalAmount">3,220,000 KRW</div>
                </div>
                <div className="breakdownCards">
                  <div className="breakdownCard">
                    <div className="cardLeft">
                      <img
                        className="bankImg"
                        src="https://fairfaxcityconnected.com/wp-content/uploads/2020/06/Bank-of-America-logo.jpg"
                        alt="Bank of America"
                      />
                      <div className="breakdownInfo">
                        <p className="infoTitle">VENMO</p>
                        <h4 className="infoAmount">₩ 220,000</h4>
                      </div>
                    </div>
                    <div className="cardRight">
                      BoA <br />
                      004-4747
                    </div>
                  </div>
                  <div className="breakdownCard">
                    <div className="cardLeft">
                      <img
                        className="bankImg"
                        src="https://1000logos.net/wp-content/uploads/2021/05/Chase-logo.png"
                        alt="Chase Bank"
                      />
                      <div className="breakdownInfo">
                        <p className="infoTitle">Graceful Rain Co.</p>
                        <h4 className="infoAmount">₩ 3,000,000</h4>
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
                  <div className="cardDate">12th</div>
                  <div className="cardTotalAmount">434,718 KRW</div>
                </div>
                <div className="breakdownCards">
                  <div className="breakdownCard">
                    <div className="cardLeft">
                      <img
                        className="bankImg"
                        src="https://1000logos.net/wp-content/uploads/2021/05/Chase-logo.png"
                        alt="Chase Bank"
                      />
                      <div className="breakdownInfo">
                        <p className="infoTitle">MOUNT HOLYOKE CO. PAYROLL</p>
                        <h4 className="infoAmount">₩ 314,718</h4>
                      </div>
                    </div>
                    <div className="cardRight">
                      {' '}
                      Chase <br /> 006-3233
                    </div>
                  </div>
                  <div className="breakdownCard">
                    <div className="cardLeft">
                      <img
                        className="bankImg"
                        src="https://fairfaxcityconnected.com/wp-content/uploads/2020/06/Bank-of-America-logo.jpg"
                        alt="Bank of America"
                      />
                      <div className="breakdownInfo">
                        <p className="infoTitle">Mark</p>
                        <h4 className="infoAmount">₩ 40,000</h4>
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
                      <img
                        className="bankImg"
                        src="https://fairfaxcityconnected.com/wp-content/uploads/2020/06/Bank-of-America-logo.jpg"
                        alt="Bank of America"
                      />
                      <div className="breakdownInfo">
                        <p className="infoTitle">ZARA</p>
                        <h4 className="infoAmount">₩ 80,000</h4>
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
                  <div className="cardDate">1st</div>
                  <div className="cardTotalAmount">500,000 KRW</div>
                </div>
                <div className="breakdownCards">
                  <div className="breakdownCard">
                    <div className="cardLeft">
                      <img
                        className="bankImg"
                        src="https://fairfaxcityconnected.com/wp-content/uploads/2020/06/Bank-of-America-logo.jpg"
                        alt="Bank of America"
                      />
                      <div className="breakdownInfo">
                        <p className="infoTitle">CHECK #998</p>
                        <h4 className="infoAmount">₩ 300,000</h4>
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
                      <img
                        className="bankImg"
                        src="https://1000logos.net/wp-content/uploads/2021/05/Chase-logo.png"
                        alt="Chase Bank"
                      />
                      <div className="breakdownInfo">
                        <p className="infoTitle">YouTube</p>
                        <h4 className="infoAmount">₩ 200,000</h4>
                      </div>
                    </div>
                    <div className="cardRight">
                      {' '}
                      Chase <br /> 006-3233
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 여기까지 */}
          </section>
        </main>
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

export default IncomeDetail;
