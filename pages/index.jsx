import { makeSerializable } from '../lib/util'
import prisma from '../lib/prisma';
import { Box, Center, Heading } from '@chakra-ui/react';
import Navigation from '../components/Naviagtion';

const Blog = props => {
  return (
      <Box>
        <Navigation />
        <main>
          <Center marginTop={24}>
            <Heading>Welcome to the help desk.</Heading>
          </Center>
        </main>
      </Box>
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
