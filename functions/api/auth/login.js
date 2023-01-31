export const onRequestPost = ctx => {
  return new Response(
    {
      data: {
        id: 0,
        username: "test",
        email: "test@gmail.com",
      },
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
