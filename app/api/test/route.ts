import { google } from 'googleapis'

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