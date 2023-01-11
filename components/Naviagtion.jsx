import { useEffect, useState } from 'react';
import { Box, Flex, Link, Center } from '@chakra-ui/react'
import NextLink from 'next/link'

const Navigation = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const sessionUser = window.sessionStorage.getItem('user')
    if (sessionUser) setUser(JSON.parse(sessionUser))
  }, [])


  return(
    <nav>
      <Box marginTop={8}>
        <Center>
          <Flex justifyContent={"space-evenly"} maxWidth={1080} minWidth={600}>
            <Box>
              <Link as={NextLink} href="/">Home</Link>
            </Box>
            <Box>
              <Link as={NextLink} href="/signup">Signup</Link>
            </Box>
            <Box>
              <Link as={NextLink} href="/create">Create a ticket</Link>
            </Box>
            { user.isAdmin === false && (
              <Box>
                <Link as={NextLink} href={`/myTickets/${user.id}`}>My tickets</Link>
              </Box>
            )}
            { user.isAdmin === true && (
              <Box>
                <Link as={NextLink} href="/admin">Ticket backlog</Link>
              </Box>
            )}
          </Flex>
        </Center>
      </Box>
    </nav>
  )
}

export default Navigation
