<template>
    <div class="not-found">
      <h1>Page Not Found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <nuxt-link to="/">Go back to the homepage</nuxt-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFoundPage'
  }
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    padding: 100px;
  }
  
  .not-found h1 {
    font-size: 48px;
    margin-bottom: 20px;
  }
  
  .not-found p {
    font-size: 18px;
    margin-bottom: 30px;
  }
  
  .not-found a {
    color: #007bff;
    text-decoration: underline;
  }
  </style>