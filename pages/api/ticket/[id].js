import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const ticketId = req.query.id
  const post = await prisma.ticket.findFirst({
    where: { id: ticketId },
  })
  res.json(post)
}
