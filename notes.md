# Notes

## Proxy, fetching categories data
So we have our server running on port 3001, and our client running on port 8080. The way we have our data fetched is by hitting the client port, but our db is on 3001. 

```js
// PageHome.vue script
export default {
    data() {
      return {
        categories: []
      }
    },
    created() {
      axios.get('/api/v1/categories')
        .then(res => {
          this.categories = res.data
        })
    }

  }
```
We need to set up a proxy.  

```js
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3001'
      }
    }
  }
}
```

