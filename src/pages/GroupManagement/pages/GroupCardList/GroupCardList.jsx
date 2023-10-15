import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useGetGroupAssets } from '../../../../hooks/api/group/useGetAccountList';
import Loading from '../../../../components/Loading/Loading';
import { formatPrice } from '../../../../utils/constant';
import './GroupCardList.scss';

const GroupCardList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const assets = searchParams.get('type');
  const memberIdParam = searchParams.get('memberId');
  const memberId = parseInt(memberIdParam);

  const [activeTab, setActiveTab] = useState('공동');
  const navigate = useNavigate();

  const { isLoading, data: cardList } = useGetGroupAssets(assets, memberId);

  const handleTabClick = (tabName, tabUserId) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (tabName) {
      setActiveTab(tabName);
      newSearchParams.set('type', assets);
      newSearchParams.set('memberId', tabUserId);
    } else {
      setActiveTab('공동');
      newSearchParams.set('type', assets);
      newSearchParams.delete('memberId');
    }

    setSearchParams(newSearchParams);
  };

  const totalSpending = cardList
    ? cardList.info.reduce((sum, card) => sum + Number(card.total), 0)
    : 0;

  if (isLoading) return <Loading />;

  return (
    <div className="cardListContainer">
      <div className="cardListHeader">
        <div className="cardListTitleBox">
          <BiArrowBack
            size={20}
            className="arrowBack"
            onClick={() => navigate('/group')}
          />
          <h1 className="title">카드</h1>
        </div>
        <div className="groupUser">
          <button
            className={`groupTab ${activeTab === '공동' ? 'bold' : ''}`}
            onClick={() => handleTabClick('공동')}
          >
            공동
          </button>
          {cardList.members.map(tab => (
            <button
              key={tab.userId}
              className={`groupTab ${activeTab === tab.userName ? 'bold' : ''}`}
              onClick={() => handleTabClick(tab.userName, tab.userId)}
            >
              {tab.userName}
            </button>
          ))}
        </div>
      </div>
      <div className="totalCardPriceContainer">
        <div className="totalCardPriceContentContainer">
          <div className="header">
            <p>월 카드 이용료 합계</p>
            <p>
              <b className="price">{formatPrice(totalSpending)}</b>원
            </p>
          </div>
          <div className="cardItemContainer">
            {cardList.info.map((card, i) => (
              <div className="cardItemBox" key={i}>
                <div className="cardTitleHeader">
                  <p>{card.providerName}</p>
                  <p>
                    <b className="price">{formatPrice(Number(card.total))}</b>원
                  </p>
                </div>

                {card.finances.map((finance, i) => (
                  <div className="cardList" key={i}>
                    <img
                      src={card.providerImage}
                      alt="카드"
                      className="cardImage"
                    />
                    <div className="cardTitleBox">
                      <p className="cardNumber">{finance.financeNumber}</p>
                      <span className="price">
                        {formatPrice(finance.sum)}원
                      </span>
                    </div>
                    <img
                      src={finance.userProfile}
                      alt="프로필"
                      className="profile"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCardList;
