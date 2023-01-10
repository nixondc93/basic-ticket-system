import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Status } from '@prisma/client'
import { makeSerializable } from '../../lib/util'
import prisma from '../../lib/prisma';
import { Box, Button, Stack, FormControl, Heading, Text, Textarea, useToast, Divider, Flex } from '@chakra-ui/react';
import Navigation from '../../components/Naviagtion';

const Ticket = props => {
  const toast = useToast()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(null);

  const { id, title, status, content, author, responses } = props
  const authorName = author ? author.name : 'Unknown author'

  useEffect(() => {
    const sessionUser = window.sessionStorage.getItem('user')
    if (sessionUser) setIsAdmin(JSON.parse(sessionUser)?.isAdmin)
  }, [])

  const updateStatus = async (status) => {
    try {
      const body = { status }
      await fetch(`/api/ticket/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      router.reload(window.location.pathname)  
    } catch (error) {
      toast({
        position: 'top-right',
        title: 'An error occurred. Please try again.',
        status: 'error',
        isClosable: true,
      })
    }
    
}

  const submitData = async e => {
    e.preventDefault()
    try {
      const sessionUser = window.sessionStorage.getItem('user');
      let authorEmail;
      if (sessionUser) {
        authorEmail = JSON.parse(sessionUser)?.email
      }

      if (!authorEmail) {
        toast({
          position: 'top-right',
          title: 'You are not logged in.',
          status: 'error',
          isClosable: true,
        })
        return
      }

      const { content } = e.target;
      const body = { content: content.value, authorEmail, ticketId: id };
      await fetch(`/api/response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      e.target.reset()
      router.reload(window.location.pathname)
    } catch (error) {
      toast({
        position: 'top-right',
        title: 'An error occurred. Please try again.',
        status: 'error',
        isClosable: true,
      })
    }
  }

  return (
    <Box>
      <Navigation />
      <Heading marginTop={8}>Ticket:</Heading>
      <Heading marginTop={4} size='lg'>{title}</Heading>
      <Flex marginTop={2}>
        <Text display={"inline-block"} paddingRight={1}>Status:</Text>
        <Text fontWeight={700} display={"inline-block"}>{status}</Text>
      </Flex>
      <Flex marginTop={2}>
        <Text display={"inline-block"} paddingRight={1}>From:</Text>
        <Text fontWeight={700} display={"inline-block"} paddingRight={1}>{authorName}</Text>
        <Text>{'<'}{author?.email}{'>'}</Text>
      </Flex>
      <Flex paddingLeft={2} paddingRight={2}>
        <Text>{content}</Text>
      </Flex>
      { isAdmin === true && (
        <Box marginTop={2} marginBottom={2}>
          <Text>Update Status:</Text>
          <Flex>
            <Stack direction='row' spacing={4} align='center'>
              {status !== Status.INPROGRESS && (
                <Button onClick={() => updateStatus(Status.INPROGRESS)}>In Progress</Button>
              )}
              {status !== Status.Done && (
                <Button onClick={() => updateStatus(Status.RESOLVED)}>Resolved</Button>
              )}
            </Stack>
          </Flex>
        </Box>
      )}
      <Box>
        {responses.length > 0 && (
          <Heading marginTop={4} size='md'>
            Responses:
          </Heading>
        )}
        { responses?.map(response => (
          <Box marginTop={2} key={response.id}>
              <Flex>
                <Text display={"inline-block"} paddingRight={2}>From:</Text>
                <Text fontWeight={700} display={"inline-block"} paddingRight={1}>
                  {response?.author?.name}
                </Text>
                <Text>{'<'}{response?.author?.email}{'>'}</Text>
              </Flex>
              <Flex paddingLeft={2} paddingRight={2}>
                <Text>{response.content}</Text>
              </Flex>
              <Divider />
          </Box>
        ))}
      </Box>
      <Box>
        <Heading marginTop={6} size='md'>Reply:</Heading>
        <Box marginTop={4}>
          <form onSubmit={submitData}>
            <FormControl isRequired>
              <Textarea name='content'/>
            </FormControl>
            <Box marginTop={2}>
              <Button type='submit'>Submit</Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export const getServerSideProps = async (context) => {
  const id = Array.isArray(context.params.id) ? context.params.id[0] : context.params.id
  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: { 
      author: true, 
      responses: {
        include: { author: true }
      } 
    },
  })
  return { props: { ...makeSerializable(ticket) } }
}

export default Ticket
