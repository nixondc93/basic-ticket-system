import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const ticketId = req.query.id

  if (req.method === 'PATCH') {
    const { status } = req.body
    const ticket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { status },
    })
    res.json(ticket)
  } else {
    const ticket = await prisma.ticket.findFirst({
      where: { id: ticketId },
    })
    res.json(ticket)
  }
}
