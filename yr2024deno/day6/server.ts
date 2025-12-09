import { solve } from "./b.ts";

function handler(req: Request): Response {
    let { next, max } = solve();
    if (new URL(req.url).pathname !== '/solve') {
        const html =`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Stream Example</title>
            </head>
            <style>
                body {
                    background-color: black;
                    color: white;
                    font-family: monospace;
                    height: 200vh;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    justify-content: start;
                    align-content: flex-start;
                }
                header {
                    position: fixed;
                    font-size: 2em;
                    padding: 1rem;
                    right: 0;
                    top: 0;
                }
            </style>

            <body>
                <div>
                </div>
                <header>
                    
                </header>
            </body>
            <script>
                async function fetchStream() {
                    const header= document.querySelector('header')
                    const response = await fetch('/solve');
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder('utf-8');
                    let buffer = '';

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        buffer += decoder.decode(value, { stream: true });

                        let boundary;
                        while ((boundary = buffer.indexOf('\\n')) !== -1) {
                            const chunk = buffer.slice(0, boundary).trim();
                            buffer = buffer.slice(boundary + 1);
                            if (chunk) {
                                const payload = JSON.parse(chunk);
                                document.body.children[0].innerText = payload.lines;
                                header.innerText = payload.guard;
                                if(payload.looped) {
                                    document.body.children[0].style.opacity = 0.6
                                    const newElm = document.createElement('div')
                                    document.body.prepend(newElm)
                                    // if(document.body.children.length > 120) document.body.children[document.body.children.length-8].remove()
                                }                                
                                if(payload.finished) {
                                    document.body.children[0].style.opacity = 0.2
                                    const newElm = document.createElement('div')
                                    document.body.prepend(newElm)
                                    // if(document.body.children.length > 120) document.body.children[document.body.children.length-8].remove()
                                }
                            }
                        }
                    }
                }

                fetchStream().catch(console.error);

            </script>
            </html>
        `;
        return new Response(html, {
            headers: {
                "content-type": "text/html",
            },
        });
    }

    let timer: number | undefined = undefined;
    let y = 4;
    let x = 4;
    let loops = 0;
    const body = new ReadableStream({
        start(controller) {
            timer = setInterval(() => {
                const {lines, guard, finished, looped, obstruction} = next();
                const jsonLine = `${JSON.stringify({ lines, guard, finished, looped, obstruction })}\n`;
                controller.enqueue(new TextEncoder().encode(jsonLine));
                if(finished || looped) {
                    if(looped) loops++;
                    if(x === max.x){ x = 0; y++}
                    if(y === max.y){
                        console.log("Loops Possible:", loops)
                        Deno.exit()
                    }
                    next = solve([y, x++]).next
                }
            }, 50);
        },
        cancel() {
            if (timer !== undefined) {
                clearInterval(timer);
            }
        },
    });

    return new Response(body, {
        headers: {
            "content-type": "text/plain; charset=utf-8",
            "x-content-type-options": "nosniff",
        },
    });
}

Deno.serve(handler);