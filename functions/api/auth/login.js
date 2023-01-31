export const onRequestPost = ctx => {
  const json = JSON.stringify({
    data: {
      id: 0,
      username: "test",
      email: "test@gmail.com",
    },
  });

  return new Response(json, { status: 200 });
};
