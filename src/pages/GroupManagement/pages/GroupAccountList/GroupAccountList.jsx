import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useGetGroupAssets } from '../../../../hooks/api/group/useGetAccountList';
import Loading from '../../../../components/Loading/Loading';
import { formatPrice } from '../../../../utils/constant';
import './GroupAccountList.scss';

const GroupAccountList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const assets = searchParams.get('type');
  const memberIdParam = searchParams.get('memberId');
  const memberId = parseInt(memberIdParam);

  const [activeTab, setActiveTab] = useState('공동');
  const navigate = useNavigate();

  const { isLoading, data: accountList } = useGetGroupAssets(assets, memberId);

  const handleTabClick = (tabName, tabUserId) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (tabName === '공동') {
      setActiveTab('공동');
      newSearchParams.set('type', assets);
      newSearchParams.delete('memberId');
    } else {
      setActiveTab(tabName);
      newSearchParams.set('type', assets);
      newSearchParams.set('memberId', tabUserId);
    }

    setSearchParams(newSearchParams);
  };

  const totalRest = accountList
    ? accountList.info.reduce((sum, account) => sum + Number(account.total), 0)
    : 0;

  if (isLoading) return <Loading />;

  return (
    <div className="groupAccountListContainer">
      <div className="accountListHeader">
        <div className="accountListTitleBox">
          <BiArrowBack
            size={20}
            className="arrowBack"
            onClick={() => navigate('/group')}
          />
          <h1 className="title">계좌</h1>
        </div>
        <div className="groupUser">
          <button
            className={`groupTab ${activeTab === '공동' ? 'bold' : ''}`}
            onClick={() => handleTabClick('공동')}
          >
            공동
          </button>
          {accountList?.members.map(tab => (
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
      <div className="totalAccountPriceContainer">
        <div className="totalAccountPriceContentContainer">
          <div className="header">
            <p>잔고 합계</p>
            <p>
              <b className="price">{formatPrice(totalRest)}</b>원
            </p>
          </div>
          <div className="accountItemContainer">
            {accountList?.info.map((account, i) => (
              <div className="accountItemBox" key={i}>
                <div className="accontTitleHeader">
                  <p>{account.providerName}</p>
                  <p>
                    <b className="price">
                      {formatPrice(Number(account.total))}
                    </b>
                    원
                  </p>
                </div>
                {account.finances.map(finance => (
                  <div className="accountList" key={i}>
                    <img
                      src={account.providerImage}
                      alt="계좌"
                      className="accountImage"
                    />
                    <div className="accountTitleBox">
                      <p className="accountNumber">{finance.financeNumber}</p>
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

export default GroupAccountList;
