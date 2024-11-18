import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsComponent from "./PostsComponent"; // Adjust the import based on your file structure

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>My Blog</h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  );
};

export default App;
