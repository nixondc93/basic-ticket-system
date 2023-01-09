import Router from 'next/router'
import { makeSerializable } from '../../lib/util'
import prisma from '../../lib/prisma';
import { Box, Button, FormControl, Heading, Text, Textarea } from '@chakra-ui/react';
import Navigation from '../../components/Naviagtion';

async function publish(id) {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

const Post = props => {
  const { title, content, author, responses} = props
  const authorName = author ? author.name : 'Unknown author'

  const submitResponse = e => {
    console.log('target: ', e.target)
  }

  return (
    <Box>
      <Navigation />
      <Heading marginTop={8} size='lg'>{title}</Heading>
      <Text>From: {authorName}</Text>
      <Text>{content}</Text>
      <Box>
        {responses.length > 0 && (
          <Heading size='md'>
            Responses:
          </Heading>
        )}
        { responses?.map(response => (
          <Box  key={response.id}>
              <Text>From:</Text>
              <Text>{response.content}</Text>
          </Box>
        ))}
      </Box>
      <Box>
        <Heading marginTop={6} size='md'>Reply:</Heading>
        <Box marginTop={4}>
          <form onSubmit={submitResponse}>
            <FormControl>
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
  const post = await prisma.ticket.findUnique({
    where: { id },
    include: { author: true, responses: true },
  })
  return { props: { ...makeSerializable(post) } }
}

export default Post
