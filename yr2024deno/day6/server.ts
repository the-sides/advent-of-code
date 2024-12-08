import { solve } from "./a.ts";

function handler(req: Request): Response {
    let { next } = solve();
    if (new URL(req.url).pathname !== '/solve') {
        next = solve().next;
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
                    height: 200vh; /* Set height large enough to allow for scrolling */
                }
                header {
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            </style>
            <script>
                async function fetchStream() {
                    const response = await fetch('/solve');
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder('utf-8');

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        document.body.children[0].innerText = decoder.decode(value, { stream: true });
                    }
                }

                fetchStream().catch(console.error);

            </script>
            <body>
                <div>
                </div>
                <header>
                    
                </header>
            </body>
            </html>
        `;
        return new Response(html, {
            headers: {
                "content-type": "text/html",
            },
        });
    }

    let timer: number | undefined = undefined;
    const body = new ReadableStream({
        start(controller) {
            timer = setInterval(() => {
                const lines = next().join('\n');
                controller.enqueue(new TextEncoder().encode(lines));
            }, 1);
        },
        cancel() {
            if (timer !== undefined) {
                clearInterval(timer);
            }
        },
    });

    return new Response(body, {
        headers: {
            "content-type": "text/plain",
            "x-content-type-options": "nosniff",
        },
    });
}

Deno.serve(handler);