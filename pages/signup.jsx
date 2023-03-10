import React from 'react'
import Router from 'next/router'
import { Text, Box, Heading, FormControl, FormLabel, Input, Checkbox, Button, Link, Center } from '@chakra-ui/react'
import NextLink from 'next/link'
import Navigation from '../components/Naviagtion'

const SignUp = () => {
  const submitData = async e => {
    e.preventDefault()
    const { name, email, isAdmin } = e.target;
    
    try {
      const body = { name: name.value, email: email.value, isAdmin: Boolean(isAdmin.checked) };

      const userResponse = await fetch(`/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const userData = await userResponse.json()
      window.sessionStorage.setItem("user", JSON.stringify(userData))

      await Router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box>
      <Box>
        <Navigation />
      </Box>
      <Box marginTop={12}>
        <Heading>Sign up</Heading>
        <Box marginTop={8}>
          <form onSubmit={submitData}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input name='name' type='text' />
          </FormControl>
          <FormControl isRequired marginTop={2}>
            <FormLabel>Email address</FormLabel>
            <Input name='email' type='email' />
          </FormControl>
          <FormControl marginTop={2}>
            <Checkbox name='isAdmin'>Admin</Checkbox>
          </FormControl>
            <Button type='submit' marginTop={2}>Submit</Button>
          </form>
          <Center marginTop={6}>
            <Text>
              Already have an account? {' '}
              <Link textColor={"blue.500"} as={NextLink} href={'/login'}>login here.</Link>
            </Text>
          </Center>
        </Box>
      </Box>
    </Box>
  )
}

export default SignUp
