import React from 'react'
import Router from 'next/router'
import { Box, Heading, FormControl, Input, Textarea, FormLabel, Button, useToast } from '@chakra-ui/react'
import Navigation from '../components/Naviagtion'

const Create = () => {
  const toast = useToast();

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

      const { title, content } = e.target;
      const body = { title: title.value, content: content.value, authorEmail };
      await fetch(`/api/ticket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      e.target.reset()
      await Router.push('/')
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
      <Box marginTop={8}>
        <Heading>Create Ticket</Heading>
        <Box marginTop={4}>
          <form onSubmit={submitData}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input name='title' type='text' />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea name='content' />
            </FormControl>
            <Button type='submit' marginTop={2}>Submit</Button>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default Create;
