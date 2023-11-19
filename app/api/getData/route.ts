import { google } from 'googleapis'

export async function GET(req: Request, res: Response) {
    if (req.method !== 'GET'){
        return new Response('Method not Allowed')
    }
    try {
        const auth = await google.auth.getClient({
            projectId: "neoproject-402401",
            credentials: {
              type: "service_account",
              private_key: process.env.GOOGLE_PRIVATE_KEY,
              client_email: process.env.GOOGLE_CLIENT_EMAIL,
              client_id: process.env.GOOGLE_SHEET_ID,
              token_url: "https://oauth2.googleapis.com/token",
              universe_domain: "googleapis.com",
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
          });
        const sheets = google.sheets({
        auth,
        version:'v4'
        })

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'A:B',
        })
        const data = response.data;
        const values = data.values || [];

        const formattedData = values.slice(1).map((row: any[]) => ({
            name: row[0],
            message: row[1],
        }));
        return new Response(JSON.stringify({data: formattedData}))
    } catch (error) {
        console.error(error)
        return new Response('ERROR')
    }
}