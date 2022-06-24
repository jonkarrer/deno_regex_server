import { serve } from "https://deno.land/std@0.141.0/http/server.ts";

async function handler(req: Request): Promise<Response> {
  const { pathname } = new URL(req.url);
  console.log(pathname);

  let file;
  if (pathname === "/validate") {
    const body = await req.text();

    const regex = /[.A-Za-z0-9_-]*(?<=\w)@[A-Za-z0-9_-]*\.[A-Za-z]*/;

    const isMatch = regex.test(body);

    if (isMatch) {
      return new Response("Valid Email");
    } else {
      return new Response("Not Valid Email");
    }
  }
  if (pathname === "/") {
    file = await Deno.readFile("./client/index.html");

    return new Response(file, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  } else if (pathname.includes("js")) {
    file = await Deno.readFile(`./client${pathname}`);
    return new Response(file, {
      status: 200,
      headers: {
        "content-type": "text/javascript; charset=utf-8",
      },
    });
  } else {
    file = await Deno.readFile(`./client${pathname}`);
    return new Response(file, {
      status: 200,
      headers: {
        "content-type": "text/css; charset=utf-8",
      },
    });
  }
}

serve(handler);
