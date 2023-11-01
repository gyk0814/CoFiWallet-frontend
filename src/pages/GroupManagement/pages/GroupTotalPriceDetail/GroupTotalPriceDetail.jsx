import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { GrFormDown } from 'react-icons/gr';
import { GROUP_CARD_TABS, formatDate } from '../../../../utils/constant';
import CalendarModal from '../../../../components/CalendarModal/CalendarModal';
import './GroupTotalPriceDetail.scss';

const GroupTotalPriceDetail = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formatDate);
  const navigate = useNavigate();

  const handleOpenCalendar = () => {
    setIsOpenCalendar(true);
  };

  const handleCloseCalendar = () => {
    setIsOpenCalendar(false);
  };

  const handleTabClick = id => {
    setActiveTabIndex(id);
  };

  return (
    <>
      <div className="groupTotalPriceContainer">
        <div className="totalPriceHeader">
          <div className="totalPriceTitleBox">
            <div className="headerTitleBox">
              <BiArrowBack
                size={20}
                className="arrowBack"
                onClick={() => navigate(-1)}
              />
              <h1 className="title">공동 지출 관리</h1>
            </div>
            <div className="headerDateBox">
              <div className="headerDate" onClick={handleOpenCalendar}>
                {selectedDate} <GrFormDown />
              </div>
            </div>
          </div>
          <div className="groupUser">
            {GROUP_CARD_TABS.map(tab => (
              <button
                key={tab.id}
                className={`groupTab ${
                  activeTabIndex === tab.id ? 'bold' : ''
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="totalPriceContainer">
          <div className="totalContentContainer">
            <div className="contentBox">
              <p>총 수입</p>
              <p>
                <b className="price">0</b>원
              </p>
            </div>
            <div className="importInfo">
              <h2 className="importHeader">마트/편의점</h2>
              <div className="importContent">
                <img
                  src="https://dagh2xqzh7jgv.cloudfront.net/cardbanklogo/lotteCard_PNG.png"
                  alt="사용처"
                  className="place"
                />
                <div className="priceInfo">
                  <p>(주)이마트24 MV의왕</p>
                  <span className="price">2,200원</span>
                </div>
                <img
                  src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7Jm92YqMxbfwC4Aez6Yc85ZODI5uaHR3KxUZnUlRtKSjBju2M"
                  alt="Profile"
                  className="profile"
                />
              </div>
            </div>
          </div>

          <div className="totalContentContainer">
            <div className="contentBox">
              <p>총 지출</p>
              <p>
                <b className="price">2,200</b>원
              </p>
            </div>
            <div className="paymentContainer">
              <div className="expenses">
                <div className="paymentHeader">
                  <p className="subTitle">정기 지출</p>
                  <p>
                    <b className="price">0</b>원
                  </p>
                </div>
                <div className="paymentInfo">
                  <h2 className="paymentSubHeader">마트/편의점</h2>
                  <div className="paymentContent">
                    <img
                      src="https://dagh2xqzh7jgv.cloudfront.net/cardbanklogo/lotteCard_PNG.png"
                      alt="사용처"
                      className="place"
                    />
                    <div className="priceInfo">
                      <p>(주)이마트24 MV의왕</p>
                      <span className="price">2,200원</span>
                    </div>
                    <img
                      src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7Jm92YqMxbfwC4Aez6Yc85ZODI5uaHR3KxUZnUlRtKSjBju2M"
                      alt="Profile"
                      className="profile"
                    />
                  </div>
                </div>
              </div>

              <div className="expenses">
                <div className="paymentHeader">
                  <p className="subTitle">변동 지출</p>
                  <p>
                    <b className="price">0</b>원
                  </p>
                </div>
                <div className="paymentInfo">
                  <h2 className="paymentSubHeader">마트/편의점</h2>
                  <div className="paymentContent">
                    <img
                      src="https://dagh2xqzh7jgv.cloudfront.net/cardbanklogo/lotteCard_PNG.png"
                      alt="사용처"
                      className="place"
                    />
                    <div className="priceInfo">
                      <p>(주)이마트24 MV의왕</p>
                      <span className="price">2,200원</span>
                    </div>
                    <img
                      src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7Jm92YqMxbfwC4Aez6Yc85ZODI5uaHR3KxUZnUlRtKSjBju2M"
                      alt="Profile"
                      className="profile"
                    />
                  </div>
                </div>
              </div>

              <div className="expenses">
                <div className="paymentHeader">
                  <p className="subTitle">할부 지출</p>
                  <p>
                    <b className="price">0</b>원
                  </p>
                </div>
                <div className="paymentInfo">
                  <h2 className="paymentSubHeader">마트/편의점</h2>
                  <div className="paymentContent">
                    <img
                      src="https://dagh2xqzh7jgv.cloudfront.net/cardbanklogo/lotteCard_PNG.png"
                      alt="사용처"
                      className="place"
                    />
                    <div className="priceInfo">
                      <p>(주)이마트24 MV의왕</p>
                      <span className="price">2,200원</span>
                    </div>
                    <img
                      src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7Jm92YqMxbfwC4Aez6Yc85ZODI5uaHR3KxUZnUlRtKSjBju2M"
                      alt="Profile"
                      className="profile"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default GroupTotalPriceDetail;
