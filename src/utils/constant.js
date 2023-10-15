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
    name: '가계부',
    path: '/main',
    icon: <LiaHomeSolid className="navIcons" />,
  },
  {
    name: '자산',
    path: '/main',
    icon: <LiaCoinsSolid className="navIcons" />,
  },
  {
    name: '공동관리',
    path: '/group',
    icon: <LiaUserFriendsSolid className="navIcons" />,
  },
  {
    name: '더보기',
    path: '/main',
    icon: <LiaEllipsisHSolid className="navIcons" />,
  },
];

/** Calendar data for Calendar Modal */
export const CALENDAR_MODAL_LIST = [
  { title: '2023년 9월' },
  { title: '2023년 8월' },
  { title: '2023년 7월' },
  { title: '2023년 6월' },
  { title: '2023년 5월' },
  { title: '2023년 4월' },
  { title: '2023년 3월' },
  { title: '2023년 2월' },
  { title: '2023년 1월' },
];

/** FormData headers */
export const config = {
  headers: { 'Content-Type': 'multipart/form-data' },
};

/** 데이터 GET 대비하여 만든 임시 데이터로 이후 제거할 것입니다. */
export const TEMPORARY_DATA = [
  {
    date: '11일',
    totalAmount: '24,000원',
    breakdown: [
      {
        category: '카페/간식',
        title: '이디야',
        amount: '5,000',
        info: '토스뱅크카드',
      },
      {
        category: '외식',
        title: '애슐리',
        amount: '19,000',
        info: '현대카드',
      },
    ],
  },
  {
    date: '9일',
    totalAmount: '16,450원',
    breakdown: [
      {
        category: '기타',
        title: '다트쉐어링',
        amount: '1,650',
        info: '토스뱅크카드',
      },
      {
        category: '이체',
        title: '이인재',
        amount: '9,900',
        info: '토스뱅크계좌',
      },
      {
        category: '이체',
        title: '김만규',
        amount: '4,900',
        info: '토스뱅크계좌',
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

/** 날짜 포맷 (2023년 9월) */
export const formatDate =
  new Date().getFullYear() + '년 ' + (new Date().getMonth() + 1) + '월';

/** 가격 3자리 끊기 */
export const formatPrice = price => price.toLocaleString();
