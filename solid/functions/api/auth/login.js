export const onRequestPost = ctx => {
  return new Response(
    JSON.stringify({
      data: {
        id: 0,
        username: "test",
        email: "test@gmail.com",
      },
    })
  );
};
