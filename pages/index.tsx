import type { NextPage } from 'next'
import {useQuery} from "react-query"
import axios from "axios";
import { Fragment } from "react";

interface Post{
  id: number;
  title: string;
  author: string;
  description: string;
}

const getPosts = async () => {
  const { data } = await axios.get<Post[]>("http://localhost:5000/posts");
  return data;
};

const Home: NextPage = () => {
  //useQuery 첫 번째 인자 -> queryKey -> useQuery를 여러 개 사용할 때 각각의 useQuery를 식별하기 위한 식별자
  //usQuery 두 번째 인자-> queryFn -> 비동기 통신하여 Promise를 반환하는 함수
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Post[], Error>("posts", getPosts);
  if (isError) {
    return <div>{error.message}</div>;
  }


  return (
    <>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          posts?.map((post) => (
            <Fragment key={post.id}>
              <div>id: {post.id}</div>
              <div>제목: {post.title}</div>
              <div>작성자: {post.author}</div>
              <div>내용: {post.description.slice(0, 100)}...</div>
              <hr />
            </Fragment>
          ))
        )}
      </div>
    </>
  );
}

export default Home
