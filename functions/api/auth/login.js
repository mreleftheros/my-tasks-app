export const onRequestPost = ctx => {
  return new Response(
    JSON.stringify({
      id: 0,
      username: "test",
      email: "test@gmail.com",
      created_at: new Date().toDateString(),
    })
  );
};
