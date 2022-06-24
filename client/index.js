const form = document.getElementById("form");
const input = document.getElementById("input");
const output = document.getElementById("output");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const req = await fetch("/validate", {
    method: "POST",
    headers: {
      "content-type": "text/plain",
    },
    body: input?.value,
  });

  const res = await req.text();

  output.innerText = res;
  console.log(res);
});
