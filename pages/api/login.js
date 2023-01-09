import prisma from '../../lib/prisma'

// POST /api/login
// Required fields in body: email
export default async function handle(req, res) {
  try {
    const result = await prisma.user.findUnique({
      where: {
        ...req.body,
      },
    })  
    res.json(result)
  } catch (error) {
   res.json('Cannot find your account.') 
  }
}
