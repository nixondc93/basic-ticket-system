import NextLink from 'next/link'
import { makeSerializable } from '../lib/util'
import prisma from '../lib/prisma';
import { Box, Heading, Text, Divider, Flex, Link } from '@chakra-ui/react';
import Navigation from '../components/Naviagtion';
import { Status } from '@prisma/client'

const Admin = props => {
  const { tickets } = props
  
  return (
    <Box>
      <Navigation />
      <Heading marginTop={8}>Tickets</Heading>
      <Box marginTop={4}>
        {
          tickets?.map(ticket => (
            <Box key={ticket.id} marginTop={2}>
              <Link as={NextLink} href={`/ticket/${ticket.id}`}>
                <Flex>
                  <Text display={"inline-block"} paddingRight={2}>From:</Text>
                  <Text fontWeight={700} display={"inline-block"} paddingRight={1}>
                    {ticket?.author?.name}
                  </Text>
                  <Text paddingRight={2}>{'<'}{ticket?.author?.email}{'>'}</Text>
                  <Text display={"inline-block"} paddingRight={1}>Status:</Text>
                  <Text fontWeight={700} display={"inline-block"}>{ticket.status}</Text>
                </Flex>
                <Flex paddingLeft={2} paddingRight={2}>
                  <Text>{ticket.title}</Text>
                </Flex>
                <Divider />
              </Link>
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}

export const getServerSideProps = async (context) => {
  const tickets = await prisma.ticket.findMany({
    include: { author: true },
    orderBy: { updatedAt: 'desc'},
    where: { status: { not: Status.RESOLVED }},
  })
  return { props: { tickets: [...makeSerializable(tickets)] } }
}

export default Admin
