import React from 'react'
import Router from 'next/router'
import { Box, Heading, FormControl, FormLabel, Input, Checkbox, Button } from '@chakra-ui/react'
import Navigation from '../components/Naviagtion'

const SignUp = () => {
  const submitData = async e => {
    e.preventDefault()
    const { email } = e.target;
    
    try {
      const body = { email: email.value};

      const userResponse = await fetch(`/api/login`, {
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
        <Heading>Login</Heading>
        <Box marginTop={8}>
          <form onSubmit={submitData}>
          <FormControl isRequired marginTop={2}>
            <FormLabel>Email address</FormLabel>
            <Input name='email' type='email' />
          </FormControl>
            <Button type='submit' marginTop={2}>Submit</Button>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default SignUp
