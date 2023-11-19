import { google } from 'googleapis'
import { url } from 'inspector'
import { redirect } from 'next/dist/server/api-utils'
import { Router } from 'next/router'

type SheetForm = {
    form: {
        name: string,
        message:string
    }
  }

export async function POST(req: Request) {
    if (req.method !== 'POST'){
        return new Response('Method not Allowed')
    }
    const body  = await req.json() as SheetForm
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
            [body.form.name, body.form.message]
            ]
        }
        })
        return new Response('OK')
    } catch (error) {
        console.error(error)
        return new Response('ERROR')
    }
}