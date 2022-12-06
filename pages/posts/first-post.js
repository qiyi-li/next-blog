import Link from 'next/link'
import Head from 'next/head'
import Layout from 'components/layout/layout'

export default function FirstPost() {
  return <>
    <Layout>
      <Head>
        <title>first</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href={'/'}>back to home</Link>
      </h2>
    </Layout>
  </>
}