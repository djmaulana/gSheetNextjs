
import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from "googleapis"
import { NextRequest } from 'next/server'


type SheetForm = {
  name: string,
  message:string
}

export default async function POST(req: Request) {
  if (req.method !== 'POST'){
    return new Response('BAD')
  }
  const body = await req.json()
  console.log(body)

  // try {
  //   const auth = new google.auth.GoogleAuth({
  //     credentials: {
  //       client_email: process.env.GOOGLE_CLIENT_EMAIL,
  //       private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  //     },
  //     scopes: [
  //       'https://www.googleapis.com/auth/drive',
  //       'https://www.googleapis.com/auth/drive.file',
  //       'https://www.googleapis.com/auth/spreadsheets',
  //     ]
  //   })
  //   const sheets = google.sheets({
  //     auth,
  //     version:'v4'
  //   })

  //   const response = await sheets.spreadsheets.values.append({
  //     spreadsheetId: process.env.GOOGLE_SHEET_ID,
  //     range: 'A1:B1',
  //     valueInputOption: 'USER_ENTERED',
  //     requestBody: {
  //       values: [
  //         [body.name, body.message]
  //       ]
  //     }
  //   })

  //   return new Response('OK')
  // } catch (error) {
  //   // console.error(error)
  //   return new Response('BAD')
  // }
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