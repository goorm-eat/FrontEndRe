// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { instance } from '../hooks/api.js';

// // Context 생성
// const PostContext = createContext(undefined);

// // PostProvider 컴포넌트
// export const PostProvider = ({ children }) => {
//   const [postList, setPostList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // API에서 포스트 리스트를 가져오는 함수
//   const fetchPostList = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await instance.get('/main/postlist');
//       const data = response.data || {};
//       const posts = data.posts || [];
//       setPostList(posts);
//       return posts;
//     } catch (error) {
//       console.error('Error fetching post list:', error);
//       setError(error);
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 사용자가 참여한 모집글을 필터링하는 함수
//   const getJoinedRecruitments = (userJoinedIds = []) => {
//     return postList.filter(item => userJoinedIds.includes(item.id));
//   };

//   // 사용자가 참여하지 않은 모집글을 필터링하는 함수
//   const getAvailableRecruitments = (userJoinedIds = []) => {
//     return postList.filter(item => !userJoinedIds.includes(item.id));
//   };

//   const value = {
//     postList,
//     loading,
//     error,
//     fetchPostList,
//     getJoinedRecruitments,
//     getAvailableRecruitments,
//   };

//   return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
// };

// // Context를 사용하는 커스텀 훅
// export const usePost = () => {
//   const context = useContext(PostContext);
//   if (context === undefined) {
//     throw new Error('usePost must be used within a PostProvider');
//   }
//   return context;
// };

// export default PostContext;
