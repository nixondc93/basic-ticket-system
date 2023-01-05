import Layout from '../components/Layout'
import { makeSerializable } from '../lib/util'
import prisma from '../lib/prisma';

const Blog = props => {
  return (
    <Layout>
      <div className="page">
        <h1>My Tickets</h1>
        <main>
        </main>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const feed = await prisma.ticket.findMany({
    include: { author: true },
  })
  return {
    props: { feed: makeSerializable(feed) },
  }
}

export default Blog
