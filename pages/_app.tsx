import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useState} from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }: AppProps) {
  //QueryClient를 이용하여 queryClient 인스턴스 생성
  //QueryClientProvider의 props로 queryClient 전달
  //REactQueryDevltools -> 개발도구 -> 개발환경이 development(NODE_ENV=development)일때만 나타남
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default MyApp
