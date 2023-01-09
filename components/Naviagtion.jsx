import { Box, Flex, Link, Center } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const Navigation = () => {
  const router = useRouter()

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
          </Flex>
        </Center>
      </Box>
    </nav>
  )
}

export default Navigation
