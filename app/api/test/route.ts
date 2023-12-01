import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'

type SheetForm = {
    name: string,
    message:string
  }

export async function POST(req: Request, res: NextApiResponse) {
    if (req.method !== 'POST'){
        return new Response('Method not Allowed')
    }
    const { form }  = await req.json() as { form: SheetForm };
    const { name, message } = form;
    try {
        const auth = new google.auth.GoogleAuth({
        credentials: {
            type: "service_account",
              private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
              client_email: process.env.GOOGLE_CLIENT_EMAIL,
              client_id: process.env.GOOGLE_SHEET_ID,
              token_url: "https://oauth2.googleapis.com/token",
              universe_domain: "googleapis.com",
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
            [name, message]
            ]
        }
        })
        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'An error occurred while processing the form' });
    }
}