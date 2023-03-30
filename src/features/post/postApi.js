import { apiSlice } from "../api/apiSlice";

export const postsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts?_limit=10",
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, arg) => [{ type: "post", id: arg }],
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
              draft.push(res.data);
            })
          );
        } catch (error) {}
      },
    }),
    editPost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "post", id: arg.id }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
              const index = draft.findIndex((post) => post.id === res.data.id);
              if (index !== 1) {
                draft[index] = res.data;
              }
            })
          );
        } catch (error) {}
      },
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            const index = draft.findIndex((post) => post.id == arg);
            draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useEditPostMutation,
  useAddPostMutation,
  useDeletePostMutation,
} = postsApi;
