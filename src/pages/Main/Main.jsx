import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineCaretDown } from 'react-icons/ai';
import {
  BiCalendar,
  BiSolidUserCircle,
  BiBell,
  BiBarChartAlt,
  BiRefresh,
} from 'react-icons/bi';
import useFinancialData from '../../hooks/api/mainPageUser/useFinancialData';
import CalendarModal from '../../components/CalendarModal/CalendarModal';
import MainPie from './components/MainPie';
import './Main.scss';
import { formatPrice } from '../../utils/constant';

const Main = () => {
  const navigate = useNavigate();

  const profileImage = localStorage.getItem('profileImage');
  const userName = localStorage.getItem('userName');
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [financialData, setFinancialData] = useState({
    amountsBycategories: [],
    expensesAmountByThreeCategories: [],
  });

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const {
    depositsAmount,
    expensesAmount,
    expectedExpenseAmounts,
    monthlyExpenseAmounts,
    variableExpenseAmounts,
    amountsBycategories,
  } = financialData;

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('profileImage');
    navigate('/login');
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

  const { data, error, refetch } = useFinancialData(month);
  console.log(data, 'error: ', error);

  useEffect(() => {
    if (data) {
      setFinancialData(data);
    }
    if (error) {
      console.error(`ERROR : ${error.message}`);
    }
  }, [data, error]);

  const handleDataUpdate = () => {
    refetch();
  };

  if (
    depositsAmount == '0' &&
    expensesAmount == '0' &&
    monthlyExpenseAmounts == '0' &&
    expectedExpenseAmounts == '0' &&
    variableExpenseAmounts == '0' &&
    amountsBycategories.length == 0
  ) {
    return (
      <div className="main">
        <header className="mainTopBar">
          <div className="userProfile">
            {profileImage === 'null' ? (
              <BiSolidUserCircle
                className="userProfileImage "
                onClick={() => {
                  navigate('/my-page');
                }}
              />
            ) : (
              <img
                src={profileImage}
                className="userProfileImage isNotNull"
                alt="Profile"
                onClick={() => {
                  navigate('/my-page');
                }}
              />
            )}
            Hi, {userName}{' '}
            <span className="logoutButton" onClick={handleLogout}>
              Sign Out
            </span>
          </div>
          <BiBell className="bell" />
        </header>
        <main className="mainContents noData">
          <div className="recommendationMessage">
            <h3>Connect Accounts and Cards,</h3>
            <h3>Start Managing Your Assets</h3>
          </div>
          <AiOutlineCaretDown className="arrowDown" />
          <div
            className="assetConnection"
            onClick={() => {
              navigate('/asset-connection');
            }}
          >
            <p className="buttonTitle">Import Accounts and Cards Data</p>
            <AiOutlinePlus />
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="main">
      <header className="mainTopBar">
        <div className="userProfile">
          {profileImage === 'null' ? (
            <BiSolidUserCircle
              className="userProfileImage"
              onClick={() => {
                navigate('/my-page');
              }}
            />
          ) : (
            <img
              src={profileImage}
              className="userProfileImage isNotNull"
              alt="Profile"
              onClick={() => {
                navigate('/my-page');
              }}
            />
          )}
          Hi, {userName}
          <span className="logoutButton" onClick={handleLogout}>
            Sign Out
          </span>
        </div>
        <BiBell className="bell" />
      </header>

      <main className="mainContents">
        <div className=" monthDiv">
          <div className="monthDivLeft">
            <h1 className="monthTitle"> {months[month - 1]}</h1>
            <BiCalendar className="calendarIcon" onClick={handleOpenCalendar} />
          </div>
          <div className="dataUpdateButton" onClick={handleDataUpdate}>
            <p className="updatedAt" />
            <h5 className="updateTitle">Update</h5>
            <BiRefresh className="refreshIcon" />
          </div>
        </div>

        <div
          className="reportDiv"
          onClick={() => {
            navigate('/main/my-report');
          }}
        >
          <h3 className="reportTitle">Reports</h3>
          <p className="reportMessage">
            Try setting a budget
            <span>
              <BiBarChartAlt className="chartIcon" />
            </span>
          </p>
        </div>

        <div className="transactionDiv">
          <div
            className="transactionBox income"
            onClick={() => {
              navigate('/main/income');
            }}
          >
            <h2 className="transactionCategory">Total Income</h2>
            <h3 className="transactionAmount">
              {formatPrice(Number(depositsAmount))} KRW
            </h3>
          </div>
          <div
            className="transactionBox spending"
            onClick={() => {
              navigate('/main/spending');
            }}
          >
            <h2 className="transactionCategory">Total Expense</h2>
            <h3 className="transactionAmount">
              {formatPrice(Number(expensesAmount) * -1)} KRW
            </h3>
          </div>
        </div>

        <div
          className="mySpendings"
          onClick={() => {
            navigate('/main/regular-spending');
          }}
        >
          <h3 className="myTitle">Regular Spending</h3>
          <ul className="myList">
            <li className="listItem">
              <span className="listTitle">Upcoming</span>
              <span className="amount">
                ₩{' '}
                {Number(expectedExpenseAmounts) > 0
                  ? formatPrice(Number(expectedExpenseAmounts) * -1)
                  : 0}{' '}
              </span>
            </li>
            <li className="listItem">
              <span className="listTitle">Completed</span>
              <span className="amount">
                ₩ {formatPrice(Number(monthlyExpenseAmounts) * -1)}
              </span>
            </li>
          </ul>
        </div>
        <div
          className="mySpendings"
          onClick={() => {
            navigate('/main/floating-spending');
          }}
        >
          <h3 className="myTitle">Variable Spending</h3>
          <ul className="myList">
            <li className="listItem">
              <span className="listTitle">Expense Budget</span>
              <span className="amount">₩ 1,000,000</span>
            </li>
            <li className="listItem">
              <span className="listTitle">Expenses</span>
              <span className="amount">
                ₩ {formatPrice(Number(variableExpenseAmounts) * -1)}
              </span>
            </li>
          </ul>
        </div>
        <div
          className="mySpendings"
          onClick={() => {
            navigate('/main/installment-spending');
          }}
        >
          <h3 className="myTitle">Installment Spending</h3>
          <ul className="myList">
            <li className="listItem">
              <span className="listTitle">Upcoming </span>
              <span className="amount">₩ 350,000</span>
            </li>
            <li className="listItem">
              <span className="listTitle">Completed</span>
              <span className="amount">₩ 0</span>
            </li>
          </ul>
        </div>

        <div className="donutChartDiv">
          <h3 className="chartTitle">Expenses By Category</h3>
          <div className="donutChart">
            <MainPie data={amountsBycategories} />
          </div>
          {amountsBycategories.map(
            ({ id, label, value }, i) =>
              i < 3 && (
                <div className="chartCategory" key={id}>
                  <p>{label}</p>
                  <p>₩ {formatPrice(Number(value))}</p>
                </div>
              ),
          )}
        </div>

        <div
          className="assetConnection"
          onClick={() => {
            navigate('/asset-connection');
          }}
        >
          <p className="buttonTitle">Connect Accounts and Cards Data</p>
          <AiOutlinePlus className="assetConnectionPlusIcon" />
        </div>
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

export default Main;
