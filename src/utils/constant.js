import {
  LiaHomeSolid,
  LiaCoinsSolid,
  LiaUserFriendsSolid,
  LiaEllipsisHSolid,
} from 'react-icons/lia';
import { CiUser, CiLock } from 'react-icons/ci';

/** Phone number pattern for validation */
export const phoneNumberPattern = /^[0-9]{11}$/;

/** password pattern for validation */
export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{10,}/;

/** korean pattern for validation */
export const koreanPattern = /^[가-힣]{2,}$/;

/** Input objects in "Array" for Join user info Inputs */
export const JOIN_USER_INPUTS = [
  {
    id: 'userName',
    icon: <CiUser className="inputIcon" />,
    type: 'text',
    placeholder: '이름',
  },
  {
    id: 'password',
    icon: <CiLock className="inputIcon" />,
    type: 'password',
    placeholder: '비밀번호',
  },
  {
    id: 'passwordCheck',
    icon: <CiLock className="inputIcon" />,
    type: 'password',
    placeholder: '비밀번호 확인',
  },
];

/** Buttons objects in "Array" for Navigation bar */
export const NAVIGATION_BUTTONS = [
  {
    name: 'Ledger',
    path: '/main',
    icon: <LiaHomeSolid className="navIcons" />,
  },
  {
    name: 'Assets',
    path: '/main',
    icon: <LiaCoinsSolid className="navIcons" />,
  },
  {
    name: 'Group',
    path: '/group',
    icon: <LiaUserFriendsSolid className="navIcons" />,
  },
  {
    name: 'More',
    path: '/main',
    icon: <LiaEllipsisHSolid className="navIcons" />,
  },
];

/** Calendar data for Calendar Modal */
export const CALENDAR_MODAL_LIST = [
  { title: 'Oct 2023' },
  { title: 'Sep 2023' },
  { title: 'Aug 2023' },
  { title: 'Jul 2023' },
  { title: 'Jun 2023' },
  { title: 'May 2023' },
  { title: 'Apr 2023' },
  { title: 'Mar 2023' },
  { title: 'Feb 2023' },
  { title: 'Jan 2023' },
];

/** FormData headers */
export const config = {
  headers: { 'Content-Type': 'multipart/form-data' },
};

/** 데이터 GET 대비하여 만든 임시 데이터로 이후 제거할 것입니다. */
export const TEMPORARY_DATA = [
  {
    date: 'day: 11',
    totalAmount: '24,000KRW',
    breakdown: [
      {
        category: 'cafe',
        title: 'Starbucks',
        amount: '5,000',
        info: 'Toss Card',
      },
      {
        category: 'Dining',
        title: 'Apple bees',
        amount: '19,000',
        info: 'Hyundai Card',
      },
    ],
  },
  {
    date: 'day: 9',
    totalAmount: '16,450KRW',
    breakdown: [
      {
        category: 'Others',
        title: 'Apple Music',
        amount: '1,650',
        info: 'Toss Card',
      },
      {
        category: 'Transfer',
        title: 'Mark',
        amount: '9,900',
        info: 'Toss Bank',
      },
      {
        category: 'Transfer',
        title: 'Grace',
        amount: '4,900',
        info: 'Toss Bank',
      },
    ],
  },
];

/** 통신 전 임의 데이터 (삭제 예정) */
export const GROUP_CARD_TABS = [
  { id: 1, label: '공동' },
  { id: 2, label: '이연희' },
  { id: 3, label: '김판호' },
];
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
const d = new Date();
/** 날짜 포맷 (2023년 9월) */
export const formatDate = months[d.getMonth()] + ', ' + d.getFullYear();

/** 가격 3자리 끊기 */
export const formatPrice = price => price.toLocaleString();
