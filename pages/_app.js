import 'styles/globals.css'
import Head from 'next/head'
import 'github-markdown-css'
import style from './app.module.scss'

export default function App({Component, pageProps}) {
  return (
    <div className={style.appWrapper}>
      <Head>
        <title>我的博客</title>
        <meta name="viewport"
              content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
      </Head>
      <Component {...pageProps} />
    </div>
  )
}
