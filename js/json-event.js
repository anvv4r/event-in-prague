//JSON

async function getData() {
  const response = await fetch(
    "https://test-api.codingbootcamp.cz/api/72291a73/events"
  );
  const data = await response.json();

  console.log(data);
}

getData();
