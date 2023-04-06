export async function GET(request: Request) {
    //connect to our microsoft azure endopoint
    const response = await fetch('...' ,{
        cache: 'no-cache',
    })

    const textdata = await response.text()

    return new Response(JSON.stringify(textdata.trim()), {
        status: 200,
    });
}