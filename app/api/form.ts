import { prisma } from "../../server/db/client"

import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from "googleapis"


type SheetForm = {
  name: string,
  message:string
}

export default async function form(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST'){
    return res.status(405).send({message: "Only Post request are allowed"})
  }
  const body = req.body as SheetForm

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ]
    })
    const sheets = google.sheets({
      auth,
      version:'v4'
    })

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A1:B1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [body.name, body.message]
        ]
      }
    })

    return res.redirect(307, '/')
  } catch (error) {
    // console.error(error)
    return res.status(500).send({message: 'Something went wrong'})
  }
}


// export default async function handle(req: NextApiRequest, res: NextApiResponse) {
//   const { method } = req

//   switch (method) {
//     case 'POST':
//       // get the title and content from the request body
//       const { name, message } = req.body
//       // use prisma to create a new post using that data
//       const post = await prisma.form.create({
//         data: {
//           name,
//           message
//         }
//       })
//       // send the post object back to the client
//       res.status(201).json(post)
//       break
//     default:
//       res.setHeader("Allow", ["POST"])
//       res.status(405).end(`Method ${method} Not Allowed`)
//   }
// }