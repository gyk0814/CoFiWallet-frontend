import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useGetGroupAssetDetail } from '../../../../hooks/api/group/useGetDetail';
import Loading from '../../../../components/Loading/Loading';
import { formatPrice } from '../../../../utils/constant';
import './AccountDetail.scss';

const AccountDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const financeId = searchParams.get('financeId');

  const { isLoading, data: detail } = useGetGroupAssetDetail(financeId);

  if (isLoading) return <Loading />;

  const groupedData = groupTransactionsByMonth(detail.transactions);

  return (
    <div className="accountDetailContainer">
      <div className="accountDetailHeader">
        <div className="accountListTitleBox">
          <BiArrowBack
            size={20}
            className="arrowBack"
            onClick={() => navigate(-1)}
          />
          <h1 className="title">상세정보</h1>
        </div>
      </div>

      <div className="accountDetailInfo">
        <div className="header">
          <img
            src={detail.commonInfo.providerImage}
            alt="카드"
            className="accountImage"
          />
          <p className="title">{detail.commonInfo.provider}</p>
        </div>
        <div className="summaryInfo">
          <p className="accountNumber">{detail.commonInfo.financeNumber}</p>
          <div className="priceBox">
            <p className="price">{formatPrice(Number(detail.totalAmount))}원</p>
            <span className="priceInfo">
              (출금가능액 : {formatPrice(Number(detail.totalAmount))}원)
            </span>
          </div>
        </div>
      </div>

      {Object.keys(groupedData).map((month, index) => (
        <div className="accountDetailContainer" key={index}>
          <p className="title">{month}</p>
          {groupedData[month].map((transaction, i) => (
            <div className="accountDetailContent" key={i}>
              <div className="header">
                <p>
                  {transaction.tYear}/{transaction.tMonth}/{transaction.tDay}
                </p>
                <p>체크카드결</p>
              </div>
              <div className="body">
                <p>{transaction.note}</p>
                <p>{formatPrice(Number(transaction.amount))}원</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const groupTransactionsByMonth = transactions => {
  const groupedData = {};

  transactions.forEach(transaction => {
    const monthKey = `${transaction.tYear}년 ${transaction.tMonth}월`;

    if (!groupedData[monthKey]) {
      groupedData[monthKey] = [];
    }

    groupedData[monthKey].push(transaction);
  });

  return groupedData;
};

export default AccountDetail;
