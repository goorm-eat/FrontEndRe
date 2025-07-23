import { Button } from '@vapor-ui/core';
import catIcon from '../img/groupCat.svg';
import lTree from '../img/lTree.svg';
import rTree from '../img/rTree.svg';
import jejuLogo from '../img/jejuLogo.svg';
import grass from '../img/grass.svg';
import bottomCloud from '../img/cloudGroup.svg';
import cloud from '../img/cloud.svg';

// import { useState } from 'react';
// import instance from '../utils/baseInstance';

export default function Login() {
  //   const [userId, setUserId] = useState('');
  //   const [password, setPassword] = useState('');

  //   const setCookie = (name, value, days) => {
  //     const expires = new Date(Date.now() + days * 864e5).toUTCString();
  //     document.cookie = `${name}=${value}; path=/; expires=${expires}; Secure; SameSite=Strict`;
  //   };

  //   const handleLogin = async () => {
  //     console.log(userId);
  //     console.log(password);
  //     try {
  //       const res = await instance.post('/api/login', null, {
  //         params: {
  //           id: userId,
  //           pass: password,
  //         },
  //       });

  //       const { accessToken, refreshToken } = res.data;

  //       // 쿠키에 토큰 저장
  //       setCookie('accessToken', accessToken, 1); // 1일 유지
  //       setCookie('refreshToken', refreshToken, 7); // 7일 유지

  //       // 이동
  //       window.location.href = '/home';
  //     } catch (err) {
  //       console.error('로그인 실패:', err);
  //       //window.location.href = '/home';
  //     }
  //   };

  const handleClick = () => {
    window.location.href = '/home';
  };

  return (
    <div className="w-full h-screen bg-[#B6E3FF] relative overflow-hidden">
      {/* 배경 요소 */}
      <div className="absolute bottom-[10rem] w-full h-[10rem] rounded-t-full bg-[#31AC00] z-4">
        <img src={lTree} className="absolute left-2  bottom-[7rem]" />
        <img src={rTree} className="absolute right-2  bottom-[6rem]" />
        <img
          src={catIcon}
          className="absolute left-1/2 transform -translate-x-1/2 bottom-[8rem]"
        />
        <img
          src={jejuLogo}
          className="absolute left-1/2 transform -translate-x-1/2 bottom-[17rem]"
        />
        <img src={grass} className="absolute right-[7rem] bottom-[6rem]" />
        <img src={grass} className="absolute left-[7rem] bottom-[5.8rem]" />
        <img src={grass} className="absolute right-[4rem] bottom-[4rem]" />
        <img src={grass} className="absolute left-[4rem] bottom-[4rem]" />
        <img
          src={bottomCloud}
          className="absolute bottom-[13rem] left-1/2 transform -translate-x-1/2"
        />
        <img src={cloud} className="absolute bottom-[30rem] left-[4rem]" />
        <img src={cloud} className="absolute bottom-[29rem] right-[4rem]" />
        <img src={cloud} className="absolute bottom-[22rem] left-[3rem]" />
        <img src={cloud} className="absolute bottom-[22rem] right-[2rem]" />
        <img src={cloud} className="absolute bottom-[26rem] right-[10rem]" />
      </div>
      {/* 언덕 */}
      <div className="absolute bottom-0 w-full h-[10rem] bg-gradient-to-b from-[#31AC00] to-[#216600] z-10" />
      <Button
        color="primary"
        className="rounded-md fixed bottom-[1.5rem] left-1/2 transform -translate-x-1/2 pr-[1rem] pl-[0.5rem] h-[3rem] w-full max-w-[21.4375rem] z-20"
        onClick={() => {
          handleClick();
        }}
      >
        냠냠단 체험해보기
      </Button>
      ;
    </div>
  );
}

{
  /* 로그인 박스 */
}
{
  /* <div className="absolute bottom-[1rem] left-1/2 transform -translate-x-1/2 w-[85%] max-w-[320px] bg-white rounded-lg shadow-lg p-6 z-20">
  <input
    type="text"
    placeholder="아이디"
    value={userId}
    onChange={e => setUserId(e.target.value)}
    className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
  />
  <input
    type="password"
    placeholder="비밀번호"
    value={password}
    onChange={e => setPassword(e.target.value)}
    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
  />
  <Button
    onClick={handleLogin}
    className="w-full h-[2.75rem] bg-[#03C75A] text-white font-semibold rounded-md"
  >
    로그인
  </Button>
</div>; */
}
